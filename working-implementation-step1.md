# Step 1: Working Data Loader + Test Content

## Phase 1A: Create Simple Data Loader Plugin

**File: `js/plugins/DataLoader.js`**

```javascript
/*:
 * @target MZ
 * @plugindesc [v1.0.0] Simple Data Loader
 * @author YourName
 * @help DataLoader.js
 * 
 * Basic data loading system for mecha academy.
 */

(() => {
    'use strict';
    
    class SimpleDataLoader {
        constructor() {
            this.items = {};
            this.isLoaded = false;
        }
        
        async loadItem(itemId) {
            if (this.items[itemId]) {
                return this.items[itemId];
            }
            
            try {
                const path = this.getItemPath(itemId);
                const response = await fetch(path);
                const item = await response.json();
                this.items[itemId] = item;
                console.log(`Loaded: ${itemId}`, item);
                return item;
            } catch (error) {
                console.error(`Failed to load ${itemId}:`, error);
                return null;
            }
        }
        
        getItemPath(itemId) {
            // Simple path mapping based on ID prefix
            if (itemId.startsWith('frame_light_')) {
                return `data/items/frames/light/${itemId}.json`;
            }
            if (itemId.startsWith('frame_medium_')) {
                return `data/items/frames/medium/${itemId}.json`;
            }
            if (itemId.startsWith('weapon_beam_')) {
                return `data/items/parts/weapons/beam/${itemId}.json`;
            }
            if (itemId.startsWith('weapon_physical_')) {
                return `data/items/parts/weapons/physical/${itemId}.json`;
            }
            if (itemId.startsWith('cooler_')) {
                return `data/items/parts/coolers/${itemId}.json`;
            }
            
            throw new Error(`Unknown item type: ${itemId}`);
        }
        
        async testLoad() {
            console.log('=== Testing Data Loader ===');
            
            // Test loading different item types
            const testItems = [
                'frame_light_001_scout',
                'frame_medium_001_assault', 
                'weapon_beam_001_laser_rifle',
                'weapon_physical_001_autocannon',
                'cooler_001_basic_heatsink'
            ];
            
            for (const itemId of testItems) {
                await this.loadItem(itemId);
            }
            
            console.log('=== Test Complete ===');
            console.log('Loaded items:', Object.keys(this.items));
        }
    }
    
    // Make globally available
    window.DataLoader = new SimpleDataLoader();
    
    // Auto-test when plugin loads
    const originalStart = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        originalStart.call(this);
        setTimeout(() => {
            window.DataLoader.testLoad();
        }, 1000);
    };
})();
```

## Phase 1B: Generate Test Content Using Copilot

**PRIORITY: Create these exact files using Copilot generation**

### 1. Light Scout Frame
**File: `data/items/frames/light/frame_light_001_scout.json`**

```javascript
// Create a light scout frame with these specifications:
// - ID: frame_light_001_scout
// - Name: "Lynx Scout Frame"
// - Weight class: light, Role: scout
// - Stats: 80 armor, 180 speed, 220 energy capacity, 30 heat dissipation
// - Weight limit: 45, Hardpoints: 1 head, 2 torso, 2 arms, 2 legs, 1 generator
// - Unlock requirement: "basic_piloting_101"
// - Description: "Fast and agile frame designed for reconnaissance missions"
```

**Expected Copilot Output:**
```json
{
    "id": "frame_light_001_scout",
    "name": "Lynx Scout Frame", 
    "weightClass": "light",
    "role": "scout",
    "baseStats": {
        "armor": 80,
        "speed": 180,
        "energyCapacity": 220,
        "heatDissipation": 30,
        "weightLimit": 45,
        "hardpoints": {
            "head": 1,
            "torso": 2,
            "arms": 2,
            "legs": 2,
            "generator": 1
        }
    },
    "unlockRequirement": "basic_piloting_101",
    "description": "Fast and agile frame designed for reconnaissance missions",
    "cost": 15000
}
```

### 2. Medium Assault Frame  
**File: `data/items/frames/medium/frame_medium_001_assault.json`**

```javascript
// Create a medium assault frame with these specifications:
// - ID: frame_medium_001_assault
// - Name: "Warrior Assault Frame"
// - Weight class: medium, Role: assault
// - Stats: 140 armor, 110 speed, 280 energy capacity, 20 heat dissipation  
// - Weight limit: 80, Hardpoints: 2 head, 3 torso, 3 arms, 2 legs, 1 generator
// - Unlock requirement: "combat_theory_fundamentals"
// - Description: "Balanced frame optimized for frontline combat operations"
```

### 3. Beam Weapon
**File: `data/items/parts/weapons/beam/weapon_beam_001_laser_rifle.json`**

```javascript
// Create a beam weapon with these specifications:
// - ID: weapon_beam_001_laser_rifle
// - Name: "LR-7 Laser Rifle"
// - Type: weapon, Slot: arm
// - Stats: 45 damage, 30 energy draw, 12 heat generation, 8 weight
// - Modifiers: 90 accuracy, medium range
// - Rarity: common, Cost: 3500
// - Effects: ["precision_targeting"] (+10% critical hit chance)
// - Description: "Standard laser rifle with excellent accuracy"
```

