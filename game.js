var build = require('./player.js');
var sword = require('./weapon.js');
var dice = require('./dice.js');
var persistence = require('./persistence.js');

var p = persistence.load();

var player = build.player("Troels");
player.weapon = sword;
if (p != null) {
    player = p;
}

var enemy = build.player("Enemy");
enemy.weapon = sword;
//console.log(enemy);



// Build the arena to fight against each other.
async function arena(player, enemy) {
    // Her skal vi lave vores game engine
    /*
    1. slå med terning for player
    2. udregn hans angreb med sværd
    2a. kan være sværd damage + terning
    3. slå terning for enemy til at forsvarer sig
    3a. kan være defence + terning
    4. træk resultaterne fra hinanden og se hvor meget i skade forsvaren får
    5. Gentag men byt om på hvem der angriber og forsvarer
    */

    while(true) {
        console.log("press any key to start first round1");
        await keypress();
        
        if (player.health < 1 || enemy.health < 1)
        { break; }
        player.health = 0;
    }

    process.exit();
}

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
}

arena(player, enemy);