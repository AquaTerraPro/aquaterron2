// Страница профиля пользователя

class Profile {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const container = document.getElementById('profile-content');
        if (!container) return;

        container.innerHTML = `
            <div class="profile">
                <div class="profile-header">
                    <h1>Профиль</h1>
                    <p>Управление настройками и данными</p>
                </div>
                <div class="profile-content">
                    <p>Функция профиля будет реализована в следующей версии.</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Будет реализовано позже
    }
}

const profile = new Profile();
window.profile = profile;