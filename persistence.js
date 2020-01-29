var fs = require('fs');

var save = function (player) {
    var save = { player: player };
    fs.writeFileSync('save.json', JSON.stringify(save));
    /*, 'utf-8', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      fs.close();*/
}

var load = function () {
    var rawdata = fs.readFileSync('save.json');
    var savegame = JSON.parse(rawdata);

    if (savegame != null && savegame != undefined) { return savegame.player; }

    return null;
}

module.exports = { 
    save: save,
    load: load 
}