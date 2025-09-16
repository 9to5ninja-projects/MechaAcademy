# Mecha Academy: Menu System Architecture

## Core Menu Flow Structure

```
Title Screen
    ↓
Main Menu [New Game | Load Game | Options | Exit]
    ↓
Character Creation
    ↓
Academy Hub (Main Town Interface)
    ├── Hangar (Mecha Customization)
    ├── Academy Courses (Progression)
    ├── Mission Control (Contract Board)
    ├── Pilot Quarters (Personal Settings)
    ├── Data Center (Copilot Management)
    ├── Shop District (Equipment Acquisition)
    └── Arena (Combat Testing)
        ↓
Mission Preparation
    ├── Mecha Loadout Configuration
    ├── Copilot Selection
    ├── Mission Briefing
    └── Deploy to Combat
        ↓
Combat Interface (Card-Based)
    ├── Hand Management
    ├── Resource Tracking
    ├── Action Selection
    └── Turn Processing
        ↓
Mission Results
    ├── Performance Analysis
    ├── Rewards Distribution
    ├── Progression Updates
    └── Return to Academy Hub
```

## Data Structure for Individual Item Referencing

### File Organization Strategy
```
data/
├── items/
│   ├── frames/
│   │   ├── frame_001_light_scout.json
│   │   ├── frame_002_light_interceptor.json
│   │   ├── frame_003_medium_assault.json
│   │   └── ... (individual frame files)
│   ├── parts/
│   │   ├── weapons/
│   │   │   ├── weapon_001_plasma_rifle.json
│   │   │   ├── weapon_002_laser_cannon.json
│   │   │   └── ... (individual weapon files)
│   │   ├── armor/
│   │   │   ├── armor_001_light_head.json
│   │   │   ├── armor_002_medium_torso.json
│   │   │   └── ... (individual armor files)
│   │   └── generators/
│   │       ├── gen_001_standard_core.json
│   │       ├── gen_002_high_output.json
│   │       └── ... (individual generator files)
│   ├── cards/
│   │   ├── pilot_skills/
│   │   │   ├── skill_001_precision_shot.json
│   │   │   ├── skill_002_evasive_maneuvers.json
│   │   │   └── ... (individual skill files)
│   │   ├── equipment_actions/
│   │   │   ├── action_001_plasma_shot.json
│   │   │   ├── action_002_missile_volley.json
│   │   │   └── ... (individual action files)
│   │   └── special/
│   │       ├── combo_001_overcharged_blast.json
│   │       └── ... (special combination files)
│   └── copilots/
│       ├── copilot_001_aria_tactical.json
│       ├── copilot_002_zephyr_support.json
│       └── ... (individual copilot files)
├── indexes/
│   ├── item_registry.json           # Master index of all items
│   ├── card_collections.json        # Deck building collections
│   ├── unlock_chains.json          # Progression dependencies
│   └── balance_tables.json         # Power level indexing
└── ui/
    ├── menu_layouts.json           # Menu structure definitions
    ├── window_configs.json         # UI window specifications
    └── flow_definitions.json       # Menu transition logic
```

### Unique ID System
```javascript
// Standardized ID format for easy referencing
const idFormats = {
    frames: "frame_###_[weight]_[role]",        // frame_001_light_scout
    weapons: "weapon_###_[type]_[variant]",     // weapon_001_plasma_rifle
    armor: "armor_###_[slot]_[type]",          // armor_001_head_reactive
    generators: "gen_###_[type]_[class]",       // gen_001_standard_mkii
    pilotSkills: "skill_###_[category]",        // skill_001_precision_shot
    equipActions: "action_###_[source]",        // action_001_plasma_shot
    copilots: "copilot_###_[designation]",      // copilot_001_aria_tactical
    missions: "mission_###_[type]_[tier]"       // mission_001_academy_basic
};

// Cross-reference system
const referenceSystem = {
    "weapon_001_plasma_rifle": {
        generatesCards: ["action_001_plasma_shot", "action_002_plasma_overcharge"],
        requiresSlot: "arm",
        compatibleFrames: ["frame_002_medium_assault", "frame_003_heavy_tank"],
        unlockRequirement: "course_003_energy_weapons"
    }
};
```

## Academy Hub Interface System

### Main Hub Layout
```javascript
class AcademyHubInterface extends Scene_MenuBase {
    constructor() {
        super();
        this.hubAreas = [
            { id: "hangar", name: "Hangar Bay", icon: "mecha", position: { x: 100, y: 150 } },
            { id: "courses", name: "Academy Courses", icon: "book", position: { x: 300, y: 100 } },
            { id: "missions", name: "Mission Control", icon: "target", position: { x: 500, y: 150 } },
            { id: "quarters", name: "Pilot Quarters", icon: "bed", position: { x: 100, y: 300 } },
            { id: "datacenter", name: "Data Center", icon: "ai", position: { x: 300, y: 350 } },
            { id: "shop", name: "Shop District", icon: "credits", position: { x: 500, y: 300 } },
            { id: "arena", name: "Training Arena", icon: "sword", position: { x: 300, y: 250 } }
        ];
    }
    
    createHubInterface() {
        // Create interactive hub with area selection
        // Copilot: implement visual hub interface with clickable areas
    }
    
    onAreaSelected(areaId) {
        switch(areaId) {
            case "hangar": this.openMechaCustomization(); break;
            case "courses": this.openAcademyCourses(); break;
            case "missions": this.openMissionBoard(); break;
            case "quarters": this.openPilotManagement(); break;
            case "datacenter": this.openCopilotManagement(); break;
            case "shop": this.openShopInterface(); break;
            case "arena": this.openTrainingArena(); break;
        }
    }
}
```

