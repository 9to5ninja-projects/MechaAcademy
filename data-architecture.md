# Mecha Academy: Scalable Data Architecture

## Data Organization Strategy

### File Structure for Scale
```
data/
├── mecha/
│   ├── frames/
│   │   ├── light-frames.json       # 3-5 light frames
│   │   ├── medium-frames.json      # 4-6 medium frames  
│   │   └── heavy-frames.json       # 3-5 heavy frames
│   ├── parts/
│   │   ├── weapons/
│   │   │   ├── energy-weapons.json # Plasma rifles, lasers, etc.
│   │   │   ├── kinetic-weapons.json # Autocannons, railguns, etc.
│   │   │   ├── missile-weapons.json # Missiles, rockets, etc.
│   │   │   └── melee-weapons.json  # Swords, hammers, etc.
│   │   ├── armor/
│   │   │   ├── head-armor.json
│   │   │   ├── torso-armor.json
│   │   │   ├── arm-armor.json
│   │   │   └── leg-armor.json
│   │   ├── generators/
│   │   │   ├── standard-generators.json
│   │   │   ├── high-output-generators.json
│   │   │   └── efficient-generators.json
│   │   ├── cooling/
│   │   │   ├── heat-sinks.json
│   │   │   ├── cooling-systems.json
│   │   │   └── thermal-management.json
│   │   └── special/
│   │       ├── experimental-parts.json
│   │       ├── academy-exclusive.json
│   │       └── prototype-systems.json
│   └── loadouts/
│       ├── preset-builds.json      # Pre-made mecha configurations
│       └── npc-builds.json         # Enemy/ally configurations
├── pilots/
│   ├── specializations.json        # Combat, engineering, stealth, etc.
│   ├── progression-tracks.json     # Academy course unlocks
│   └── npc-pilots.json             # Instructors, rivals, etc.
├── copilots/
│   ├── personalities.json          # Analytical, aggressive, etc.
│   ├── specialization-abilities.json
│   └── relationship-data.json      # Bond progression
├── cards/
│   ├── pilot-skills/
│   │   ├── combat-skills.json
│   │   ├── engineering-skills.json
│   │   ├── tactical-skills.json
│   │   └── advanced-skills.json
│   ├── equipment-actions/          # Auto-generated from parts
│   │   ├── weapon-actions.json
│   │   ├── system-actions.json
│   │   └── defensive-actions.json
│   └── special-combinations/
│       ├── combo-cards.json        # Multi-part synergies
│       └── unique-abilities.json   # Story/unlock rewards
├── missions/
│   ├── academy/
│   │   ├── tutorial-missions.json
│   │   ├── course-missions.json
│   │   └── exam-missions.json
│   ├── story/
│   │   ├── chapter-missions.json
│   │   └── story-encounters.json
│   └── procedural/
│       ├── contract-templates.json
│       ├── arena-templates.json
│       └── salvage-templates.json
└── economy/
    ├── shop-inventories.json
    ├── reward-tables.json
    ├── progression-unlocks.json
    └── market-events.json
```

## Data Loading System Architecture

