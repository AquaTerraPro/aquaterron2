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
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.applyTheme();
            this.showLoadingScreen();
            this.loadApp();
        });
    }

    setupEventListeners() {
        this.setupNavigation();
        this.setupThemeToggle();
        this.setupSidebar();
        this.setupSearch();
        this.setupModals();
        this.setupResponsive();
        this.handleBrowserNavigation();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.showSection(section);
                this.updateURL(section);
            });
        });
        const initial = this.getCurrentSectionFromURL();
        if (initial && initial !== 'dashboard') {
            this.showSection(initial);
        }
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
                sidebar.classList.toggle('open');
            });
        }
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1023) {
                const st = document.getElementById('sidebar-toggle');
                if (sidebar && !sidebar.contains(e.target) && st && !st.contains(e.target)) {
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
                if (searchInput) searchInput.focus();
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
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeAllModals();
        });
    }

    setupResponsive() {
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('orientationchange', () => setTimeout(() => this.handleResize(), 100));
    }

    handleResize() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth > 1023 && sidebar) sidebar.classList.remove('open');
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
            }, 600);
        }
    }

    async loadApp() {
        try {
            await this.loadInitialData();
            this.initializeComponents();
            this.hideLoadingScreen();
            this.showSection(this.getCurrentSectionFromURL());
        } catch (error) {
            console.error('Ошибка загрузки приложения:', error);
            this.showError('Ошибка загрузки приложения');
        }
    }

    async loadInitialData() { return new Promise((resolve) => setTimeout(resolve, 300)); }

    initializeComponents() {
        if (window.StorageUtils) window.StorageUtils.init();
        if (window.NotificationUtils) window.NotificationUtils.init();
        if (window.ModalComponent) window.ModalComponent.init();
        if (window.SearchComponent) window.SearchComponent.init();
        if (window.DashboardPage) window.DashboardPage.init();
        if (window.CatalogPage) window.CatalogPage.init();
        if (window.CompatibilityPage) window.CompatibilityPage.init();
        if (window.AquariumsPage) window.AquariumsPage.init();
        if (window.CalculatorPage) window.CalculatorPage.init();
        if (window.CalendarPage) window.CalendarPage.init();
        if (window.ForumPage) window.ForumPage.init();
        if (window.FreelancePage) window.FreelancePage.init();
        if (window.ProfilePage) window.ProfilePage.init();
    }

    showSection(sectionName) {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => section.classList.remove('active'));
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        const name = sectionName || 'dashboard';
        const targetSection = document.getElementById(name);
        if (targetSection) targetSection.classList.add('active');
        const targetLink = document.querySelector(`[data-section="${name}"]`);
        if (targetLink) targetLink.classList.add('active');
        this.updatePageTitle(name);
        this.currentSection = name;
        if (window.innerWidth <= 1023) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.remove('open');
        }
        this.initializePage(name);
    }

    updatePageTitle(sectionName) {
        const pageTitle = document.getElementById('page-title');
        const pageDescription = document.getElementById('page-description');
        const titles = {
            dashboard: { title: 'Главная', description: 'Планирование идеального аквариума' },
            catalog: { title: 'Каталог', description: 'Поиск и фильтрация по базе данных' },
            compatibility: { title: 'Совместимость', description: 'Проверка совместимости видов' },
            'my-aquariums': { title: 'Мои аквариумы', description: 'Управление вашими аквариумами' },
            calculator: { title: 'Калькулятор', description: 'Расчет параметров аквариума' },
            calendar: { title: 'Календарь', description: 'Планировщик задач и история обслуживания' },
            forum: { title: 'Форум', description: 'Обсуждения и советы сообщества' },
            freelance: { title: 'Специалисты', description: 'Поиск мастеров и консультации' },
            profile: { title: 'Профиль', description: 'Настройки аккаунта' }
        };
        const info = titles[sectionName] || { title: 'Страница', description: 'Описание страницы' };
        if (pageTitle) pageTitle.textContent = info.title;
        if (pageDescription) pageDescription.textContent = info.description;
    }

    initializePage(sectionName) {
        switch (sectionName) {
            case 'dashboard': if (window.DashboardPage) window.DashboardPage.onShow(); break;
            case 'catalog': if (window.CatalogPage) window.CatalogPage.onShow(); break;
            case 'compatibility': if (window.CompatibilityPage) window.CompatibilityPage.onShow(); break;
            case 'my-aquariums': if (window.AquariumsPage) window.AquariumsPage.onShow(); break;
            case 'calculator': if (window.CalculatorPage) window.CalculatorPage.onShow(); break;
            case 'calendar': if (window.CalendarPage) window.CalendarPage.onShow(); break;
            case 'forum': if (window.ForumPage) window.ForumPage.onShow(); break;
            case 'freelance': if (window.FreelancePage) window.FreelancePage.onShow(); break;
            case 'profile': if (window.ProfilePage) window.ProfilePage.onShow(); break;
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
            if (icon) icon.className = this.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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
        if (modal) modal.classList.remove('open');
        const openModals = document.querySelectorAll('.modal.open');
        if (openModals.length === 0) {
            if (overlay) overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        const overlay = document.getElementById('modal-overlay');
        modals.forEach(m => m.classList.remove('open'));
        if (overlay) overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    showNotification(message, type = 'info', duration = 5000) { if (window.NotificationUtils) window.NotificationUtils.show(message, type, duration); }
    showError(message) { this.showNotification(message, 'error'); }
    showSuccess(message) { this.showNotification(message, 'success'); }
    showWarning(message) { this.showNotification(message, 'warning'); }

    getSpeciesById(id) { return window.SpeciesDatabase && window.SpeciesDatabase.getSpeciesById ? window.SpeciesDatabase.getSpeciesById(id) : null; }
    searchSpecies(query) { return window.SpeciesDatabase && window.SpeciesDatabase.searchSpecies ? window.SpeciesDatabase.searchSpecies(query) : []; }
    checkCompatibility(species1, species2) { return window.SpeciesDatabase && window.SpeciesDatabase.checkCompatibility ? window.SpeciesDatabase.checkCompatibility(species1, species2) : { compatible:false, reason:'База данных недоступна' }; }

    saveToStorage(key, value) { if (window.StorageUtils) window.StorageUtils.set(key, value); }
    getFromStorage(key, defaultValue = null) { return window.StorageUtils ? window.StorageUtils.get(key, defaultValue) : defaultValue; }
    removeFromStorage(key) { if (window.StorageUtils) window.StorageUtils.remove(key); }

    updateURL(section) {
        if (history.pushState) {
            const url = new URL(window.location);
            url.hash = `#${section}`;
            history.pushState({}, '', url);
        }
    }

    getCurrentSectionFromURL() { const hash = window.location.hash; return hash ? hash.substring(1) : 'dashboard'; }

    handleBrowserNavigation() { window.addEventListener('popstate', () => this.showSection(this.getCurrentSectionFromURL())); }
}

// Глобальные функции
window.showSection = function(sectionName) { if (window.app) window.app.showSection(sectionName); };
window.openModal = function(modalId) { if (window.app) window.app.openModal(modalId); };
window.closeModal = function(modalId) { if (window.app) window.app.closeModal(modalId); };

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => { window.app = new AquaTerronApp(); });
