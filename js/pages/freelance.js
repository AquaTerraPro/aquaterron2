diff --git a/js/pages/freelance.js b/js/pages/freelance.js
--- a/js/pages/freelance.js
+++ b/js/pages/freelance.js
@@ -0,0 +1,99 @@
+// Страница: Специалисты (фриланс)
+window.FreelancePage = (function() {
+    const EXPERTS = [
+        { id: 'e1', name: 'Алексей Петров', city: 'Москва', specialty: 'aquarium', rating: 4.9, reviews: 112, distanceKm: 3, services: ['Подмена', 'Диагностика', 'Запуск'] },
+        { id: 'e2', name: 'Марина Смирнова', city: 'Санкт-Петербург', specialty: 'design', rating: 4.8, reviews: 76, distanceKm: 8, services: ['Аквадизайн', 'Подбор растений'] },
+        { id: 'e3', name: 'Иван Кузнецов', city: 'Новосибирск', specialty: 'terrarium', rating: 4.7, reviews: 54, distanceKm: 5, services: ['Обслуживание террариумов', 'Установка УФB'] },
+        { id: 'e4', name: 'Светлана Орлова', city: 'Екатеринбург', specialty: 'diagnostics', rating: 4.6, reviews: 39, distanceKm: 12, services: ['Диагностика', 'Лечение'] },
+    ];
+
+    function render() {
+        const city = document.getElementById('freelance-city')?.value || 'all';
+        const spec = document.getElementById('freelance-specialty')?.value || 'all';
+        const list = document.getElementById('freelance-list');
+        if (!list) return;
+
+        const items = EXPERTS
+            .filter(e => city === 'all' || e.city === city)
+            .filter(e => spec === 'all' || e.specialty === spec)
+            .sort((a, b) => b.rating - a.rating);
+
+        if (items.length === 0) {
+            list.innerHTML = '<div class="compatibility-section"><p>Специалисты по заданным параметрам не найдены.</p></div>';
+            return;
+        }
+
+        list.innerHTML = items.map(e => `
+            <div class="catalog-item">
+                <div class="catalog-item-header">
+                    <div class="catalog-item-icon ${iconClass(e.specialty)}">
+                        <i class="fas ${iconForSpec(e.specialty)}"></i>
+                    </div>
+                    <div>
+                        <h4 class="catalog-item-title">${escapeHtml(e.name)}</h4>
+                        <p class="catalog-item-subtitle">${escapeHtml(labelForSpec(e.specialty))} • ${escapeHtml(e.city)}</p>
+                    </div>
+                </div>
+                <div class="catalog-item-description">Рейтинг: ${e.rating} ⭐ • Отзывов: ${e.reviews} • ~${e.distanceKm} км</div>
+                <div class="compatibility-list">
+                    ${e.services.map(s => `<span class="compatibility-tag compatible">${escapeHtml(s)}</span>`).join('')}
+                </div>
+                <div class="catalog-item-actions">
+                    <button class="btn-secondary" onclick="FreelancePage.request('${e.id}')"><i class="fas fa-phone"></i> Запросить</button>
+                    <button class="btn-primary" onclick="FreelancePage.message('${e.id}')"><i class="fas fa-comment"></i> Написать</button>
+                </div>
+            </div>
+        `).join('');
+    }
+
+    function iconForSpec(s) {
+        switch (s) {
+            case 'aquarium': return 'fa-fish';
+            case 'terrarium': return 'fa-dragon';
+            case 'design': return 'fa-palette';
+            case 'diagnostics': return 'fa-stethoscope';
+            default: return 'fa-user-tie';
+        }
+    }
+
+    function labelForSpec(s) {
+        return {
+            aquarium: 'Мастер по аквариумам',
+            terrarium: 'Мастер по террариумам',
+            design: 'Дизайнер',
+            diagnostics: 'Диагност'
+        }[s] || 'Специалист';
+    }
+
+    function iconClass(s) {
+        switch (s) {
+            case 'aquarium': return 'fish';
+            case 'terrarium': return 'reptiles';
+            case 'design': return 'plants';
+            case 'diagnostics': return 'aquariums';
+            default: return 'fish';
+        }
+    }
+
+    function escapeHtml(s) {
+        return (s || '').replace(/[&<>"']/g, c => ({
+            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
+        })[c]);
+    }
+
+    function bind() {
+        const city = document.getElementById('freelance-city');
+        const spec = document.getElementById('freelance-specialty');
+        if (city) city.addEventListener('change', render);
+        if (spec) spec.addEventListener('change', render);
+    }
+
+    return {
+        init() {},
+        onShow() { bind(); render(); },
+        request(id) { window.app?.showSuccess('Заявка отправлена (демо)'); },
+        message(id) { window.app?.showWarning('Чат со специалистом в разработке'); }
+    };
+})();
+
+