### Core Data Manager Plugin
```javascript
/*:
 * @target MZ
 * @plugindesc [v1.0.0] Mecha Academy Data Manager
 * @author YourName
 */

(() => {
    'use strict';
    
    class MechaDataManager {
        constructor() {
            this.cache = new Map();
            this.loadingPromises = new Map();
            this.isInitialized = false;
        }
        
        async initialize() {
            if (this.isInitialized) return;
            
            console.log('Loading Mecha Academy data...');
            
            // Load core data files in parallel
            await Promise.all([
                this.loadDataCategory('frames'),
                this.loadDataCategory('parts'),
                this.loadDataCategory('pilots'),
                this.loadDataCategory('copilots'),
                this.loadDataCategory('cards')
            ]);
            
            // Generate derived data (equipment cards from parts)
            this.generateEquipmentCards();
            
            this.isInitialized = true;
            console.log('Mecha Academy data loaded successfully');
        }
        
        async loadDataCategory(category) {
            // Load all JSON files for a category
            const categoryPath = `data/${category}/`;
            const files = await this.getFilesInCategory(category);
            
            for (const file of files) {
                const data = await this.loadJSONFile(`${categoryPath}${file}`);
                this.cache.set(`${category}-${file}`, data);
            }
        }
        
        async loadJSONFile(path) {
            try {
                const response = await fetch(path);
                return await response.json();
            } catch (error) {
                console.error(`Failed to load ${path}:`, error);
                return {};
            }
        }
        
        // Query methods for game systems
        getFramesByWeightClass(weightClass) {
            const frames = [];
            for (const [key, data] of this.cache) {
                if (key.startsWith('frames-') && data) {
                    frames.push(...Object.values(data).filter(f => f.weightClass === weightClass));
                }
            }
            return frames;
        }
        
        getPartsByType(partType) {
            const parts = [];
            for (const [key, data] of this.cache) {
                if (key.startsWith('parts-') && data) {
                    parts.push(...Object.values(data).filter(p => p.type === partType));
                }
            }
            return parts;
        }
        
        generateEquipmentCards() {
            // Auto-generate cards from mecha parts
            const allParts = this.getAllParts();
            const equipmentCards = {};
            
            allParts.forEach(part => {
                if (part.type === 'weapon') {
                    equipmentCards[`card_${part.id}`] = this.createWeaponCard(part);
                }
                // Add other part types...
            });
            
            this.cache.set('generated-equipment-cards', equipmentCards);
        }
        
        createWeaponCard(weaponPart) {
            return {
                id: `card_${weaponPart.id}`,
                name: `${weaponPart.name} Attack`,
                source: weaponPart.id,
                costs: { 
                    energy: weaponPart.energyDraw, 
                    actions: 1 
                },
                effects: [{
                    type: "damage",
                    target: "enemy",
                    formula: `${weaponPart.statModifiers.attack} * pilot.targeting_efficiency`,
                    heatGeneration: weaponPart.heatGeneration
                }]
            };
        }
    }
    
    // Make globally available
    window.MechaDataManager = new MechaDataManager();
    
    // Auto-initialize when game starts
    const originalCreateGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        originalCreateGameObjects.call(this);
        window.MechaDataManager.initialize();
    };
})();
```

## Procedural Content Generation System

### Data Generation Tools
```javascript
// Development tool for creating test content at scale
class ContentGenerator {
    constructor() {
        this.rarityWeights = {
            common: 0.6,
            uncommon: 0.25,
            rare: 0.12,
            legendary: 0.03
        };
    }
    
    generateWeaponParts(count = 20) {
        const weapons = [];
        const weaponTypes = ['laser', 'plasma', 'kinetic', 'missile', 'melee'];
        const weightClasses = ['light', 'medium', 'heavy'];
        
        for (let i = 0; i < count; i++) {
            const weaponType = this.randomChoice(weaponTypes);
            const weightClass = this.randomChoice(weightClasses);
            const rarity = this.selectByWeight(this.rarityWeights);
            
            weapons.push(this.createWeapon(weaponType, weightClass, rarity, i));
        }
        
        return weapons;
    }
    
    createWeapon(type, weightClass, rarity, index) {
        const rarityMultipliers = {
            common: 1.0,
            uncommon: 1.3,
            rare: 1.7,
            legendary: 2.2
        };
        
        const weightMultipliers = {
            light: { weight: 0.7, damage: 0.8, energy: 0.8 },
            medium: { weight: 1.0, damage: 1.0, energy: 1.0 },
            heavy: { weight: 1.5, damage: 1.4, energy: 1.3 }
        };
        
        const baseStats = this.getBaseWeaponStats(type);
        const rarityMult = rarityMultipliers[rarity];
        const weightMult = weightMultipliers[weightClass];
        
        return {
            id: `part_${type}_${weightClass}_${index}`,
            name: `${this.capitalize(type)} ${this.capitalize(weightClass)} ${rarity}`,
            type: "weapon",
            slot: "arm",
            weight: Math.floor(baseStats.weight * weightMult.weight),
            energyDraw: Math.floor(baseStats.energyDraw * weightMult.energy),
            heatGeneration: Math.floor(baseStats.heatGeneration * rarityMult),
            statModifiers: {
                attack: Math.floor(baseStats.attack * weightMult.damage * rarityMult),
                accuracy: baseStats.accuracy + (rarity === 'legendary' ? 10 : 0),
                range: baseStats.range
            },
            effects: this.getWeaponEffects(type, rarity),
            rarity: rarity,
            cost: Math.floor(baseStats.cost * rarityMult * (weightMult.damage + weightMult.energy) / 2)
        };
    }
    
    // Utility methods...
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    selectByWeight(weights) {
        const random = Math.random();
        let cumulative = 0;
        
        for (const [item, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (random <= cumulative) return item;
        }
        
        return Object.keys(weights)[0]; // fallback
    }
}
```

## Integration with RPG Maker MZ Database

