diff --git a/script.js b/script.js
--- a/script.js
+++ b/script.js
@@ -0,0 +1,387 @@
+// Основная логика приложения Акватеррон
+document.addEventListener('DOMContentLoaded', function() {
+    // Инициализация навигации
+    initNavigation();
+    
+    // Инициализация слайдеров
+    initSliders();
+    
+    // Инициализация переключателей
+    initToggles();
+    
+    // Инициализация кнопок действий
+    initActionButtons();
+    
+    // Симуляция данных в реальном времени
+    initRealTimeData();
+    
+    // Инициализация графика
+    initChart();
+});
+
+// Навигация между секциями
+function initNavigation() {
+    const navItems = document.querySelectorAll('.nav-item');
+    const sections = document.querySelectorAll('.section');
+    const pageTitle = document.getElementById('page-title');
+    
+    const titles = {
+        'dashboard': 'Панель управления',
+        'monitoring': 'Мониторинг',
+        'control': 'Управление',
+        'settings': 'Настройки'
+    };
+    
+    navItems.forEach(item => {
+        item.addEventListener('click', function(e) {
+            e.preventDefault();
+            
+            // Убираем активный класс со всех элементов
+            navItems.forEach(nav => nav.classList.remove('active'));
+            sections.forEach(section => section.classList.remove('active'));
+            
+            // Добавляем активный класс к выбранному элементу
+            this.classList.add('active');
+            
+            // Показываем соответствующую секцию
+            const sectionId = this.getAttribute('data-section');
+            const targetSection = document.getElementById(sectionId);
+            if (targetSection) {
+                targetSection.classList.add('active');
+                pageTitle.textContent = titles[sectionId] || 'Акватеррон';
+            }
+        });
+    });
+}
+
+// Инициализация слайдеров
+function initSliders() {
+    const sliders = document.querySelectorAll('.slider');
+    
+    sliders.forEach(slider => {
+        const valueDisplay = slider.nextElementSibling;
+        
+        // Обновляем значение при изменении слайдера
+        slider.addEventListener('input', function() {
+            if (this.id === 'tempSlider') {
+                valueDisplay.textContent = this.value + '°C';
+                updateStatCard('Температура', this.value + '°C');
+            } else if (this.id === 'humiditySlider') {
+                valueDisplay.textContent = this.value + '%';
+                updateStatCard('Влажность', this.value + '%');
+            }
+        });
+    });
+}
+
+// Инициализация переключателей
+function initToggles() {
+    const toggles = document.querySelectorAll('.toggle');
+    
+    toggles.forEach(toggle => {
+        toggle.addEventListener('change', function() {
+            if (this.id === 'lightToggle') {
+                const status = this.checked ? 'Включено' : 'Выключено';
+                updateStatCard('Освещение', status);
+                
+                // Добавляем запись в логи
+                addLogEntry('INFO', `Освещение ${this.checked ? 'включено' : 'выключено'}`);
+            }
+        });
+    });
+}
+
+// Инициализация кнопок действий
+function initActionButtons() {
+    const actionButtons = document.querySelectorAll('.action-btn');
+    
+    actionButtons.forEach(button => {
+        button.addEventListener('click', function() {
+            const action = this.textContent.trim();
+            
+            // Добавляем визуальный эффект нажатия
+            this.style.transform = 'scale(0.95)';
+            setTimeout(() => {
+                this.style.transform = '';
+            }, 150);
+            
+            // Обрабатываем различные действия
+            switch(action) {
+                case 'Автоматический режим':
+                    enableAutoMode();
+                    break;
+                case 'Пауза':
+                    pauseSystem();
+                    break;
+                case 'Аварийная остановка':
+                    emergencyStop();
+                    break;
+            }
+        });
+    });
+}
+
+// Включение автоматического режима
+function enableAutoMode() {
+    addLogEntry('INFO', 'Автоматический режим включен');
+    
+    // Анимация изменения статуса
+    const statusElements = document.querySelectorAll('.stat-status');
+    statusElements.forEach(status => {
+        if (status.textContent === 'Норма' || status.textContent === 'Активно') {
+            status.textContent = 'Авто';
+            status.className = 'stat-status active';
+        }
+    });
+    
+    // Показываем уведомление
+    showNotification('Автоматический режим включен', 'success');
+}
+
+// Пауза системы
+function pauseSystem() {
+    addLogEntry('WARN', 'Система приостановлена');
+    
+    // Анимация изменения статуса
+    const statusElements = document.querySelectorAll('.stat-status');
+    statusElements.forEach(status => {
+        status.textContent = 'Пауза';
+        status.className = 'stat-status warning';
+    });
+    
+    showNotification('Система приостановлена', 'warning');
+}
+
+// Аварийная остановка
+function emergencyStop() {
+    addLogEntry('ERROR', 'Аварийная остановка системы');
+    
+    // Анимация изменения статуса
+    const statusElements = document.querySelectorAll('.stat-status');
+    statusElements.forEach(status => {
+        status.textContent = 'Остановлено';
+        status.className = 'stat-status warning';
+    });
+    
+    showNotification('Аварийная остановка выполнена', 'error');
+}
+
+// Обновление статистических карточек
+function updateStatCard(title, value) {
+    const statCards = document.querySelectorAll('.stat-card');
+    
+    statCards.forEach(card => {
+        const cardTitle = card.querySelector('h3').textContent;
+        if (cardTitle === title) {
+            const valueElement = card.querySelector('.stat-value');
+            valueElement.textContent = value;
+            
+            // Добавляем анимацию обновления
+            valueElement.style.transform = 'scale(1.1)';
+            setTimeout(() => {
+                valueElement.style.transform = 'scale(1)';
+            }, 200);
+        }
+    });
+}
+
+// Добавление записи в логи
+function addLogEntry(level, message) {
+    const logContainer = document.querySelector('.log-container');
+    if (!logContainer) return;
+    
+    const logEntry = document.createElement('div');
+    logEntry.className = 'log-entry';
+    
+    const time = new Date().toLocaleTimeString();
+    
+    logEntry.innerHTML = `
+        <span class="log-time">${time}</span>
+        <span class="log-level ${level.toLowerCase()}">${level}</span>
+        <span class="log-message">${message}</span>
+    `;
+    
+    // Добавляем новую запись в начало
+    logContainer.insertBefore(logEntry, logContainer.firstChild);
+    
+    // Ограничиваем количество записей
+    const entries = logContainer.querySelectorAll('.log-entry');
+    if (entries.length > 10) {
+        logContainer.removeChild(entries[entries.length - 1]);
+    }
+}
+
+// Показ уведомлений
+function showNotification(message, type = 'info') {
+    // Создаем элемент уведомления
+    const notification = document.createElement('div');
+    notification.className = `notification ${type}`;
+    notification.textContent = message;
+    
+    // Стили для уведомления
+    notification.style.cssText = `
+        position: fixed;
+        top: 20px;
+        right: 20px;
+        padding: 1rem 1.5rem;
+        border-radius: 8px;
+        color: white;
+        font-weight: 500;
+        z-index: 1000;
+        transform: translateX(100%);
+        transition: transform 0.3s ease;
+        max-width: 300px;
+    `;
+    
+    // Цвета для разных типов уведомлений
+    const colors = {
+        success: '#22c55e',
+        warning: '#f59e0b',
+        error: '#ef4444',
+        info: '#3b82f6'
+    };
+    
+    notification.style.background = colors[type] || colors.info;
+    
+    document.body.appendChild(notification);
+    
+    // Анимация появления
+    setTimeout(() => {
+        notification.style.transform = 'translateX(0)';
+    }, 100);
+    
+    // Автоматическое удаление через 3 секунды
+    setTimeout(() => {
+        notification.style.transform = 'translateX(100%)';
+        setTimeout(() => {
+            if (notification.parentNode) {
+                notification.parentNode.removeChild(notification);
+            }
+        }, 300);
+    }, 3000);
+}
+
+// Симуляция данных в реальном времени
+function initRealTimeData() {
+    setInterval(() => {
+        // Симулируем изменение температуры
+        const tempSlider = document.getElementById('tempSlider');
+        if (tempSlider) {
+            const currentTemp = parseFloat(tempSlider.value);
+            const variation = (Math.random() - 0.5) * 2; // ±1°C
+            const newTemp = Math.max(15, Math.min(35, currentTemp + variation));
+            tempSlider.value = newTemp;
+            
+            // Обновляем отображение
+            const valueDisplay = tempSlider.nextElementSibling;
+            valueDisplay.textContent = newTemp.toFixed(1) + '°C';
+            updateStatCard('Температура', newTemp.toFixed(1) + '°C');
+        }
+        
+        // Симулируем изменение влажности
+        const humiditySlider = document.getElementById('humiditySlider');
+        if (humiditySlider) {
+            const currentHumidity = parseFloat(humiditySlider.value);
+            const variation = (Math.random() - 0.5) * 4; // ±2%
+            const newHumidity = Math.max(30, Math.min(90, currentHumidity + variation));
+            humiditySlider.value = newHumidity;
+            
+            // Обновляем отображение
+            const valueDisplay = humiditySlider.nextElementSibling;
+            valueDisplay.textContent = Math.round(newHumidity) + '%';
+            updateStatCard('Влажность', Math.round(newHumidity) + '%');
+        }
+        
+        // Симулируем изменение энергии
+        const energyValue = Math.max(20, Math.min(100, 78 + (Math.random() - 0.5) * 10));
+        updateStatCard('Энергия', Math.round(energyValue) + '%');
+        
+    }, 5000); // Обновляем каждые 5 секунд
+}
+
+// Инициализация графика
+function initChart() {
+    const canvas = document.getElementById('tempChart');
+    if (!canvas) return;
+    
+    const ctx = canvas.getContext('2d');
+    canvas.width = canvas.offsetWidth;
+    canvas.height = 200;
+    
+    // Создаем простой график
+    const data = [];
+    for (let i = 0; i < 24; i++) {
+        data.push(20 + Math.sin(i * 0.3) * 5 + Math.random() * 2);
+    }
+    
+    // Рисуем график
+    ctx.strokeStyle = '#667eea';
+    ctx.lineWidth = 2;
+    ctx.beginPath();
+    
+    const stepX = canvas.width / (data.length - 1);
+    const stepY = canvas.height / 20;
+    
+    data.forEach((value, index) => {
+        const x = index * stepX;
+        const y = canvas.height - (value - 15) * stepY;
+        
+        if (index === 0) {
+            ctx.moveTo(x, y);
+        } else {
+            ctx.lineTo(x, y);
+        }
+    });
+    
+    ctx.stroke();
+    
+    // Добавляем точки
+    ctx.fillStyle = '#667eea';
+    data.forEach((value, index) => {
+        const x = index * stepX;
+        const y = canvas.height - (value - 15) * stepY;
+        
+        ctx.beginPath();
+        ctx.arc(x, y, 3, 0, 2 * Math.PI);
+        ctx.fill();
+    });
+}
+
+// Обработка изменений в настройках
+document.addEventListener('change', function(e) {
+    if (e.target.type === 'checkbox' && e.target.closest('.automation-settings')) {
+        const settingName = e.target.parentElement.textContent.trim();
+        const status = e.target.checked ? 'включена' : 'отключена';
+        addLogEntry('INFO', `Автоматизация "${settingName}" ${status}`);
+    }
+    
+    if (e.target.classList.contains('setting-select')) {
+        const settingName = e.target.previousElementSibling.textContent;
+        const value = e.target.value;
+        addLogEntry('INFO', `Настройка "${settingName}" изменена на "${value}"`);
+    }
+});
+
+// Добавляем обработчик для клавиши Escape (закрытие уведомлений)
+document.addEventListener('keydown', function(e) {
+    if (e.key === 'Escape') {
+        const notifications = document.querySelectorAll('.notification');
+        notifications.forEach(notification => {
+            notification.style.transform = 'translateX(100%)';
+            setTimeout(() => {
+                if (notification.parentNode) {
+                    notification.parentNode.removeChild(notification);
+                }
+            }, 300);
+        });
+    }
+});
+
+// Инициализация при загрузке страницы
+window.addEventListener('load', function() {
+    // Добавляем приветственное сообщение
+    setTimeout(() => {
+        addLogEntry('INFO', 'Система Акватеррон полностью загружена');
+        showNotification('Добро пожаловать в Акватеррон!', 'success');
+    }, 1000);
+});