### Mecha Customization Interface
```javascript
class MechaCustomizationScene extends Scene_MenuBase {
    constructor() {
        super();
        this.selectedFrame = null;
        this.currentLoadout = {};
        this.availableParts = {};
    }
    
    create() {
        this.createFrameSelection();
        this.createPartsInventory();
        this.createLoadoutDisplay();
        this.createConstraintMonitor();
        this.createCardPreview();
    }
    
    createFrameSelection() {
        // Display available frames with stats
        // Copilot: create frame selection interface with stat comparison
        this.frameWindow = new Window_FrameSelection(this.frameListRect());
        this.frameWindow.setHandler('ok', this.onFrameSelected.bind(this));
        this.addWindow(this.frameWindow);
    }
    
    createPartsInventory() {
        // Show available parts by category
        // Copilot: implement categorized parts browser with filtering
        this.partsWindow = new Window_PartsInventory(this.partsRect());
        this.partsWindow.setHandler('ok', this.onPartSelected.bind(this));
        this.addWindow(this.partsWindow);
    }
    
    createConstraintMonitor() {
        // Real-time weight/energy validation
        this.constraintWindow = new Window_ConstraintMonitor(this.constraintRect());
        this.addWindow(this.constraintWindow);
    }
    
    createCardPreview() {
        // Show what cards this loadout generates
        this.cardPreviewWindow = new Window_CardPreview(this.cardPreviewRect());
        this.addWindow(this.cardPreviewWindow);
    }
    
    onLoadoutChanged() {
        this.validateConstraints();
        this.updateCardPreview();
        this.refreshWindows();
    }
    
    validateConstraints() {
        const validation = MechaDataManager.validateLoadout(
            this.selectedFrame, 
            Object.values(this.currentLoadout)
        );
        this.constraintWindow.updateStatus(validation);
    }
    
    updateCardPreview() {
        const generatedCards = MechaDataManager.generateEquipmentCards(
            this.currentLoadout
        );
        this.cardPreviewWindow.setCards(generatedCards);
    }
}
```

### Mission Preparation Interface
```javascript
class MissionPrepScene extends Scene_MenuBase {
    constructor(missionId) {
        super();
        this.missionId = missionId;
        this.selectedLoadout = null;
        this.selectedCopilot = null;
    }
    
    create() {
        this.createMissionBriefing();
        this.createLoadoutSelection();
        this.createCopilotSelection();
        this.createResourcePreview();
        this.createDeployButton();
    }
    
    createMissionBriefing() {
        // Display mission details, objectives, expected threats
        // Copilot: create mission briefing interface with threat analysis
        const mission = MechaDataManager.getMission(this.missionId);
        this.briefingWindow = new Window_MissionBriefing(mission, this.briefingRect());
        this.addWindow(this.briefingWindow);
    }
    
    createLoadoutSelection() {
        // Choose from saved mecha configurations
        const savedLoadouts = SaveDataManager.getSavedLoadouts();
        this.loadoutWindow = new Window_LoadoutSelection(savedLoadouts, this.loadoutRect());
        this.loadoutWindow.setHandler('ok', this.onLoadoutSelected.bind(this));
        this.addWindow(this.loadoutWindow);
    }
    
    createCopilotSelection() {
        // Select available copilot for mission
        const availableCopilots = CopilotManager.getAvailableCopilots();
        this.copilotWindow = new Window_CopilotSelection(availableCopilots, this.copilotRect());
        this.copilotWindow.setHandler('ok', this.onCopilotSelected.bind(this));
        this.addWindow(this.copilotWindow);
    }
    
    createResourcePreview() {
        // Show starting resources for combat
        this.resourceWindow = new Window_ResourcePreview(this.resourceRect());
        this.addWindow(this.resourceWindow);
    }
    
    onConfigurationComplete() {
        if (this.selectedLoadout && this.selectedCopilot) {
            this.deployButton.activate();
        }
    }
    
    onDeployPressed() {
        // Transition to combat with selected configuration
        const combatConfig = {
            mission: this.missionId,
            loadout: this.selectedLoadout,
            copilot: this.selectedCopilot,
            startingResources: this.calculateStartingResources()
        };
        
        SceneManager.push(Scene_CardCombat, combatConfig);
    }
}
```

## Combat Interface Integration

