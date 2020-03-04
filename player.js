var stats = require('./stats');

var player = function (name, level) {
    var stat = stats.stats();
    var xp = 0;
    if (name == "Enemy"){
        xp = 55 * level;
    }
    return {
        name: name,
        health: 100 + stat.strength,
        stats: stat,
        defence: 5 + stat.dexterity,
        weapon: "sword",
        experience: xp, 
        level: 1,
        energy: 100,
        originalEnergy: 100,
        originalHealth: 100 + stat.strength
    }
}

module.exports = { player: player };