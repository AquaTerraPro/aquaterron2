// Страница: Форум
window.ForumPage = (function() {
    const DUMMY_TOPICS = [
        { id: 't1', title: 'Белые пятна у неона — что делать?', category: 'diseases', author: 'Мария', replies: 12, updatedAt: '2025-08-10T12:00:00Z' },
        { id: 't2', title: 'Помогите подобрать дизайн под 100л', category: 'design', author: 'Игорь', replies: 7, updatedAt: '2025-08-14T09:30:00Z' },
        { id: 't3', title: 'Фильтр шумит — норм или брак?', category: 'equipment', author: 'Светлана', replies: 4, updatedAt: '2025-08-15T18:20:00Z' },
        { id: 't4', title: 'Помутнение воды после подмены', category: 'errors', author: 'Антон', replies: 5, updatedAt: '2025-08-12T08:45:00Z' }
    ];

    function render() {
        const container = document.getElementById('forum-topics');
        if (!container) return;
        const category = document.getElementById('forum-category')?.value || 'all';
        const query = (document.getElementById('forum-search')?.value || '').toLowerCase();

        const items = DUMMY_TOPICS
            .filter(t => category === 'all' || t.category === category)
            .filter(t => !query || t.title.toLowerCase().includes(query));

        container.innerHTML = items.map(t => `
            <div class="catalog-item">
                <div class="catalog-item-header">
                    <div class="catalog-item-icon ${iconClass(t.category)}">
                        <i class="fas ${iconForCategory(t.category)}"></i>
                    </div>
                    <div>
                        <h4 class="catalog-item-title">${escapeHtml(t.title)}</h4>
                        <p class="catalog-item-subtitle">${escapeHtml(labelForCategory(t.category))}</p>
                    </div>
                </div>
                <div class="catalog-item-description">Автор: ${escapeHtml(t.author)} • Ответов: ${t.replies} • Обновлено: ${formatDate(t.updatedAt)}</div>
                <div class="catalog-item-actions">
                    <button class="btn-secondary" onclick="ForumPage.summarize('${t.id}')">К сути</button>
                    <button class="btn-primary" onclick="ForumPage.open('${t.id}')">Открыть</button>
                </div>
            </div>
        `).join('');
    }

    function iconForCategory(cat) {
        switch (cat) {
            case 'diseases': return 'fa-notes-medical';
            case 'design': return 'fa-palette';
            case 'equipment': return 'fa-tools';
            case 'errors': return 'fa-exclamation-triangle';
            default: return 'fa-comment-dots';
        }
    }

    function labelForCategory(cat) {
        return {
            diseases: 'Болезни',
            design: 'Дизайн',
            equipment: 'Оборудование',
            errors: 'Ошибки'
        }[cat] || 'Обсуждение';
    }

    function iconClass(cat) {
        switch (cat) {
            case 'diseases': return 'reptiles';
            case 'design': return 'plants';
            case 'equipment': return 'aquariums';
            case 'errors': return 'reptiles';
            default: return 'fish';
        }
    }

    function escapeHtml(s) {
        return (s || '').replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        })[c]);
    }

    function formatDate(iso) {
        try { return new Date(iso).toLocaleString('ru-RU'); } catch (_) { return iso; }
    }

    function bind() {
        const cat = document.getElementById('forum-category');
        const search = document.getElementById('forum-search');
        if (cat) cat.addEventListener('change', render);
        if (search) search.addEventListener('input', render);
    }

    return {
        init() {},
        onShow() { bind(); render(); },
        summarize(id) {
            // Заглушка ИИ-выжимки
            window.app?.showSuccess('Краткая выжимка подготовлена (демо).');
        },
        open(id) {
            window.app?.showWarning('Открытие темы будет доступно в следующей версии.');
        }
    };
})();


