module.exports =
{
  sprite: function(arg, msg, command)
  {
    console.log('Command Recieved.')
    try
    {
      console.log('Command recieved.');
      var original = arg
      if (original.indexOf('mega ') > -1)
      {
        var endVal = original.length;
        if (original.charAt(endVal - 1) == 'x')
        {
          var fileName = original.slice(original.indexOf(' '), endVal - 1);
          fileName = fileName + '-megax';
          fileName = fileName.replace(/ /g, '');
        }
        else if (original.charAt(endVal - 1) == 'y')
        {
          var fileName = original.slice(original.indexOf(' '), endVal - 1)
          fileName = fileName + '-megay'
          fileName = fileName.replace(/ /g, '');
        }
        else
        {
          var fileName = original.substr(original.indexOf(' '))
          fileName = fileName + '-mega'
          fileName = fileName.replace(/ /g, '');
        };
      }
      else if (original.indexOf('alolan ') == 0 || original.indexOf('alola ') == 0)
      {
        var fileName = original.slice(original.indexOf(' '));
        fileName = fileName + '-alola';
        fileName = fileName.replace(/ /g, '');
      }
      else if (original.indexOf('male') > -1 || original.indexOf('female') == 0)
      {
        if (original.indexOf('male') > -1)
        {
          var fileName = original.replace('male', '')
          fileName = fileName.replace(/ /g, '');
        }
        if (original.indexOf('female') > -1)
        {
          var fileName = original.replace('female', '')
          fileName = fileName.replace(/ /g, '');
          fileName = fileName + '-f';
        }
      }
      else
      {
        var fileName = original
      }
      if (command == 'sprite')
      {
        url = '/home/merc/shared/assets/sprites/xyani/' + fileName + '.gif'
      }
      else if (command == 'ssprite' || command == 'shinysprite')
      {
        url = '/home/merc/shared/assets/sprites/xyani-shiny/' + fileName + '.gif'
      }
      try
      {
        msg.channel.send('',
        {
          file:url
        });
      }
      catch(e)
      {
        msg.channel.send('',
        {
          file:backupUrl
        });
      }
    }
    catch(e)
    {
      if(e == 404)
      {
        console.log('URL not found. Check directory.')
      }
      msg.channel.send("Sorry, that pokémon wasn't found. Check your spelling.")
    }
  },
  stats: function(arg, msg, command, fs, $, capitalizeFirstLetter)
  {
    console.log('Command Recieved.')
	msg.channel.send("Fetching.... \nPokeAPI can be slow, and sometimes goes down entirely. If I don't respond before removing this message, please try again later.")
	.then(msg => 
		{
			msg.delete(10000)
		})
	var original = arg
    if (original.indexOf('mega ') > -1)
    {
		var endVal = original.length;
        if (original.charAt(endVal - 1) == 'x')
        {
          var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-mega-x';
          moveName = moveName.replace(/ /g, '');
		  var urlName = moveName.slice(0, moveName.indexOf('-mega-x'));
        }
        else if (original.charAt(endVal - 1) == 'y')
        {
          var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-mega-y';
          moveName = moveName.replace(/ /g, '');
		  var urlName = moveName.slice(0, moveName.indexOf('-mega-y'));
        }
        else
        {
          var moveName = original.substr(original.indexOf(' '))
          moveName = moveName + '-mega'
          moveName = moveName.replace(/ /g, '');
		  var urlName = moveName.slice(0, moveName.indexOf('-mega'));
        };
    }
    else if (original.indexOf('alolan ') == 0 || original.indexOf('alola ') == 0)
    {
        var moveName = original.slice(original.indexOf(' '));
        moveName = moveName + '-alola';
        moveName = moveName.replace(/ /g, '');
		var urlName = moveName.slice(0, moveName.indexOf('-alola'));
    }
	else
	{
		if (original.indexOf('male') > -1)
		{
			var moveName = original.replace('male', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-m';
			var urlName = moveName.slice(0, moveName.indexOf('-m'));
		}
		if (original.indexOf('female') > -1)
		{
			var moveName = original.replace('female', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-f';
			var urlName = moveName.slice(0, moveName.indexOf('-f'));
		}
		else
		{
			var moveName = original
			var urlName = original
		}
	}
	console.log('moveName obtained');
    var pokeID;
    var pokeName = arg.toLowerCase();;
    var pokeType1;
    var pokeType2;
    var pokeAbility1;
    var pokeAbility2;
    var pokeAbility3;
    var pokeSpeed;
    var pokeSpDef;
    var pokeSpAtk;
    var pokeDef;
    var pokeAtk;
    var pokeHP;
	var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + moveName + '/';
	console.log('Attemping get at URL: ' + pokeURL);
	$.getJSON(pokeURL, function(data)
    {
		var pokeID = data.id;
        var pokeName = arg.toLowerCase();;
        var pokeType1 = data.types[0].type.name;
        var pokeAbility1 = data.abilities[0].ability.name;
        var pokeSpeed = data.stats[0].base_stat;
        var pokeSpDef = data.stats[1].base_stat;
        var pokeSpAtk = data.stats[2].base_stat;
        var pokeDef = data.stats[3].base_stat;
        var pokeAtk = data.stats[4].base_stat;
        var pokeHP = data.stats[5].base_stat;
		console.log('length = ' + data.abilities.length)
        if(data.types.length == 2) 
		{
			var pokeType2 = data.types[1].type.name;
        }
        else
        {
            var pokeType2 = 'N/A';
			var pokeAbility3 = 'N/A';
        }
        if(data.abilities.length == 2) 
        {
            var pokeAbility1 = data.abilities[1].ability.name;
			var pokeAbility2 = data.abilities[0].ability.name;
			var pokeAbility3 = 'N/A';
        }
        else if(data.abilities.length == 3) 
        {
			var pokeAbility1 = data.abilities[2].ability.name;
			var pokeAbility2 = data.abilities[1].ability.name;
            var pokeAbility3 = data.abilities[0].ability.name;
        }
        else
        {
            var pokeAbility2 = 'N/A';
            var pokeAbility3 = 'N/A';
		}
        console.log("Number: ", pokeID);
        console.log("Name: ", pokeName);
        console.log("Type 1: ", pokeType1);
        console.log("Type 2: ", pokeType2);
        console.log("Ability 1: ", pokeAbility1);
        console.log("Ability 2: ", pokeAbility2);
        console.log("Ability 3: ", pokeAbility3);
        console.log("Speed: ", pokeSpeed);
        console.log("Sp.Def: ", pokeSpDef);
        console.log("Sp.Atk: ", pokeSpAtk);
        console.log("Def: ", pokeDef);
        console.log("Atk: ", pokeAtk);
        console.log("HP: ", pokeHP);
		msg.reply({embed: 
		{
			"title": "Pokédex: " + pokeID,
			"color": 0xff5511,
			"footer": {
				"icon_url": "https://i.imgur.com/XWE7GV8.jpg",
				"text": "Click on the pokémon's name for more detail."
			},
			"author": {
				"name": pokeName,
				"url": "https://pokemondb.net/pokedex/" + urlName + "/",
				"icon_url": "http://merconix.tk/assets/pokeballicon.png"
			},
			"fields": [
			{
				"name": "Type 1",
				"value": pokeType1,
				"inline": true
			},
			{
				"name": "Type 2",
				"value": pokeType2,
				"inline": true
			},
			{
				"name": "\u200b",
				"value": "\u200b",
				"inline": true,
			},
			{
				"name": "Stats:",
				"value": 'HP: ' + pokeHP + '\nSpecial Attack: ' + pokeSpAtk,
				"inline": true,
			},
				
			{
				"name": "\u200b",
				"value": 'Attack: ' + pokeAtk + '\nSpecial Defense: ' + pokeSpDef,
				"inline": true,
			},
			{
				"name": "\u200b",
				"value": 'Defence: ' + pokeSpDef + '\nSpeed: ' + pokeSpeed,
				"inline": true,
			},
			{
				"name": "Ability 1",
				"value": pokeAbility1,
				"inline": true
			},
			{
				"name": "Ability 2",
				"value": pokeAbility2,
				"inline": true
			},
			{
				"name": "Ability 3",
				"value": pokeAbility3,
				"inline": true
			}
			]
			}
			});
	}
    )
  },
	sets: function(arg, msg, command, fs, $, setList, capitalizeFirstLetter)
	{
	console.log('Command recieved.');
    var original = arg
    if (original.indexOf('mega ') > -1)
    {
		var endVal = original.length;
        if (original.charAt(endVal - 1) == 'x')
        {
          var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-Mega-X';
          moveName = moveName.replace(/ /g, '');
		moveName = capitalizeFirstLetter(moveName);
        }
        else if (original.charAt(endVal - 1) == 'y')
        {
          var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-Mega-Y';
          moveName = moveName.replace(/ /g, '');
		moveName = capitalizeFirstLetter(moveName);
        }
        else
        {
          var moveName = original.substr(original.indexOf(' '))
          moveName = moveName + '-Mega'
          moveName = moveName.replace(/ /g, '');
		moveName = capitalizeFirstLetter(moveName);
        };
    }
    else if (original.indexOf('alolan ') == 0 || original.indexOf('alola ') == 0)
    {
        var moveName = original.slice(original.indexOf(' '));
        moveName = moveName + '-Alola';
        moveName = moveName.replace(/ /g, '');
		moveName = capitalizeFirstLetter(moveName);
    }
	else
	{
		if (original.indexOf('male') > -1)
		{
			var moveName = original.replace('male', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-Male';
			moveName = capitalizeFirstLetter(moveName);
		}
		else if (original.indexOf('female') > -1)
		{
			var moveName = original.replace('female', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-Female';
			moveName = capitalizeFirstLetter(moveName);
		}
		else
		{
			var moveName = capitalizeFirstLetter(original)
		}
	}
	var pokeDir = setList.SETDEX_SM[moveName];
	if(pokeDir != undefined)
	{
		var key = Object.keys(pokeDir)[0];
		if(key != undefined)
		{
			var setDir = pokeDir[key];
			var setName = Object.keys(pokeDir)[0];
			var EVs = setDir["evs"]
			var ev1Key = Object.keys(EVs)[0];
			var ev2Key = Object.keys(EVs)[1];
			var ev3Key = Object.keys(EVs)[2];
			var ev1 = ev1Key.toUpperCase() + ': ' + EVs[ev1Key]
			var ev2 = ev2Key.toUpperCase() + ': ' + EVs[ev2Key]
			var ev3 = ev3Key.toUpperCase() + ': ' + EVs[ev3Key]
			if(setDir["evs"].length == 4)
		    {
			    var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
		    }
		    if(setDir["evs"].length == 5)
			{
			    var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
		        var ev5Key = Object.keys(EVs)[4];
			    var ev5 = ev5Key.toUpperCase() + ': ' + EVs[ev5Key]
			}
	        if(setDir["evs"].length == 6)
			{
		        var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
			    var ev5Key = Object.keys(EVs)[4];
		        var ev5 = ev6Key.toUpperCase() + ': ' + EVs[ev5Key]
			    var ev6Key = Object.keys(EVs)[4];
			    var ev6 = ev6Key.toUpperCase() + ': ' + EVs[ev6Key]
			}
		    var setNature = setDir["nature"];
			var setAbility = setDir["ability"];
			var setItem = setDir["item"]
			var moves = setDir["moves"]
			var setMove1 = moves[0];
			var setMove2 = moves[1];
			var setMove3 = moves[2];
			var setMove4 = moves[3];
			if(ev3 != undefined)
			{
			    if(ev4 != undefined)
		    	{
		    	    if(ev5 != undefined)
		    	    {
						if(ev6 != undefined)
						{
			            	console.log('All IVs?')
						}
						else
						{
							ev6 = ' ';
						}
					}
					else
					{
						ev5 = ' ';
						ev6 = ' ';
					}
				}
				else
				{
					ev4 = ' ';
					ev5 = ' ';
					ev6 = ' ';
				}
			}
			else
			{
				ev3 = ' ';
				ev4 = ' ';
				ev5 = ' ';
				ev6 = ' ';
			}
			msg.reply({embed: 
			{
				"title": setName,
				"color": 0xff5511,
				"footer": {
				"icon_url": "https://i.imgur.com/XWE7GV8.jpg",
				"text": "Click on the pokémon's name for more detail."
				},
				"author": {
					"name": moveName,
					"url": "https://pokemondb.net/pokedex/" + moveName + "/",
					"icon_url": "http://merconix.tk/assets/pokeballicon.png"
				},
				"fields": [
				{
					"name": "Ability",
					"value": setAbility,
					"inline": true
				},
				{
					"name": "Item",
					"value": setItem,
					"inline": true
				},
				{
					"name": "\u200b",
					"value": "\u200b",
					"inline": true
				},
				{
					"name": "Moves:",
					"value": setMove1 + "\n" + setMove3,
					"inline": true
				},
				{
					"name": "\u200b",
					"value": setMove2 + "\n" + setMove4,
					"inline": true
				},
				{
					"name": "EVs",
					"value": ev1 + ' ' + ev2 + ' ' + ev3 + ' ' + ev4 + ' ' + ev5 + ' ' + ev6,
				}
				]
			}
			});
			
		}
		else
		{
			msg.reply("Sorry, an error occured. Check the pokémon's name is spelt correctly.")
		}
	}
	else
		{
			msg.reply("Sorry, I couldn't find that. Either they have no recommended moveset or the pokémon's name is spelt incorrectly.")
		}
	},
	pokemon: function(arg, msg, command, fs, $, setList, capitalizeFirstLetter)
	{
		console.log('Command recieved.')
		console.log('Command Recieved.')
		msg.channel.send("Fetching.... \nPokeAPI can be slow, and sometimes goes down entirely. If I don't respond before removing this message, please try again later.")
		.then(msg => 
		{
			msg.delete(10000)
		})
	var original = arg
    if (original.indexOf('mega ') > -1)
    {
		var endVal = original.length;
        if (original.charAt(endVal - 1) == 'x')
        {
          var statName = original.slice(original.indexOf(' '), endVal - 1);
          statName = statName + '-mega-x';
          statName = statName.replace(/ /g, '');
		  var urlName = statName.slice(0, statName.indexOf('-mega-x'));
		  var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-Mega-X';
          moveName = moveName.replace(/ /g, '');
		  moveName = capitalizeFirstLetter(moveName)
		  var fileName = original.slice(original.indexOf(' '), endVal - 1);
          fileName = fileName + '-megax';
          fileName = fileName.replace(/ /g, '');
		  var iconName = '-mega-x'
        }
        else if (original.charAt(endVal - 1) == 'y')
        {
          var statName = original.slice(original.indexOf(' '), endVal - 1);
          statName = statName + '-mega-y';
          statName = statName.replace(/ /g, '');
		  var urlName = statName.slice(0, statName.indexOf('-mega-y'));
		  var moveName = original.slice(original.indexOf(' '), endVal - 1);
          moveName = moveName + '-Mega-Y';
          moveName = moveName.replace(/ /g, '');
		  moveName = capitalizeFirstLetter(moveName)
		  var fileName = original.slice(original.indexOf(' '), endVal - 1);
          fileName = fileName + '-megay';
          fileName = fileName.replace(/ /g, '');
		  var iconName = '-mega-y'
        }
        else
        {
          var statName = original.slice(original.indexOf(' '), endVal);
          statName = statName + '-mega';
          statName = statName.replace(/ /g, '');
		  var urlName = statName.slice(0, statName.indexOf('-mega'));
		  var moveName = original.slice(original.indexOf(' '), endVal);
          moveName = moveName + '-Mega';
          moveName = moveName.replace(/ /g, '');
		  moveName = capitalizeFirstLetter(moveName)
		  var fileName = original.slice(original.indexOf(' '), endVal);
		  fileName = fileName + '-mega';
          fileName = fileName.replace(/ /g, '');
		  var iconName = '-mega'
        };
    }
    else if (original.indexOf('alolan ') == 0 || original.indexOf('alola ') == 0)
    {
        var statName = original.slice(original.indexOf(' '));
        statName = statName + '-alola';
        statName = statName.replace(/ /g, '');
		var urlName = statName.slice(0, statName.indexOf('-alola'));
		var moveName = original.slice(original.indexOf(' '));
		moveName = moveName + '-Alola';
		moveName = moveName.replace(/ /g, '');
		moveName = capitalizeFirstLetter(moveName);
        var fileName = original.slice(original.indexOf(' '));
        fileName = fileName + '-alola';
        fileName = fileName.replace(/ /g, '');
		var iconName = '-alolan'
    }
	else
	{
		if (original.indexOf('male') > -1)
		{
			var statName = original.replace('male', '')
			statName = statName.replace(/ /g, '');
			statName = statName + '-m';
			var urlName = statName.slice(0, statName.indexOf('-m'));
			var moveName = original.replace('male', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-Male';
			moveName = capitalizeFirstLetter(moveName);
			var fileName = original.replace('male', '')
			fileName = fileName.replace(/ /g, '');
		}
		else if (original.indexOf('female') > -1)
		{
			var statName = original.replace('female', '')
			statName = statName.replace(/ /g, '');
			statName = statName + '-f';
			var urlName = statName.slice(0, statName.indexOf('-f'));
			var moveName = original.replace('female', '')
			moveName = moveName.replace(/ /g, '');
			moveName = moveName + '-Female';
			moveName = capitalizeFirstLetter(moveName);
			var fileName = original.replace('female', '')
			fileName = fileName.replace(/ /g, '');
			fileName = fileName + '-f';
		}
		else
		{
			var statName = original
			var moveName = capitalizeFirstLetter(original)
			var fileName = original
			var urlName = original
		}
	}
	var pokeID;
    var pokeName = arg.toLowerCase();;
    var pokeType1;
    var pokeType2;
    var pokeAbility1;
    var pokeAbility2;
    var pokeAbility3;
    var pokeSpeed;
    var pokeSpDef;
    var pokeSpAtk;
    var pokeDef;
    var pokeAtk;
    var pokeHP;
	var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + statName + '/';
	console.log('Attemping get at URL: ' + pokeURL);
	$.getJSON(pokeURL, function(data)
    {
		var pokeID = data.id;
        var pokeName = arg.toLowerCase();;
        var pokeType1 = data.types[0].type.name;
        var pokeAbility1 = data.abilities[0].ability.name;
        var pokeSpeed = data.stats[0].base_stat;
        var pokeSpDef = data.stats[1].base_stat;
        var pokeSpAtk = data.stats[2].base_stat;
        var pokeDef = data.stats[3].base_stat;
        var pokeAtk = data.stats[4].base_stat;
        var pokeHP = data.stats[5].base_stat;
        if(data.types.length == 2) 
		{
			var pokeType2 = data.types[1].type.name;
        }
        else
        {
            var pokeType2 = 'N/A';
			var pokeAbility3 = 'N/A';
        }
        if(data.abilities.length == 2) 
        {
            var pokeAbility1 = data.abilities[1].ability.name;
			var pokeAbility2 = data.abilities[0].ability.name;
			var pokeAbility3 = 'N/A';
        }
        else if(data.abilities.length == 3) 
        {
			var pokeAbility1 = data.abilities[2].ability.name;
			var pokeAbility2 = data.abilities[1].ability.name;
            var pokeAbility3 = data.abilities[0].ability.name;
        }
        else
        {
            var pokeAbility2 = 'N/A';
            var pokeAbility3 = 'N/A';
		}
	var pokeDir = setList.SETDEX_SM[moveName];
	if(pokeDir != undefined)
	{
		var key = Object.keys(pokeDir)[0];
		if(key != undefined)
		{
			var setDir = pokeDir[key];
			var setName = Object.keys(pokeDir)[0];
			var EVs = setDir["evs"]
			var ev1Key = Object.keys(EVs)[0];
			var ev2Key = Object.keys(EVs)[1];
			var ev3Key = Object.keys(EVs)[2];
			var ev1 = ev1Key.toUpperCase() + ': ' + EVs[ev1Key]
			var ev2 = ev2Key.toUpperCase() + ': ' + EVs[ev2Key]
			var ev3 = ev3Key.toUpperCase() + ': ' + EVs[ev3Key]
			if(setDir["evs"].length == 4)
		    {
			    var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
		    }
		    if(setDir["evs"].length == 5)
			{
			    var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
		        var ev5Key = Object.keys(EVs)[4];
			    var ev5 = ev5Key.toUpperCase() + ': ' + EVs[ev5Key]
			}
	        if(setDir["evs"].length == 6)
			{
		        var ev4Key = Object.keys(EVs)[3];
			    var ev4 = ev4Key.toUpperCase() + ': ' + EVs[ev4Key]
			    var ev5Key = Object.keys(EVs)[4];
		        var ev5 = ev6Key.toUpperCase() + ': ' + EVs[ev5Key]
			    var ev6Key = Object.keys(EVs)[4];
			    var ev6 = ev6Key.toUpperCase() + ': ' + EVs[ev6Key]
			}
		    var setNature = setDir["nature"];
			var setAbility = setDir["ability"];
			var setItem = setDir["item"]
			var moves = setDir["moves"]
			var setMove1 = moves[0];
			var setMove2 = moves[1];
			var setMove3 = moves[2];
			var setMove4 = moves[3];
			if(ev3 != undefined)
			{
			    if(ev4 != undefined)
		    	{
		    	    if(ev5 != undefined)
		    	    {
						if(ev6 != undefined)
						{
			            	console.log('All EVs?')
						}
						else
						{
							ev6 = ' ';
						}
					}
					else
					{
						ev5 = ' ';
						ev6 = ' ';
					}
				}
				else
				{
					ev4 = ' ';
					ev5 = ' ';
					ev6 = ' ';
				}
			}
			else
			{
				ev3 = ' ';
				ev4 = ' ';
				ev5 = ' ';
				ev6 = ' ';
			}
			var movesetDetails = setName + '\nNature: ' + setNature + '\nAbility: ' + setAbility + '\nItem: ' + setItem + '\nEVs: ' + ev1 + ' ' + ev2 + ' ' + ev3 + ' ' + ev4 + ' ' + ev5 + ' ' + ev6

		}
		else
		{
			msg.reply("Sorry, an error occured. Check the pokémon's name is spelt correctly.")
		}
	}
	else
	{
		var movesetDetails = 'No recommended sets. Sorry.'
	}
	msg.channel.send({embed: 
			{
				"title": "Pokédex: " + pokeID,
				"color": 0xff5511,
				"footer": {
					"icon_url": "https://i.imgur.com/XWE7GV8.jpg",
					"text": "Click on the pokémon's name for more detail. Images can take time to load."
				},
				"image": {
					"url": 'http://merconix.tk/assets/sprites/xyani/' + fileName + '.gif'
				},
				"author": {
					"name": pokeName,
					"url": "https://pokemondb.net/pokedex/" + urlName + "/",
					"icon_url": "http://merconix.tk/assets/pokeballicon.png",
				},
				"fields": [
				{
					"name": "Type 1",
					"value": pokeType1,
					"inline": true
				},
				{
					"name": "Type 2",
					"value": pokeType2,
					"inline": true
				},
				{
					"name": "\u200b",
					"value": '\u200b',
					"inline": true,
				},
				{
					"name": "Stats:",
					"value": 'HP: ' + pokeHP + '\nSpecial Attack: ' + pokeSpAtk,
					"inline": true,
				},
				
				{
					"name": "\u200b",
					"value": 'Attack: ' + pokeAtk + '\nSpecial Defense: ' + pokeSpDef,
					"inline": true,
				},
				{
					"name": "\u200b",
					"value": 'Defence: ' + pokeSpDef + '\nSpeed: ' + pokeSpeed,
					"inline": true,
				},
				{
					"name": "Ability 1",
					"value": pokeAbility1,
					"inline": true
				},
				{
					"name": "Ability 2",
					"value": pokeAbility2,
					"inline": true
				},
				{
					"name": "Ability 3",
					"value": pokeAbility3,
					"inline": true
				},
				{
					"name": "Recommended Moveset:",
					"value": movesetDetails,
				},
				{
					"name": "Moves:",
					"value": setMove1 + "\n" + setMove3,
					"inline": true
				},
				{
					"name": "\u200b",
					"value": setMove2 + "\n" + setMove4,
					"inline": true
				}
				]
			}
			});
	}
	)
	},
	
	test: function(arg, msg)
    {
      msg.channel.send('No test commands right now baka!')
    }
}