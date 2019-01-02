module.exports = 
{
	urlCheck: function(msg, adminRole, browseKey, request, lookup, safeEmote, unsafeEmote, trollEmote)
	{
		const safeURLs = ['google.com', 'youtube.com', 'minecraft.net', 'play.pokemonshowdown', 'reddit.com', 'twitter.com', 'facebook.com', 'imgur.com', 'youtu.be', 'discordapp.net', 'discordapp.com', 'gfycat.com', 'pastebin.com', 'giphy.com'];
		const trollURLs = ['meatspin.cc', 'octopusgirl.com', 'ccrollbelow.com', '2girls1cup.cc', 'painolympics.info', '1man2needles.com', 'lolshock.com', 'prolapseman.com', 'walkthedinosaur.com', 'themacuser.org', 'loltrain.com', 'fruitlauncher.com', 'milkfountain.com', 'japscat.org', 'dadparty.com', 'hai2u.com', 'bottleguy.com', 'turdgasm.com', 'vomitgirl.org', '1priest1nun.com', 'bowlgirl.com', 'eelsoup.net', 'goatsegirl.org', 'clownsong.com', 'phonejapan.com', 'wormgush.com', 'whipcrack.org', 'funnelchair.com', 'lolhello.com', 'mudmonster.org', 'nutabuse.com', 'suckdude.com', 'tubgirl.me', 'lemonparty.biz', '1man1jar.org', 'meatspin.biz', 'selfpwn.org', 'goatse.biz', 'bluewaffle.biz', 'merryholidays.org', 'howtotroll.org', '2girls1finger.org', '2guys1stump.org', '3guys1hammer.ws', '1guy1cock.com', '1girl1pitcher', '4girlsfingerpaint.org', 'donotwatch.org'];
		var arg = msg.content.toLowerCase();
		var URLs = new Array();
		try
		{
			var httpURLs = (arg.match(new RegExp(/http\:\/\/(.*)\//g)));
			var httpsURLs = (arg.match(new RegExp(/https\:\/\/(.*)\//g)));
			var wwwURLs = (arg.match(new RegExp(/www\.(.*)\//g)));
			console.log(httpURLs + '\n' + httpsURLs + '\n' + wwwURLs);
			console.log('Of type: ' + typeof httpURLs);
			console.log('-----');
			if (httpURLs != null)
			{
				var count = 0;
				var toPush = httpURLs[0].split(" ");
				console.log('To push = ' + toPush);
				console.log('-----');
				var upTo = toPush.length;
				while (count < upTo)
				{
					URLs.push(toPush[count] + '/');
					var count = count + 1;
				};
			};
			if (httpsURLs != null)
			{
				var count = 0;
				var toPush = httpsURLs[0].split(" ");
				var upTo = toPush.length;
				while (count < upTo)
				{
					URLs.push(toPush[count] + '/');
					var count = count + 1;
				};  
			};
			if (wwwURLs != null)
			{
				var count = 0;
				var toPush = wwwURLs[0].split(" ");
				var upTo = toPush.length;
				while (count < upTo)
				{
					URLs.push(toPush[count] + '/');
					var count = count + 1;
				};
			};
			console.log(URLs)
			console.log('-----');
		}
		catch(e)
		{
			console.log(e);
			console.log('URL forming failed');
			console.log('-----');
		};
		try
		{
			console.log(URLs);
			console.log(typeof URLs);
			console.log('-----');
			if (URLs.length == 1)
			{
				if (safeURLs.some(safeURL => URLs[0].indexOf(safeURL) < 0))
				{
					console.log('Single URL check initiating');
					lookup.checkSingle(URLs[0])
					.then(isMalicious => 
					{
						console.log(isMalicious);
						console.log(isMalicious ? msg.react(unsafeEmote) : msg.react(safeEmote));
						console.log('-----');
					})
					.catch(err => 
					{
						console.log(err);
						console.log('-----');
					});
				}
			}
			else
			{ 
				console.log('multiple URL check initiating');
				lookup.checkMulti(URLs)
				.then(urlMap => 
				{
					for (let url in urlMap)
					{
						if (safeURLs.some(safeURL => url.indexOf(safeURL) > -1))
						{
							console.log('Safe link detected.');
							console.log('-----');
						}
						else if (trollURLs.some(trollURL => url.indexOf(trollURL) > -1))
						{
							console.log('Troll link detected.');
							console.log('-----');
							msg.react(trollEmote);
						}
						else
						{
							console.log(urlMap[url] ? msg.react(unsafeEmote) : msg.react(safeEmote));
							console.log('-----');
						};
					};
				})
				.catch(err => 
				{
					console.log(err);
					console.log('-----');
				});
			};
		}
		catch(e)
		{
			console.log(e);
			console.log('URL checked. Found probably not real. Could be an error in forming?');
			console.log('-----');
		};
	},
	spamCheck: function(arg, msg, msgHistory, client)
	{
		console.log('spamCheck initiated');
		var commonSender = msgHistory[msgHistory.length -1].Sender;
		var commonText = msgHistory[msgHistory.length -1].Content;
		var channelChecked = msgHistory[msgHistory.length -1].Channel;
		var highLength = 500;
		var lowLength = 7;
		var listOfSenders = [];
		var listOfContent = [];
		var listOfTimes = [];
		console.log('1');
		console.log(msgHistory);
		try
		{
			for(var i = 0; i < msgHistory.length; i++)
			{
				if(msgHistory[i].channel == channelChecked)
				{
					listOfSenders.push(msgHistory[i].Sender);
					listOfContent.push(msgHistory[i].Content);
					listOfTimes.push(msgHistory[i].Stamp);
				};
			};
		}
		catch(e)
		{
			console.log('Waiting for more messages...');
			console.log('-----');
			return;
		};
		console.log('2');
		var listOfRecentSenders = [];
		var listOfRecentContent = [];
		var listOfRecentTimes = [];
		var currentS = 0;
		var currentC = 0;
		var currentT = 0;
		for(var i = 0; i < msgHistory.length; i++)
		{
			listOfRecentSenders[currentS] = listOfSenders[i];
			currentS++;
		};
		for(var i = 0; i < msgHistory.length; i++)
		{
			listOfRecentContent[currentC] = listOfContent[i];
			currentC++;
		};
		for(var i = 0; i < msgHistory.length; i++)
		{
			listOfRecentTimes[currentT] = listOfTimes[i];
			currentT++;
		};
		
		var numOfRepeatSenders = 0;
		for(var i= listOfRecentSenders.length - 5; i < listOfRecentSenders.length; i++)
		{
			if(listOfRecentSenders[i] == listOfRecentSenders[listOfRecentSenders.length -1])
			{
				numOfRepeatSenders++;
			};
		};
		
		var numOfRepeatContent = 0;
		for(var i= listOfRecentContent.length - 3; i < listOfRecentContent.length; i++)
		{
			if(listOfRecentContent[i] == listOfRecentContent[listOfRecentContent.length -1])
			{
				numOfRepeatContent++;
			};
		};
		console.log('3');
		console.log(listOfRecentContent);
		try
		{
		if(listOfRecentContent[listOfRecentContent.length -1].length <= lowLength && listOfRecentContent[listOfRecentContent.length -2].length <= lowLength && listOfRecentContent[listOfRecentContent.length -3].length <= lowLength)
		{
			console.log('Short Content Detected');
			try
			{
				if(numOfRepeatSenders <= lowLength)
				{
					console.log('Waiting for reset');
					console.log('-----');
				};
			}
			catch(e)
			{
				msg.channel.send("Man, those are some short-ass messages dude.");
				client.users.get("YOUR USER ID HERE").send(msgHistory[msgHistory.length -1].Sender + ' has been spamming super short messages in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
			};
		}
		else if(listOfRecentContent[listOfRecentContent.length -1].length >= highLength && listOfRecentContent[listOfRecentContent.length -2].length >= highLength && listOfRecentContent[listOfRecentContent.length -3].length >= highLength)
		{
			console.log('Long Content Detected.');
			try
			{
				if(numOfRepeatContent >= lowLength)
				{
					console.log('Waiting for reset');
					console.log('-----');
				}
			}
			catch(e)
			{
				msg.channel.send("Man, those are some long-ass messages dude.");
				client.users.get("YOUR USER ID HERE").send(msgHistory[msgHistory.length -1].Sender + ' has been spamming super long messages in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
			};
		};
		}
		catch(e)
		{
			console.log(e)
		};
		console.log('5');
		if (numOfRepeatSenders > 5)
		{
			if (listOfRecentTimes[listOfRecentTimes.length -1] - listOfRecentTimes[1] < 1)
			{
				console.log('Spam Sender Detected.');
				console.log('-----');
				msg.reply("That's a lot of messages. Maybe think about using more than one sentence per message, yeah?");
				client.users.get("YOUR USER ID HERE").send(msgHistory[msgHistory.length -1].Sender + ' has been spamming messages frequently in: ' +  msgHistory[msgHistory.length -1].Server + ', in channel: ' + msgHistory[msgHistory.length -1].Channel);
				var oldHistory = msgHistory.splice(0,msgHistory.length);
				contentWarnings = 0;
			}
			else
			{
				console.log('Not soon enough.');
				console.log('-----');
			};
		}
		else if (numOfRepeatContent > 3)
		{
			if (listOfRecentTimes[listOfRecentTimes.length -1] - listOfRecentTimes[1] < 1)
			{
				console.log('Repeated Content Detected.');
				console.log('-----');
				msg.channel.send("Yo, guys. Could we have something different in here please?");
				client.users.get("YOUR USER ID HERE").send(msgHistory[msgHistory.length -1].Sender + ' has been spamming the message: ' + listOfRecentContent[listOfRecentContent.length -1] + ' in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
				var oldHistory = msgHistory.splice(0,msgHistory.length);
				contentWarnings = 0;
			}
			else
			{
				console.log('Not soon enough.');
				console.log('-----');
			};
		};
		console.log('6');
		console.log('-----');
	},
	offenseLog: function(arg, msg, msgHistory, fs, currentDir)
	{	
		forFile = 'Time: ' + msgHistory[msgHistory.length -1].Time + ' Sender: ' + msgHistory[msgHistory.length -1].Sender + ' Content: ' + msgHistory[msgHistory.length -1].Content + '\n';
		msgServer = msgHistory[msgHistory.length -1].Server;
		msgChannel = msgHistory[msgHistory.length -1].Channel;
		filePath = (currentDir + '/data/logs/' + msgServer + '/' + msgChannel + '.txt');
		console.log(forFile);
		console.log('-----');
		
        fs.appendFile(filePath, forFile, function (err) 
        {
			if (err) throw err;
			console.log('Saved, restarting...');
			console.log('-----');
		});
	}
}
