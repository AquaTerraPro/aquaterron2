// Система уведомлений для Акватеррон

class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.init();
    }

    init() {
        // Создаем контейнер для уведомлений
        this.container = document.createElement('div');
        this.container.id = 'notifications-container';
        this.container.className = 'notifications-container';
        document.body.appendChild(this.container);

        // Добавляем стили
        this.injectStyles();
    }

    injectStyles() {
        const styles = `
            .notifications-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            }
            
            .notification {
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                margin-bottom: 10px;
                padding: 16px;
                max-width: 350px;
                pointer-events: auto;
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .notification.success {
                border-left: 4px solid var(--color-success-500, #22c55e);
            }
            
            .notification.error {
                border-left: 4px solid var(--color-error-500, #ef4444);
            }
            
            .notification.warning {
                border-left: 4px solid var(--color-warning-500, #f59e0b);
            }
            
            .notification.info {
                border-left: 4px solid var(--color-primary-500, #3b82f6);
            }
            
            .notification-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }
            
            .notification-title {
                font-weight: 600;
                font-size: 14px;
                color: var(--color-text-primary, #0f172a);
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: var(--color-text-tertiary, #64748b);
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--color-text-primary, #0f172a);
            }
            
            .notification-message {
                font-size: 13px;
                color: var(--color-text-secondary, #475569);
                line-height: 1.4;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    show(message, type = 'info', title = '', duration = 5000) {
        const notification = this.createNotification(message, type, title);
        this.container.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Автоматически скрываем через заданное время
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }

        return notification;
    }

    createNotification(message, type, title) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const defaultTitles = {
            success: 'Успешно',
            error: 'Ошибка',
            warning: 'Внимание',
            info: 'Информация'
        };

        const notificationTitle = title || defaultTitles[type] || 'Уведомление';

        notification.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">${notificationTitle}</div>
                <button class="notification-close" onclick="notifications.hide(this.closest('.notification'))">&times;</button>
            </div>
            <div class="notification-message">${message}</div>
        `;

        return notification;
    }

    hide(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Методы для различных типов уведомлений
    success(message, title = '', duration = 5000) {
        return this.show(message, 'success', title, duration);
    }

    error(message, title = '', duration = 0) {
        return this.show(message, 'error', title, duration);
    }

    warning(message, title = '', duration = 7000) {
        return this.show(message, 'warning', title, duration);
    }

    info(message, title = '', duration = 5000) {
        return this.show(message, 'info', title, duration);
    }

    // Очистка всех уведомлений
    clear() {
        const notifications = this.container.querySelectorAll('.notification');
        notifications.forEach(notification => this.hide(notification));
    }
}

// Создаем глобальный экземпляр
const notifications = new NotificationSystem();

// Экспортируем для использования в модулях
// export default notifications;

// Делаем доступным глобально для использования в HTML
window.notifications = notifications;