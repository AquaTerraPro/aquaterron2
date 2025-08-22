diff --git a/js/pages/calendar.js b/js/pages/calendar.js
--- a/js/pages/calendar.js
++ b/js/pages/calendar.js
@@ -0,0 +1,135 @@
// Страница: Календарь
window.CalendarPage = (function() {
    const STORAGE_KEY = 'calendar_events_v1';

    function getEvents() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (_) {
            return [];
        }
    }

    function saveEvents(events) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    }

    function addEvent(event) {
        const events = getEvents();
        events.push({ id: crypto.randomUUID ? crypto.randomUUID() : Date.now(), ...event });
        saveEvents(events);
    }

    function renderList() {
        const list = document.getElementById('calendar-list');
        if (!list) return;
        const system = document.getElementById('calendar-system-select')?.value || 'all';
        const type = document.getElementById('calendar-type-select')?.value || 'all';

        const events = getEvents()
            .filter(e => (system === 'all' || e.system === system))
            .filter(e => (type === 'all' || e.type === type))
            .sort((a, b) => (a.date || '').localeCompare(b.date || ''));

        if (events.length === 0) {
            list.innerHTML = '<div class="compatibility-section"><p>Событий пока нет. Добавьте первое в форме выше.</p></div>';
            return;
        }

        list.innerHTML = events.map(e => `
            <div class="compatibility-section">
                <div class="compatibility-header">
                    <div class="compatibility-icon ${e.type === 'note' ? 'warning' : 'compatible'}">
                        <i class="fas ${iconForType(e.type)}"></i>
                    </div>
                    <h3 class="compatibility-title">${escapeHtml(e.title)} — ${formatDate(e.date)}</h3>
                </div>
                <div class="catalog-item-description">${escapeHtml(e.notes || '')}</div>
                <div class="meta-item"><i class="fas fa-layer-group meta-icon"></i> Система: ${escapeHtml(e.system || '—')}</div>
            </div>
        `).join('');
    }

    function iconForType(type) {
        switch (type) {
            case 'water_change': return 'fa-sync';
            case 'feeding': return 'fa-utensils';
            case 'filter_clean': return 'fa-filter';
            case 'measurement': return 'fa-vial';
            case 'note': return 'fa-sticky-note';
            default: return 'fa-calendar-alt';
        }
    }

    function formatDate(iso) {
        if (!iso) return 'Без даты';
        try {
            const d = new Date(iso);
            return d.toLocaleDateString('ru-RU');
        } catch (_) {
            return iso;
        }
    }

    function escapeHtml(s) {
        return (s || '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

    function bindEvents() {
        const addBtn = document.getElementById('calendar-add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const date = document.getElementById('calendar-date').value;
                const title = document.getElementById('calendar-title').value.trim();
                const notes = document.getElementById('calendar-notes').value.trim();
                const system = document.getElementById('calendar-system-select').value;
                const type = document.getElementById('calendar-type-select').value;

                if (!title) {
                    window.app?.showWarning('Введите название события');
                    return;
                }

                addEvent({ date, title, notes, system, type });
                document.getElementById('calendar-title').value = '';
                document.getElementById('calendar-notes').value = '';
                renderList();
                window.app?.showSuccess('Событие добавлено');
            });
        }

        const selects = ['calendar-system-select', 'calendar-type-select'];
        selects.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', renderList);
        });
    }

    function seedSystems() {
        const select = document.getElementById('calendar-system-select');
        if (!select) return;
        const systems = JSON.parse(localStorage.getItem('aquariums_list_v1') || '[]');
        systems.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id || s.name;
            opt.textContent = s.name || 'Без названия';
            select.appendChild(opt);
        });
    }

    return {
        init() {
            // nothing heavy
        },
        onShow() {
            seedSystems();
            bindEvents();
            renderList();
        }
    };
})();


