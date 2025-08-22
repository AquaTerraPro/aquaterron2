// Страница: Специалисты (фриланс)
window.FreelancePage = (function() {
    const EXPERTS = [
        { id:'e1', name:'Алексей Петров', city:'Москва', specialty:'aquarium', rating:4.9, reviews:112, distanceKm:3, services:['Подмена','Диагностика','Запуск'] },
        { id:'e2', name:'Марина Смирнова', city:'Санкт-Петербург', specialty:'design', rating:4.8, reviews:76, distanceKm:8, services:['Аквадизайн','Подбор растений'] },
        { id:'e3', name:'Иван Кузнецов', city:'Новосибирск', specialty:'terrarium', rating:4.7, reviews:54, distanceKm:5, services:['Обслуживание террариумов','Установка УФB'] },
        { id:'e4', name:'Светлана Орлова', city:'Екатеринбург', specialty:'diagnostics', rating:4.6, reviews:39, distanceKm:12, services:['Диагностика','Лечение'] }
    ];
    function render(){
        const list = document.getElementById('freelance-list'); if(!list) return;
        const city = document.getElementById('freelance-city')?.value || 'all';
        const spec = document.getElementById('freelance-specialty')?.value || 'all';
        const items = EXPERTS.filter(e => (city==='all'||e.city===city) && (spec==='all'||e.specialty===spec));
        list.innerHTML = items.map(e=>`<div class="catalog-item"><div class="catalog-item-content"><div class="catalog-item-header"><h4>${e.name}</h4><span>★ ${e.rating} (${e.reviews})</span></div><div class="text-secondary">${e.city} • ${e.distanceKm} км</div><div>${e.services.join(', ')}</div></div></div>`).join('');
    }
    function bind(){
        document.getElementById('freelance-city')?.addEventListener('change', render);
        document.getElementById('freelance-specialty')?.addEventListener('change', render);
    }
    return { init(){ bind(); render(); }, onShow(){ render(); } };
})();


