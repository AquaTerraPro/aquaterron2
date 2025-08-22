// Вспомогательные функции для Акватеррон

// Форматирование чисел
function formatNumber(num, decimals = 0) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

// Форматирование температуры
function formatTemperature(temp) {
    return `${temp}°C`;
}

// Форматирование pH
function formatPH(ph) {
    return `pH ${ph}`;
}

// Проверка совместимости параметров воды
function checkWaterCompatibility(species1, species2) {
    const tempOverlap = Math.max(0, Math.min(species1.temperature.max, species2.temperature.max) - 
                                   Math.max(species1.temperature.min, species2.temperature.min));
    const phOverlap = Math.max(0, Math.min(species1.ph.max, species2.ph.max) - 
                                  Math.max(species1.ph.min, species2.ph.min));
    
    return tempOverlap > 0 && phOverlap > 0;
}

// Генерация уникального ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Debounce функция
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Проверка валидности email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Капитализация первой буквы
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Обрезание текста
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// Расчет объема аквариума
function calculateTankVolume(length, width, height) {
    return (length * width * height) / 1000; // в литрах
}

// Расчет необходимой мощности обогревателя
function calculateHeaterPower(volume, roomTemp, targetTemp) {
    const tempDiff = targetTemp - roomTemp;
    return Math.ceil(volume * tempDiff * 0.5); // Вт
}