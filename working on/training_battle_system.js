/*:
 * @target MZ
 * @plugindesc [v1.0.0] Training Battle System - Deck-based Combat
 * @author YourName
 *
 * Implements training battles with deck mechanics and resource management.
 */

(() => {
    'use strict';

    // Training Battle Scene
    class Scene_TrainingBattle extends Scene_Battle {
        create() {
            super.create();
            this.initializeTrainingBattle();
        }

        initializeTrainingBattle() {
            // Initialize player mecha deck
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            if (playerMecha && !playerMecha.combatDeck) {
                playerMecha.initializeDeck();
            }

            // Create training opponent
            this.opponent = this.createTrainingOpponent();
            
            // Override battle flow for deck-based combat
            this.setupDeckBattleFlow();
            
            console.log('Training battle initialized');
        }

        createTrainingOpponent() {
            return {
                name: "Training Dummy Mk.I",
                hp: 80,
                maxHp: 80,
                resources: {
                    machine: 150,
                    heat: 0
                },
                maxResources: {
                    machine: 150,
                    heat: 50
                },
                deck: [
                    {
                        id: 'DUMMY_ATTACK',
                        name: 'Basic Shot',
                        costs: { machine: 20, heat: 5 },
                        damage: 15
                    },
                    {
                        id: 'DUMMY_MOVE',
                        name: 'Reposition',
                        costs: { machine: 10 },
                        effect: 'movement'
                    }
                ],
                hand: [],
                actionsRemaining: 2,
                
                drawHand() {
                    this.hand = [];
                    for (let i = 0; i < 3 && this.deck.length > 0; i++) {
                        const randomIndex = Math.floor(Math.random() * this.deck.length);
                        this.hand.push({ ...this.deck[randomIndex] });
                    }
                },
                
                selectAction() {
                    // Simple AI - prefer attack if in range, otherwise move
                    const attackCard = this.hand.find(card => card.damage);
                    if (attackCard && this.canUseCard(attackCard)) {
                        return attackCard;
                    }
                    
                    const moveCard = this.hand.find(card => card.effect === 'movement');
                    if (moveCard && this.canUseCard(moveCard)) {
                        return moveCard;
                    }
                    
                    return null;
                },
                
                canUseCard(card) {
                    if (this.actionsRemaining <= 0) return false;
                    
                    for (const [resource, cost] of Object.entries(card.costs || {})) {
                        if (this.resources[resource] !== undefined && this.resources[resource] < cost) {
                            return false;
                        }
                    }
                    return true;
                },
                
                regenerateResources() {
                    this.resources.machine = Math.min(this.resources.machine + 20, this.maxResources.machine);
                    this.resources.heat = Math.max(0, this.resources.heat - 8);
                    this.actionsRemaining = this.resources.heat < 40 ? 2 : 1;
                }
            };
        }

        setupDeckBattleFlow() {
            // Override turn processing
            this.originalStartTurn = BattleManager.startTurn;
            BattleManager.startTurn = this.startDeckTurn.bind(this);
            
            this.originalProcessTurn = BattleManager.processTurn;
            BattleManager.processTurn = this.processDeckTurn.bind(this);
        }

        startDeckTurn() {
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            
            if (BattleManager._phase === 'start') {
                // Player turn start
                if (playerMecha) {
                    playerMecha.regenerateResources();
                    if (playerMecha.combatDeck) {
                        playerMecha.combatDeck.drawHand();
                    }
                }
                
                this.showPlayerHand();
                BattleManager._phase = 'input';
                
            } else if (BattleManager._phase === 'turn') {
                // Enemy turn
                this.opponent.regenerateResources();
                this.opponent.drawHand();
                this.processEnemyTurn();
            }
        }

        showPlayerHand() {
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            if (!playerMecha || !playerMecha.combatDeck) return;
            
            // Create hand display window
            if (this._handWindow) {
                this._handWindow.close();
                this.removeChild(this._handWindow);
            }
            
            const rect = new Rectangle(50, 400, 740, 120);
            this._handWindow = new Window_Hand(rect, playerMecha.combatDeck.hand);
            this._handWindow.setHandler('ok', this.onHandOk.bind(this));
            this._handWindow.setHandler('cancel', this.onHandCancel.bind(this));
            this.addChild(this._handWindow);
            this._handWindow.activate();
        }

        onHandOk() {
            const cardIndex = this._handWindow.index();
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            
            if (playerMecha && playerMecha.combatDeck) {
                const card = playerMecha.combatDeck.hand[cardIndex];
                
                if (playerMecha.combatDeck.canPlayCard(card)) {
                    this.executePlayerAction(card, cardIndex);
                } else {
                    $gameMessage.add("Cannot use this card - insufficient resources!");
                    this._handWindow.activate();
                }
            }
        }

        executePlayerAction(card, cardIndex) {
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            
            // Consume resources
            const costs = card.costs || {};
            const resources = playerMecha.getCurrentResources();
            
            for (const [resource, cost] of Object.entries(costs)) {
                if (resource === 'actions') {
                    playerMecha.actionsRemaining -= cost;
                } else if (resources[resource] !== undefined) {
                    resources[resource] -= cost;
                }
            }
            
            // Execute effect
            if (card.effects) {
                for (const effect of card.effects) {
                    if (effect.type === 'damage') {
                        const damage = this.calculateDamage(card, effect);
                        this.opponent.hp -= damage;
                        $gameMessage.add(`${card.name} deals ${damage} damage!`);
                        
                        if (this.opponent.hp <= 0) {
                            this.processVictory();
                            return;
                        }
                    }
                }
            }
            
            // Remove card from hand
            playerMecha.combatDeck.playCard(cardIndex);
            
            // Check if player can continue
            if (playerMecha.actionsRemaining > 0) {
                this.showPlayerHand();
            } else {
                this.endPlayerTurn();
            }
        }

        calculateDamage(card, effect) {
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            let damage = 30; // Base damage
            
            // Add pilot gunnery bonus
            if (playerMecha.pilotCard) {
                const gunnery = playerMecha.pilotCard.effects.find(e => e.type === 'stat_bonus')?.stats?.gunnery || 5;
                damage += gunnery * 3;
            }
            
            // Add weapon bonus
            for (const weapon of playerMecha.equipment.weapons) {
                if (weapon.effects) {
                    for (const weaponEffect of weapon.effects) {
                        if (weaponEffect.type === 'weapon_stats' && weaponEffect.stats.damage_bonus) {
                            damage += weaponEffect.stats.damage_bonus;
                        }
                    }
                }
            }
            
            return Math.floor(damage);
        }

        endPlayerTurn() {
            this._handWindow.close();
            this.removeChild(this._handWindow);
            BattleManager._phase = 'turn';
            this.startDeckTurn();
        }

        processEnemyTurn() {
            const action = this.opponent.selectAction();
            
            if (action) {
                // Consume enemy resources
                for (const [resource, cost] of Object.entries(action.costs || {})) {
                    if (this.opponent.resources[resource] !== undefined) {
                        this.opponent.resources[resource] -= cost;
                    }
                }
                
                if (action.damage) {
                    const playerMecha = window.MechaCompositeManager?.getActiveMecha();
                    const damage = action.damage;
                    
                    // Apply damage to player (simplified)
                    $gameMessage.add(`${this.opponent.name} attacks for ${damage} damage!`);
                    
                    // Check for player defeat
                    // This would integrate with actual HP system
                }
                
                this.opponent.actionsRemaining--;
            }
            
            // End enemy turn
            setTimeout(() => {
                BattleManager._phase = 'start';
                this.startDeckTurn();
            }, 1000);
        }

        processVictory() {
            $gameMessage.add("Training battle completed successfully!");
            $gameMessage.add("Gained experience and academy credits!");
            
            // Award experience to pilot and copilot
            const playerMecha = window.MechaCompositeManager?.getActiveMecha();
            if (playerMecha) {
                this.awardExperience(playerMecha);
            }
            
            setTimeout(() => {
                SceneManager.pop();
            }, 2000);
        }

        awardExperience(mecha) {
            // Award pilot experience
            if (mecha.pilotCard && mecha.pilotCard.experience) {
                mecha.pilotCard.experience.current += 50;
                console.log(`Pilot gained 50 experience`);
            }
            
            // Award copilot experience  
            if (mecha.copilotCard && mecha.copilotCard.experience) {
                mecha.copilotCard.experience.current += 30;
                console.log(`Copilot gained 30 experience`);
            }
        }

        onHandCancel() {
            // End turn without playing card
            this.endPlayerTurn();
        }
    }

    // Hand display window
    class Window_Hand extends Window_Command {
        constructor(rect, hand) {
            super(rect);
            this._hand = hand || [];
            this.refresh();
        }

        makeCommandList() {
            for (const card of this._hand) {
                const costText = this.getCostText(card);
                const name = `${card.name} (${costText})`;
                this.addCommand(name, 'select', true);
            }
            
            if (this._hand.length === 0) {
                this.addCommand('No cards available', 'none', false);
            }
        }

        getCostText(card) {
            const costs = card.costs || {};
            const costParts = [];
            
            if (costs.machine) costParts.push(`${costs.machine}M`);
            if (costs.mental) costParts.push(`${costs.mental}Me`);
            if (costs.signal) costParts.push(`${costs.signal}S`);
            if (costs.heat) costParts.push(`${costs.heat}H`);
            if (costs.actions) costParts.push(`${costs.actions}A`);
            
            return costParts.join(', ') || 'Free';
        }
    }

    // Add training battle option to Academy Menu
    const originalCommandTraining = Scene_AcademyMenu.prototype.commandTrain;
    Scene_AcademyMenu.prototype.commandTrain = function() {
        SceneManager.push(Scene_TrainingBattle);
    };

    // Expose for external access
    window.Scene_TrainingBattle = Scene_TrainingBattle;
    window.Window_Hand = Window_Hand;

    console.log('Training Battle System loaded');
})();