### Hybrid Approach: JSON + MZ Database
```javascript
class DatabaseIntegration {
    constructor() {
        this.mechaItemCategory = 10; // Custom item type for mecha parts
        this.pilotSkillCategory = 11; // Custom skill type for pilot abilities
    }
    
    syncWithMZDatabase() {
        // Convert our JSON data to MZ database entries for integration
        const frames = MechaDataManager.getAllFrames();
        const parts = MechaDataManager.getAllParts();
        
        // Add mecha parts as custom items
        parts.forEach((part, index) => {
            const itemId = 1000 + index; // Start custom items at ID 1000
            $dataItems[itemId] = this.convertPartToItem(part);
        });
        
        // Add pilot skills as custom skills
        const pilotCards = MechaDataManager.getPilotCards();
        pilotCards.forEach((card, index) => {
            const skillId = 500 + index; // Start custom skills at ID 500
            $dataSkills[skillId] = this.convertCardToSkill(card);
        });
    }
    
    convertPartToItem(part) {
        return {
            id: part.id,
            name: part.name,
            description: `${part.type} part: +${part.statModifiers.attack || 0} ATK`,
            iconIndex: this.getPartIcon(part.type),
            price: part.cost,
            occasion: 3, // Never usable (equipment only)
            scope: 0,
            meta: {
                mechaPartData: JSON.stringify(part)
            }
        };
    }
}
```

## Development Workflow with Copilot

### Comment-Driven Data Generation
```javascript
// Instead of hardcoding, use Copilot to generate JSON data templates:

// Generate 5 light scout frames with the following characteristics:
// - Speed-focused (150-200 speed, 80-120 armor)
// - Low weight limits (40-60) for mobility
// - Moderate energy capacity (180-250)
// - Scout role specialization bonuses
// - Academy unlock progression from basic to advanced

// Create 8 energy weapons with these parameters:
// - Laser/plasma/particle beam types
// - Damage range 35-75 based on rarity
// - Energy consumption 25-50
// - Heat generation 10-25
// - Weight 8-15 units
// - Include special effects for rare+ weapons

// Build 6 cooling system parts that:
// - Reduce heat generation by 15-40%
// - Add passive heat dissipation +5 to +20
// - Weight costs 3-12 units
// - Energy draw 0-8 (active cooling systems)
// - Rarity distribution: 3 common, 2 uncommon, 1 rare
```

## Testing Framework

### Automated Content Validation
```javascript
class ContentValidator {
    validateAllData() {
        const errors = [];
        
        // Validate frames
        const frames = MechaDataManager.getAllFrames();
        frames.forEach(frame => {
            if (!this.isValidFrame(frame)) {
                errors.push(`Invalid frame: ${frame.id}`);
            }
        });
        
        // Validate parts fit within frame constraints
        const parts = MechaDataManager.getAllParts();
        frames.forEach(frame => {
            const testLoadout = this.generateTestLoadout(frame, parts);
            if (!this.validateLoadout(frame, testLoadout)) {
                errors.push(`No valid loadout possible for frame: ${frame.id}`);
            }
        });
        
        // Validate card generation
        const cards = MechaDataManager.getAllCards();
        if (cards.length < 50) {
            errors.push(`Insufficient cards for testing: ${cards.length}/50 minimum`);
        }
        
        return errors;
    }
    
    generateTestCombatScenario() {
        // Create a balanced test encounter
        const playerFrame = this.selectRandomFrame('medium');
        const playerParts = this.generateBalancedLoadout(playerFrame);
        const enemyFrame = this.selectRandomFrame('medium');
        const enemyParts = this.generateBalancedLoadout(enemyFrame);
        
        return {
            player: { frame: playerFrame, parts: playerParts },
            enemy: { frame: enemyFrame, parts: enemyParts },
            expectedCombatLength: "3-8 turns",
            balanceFactors: this.calculateBalanceFactors(playerFrame, enemyFrame)
        };
    }
}
```

## Implementation Priority

### Phase 1: Data Foundation (Week 1)
1. **Set up JSON file structure** (organize existing content)
2. **Create data loading system** (MechaDataManager plugin)
3. **Build content generation tools** (ContentGenerator)
4. **Validate data architecture** (ContentValidator)

### Phase 2: Content Generation (Week 2)
1. **Generate minimum viable content** (10 frames, 50 parts, 30 pilots, 25 cards)
2. **Test data loading and validation**
3. **Create procedural generation tools**
4. **Balance testing framework**

### Phase 3: Combat Integration (Week 3)
1. **Integrate with Card Game DLC**
2. **Test combat scenarios with generated content**
3. **Refine balance algorithms**
4. **Polish data management tools**

This architecture scales from testing to production and maintains Copilot productivity through structured data generation rather than manual content creation.