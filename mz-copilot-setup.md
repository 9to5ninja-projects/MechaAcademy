# Mecha Academy: Complete Development Scaffolding Framework

## Project Structure for Maximum Copilot Integration

```
MechaAcademy/
├── js/
│   ├── plugins/
│   │   ├── CardGameCombat/           # DLC core files
│   │   ├── MechaCore/               # Core mecha system
│   │   │   ├── MechaFrame.js
│   │   │   ├── MechaParts.js
│   │   │   └── MechaConstraints.js
│   │   ├── PilotSystem/             # Pilot progression
│   │   │   ├── PilotStats.js
│   │   │   ├── PilotProgression.js
│   │   │   └── AcademySystem.js
│   │   ├── CopilotSystem/           # AI copilot management
│   │   │   ├── CopilotCore.js
│   │   │   ├── CopilotPersonalities.js
│   │   │   └── CopilotRelationships.js
│   │   ├── CombatSystem/            # Enhanced card combat
│   │   │   ├── ResourceManagement.js
│   │   │   ├── ActionEconomy.js
│   │   │   ├── HeatSystem.js
│   │   │   └── DualCardSystem.js
│   │   ├── MissionSystem/           # Mission structure
│   │   │   ├── AcademyHub.js
│   │   │   ├── StoryMissions.js
│   │   │   └── ProceduralMissions.js
│   │   ├── EconomySystem/           # Acquisition systems
│   │   │   ├── MeritSystem.js
│   │   │   ├── ShopSystem.js
│   │   │   └── MarketDynamics.js
│   │   └── DevTools/
│   │       ├── HotReload.js
│   │       ├── BalanceTesting.js
│   │       └── DataValidation.js
├── data/
│   ├── mecha/
│   │   ├── frames.json               # Mecha frame definitions
│   │   ├── parts.json                # Parts database
│   │   └── constraints.json          # Weight/energy limits
│   ├── pilots/
│   │   ├── aptitudes.json            # Core pilot abilities
│   │   ├── academy-tracks.json       # Specialization paths
│   │   └── progression.json          # Level/unlock data
│   ├── copilots/
│   │   ├── personalities.json        # AI copilot types
│   │   ├── specializations.json      # Copilot focus areas
│   │   └── relationships.json        # Bond mechanics
│   ├── cards/
│   │   ├── pilot-cards.json          # Pilot skill cards
│   │   ├── equipment-cards.json      # Generated from parts
│   │   └── special-cards.json        # Unique mission rewards
│   ├── missions/
│   │   ├── academy-missions.json     # Tutorial/progression
│   │   ├── story-missions.json       # Main narrative
│   │   └── procedural-templates.json # Generation patterns
│   └── economy/
│       ├── shops.json                # Shop inventories by tier
│       ├── rewards.json              # Mission reward tables
│       └── market-events.json        # Dynamic market changes
├── docs/
│   ├── api-reference/
│   │   ├── mecha-api.md              # Frame/parts system API
│   │   ├── pilot-api.md              # Pilot progression API
│   │   ├── copilot-api.md            # AI copilot system API
│   │   ├── combat-api.md             # Enhanced combat API
│   │   ├── mission-api.md            # Mission system API
│   │   └── economy-api.md            # Acquisition system API
│   ├── design-patterns/
│   │   ├── data-models.md            # Standard data structures
│   │   ├── naming-conventions.md     # Consistent naming rules
│   │   ├── plugin-architecture.md    # Modular development patterns
│   │   └── copilot-prompts.md        # Effective AI prompting patterns
│   ├── balance-framework/
│   │   ├── constraint-math.md        # Weight/energy calculations
│   │   ├── resource-economy.md       # Mental/Digital/Energy balance
│   │   ├── progression-curves.md     # Level/unlock pacing
│   │   └── procedural-guidelines.md  # Content generation rules
│   └── development/
│       ├── workflow.md               # Development process
│       ├── testing-protocols.md      # Quality assurance
│       └── expansion-planning.md     # Future feature roadmap
├── .vscode/
│   ├── settings.json                 # Copilot optimization
│   ├── tasks.json                    # Build automation
│   └── launch.json                   # Debugging configuration
└── package.json                     # Development dependencies
```

## Core API Documentation for Copilot Context

### Mecha System API (docs/api-reference/mecha-api.md)

