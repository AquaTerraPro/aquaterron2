// База данных видов для аквариумов и террариумов
const SpeciesDatabase = {
    // Рыбы
    fish: [
        {
            id: "guppy",
            name: "Гуппи",
            scientificName: "Poecilia reticulata",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 6,
            difficulty: "easy",
            temperature: { min: 22, max: 28 },
            ph: { min: 6.8, max: 7.8 },
            hardness: { min: 8, max: 25 },
            lifespan: 2,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 20,
            description: "Одна из самых популярных аквариумных рыб. Отлично подходит для начинающих аквариумистов.",
            image: "assets/images/fish/guppy.jpg",
            compatibility: {
                compatible: ["guppy", "platy", "swordtail", "molly", "neon_tetra", "cardinal_tetra"],
                incompatible: ["betta", "angelfish", "goldfish"],
                notes: "Мирная рыбка, хорошо уживается с другими мелкими рыбами"
            }
        },
        {
            id: "neon_tetra",
            name: "Неоновая тетра",
            scientificName: "Paracheirodon innesi",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 4,
            difficulty: "easy",
            temperature: { min: 20, max: 26 },
            ph: { min: 6.0, max: 7.0 },
            hardness: { min: 1, max: 10 },
            lifespan: 5,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 30,
            description: "Красивая стайная рыбка с яркой неоновой полосой.",
            image: "assets/images/fish/neon_tetra.jpg",
            compatibility: {
                compatible: ["neon_tetra", "cardinal_tetra", "guppy", "platy", "swordtail"],
                incompatible: ["betta", "angelfish", "goldfish"],
                notes: "Держится стайкой, не менее 6 особей"
            }
        },
        {
            id: "cardinal_tetra",
            name: "Кардинал",
            scientificName: "Paracheirodon axelrodi",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 5,
            difficulty: "medium",
            temperature: { min: 22, max: 28 },
            ph: { min: 5.5, max: 7.0 },
            hardness: { min: 1, max: 8 },
            lifespan: 5,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 50,
            description: "Красивая тетра с красной полосой по всему телу.",
            image: "assets/images/fish/cardinal_tetra.jpg",
            compatibility: {
                compatible: ["cardinal_tetra", "neon_tetra", "guppy", "platy"],
                incompatible: ["betta", "angelfish", "goldfish"],
                notes: "Требует мягкой воды"
            }
        },
        {
            id: "platy",
            name: "Пецилия",
            scientificName: "Xiphophorus maculatus",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 6,
            difficulty: "easy",
            temperature: { min: 20, max: 28 },
            ph: { min: 7.0, max: 8.0 },
            hardness: { min: 10, max: 25 },
            lifespan: 3,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 30,
            description: "Живородящая рыбка с множеством цветовых вариаций.",
            image: "assets/images/fish/platy.jpg",
            compatibility: {
                compatible: ["platy", "guppy", "swordtail", "molly"],
                incompatible: ["betta", "angelfish"],
                notes: "Легко размножается"
            }
        },
        {
            id: "swordtail",
            name: "Меченосец",
            scientificName: "Xiphophorus hellerii",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 12,
            difficulty: "easy",
            temperature: { min: 20, max: 28 },
            ph: { min: 7.0, max: 8.0 },
            hardness: { min: 10, max: 25 },
            lifespan: 3,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 50,
            description: "Живородящая рыбка с мечевидным хвостом у самцов.",
            image: "assets/images/fish/swordtail.jpg",
            compatibility: {
                compatible: ["swordtail", "guppy", "platy", "molly"],
                incompatible: ["betta", "angelfish"],
                notes: "Самцы могут быть агрессивными друг к другу"
            }
        },
        {
            id: "molly",
            name: "Моллинезия",
            scientificName: "Poecilia sphenops",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 8,
            difficulty: "easy",
            temperature: { min: 22, max: 28 },
            ph: { min: 7.0, max: 8.5 },
            hardness: { min: 10, max: 30 },
            lifespan: 3,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 40,
            description: "Живородящая рыбка, предпочитает слегка солоноватую воду.",
            image: "assets/images/fish/molly.jpg",
            compatibility: {
                compatible: ["molly", "guppy", "platy", "swordtail"],
                incompatible: ["betta", "angelfish"],
                notes: "Любит добавление соли в воду"
            }
        },
        {
            id: "betta",
            name: "Петушок",
            scientificName: "Betta splendens",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 7,
            difficulty: "easy",
            temperature: { min: 24, max: 30 },
            ph: { min: 6.0, max: 7.5 },
            hardness: { min: 5, max: 20 },
            lifespan: 3,
            behavior: "Агрессивная",
            diet: "Хищная",
            tankSize: 20,
            description: "Красивая рыбка с длинными плавниками. Самцы агрессивны друг к другу.",
            image: "assets/images/fish/betta.jpg",
            compatibility: {
                compatible: ["corydoras", "otocinclus", "shrimp"],
                incompatible: ["betta", "guppy", "angelfish"],
                notes: "Самцы должны содержаться поодиночке"
            }
        },
        {
            id: "angelfish",
            name: "Скалярия",
            scientificName: "Pterophyllum scalare",
            category: "fish",
            type: "Пресноводная",
            size: "medium",
            maxSize: 15,
            difficulty: "medium",
            temperature: { min: 24, max: 30 },
            ph: { min: 6.0, max: 7.5 },
            hardness: { min: 3, max: 15 },
            lifespan: 10,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 100,
            description: "Элегантная рыбка с высоким телом и длинными плавниками.",
            image: "assets/images/fish/angelfish.jpg",
            compatibility: {
                compatible: ["angelfish", "corydoras", "plecostomus", "tetra"],
                incompatible: ["betta", "guppy", "goldfish"],
                notes: "Может поедать мелких рыб"
            }
        },
        {
            id: "corydoras",
            name: "Коридорас",
            scientificName: "Corydoras",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 7,
            difficulty: "easy",
            temperature: { min: 20, max: 28 },
            ph: { min: 6.0, max: 8.0 },
            hardness: { min: 5, max: 25 },
            lifespan: 5,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 50,
            description: "Донная рыбка, отличный чистильщик аквариума.",
            image: "assets/images/fish/corydoras.jpg",
            compatibility: {
                compatible: ["corydoras", "tetra", "guppy", "angelfish"],
                incompatible: ["aggressive_cichlids"],
                notes: "Держится стайкой, не менее 6 особей"
            }
        },
        {
            id: "plecostomus",
            name: "Плекостомус",
            scientificName: "Hypostomus plecostomus",
            category: "fish",
            type: "Пресноводная",
            size: "large",
            maxSize: 50,
            difficulty: "easy",
            temperature: { min: 20, max: 28 },
            ph: { min: 6.5, max: 7.5 },
            hardness: { min: 5, max: 20 },
            lifespan: 15,
            behavior: "Мирная",
            diet: "Растительноядная",
            tankSize: 200,
            description: "Крупный сом-чистильщик, поедает водоросли.",
            image: "assets/images/fish/plecostomus.jpg",
            compatibility: {
                compatible: ["plecostomus", "angelfish", "tetra"],
                incompatible: ["small_fish"],
                notes: "Требует много места и коряг"
            }
        },
        {
            id: "ram_cichlid",
            name: "Апистограмма Рамирези",
            scientificName: "Mikrogeophagus ramirezi",
            category: "fish",
            type: "Пресноводная",
            size: "small",
            maxSize: 7,
            difficulty: "medium",
            temperature: { min: 24, max: 30 },
            ph: { min: 5.5, max: 7.0 },
            hardness: { min: 1, max: 10 },
            lifespan: 3,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 60,
            description: "Красивая карликовая цихлида для небольших аквариумов.",
            image: "assets/images/fish/ram_cichlid.jpg",
            compatibility: {
                compatible: ["ram_cichlid", "tetra", "corydoras"],
                incompatible: ["aggressive_cichlids"],
                notes: "Требует мягкой воды"
            }
        },
        {
            id: "goldfish",
            name: "Золотая рыбка",
            scientificName: "Carassius auratus",
            category: "fish",
            type: "Пресноводная",
            size: "large",
            maxSize: 30,
            difficulty: "easy",
            temperature: { min: 18, max: 24 },
            ph: { min: 6.5, max: 8.0 },
            hardness: { min: 5, max: 25 },
            lifespan: 20,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 100,
            description: "Классическая аквариумная рыбка, подходит для холодной воды.",
            image: "assets/images/fish/goldfish.jpg",
            compatibility: {
                compatible: ["goldfish", "koi", "weather_loach"],
                incompatible: ["tropical_fish", "betta", "angelfish"],
                notes: "Требует холодной воды, не совместима с тропическими рыбами"
            }
        },
        {
            id: "discus",
            name: "Дискус",
            scientificName: "Symphysodon",
            category: "fish",
            type: "Пресноводная",
            size: "large",
            maxSize: 20,
            difficulty: "hard",
            temperature: { min: 28, max: 32 },
            ph: { min: 5.5, max: 6.5 },
            hardness: { min: 1, max: 8 },
            lifespan: 15,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 200,
            description: "Король аквариума - красивая и требовательная рыбка.",
            image: "assets/images/fish/discus.jpg",
            compatibility: {
                compatible: ["discus", "cardinal_tetra", "ram_cichlid"],
                incompatible: ["goldfish", "angelfish", "aggressive_cichlids"],
                notes: "Требует стабильных параметров воды"
            }
        },
        {
            id: "clownfish",
            name: "Рыба-клоун",
            scientificName: "Amphiprioninae",
            category: "fish",
            type: "Морская",
            size: "small",
            maxSize: 10,
            difficulty: "medium",
            temperature: { min: 24, max: 28 },
            ph: { min: 8.1, max: 8.4 },
            salinity: { min: 1.020, max: 1.025 },
            lifespan: 10,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 100,
            description: "Популярная морская рыбка, известная по мультфильму 'В поисках Немо'.",
            image: "assets/images/fish/clownfish.jpg",
            compatibility: {
                compatible: ["clownfish", "damselfish", "goby", "marine_invertebrates"],
                incompatible: ["freshwater_fish"],
                notes: "Требует морской воды и актинии"
            }
        },
        {
            id: "damselfish",
            name: "Дасцилл",
            scientificName: "Dascyllus",
            category: "fish",
            type: "Морская",
            size: "small",
            maxSize: 8,
            difficulty: "easy",
            temperature: { min: 24, max: 28 },
            ph: { min: 8.1, max: 8.4 },
            salinity: { min: 1.020, max: 1.025 },
            lifespan: 8,
            behavior: "Агрессивная",
            diet: "Всеядная",
            tankSize: 100,
            description: "Выносливая морская рыбка для начинающих.",
            image: "assets/images/fish/damselfish.jpg",
            compatibility: {
                compatible: ["damselfish", "clownfish", "goby"],
                incompatible: ["peaceful_marine_fish"],
                notes: "Может быть агрессивной к другим рыбам"
            }
        },
        {
            id: "goby",
            name: "Бычок",
            scientificName: "Gobiidae",
            category: "fish",
            type: "Морская",
            size: "small",
            maxSize: 10,
            difficulty: "medium",
            temperature: { min: 24, max: 28 },
            ph: { min: 8.1, max: 8.4 },
            salinity: { min: 1.020, max: 1.025 },
            lifespan: 5,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 80,
            description: "Донная морская рыбка, часто живет в симбиозе с креветками.",
            image: "assets/images/fish/goby.jpg",
            compatibility: {
                compatible: ["goby", "clownfish", "damselfish"],
                incompatible: ["aggressive_marine_fish"],
                notes: "Требует песчаное дно"
            }
        }
    ],

    // Растения
    plants: [
        {
            id: "java_moss",
            name: "Яванский мох",
            scientificName: "Taxiphyllum barbieri",
            category: "plants",
            type: "Мох",
            size: "small",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 18, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Передний план",
            description: "Неприхотливый мох, отлично подходит для начинающих.",
            image: "assets/images/plants/java_moss.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp", "snails"],
                notes: "Безопасен для всех обитателей аквариума"
            }
        },
        {
            id: "christmas_moss",
            name: "Рождественский мох",
            scientificName: "Vesicularia montagnei",
            category: "plants",
            type: "Мох",
            size: "small",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 18, max: 28 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Передний план",
            description: "Мох с ветвистыми побегами, напоминающими елочку.",
            image: "assets/images/plants/christmas_moss.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp", "snails"],
                notes: "Отличное убежище для мальков"
            }
        },
        {
            id: "anubias",
            name: "Анубиас",
            scientificName: "Anubias",
            category: "plants",
            type: "Корневищное",
            size: "medium",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Средний план",
            description: "Выносливое растение с жесткими листьями.",
            image: "assets/images/plants/anubias.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Устойчив к поеданию травоядными рыбами"
            }
        },
        {
            id: "anubias_nana",
            name: "Анубиас нана",
            scientificName: "Anubias barteri var. nana",
            category: "plants",
            type: "Корневищное",
            size: "small",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Передний план",
            description: "Карликовая форма анубиаса для небольших аквариумов.",
            image: "assets/images/plants/anubias_nana.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Идеально для нано-аквариумов"
            }
        },
        {
            id: "amazon_sword",
            name: "Амазонский меч",
            scientificName: "Echinodorus",
            category: "plants",
            type: "Розеточное",
            size: "large",
            difficulty: "easy",
            light: "medium",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.5, max: 7.5 },
            growth: "Средний",
            position: "Задний план",
            description: "Крупное растение с длинными листьями.",
            image: "assets/images/plants/amazon_sword.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Может поедаться некоторыми рыбами"
            }
        },
        {
            id: "cryptocoryne",
            name: "Криптокорина",
            scientificName: "Cryptocoryne",
            category: "plants",
            type: "Розеточное",
            size: "medium",
            difficulty: "medium",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Передний план",
            description: "Растение с красивыми листьями различных оттенков.",
            image: "assets/images/plants/cryptocoryne.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Чувствительно к резким изменениям параметров"
            }
        },
        {
            id: "cryptocoryne_wendtii",
            name: "Криптокорина Вендта",
            scientificName: "Cryptocoryne wendtii",
            category: "plants",
            type: "Розеточное",
            size: "medium",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Передний план",
            description: "Популярная криптокорина с волнистыми листьями.",
            image: "assets/images/plants/cryptocoryne_wendtii.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Хорошо растет в тени"
            }
        },
        {
            id: "vallisneria",
            name: "Валлиснерия",
            scientificName: "Vallisneria",
            category: "plants",
            type: "Стеблевое",
            size: "large",
            difficulty: "easy",
            light: "medium",
            co2: false,
            temperature: { min: 18, max: 30 },
            ph: { min: 6.5, max: 8.0 },
            growth: "Быстрый",
            position: "Задний план",
            description: "Длинные лентовидные листья, быстро растет.",
            image: "assets/images/plants/vallisneria.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Может поедаться травоядными рыбами"
            }
        },
        {
            id: "rotala",
            name: "Ротала",
            scientificName: "Rotala",
            category: "plants",
            type: "Стеблевое",
            size: "medium",
            difficulty: "medium",
            light: "high",
            co2: true,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 7.5 },
            growth: "Быстрый",
            position: "Задний план",
            description: "Красивое стеблевое растение с красноватыми листьями.",
            image: "assets/images/plants/rotala.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Требует хорошего освещения и CO2"
            }
        },
        {
            id: "rotala_rotundifolia",
            name: "Ротала круглолистная",
            scientificName: "Rotala rotundifolia",
            category: "plants",
            type: "Стеблевое",
            size: "medium",
            difficulty: "easy",
            light: "medium",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Быстрый",
            position: "Задний план",
            description: "Неприхотливая ротала с круглыми листьями.",
            image: "assets/images/plants/rotala_rotundifolia.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Хорошо растет без CO2"
            }
        },
        {
            id: "cabomba",
            name: "Кабомба",
            scientificName: "Cabomba",
            category: "plants",
            type: "Стеблевое",
            size: "large",
            difficulty: "medium",
            light: "high",
            co2: false,
            temperature: { min: 18, max: 28 },
            ph: { min: 6.0, max: 7.5 },
            growth: "Быстрый",
            position: "Задний план",
            description: "Перистые листья, отличный оксигенатор.",
            image: "assets/images/plants/cabomba.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Требует хорошего освещения"
            }
        },
        {
            id: "elodea",
            name: "Элодея",
            scientificName: "Elodea",
            category: "plants",
            type: "Стеблевое",
            size: "large",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 15, max: 25 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Очень быстрый",
            position: "Задний план",
            description: "Классическое растение для начинающих.",
            image: "assets/images/plants/elodea.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Отличный оксигенатор"
            }
        },
        {
            id: "hornwort",
            name: "Роголистник",
            scientificName: "Ceratophyllum",
            category: "plants",
            type: "Стеблевое",
            size: "large",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 15, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Очень быстрый",
            position: "Плавающее",
            description: "Плавающее растение с игольчатыми листьями.",
            image: "assets/images/plants/hornwort.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Не требует посадки в грунт"
            }
        },
        {
            id: "duckweed",
            name: "Ряска",
            scientificName: "Lemna",
            category: "plants",
            type: "Плавающее",
            size: "small",
            difficulty: "easy",
            light: "medium",
            co2: false,
            temperature: { min: 15, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Очень быстрый",
            position: "Плавающее",
            description: "Маленькие плавающие листочки.",
            image: "assets/images/plants/duckweed.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Быстро размножается"
            }
        },
        {
            id: "water_lettuce",
            name: "Пистия",
            scientificName: "Pistia stratiotes",
            category: "plants",
            type: "Плавающее",
            size: "medium",
            difficulty: "easy",
            light: "high",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Быстрый",
            position: "Плавающее",
            description: "Плавающее растение с розеткой листьев.",
            image: "assets/images/plants/water_lettuce.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Требует яркого освещения"
            }
        },
        {
            id: "java_fern",
            name: "Яванский папоротник",
            scientificName: "Microsorum pteropus",
            category: "plants",
            type: "Корневищное",
            size: "medium",
            difficulty: "easy",
            light: "low",
            co2: false,
            temperature: { min: 18, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Медленный",
            position: "Средний план",
            description: "Неприхотливый папоротник для любого аквариума.",
            image: "assets/images/plants/java_fern.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Устойчив к поеданию"
            }
        },
        {
            id: "bolbitis",
            name: "Болбитис",
            scientificName: "Bolbitis heudelotii",
            category: "plants",
            type: "Корневищное",
            size: "large",
            difficulty: "medium",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 28 },
            ph: { min: 6.0, max: 7.5 },
            growth: "Медленный",
            position: "Задний план",
            description: "Африканский папоротник с перистыми листьями.",
            image: "assets/images/plants/bolbitis.jpg",
            compatibility: {
                compatible: ["all_fish", "herbivorous_fish"],
                notes: "Требует мягкой воды"
            }
        },
        {
            id: "bucephalandra",
            name: "Буцефаландра",
            scientificName: "Bucephalandra",
            category: "plants",
            type: "Корневищное",
            size: "small",
            difficulty: "hard",
            light: "low",
            co2: false,
            temperature: { min: 20, max: 28 },
            ph: { min: 6.0, max: 7.5 },
            growth: "Очень медленный",
            position: "Передний план",
            description: "Экзотическое растение с красивыми листьями.",
            image: "assets/images/plants/bucephalandra.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Требует стабильных параметров"
            }
        },
        {
            id: "ludwigia",
            name: "Людвигия",
            scientificName: "Ludwigia",
            category: "plants",
            type: "Стеблевое",
            size: "medium",
            difficulty: "medium",
            light: "medium",
            co2: false,
            temperature: { min: 18, max: 28 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Средний",
            position: "Задний план",
            description: "Растение с красноватыми листьями.",
            image: "assets/images/plants/ludwigia.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Красиво смотрится в группах"
            }
        },
        {
            id: "hygrophila",
            name: "Гигрофила",
            scientificName: "Hygrophila",
            category: "plants",
            type: "Стеблевое",
            size: "large",
            difficulty: "easy",
            light: "medium",
            co2: false,
            temperature: { min: 20, max: 30 },
            ph: { min: 6.0, max: 8.0 },
            growth: "Быстрый",
            position: "Задний план",
            description: "Неприхотливое растение с крупными листьями.",
            image: "assets/images/plants/hygrophila.jpg",
            compatibility: {
                compatible: ["all_fish", "shrimp"],
                notes: "Хорошо растет без CO2"
            }
        }
    ],

    // Рептилии
    reptiles: [
        {
            id: "bearded_dragon",
            name: "Бородатая агама",
            scientificName: "Pogona vitticeps",
            category: "reptiles",
            type: "Ящерица",
            size: "medium",
            maxSize: 60,
            difficulty: "easy",
            temperature: { day: { min: 25, max: 35 }, night: { min: 18, max: 25 } },
            humidity: { min: 30, max: 50 },
            lifespan: 15,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 200,
            description: "Популярная ящерица, отлично подходит для начинающих.",
            image: "assets/images/reptiles/bearded_dragon.jpg",
            compatibility: {
                compatible: ["bearded_dragon"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "leopard_gecko",
            name: "Леопардовый геккон",
            scientificName: "Eublepharis macularius",
            category: "reptiles",
            type: "Ящерица",
            size: "small",
            maxSize: 25,
            difficulty: "easy",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 20, max: 40 },
            lifespan: 20,
            behavior: "Мирная",
            diet: "Насекомоядная",
            tankSize: 60,
            description: "Ночная ящерица с красивым окрасом.",
            image: "assets/images/reptiles/leopard_gecko.jpg",
            compatibility: {
                compatible: ["leopard_gecko"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "crested_gecko",
            name: "Гребенчатый геккон",
            scientificName: "Correlophus ciliatus",
            category: "reptiles",
            type: "Ящерица",
            size: "small",
            maxSize: 20,
            difficulty: "easy",
            temperature: { day: { min: 22, max: 28 }, night: { min: 18, max: 24 } },
            humidity: { min: 60, max: 80 },
            lifespan: 15,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 60,
            description: "Ночная ящерица с гребнем на голове.",
            image: "assets/images/reptiles/crested_gecko.jpg",
            compatibility: {
                compatible: ["crested_gecko"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "corn_snake",
            name: "Кукурузная змея",
            scientificName: "Pantherophis guttatus",
            category: "reptiles",
            type: "Змея",
            size: "medium",
            maxSize: 150,
            difficulty: "easy",
            temperature: { day: { min: 25, max: 30 }, night: { min: 20, max: 25 } },
            humidity: { min: 40, max: 60 },
            lifespan: 20,
            behavior: "Мирная",
            diet: "Хищная",
            tankSize: 100,
            description: "Популярная змея для начинающих террариумистов.",
            image: "assets/images/reptiles/corn_snake.jpg",
            compatibility: {
                compatible: ["corn_snake"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "ball_python",
            name: "Королевский питон",
            scientificName: "Python regius",
            category: "reptiles",
            type: "Змея",
            size: "large",
            maxSize: 180,
            difficulty: "medium",
            temperature: { day: { min: 25, max: 32 }, night: { min: 20, max: 25 } },
            humidity: { min: 50, max: 70 },
            lifespan: 30,
            behavior: "Мирная",
            diet: "Хищная",
            tankSize: 150,
            description: "Спокойная змея, популярная среди любителей.",
            image: "assets/images/reptiles/ball_python.jpg",
            compatibility: {
                compatible: ["ball_python"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "milk_snake",
            name: "Молочная змея",
            scientificName: "Lampropeltis triangulum",
            category: "reptiles",
            type: "Змея",
            size: "medium",
            maxSize: 120,
            difficulty: "easy",
            temperature: { day: { min: 24, max: 30 }, night: { min: 18, max: 24 } },
            humidity: { min: 40, max: 60 },
            lifespan: 15,
            behavior: "Мирная",
            diet: "Хищная",
            tankSize: 80,
            description: "Красивая змея с ярким окрасом.",
            image: "assets/images/reptiles/milk_snake.jpg",
            compatibility: {
                compatible: ["milk_snake"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "green_iguana",
            name: "Зеленая игуана",
            scientificName: "Iguana iguana",
            category: "reptiles",
            type: "Ящерица",
            size: "large",
            maxSize: 200,
            difficulty: "hard",
            temperature: { day: { min: 28, max: 35 }, night: { min: 22, max: 28 } },
            humidity: { min: 60, max: 80 },
            lifespan: 20,
            behavior: "Агрессивная",
            diet: "Травоядная",
            tankSize: 400,
            description: "Крупная ящерица, требует опытного владельца.",
            image: "assets/images/reptiles/green_iguana.jpg",
            compatibility: {
                compatible: ["green_iguana"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке, может быть агрессивной"
            }
        },
        {
            id: "chameleon",
            name: "Хамелеон",
            scientificName: "Chamaeleonidae",
            category: "reptiles",
            type: "Ящерица",
            size: "medium",
            maxSize: 30,
            difficulty: "hard",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 50, max: 80 },
            lifespan: 5,
            behavior: "Территориальная",
            diet: "Насекомоядная",
            tankSize: 100,
            description: "Уникальная ящерица с способностью менять цвет.",
            image: "assets/images/reptiles/chameleon.jpg",
            compatibility: {
                compatible: ["chameleon"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке, очень требовательна к условиям"
            }
        },
        {
            id: "veiled_chameleon",
            name: "Йеменский хамелеон",
            scientificName: "Chamaeleo calyptratus",
            category: "reptiles",
            type: "Ящерица",
            size: "medium",
            maxSize: 60,
            difficulty: "medium",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 50, max: 70 },
            lifespan: 8,
            behavior: "Территориальная",
            diet: "Насекомоядная",
            tankSize: 150,
            description: "Хамелеон с гребнем на голове.",
            image: "assets/images/reptiles/veiled_chameleon.jpg",
            compatibility: {
                compatible: ["veiled_chameleon"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "blue_tongue_skink",
            name: "Синеязыкий сцинк",
            scientificName: "Tiliqua",
            category: "reptiles",
            type: "Ящерица",
            size: "large",
            maxSize: 60,
            difficulty: "medium",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 40, max: 60 },
            lifespan: 20,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 200,
            description: "Крупная ящерица с синим языком.",
            image: "assets/images/reptiles/blue_tongue_skink.jpg",
            compatibility: {
                compatible: ["blue_tongue_skink"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "bearded_dragon_rankin",
            name: "Агама Ранкина",
            scientificName: "Pogona henrylawsoni",
            category: "reptiles",
            type: "Ящерица",
            size: "small",
            maxSize: 30,
            difficulty: "easy",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 30, max: 50 },
            lifespan: 10,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 100,
            description: "Карликовая форма бородатой агамы.",
            image: "assets/images/reptiles/bearded_dragon_rankin.jpg",
            compatibility: {
                compatible: ["bearded_dragon_rankin"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "panther_chameleon",
            name: "Пантерный хамелеон",
            scientificName: "Furcifer pardalis",
            category: "reptiles",
            type: "Ящерица",
            size: "medium",
            maxSize: 50,
            difficulty: "hard",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 25 } },
            humidity: { min: 60, max: 80 },
            lifespan: 5,
            behavior: "Территориальная",
            diet: "Насекомоядная",
            tankSize: 120,
            description: "Красивый хамелеон с ярким окрасом.",
            image: "assets/images/reptiles/panther_chameleon.jpg",
            compatibility: {
                compatible: ["panther_chameleon"],
                incompatible: ["other_reptiles"],
                notes: "Содержится поодиночке"
            }
        },
        {
            id: "red_eared_slider",
            name: "Красноухая черепаха",
            scientificName: "Trachemys scripta elegans",
            category: "reptiles",
            type: "Черепаха",
            size: "large",
            maxSize: 30,
            difficulty: "easy",
            temperature: { day: { min: 22, max: 28 }, night: { min: 18, max: 24 } },
            humidity: { min: 60, max: 80 },
            lifespan: 30,
            behavior: "Мирная",
            diet: "Всеядная",
            tankSize: 200,
            description: "Популярная водная черепаха.",
            image: "assets/images/reptiles/red_eared_slider.jpg",
            compatibility: {
                compatible: ["red_eared_slider"],
                incompatible: ["other_reptiles"],
                notes: "Требует акватеррариум"
            }
        },
        {
            id: "russian_tortoise",
            name: "Среднеазиатская черепаха",
            scientificName: "Testudo horsfieldii",
            category: "reptiles",
            type: "Черепаха",
            size: "medium",
            maxSize: 25,
            difficulty: "easy",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 24 } },
            humidity: { min: 30, max: 50 },
            lifespan: 50,
            behavior: "Мирная",
            diet: "Травоядная",
            tankSize: 150,
            description: "Сухопутная черепаха для террариума.",
            image: "assets/images/reptiles/russian_tortoise.jpg",
            compatibility: {
                compatible: ["russian_tortoise"],
                incompatible: ["other_reptiles"],
                notes: "Требует сухопутный террариум"
            }
        },
        {
            id: "hermann_tortoise",
            name: "Черепаха Германа",
            scientificName: "Testudo hermanni",
            category: "reptiles",
            type: "Черепаха",
            size: "medium",
            maxSize: 20,
            difficulty: "medium",
            temperature: { day: { min: 25, max: 32 }, night: { min: 18, max: 24 } },
            humidity: { min: 40, max: 60 },
            lifespan: 60,
            behavior: "Мирная",
            diet: "Травоядная",
            tankSize: 120,
            description: "Европейская сухопутная черепаха.",
            image: "assets/images/reptiles/hermann_tortoise.jpg",
            compatibility: {
                compatible: ["hermann_tortoise"],
                incompatible: ["other_reptiles"],
                notes: "Требует сухопутный террариум"
            }
        }
    ],

    // Методы для работы с базой данных
    getAllSpecies() {
        return [...this.fish, ...this.plants, ...this.reptiles];
    },

    getSpeciesByCategory(category) {
        return this[category] || [];
    },

    getSpeciesById(id) {
        const allSpecies = this.getAllSpecies();
        return allSpecies.find(species => species.id === id);
    },

    searchSpecies(query) {
        const allSpecies = this.getAllSpecies();
        const searchTerm = query.toLowerCase();
        
        return allSpecies.filter(species => 
            species.name.toLowerCase().includes(searchTerm) ||
            species.scientificName.toLowerCase().includes(searchTerm) ||
            species.description.toLowerCase().includes(searchTerm)
        );
    },

    filterSpecies(filters) {
        let allSpecies = this.getAllSpecies();
        
        if (filters.category && filters.category !== 'all') {
            allSpecies = allSpecies.filter(species => species.category === filters.category);
        }
        
        if (filters.difficulty && filters.difficulty !== 'all') {
            allSpecies = allSpecies.filter(species => species.difficulty === filters.difficulty);
        }
        
        if (filters.size && filters.size !== 'all') {
            allSpecies = allSpecies.filter(species => species.size === filters.size);
        }
        
        if (filters.type && filters.type !== 'all') {
            allSpecies = allSpecies.filter(species => species.type === filters.type);
        }
        
        return allSpecies;
    },

    checkCompatibility(species1, species2) {
        const sp1 = typeof species1 === 'string' ? this.getSpeciesById(species1) : species1;
        const sp2 = typeof species2 === 'string' ? this.getSpeciesById(species2) : species2;
        
        if (!sp1 || !sp2) return { compatible: false, reason: "Вид не найден" };
        
        // Проверяем совместимость
        const sp1Compatible = sp1.compatibility.compatible || [];
        const sp2Compatible = sp2.compatibility.compatible || [];
        
        const sp1Incompatible = sp1.compatibility.incompatible || [];
        const sp2Incompatible = sp2.compatibility.incompatible || [];
        
        // Если один из видов в списке несовместимых
        if (sp1Incompatible.includes(sp2.id) || sp2Incompatible.includes(sp1.id)) {
            return { compatible: false, reason: "Виды несовместимы" };
        }
        
        // Если оба вида в списке совместимых
        if (sp1Compatible.includes(sp2.id) || sp2Compatible.includes(sp1.id)) {
            return { compatible: true, reason: "Виды совместимы" };
        }
        
        // Проверяем общие требования к условиям
        const tempCompatible = this.checkTemperatureCompatibility(sp1, sp2);
        const phCompatible = this.checkPhCompatibility(sp1, sp2);
        
        if (!tempCompatible) {
            return { compatible: false, reason: "Несовместимые требования к температуре" };
        }
        
        if (!phCompatible) {
            return { compatible: false, reason: "Несовместимые требования к pH" };
        }
        
        return { compatible: true, reason: "Виды совместимы по условиям содержания" };
    },

    checkTemperatureCompatibility(sp1, sp2) {
        if (!sp1.temperature || !sp2.temperature) return true;
        
        const temp1 = sp1.temperature;
        const temp2 = sp2.temperature;
        
        // Для рыб
        if (sp1.category === 'fish' && sp2.category === 'fish') {
            const min1 = temp1.min || temp1.day?.min;
            const max1 = temp1.max || temp1.day?.max;
            const min2 = temp2.min || temp2.day?.min;
            const max2 = temp2.max || temp2.day?.max;
            
            return Math.max(min1, min2) <= Math.min(max1, max2);
        }
        
        // Для рептилий
        if (sp1.category === 'reptiles' && sp2.category === 'reptiles') {
            const day1 = temp1.day;
            const day2 = temp2.day;
            
            return Math.max(day1.min, day2.min) <= Math.min(day1.max, day2.max);
        }
        
        return true;
    },

    checkPhCompatibility(sp1, sp2) {
        if (!sp1.ph || !sp2.ph) return true;
        
        const ph1 = sp1.ph;
        const ph2 = sp2.ph;
        
        return Math.max(ph1.min, ph2.min) <= Math.min(ph1.max, ph2.max);
    },

    getCompatibleSpecies(speciesId) {
        const species = this.getSpeciesById(speciesId);
        if (!species) return [];
        
        const compatibleIds = species.compatibility.compatible || [];
        return compatibleIds.map(id => this.getSpeciesById(id)).filter(Boolean);
    },

    getIncompatibleSpecies(speciesId) {
        const species = this.getSpeciesById(speciesId);
        if (!species) return [];
        
        const incompatibleIds = species.compatibility.incompatible || [];
        return incompatibleIds.map(id => this.getSpeciesById(id)).filter(Boolean);
    }
};

// Экспорт для использования в других модулях
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpeciesDatabase;
}
