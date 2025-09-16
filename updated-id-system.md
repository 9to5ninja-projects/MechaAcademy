# Updated Unique ID System with Subfolder Organization

## Revised File Structure
```
data/
├── items/
│   ├── frames/
│   │   ├── light/
│   │   │   ├── frame_light_001_scout.json
│   │   │   ├── frame_light_002_interceptor.json
│   │   │   └── frame_light_003_stealth.json
│   │   ├── medium/
│   │   │   ├── frame_medium_001_assault.json
│   │   │   ├── frame_medium_002_support.json
│   │   │   └── frame_medium_003_balanced.json
│   │   ├── heavy/
│   │   │   ├── frame_heavy_001_tank.json
│   │   │   ├── frame_heavy_002_siege.json
│   │   │   └── frame_heavy_003_fortress.json
│   │   ├── special/
│   │   │   ├── frame_special_001_prototype.json
│   │   │   └── frame_special_002_experimental.json
│   │   └── dev/
│   │       ├── frame_dev_001_test_platform.json
│   │       └── frame_dev_002_debug_frame.json
│   ├── parts/
│   │   ├── weapons/
│   │   │   ├── physical/
│   │   │   │   ├── weapon_physical_001_autocannon.json
│   │   │   │   ├── weapon_physical_002_railgun.json
│   │   │   │   └── weapon_physical_003_hammer.json
│   │   │   ├── projectile/
│   │   │   │   ├── weapon_projectile_001_missile_pod.json
│   │   │   │   ├── weapon_projectile_002_rocket_launcher.json
│   │   │   │   └── weapon_projectile_003_grenade_launcher.json
│   │   │   └── beam/
│   │   │       ├── weapon_beam_001_laser_rifle.json
│   │   │       ├── weapon_beam_002_plasma_cannon.json
│   │   │       └── weapon_beam_003_particle_beam.json
│   │   ├── armor/
│   │   │   ├── head/
│   │   │   │   ├── armor_head_001_basic_helmet.json
│   │   │   │   ├── armor_head_002_tactical_visor.json
│   │   │   │   └── armor_head_003_sensor_array.json
│   │   │   ├── torso/
│   │   │   │   ├── armor_torso_001_standard_plate.json
│   │   │   │   ├── armor_torso_002_reactive_armor.json
│   │   │   │   └── armor_torso_003_composite_shell.json
│   │   │   ├── arms/
│   │   │   │   ├── armor_arms_001_basic_guards.json
│   │   │   │   ├── armor_arms_002_servo_enhanced.json
│   │   │   │   └── armor_arms_003_weapon_mounts.json
│   │   │   └── legs/
│   │   │       ├── armor_legs_001_standard_plating.json
│   │   │       ├── armor_legs_002_mobility_enhanced.json
│   │   │       └── armor_legs_003_heavy_support.json
│   │   ├── coolers/
│   │   │   ├── cooler_001_basic_heatsink.json
│   │   │   ├── cooler_002_active_cooling.json
│   │   │   ├── cooler_003_cryo_system.json
│   │   │   └── cooler_004_thermal_regulator.json
│   │   ├── OS/
│   │   │   ├── os_001_standard_firmware.json
│   │   │   ├── os_002_combat_optimized.json
│   │   │   ├── os_003_stealth_package.json
│   │   │   └── os_004_overclocking_suite.json
│   │   └── generators/
│   │       ├── gen_001_standard_core.json
│   │       ├── gen_002_high_output.json
│   │       ├── gen_003_efficient_cell.json
│   │       └── gen_004_burst_reactor.json
│   ├── cards/
│   │   ├── pilot_skills/
│   │   │   ├── skill_001_precision_shot.json
│   │   │   ├── skill_002_evasive_maneuvers.json
│   │   │   └── skill_003_tactical_analysis.json
│   │   ├── equipment_actions/
│   │   │   ├── action_001_plasma_shot.json
│   │   │   ├── action_002_missile_volley.json
│   │   │   └── action_003_emergency_cooling.json
│   │   ├── special/
│   │   │   ├── combo_001_overcharged_blast.json
│   │   │   └── combo_002_synchronized_strike.json
│   │   └── dev/
│   │       ├── test_card_001_debug_damage.json
│   │       └── test_card_002_infinite_resources.json
│   └── copilots/
│       ├── copilot_001_aria_tactical.json
│       ├── copilot_002_zephyr_support.json
│       └── copilot_003_nexus_analytical.json
├── indexes/
│   ├── item_registry.json           # Master index with folder paths
│   ├── card_collections.json        # Deck building collections
│   ├── unlock_chains.json          # Progression dependencies
│   └── balance_tables.json         # Power level indexing
└── ui/
    ├── menu_layouts.json           # Menu structure definitions
    ├── window_configs.json         # UI window specifications
    └── flow_definitions.json       # Menu transition logic
```

