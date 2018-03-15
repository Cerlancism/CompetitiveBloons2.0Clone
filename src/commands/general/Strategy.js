const Patron = require('patron.js');
const Discord = require('discord.js');
const Constants = require('../../utility/Constants.js');

class Map extends Patron.Command
{
  constructor()
  {
    super({
      names: ['strat', 'strategy', 'pickstrat', 'choosestrat'],
      groupName: 'general',
      description: 'This command chooses a strategy for your game.'
    });
  }

  async run(msg)
  {
    var stratArray = ["Dart Monkey | Monkey Buccaneer", "Dart Monkey | Monkey Ace", "Dart Monkey | Super Monkey", "Dart Monkey | Monkey Apprentice", "Dart Monkey | Monkey Village", "Dart Monkey | Mortar Tower", "Dart Monkey | Dartling Gun", "Dart Monkey | Spike Factory", "Dart Monkey | Bloonchipper", "Dart Monkey | Heli Pilot", "Dart Monkey | Monkey Sub", "Dart Monkey | Tack Shooter", "Dart Monkey | Sniper Monkey", "Dart Monkey | Boomerang Thrower", "Dart Monkey | Ninja Monkey ", "Dart Monkey | Bomb Tower", "Dart Monkey | Ice Tower", "Tack Shooter | Monkey Buccaneer", "Tack Shooter | Monkey Apprentice", "Tack Shooter | Monkey Village  ", "Tack Shooter | Mortar Tower", "Tack Shooter | Heli Pilot", "Tack Shooter | Monkey Sub", "Tack Shooter | Sniper Monkey", "Tack Shooter | Boomerang Thrower", "Tack Shooter | Ninja Monkey", "Sniper Monkey | Monkey Buccaneer", "Sniper Monkey | Monkey Apprentice", "Sniper Monkey | Dartling Gun", "Sniper Monkey | Heli Pilot", "Sniper Monkey | Monkey Sub", "Sniper Monkey | Boomerang Thrower", "Sniper Monkey | Ninja Monkey", "Sniper Monkey | Bomb Tower", "Boomerang Thrower | Monkey Buccaneer", "Boomerang Thrower | Monkey Ace", "Boomerang Thrower | Monkey Apprentice", "Boomerang Thrower | Monkey Village", "Boomerang Thrower | Mortar Tower", "Boomerang Thrower | Dartling Gun", "Boomerang Thrower | Spike Factory", "Boomerang Thrower | Heli Pilot", "Boomerang Thrower | Monkey Sub", "Boomerang Thrower | Ninja Monkey", "Boomerang Thrower | Bomb Tower", "Boomerang Thrower | Ice Tower", "Ninja Monkey | Monkey Buccaneer", "Ninja Monkey | Monkey Apprentice", "Ninja Monkey | Monkey Village", "Ninja Monkey | Mortar Tower", "Ninja Monkey | Dartling Gun", "Ninja Monkey | Monkey Engineer", "Ninja Monkey | Heli Pilot", "Ninja Monkey | Monkey Sub", "Ninja Monkey | Ice Tower", "Bomb Tower | Monkey Apprentice", "Bomb Tower | Mortar Tower", "Bomb Tower | Dartling Gun", "Bomb Tower | Heli Pilot", "Bomb Tower | Monkey Sub", "Ice Tower | Monkey Apprentice", "Ice Tower | Dartling Gun", "Ice Tower | Heli Pilot", "Ice Tower | Monkey Sub", "Glue Gunner | Monkey Buccaneer", "Glue Gunner | Monkey Apprentice", "Glue Gunner | Heli Pilot", "Glue Gunner | Monkey Sub", "Monkey Buccaneer | Monkey Apprentice", "Monkey Buccaneer | Mortar Tower", "Monkey Buccaneer | Dartling Gun", "Monkey Buccaneer | Heli Pilot", "Monkey Buccaneer | Monkey Sub", "Monkey Ace | Monkey Apprentice", "Monkey Ace | Heli Pilot", "Monkey Ace | Monkey Sub", "Super Monkey |  Monkey Apprentice", "Super Monkey |  Heli Pilot", "Super Monkey |  Monkey Sub", "Monkey Apprentice | Monkey Village", "Monkey Apprentice | Mortar Tower", "Monkey Apprentice | Monkey Engineer", "Monkey Apprentice | Bloonchipper", "Monkey Apprentice | Heli Pilot", "Monkey Apprentice | Monkey Sub", "Monkey Village | Heli Pilot", "Mortar Tower | Dartling Gun", "Mortar Tower | Heli Pilot", "Mortar Tower | Monkey Sub", "Dartling Gun | Monkey Buccaneer", "Dartling Gun | Monkey Apprentice", "Dartling Gun | Heli Pilot", "Dartling Gun | Monkey Sub", "Spike Factory | Monkey Apprentice", "Spike Factory | Heli Pilot", "Spike Factory | Monkey Sub", "Monkey Engineer | Heli Pilot", "Bloonchipper | Heli Pilot", "Bloonchipper | Monkey Sub", "Heli Pilot | Monkey Sub"];
    var randomStrat = stratArray[Math.floor(Math.random() * stratArray.length)];
    var randomColour = Constants.getRandomColor();
    var stratEmbed = new Discord.RichEmbed();
    stratEmbed.setAuthor("Random Strategy Selector")
    stratEmbed.setColor(randomColour)
    stratEmbed.setDescription("The strategy is `" + randomStrat + "`. Say `" + Constants.prefix + "strat` to re-roll.")
    return msg.channel.send(stratEmbed);
  }
}

module.exports = new Map();
