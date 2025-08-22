// Страница каталога видов

class Catalog {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentFilter = {
            category: 'all',
            difficulty: 'all',
            size: 'all',
            search: ''
        };
        this.allSpecies = [];
        this.filteredSpecies = [];
        
        this.init();
    }

    init() {
        this.loadSpecies();
        this.render();
        this.setupEventListeners();
    }

    loadSpecies() {
        this.allSpecies = window.speciesDatabase || [];
        this.filteredSpecies = [...this.allSpecies];
    }

    render() {
        const container = document.getElementById('catalog-content');
        if (!container) return;

        container.innerHTML = `
            <div class="catalog">
                <div class="catalog-header">
                    <h1>Каталог видов</h1>
                    <p>Найдите подходящие виды для вашего аквариума или террариума</p>
                </div>

                <div class="catalog-controls">
                    <div class="search-section">
                        <div class="search-box">
                            <input type="text" id="catalog-search" placeholder="Поиск по названию или научному названию..." value="${this.currentFilter.search}">
                            <button id="search-btn" class="search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    <div class="filters-section">
                        <div class="filter-group">
                            <label for="category-filter">Категория:</label>
                            <select id="category-filter" data-filter="category">
                                <option value="all">Все категории</option>
                                <option value="fish" ${this.currentFilter.category === 'fish' ? 'selected' : ''}>Рыбы</option>
                                <option value="plants" ${this.currentFilter.category === 'plants' ? 'selected' : ''}>Растения</option>
                                <option value="reptiles" ${this.currentFilter.category === 'reptiles' ? 'selected' : ''}>Рептилии</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="difficulty-filter">Сложность:</label>
                            <select id="difficulty-filter" data-filter="difficulty">
                                <option value="all">Любая сложность</option>
                                <option value="easy" ${this.currentFilter.difficulty === 'easy' ? 'selected' : ''}>Легко</option>
                                <option value="medium" ${this.currentFilter.difficulty === 'medium' ? 'selected' : ''}>Средне</option>
                                <option value="hard" ${this.currentFilter.difficulty === 'hard' ? 'selected' : ''}>Сложно</option>
                            </select>
                        </div>

                        <div class="filter-group">
                            <label for="size-filter">Размер:</label>
                            <select id="size-filter" data-filter="size">
                                <option value="all">Любой размер</option>
                                <option value="small" ${this.currentFilter.size === 'small' ? 'selected' : ''}>Маленький</option>
                                <option value="medium" ${this.currentFilter.size === 'medium' ? 'selected' : ''}>Средний</option>
                                <option value="large" ${this.currentFilter.size === 'large' ? 'selected' : ''}>Большой</option>
                            </select>
                        </div>

                        <button id="clear-filters" class="btn-secondary">Очистить фильтры</button>
                    </div>
                </div>

                <div class="catalog-results">
                    <div class="results-info">
                        <span class="results-count">Найдено: <strong id="results-count">${this.filteredSpecies.length}</strong> видов</span>
                        <div class="view-controls">
                            <button class="view-btn active" data-view="grid"><i class="fas fa-th"></i></button>
                            <button class="view-btn" data-view="list"><i class="fas fa-list"></i></button>
                        </div>
                    </div>

                    <div id="species-grid" class="species-grid">
                        ${this.renderSpeciesGrid()}
                    </div>

                    <div class="pagination" id="pagination">
                        ${this.renderPagination()}
                    </div>
                </div>
            </div>
        `;

        this.updateResultsCount();
    }

    setupEventListeners() {
        // Поиск
        const searchInput = document.getElementById('catalog-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.currentFilter.search = e.target.value;
                    this.applyFilters();
                }, 300);
            });
        }

        // Фильтры
        document.addEventListener('change', (e) => {
            if (e.target.hasAttribute('data-filter')) {
                const filterType = e.target.getAttribute('data-filter');
                this.currentFilter[filterType] = e.target.value;
                this.applyFilters();
            }
        });

        // Очистка фильтров
        const clearBtn = document.getElementById('clear-filters');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Переключение вида
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-btn')) {
                const btn = e.target.closest('.view-btn');
                const view = btn.getAttribute('data-view');
                this.switchView(view);
            }
        });

        // Пагинация
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-page')) {
                const page = parseInt(e.target.getAttribute('data-page'));
                this.goToPage(page);
            }
        });

        // Клик по виду
        document.addEventListener('click', (e) => {
            const speciesCard = e.target.closest('.species-card');
            if (speciesCard) {
                const speciesId = speciesCard.getAttribute('data-species-id');
                this.showSpeciesDetails(speciesId);
            }
        });
    }

    applyFilters() {
        this.filteredSpecies = this.allSpecies.filter(species => {
            // Фильтр по категории
            if (this.currentFilter.category !== 'all' && species.category !== this.currentFilter.category) {
                return false;
            }

            // Фильтр по сложности
            if (this.currentFilter.difficulty !== 'all' && species.difficulty !== this.currentFilter.difficulty) {
                return false;
            }

            // Фильтр по размеру
            if (this.currentFilter.size !== 'all' && species.size !== this.currentFilter.size) {
                return false;
            }

            // Поиск по тексту
            if (this.currentFilter.search) {
                const searchTerm = this.currentFilter.search.toLowerCase();
                const nameMatch = species.name.toLowerCase().includes(searchTerm);
                const scientificMatch = species.scientificName && species.scientificName.toLowerCase().includes(searchTerm);
                const descriptionMatch = species.description && species.description.toLowerCase().includes(searchTerm);
                
                if (!nameMatch && !scientificMatch && !descriptionMatch) {
                    return false;
                }
            }

            return true;
        });

        this.currentPage = 1;
        this.updateDisplay();
    }

    clearFilters() {
        this.currentFilter = {
            category: 'all',
            difficulty: 'all',
            size: 'all',
            search: ''
        };

        // Сброс значений в форме
        const categorySelect = document.getElementById('category-filter');
        const difficultySelect = document.getElementById('difficulty-filter');
        const sizeSelect = document.getElementById('size-filter');
        const searchInput = document.getElementById('catalog-search');

        if (categorySelect) categorySelect.value = 'all';
        if (difficultySelect) difficultySelect.value = 'all';
        if (sizeSelect) sizeSelect.value = 'all';
        if (searchInput) searchInput.value = '';

        this.applyFilters();
    }

    switchView(view) {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeBtn = document.querySelector(`[data-view="${view}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        const grid = document.getElementById('species-grid');
        if (grid) {
            grid.className = view === 'list' ? 'species-list' : 'species-grid';
        }
    }

    renderSpeciesGrid() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageSpecies = this.filteredSpecies.slice(startIndex, endIndex);

        if (pageSpecies.length === 0) {
            return `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>Ничего не найдено</h3>
                    <p>Попробуйте изменить фильтры или поисковый запрос</p>
                </div>
            `;
        }

        return pageSpecies.map(species => `
            <div class="species-card" data-species-id="${species.id}">
                <div class="species-image">
                    <img src="${species.image || 'assets/images/placeholder.jpg'}" alt="${species.name}" onerror="this.src='assets/images/placeholder.jpg'">
                    <div class="species-overlay">
                        <button class="btn-favorite" data-species-id="${species.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="species-info">
                    <h3 class="species-name">${species.name}</h3>
                    <p class="species-scientific">${species.scientificName || ''}</p>
                    <div class="species-badges">
                        <span class="badge badge-category badge-${species.category}">${this.getCategoryName(species.category)}</span>
                        <span class="badge badge-difficulty badge-${species.difficulty}">${this.getDifficultyName(species.difficulty)}</span>
                    </div>
                    <p class="species-description">${this.truncateText(species.description || '', 100)}</p>
                    <div class="species-params">
                        ${species.temperature ? `<span class="param">🌡️ ${species.temperature.min}-${species.temperature.max}°C</span>` : ''}
                        ${species.ph ? `<span class="param">⚖️ pH ${species.ph.min}-${species.ph.max}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredSpecies.length / this.itemsPerPage);
        
        if (totalPages <= 1) return '';

        let paginationHTML = '';
        
        // Предыдущая страница
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage - 1}">‹</button>`;
        }

        // Страницы
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 2);

        if (startPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="1">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `<button class="page-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="page-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
        }

        // Следующая страница
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${this.currentPage + 1}">›</button>`;
        }

        return paginationHTML;
    }

    updateDisplay() {
        const grid = document.getElementById('species-grid');
        const pagination = document.getElementById('pagination');
        
        if (grid) {
            grid.innerHTML = this.renderSpeciesGrid();
        }
        
        if (pagination) {
            pagination.innerHTML = this.renderPagination();
        }
        
        this.updateResultsCount();
    }

    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            countElement.textContent = this.filteredSpecies.length;
        }
    }

    goToPage(page) {
        this.currentPage = page;
        this.updateDisplay();
        
        // Прокрутка к началу результатов
        const resultsSection = document.querySelector('.catalog-results');
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showSpeciesDetails(speciesId) {
        const species = this.allSpecies.find(s => s.id === speciesId);
        if (!species) return;

        if (window.modal) {
            window.modal.show({
                title: species.name,
                content: this.createSpeciesDetailHTML(species),
                size: 'lg'
            });
        }
    }

    createSpeciesDetailHTML(species) {
        return `
            <div class="species-detail">
                <div class="species-detail-header">
                    <div class="species-image-large">
                        <img src="${species.image || 'assets/images/placeholder.jpg'}" alt="${species.name}">
                    </div>
                    <div class="species-basic-info">
                        <h2>${species.name}</h2>
                        <p class="scientific-name">${species.scientificName || ''}</p>
                        <div class="species-badges">
                            <span class="badge badge-category badge-${species.category}">${this.getCategoryName(species.category)}</span>
                            <span class="badge badge-difficulty badge-${species.difficulty}">${this.getDifficultyName(species.difficulty)}</span>
                            <span class="badge badge-size badge-${species.size}">${this.getSizeName(species.size)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="species-detail-content">
                    <div class="species-description">
                        <h3>Описание</h3>
                        <p>${species.description || 'Описание отсутствует'}</p>
                    </div>
                    
                    <div class="species-parameters">
                        <h3>Параметры содержания</h3>
                        <div class="params-grid">
                            ${species.temperature ? `
                                <div class="param-item">
                                    <span class="param-label">Температура:</span>
                                    <span class="param-value">${species.temperature.min}-${species.temperature.max}°C</span>
                                </div>
                            ` : ''}
                            ${species.ph ? `
                                <div class="param-item">
                                    <span class="param-label">pH:</span>
                                    <span class="param-value">${species.ph.min}-${species.ph.max}</span>
                                </div>
                            ` : ''}
                            ${species.hardness ? `
                                <div class="param-item">
                                    <span class="param-label">Жесткость:</span>
                                    <span class="param-value">${species.hardness.min}-${species.hardness.max} dGH</span>
                                </div>
                            ` : ''}
                            ${species.lifespan ? `
                                <div class="param-item">
                                    <span class="param-label">Продолжительность жизни:</span>
                                    <span class="param-value">${species.lifespan} лет</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="species-actions">
                        <button class="btn-primary" onclick="catalog.addToAquarium('${species.id}')">
                            <i class="fas fa-plus"></i> Добавить в аквариум
                        </button>
                        <button class="btn-secondary" onclick="catalog.toggleFavorite('${species.id}')">
                            <i class="fas fa-heart"></i> В избранное
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    addToAquarium(speciesId) {
        // Здесь будет логика добавления в аквариум
        if (window.notifications) {
            window.notifications.info('Функция добавления в аквариум будет реализована в следующей версии');
        }
    }

    toggleFavorite(speciesId) {
        // Здесь будет логика добавления/удаления из избранного
        if (window.notifications) {
            window.notifications.success('Вид добавлен в избранное');
        }
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

    getSizeName(size) {
        const names = {
            small: 'Маленький',
            medium: 'Средний',
            large: 'Большой'
        };
        return names[size] || size;
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    }
}

// Создаем экземпляр и делаем доступным глобально
const catalog = new Catalog();
window.catalog = catalog;