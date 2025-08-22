// Profile Page stub
window.ProfilePage = (function(){
    return {
        init(){
            const themeSelect = document.getElementById('theme-select');
            if (themeSelect) themeSelect.addEventListener('change', (e)=>{
                const v = e.target.value; if (window.app) { if (v!==window.app.theme){ window.app.theme = v; window.app.applyTheme(); localStorage.setItem('theme', v); }}
            });
            const langSelect = document.getElementById('language-select');
            if (langSelect) langSelect.addEventListener('change', (e)=>{ localStorage.setItem('language', e.target.value); });
        },
        onShow(){}
    };
})();