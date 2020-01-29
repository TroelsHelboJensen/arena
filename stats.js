var max = 12;
var min = 8;
function stats() {
    var dice = require('./dice.js');
    
    return{
        strength:dice.result(max, min),
        dexterity:dice.result(max, min),
        intelligence:dice.result(max, min)
    }
}

module.exports = { stats:stats };