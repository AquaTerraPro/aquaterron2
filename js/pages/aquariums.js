// Страница управления аквариумами

class Aquariums {
    constructor() {
        this.userAquariums = [];
        this.init();
    }

    init() {
        this.loadAquariums();
        this.render();
        this.setupEventListeners();
    }

    loadAquariums() {
        if (window.userStorage && window.userStorage.getAquariums) {
            this.userAquariums = window.userStorage.getAquariums();
        }
    }

    render() {
        const container = document.getElementById('my-aquariums-content');
        if (!container) return;

        container.innerHTML = `
            <div class="aquariums">
                <div class="aquariums-header">
                    <h1>Мои аквариумы</h1>
                    <button class="btn-primary" data-action="create-aquarium">
                        <i class="fas fa-plus"></i> Создать аквариум
                    </button>
                </div>
                <div class="aquariums-grid">
                    ${this.userAquariums.length > 0 ? 
                        this.userAquariums.map(aquarium => `
                            <div class="aquarium-card" data-aquarium-id="${aquarium.id}">
                                <h3>${aquarium.name}</h3>
                                <p>${aquarium.volume}L • ${aquarium.type}</p>
                                <p>${aquarium.species ? aquarium.species.length : 0} видов</p>
                            </div>
                        `).join('') : 
                        '<div class="empty-state"><p>У вас пока нет аквариумов</p></div>'
                    }
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="create-aquarium"]')) {
                if (window.dashboard && window.dashboard.createAquarium) {
                    window.dashboard.createAquarium();
                }
            }
        });
    }
}

const aquariums = new Aquariums();
window.aquariums = aquariums;