### 4. Physical Weapon
**File: `data/items/parts/weapons/physical/weapon_physical_001_autocannon.json`**

```javascript
// Create a physical weapon with these specifications:
// - ID: weapon_physical_001_autocannon  
// - Name: "AC-20 Autocannon"
// - Type: weapon, Slot: arm
// - Stats: 35 damage, 25 energy draw, 8 heat generation, 12 weight
// - Modifiers: 75 accuracy, long range
// - Rarity: uncommon, Cost: 5200
// - Effects: ["armor_piercing"] (ignores 20% armor)
// - Description: "High-velocity kinetic weapon effective against armor"
```

### 5. Cooling System
**File: `data/items/parts/coolers/cooler_001_basic_heatsink.json`**

```javascript
// Create a cooling system with these specifications:
// - ID: cooler_001_basic_heatsink
// - Name: "Standard Heat Sink"
// - Type: cooler, Slot: torso
// - Stats: 0 energy draw, 3 weight
// - Modifiers: +8 heat dissipation, -15% heat generation
// - Rarity: common, Cost: 1200  
// - Effects: ["passive_cooling"]
// - Description: "Basic heat management system for standard operations"
```

## Phase 1C: Test the System

### Step-by-Step Testing Process

1. **Create the DataLoader.js plugin** (copy the code above)
2. **Add the plugin in RPG Maker MZ** (Plugin Manager → double-click empty row → select DataLoader → turn ON)
3. **Create the 5 JSON files above** using Copilot to generate the content
4. **Test in RPG Maker MZ**:
   - Press F5 to start game
   - Press F8 to open console
   - Look for "=== Testing Data Loader ===" messages
   - Verify all 5 items load successfully

### Expected Console Output
```
=== Testing Data Loader ===
Loaded: frame_light_001_scout {id: "frame_light_001_scout", name: "Lynx Scout Frame", ...}
Loaded: frame_medium_001_assault {id: "frame_medium_001_assault", name: "Warrior Assault Frame", ...}
Loaded: weapon_beam_001_laser_rifle {id: "weapon_beam_001_laser_rifle", name: "LR-7 Laser Rifle", ...}
Loaded: weapon_physical_001_autocannon {id: "weapon_physical_001_autocannon", name: "AC-20 Autocannon", ...}
Loaded: cooler_001_basic_heatsink {id: "cooler_001_basic_heatsink", name: "Standard Heat Sink", ...}
=== Test Complete ===
Loaded items: ["frame_light_001_scout", "frame_medium_001_assault", "weapon_beam_001_laser_rifle", "weapon_physical_001_autocannon", "cooler_001_basic_heatsink"]
```

## Phase 1D: Add Query Functions

**Once basic loading works, add these query methods to DataLoader.js:**

```javascript
// Add these methods inside the SimpleDataLoader class

async getFramesByWeightClass(weightClass) {
    // For now, manually specify which items to load
    const frameIds = {
        'light': ['frame_light_001_scout'],
        'medium': ['frame_medium_001_assault'],
        'heavy': [] // Add when we create heavy frames
    };
    
    const ids = frameIds[weightClass] || [];
    const frames = [];
    
    for (const id of ids) {
        const frame = await this.loadItem(id);
        if (frame) frames.push(frame);
    }
    
    return frames;
}

async getWeaponsByType(weaponType) {
    const weaponIds = {
        'beam': ['weapon_beam_001_laser_rifle'],
        'physical': ['weapon_physical_001_autocannon'],
        'projectile': [] // Add when we create projectile weapons
    };
    
    const ids = weaponIds[weaponType] || [];
    const weapons = [];
    
    for (const id of ids) {
        const weapon = await this.loadItem(id);
        if (weapon) weapons.push(weapon);
    }
    
    return weapons;
}

// Test function for queries
async testQueries() {
    console.log('=== Testing Queries ===');
    
    const lightFrames = await this.getFramesByWeightClass('light');
    console.log('Light frames:', lightFrames);
    
    const beamWeapons = await this.getWeaponsByType('beam');
    console.log('Beam weapons:', beamWeapons);
    
    console.log('=== Query Test Complete ===');
}
```

## SUCCESS CRITERIA FOR STEP 1

✅ **DataLoader plugin loads without errors**  
✅ **5 test items load successfully from JSON files**  
✅ **Console shows all loaded items**  
✅ **Query functions return expected results**  
✅ **Foundation ready for building actual game interfaces**

## NEXT STEPS AFTER STEP 1 WORKS

- **Step 2**: Create simple menu that displays loaded frames
- **Step 3**: Add mecha customization interface  
- **Step 4**: Implement constraint validation (weight/energy limits)
- **Step 5**: Generate equipment cards from parts
- **Step 6**: Basic combat card interface

**IMPORTANT**: Don't proceed to Step 2 until Step 1 is completely working and tested. Each step builds on the previous one.