```markdown
# Mecha System API Reference for Copilot

## Frame Classes and Weight Categories
```javascript
// Frame data structure
const frameData = {
    id: "frame_light_scout",
    name: "Lynx Scout Frame",
    weightClass: "light", // light, medium, heavy
    role: "scout", // scout, assault, support, tank
    baseStats: {
        armor: 100,
        speed: 150,
        energyCapacity: 200,
        heatDissipation: 25,
        weightLimit: 50,
        hardpoints: {
            head: 1,
            torso: 2,
            arms: 2,
            legs: 2,
            generator: 1
        }
    },
    academyUnlock: "basic_piloting_101"
};
```

## Parts System
```javascript
// Parts modify frame stats within constraints
const partData = {
    id: "part_plasma_rifle",
    name: "PL-7 Plasma Rifle",
    type: "weapon",
    slot: "arm",
    weight: 12, // Must fit within frame weight limit
    energyDraw: 35, // Must not exceed generator output
    heatGeneration: 15, // Affects action economy
    statModifiers: {
        attack: 45,
        accuracy: 85,
        range: "medium"
    },
    effects: ["plasma_burn_chance"],
    rarity: "uncommon",
    cost: 8500
};
```

## Constraint Validation
```javascript
// Copilot: validate mecha loadout within limits
function validateLoadout(frame, parts, generator) {
    const totalWeight = parts.reduce((sum, part) => sum + part.weight, 0);
    const totalEnergyDraw = parts.reduce((sum, part) => sum + part.energyDraw, 0);
    
    return {
        weightValid: totalWeight <= frame.baseStats.weightLimit,
        energyValid: totalEnergyDraw <= generator.energyOutput,
        overweight: Math.max(0, totalWeight - frame.baseStats.weightLimit),
        energyDeficit: Math.max(0, totalEnergyDraw - generator.energyOutput)
    };
}
```
```

### Pilot System API (docs/api-reference/pilot-api.md)

```markdown
# Pilot System API Reference for Copilot

## Core Aptitudes (affect mecha operational efficiency)
```javascript
const pilotAptitudes = {
    targeting: 75,      // Accuracy, critical hit chance
    evasion: 60,        // Dodge chance, speed bonus
    heatManagement: 85, // Heat dissipation efficiency
    energyEfficiency: 70, // Reduces energy consumption
    systemsControl: 55,  // Complex maneuver capability
    tacticalAwareness: 80 // Action point generation bonus
};
```

## Academy Specialization Tracks
```javascript
const academyTracks = {
    "combat_specialist": {
        bonuses: { targeting: 1.2, evasion: 1.1 },
        unlockedCards: ["precision_shot", "combat_reflexes"],
        courseRequirements: ["weapons_theory", "tactical_combat"]
    },
    "systems_engineer": {
        bonuses: { heatManagement: 1.3, energyEfficiency: 1.2 },
        unlockedCards: ["overclock_system", "emergency_cooling"],
        courseRequirements: ["mecha_engineering", "power_systems"]
    }
};
```

## Efficiency Calculations
```javascript
// Copilot: pilot aptitudes modify mecha performance
function calculateEfficiency(pilotAptitude, baseValue) {
    const efficiencyMultiplier = 0.5 + (pilotAptitude / 100) * 0.5;
    return Math.floor(baseValue * efficiencyMultiplier);
}

// Example: Heat dissipation with pilot skill
const effectiveHeatDissipation = calculateEfficiency(
    pilot.aptitudes.heatManagement, 
    mecha.baseStats.heatDissipation
);
```
```

### Copilot System API (docs/api-reference/copilot-api.md)

```markdown
# AI Copilot System API Reference for Copilot

## Copilot Personalities and Specializations
```javascript
const copilotData = {
    id: "aria_tactical",
    name: "ARIA-7",
    personality: "analytical", // analytical, aggressive, supportive, adaptive
    specializations: ["targeting_assistance", "threat_analysis"],
    bondLevel: 3, // 1-10, affects effectiveness
    stats: {
        mentalAugmentation: 15, // Boosts pilot Mental resource generation
        digitalProcessing: 25,  // Provides Digital resource generation
        systemOptimization: 10  // Reduces mecha energy consumption
    },
    abilities: [
        {
            name: "Tactical Overlay",
            effect: "highlight_enemy_weakpoints",
            digitalCost: 2,
            cooldown: 3
        }
    ],
    dialogue: {
        combat: ["Target acquired", "Analyzing threat patterns"],
        success: ["Excellent piloting", "Mission parameters exceeded"],
        failure: ["Recalibrating approach", "Learning from data"]
    }
};
```

## Bond Progression System
```javascript
// Copilot: relationship affects performance
function calculateCopilotEffectiveness(copilot, bondLevel) {
    const bondMultiplier = 0.7 + (bondLevel * 0.03); // 70% to 100% effectiveness
    return {
        mentalAugmentation: Math.floor(copilot.stats.mentalAugmentation * bondMultiplier),
        digitalProcessing: Math.floor(copilot.stats.digitalProcessing * bondMultiplier),
        systemOptimization: Math.floor(copilot.stats.systemOptimization * bondMultiplier)
    };
}
```
```