## Updated Unique ID Format

### ID Pattern with Subfolder Structure
```javascript
const updatedIdFormats = {
    // Frames: frame_[weightclass]_###_[role]
    lightFrames: "frame_light_###_[role]",          // frame_light_001_scout
    mediumFrames: "frame_medium_###_[role]",        // frame_medium_001_assault
    heavyFrames: "frame_heavy_###_[role]",          // frame_heavy_001_tank
    specialFrames: "frame_special_###_[type]",      // frame_special_001_prototype
    devFrames: "frame_dev_###_[purpose]",           // frame_dev_001_test_platform
    
    // Weapons: weapon_[category]_###_[name]
    physicalWeapons: "weapon_physical_###_[name]",  // weapon_physical_001_autocannon
    projectileWeapons: "weapon_projectile_###_[name]", // weapon_projectile_001_missile_pod
    beamWeapons: "weapon_beam_###_[name]",          // weapon_beam_001_laser_rifle
    
    // Armor: armor_[slot]_###_[type]
    headArmor: "armor_head_###_[type]",             // armor_head_001_basic_helmet
    torsoArmor: "armor_torso_###_[type]",           // armor_torso_001_standard_plate
    armsArmor: "armor_arms_###_[type]",             // armor_arms_001_basic_guards
    legsArmor: "armor_legs_###_[type]",             // armor_legs_001_standard_plating
    
    // Other Parts: [type]_###_[name]
    coolers: "cooler_###_[name]",                   // cooler_001_basic_heatsink
    operatingSystems: "os_###_[name]",              // os_001_standard_firmware
    generators: "gen_###_[name]",                   // gen_001_standard_core
    
    // Cards maintain simple numbering
    pilotSkills: "skill_###_[name]",                // skill_001_precision_shot
    equipmentActions: "action_###_[name]",          // action_001_plasma_shot
    combos: "combo_###_[name]",                     // combo_001_overcharged_blast
    
    // Development items
    devCards: "test_card_###_[purpose]",            // test_card_001_debug_damage
    
    // Copilots
    copilots: "copilot_###_[designation]"           // copilot_001_aria_tactical
};
```

## Updated Data Loading System

