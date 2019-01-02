///Megumeme Version 2.4
// Prepares required libraries
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'm!';
const Danbooru = require('danbooru');
const request = require('request');
const parseString = require('xml2js').parseString;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
const $ = jQuery = require('jquery')(window);
const MalApi = require('mal-api');
const prefs = require(__dirname + '/preferences/unchanging.js');
const readline = require('readline');
const fs = require('fs');
const botStuffs = require(__dirname + '/commandFunctions/botStuffs.js');
const boorus = require(__dirname + '/commandFunctions/boorus.js');
const malFuncs = require(__dirname + '/commandFunctions/MAL.js');
const misc = require(__dirname + '/commandFunctions/misc.js');
const poke = require(__dirname + '/commandFunctions/pokemon.js');
const merc = require(__dirname + '/commandFunctions/mercSpecific.js');
const setList = require('/home/merc/shared/data/setdex_sm.js');
const security = require(__dirname + '/commandFunctions/management.js');
const nsfwEmote = '<:OctoLewd:466321966454800396>';
const questionEmote = '<:thonking:466323113479766035>';
const sfwEmote = '<:WoomyInABlanket:466322018552381440>';
const username = prefs.MALUser;
const password = prefs.MALPass;
const requestPromise = require("request-promise");
const lookup = require('safe-browse-url-lookup')({ apiKey: prefs.safeBrowseAPIKey });
const safeEmote = ':SafeLink:473264030883250176';
const unsafeEmote = ':PotentiallyUnsafeLink:473265094902546442';
const trollEmote = ':ReportedTrollLink:475754713107791872';
const msgHistory = new Array();
const currentDir = __dirname;
const offensiveWords = ['cunt', 'bimbo', 'bitch', 'fag', 'faggot', 'prick', 'wanker', 'hag', 'ratchet', 'slut', 'asshole', 'tranny', 'neckbeard', 'cunt', 'bugger', 'cocksucker', 'motherfucker', 'cuck', 'cuckold', 'wag', 'hag', 'dyke', 'twat', 'zhyd', 'crone', 'downy', 'downie', 'termagant', 'virago', 'corrective rape', 'spic'];
const channelList = ['shitpost', 'spam', 'lewd'];
var msgIndex = 0;

console.log('-----');
console.log('Libraries prepped!');
console.log('-----');
console.log('Current working directory: ' + currentDir);
console.log('-----');

const total = fs.readFileSync(__dirname + '/preferences/lewdNum.txt', 'utf8');
const safeStatus = fs.readFileSync(__dirname + '/preferences/safeStatus.txt', 'utf8');
const adminRole = fs.readFileSync(__dirname + '/preferences/adminRole.txt', 'utf8');
//Credits to Emy for making this work somehow, I couldn't figure out why it wouldn't work before.
console.log('Lewd total: ' + total);
console.log('Safety status: ' + safeStatus);
console.log('Admin role: ' + adminRole);
console.log('-----');

function capitalizeFirstLetter(string) 
{
	return string.charAt(0).toUpperCase() + string.slice(1);
};

//Log into discord with bot token
client.login(prefs.token);
console.log('Boot successful.');
console.log('-----');

// Wait for ready to log into console
client.on('ready', () => 
{
	console.log('Authentication complete.');
	console.log('-----');
	client.user.setPresence({ status: 'online', game: { name: 'with Chomusuke.' } });
});

//Load MAL login credentials
const mal = new MalApi(
{
  username, // The username of the user
  password, // The password of the user
});

var now = new Date();
var millisTill12 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0) - now;
if (millisTill12 < 0) {
     millisTill12 += 86400000; // it's after 10am, try 10am tomorrow.
}
setTimeout(function()
{
	client.users.get("YOUR USER ID HERE").send("Get up you lazy sod, if I am you have to be.");
	console.log("It's midday...Notifying of uptime");
	console.log('-----');
	
}, millisTill12);

