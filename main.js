///Megumeme Version 2.2
// Prepares required libraries
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = 'j!';
const prefixUpper = 'J!';
const Danbooru = require('danbooru');
const agent = require('superagent');
const request = require('request');
const parseString = require('xml2js').parseString;
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
const MalApi = require('mal-api');
var prefs = require(__dirname + '/preferences/unchanging.js');
var readline = require('readline');
var fs = require('fs');
var botStuffs = require(__dirname + '/commandFunctions/botStuffs.js');
var boorus = require(__dirname + '/commandFunctions/boorus.js');
var malFuncs = require(__dirname + '/commandFunctions/MAL.js');
var misc = require(__dirname + '/commandFunctions/misc.js');
var poke = require(__dirname + '/commandFunctions/pokemon.js');
var merc = require(__dirname + '/commandFunctions/mercSpecific.js');
var setList = require('/home/merc/shared/data/setdex_sm.js');
var security = require(__dirname + '/commandFunctions/management.js');
var nsfwEmote = '<:OctoLewd:466321966454800396>';
var questionEmote = '<:thonking:466323113479766035>';
var sfwEmote = '<:WoomyInABlanket:466322018552381440>';
var username = prefs.MALUser;
var password = prefs.MALPass;
var total = '';
var superSafeMode = '';
var adminRole = '';
var requestPromise = require("request-promise");
const lookup = require('safe-browse-url-lookup')({ apiKey: prefs.safeBrowseAPIKey });
const safeEmote = ':SafeLink:473264030883250176';
const unsafeEmote = ':PotentiallyUnsafeLink:473265094902546442';
var trollEmote = ':ReportedTrollLink:475754713107791872';
const axios = require('axios');
var msgHistory = new Array();
var msgIndex = 0;
var currentDir = __dirname
console.log(currentDir)

function capitalizeFirstLetter(string) 
{
	return string.charAt(0).toUpperCase() + string.slice(1);
}
var total = fs.readFile(__dirname + '/preferences/lewdNum.txt', 'utf8', function (err,data) 
{
	if (err) 
	{
		return console.log(err);
	}
	total = data
});
var superSafeMode = fs.readFile(__dirname + '/preferences/superSafeMode.txt', 'utf8', function (err,data) 
{
	if (err) 
	{
		return console.log(err);
	}
	superSafeMode = data
});
var adminRole = fs.readFile(__dirname + '/preferences/adminRole.txt', 'utf8', function (err,data) 
{
	if (err) 
	{
		return console.log(err);
	}
	adminRole = data
});
// Wait for ready to log into console
client.on('ready', () => 
{
	console.log('Authentication complete.');
	client.user.setPresence({ status: 'online', game: { name: 'with Chomusuke.' } });
});