### Combat System API (docs/api-reference/combat-api.md)

```markdown
# Enhanced Combat System API Reference for Copilot

## Three-Resource System
```javascript
const resourceTypes = {
    mental: {
        generatedBy: "pilot", // + copilot augmentation
        usedFor: ["tactics", "complex_maneuvers", "pilot_skills"],
        maxCapacity: "pilot.aptitudes.tacticalAwareness + copilot.mentalAugmentation",
        regenRate: "pilot.aptitudes.tacticalAwareness / 10"
    },
    digital: {
        generatedBy: "copilot",
        usedFor: ["targeting", "analysis", "system_coordination"],
        maxCapacity: "copilot.stats.digitalProcessing",
        regenRate: "copilot.stats.digitalProcessing / 5"
    },
    energy: {
        generatedBy: "mecha", // generator parts
        usedFor: ["weapons", "movement", "defensive_systems"],
        maxCapacity: "generator.energyOutput",
        regenRate: "generator.regenRate"
    }
};
```

## Action Economy with Heat Management
```javascript
const actionSystem = {
    baseActionsPerTurn: 3,
    heatThresholds: {
        normal: { actionRegen: 3, movementPenalty: 0 },
        warm: { actionRegen: 2, movementPenalty: 0.1 },
        hot: { actionRegen: 1, movementPenalty: 0.25 },
        overheated: { actionRegen: 0, movementPenalty: 0.5, forcedCooldown: true }
    }
};

// Copilot: calculate heat effects on actions
function getActionCapacity(currentHeat, maxHeat) {
    const heatRatio = currentHeat / maxHeat;
    if (heatRatio < 0.6) return actionSystem.heatThresholds.normal;
    if (heatRatio < 0.8) return actionSystem.heatThresholds.warm;
    if (heatRatio < 1.0) return actionSystem.heatThresholds.hot;
    return actionSystem.heatThresholds.overheated;
}
```

## Dual Card System
```javascript
// Equipment cards generated from mecha parts
const equipmentCard = {
    id: "plasma_rifle_shot",
    name: "Plasma Rifle Attack",
    source: "part_plasma_rifle",
    costs: { energy: 35, actions: 1 },
    effects: [{
        type: "damage",
        target: "enemy",
        formula: "weapon.attack * pilot.targeting_efficiency",
        heatGeneration: 15
    }]
};

// Pilot skill cards from progression
const pilotCard = {
    id: "precision_strike",
    name: "Precision Strike",
    source: "pilot_skill",
    costs: { mental: 3, actions: 2 },
    effects: [{
        type: "enhanced_attack",
        criticalChance: 0.8,
        damageBonus: 1.5
    }]
};
```
```

## Development Patterns for Copilot

### Comment-Driven Development Templates

```javascript
// Mecha Development Pattern
// Create a medium assault frame that:
// - Has balanced armor and speed (120 armor, 100 speed)
// - Specializes in energy weapons (energy efficiency bonus)
// - Has 4 weapon hardpoints but limited support slots
// - Unlocks after "Advanced Combat Theory" course

// Parts Generation Pattern  
// Generate 5 cooling system parts that:
// - Reduce heat generation by 10-30%
// - Have weight costs of 3-8 units
// - Include passive heat dissipation bonuses
// - Scale from common to legendary rarity

// Mission Creation Pattern
// Create academy training mission that:
// - Teaches heat management fundamentals
// - Uses 3 waves of increasingly dangerous enemies
// - Rewards cooling system part on completion
// - Has dialogue from instructor and copilot
```

### Procedural Generation Helpers

```javascript
// Copilot: generate balanced mecha parts
function generatePart(type, rarity, targetLevel) {
    // Weight/energy costs scale with power
    // Stat bonuses follow rarity curves
    // Effects based on part type and specialization
    // Cost determined by rarity and academy progression
}

// Copilot: create mission variations
function generateAcademyMission(courseType, difficultyLevel) {
    // Select appropriate enemy types for lesson
    // Scale enemy stats to pilot progression
    // Choose rewards that support course objectives
    // Generate instructor dialogue for educational context
}

// Copilot: balance copilot personalities
function generateCopilotPersonality(specialization1, specialization2) {
    // Assign stats based on specialization focus
    // Create dialogue patterns matching personality
    // Design abilities that support specializations
    // Balance power level with bond requirements
}
```

