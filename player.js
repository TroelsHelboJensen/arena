var stats = require('./stats');

var player = function (name) {
    var stat = stats.stats();
    var xp = 0;
    if (name == "Enemy"){
        xp = 10;
    }
    return {
        name: name,
        health: 100 + stat.strength,
        stats: stat,
        defence: 5 + stat.dexterity,
        weapon: "sword",
        experience: xp, 
        level: 1
    }
}

module.exports = { player: player };