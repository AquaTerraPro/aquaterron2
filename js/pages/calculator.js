// Калькулятор аквариума

class Calculator {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const container = document.getElementById('calculator-content');
        if (!container) return;

        container.innerHTML = `
            <div class="calculator">
                <div class="calculator-header">
                    <h1>Калькулятор аквариума</h1>
                    <p>Рассчитайте параметры для вашего аквариума</p>
                </div>
                <div class="calculator-content">
                    <div class="calculator-form">
                        <div class="form-group">
                            <label for="tank-length">Длина (см):</label>
                            <input type="number" id="tank-length" min="1">
                        </div>
                        <div class="form-group">
                            <label for="tank-width">Ширина (см):</label>
                            <input type="number" id="tank-width" min="1">
                        </div>
                        <div class="form-group">
                            <label for="tank-height">Высота (см):</label>
                            <input type="number" id="tank-height" min="1">
                        </div>
                        <button id="calculate-btn" class="btn-primary">Рассчитать</button>
                    </div>
                    <div id="calculation-results" class="calculation-results">
                        <!-- Результаты расчета -->
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const calculateBtn = document.getElementById('calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculate();
            });
        }
    }

    calculate() {
        const length = parseFloat(document.getElementById('tank-length').value) || 0;
        const width = parseFloat(document.getElementById('tank-width').value) || 0;
        const height = parseFloat(document.getElementById('tank-height').value) || 0;

        if (length <= 0 || width <= 0 || height <= 0) {
            if (window.notifications) {
                window.notifications.warning('Пожалуйста, введите корректные размеры');
            }
            return;
        }

        const volume = (length * width * height) / 1000; // в литрах
        const surfaceArea = (length * width) / 10000; // в м²

        const resultsContainer = document.getElementById('calculation-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="results">
                    <h3>Результаты расчета</h3>
                    <div class="result-item">
                        <strong>Объем:</strong> ${volume.toFixed(1)} литров
                    </div>
                    <div class="result-item">
                        <strong>Площадь поверхности:</strong> ${surfaceArea.toFixed(2)} м²
                    </div>
                </div>
            `;
        }
    }
}

const calculator = new Calculator();
window.calculator = calculator;