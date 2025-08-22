// Страница проверки совместимости видов

class Compatibility {
    constructor() {
        this.selectedSpecies = [];
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const container = document.getElementById('compatibility-content');
        if (!container) return;

        container.innerHTML = `
            <div class="compatibility">
                <div class="compatibility-header">
                    <h1>Проверка совместимости</h1>
                    <p>Выберите виды для проверки их совместимости</p>
                </div>
                <div class="compatibility-content">
                    <p>Функция проверки совместимости будет реализована в следующей версии.</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Будет реализовано позже
    }
}

const compatibility = new Compatibility();
window.compatibility = compatibility;