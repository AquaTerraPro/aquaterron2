// Главная страница - Dashboard

class Dashboard {
    constructor() {
        this.stats = {
            totalSpecies: 0,
            userAquariums: 0,
            favoriteSpecies: 0,
            recentActivity: []
        };
        
        this.init();
    }

    init() {
        this.loadStats();
        this.render();
        this.setupEventListeners();
    }

    loadStats() {
        // Загружаем статистику
        if (window.speciesDatabase) {
            this.stats.totalSpecies = window.speciesDatabase.length;
        }

        // Загружаем данные пользователя из localStorage
        const userStorage = window.userStorage || {};
        
        if (userStorage.getAquariums) {
            this.stats.userAquariums = userStorage.getAquariums().length;
        }
        
        if (userStorage.getFavorites) {
            this.stats.favoriteSpecies = userStorage.getFavorites().length;
        }
    }

    render() {
        const container = document.getElementById('dashboard-content');
        if (!container) return;

        container.innerHTML = `
            <div class="dashboard">
                <div class="dashboard-header">
                    <h1>Добро пожаловать в Акватеррон!</h1>
                    <p>Планируйте идеальные аквариумы и террариумы с нашей помощью</p>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-database"></i>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.totalSpecies}</h3>
                            <p>Видов в базе данных</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-fish"></i>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.userAquariums}</h3>
                            <p>Ваших аквариумов</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="stat-content">
                            <h3>${this.stats.favoriteSpecies}</h3>
                            <p>Избранных видов</p>
                        </div>
                    </div>

                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="stat-content">
                            <h3>98%</h3>
                            <p>Точность совместимости</p>
                        </div>
                    </div>
                </div>

                <div class="dashboard-sections">
                    <div class="dashboard-section">
                        <h2>Быстрые действия</h2>
                        <div class="quick-actions">
                            <button class="action-btn" data-action="create-aquarium">
                                <i class="fas fa-plus"></i>
                                <span>Создать аквариум</span>
                            </button>
                            <button class="action-btn" data-action="browse-catalog">
                                <i class="fas fa-search"></i>
                                <span>Каталог видов</span>
                            </button>
                            <button class="action-btn" data-action="check-compatibility">
                                <i class="fas fa-check-circle"></i>
                                <span>Проверить совместимость</span>
                            </button>
                            <button class="action-btn" data-action="use-calculator">
                                <i class="fas fa-calculator"></i>
                                <span>Калькулятор</span>
                            </button>
                        </div>
                    </div>

                    <div class="dashboard-section">
                        <h2>Популярные виды</h2>
                        <div class="popular-species" id="popular-species">
                            <div class="loading">Загрузка...</div>
                        </div>
                    </div>

                    <div class="dashboard-section">
                        <h2>Недавние аквариумы</h2>
                        <div class="recent-aquariums" id="recent-aquariums">
                            ${this.stats.userAquariums > 0 ? 
                                '<div class="loading">Загрузка...</div>' : 
                                '<div class="empty-state"><p>У вас пока нет аквариумов</p><button class="btn-primary" data-action="create-aquarium">Создать первый аквариум</button></div>'
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Загружаем популярные виды
        this.loadPopularSpecies();
        
        // Загружаем недавние аквариумы
        if (this.stats.userAquariums > 0) {
            this.loadRecentAquariums();
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.getAttribute('data-action');
                this.handleAction(action);
            }
        });
    }

    handleAction(action) {
        switch (action) {
            case 'create-aquarium':
                this.createAquarium();
                break;
            case 'browse-catalog':
                this.browseCatalog();
                break;
            case 'check-compatibility':
                this.checkCompatibility();
                break;
            case 'use-calculator':
                this.useCalculator();
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    createAquarium() {
        if (window.modal) {
            window.modal.show({
                title: 'Создать новый аквариум',
                content: `
                    <form id="new-aquarium-form">
                        <div class="form-group">
                            <label for="aquarium-name">Название аквариума</label>
                            <input type="text" id="aquarium-name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="aquarium-volume">Объем (литры)</label>
                            <input type="number" id="aquarium-volume" name="volume" min="1" required>
                        </div>
                        <div class="form-group">
                            <label for="aquarium-type">Тип</label>
                            <select id="aquarium-type" name="type" required>
                                <option value="">Выберите тип</option>
                                <option value="freshwater">Пресноводный</option>
                                <option value="saltwater">Морской</option>
                                <option value="terrarium">Террариум</option>
                            </select>
                        </div>
                    </form>
                `,
                size: 'md',
                buttons: [
                    { text: 'Отмена', class: 'btn-secondary', action: 'cancel' },
                    { text: 'Создать', class: 'btn-primary', action: 'create', handler: this.saveNewAquarium.bind(this) }
                ]
            });
        }
    }

    saveNewAquarium() {
        const form = document.getElementById('new-aquarium-form');
        if (form) {
            const formData = new FormData(form);
            const aquarium = {
                id: Date.now().toString(),
                name: formData.get('name'),
                volume: parseInt(formData.get('volume')),
                type: formData.get('type'),
                species: [],
                createdAt: new Date().toISOString()
            };

            // Сохраняем в localStorage
            if (window.userStorage && window.userStorage.getAquariums && window.userStorage.saveAquariums) {
                const aquariums = window.userStorage.getAquariums();
                aquariums.push(aquarium);
                window.userStorage.saveAquariums(aquariums);
                
                // Обновляем статистику
                this.stats.userAquariums = aquariums.length;
                this.render();
                
                if (window.notifications) {
                    window.notifications.success('Аквариум успешно создан!');
                }
            }
        }
        return true; // Закрываем модальное окно
    }

    browseCatalog() {
        if (window.app && window.app.showSection) {
            window.app.showSection('catalog');
        }
    }

    checkCompatibility() {
        if (window.app && window.app.showSection) {
            window.app.showSection('compatibility');
        }
    }

    useCalculator() {
        if (window.app && window.app.showSection) {
            window.app.showSection('calculator');
        }
    }

    loadPopularSpecies() {
        const container = document.getElementById('popular-species');
        if (!container) return;

        // Имитация загрузки популярных видов
        setTimeout(() => {
            if (window.speciesDatabase && window.speciesDatabase.length > 0) {
                const popular = window.speciesDatabase
                    .filter(species => species.difficulty === 'easy')
                    .slice(0, 6);

                container.innerHTML = popular.map(species => `
                    <div class="species-card" data-species-id="${species.id}">
                        <img src="${species.image || 'assets/images/placeholder.jpg'}" alt="${species.name}">
                        <h4>${species.name}</h4>
                        <p>${species.scientificName || ''}</p>
                    </div>
                `).join('');
            } else {
                container.innerHTML = '<div class="empty-state">Данные загружаются...</div>';
            }
        }, 500);
    }

    loadRecentAquariums() {
        const container = document.getElementById('recent-aquariums');
        if (!container) return;

        setTimeout(() => {
            if (window.userStorage && window.userStorage.getAquariums) {
                const aquariums = window.userStorage.getAquariums().slice(-3);
                
                container.innerHTML = aquariums.map(aquarium => `
                    <div class="aquarium-card" data-aquarium-id="${aquarium.id}">
                        <h4>${aquarium.name}</h4>
                        <p>${aquarium.volume}L • ${aquarium.type}</p>
                        <span class="species-count">${aquarium.species ? aquarium.species.length : 0} видов</span>
                    </div>
                `).join('');
            }
        }, 300);
    }
}

// Создаем экземпляр и делаем доступным глобально
const dashboard = new Dashboard();
window.dashboard = dashboard;