//Activates checks when message recieved
client.on('message', msg => 
{
	//Sets time for logging purposes
	var time = new Date()
	timeStamp = (time.getHours() + ':' + time.getMinutes())
	//Checks if message contains URLs to check for malicious content
	if(msg.content.toLowerCase().indexOf('www.') > -1 || msg.content.toLowerCase().indexOf('http://') > -1 || msg.content.toLowerCase().indexOf('https://') > -1)
	{
	  security.urlCheck(msg, adminRole, prefs.safeBrowseAPIKey, requestPromise, lookup, safeEmote, unsafeEmote, trollEmote)
	}
	//Checks if message author is a bot. Ignores command if it is to prevent abuse of a bot's spamming capabilities.
	if (msg.author.bot == false)
	{
		var msgServer = (msg.channel.guild.name + ':' + msg.channel.guild.id);
		var msgChannel = (msg.channel.name + ':' + msg.channel.id);
		var sender = msg.author.username + '#' + msg.author.discriminator
	
		if (sender == 'Merc#3336')
		{
			if (msg.content.toLowerCase().startsWith('yo megu'))
			{
				merc.begin(arg, msg, client, adminRole, superSafeMode, total)
			}
			else if (msg.content.toLowerCase() == 'facepalm') 
			{
				msg.channel.send('https://www.youtube.com/watch?v=3O8J2locx5o')
			}
			else if (msg.content.toLowerCase() == 'do it') 
			{
			msg.channel.send('https://media.giphy.com/media/3o84sw9CmwYpAnRRni/giphy.gif')
			}
		};
		var messageDetails = {'MsgIndex':msgIndex, 'Time':timeStamp + ' (UTC)', 'Sender':sender,'Content':msg.content.toLowerCase(), 'Server':msgServer, 'Channel':msgChannel, 'Stamp':time.getMinutes()};
		msgIndex = msgIndex + 1;
		msgHistory.push(messageDetails);
		if (msgHistory[msgHistory.length -1].Content.toLowerCase().indexOf('cunt') > -1|| msgHistory[msgHistory.length -1].Content.indexOf('bimbo') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('bitch') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('fag') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('faggot') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('prick') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('wanker') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('hag') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('ratchet') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('slut') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('asshole') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('tranny') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('neckbeard') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('cunt') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('bugger') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('cocksucker') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('motherfucker') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('cuck') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('cuckold') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('wag') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('dyke') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('hag') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('twat') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('zhyd') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('crone') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('downy') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('downie') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('termagant') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('virago') > -1 || msgHistory[msgHistory.length -1].Content.indexOf('corrective rape') > -1|| msgHistory[msgHistory.length -1].Content.indexOf('spic') > -1)
		{
			security.offenseLog(arg, msg, msgHistory, fs, currentDir)
		}
		if (msg.channel.name.toLowerCase().indexOf('shitpost') <= -1 && msg.channel.name.toLowerCase().indexOf('spam') <= -1 && msg.channel.name.toLowerCase() != 'lewd')
		{
			try
			{
				if (msgHistory[msgHistory.length -1].Sender == msgHistory[msgHistory.length-2].Sender || msgHistory[msgHistory.length -1].Content == msgHistory[msgHistory.length -2].Content)
				{
					security.spamCheck(arg, msg, msgHistory, client)
				}
			}
			catch(e)
			{
				if(e == TypeError)
				{
				console.log('Only one message logged. Skipping...');
				}
			}
		}
		//Cancels all checks if prefix is not present at the start of message for performance
		if (!msg.content.toLowerCase().startsWith(prefix))
			return;
		//Checks if message is a command
		if (msg.content.toLowerCase().startsWith(prefix)) 
		{
			console.log('Command noticed.')
			//Converts string into necessary format
			var args = msg.content.toLowerCase().slice(prefix.length).trim()
			//figures out how to trim the command string based on presence of arguments
			if(args.indexOf(' ') > -1) 
			{
				var command = args.substr(0,args.indexOf(' '));
			}
			else
			{
				var command = args
			}
			var arg = args.substr(args.indexOf(' ')+1);
			console.log(command)
			console.log(arg)
			console.log('Command translated.')
	
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
				botStuffs.prefs(fs, arg, args, msg, adminRole, total, superSafeMode, currentDir)
			}
			else if (command == 'timewarp')
			{
				botStuffs.reboot(arg, msg, adminRole, prefs.token, client);
			}
			else if (command == 'dan' || command == 'danbooru') 
			{
				if (msg.channel.nsfw)
				{
					boorus.dan(arg, msg, Danbooru, sfwEmote, nsfwEmote, questionEmote, superSafeMode, adminRole)
				}
					else
				{
					msg.channel.send("B-Baka! We can't do that here...let's go somewhere marked NSFW.")
				}
			}
			else if (command == 'gel' || command == 'gelbooru') 
			{
				if (msg.channel.nsfw)
				{
					boorus.gel(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, superSafeMode, adminRole)
				}
				else
				{
					msg.channel.send("B-Baka! We can't do that here...let's go somewhere marked NSFW.")
				}
			}
			else if (command == 'lewd' || command == 'lewdbooru') 
			{
				if (msg.channel.nsfw || arg.indexOf('rating:safe') > -1)
				{
					boorus.lewd(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, superSafeMode, adminRole, total)
				}
				else
				{
					msg.channel.send("B-Baka! We can't do that here...let's go somewhere marked NSFW.")
				}
			}
			else if (command === 'anime')
			{
				malFuncs.anime(arg, msg, username, password, MalApi, mal)
			}
			else if (command === 'manga')
			{
				malFuncs.manga(arg, msg, username, password, MalApi, mal)
			}
			else if (command == 'explosion')
			{
				misc.explosion(arg, msg, $, prefs)
			}
			else if (command == 'tableflip' || command == 'deskflip')
			{
				misc.deskflip(arg, msg, $, prefs)
			}
			else if (command == 'ping')
			{
				msg.channel.sendMessage("Pong.\nI don't like this game.")
			}
			else if (command == 'rng'  || command == 'random')
			{	
				misc.rng(arg, msg)
			}	
			else if (command == 'giveaway')
			{
				misc.giveaway(arg, msg, client)
			}
			else if (command == 'celebrate')
			{
				misc.celebrate(arg, msg)
			}
			else if (command == 'sprite' || command == 'shinysprite' || command == 'ssprite')
			{
				poke.sprite(arg, msg, command)
			}
			else if (command == 'stats')
			{
				poke.stats(arg, msg, command, fs, $, capitalizeFirstLetter)
			}
			else if (command == 'set' || command == 'sets')
			{	
				poke.sets(arg, msg, command, fs, $, setList, capitalizeFirstLetter)
			}
			else if (command == 'pokemon')
			{
				poke.pokemon(arg, msg, command, fs, $, setList, capitalizeFirstLetter)
			}
			else if (command == 'test')
			{
				misc.test(arg, msg)
			}
			else
			{
				console.log('Command failure.')
				msg.channel.send("Sorry, that isn't a command yet! Try `m!help`.")
			}
		}
	}
	else
	{
		console.log('Bot message detected....Ignoring');
	}
});
//Log into discord with bot token
client.login(prefs.token);
console.log('Boot successful.');

//Load MAL login credentials
const mal = new MalApi(
{
  username, // The username of the user
  password, // The password of the user
});