//Activates checks when message recieved
client.on('message', msg => 
{
	//Responds to DMs/bot messages separately and ignores them to avoid crashes.
	if(msg.guild === null && msg.author.username != 'Jyansei' && msg.author.username != 'Megumeme')
	{
		msg.author.send('I currently do not work with DMs.');
		console.log('DM Ignored.');
		console.log('-----');
		return;
	};
	if (msg.author.bot != false)
	{
		console.log('Bot message detected....Ignoring');
		console.log('-----');
		return;
	};
	//Checks if message contains URLs to check for malicious content
	if(msg.content.toLowerCase().indexOf('www.') > -1 || msg.content.toLowerCase().indexOf('http://') > -1 || msg.content.toLowerCase().indexOf('https://') > -1)
	{
	  security.urlCheck(msg, adminRole, prefs.safeBrowseAPIKey, requestPromise, lookup, safeEmote, unsafeEmote, trollEmote)
	};
	
	//Sets details for logging and various specifics.
	var time = new Date();
	timeStamp = (time.getHours() + ':' + time.getMinutes());
	var msgServer = (msg.channel.guild.name + ':' + msg.channel.guild.id);
	var msgChannel = (msg.channel.name + ':' + msg.channel.id);
	var sender = msg.author.username + '#' + msg.author.discriminator;
	var messageDetails = {'MsgIndex':msgIndex, 'Time':timeStamp + ' (UTC)', 'Sender':sender,'Content':msg.content.toLowerCase(), 'Server':msgServer, 'Channel':msgChannel, 'Stamp':time.getMinutes()};
	msgIndex = msgIndex + 1;
	msgHistory.push(messageDetails);
		
	//Checks if sender was yours truly. If so looks for conversation starters.
	if (sender == 'YourName#YourNumber')
	{
		if (msg.content.toLowerCase().startsWith('yo megu'))
		{
			merc.begin(arg, msg, client, adminRole, safeStatus, total);
		}
		else if (msg.content.toLowerCase() == 'facepalm') 
		{
			msg.channel.send('https://www.youtube.com/watch?v=3O8J2locx5o');
		}
		else if (msg.content.toLowerCase() == 'do it') 
		{
			msg.channel.send('https://media.giphy.com/media/3o84sw9CmwYpAnRRni/giphy.gif');
		};
	};
	
	//Scans for the presence of words deemed too offensive as defined in the array constant above. Credits to Emy for writing out the array when I was too lazy.	
	if (offensiveWords.some(offensiveWord => (msgHistory[msgHistory.length -1].Content).indexOf(offensiveWord) > -1))
	{
		security.offenseLog(arg, msg, msgHistory, fs, currentDir);
	};
		
	//Searches for if channel is whitelisted from spam filter as defined in the array constant above.
	if (channelList.some(channel => (msg.channel.name).indexOf(channel) < 0))
	{
		try
		{
			if (msgHistory[msgHistory.length -1].Sender == msgHistory[msgHistory.length-2].Sender || msgHistory[msgHistory.length -1].Content == msgHistory[msgHistory.length -2].Content)
			{
				security.spamCheck(arg, msg, msgHistory, client);
			};
		}
		catch(e)
		{
			if(e == TypeError)
			{
				console.log('Only one message logged. Skipping...');
				console.log('-----');
			};
		};
	};
		
	//Cancels all checks if prefix is not present at the start of message for performance
	if (!msg.content.toLowerCase().startsWith(prefix))
	{
		return;
	};
	
	console.log('Command noticed.');
	console.log('-----');
	
	//Converts string into necessary format
	var args = msg.content.toLowerCase().slice(prefix.length).trim();
	//figures out how to trim the command string based on presence of arguments
	if(args.indexOf(' ') > -1) 
	{
		var command = args.substr(0,args.indexOf(' '));
	}
	else
	{
		var command = args;
	};
	var arg = args.substr(args.indexOf(' ')+1);
	console.log('Command: ' + command);
	console.log('Argument: ' + arg);
	console.log('Command translated.');
	console.log('-----');
	
	//Deciding which command to use
	if (command == 'info') 
	{
		botStuffs.info(arg, msg);
	}
	else if (command == 'changelog') 
	{
		botStuffs.changelog(arg, msg);
	}
	else if (command == 'help')
	{		
		botStuffs.help(arg, msg, adminRole);
	}
	else if (command == 'prefs')
	{
		botStuffs.prefs(fs, arg, args, msg, adminRole, total, safeStatus, currentDir, client);
	}
	else if (command == 'timewarp')
	{
		botStuffs.reboot(arg, msg, adminRole, prefs.token, client);
	}
	else if (command == 'dan' || command == 'danbooru') 
	{
		if (msg.channel.nsfw)
		{
			boorus.dan(arg, msg, Danbooru, sfwEmote, nsfwEmote, questionEmote, safeStatus, adminRole);
		}
			else
		{
			msg.channel.send("B-Baka! We can't do that here...let's go somewhere tagged NSFW.");
		};
	}
	else if (command == 'gel' || command == 'gelbooru') 
	{
		if (msg.channel.nsfw)
		{
			boorus.gel(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, safeStatus, adminRole);
		}
		else
		{
			msg.channel.send("B-Baka! We can't do that here...let's go somewhere tagged NSFW.");
		};
	}
	else if (command == 'lewd' || command == 'lewdbooru') 
	{
		if (msg.channel.nsfw || arg.indexOf('rating:safe') > -1)
		{
			boorus.lewd(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, safeStatus, adminRole, total);
		}
		else
		{
			msg.channel.send("B-Baka! We can't do that here...let's go somewhere marked NSFW.");
		};
	}
	else if (command === 'anime')
	{
		malFuncs.anime(arg, msg, username, password, MalApi, mal);
	}
	else if (command === 'manga')
	{
		malFuncs.manga(arg, msg, username, password, MalApi, mal);
	}
	else if (command == 'explosion')
	{
		misc.explosion(arg, msg, $, prefs);
	}
	else if (command == 'tableflip' || command == 'deskflip')
	{
		misc.deskflip(arg, msg, $, prefs);
	}
	else if (command == 'ping')
	{
		msg.channel.sendMessage("Pong.\nI don't like this game.");
	}
	else if (command == 'rng'  || command == 'random')
	{	
		misc.rng(arg, msg);
	}	
	else if (command == 'giveaway')
	{
		misc.giveaway(arg, msg, client);
	}
	else if (command == 'celebrate')
	{
		misc.celebrate(arg, msg);
	}
	else if (command == 'sprite' || command == 'shinysprite' || command == 'ssprite' || command == 'stats' || command == 'sets' || command === 'set' || command == 'pokemon')
	{
		poke.full(arg, msg, command, poke, fs, $, capitalizeFirstLetter, setList);
	}
	else if (command == 'test')
	{
		misc.test(arg, msg);
	}
	else
	{
		console.log('Command failure.')
		console.log('-----');
		msg.channel.send("Sorry, that isn't a command yet! Try `m!help`.")
	};
});