## Data Validation and Balance Framework

### Constraint Validation System

```javascript
// Automatic validation for all generated content
const validationRules = {
    mechaFrames: {
        weightClassRatios: { light: "50-80", medium: "80-120", heavy: "120-200" },
        energyCapacityRange: { min: 150, max: 400 },
        hardpointLimits: { total: 8, perSlot: 3 }
    },
    parts: {
        weightToStatRatio: "power level should not exceed weight * 2",
        energyEfficiency: "energy draw should correlate with damage output",
        rarityScaling: "legendary parts max 3x common part effectiveness"
    },
    progression: {
        academyUnlockOrder: "validate course prerequisites are met",
        rewardPacing: "ensure steady power progression without spikes"
    }
};

// Copilot: validate generated content against rules
function validateGeneratedContent(content, contentType) {
    const rules = validationRules[contentType];
    // Return validation results with suggestions for fixes
}
```

## VS Code Integration Setup

### Enhanced Settings (.vscode/settings.json)

```json
{
    "github.copilot.enable": {
        "*": true,
        "javascript": true,
        "json": true,
        "markdown": true
    },
    "github.copilot.inlineSuggest.enable": true,
    "github.copilot.chat.enable": true,
    "files.associations": {
        "*.json": "jsonc",
        "frames.json": "json",
        "parts.json": "json",
        "missions.json": "json"
    },
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    },
    "files.watcherExclude": {
        "**/audio/**": true,
        "**/img/**": true,
        "**/movies/**": true
    },
    "workbench.colorCustomizations": {
        "editorBracketHighlight.foreground1": "#FFD700",
        "editorBracketHighlight.foreground2": "#DA70D6",
        "editorBracketHighlight.foreground3": "#87CEEB"
    }
}
```

### Development Tasks (.vscode/tasks.json)

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Validate Data Files",
            "type": "shell",
            "command": "node",
            "args": ["js/plugins/DevTools/DataValidation.js"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        },
        {
            "label": "Generate Sample Content",
            "type": "shell",
            "command": "node", 
            "args": ["js/plugins/DevTools/ContentGenerator.js", "${input:contentType}"],
            "group": "build"
        },
        {
            "label": "Balance Test",
            "type": "shell",
            "command": "node",
            "args": ["js/plugins/DevTools/BalanceTesting.js", "${input:testType}"],
            "group": "test"
        }
    ],
    "inputs": [
        {
            "id": "contentType",
            "description": "Content type to generate",
            "default": "parts",
            "type": "pickString",
            "options": ["frames", "parts", "missions", "copilots"]
        },
        {
            "id": "testType", 
            "description": "Balance test to run",
            "default": "loadout",
            "type": "pickString",
            "options": ["loadout", "progression", "economy", "combat"]
        }
    ]
}
```

## Development Workflow

### Phase 1: Core System Implementation
1. **Mecha Framework**: Frames, parts, constraints
2. **Pilot System**: Aptitudes, efficiency calculations
3. **Basic Copilot**: Stats, augmentation mechanics
4. **Data Validation**: Constraint checking, balance verification

### Phase 2: Combat Integration  
1. **Resource System**: Three-resource management
2. **Action Economy**: Turn-based with heat management
3. **Card Generation**: Equipment cards from parts
4. **Combat Testing**: Balance verification tools

### Phase 3: Academy Hub
1. **Academy Structure**: Courses, progression, hub interface
2. **Tutorial Missions**: Heat management, resource usage training
3. **Copilot Bonding**: Relationship mechanics, dialogue
4. **Economy Foundation**: Merit system, basic shops

### Phase 4: Story Integration
1. **Mission System**: Story missions, procedural templates
2. **Narrative Framework**: Academy → story arc transition
3. **Advanced Economy**: Dynamic markets, faction relationships
4. **Content Scaling**: Procedural generation algorithms

### Copilot Optimization Strategy

1. **Context Loading**: All API documentation loaded before coding sessions
2. **Naming Consistency**: Strict naming conventions for predictable suggestions
3. **Pattern Recognition**: Consistent code patterns for better AI assistance
4. **Modular Development**: Independent systems that can be developed separately
5. **Validation Integration**: Automatic checking of generated content

This scaffolding framework provides Copilot with comprehensive context about your mecha academy game systems, enabling it to generate consistent, balanced content across all areas of development while maintaining the architectural integrity we've established.