// Компонент поиска для Акватеррон

class SearchComponent {
    constructor() {
        this.searchInput = null;
        this.searchResults = null;
        this.currentQuery = '';
        this.searchHistory = [];
        this.filters = {};
        this.isSearching = false;
        
        this.init();
    }

    init() {
        // Инициализируем поиск после загрузки DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.setupSearchElements();
            this.loadSearchHistory();
        });
    }

    setupSearchElements() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        
        if (this.searchInput) {
            this.setupSearchInput();
        }
        
        this.setupFilters();
    }

    setupSearchInput() {
        // Debounced поиск
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length >= 2) {
                searchTimeout = setTimeout(() => {
                    this.performSearch(query);
                }, 300);
            } else if (query.length === 0) {
                this.clearResults();
            }
        });

        // Обработка нажатий клавиш
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value.trim();
                if (query) {
                    this.performSearch(query);
                    this.addToHistory(query);
                }
            }
            
            if (e.key === 'Escape') {
                this.clearResults();
                this.searchInput.blur();
            }
        });

        // Фокус и блур
        this.searchInput.addEventListener('focus', () => {
            if (this.currentQuery) {
                this.showResults();
            }
        });

        this.searchInput.addEventListener('blur', () => {
            // Задержка для обработки кликов по результатам
            setTimeout(() => {
                this.hideResults();
            }, 200);
        });
    }

    setupFilters() {
        const filterElements = document.querySelectorAll('[data-filter]');
        
        filterElements.forEach(element => {
            element.addEventListener('change', () => {
                this.updateFilters();
                if (this.currentQuery) {
                    this.performSearch(this.currentQuery);
                }
            });
        });
    }

    updateFilters() {
        this.filters = {};
        
        const filterElements = document.querySelectorAll('[data-filter]');
        filterElements.forEach(element => {
            const filterName = element.getAttribute('data-filter');
            
            if (element.type === 'checkbox') {
                if (element.checked) {
                    if (!this.filters[filterName]) {
                        this.filters[filterName] = [];
                    }
                    this.filters[filterName].push(element.value);
                }
            } else if (element.type === 'select-one') {
                if (element.value) {
                    this.filters[filterName] = element.value;
                }
            } else if (element.type === 'radio') {
                if (element.checked) {
                    this.filters[filterName] = element.value;
                }
            }
        });
    }

    async performSearch(query) {
        if (this.isSearching) return;
        
        this.isSearching = true;
        this.currentQuery = query;
        
        try {
            this.showLoadingState();
            
            // Получаем данные из базы
            const results = await this.searchInDatabase(query, this.filters);
            
            this.displayResults(results);
            this.showResults();
            
        } catch (error) {
            console.error('Ошибка поиска:', error);
            this.showErrorState();
        } finally {
            this.isSearching = false;
        }
    }

    async searchInDatabase(query, filters = {}) {
        // Имитация поиска в базе данных
        // В реальном приложении здесь был бы запрос к API или поиск в локальных данных
        
        const allSpecies = window.speciesDatabase || [];
        const lowerQuery = query.toLowerCase();
        
        let results = allSpecies.filter(species => {
            // Поиск по названию и научному названию
            const nameMatch = species.name.toLowerCase().includes(lowerQuery);
            const scientificMatch = species.scientificName && 
                                   species.scientificName.toLowerCase().includes(lowerQuery);
            const descriptionMatch = species.description && 
                                    species.description.toLowerCase().includes(lowerQuery);
            
            return nameMatch || scientificMatch || descriptionMatch;
        });

        // Применяем фильтры
        if (filters.category) {
            results = results.filter(species => species.category === filters.category);
        }
        
        if (filters.difficulty) {
            results = results.filter(species => species.difficulty === filters.difficulty);
        }
        
        if (filters.size) {
            results = results.filter(species => species.size === filters.size);
        }

        // Сортируем по релевантности
        results.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(lowerQuery);
            const bNameMatch = b.name.toLowerCase().includes(lowerQuery);
            
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            
            return a.name.localeCompare(b.name);
        });

        return results.slice(0, 50); // Ограничиваем количество результатов
    }

    displayResults(results) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <p>По запросу "${this.currentQuery}" ничего не найдено</p>
                    <small>Попробуйте изменить запрос или фильтры</small>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(species => `
            <div class="search-result-item" data-species-id="${species.id}">
                <div class="search-result-image">
                    <img src="${species.image || 'assets/images/placeholder.jpg'}" 
                         alt="${species.name}" 
                         onerror="this.src='assets/images/placeholder.jpg'">
                </div>
                <div class="search-result-info">
                    <h4 class="search-result-name">${species.name}</h4>
                    <p class="search-result-scientific">${species.scientificName || ''}</p>
                    <div class="search-result-meta">
                        <span class="category-badge category-${species.category}">${this.getCategoryName(species.category)}</span>
                        <span class="difficulty-badge difficulty-${species.difficulty}">${this.getDifficultyName(species.difficulty)}</span>
                    </div>
                    <p class="search-result-description">${this.truncateText(species.description || '', 100)}</p>
                </div>
            </div>
        `).join('');

        this.searchResults.innerHTML = `
            <div class="search-results-header">
                <span class="search-results-count">Найдено: ${results.length}</span>
            </div>
            <div class="search-results-list">
                ${resultsHTML}
            </div>
        `;

        // Добавляем обработчики кликов
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const speciesId = item.getAttribute('data-species-id');
                this.onResultClick(speciesId);
            });
        });
    }

    showLoadingState() {
        if (this.searchResults) {
            this.searchResults.innerHTML = `
                <div class="search-loading">
                    <div class="loading-spinner"></div>
                    <p>Поиск...</p>
                </div>
            `;
        }
    }

    showErrorState() {
        if (this.searchResults) {
            this.searchResults.innerHTML = `
                <div class="search-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Произошла ошибка при поиске</p>
                    <button class="btn-retry" onclick="search.performSearch('${this.currentQuery}')">Повторить</button>
                </div>
            `;
        }
    }

    showResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'block';
        }
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }

    clearResults() {
        this.currentQuery = '';
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
            this.hideResults();
        }
    }

    // История поиска
    addToHistory(query) {
        if (!this.searchHistory.includes(query)) {
            this.searchHistory.unshift(query);
            this.searchHistory = this.searchHistory.slice(0, 10); // Ограничиваем историю
            this.saveSearchHistory();
        }
    }

    loadSearchHistory() {
        const saved = localStorage.getItem('aquaterron_search_history');
        if (saved) {
            try {
                this.searchHistory = JSON.parse(saved);
            } catch (e) {
                this.searchHistory = [];
            }
        }
    }

    saveSearchHistory() {
        localStorage.setItem('aquaterron_search_history', JSON.stringify(this.searchHistory));
    }

    // Вспомогательные методы
    getCategoryName(category) {
        const names = {
            fish: 'Рыбы',
            plants: 'Растения',
            reptiles: 'Рептилии'
        };
        return names[category] || category;
    }

    getDifficultyName(difficulty) {
        const names = {
            easy: 'Легко',
            medium: 'Средне',
            hard: 'Сложно'
        };
        return names[difficulty] || difficulty;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }

    // Обработчик клика по результату
    onResultClick(speciesId) {
        // Здесь можно добавить логику открытия детальной информации о виде
        console.log('Clicked species:', speciesId);
        
        // Пример: открытие модального окна с информацией
        if (window.modal && window.speciesDatabase) {
            const species = window.speciesDatabase.find(s => s.id === speciesId);
            if (species) {
                window.modal.show({
                    title: species.name,
                    content: this.createSpeciesDetailHTML(species),
                    size: 'lg'
                });
            }
        }
    }

    createSpeciesDetailHTML(species) {
        return `
            <div class="species-detail">
                <div class="species-image">
                    <img src="${species.image || 'assets/images/placeholder.jpg'}" alt="${species.name}">
                </div>
                <div class="species-info">
                    <h3>${species.name}</h3>
                    <p class="scientific-name">${species.scientificName || ''}</p>
                    <p class="description">${species.description || 'Описание отсутствует'}</p>
                    
                    <div class="species-params">
                        <div class="param">
                            <strong>Категория:</strong> ${this.getCategoryName(species.category)}
                        </div>
                        <div class="param">
                            <strong>Сложность:</strong> ${this.getDifficultyName(species.difficulty)}
                        </div>
                        ${species.temperature ? `
                            <div class="param">
                                <strong>Температура:</strong> ${species.temperature.min}-${species.temperature.max}°C
                            </div>
                        ` : ''}
                        ${species.ph ? `
                            <div class="param">
                                <strong>pH:</strong> ${species.ph.min}-${species.ph.max}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}

// Создаем глобальный экземпляр
const search = new SearchComponent();

// Экспортируем для использования в модулях
// export default search;

// Делаем доступным глобально
window.search = search;