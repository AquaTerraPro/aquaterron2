// Страница: Календарь
window.CalendarPage = (function() {
    const STORAGE_KEY = 'calendar_events_v1';
    function getEvents(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }catch(_){ return []; } }
    function saveEvents(events){ try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); }catch(_){} }
    function render(){
        const list = document.getElementById('calendar-list'); if(!list) return;
        const events = getEvents().sort((a,b)=>a.date.localeCompare(b.date));
        list.innerHTML = events.map(e=>`<div class="catalog-item"><div class="catalog-item-content"><div class="catalog-item-header"><strong>${e.date}</strong><span>${e.type||''}</span></div><div>${e.title}</div><div class="text-secondary">${e.notes||''}</div></div></div>`).join('');
    }
    function bind(){
        const btn = document.getElementById('calendar-add-btn'); if(!btn) return;
        btn.addEventListener('click', (ev)=>{ ev.preventDefault();
            const date = document.getElementById('calendar-date')?.value || '';
            const title = document.getElementById('calendar-title')?.value || '';
            const notes = document.getElementById('calendar-notes')?.value || '';
            const type = document.getElementById('calendar-type-select')?.value || 'note';
            if(!date || !title) return;
            const events = getEvents(); events.push({id: Date.now().toString(36), date, title, notes, type});
            saveEvents(events); render();
            const t = document.getElementById('calendar-title'); const n = document.getElementById('calendar-notes'); if(t) t.value=''; if(n) n.value='';
        });
    }
    return { init(){ bind(); render(); }, onShow(){ render(); } };
})();


