// Главный файл приложения Акватеррон

class AquaTerronApp {
    constructor() {
        this.currentSection = 'dashboard';
        this.isLoading = true;
        this.theme = localStorage.getItem('theme') || 'light';
        this.language = localStorage.getItem('language') || 'ru';
        
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
        
        // Адаптивность
        this.setupResponsive();
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
        const searchInput = document.getElementById('search-input');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.showSection('catalog');
                if (searchInput) {
                    searchInput.focus();
                }
            });
        }
    }

    setupModals() {
        const modalOverlay = document.getElementById('modal-overlay');
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeAllModals();
                }
            });
        }

        // Закрытие модальных окон по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupResponsive() {
        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Обработка ориентации устройства
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        });
    }

    handleResize() {
        const sidebar = document.getElementById('sidebar');
        
        if (window.innerWidth > 1023) {
            sidebar.classList.remove('open');
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

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        if (loadingScreen && app) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                app.classList.remove('hidden');
                this.isLoading = false;
            }, 1500);
        }
    }

    async loadApp() {
        try {
            // Симуляция загрузки данных
            await this.loadInitialData();
            
            // Инициализация компонентов
            this.initializeComponents();
            
            // Скрытие экрана загрузки
            this.hideLoadingScreen();
            
            // Показ главной страницы
            this.showSection('dashboard');
            
        } catch (error) {
            console.error('Ошибка загрузки приложения:', error);
            this.showError('Ошибка загрузки приложения');
        }
    }

    async loadInitialData() {
        // Симуляция загрузки данных
        return new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });
    }

    initializeComponents() {
        // Инициализация утилит
        if (window.StorageUtils) {
            window.StorageUtils.init();
        }
        
        if (window.NotificationUtils) {
            window.NotificationUtils.init();
        }

        // Инициализация компонентов
        if (window.ModalComponent) {
            window.ModalComponent.init();
        }

        if (window.SearchComponent) {
            window.SearchComponent.init();
        }

        // Инициализация страниц
        if (window.DashboardPage) {
            window.DashboardPage.init();
        }

        if (window.CatalogPage) {
            window.CatalogPage.init();
        }

        if (window.CompatibilityPage) {
            window.CompatibilityPage.init();
        }

        if (window.AquariumsPage) {
            window.AquariumsPage.init();
        }

        if (window.CalculatorPage) {
            window.CalculatorPage.init();
        }

        if (window.ProfilePage) {
            window.ProfilePage.init();
        }
    }

    showSection(sectionName) {
        // Скрытие всех секций
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Удаление активного класса у всех ссылок
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Показ выбранной секции
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Активация соответствующей ссылки
        const targetLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }

        // Обновление заголовка страницы
        this.updatePageTitle(sectionName);

        // Сохранение текущей секции
        this.currentSection = sectionName;

        // Закрытие сайдбара на мобильных устройствах
        if (window.innerWidth <= 1023) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        }

        // Вызов инициализации страницы
        this.initializePage(sectionName);
    }

    updatePageTitle(sectionName) {
        const pageTitle = document.getElementById('page-title');
        const pageDescription = document.getElementById('page-description');

        const titles = {
            dashboard: {
                title: 'Главная',
                description: 'Планирование идеального аквариума'
            },
            catalog: {
                title: 'Каталог',
                description: 'Поиск и фильтрация по базе данных'
            },
            compatibility: {
                title: 'Совместимость',
                description: 'Проверка совместимости видов'
            },
            'my-aquariums': {
                title: 'Мои аквариумы',
                description: 'Управление вашими аквариумами'
            },
            calculator: {
                title: 'Калькулятор',
                description: 'Расчет параметров аквариума'
            },
            calendar: {
                title: 'Календарь',
                description: 'Планировщик задач и история обслуживания'
            },
            forum: {
                title: 'Форум',
                description: 'Обсуждения и советы сообщества'
            },
            freelance: {
                title: 'Специалисты',
                description: 'Поиск мастеров и консультации'
            },
            profile: {
                title: 'Профиль',
                description: 'Настройки аккаунта'
            }
        };

        const sectionInfo = titles[sectionName] || {
            title: 'Страница',
            description: 'Описание страницы'
        };

        if (pageTitle) {
            pageTitle.textContent = sectionInfo.title;
        }

        if (pageDescription) {
            pageDescription.textContent = sectionInfo.description;
        }
    }

    initializePage(sectionName) {
        // Инициализация конкретной страницы
        switch (sectionName) {
            case 'dashboard':
                if (window.DashboardPage) {
                    window.DashboardPage.onShow();
                }
                break;
            case 'catalog':
                if (window.CatalogPage) {
                    window.CatalogPage.onShow();
                }
                break;
            case 'compatibility':
                if (window.CompatibilityPage) {
                    window.CompatibilityPage.onShow();
                }
                break;
            case 'my-aquariums':
                if (window.AquariumsPage) {
                    window.AquariumsPage.onShow();
                }
                break;
            case 'calculator':
                if (window.CalculatorPage) {
                    window.CalculatorPage.onShow();
                }
                break;
            case 'calendar':
                if (window.CalendarPage) {
                    window.CalendarPage.onShow();
                }
                break;
            case 'forum':
                if (window.ForumPage) {
                    window.ForumPage.onShow();
                }
                break;
            case 'freelance':
                if (window.FreelancePage) {
                    window.FreelancePage.onShow();
                }
                break;
            case 'profile':
                if (window.ProfilePage) {
                    window.ProfilePage.onShow();
                }
                break;
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            }
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modal-overlay');
        
        if (modal && overlay) {
            modal.classList.add('open');
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        const overlay = document.getElementById('modal-overlay');
        
        if (modal) {
            modal.classList.remove('open');
        }
        
        // Проверяем, есть ли другие открытые модальные окна
        const openModals = document.querySelectorAll('.modal.open');
        if (openModals.length === 0) {
            if (overlay) {
                overlay.style.display = 'none';
            }
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        const overlay = document.getElementById('modal-overlay');
        
        modals.forEach(modal => {
            modal.classList.remove('open');
        });
        
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        document.body.style.overflow = '';
    }

    showNotification(message, type = 'info', duration = 5000) {
        if (window.NotificationUtils) {
            window.NotificationUtils.show(message, type, duration);
        }
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
        if (window.StorageUtils) {
            window.StorageUtils.set(key, value);
        }
    }

    getFromStorage(key, defaultValue = null) {
        if (window.StorageUtils) {
            return window.StorageUtils.get(key, defaultValue);
        }
        return defaultValue;
    }

    removeFromStorage(key) {
        if (window.StorageUtils) {
            window.StorageUtils.remove(key);
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
