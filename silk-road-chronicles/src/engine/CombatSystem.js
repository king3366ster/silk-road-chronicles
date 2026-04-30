/**
 * 战斗系统 - Combat System
 * Strategy turn-based tactical combat
 */

export class CombatSystem {
  constructor() {
    this.gridWidth = 12;
    this.gridHeight = 8;
    this.units = [];
    this.currentTurn = 'player';
    this.turnNumber = 0;
    this.selectedUnit = null;
    this.moveRange = [];
    this.attackRange = [];
    this.combatLog = [];
    this.result = null;
  }

  initBattle(playerArmy, enemyArmy, terrain) {
    this.units = [];
    this.turnNumber = 0;
    this.combatLog = [];
    this.result = null;
    this.terrain = terrain || 'plains';

    // Place player units on left side
    playerArmy.forEach((unit, i) => {
      this.units.push({
        ...unit,
        id: `player_${i}`,
        side: 'player',
        x: 1 + (i % 3),
        y: 1 + Math.floor(i / 3) * 2,
        hp: unit.maxHp || 100,
        maxHp: unit.maxHp || 100,
        mp: unit.maxMp || 50,
        maxMp: unit.maxMp || 50,
        moved: false,
        attacked: false,
        status: []
      });
    });

    // Place enemy units on right side
    enemyArmy.forEach((unit, i) => {
      this.units.push({
        ...unit,
        id: `enemy_${i}`,
        side: 'enemy',
        x: this.gridWidth - 2 - (i % 3),
        y: 1 + Math.floor(i / 3) * 2,
        hp: unit.maxHp || 100,
        maxHp: unit.maxHp || 100,
        mp: unit.maxMp || 50,
        maxMp: unit.maxMp || 50,
        moved: false,
        attacked: false,
        status: []
      });
    });
  }

  getUnit(x, y) {
    return this.units.find(u => u.x === x && u.y === y && u.hp > 0);
  }

  getAliveUnits(side) {
    return this.units.filter(u => u.hp > 0 && (!side || u.side === side));
  }

