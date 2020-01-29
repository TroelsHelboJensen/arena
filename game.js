var build = require('./player.js');
var sword = require('./weapon.js');
var dice = require('./dice.js');

var player = build.player("Troels");
player.weapon = sword;
console.log(player);

var enemy = build.player("Enemy");
enemy.weapon = sword;
console.log(enemy);

// Build the arena to fight against each other.
;(async function arena(player, enemy) {
    console.log("press any key to start first round");
    await keypress();
    
    await keypress();
})().then(process.exit)

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
}

arena(player, enemy);