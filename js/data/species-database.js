// База данных видов для аквариумов и террариумов (минимальная)
const SpeciesDatabase = {
    fish: [
        { id: 'guppy', name: 'Гуппи', scientificName: 'Poecilia reticulata', category:'fish', size:'small', difficulty:'easy', compatibility:{ compatible:['neon'], incompatible:['cichlid'] } },
        { id: 'neon', name: 'Неон', scientificName: 'Paracheirodon innesi', category:'fish', size:'small', difficulty:'easy', compatibility:{ compatible:['guppy'], incompatible:['cichlid'] } },
        { id: 'cichlid', name: 'Цихлида', scientificName: 'Cichlidae sp.', category:'fish', size:'large', difficulty:'medium', compatibility:{ compatible:[], incompatible:['guppy','neon'] } }
    ],
    plants: [
        { id: 'anubias', name: 'Анубиас', scientificName: 'Anubias barteri', category:'plants', size:'small', difficulty:'easy', compatibility:{ compatible:[], incompatible:[] } }
    ],
    reptiles: [
        { id: 'gecko', name: 'Геккон', scientificName: 'Gekkonidae sp.', category:'reptiles', size:'small', difficulty:'medium', compatibility:{ compatible:[], incompatible:[] } }
    ],

    getAllSpecies() { return [...this.fish, ...this.plants, ...this.reptiles]; },
    getSpeciesById(id) { return this.getAllSpecies().find(s => s.id === id) || null; },
    searchSpecies(query) {
        const q = (query||'').trim().toLowerCase();
        if (!q) return this.getAllSpecies();
        return this.getAllSpecies().filter(s => s.name.toLowerCase().includes(q) || s.scientificName.toLowerCase().includes(q));
    },
    checkCompatibility(species1, species2) {
        const s1 = typeof species1 === 'string' ? this.getSpeciesById(species1) : species1;
        const s2 = typeof species2 === 'string' ? this.getSpeciesById(species2) : species2;
        if (!s1 || !s2) return { compatible:false, reason:'Не найден вид' };
        if (s1.category !== s2.category) return { compatible:true, reason:'Разные категории' };
        const incompatible = new Set([...(s1.compatibility?.incompatible||[])]);
        if (incompatible.has(s2.id)) return { compatible:false, reason:'Известная несовместимость' };
        return { compatible:true, reason:'Совместимы' };
    }
};

if (typeof window !== 'undefined') { window.SpeciesDatabase = SpeciesDatabase; }
