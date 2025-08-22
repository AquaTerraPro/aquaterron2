// Страница: Форум
window.ForumPage = (function() {
    const TOPICS = [
        { id:'t1', title:'Белые пятна у неона — что делать?', category:'diseases', author:'Мария', replies:12, updatedAt:'2025-08-10T12:00:00Z' },
        { id:'t2', title:'Помогите подобрать дизайн под 100л', category:'design', author:'Игорь', replies:7, updatedAt:'2025-08-14T09:30:00Z' },
        { id:'t3', title:'Фильтр шумит — норм или брак?', category:'equipment', author:'Светлана', replies:4, updatedAt:'2025-08-15T18:20:00Z' },
        { id:'t4', title:'Помутнение воды после подмены', category:'errors', author:'Антон', replies:5, updatedAt:'2025-08-12T08:45:00Z' }
    ];
    function render(){
        const container = document.getElementById('forum-topics'); if(!container) return;
        const category = document.getElementById('forum-category')?.value || 'all';
        const query = (document.getElementById('forum-search')?.value || '').toLowerCase();
        const items = TOPICS
            .filter(t => category==='all' || t.category===category)
            .filter(t => !query || t.title.toLowerCase().includes(query));
        container.innerHTML = items.map(t=>`<div class="catalog-item"><div class="catalog-item-content"><div class="catalog-item-header"><h4>${t.title}</h4><span>${t.replies} ответов</span></div><div class="text-secondary">${t.author} • ${new Date(t.updatedAt).toLocaleString('ru-RU')}</div></div></div>`).join('');
    }
    function bind(){
        document.getElementById('forum-category')?.addEventListener('change', render);
        document.getElementById('forum-search')?.addEventListener('input', render);
    }
    return { init(){ bind(); render(); }, onShow(){ render(); } };
})();