  calculateMoveRange(unit) {
    const range = [];
    const speed = unit.speed || 3;
    const visited = new Map();
    const queue = [{ x: unit.x, y: unit.y, cost: 0 }];
    visited.set(`${unit.x},${unit.y}`, 0);

    while (queue.length > 0) {
      const { x, y, cost } = queue.shift();
      if (cost <= speed) {
        if (cost > 0) range.push({ x, y, cost });
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < this.gridWidth && ny >= 0 && ny < this.gridHeight) {
            const moveCost = this.getTerrainCost(nx, ny);
            const totalCost = cost + moveCost;
            const key = `${nx},${ny}`;
            if (totalCost <= speed && (!visited.has(key) || visited.get(key) > totalCost)) {
              if (!this.getUnit(nx, ny)) {
                visited.set(key, totalCost);
                queue.push({ x: nx, y: ny, cost: totalCost });
              }
            }
          }
        }
      }
    }
    return range;
  }

  calculateAttackRange(unit, fromX, fromY) {
    const range = [];
    const attackRange = unit.attackRange || 1;
    const cx = fromX ?? unit.x;
    const cy = fromY ?? unit.y;

    for (let x = 0; x < this.gridWidth; x++) {
      for (let y = 0; y < this.gridHeight; y++) {
        const dist = Math.abs(x - cx) + Math.abs(y - cy);
        if (dist > 0 && dist <= attackRange) {
          const target = this.getUnit(x, y);
          if (target && target.side !== unit.side) {
            range.push({ x, y, target });
          }
        }
      }
    }
    return range;
  }

  getTerrainCost(x, y) {
    const terrainCosts = {
      plains: 1, oasis: 1, desert: 1.5, mountain: 2,
      steppe: 1, lake: 3, valley: 1, forest: 1.5
    };
    return terrainCosts[this.terrain] || 1;
  }

  moveUnit(unit, x, y) {
    if (unit.moved) return false;
    const range = this.calculateMoveRange(unit);
    if (range.some(r => r.x === x && r.y === y)) {
      unit.x = x;
      unit.y = y;
      unit.moved = true;
      this.addLog(`${unit.name} 移动到 (${x},${y})`);
      return true;
    }
    return false;
  }

  attack(attacker, defender) {
    if (attacker.attacked) return null;
    
    const attackPower = this.calculateDamage(attacker, defender);
    const critChance = 0.1 + (attacker.luck || 0) * 0.005;
    const isCrit = Math.random() < critChance;
    const damage = isCrit ? Math.floor(attackPower * 1.5) : attackPower;

    defender.hp = Math.max(0, defender.hp - damage);
    attacker.attacked = true;
    attacker.moved = true;

    const logMsg = isCrit
      ? `💥 ${attacker.name} 暴击！对 ${defender.name} 造成 ${damage} 点伤害！`
      : `⚔️ ${attacker.name} 对 ${defender.name} 造成 ${damage} 点伤害`;
    this.addLog(logMsg);

    // Counter attack
    if (defender.hp > 0) {
      const counterDist = Math.abs(attacker.x - defender.x) + Math.abs(attacker.y - defender.y);
      if (counterDist <= (defender.attackRange || 1)) {
        const counterDmg = Math.floor(this.calculateDamage(defender, attacker) * 0.6);
        attacker.hp = Math.max(0, attacker.hp - counterDmg);
        this.addLog(`🔄 ${defender.name} 反击，造成 ${counterDmg} 点伤害`);
      }
    }

    // Check for defeat
    if (defender.hp <= 0) {
      this.addLog(`💀 ${defender.name} 被击败！`);
    }
    if (attacker.hp <= 0) {
      this.addLog(`💀 ${attacker.name} 被击败！`);
    }

    // Check battle end
    this.checkBattleEnd();

    return { damage, isCrit, defenderHp: defender.hp, attackerHp: attacker.hp };
  }

  calculateDamage(attacker, defender) {
    const atk = attacker.attack || attacker.stats?.military || 30;
    const def = defender.defense || Math.floor((defender.stats?.military || 20) * 0.5);
    const baseDamage = Math.max(5, atk - def * 0.5);
    const variance = baseDamage * 0.2;
    return Math.floor(baseDamage + (Math.random() * variance * 2 - variance));
  }

  useSkill(unit, skill, target) {
    if (unit.mp < (skill.cost || 10)) return null;
    unit.mp -= skill.cost || 10;
    unit.attacked = true;
    unit.moved = true;

    const effect = skill.effect || 'damage';
    let result = {};

    switch (effect) {
      case 'damage': {
        const dmg = Math.floor((skill.power || 40) * (1 + (unit.stats?.military || 30) / 100));
        target.hp = Math.max(0, target.hp - dmg);
        result = { damage: dmg, type: 'damage' };
        this.addLog(`✨ ${unit.name} 使用 ${skill.name}，对 ${target.name} 造成 ${dmg} 点伤害！`);
        break;
      }
      case 'heal': {
        const heal = skill.power || 30;
        target.hp = Math.min(target.maxHp, target.hp + heal);
        result = { heal, type: 'heal' };
        this.addLog(`💚 ${unit.name} 使用 ${skill.name}，恢复 ${target.name} ${heal} 点生命！`);
        break;
      }
      case 'buff': {
        target.status.push({ type: skill.buffType || 'attack', value: skill.buffValue || 1.3, turns: 3 });
        result = { type: 'buff' };
        this.addLog(`⬆️ ${unit.name} 使用 ${skill.name}，强化了 ${target.name}！`);
        break;
      }
    }
    this.checkBattleEnd();
    return result;
  }

  endTurn() {
    // Reset all units of current side
    this.units.filter(u => u.side === this.currentTurn && u.hp > 0).forEach(u => {
      u.moved = false;
      u.attacked = false;
      // Process status effects
      u.status = u.status.filter(s => {
        s.turns--;
        return s.turns > 0;
      });
    });

    // Switch turn
    this.currentTurn = this.currentTurn === 'player' ? 'enemy' : 'player';
    if (this.currentTurn === 'player') this.turnNumber++;
    this.selectedUnit = null;
    this.moveRange = [];
    this.attackRange = [];
    this.addLog(`--- ${this.currentTurn === 'player' ? '我方' : '敌方'} 回合 ---`);
  }

  checkBattleEnd() {
    const playerAlive = this.getAliveUnits('player').length;
    const enemyAlive = this.getAliveUnits('enemy').length;

    if (playerAlive === 0) {
      this.result = { winner: 'enemy', text: '战败...' };
      this.addLog('💀 战斗失败！');
      return true;
    }
    if (enemyAlive === 0) {
      this.result = { winner: 'player', text: '胜利！' };
      this.addLog('🎉 战斗胜利！');
      return true;
    }
    return false;
  }

  // Simple AI for enemy turn
  processEnemyTurn() {
    const enemies = this.getAliveUnits('enemy');
    const actions = [];

    for (const enemy of enemies) {
      const attackRange = this.calculateAttackRange(enemy);
      if (attackRange.length > 0) {
        // Attack nearest player unit
        const target = attackRange[0];
        const result = this.attack(enemy, target.target);
        if (result) actions.push({ unit: enemy, action: 'attack', target: target.target, result });
      } else {
        // Move toward nearest player unit
        const players = this.getAliveUnits('player');
        if (players.length > 0) {
          const nearest = players.reduce((best, p) => {
            const dist = Math.abs(p.x - enemy.x) + Math.abs(p.y - enemy.y);
            return dist < best.dist ? { unit: p, dist } : best;
          }, { unit: players[0], dist: Infinity });

          const moveRange = this.calculateMoveRange(enemy);
          if (moveRange.length > 0) {
            const bestMove = moveRange.reduce((best, pos) => {
              const dist = Math.abs(pos.x - nearest.unit.x) + Math.abs(pos.y - nearest.unit.y);
              return dist < best.dist ? { pos, dist } : best;
            }, { pos: moveRange[0], dist: Infinity });

            this.moveUnit(enemy, bestMove.pos.x, bestMove.pos.y);
            actions.push({ unit: enemy, action: 'move', to: bestMove.pos });
          }
        }
      }
    }

    this.endTurn();
    return actions;
  }

  addLog(msg) {
    this.combatLog.push({ turn: this.turnNumber, message: msg });
    if (this.combatLog.length > 50) this.combatLog.shift();
  }

  getBattleSummary() {
    return {
      result: this.result,
      turns: this.turnNumber,
      playerSurvivors: this.getAliveUnits('player').length,
      enemySurvivors: this.getAliveUnits('enemy').length,
      log: this.combatLog
    };
  }
}

export default CombatSystem;