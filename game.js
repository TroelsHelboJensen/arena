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

var enemy = build.player("Enemy", player.level);
enemy.weapon = sword;
//console.log(enemy);

console.log(player.name + "'s stats");
console.log(player);
console.log(enemy.name + "'s health = " + enemy.health);

// Build the arena to fight against each other.
async function arena(player, enemy) {
    // Her skal vi lave vores game engine
    /*
    1. slå med terning for player
    2. udregn hans angreb med sværd
    2a. kan være sværd damage + terning
    3. slå terning for enemy til at forsvarer sig
    3a. kan være defence + terning
    4. Træk resultaterne fra hinanden og 
        se hvor meget i skade forsvaren får
    5. Gentag men byt om på hvem der angriber og 
            forsvarer
    */
    var rounds = 1;
    while(true) {
        
        console.log("Press any key to start round " + rounds);
        await keypress();
        
        //----------------------------------------------------------------------------------------------------------------
        // Players Angreb
        //----------------------------------------------------------------------------------------------------------------
        var energy = await energiAngreb(player);
        var enhancedAttack = energy / 100 + 1;
        player.energy -= energy;

        var angreb = (dice.result(20) + player.weapon.damage + player.stats.strength) * enhancedAttack;
        var defence = dice.result(20) + enemy.defence;
        console.log(player.name + "'s angreb er " + angreb + " : " + enemy.name + "'s forsvar er " + defence);
        console.log("Resultatet = " + (angreb-defence));

        var result = angreb-defence;        
        if (result < 0) result = 0;

        enemy.health -= result;
        console.log(enemy.name + "'s health: " + enemy.health + "\n");
        
        if (enemy.health < 1) break;

        //----------------------------------------------------------------------------------------------------------------
        // Enemies Angreb
        //----------------------------------------------------------------------------------------------------------------
        var angreb = dice.result(20) + enemy.weapon.damage + enemy.stats.strength;
        var defence = dice.result(20) + player.defence;
        console.log(enemy.name + "'s angreb er " + angreb + " : " + player.name + "'s forsvar er " + defence);
        console.log("Resultatet = " + (angreb-defence));
        
        var result = angreb-defence;
        if (result < 0) result = 0;
        
        player.health -= result;
        console.log(player.name + "'s health: " + player.health + "\n");

        if (player.health < 1) break;

        // Generate some energy again if player energy is not max
        if (player.energy < 100) player.energy += 7; 
        
        rounds += 1;
    }
    
    if (enemy.health < 1) {
        player.experience += enemy.experience * 2,045;
        if (player.experience > 100 * Math.pow(player.level,2))
            player.level++;

        if (player.level % 5 == 0) {
            var sum = dice.result(3);
            if (sum == 1)
                player.stats.strength++;
            else if (sum == 2)
                player.stats.dexterity++;
            else
                player.stats.intelligence++;
            
        }
        player.energy = player.originalEnergy;
        player.health = player.originalHealth;
        persistence.save(player);
    }
    /*
        1. Hvis enemy dør så får player xp
        2. Experience fra enemy gange dit level gange 2,045
        3. level 1 = 100 * 1^2 xp, 100 * 2^2 xp, 100 * 3^2 xp
        4. hvis du har nok xp så stig et level
        5. Hvert 5 level får man +1 til en random stat
        6. Gem progress
        7. Hvis player dør så er spillet slut
    */
    
    process.exit();
}

const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    }))
}

const energiAngreb = async (player) => {

    var energy = 0;
    console.log("Du har så meget energi tilbage " + player.energy);
    // Prompt user to input data in console.
    console.log("Hvor meget energi vil du bruge i dit angreb?");
    return new Promise(resolve => process.stdin.once('data', (data) => {
        // User input exit.
        if(!isNaN(data))
            if (player.energy <= data) 
            {
                energy = data;
                runnnig = false;
            }
        
        resolve(data);
    }));
}

arena(player, enemy);