### Folder-Aware Item Manager
```javascript
class FolderAwareItemManager {
    constructor() {
        this.cache = new Map();
        this.folderPaths = {
            // Frame paths
            'frame_light': 'frames/light/',
            'frame_medium': 'frames/medium/',
            'frame_heavy': 'frames/heavy/',
            'frame_special': 'frames/special/',
            'frame_dev': 'frames/dev/',
            
            // Weapon paths
            'weapon_physical': 'parts/weapons/physical/',
            'weapon_projectile': 'parts/weapons/projectile/',
            'weapon_beam': 'parts/weapons/beam/',
            
            // Armor paths
            'armor_head': 'parts/armor/head/',
            'armor_torso': 'parts/armor/torso/',
            'armor_arms': 'parts/armor/arms/',
            'armor_legs': 'parts/armor/legs/',
            
            // Other parts
            'cooler': 'parts/coolers/',
            'os': 'parts/OS/',
            'gen': 'parts/generators/',
            
            // Cards
            'skill': 'cards/pilot_skills/',
            'action': 'cards/equipment_actions/',
            'combo': 'cards/special/',
            'test_card': 'cards/dev/',
            
            // Copilots
            'copilot': 'copilots/'
        };
    }
    
    getItemPath(itemId) {
        // Extract category from ID and map to folder path
        const category = this.extractCategory(itemId);
        const basePath = this.folderPaths[category];
        
        if (!basePath) {
            throw new Error(`Unknown item category for ID: ${itemId}`);
        }
        
        return `data/items/${basePath}${itemId}.json`;
    }
    
    extractCategory(itemId) {
        // Parse ID to determine subfolder
        if (itemId.startsWith('frame_light_')) return 'frame_light';
        if (itemId.startsWith('frame_medium_')) return 'frame_medium';
        if (itemId.startsWith('frame_heavy_')) return 'frame_heavy';
        if (itemId.startsWith('frame_special_')) return 'frame_special';
        if (itemId.startsWith('frame_dev_')) return 'frame_dev';
        
        if (itemId.startsWith('weapon_physical_')) return 'weapon_physical';
        if (itemId.startsWith('weapon_projectile_')) return 'weapon_projectile';
        if (itemId.startsWith('weapon_beam_')) return 'weapon_beam';
        
        if (itemId.startsWith('armor_head_')) return 'armor_head';
        if (itemId.startsWith('armor_torso_')) return 'armor_torso';
        if (itemId.startsWith('armor_arms_')) return 'armor_arms';
        if (itemId.startsWith('armor_legs_')) return 'armor_legs';
        
        if (itemId.startsWith('cooler_')) return 'cooler';
        if (itemId.startsWith('os_')) return 'os';
        if (itemId.startsWith('gen_')) return 'gen';
        
        if (itemId.startsWith('skill_')) return 'skill';
        if (itemId.startsWith('action_')) return 'action';
        if (itemId.startsWith('combo_')) return 'combo';
        if (itemId.startsWith('test_card_')) return 'test_card';
        
        if (itemId.startsWith('copilot_')) return 'copilot';
        
        throw new Error(`Cannot determine category for item ID: ${itemId}`);
    }
    
    async getItem(itemId) {
        if (this.cache.has(itemId)) {
            return this.cache.get(itemId);
        }
        
        const itemPath = this.getItemPath(itemId);
        const item = await this.fetchJSON(itemPath);
        this.cache.set(itemId, item);
        
        return item;
    }
    
    async getItemsByCategory(category, subcategory = null) {
        // Get all items in a category/subcategory
        const registry = await this.getItemRegistry();
        const categoryKey = subcategory ? `${category}_${subcategory}` : category;
        
        const itemIds = Object.keys(registry).filter(id => {
            return this.extractCategory(id) === categoryKey;
        });
        
        return Promise.all(itemIds.map(id => this.getItem(id)));
    }
    
    // Convenience methods for specific categories
    async getLightFrames() {
        return this.getItemsByCategory('frame', 'light');
    }
    
    async getMediumFrames() {
        return this.getItemsByCategory('frame', 'medium');
    }
    
    async getHeavyFrames() {
        return this.getItemsByCategory('frame', 'heavy');
    }
    
    async getPhysicalWeapons() {
        return this.getItemsByCategory('weapon', 'physical');
    }
    
    async getBeamWeapons() {
        return this.getItemsByCategory('weapon', 'beam');
    }
    
    async getProjectileWeapons() {
        return this.getItemsByCategory('weapon', 'projectile');
    }
    
    async getCoolers() {
        return this.getItemsByCategory('cooler');
    }
    
    async getOperatingSystems() {
        return this.getItemsByCategory('os');
    }
}
```

## Sample JSON Templates for Your Blank Files

### Item Registry Template (indexes/item_registry.json)
```json
{
    "frame_light_001_scout": {
        "category": "frame_light",
        "subcategory": "scout",
        "tier": "basic",
        "unlockRequirement": "course_001_basic_piloting"
    },
    "frame_medium_001_assault": {
        "category": "frame_medium", 
        "subcategory": "assault",
        "tier": "intermediate",
        "unlockRequirement": "course_003_combat_theory"
    },
    "weapon_beam_001_laser_rifle": {
        "category": "weapon_beam",
        "subcategory": "rifle",
        "tier": "basic",
        "unlockRequirement": "course_002_energy_weapons"
    },
    "armor_head_001_basic_helmet": {
        "category": "armor_head",
        "subcategory": "standard",
        "tier": "basic",
        "unlockRequirement": "none"
    },
    "cooler_001_basic_heatsink": {
        "category": "cooler",
        "subcategory": "passive",
        "tier": "basic",
        "unlockRequirement": "course_004_thermal_management"
    }
}
```

