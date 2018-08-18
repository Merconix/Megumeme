module.exports = 
{
  info: function (arg, msg) 
    {
      console.log('Command recieved.');
      msg.channel.send("Hi there, I'm Megumeme!")
      msg.channel.send("I was created by Merc#3336 for anime related shit, so I'm Agent 3 approved! Currently running version 2.3")
      msg.channel.send("If you need any more help, give me a shout with 'm!help'.",
      {
        file: 'https://i.imgur.com/f7LhUPL.png'
      });
    },
  help: function (arg, msg, adminRole)
    {
      console.log('Command recieved.');
      if (arg == '1')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (1):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "dan <tags>",
              value: "Returns images from Danbooru matching the provided tags (Including ratings)."
            },
            { 
              name: "gel <tags>",
              value: "Returns images from Gelbooru matching the provided tags (Including ratings)."
            },
            { 
              name: "lewd <tags>",
              value: "Returns images from Lewdbooru matching the provided tags (Including ratings)."
            }
          ]
        }
        });
      }
      else if (arg == '2')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (2):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "anime <anime>",
              value: "Provides MyAnimeList page for provided anime.\n [CURRENTLY UNAVAILABLE DUE TO API ERROR]"
            },
            { 
              name: "manga <manga>",
              value: "Provides MyAnimeList page for provided manga.\n [CURRENTLY UNAVAILABLE DUE TO API ERROR]"
            },
            { 
              name: "explosion",
              value: "Take a guess"
            }
          ]
        }
        });
      }
      else if (arg == '3')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (3):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "rng <maxnum>",
              value: "Returns a random number between 1 and your maximum number"
            },
            { 
              name: "giveaway",
              value: "Tags a random user in the channel to recieve their reward from the sender."
            }
          ]
        }
        });
      }
      else if (arg == '4')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (4):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "sprite <pokémon>",
              value: "Returns the animated 3D sprite of the pokémon selected."
            },
			      { 
              name: "shinysprite <pokémon>",
              value: "Returns the shiny version of the animated 3D sprite of the pokémon selected"
            },
            { 
              name: "stats <pokémon>",
              value: "Returns the base stats and details of the pokémon selected."
            }
          ]
        }
        });
      }
      else if (arg == '5')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (5):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "sets <pokémon>",
              value: "Returns the smogon recommended set of the pokémon selected."
            },
			      { 
              name: "pokemon <pokémon>",
              value: "Returns the base stats and details of the pokémon selected, along with the set smogon recommends for it."
            }
          ]
        }
        });
      }
	    else if (arg == '6')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme commands list (6):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "info",
              value: "Returns information on the bot and it's creation."
            },
			      { 
              name: "changelog",
              value: "Returns information on the changes made to the bot since public release."
            },
			      {
              name: "help",
              value: "Y-You're using it....baka."
            }
          ]
        }
        });
      }
      else if (arg == 'dan' || arg == 'danbooru')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Danbooru command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!dan <tags> OR m!danbooru <tags>"
            },
            { 
              name: "tags:",
              value: 'Any booru-formatted tags you want to search for;\nempty:returns a random image.\n"random":returns a random image.\n"rating:explicit|questionable|safe":tags that decide how NSFW the result will be\n(NOTE: SFW STATUS NOT GUARANTEED)'
            }
          ]
        }
        });
      }
      else if (arg == 'gel' || arg == 'gelbooru')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Gelbooru command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!gel <tags> OR m!gelbooru <tags>"
            },
            { 
              name: "tags:",
              value: 'Any booru-formatted tags you want to search for;\nempty:returns a random image.\n"random":returns a random image.\n"rating:explicit|questionable|safe":tags that decide how NSFW the result will be\n(NOTE: SFW STATUS NOT GUARANTEED)'
            }
          ]
        }
        });
      }
      else if (arg == 'lewd' || arg == 'lewdbooru')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Lewdbooru commands list(exclusive):",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!lewd <tags> OR m!lewdbooru <tags>"
            },
            { 
              name: "tags:",
              value: 'Any booru-formatted tags you want to search for;\nempty:returns a random image.\n"random":returns a random image.\n"rating:explicit|questionable|safe":tags that decide how NSFW the result will be\n"~<tag>":and/or tag, will search for items that both have this tag, and dont'
            }
          ]
        }
        });
      }
      else if (arg == 'anime')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "MyAnimeList command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!anime <name>"
            },
            { 
              name: "name",
              value: 'Any anime name you can think of.'
            }
          ]
        }
        });
      }
      else if (arg == 'manga')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "MyAnimeList command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!manga <name>"
            },
            { 
              name: "name",
              value: 'Any manga name you can think of.'
            }
          ]
        }
        });
      }
	  else if (arg == 'rng' || arg == 'random')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "RNG command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!rng <maxnum> OR m!random <maxnum>"
            },
            { 
              name: "maxnum",
              value: "The highest number you'd be willing to accept; \nif left blank will default to 100."
            }
          ]
        }
        });
      }
	  else if (arg == 'giveaway')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Giveaway command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!giveaway"
            },
            { 
              name: "use",
              value: 'Will tag a user in the channel for a prize. Excludes bots and the sender.'
            }
          ]
        }
        });
      }
      else if (arg == 'sprite')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Sprite command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!sprite <pokémon>"
            },
            { 
              name: "pokémon",
              value: 'Any pokémon name you can think of.'
            }
          ]
        }
        });
      }
      else if (arg == 'shinysprite' || arg == 'ssprite')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Sprite command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!shinysprite <pokémon> OR m!ssprite <pokémon>"
            },
            { 
              name: "pokémon",
              value: 'Any pokémon name you can think of.'
            },
            
          ]
        }
        });
      }
      else if (arg == 'stats')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Stats command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!stats <pokémon>"
            },
            { 
              name: "pokémon",
              value: 'Any pokémon name you can think of.'
            },
            
          ]
        }
        });
      }
      else if (arg == 'sets')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Sets command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!sets <pokémon>"
            },
            { 
              name: "pokémon",
              value: 'Any pokémon name you can think of.'
            },
            
          ]
        }
        });
      }
      else if (arg == 'pokemon')
      {
        msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Pokemon command help:",
          description: "Remember the m! prefix!",
          fields: 
          [
            { 
              name: "formatting:",
              value: "m!pokemon <pokémon> OR m!pokémon <pokémon>"
            },
            { 
              name: "pokémon",
              value: 'Any pokémon name you can think of.'
            },
            
          ]
        }
        });
      }
      else if (arg =='admin')
      {
        if (msg.member.roles.find("name", adminRole))
        {
          console.log('Authority confirmed.');
          msg.reply({embed: 
          {
            color: 0xff5511,
            title: "Megumeme commands list (Admin):",
            description: "Welcome to the team!",
            fields: 
            [
              { 
                name: "prefs lewdupdate <number>",
                value: "Updates the number of posts viewable on lewdbooru, allowing for new posts to be picked up by the command"
              },
              { 
                name: "prefs safetoggle <true/false>",
                value: 'Toggles "super safe mode" which removes all posts tagged with shota and/or loli. Primarily for you Canadians out there, doesnt affect admin use of the command, you guys should be trusted!'
              },
			  { 
                name: "timewarp",
                value: 'Restarts Megumeme, recommended to be used after lewdupdate.'
              }
            ]
          }
          });
        }
      }
	else if (arg =='lewdupdate')
      {
        if (msg.member.roles.find("name", adminRole))
        {
          console.log('Authority confirmed.');
          msg.reply({embed: 
          {
            color: 0xff5511,
            title: "Lewdupdate command help (Admin):",
            description: "Welcome to the team!",
            fields: 
            [
              { 
                name: "formatting",
                value: "m!prefs lewdupdate <variable>"
              },
              { 
                name: "variables",
                value: 'The number of posts on lewd.booru.org, including removed ones.'
              }
            ]
          }
          });
        }
      }
	  else if (arg =='safetoggle')
      {
        if (msg.member.roles.find("name", adminRole))
        {
          console.log('Authority confirmed.');
          msg.reply({embed: 
          {
            color: 0xff5511,
            title: "Safetoggle command help (Admin):",
            description: "Welcome to the team!",
            fields: 
            [
              { 
                name: "formatting",
                value: "m!prefs safetoggle <true/false>"
              },
              { 
                name: "variables",
                value: 'True for "on", False for "off"'
              }
            ]
          }
          });
        }
      }

      else
      {
        console.log('Command recieved.');
        msg.reply('Please choose a page with `m!help <page number>` or `m!help <command>`.')
      }
    },
  prefs: function(fs, arg, args, msg, adminRole, lewdNum, superSafeMode, currentDir)
  {
    if(msg.member.roles.find("name", adminRole))
    {
      if (arg.includes('lewdupdate '))
      {
        console.log('Authority confirmed.');
        var num = arg.substr(arg.indexOf(' ')+1);
        var num = num.substr(0,args.indexOf(' '));
        var sender = msg.author.username + '#' + msg.author.discriminator
        console.log(num)
        fs.writeFile(currentDir + '/preferences/lewdNum.txt', num, function (err) 
        {
          if (err) throw err;
          console.log('Saved!');
        });
        if (sender == 'Merc#3336')
        {
          console.log('Sender confirmed.');
          msg.reply("I'll remember for the next restart senpai!");
        }
        else
        {
          msg.channel.send("Update will take effect on next restart, Senpai has been notified. Thank you.");
          client.users.get("322041078385737739").sendMessage(sender + ' updated the number of images in lewdbooru from: ' + msg.channel.name + ". Restart whenever available.");
        }
      }
      if (arg.includes('safetoggle '))
      {
        console.log('Authority confirmed.');
        var tf = arg.substr(arg.indexOf(' ')+1);
        var tf = tf.substr(0,args.indexOf(' '));
        var sender = msg.author.username + '#' + msg.author.discriminator
        console.log(tf)
        fs.writeFile(currentDir + '/preferences/superSafeMode.txt', tf, function (err) 
        {
          if (err) throw err;
          console.log('Saved!');
        });
        if (sender == 'Merc#3336')
        {
          console.log('Sender confirmed.');
          msg.reply("I'll remember for the next restart senpai!");
        }
        else
        {
          msg.channel.send("Update will take effect on next restart, Senpai has been notified. Thank you.");
          client.users.get("322041078385737739").sendMessage(sender + ' updated the number of images in lewdbooru from: ' + msg.channel.name + ". Restart whenever available.");
        }
      }
    }
    else
    {
      console.log('Authority denied.');
      msg.reply("You don't have permission for that, baka.")
    }
  },
  reboot: function(arg, msg, adminRole, token, client)
  {
	if(msg.member.roles.find("name", adminRole))
    {
		try
		{
			// send channel a message that she's resetting
			msg.channel.send('Restarting...')
			.then(msg => client.destroy())
			.then(() => client.login(token));
		}
		catch(e)
		{
			console.log(e)
			msg.reply('Uh oh, collosal explosion internally. Report to Merc.')
		}
	}
  },
  changelog: function (arg, msg) 
	{
		console.log('Command recieved.');
		msg.reply({embed: 
        {
          color: 0xff5511,
          title: "Megumeme bot changelog as of version 2.3:",
          description: "A semi-detailed list of all recent changes. Only covers publically available builds.",
          fields: 
          [	
			{
				name: "2.3",
				value: "Minor changes: \nFixed icons in Danbooru and Lewdbooru commands. \nNow all pokemon commands use local assets for a faster response. \nFetching from PokeAPI command now removed after 10 seconds to prevent clutter. \nCleared up embed footers to make them more useful"
			},
			{
				name: "2.2",
				value: "Minor changes: \nSprites are now hosted locally. This should hopefully improve their load times in sprite and shinysprite...however not in the pokemon command because discord is still a pain in my ass. \nAdded exceptions to the link scanning feature for links we know are safe, I will keep expanding on this list over time. \nShe will now also tag links reported to be used for trolling, primarily with NSFW content."
			},
			{ 
              name: "2.1",
              value: "THE POKÉMON UPDATE: \nAdded the sprite and shinysprite commands for getting the in-game sprites of pokémon from various generations. Matcha can now focus on bigger, better things. \nAdded the stats command to find the base stats and abilities of pokémon. \nAdded the set command to show smogon's recommended set for a pokemon. \nAdded the pokemon command to get all of the above information in one window. \nImplemented automatic restart capabilities. Should something go wrong she should come back online, however this has not been thoroughly tested. \nDeveloper notes: \nThis was a massive update and added a bunch of new stuff to the bot (that honestly got kinda messy) so there may be bugs and tweaking will definitely be required. Let me know if you find any!"
            },
            { 
              name: "2.0",
              value: "THE SAFETY UPDATE: \nMegumeme will now scan decently formed URLs sent and notify users if they are potentially harmful. \nShe will also detect serious spamming in the chat and dish out appropriate punishments. \nUsers using overly offensive language will be logged until restart. Don't worry this is not to log your data it is so we have evidence if someone reports verbal abuse or genuine hate speech. \nOther additions: \nMinor changes: \nLewdbooru can now be used outside of NSFW channels when the safe rating is applied. \nAdded warning message when a video was grabbed by a booru bot since discord is a pain in my ass. \nRestructured changelog entries."
            },
            { 
              name: "1.7.2",
              value: "New additions: \nAdded the changelog command. \nMinor changes: \nAdded lewdbooru, gelbooru, and danbooru aliases for the lewd, gel, and dan commands appropriately. \nAdded maximum value option for rng command. \nAdded random alias for rng command. \nFixed a bunch of mistakes and typos throughout. \nAdded detail to help for new commands and their aliases."
            },
            { 
              name: "1.7",
              value: "New additions: \nAdded rng command. \nAdded giveaway command. \nMinor changes: \nFixed all error catching in booru commands (I think)."
            },
            { 
              name: "1.6",
              value: "FIRST PUBLICALLY AVAILABLE VERSION \nNew additions: \nProvided more admin commands such as toggling safe mode (check m!help admin). \nMinor changes:\nRepaired all major mistakes made in 1.5, including some more restructuring. \nChanged variable handling and changing. \nFixed minor mistakes and typos as usual."
            },
			{ 
              name: "1.5",
              value: "MAJOR RESTRUCTURE UPDATE: \nSeparated every part of the bot into separate files for organization purposes. \nMinor changes: \nFixed minor mistakes and typos as usual."
            }
          ]
		}
		});
	}
}