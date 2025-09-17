// Add this to MechaComposite.js after line 500

// Deck Management System
class CombatDeck {
    constructor(mechaComposite) {
        this.mecha = mechaComposite;
        this.deck = [];
        this.hand = [];
        this.discardPile = [];
        this.maxHandSize = 5;
        this.buildDeck();
    }

    async buildDeck() {
        this.deck = [];
        
        // Add weapon skills
        for (const weapon of this.mecha.equipment.weapons) {
            if (weapon.effects) {
                for (const effect of weapon.effects) {
                    if (effect.type === 'provides_skills') {
                        for (const skillId of effect.skills) {
                            const skill = await window.DataLoader.loadItem(skillId);
                            if (skill) {
                                this.deck.push(skill);
                            }
                        }
                    }
                }
            }
        }
        
        // Add pilot skills
        if (this.mecha.pilotCard && this.mecha.pilotCard.learned_skills) {
            for (const skillId of this.mecha.pilotCard.learned_skills) {
                const skill = await window.DataLoader.loadItem(skillId);
                if (skill) {
                    this.deck.push(skill);
                }
            }
        }
        
        // Add copilot skills  
        if (this.mecha.copilotCard && this.mecha.copilotCard.learned_skills) {
            for (const skillId of this.mecha.copilotCard.learned_skills) {
                const skill = await window.DataLoader.loadItem(skillId);
                if (skill) {
                    this.deck.push(skill);
                }
            }
        }
        
        // Add basic actions if deck too small
        while (this.deck.length < 10) {
            this.deck.push(this.createBasicAction());
        }
        
        this.shuffleDeck();
        console.log(`Combat deck built: ${this.deck.length} cards`);
    }

    createBasicAction() {
        return {
            id: 'BASIC_MOVE',
            name: 'Move',
            type: 'basic_action',
            costs: { machine: 10, actions: 1 },
            effects: [{ type: 'movement', value: 'pilot.piloting * 2' }]
        };
    }

    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawHand() {
        this.hand = [];
        for (let i = 0; i < this.maxHandSize && this.deck.length > 0; i++) {
            this.hand.push(this.deck.pop());
        }
        
        // Reshuffle if deck empty
        if (this.deck.length === 0 && this.discardPile.length > 0) {
            this.deck = [...this.discardPile];
            this.discardPile = [];
            this.shuffleDeck();
        }
    }

    playCard(cardIndex) {
        if (cardIndex >= 0 && cardIndex < this.hand.length) {
            const card = this.hand.splice(cardIndex, 1)[0];
            this.discardPile.push(card);
            return card;
        }
        return null;
    }

    canPlayCard(card) {
        const costs = card.costs || {};
        const currentResources = this.mecha.currentResources || this.getDefaultResources();
        
        // Check all resource requirements
        for (const [resource, cost] of Object.entries(costs)) {
            if (resource === 'actions') {
                if (cost > this.mecha.actionsRemaining) return false;
            } else if (currentResources[resource] !== undefined) {
                if (currentResources[resource] < cost) return false;
            }
        }
        
        return true;
    }

    getDefaultResources() {
        return {
            mental: 60,
            signal: 48, 
            machine: 220,
            heat: 0
        };
    }
}

// Add to MechaComposite class
MechaComposite.prototype.initializeDeck = function() {
    this.combatDeck = new CombatDeck(this);
};

MechaComposite.prototype.getCurrentResources = function() {
    if (!this.currentResources) {
        const stats = this.compositeStats || this.getDefaultStats();
        this.currentResources = {
            mental: this.pilotCard ? this.pilotCard.effects.find(e => e.type === 'stat_bonus')?.stats?.piloting * 15 || 60 : 60,
            signal: this.copilotCard ? this.copilotCard.effects.find(e => e.type === 'stat_bonus')?.stats?.systemSupport * 12 || 48 : 48,
            machine: stats.energyCapacity || 220,
            heat: 0
        };
        this.actionsRemaining = this.getMaxActions();
    }
    return this.currentResources;
};

MechaComposite.prototype.getMaxActions = function() {
    const heatPercent = this.currentResources ? (this.currentResources.heat / (this.compositeStats?.heatCapacity || 60)) : 0;
    
    if (heatPercent < 0.25) return 3;      // Cold
    if (heatPercent < 0.75) return 2;      // Warm  
    if (heatPercent < 0.95) return 1;      // Hot
    return 0;                              // Critical overheat
};

MechaComposite.prototype.regenerateResources = function() {
    if (!this.currentResources) this.getCurrentResources();
    
    const stats = this.compositeStats || this.getDefaultStats();
    const overheatPenalty = this.currentResources.heat >= (stats.heatCapacity * 0.95) ? 0.5 : 1.0;
    
    // Regenerate energies
    this.currentResources.mental = Math.min(
        this.currentResources.mental + Math.floor(30 * overheatPenalty),
        this.pilotCard ? this.pilotCard.effects.find(e => e.type === 'stat_bonus')?.stats?.piloting * 15 || 60 : 60
    );
    
    this.currentResources.signal = Math.min(
        this.currentResources.signal + Math.floor(25 * overheatPenalty), 
        this.copilotCard ? this.copilotCard.effects.find(e => e.type === 'stat_bonus')?.stats?.systemSupport * 12 || 48 : 48
    );
    
    this.currentResources.machine = Math.min(
        this.currentResources.machine + Math.floor((stats.energyRegen || 25) * overheatPenalty),
        stats.energyCapacity || 220
    );
    
    // Cool down
    this.currentResources.heat = Math.max(0, this.currentResources.heat - (stats.heatDissipation || 12));
    
    // Reset actions
    this.actionsRemaining = this.getMaxActions();
};

// Expose globally
window.CombatDeck = CombatDeck;