const patron = require('patron.js');
const Discord = require('discord.js');
const constants = require('../../utility/Constants.js');

class Map extends patron.Command {
  constructor() {
    super({
      names: ['map', 'choosemap', 'pickmap'],
      groupName: 'general',
      description: 'This command chooses a map for your game.'
    });
  }

  async run(msg) {
    var mapsArray = ["Water Hazard", "Ice Flow", "Bloontonium Mine", "Pumpkin Patch", "Snowy Castle", "Ink Blot", "Mondrian", "Indoor Pools", "Cards", "Pyramid Steps", "Hydro Dam", "Wattle Resorts", "Battle River", "A-Game", "Rally", "Yin-Yang", "Area 52", "Offside", "Park", "Swamp", "Temple", "Yellow Brick", "Roadblock"]
    var randomisedMap = mapsArray[Math.floor(Math.random() * mapsArray.length)];
    var randomColour = constants.colourArray[Math.floor(Math.random() * constants.colourArray.length)];
    var mapEmbed = new Discord.RichEmbed();
    mapEmbed.setAuthor("Random Map Selector")
    mapEmbed.setColor(randomColour)
    mapEmbed.setDescription("The map is **" + randomisedMap + "**. Say `" + constants.prefix + "map` to re-roll.")
    if (randomisedMap == "Water Hazard") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/3/3b/Water_Hazard.png/revision/latest/scale-to-width-down/620?cb=20140328014731&path-prefix=bloons");
    }
    if (randomisedMap == "Ice Flow") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/8/84/IceFlowBTD5.png/revision/latest/scale-to-width-down/620?cb=20131221003953&path-prefix=bloons");
    }
    if (randomisedMap == "Bloontonium Mine") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/9/95/Bloontonium_Mine.png/revision/latest/scale-to-width-down/620?cb=20140531065629&path-prefix=bloons");
    }
    if (randomisedMap == "Pumpkin Patch") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/a/a5/Pumpkin_Patch.png/revision/latest/scale-to-width-down/620?cb=20131027134424&path-prefix=bloons");
    }
    if (randomisedMap == "Snowy Castle") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/6/67/BattlesNK-228x174-Icon-SnowyCastle.jpg/revision/latest/scale-to-width-down/220?cb=20150421060640&path-prefix=bloons");
    }
    if (randomisedMap == "Ink Blot") {
      mapEmbed.setThumbnail("https://vignette.wikia.nocookie.net/b__/images/e/ef/Ink_Blot.jpg/revision/latest?cb=20141116195940&path-prefix=bloons");
    }
    if (randomisedMap == "Mondrian") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20151115065255/b__/bloons/images/thumb/b/b1/Mondrian.png/130px-165%2C826%2C0%2C584-Mondrian.png");
    }
    if (randomisedMap == "Indoor Pools") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20170802083915/b__/bloons/images/thumb/5/5c/Indoor_Pools.png/130px-133%2C670%2C0%2C474-Indoor_Pools.png");
    }
    if (randomisedMap == "Cards") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20121212235726/b__/bloons/images/thumb/e/e6/Cards.png/130px-135%2C668%2C0%2C471-Cards.png");
    }
    if (randomisedMap == "Pyramid Steps") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20130730140538/b__/bloons/images/thumb/c/ce/Pyramid_Steps.png/130px-134%2C670%2C0%2C473-Pyramid_Steps.png");
    }
    if (randomisedMap == "Hydro Dam") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20131222034843/b__/bloons/images/thumb/5/54/HydroDamBattles.png/130px-122%2C810%2C0%2C608-HydroDamBattles.png");
    }
    if (randomisedMap == "Wattle Resorts") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20180105054101/b__/bloons/images/thumb/f/ff/14helis-boomertrack.png/130px-300%2C1392%2C0%2C965-14helis-boomertrack.png");
    }
    if (randomisedMap == "Battle River") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20140531065628/b__/bloons/images/thumb/0/07/Battle_River.png/130px-134%2C667%2C0%2C471-Battle_River.png");
    }
    if (randomisedMap == "A-Game") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20140712004658/b__/bloons/images/thumb/a/a3/A-Game.png/130px-168%2C834%2C0%2C588-A-Game.png");
    }
    if (randomisedMap == "Rally") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20131222173314/b__/bloons/images/thumb/2/27/Screen_Shot_2013-12-22_at_9.31.09_AM.png/130px-134%2C669%2C0%2C472-Screen_Shot_2013-12-22_at_9.31.09_AM.png");
    }
    if (randomisedMap == "Yin-Yang") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20150404080328/b__/bloons/images/thumb/d/d4/BTDB_YinYang.png/130px-32%2C175%2C0%2C126-BTDB_YinYang.png");
    }
    if (randomisedMap == "Area 52") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20170806070557/b__/bloons/images/thumb/6/64/Area_52.png/130px-178%2C1031%2C0%2C754-Area_52.png");
    }
    if (randomisedMap == "Offside") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20140712024806/b__/bloons/images/thumb/c/c4/Offside.jpg/130px-71%2C452%2C0%2C336-Offside.jpg");
    }
    if (randomisedMap == "Park") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20150404075754/b__/bloons/images/thumb/2/22/BTDB_Park.png/130px-31%2C174%2C0%2C126-BTDB_Park.png");
    }
    if (randomisedMap == "Swamp") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20131222174633/b__/bloons/images/thumb/3/3e/Swamp.png/130px-134%2C669%2C0%2C472-Swamp.png");
    }
    if (randomisedMap == "Temple") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20170623095421/b__/bloons/images/thumb/a/a4/Temple_btdbflash.png/130px-133%2C670%2C0%2C474-Temple_btdbflash.png");
    }
    if (randomisedMap == "Yellow Brick") {
      mapEmbed.setThumbnail("https://images.wikia.nocookie.net/__cb20140531065632/b__/bloons/images/thumb/2/22/Yellow_Brick.png/130px-133%2C666%2C0%2C471-Yellow_Brick.png");
    }
    if (randomisedMap == "Roadblock") {
      mapEmbed.setThumbnail("https://static-api.nkstatic.com/appdocs/2/assets/assets/4.6_update_HIGH.png");
    }
    return msg.channel.send(mapEmbed);
  }
}

module.exports = new Map();
