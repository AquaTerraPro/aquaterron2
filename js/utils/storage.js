// Утилиты для работы с хранилищем данных

class Storage {
    constructor() {
        this.prefix = 'aquaterron_';
    }

    // Сохранение данных в localStorage
    set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serializedValue);
            return true;
        } catch (error) {
            console.error('Ошибка сохранения в localStorage:', error);
            return false;
        }
    }

    // Получение данных из localStorage
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            if (item === null) return defaultValue;
            return JSON.parse(item);
        } catch (error) {
            console.error('Ошибка чтения из localStorage:', error);
            return defaultValue;
        }
    }

    // Удаление данных из localStorage
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Ошибка удаления из localStorage:', error);
            return false;
        }
    }

    // Очистка всех данных приложения
    clear() {
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            console.error('Ошибка очистки localStorage:', error);
            return false;
        }
    }

    // Получение всех ключей приложения
    getKeys() {
        const keys = Object.keys(localStorage);
        return keys
            .filter(key => key.startsWith(this.prefix))
            .map(key => key.replace(this.prefix, ''));
    }

    // Проверка существования ключа
    has(key) {
        return localStorage.getItem(this.prefix + key) !== null;
    }

    // Получение размера хранилища
    getSize() {
        let total = 0;
        const keys = this.getKeys();
        keys.forEach(key => {
            const value = this.get(key);
            total += JSON.stringify(value).length;
        });
        return total;
    }
}

// Создаем единственный экземпляр
const storage = new Storage();

// Специфичные методы для приложения
const userStorage = {
    // Сохранение настроек пользователя
    saveSettings(settings) {
        return storage.set('settings', settings);
    },

    // Получение настроек пользователя
    getSettings() {
        return storage.get('settings', {
            theme: 'light',
            language: 'ru',
            notifications: true,
            autoSave: true
        });
    },

    // Сохранение аквариумов пользователя
    saveAquariums(aquariums) {
        return storage.set('aquariums', aquariums);
    },

    // Получение аквариумов пользователя
    getAquariums() {
        return storage.get('aquariums', []);
    },

    // Сохранение избранных видов
    saveFavorites(favorites) {
        return storage.set('favorites', favorites);
    },

    // Получение избранных видов
    getFavorites() {
        return storage.get('favorites', []);
    },

    // Сохранение истории поиска
    saveSearchHistory(history) {
        return storage.set('searchHistory', history);
    },

    // Получение истории поиска
    getSearchHistory() {
        return storage.get('searchHistory', []);
    }
};

// export default storage;