// Компонент модальных окон для Акватеррон

class Modal {
    constructor() {
        this.activeModal = null;
        this.init();
    }

    init() {
        // Добавляем стили для модальных окон
        this.injectStyles();
        
        // Обработчик закрытия по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });
    }

    injectStyles() {
        const styles = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--color-bg-overlay, rgba(0, 0, 0, 0.5));
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: var(--z-modal, 1050);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal {
                background: var(--color-bg-primary, white);
                border-radius: var(--radius-lg, 0.5rem);
                box-shadow: var(--shadow-2xl, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
                max-width: 90vw;
                max-height: 90vh;
                overflow: hidden;
                transform: scale(0.9) translateY(-20px);
                transition: all 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            
            .modal-overlay.active .modal {
                transform: scale(1) translateY(0);
            }
            
            .modal-header {
                padding: var(--space-6, 1.5rem);
                border-bottom: 1px solid var(--color-border-primary, #e2e8f0);
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-shrink: 0;
            }
            
            .modal-title {
                font-size: var(--font-size-lg, 1.125rem);
                font-weight: var(--font-weight-semibold, 600);
                color: var(--color-text-primary, #0f172a);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: var(--color-text-tertiary, #64748b);
                padding: var(--space-2, 0.5rem);
                border-radius: var(--radius-md, 0.375rem);
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
            }
            
            .modal-close:hover {
                color: var(--color-text-primary, #0f172a);
                background: var(--color-neutral-100, #f1f5f9);
            }
            
            .modal-body {
                padding: var(--space-6, 1.5rem);
                overflow-y: auto;
                flex: 1;
            }
            
            .modal-footer {
                padding: var(--space-6, 1.5rem);
                border-top: 1px solid var(--color-border-primary, #e2e8f0);
                display: flex;
                gap: var(--space-3, 0.75rem);
                justify-content: flex-end;
                flex-shrink: 0;
            }
            
            .modal-sm { width: 400px; }
            .modal-md { width: 500px; }
            .modal-lg { width: 700px; }
            .modal-xl { width: 900px; }
            .modal-full { width: 95vw; height: 95vh; }
            
            @media (max-width: 768px) {
                .modal {
                    width: 95vw !important;
                    max-height: 85vh;
                }
                
                .modal-header,
                .modal-body,
                .modal-footer {
                    padding: var(--space-4, 1rem);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    show(options = {}) {
        const {
            title = 'Модальное окно',
            content = '',
            size = 'md',
            buttons = [],
            closable = true,
            onClose = null
        } = options;

        // Создаем модальное окно
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal modal-${size}">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    ${closable ? '<button class="modal-close" data-modal-close>&times;</button>' : ''}
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${buttons.length > 0 ? `
                    <div class="modal-footer">
                        ${buttons.map(button => `
                            <button class="btn ${button.class || 'btn-secondary'}" 
                                    data-modal-action="${button.action || 'close'}">
                                ${button.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        // Добавляем в DOM
        document.body.appendChild(overlay);
        this.activeModal = overlay;

        // Обработчики событий
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay && closable) {
                this.close();
            }
        });

        overlay.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-modal-close')) {
                this.close();
            }
            
            if (e.target.hasAttribute('data-modal-action')) {
                const action = e.target.getAttribute('data-modal-action');
                const button = buttons.find(btn => btn.action === action);
                
                if (button && button.handler) {
                    const result = button.handler();
                    if (result !== false) {
                        this.close();
                    }
                } else if (action === 'close') {
                    this.close();
                }
            }
        });

        // Показываем модальное окно
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);

        // Сохраняем callback закрытия
        this.onCloseCallback = onClose;

        return overlay;
    }

    close() {
        if (!this.activeModal) return;

        this.activeModal.classList.remove('active');
        
        setTimeout(() => {
            if (this.activeModal && this.activeModal.parentNode) {
                this.activeModal.parentNode.removeChild(this.activeModal);
            }
            
            if (this.onCloseCallback) {
                this.onCloseCallback();
                this.onCloseCallback = null;
            }
            
            this.activeModal = null;
        }, 300);
    }

    // Предустановленные модальные окна
    confirm(title, message, onConfirm, onCancel) {
        return this.show({
            title,
            content: `<p>${message}</p>`,
            size: 'sm',
            buttons: [
                {
                    text: 'Отмена',
                    class: 'btn-secondary',
                    action: 'cancel',
                    handler: () => {
                        if (onCancel) onCancel();
                        return true;
                    }
                },
                {
                    text: 'Подтвердить',
                    class: 'btn-primary',
                    action: 'confirm',
                    handler: () => {
                        if (onConfirm) onConfirm();
                        return true;
                    }
                }
            ]
        });
    }

    alert(title, message, onOk) {
        return this.show({
            title,
            content: `<p>${message}</p>`,
            size: 'sm',
            buttons: [
                {
                    text: 'OK',
                    class: 'btn-primary',
                    action: 'ok',
                    handler: () => {
                        if (onOk) onOk();
                        return true;
                    }
                }
            ]
        });
    }
}

// Создаем глобальный экземпляр
const modal = new Modal();

// Экспортируем для использования в модулях
// export default modal;

// Делаем доступным глобально
window.modal = modal;