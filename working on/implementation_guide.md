# Tonight's Implementation Checklist

## 1. Update Existing Card Files

### Frame Cards (CRITICAL)
Update `CRD_FRM_LT_SCOUT001.json` with new standardized format:
- Add `hp: 120` 
- Add `energyRegen: 25`
- Add `heatCapacity: 60`
- Add `weight: 25`

### Weapon Cards  
Update `CRD_WPN_BM_RIFLE001.json`:
- Add `provides_skills` effect with weapon-skill IDs
- Add `weight: 12`
- Change costs structure to remove direct energy cost

## 2. Create New Card Files

### Weapon Skills (Required for combat)
Create these files in `data/cards/skills/weapon/`:
- `CRD_SKL_WPN_BEAM_SHOT001.json`
- `CRD_SKL_WPN_AIMED_SHOT001.json`

### System Cards (Update existing)
Add `weight` property to:
- `CRD_SYS_GN_STANDARD001.json` (weight: 10)
- `CRD_SYS_CL_PASSIVE001.json` (weight: 3)  
- `CRD_SYS_OS_STANDARD001.json` (weight: 2)

## 3. Plugin Modifications

### MechaComposite.js
Add the CombatDeck class and methods after line 500:
- `initializeDeck()` method
- `getCurrentResources()` method  
- `regenerateResources()` method
- `getMaxActions()` method

### New Plugin File
Create `TrainingBattleSystem.js` as new plugin file.
Load order: After MechaComposite.js

## 4. Testing Sequence

1. **Load game and open Academy Menu**
2. **Check mecha stats include new values** (HP, heat capacity)
3. **Click "Train" to enter training battle**
4. **Verify hand displays weapon skills**
5. **Test resource consumption and regeneration**

## 5. Critical Integration Points

### Resource Initialization
The deck system expects these properties on MechaComposite:
```javascript
mecha.currentResources = {
    mental: 60,    // From pilot stats
    signal: 48,    // From copilot stats  
    machine: 220,  // From frame + generator
    heat: 0        // Current heat level
}
mecha.actionsRemaining = 3; // Heat-dependent
```

### Academy Menu Integration
Training battle replaces the placeholder "Train" command.
No additional menu changes needed.

### Data Loader Compatibility
New weapon-skill cards use existing DataLoader paths.
No changes to DataLoader.js required.

## 6. Balance Values (Tested)

### Resource Regeneration per Turn
- Mental: 30 (pilot efficiency dependent)
- Signal: 25 (copilot efficiency dependent)  
- Machine: 25 (frame + generator dependent)
- Heat: -12 (cooling rate)

### Action Limits by Heat
- 0-25% heat: 3 actions
- 26-75% heat: 2 actions
- 76-95% heat: 1 action  
- 96-100% heat: 0 actions (forced cooldown)

### Weapon Skill Costs
- Basic Attack: 25 machine, 8 heat
- Aimed Shot: 35 machine, 10 mental, 12 heat

## 7. Quick Validation Tests

### Deck Building
```javascript
// In console after loading
const mecha = window.MechaCompositeManager.getActiveMecha();
mecha.initializeDeck();
console.log(mecha.combatDeck.deck); // Should show weapon skills
```

### Resource Management  
```javascript
// In training battle
const resources = mecha.getCurrentResources();
console.log(resources); // Should show all 4 resource types
```

### Heat System
```javascript
// After using skills
mecha.currentResources.heat = 50;  
console.log(mecha.getMaxActions()); // Should return 2
```

## 8. Known Issues to Monitor

- **Deck size**: May be small with only weapon skills
- **AI behavior**: Training dummy uses simple random selection
- **Resource overflow**: No hard caps on spending beyond available
- **Experience integration**: Awards XP but doesn't trigger level-ups yet

## 9. Next Session Priorities

- Add more weapon-skill variety
- Implement equipment weight constraints  
- Create progression/leveling system
- Add more sophisticated AI opponents
- Implement actual HP damage to player mecha