### Card-Based Combat Scene
```javascript
class Scene_CardCombat extends Scene_MenuBase {
    constructor(combatConfig) {
        super();
        this.config = combatConfig;
        this.gameState = new CombatGameState(combatConfig);
    }
    
    create() {
        this.createCombatField();
        this.createHandInterface();
        this.createResourceDisplay();
        this.createActionQueue();
        this.createHeatMonitor();
    }
    
    createHandInterface() {
        // Display playable cards with costs and effects
        // Copilot: implement card hand interface with drag-and-drop or selection
        this.handWindow = new Window_CardHand(this.gameState.playerHand, this.handRect());
        this.handWindow.setHandler('ok', this.onCardSelected.bind(this));
        this.addWindow(this.handWindow);
    }
    
    createResourceDisplay() {
        // Show Mental/Digital/Energy resources and action points
        this.resourceWindow = new Window_CombatResources(this.resourceRect());
        this.addWindow(this.resourceWindow);
    }
    
    createHeatMonitor() {
        // Real-time heat tracking with threshold warnings
        this.heatWindow = new Window_HeatMonitor(this.heatRect());
        this.addWindow(this.heatWindow);
    }
    
    onCardSelected(cardIndex) {
        const card = this.gameState.playerHand[cardIndex];
        if (this.canPlayCard(card)) {
            this.playCard(card);
            this.processGameState();
        }
    }
    
    canPlayCard(card) {
        const costs = card.costs;
        const resources = this.gameState.playerResources;
        
        return resources.mental >= (costs.mental || 0) &&
               resources.digital >= (costs.digital || 0) &&
               resources.energy >= (costs.energy || 0) &&
               resources.actions >= (costs.actions || 1);
    }
    
    processGameState() {
        this.updateHeat();
        this.updateResources();
        this.refreshAllWindows();
        
        if (this.gameState.turnComplete) {
            this.processEnemyTurn();
        }
    }
}
```

## Data Loading and Caching System

### Individual Item Loading
```javascript
class ItemDataManager {
    constructor() {
        this.cache = new Map();
        this.indexes = {};
        this.loadPromises = new Map();
    }
    
    async loadItemIndex() {
        // Load master registry of all items
        const registry = await this.fetchJSON('data/indexes/item_registry.json');
        this.indexes.items = registry;
        
        // Pre-cache frequently accessed items
        await this.preloadEssentialItems();
    }
    
    async getItem(itemId) {
        if (this.cache.has(itemId)) {
            return this.cache.get(itemId);
        }
        
        if (this.loadPromises.has(itemId)) {
            return this.loadPromises.get(itemId);
        }
        
        const loadPromise = this.loadIndividualItem(itemId);
        this.loadPromises.set(itemId, loadPromise);
        
        const item = await loadPromise;
        this.cache.set(itemId, item);
        this.loadPromises.delete(itemId);
        
        return item;
    }
    
    async loadIndividualItem(itemId) {
        const itemInfo = this.indexes.items[itemId];
        if (!itemInfo) {
            throw new Error(`Item not found in registry: ${itemId}`);
        }
        
        const filePath = `data/items/${itemInfo.category}/${itemId}.json`;
        return await this.fetchJSON(filePath);
    }
    
    async getItemsByCategory(category) {
        const categoryItems = Object.entries(this.indexes.items)
            .filter(([id, info]) => info.category === category)
            .map(([id]) => id);
        
        return Promise.all(categoryItems.map(id => this.getItem(id)));
    }
    
    // Batch loading for menu interfaces
    async loadFrameList() {
        return this.getItemsByCategory('frames');
    }
    
    async loadWeaponList() {
        return this.getItemsByCategory('weapons');
    }
    
    async loadPilotSkills() {
        return this.getItemsByCategory('pilot_skills');
    }
}
```

## Menu Integration with Data System

### Dynamic Menu Population
```javascript
class Window_FrameSelection extends Window_Selectable {
    constructor(rect) {
        super(rect);
        this.frames = [];
        this.loadFrameData();
    }
    
    async loadFrameData() {
        // Load individual frame files as needed
        this.frames = await ItemDataManager.loadFrameList();
        this.refresh();
    }
    
    makeItemList() {
        // Frames are loaded individually, sorted by unlock status
        return this.frames
            .filter(frame => this.isFrameUnlocked(frame.id))
            .sort((a, b) => this.compareFrames(a, b));
    }
    
    drawItem(index) {
        const frame = this.frames[index];
        const rect = this.itemLineRect(index);
        
        // Draw frame info with stats preview
        this.drawFrameName(frame, rect);
        this.drawFrameStats(frame, rect);
        this.drawUnlockStatus(frame, rect);
    }
    
    isCurrentItemEnabled() {
        const frame = this.currentData();
        return frame && this.isFrameUnlocked(frame.id);
    }
    
    currentData() {
        return this.frames[this.index()];
    }
}
```

This architecture provides:

1. **Scalable individual item loading** with unique IDs for easy referencing
2. **Comprehensive menu flow** from character creation to combat
3. **Real-time constraint validation** during mecha customization
4. **Seamless integration** between menus and combat systems
5. **Efficient data caching** that only loads items when needed
6. **Flexible indexing system** for quick item lookup and categorization

The individual file approach makes it easy for Copilot to generate specific items and for the game to reference exact cards/parts by ID without loading massive datasets.