### Menu Layouts Template (ui/menu_layouts.json)
```json
{
    "academy_hub": {
        "layout": "radial",
        "areas": [
            {
                "id": "hangar",
                "name": "Hangar Bay",
                "icon": "mecha_icon",
                "position": { "x": 200, "y": 150 },
                "description": "Customize your mecha loadout"
            },
            {
                "id": "courses",
                "name": "Academy Courses", 
                "icon": "book_icon",
                "position": { "x": 400, "y": 100 },
                "description": "Advance your pilot training"
            },
            {
                "id": "missions",
                "name": "Mission Control",
                "icon": "target_icon", 
                "position": { "x": 600, "y": 150 },
                "description": "Accept contracts and missions"
            }
        ]
    },
    "mecha_customization": {
        "layout": "sidebar_main",
        "windows": [
            {
                "id": "frame_selection",
                "position": { "x": 0, "y": 0, "width": 200, "height": 400 },
                "type": "list_selection"
            },
            {
                "id": "parts_inventory",
                "position": { "x": 200, "y": 0, "width": 300, "height": 400 },
                "type": "categorized_grid"
            },
            {
                "id": "loadout_display",
                "position": { "x": 500, "y": 0, "width": 300, "height": 300 },
                "type": "visual_mecha"
            }
        ]
    }
}
```

### Card Collections Template (indexes/card_collections.json)
```json
{
    "starter_pilot_deck": {
        "name": "Cadet Training Deck",
        "description": "Basic pilot skills for new academy students",
        "cards": [
            "skill_001_basic_targeting",
            "skill_002_evasive_movement", 
            "skill_003_system_check",
            "skill_004_emergency_protocols"
        ],
        "unlockRequirement": "character_creation"
    },
    "combat_specialist_deck": {
        "name": "Combat Specialist Cards",
        "description": "Advanced combat maneuvers and tactics",
        "cards": [
            "skill_010_precision_shot",
            "skill_011_suppressing_fire",
            "skill_012_combat_reflexes",
            "skill_013_weapon_mastery"
        ],
        "unlockRequirement": "course_combat_specialist_complete"
    },
    "engineer_deck": {
        "name": "Systems Engineer Cards", 
        "description": "Technical skills and system optimization",
        "cards": [
            "skill_020_overclock_system",
            "skill_021_emergency_repair",
            "skill_022_heat_management",
            "skill_023_power_optimization"
        ],
        "unlockRequirement": "course_systems_engineer_complete"
    }
}
```

## Copilot Generation Patterns for Organized Structure

### Frame Generation Comments
```javascript
// Generate a light scout frame for the light/ folder:
// - ID: frame_light_001_scout
// - High speed (180), low armor (80), moderate energy (220)
// - Weight limit 45, heat dissipation 30
// - 1 head, 2 torso, 2 arm, 2 leg, 1 generator slots
// - Unlocks after "Basic Piloting 101" course

// Create a medium assault frame for the medium/ folder:
// - ID: frame_medium_001_assault  
// - Balanced stats (armor 140, speed 110, energy 280)
// - Weight limit 80, heat dissipation 20
// - 2 head, 3 torso, 3 arm, 2 leg, 1 generator slots
// - Requires "Combat Theory Fundamentals" course
```

### Weapon Generation Comments
```javascript
// Generate a beam weapon for the beam/ folder:
// - ID: weapon_beam_001_laser_rifle
// - 45 damage, 30 energy draw, 12 heat generation
// - Weight 8, accuracy 90, medium range
// - Common rarity, costs 3500 credits
// - Effect: precision targeting (+10% crit chance)

// Create a physical weapon for the physical/ folder:
// - ID: weapon_physical_001_autocannon
// - 35 damage, 25 energy draw, 8 heat generation  
// - Weight 12, accuracy 75, long range
// - Uncommon rarity, costs 5200 credits
// - Effect: armor piercing (ignores 20% armor)
```

This system maintains your organized folder structure while providing unique IDs that make referencing specific items straightforward and predictable for both the data loading system and Copilot content generation.