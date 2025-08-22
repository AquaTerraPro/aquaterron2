// Главный файл приложения Акватеррон

class AquaTerronApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.isLoading = true;
        this.theme = localStorage.getItem('theme') || 'light';
        this.language = localStorage.getItem('language') || 'ru';
        this.modals = {};
        
        this.init();
    }

    init() {
        // Инициализация после загрузки DOM
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.applyTheme();
            this.showLoadingScreen();
            this.loadApp();
        });
    }

    setupEventListeners() {
        // Навигация
        this.setupNavigation();
        
        // Переключение темы
        this.setupThemeToggle();
        
        // Боковая панель
        this.setupSidebar();
        
        // Поиск
        this.setupSearch();
        
        // Модальные окна
        this.setupModals();
        
        // Быстрые действия
        this.setupQuickActions();
        
        // Адаптивность
        this.setupResponsive();
        
        // Обработка навигации по браузеру
        this.handleBrowserNavigation();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
            });
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    setupSidebar() {
        const sidebarToggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }

        // Закрытие сайдбара на мобильных устройствах при клике вне его
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1023) {
                const sidebar = document.getElementById('sidebar');
                const sidebarToggle = document.getElementById('sidebar-toggle');
                
                if (sidebar && !sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    setupSearch() {
        const searchBtn = document.getElementById('search-btn');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.showSection('catalog');
                const searchInput = document.getElementById('species-search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            });
        }
    }

    setupModals() {
        // Закрытие модальных окон
        const modalCloses = document.querySelectorAll('.modal-close');
        modalCloses.forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                const modal = closeBtn.closest('.modal');
                if (modal) {
                    this.closeModal(modal.id);
                }
            });
        });

        // Закрытие по клику на overlay
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeAllModals();
            });
        }

        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupQuickActions() {
        // Создание аквариума
        const createAquariumBtn = document.getElementById('create-aquarium-btn');
        if (createAquariumBtn) {
            createAquariumBtn.addEventListener('click', () => {
                this.openModal('create-aquarium-modal');
            });
        }

        // Поиск видов
        const searchSpeciesBtn = document.getElementById('search-species-btn');
        if (searchSpeciesBtn) {
            searchSpeciesBtn.addEventListener('click', () => {
                this.showSection('catalog');
            });
        }

        // Проверка совместимости
        const checkCompatibilityBtn = document.getElementById('check-compatibility-btn');
        if (checkCompatibilityBtn) {
            checkCompatibilityBtn.addEventListener('click', () => {
                this.showSection('compatibility');
            });
        }

        // Калькулятор
        const calculateRequirementsBtn = document.getElementById('calculate-requirements-btn');
        if (calculateRequirementsBtn) {
            calculateRequirementsBtn.addEventListener('click', () => {
                this.showSection('calculator');
            });
        }

        // Форма создания аквариума
        const createAquariumForm = document.getElementById('create-aquarium-form');
        if (createAquariumForm) {
            createAquariumForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCreateAquarium();
            });
        }

        // Кнопка отмены создания аквариума
        const cancelCreateAquariumBtn = document.getElementById('cancel-create-aquarium');
        if (cancelCreateAquariumBtn) {
            cancelCreateAquariumBtn.addEventListener('click', () => {
                this.closeModal('create-aquarium-modal');
            });
        }
    }

    setupResponsive() {
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        if (window.innerWidth <= 1023) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('collapsed');
            }
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (loadingScreen && app) {
            loadingScreen.style.display = 'flex';
            app.classList.add('hidden');
        }
    }

    loadApp() {
        // Имитация загрузки данных
        setTimeout(() => {
            this.hideLoadingScreen();
            this.loadInitialData();
        }, 2000);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (loadingScreen && app) {
            loadingScreen.style.display = 'none';
            app.classList.remove('hidden');
        }
    }

    loadInitialData() {
        // Загрузка начальных данных
        this.updateStats();
        this.loadRecentActivity();
    }

    updateStats() {
        // Обновление статистики
        const statsGrid = document.getElementById('stats-grid');
        if (statsGrid) {
            // Статистика уже загружена в HTML
        }
    }

    loadRecentActivity() {
        // Загрузка последней активности
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            // Активность уже загружена в HTML
        }
    }

    showSection(sectionName) {
        // Скрытие всех секций
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Показ выбранной секции
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Обновление активной ссылки в навигации
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionName) {
                link.classList.add('active');
            }
        });

        // Обновление заголовка страницы
        this.updatePageTitle(sectionName);
        
        // Обновление URL
        this.updateURL(sectionName);
        
        // Обновление текущей секции
        this.currentSection = sectionName;
    }

    updatePageTitle(sectionName) {
        const pageTitle = document.getElementById('page-title');
        const pageDescription = document.getElementById('page-description');
        
        const titles = {
            'dashboard': { title: 'Главная', desc: 'Планирование идеального аквариума' },
            'catalog': { title: 'Каталог', desc: 'Изучите базу данных рыб, растений и рептилий' },
            'compatibility': { title: 'Совместимость', desc: 'Узнайте, какие виды могут жить вместе' },
            'my-aquariums': { title: 'Мои аквариумы', desc: 'Управляйте своими аквариумами и террариумами' },
            'calculator': { title: 'Калькулятор', desc: 'Рассчитайте параметры для вашего аквариума' },
            'calendar': { title: 'Календарь', desc: 'Планируйте уход за вашими питомцами' },
            'forum': { title: 'Форум', desc: 'Общайтесь с другими аквариумистами' },
            'freelance': { title: 'Специалисты', desc: 'Найдите профессионалов для помощи' },
            'profile': { title: 'Профиль', desc: 'Управляйте настройками аккаунта' }
        };

        if (pageTitle && pageDescription && titles[sectionName]) {
            pageTitle.textContent = titles[sectionName].title;
            pageDescription.textContent = titles[sectionName].desc;
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            modal.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        const overlay = document.getElementById('modal-overlay');
        
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
        
        // Обновление иконки
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Обновление иконки темы
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    handleCreateAquarium() {
        const form = document.getElementById('create-aquarium-form');
        const formData = new FormData(form);
        
        const aquariumData = {
            name: formData.get('aquarium-name') || document.getElementById('aquarium-name').value,
            type: formData.get('aquarium-type') || document.getElementById('aquarium-type').value,
            volume: formData.get('aquarium-volume') || document.getElementById('aquarium-volume').value,
            temperature: formData.get('aquarium-temp') || document.getElementById('aquarium-temp').value
        };

        // Валидация
        if (!aquariumData.name || !aquariumData.type || !aquariumData.volume) {
            this.showError('Пожалуйста, заполните все обязательные поля');
            return;
        }

        // Сохранение в localStorage
        const aquariums = JSON.parse(localStorage.getItem('aquariums') || '[]');
        const newAquarium = {
            id: Date.now(),
            ...aquariumData,
            createdAt: new Date().toISOString()
        };
        
        aquariums.push(newAquarium);
        localStorage.setItem('aquariums', JSON.stringify(aquariums));

        // Показ уведомления
        this.showSuccess('Аквариум успешно создан!');
        
        // Закрытие модального окна
        this.closeModal('create-aquarium-modal');
        
        // Очистка формы
        form.reset();
        
        // Обновление активности
        this.loadRecentActivity();
    }

    showNotification(message, type = 'info') {
        // Создание уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Добавление в DOM
        document.body.appendChild(notification);

        // Обработка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Автоматическое удаление
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showWarning(message) {
        this.showNotification(message, 'warning');
    }

    // Утилиты для работы с данными
    getSpeciesById(id) {
        if (window.SpeciesDatabase) {
            return window.SpeciesDatabase.getSpeciesById(id);
        }
        return null;
    }

    searchSpecies(query) {
        if (window.SpeciesDatabase) {
            return window.SpeciesDatabase.searchSpecies(query);
        }
        return [];
    }

    checkCompatibility(species1, species2) {
        if (window.SpeciesDatabase) {
            return window.SpeciesDatabase.checkCompatibility(species1, species2);
        }
        return { compatible: false, reason: 'База данных недоступна' };
    }

    // Утилиты для работы с хранилищем
    saveToStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
        }
    }

    getFromStorage(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error);
            return defaultValue;
        }
    }

    removeFromStorage(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Ошибка удаления из localStorage:', error);
        }
    }

    // Утилиты для работы с URL
    updateURL(section) {
        if (history.pushState) {
            const url = new URL(window.location);
            url.hash = `#${section}`;
            history.pushState({}, '', url);
        }
    }

    getCurrentSectionFromURL() {
        const hash = window.location.hash;
        if (hash) {
            return hash.substring(1);
        }
        return 'dashboard';
    }

    // Обработка навигации по браузеру
    handleBrowserNavigation() {
        window.addEventListener('popstate', () => {
            const section = this.getCurrentSectionFromURL();
            this.showSection(section);
        });
    }
}

// Глобальные функции для совместимости
window.showSection = function(sectionName) {
    if (window.app) {
        window.app.showSection(sectionName);
    }
};

window.openModal = function(modalId) {
    if (window.app) {
        window.app.openModal(modalId);
    }
};

window.closeModal = function(modalId) {
    if (window.app) {
        window.app.closeModal(modalId);
    }
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AquaTerronApp();
});