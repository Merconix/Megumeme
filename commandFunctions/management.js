module.exports = 
{
  
	urlCheck: function(msg, adminRole, browseKey, request, lookup, safeEmote, unsafeEmote, trollEmote)
  {
    var arg = msg.content.toLowerCase();
    var URLs = new Array();
		try
		{
      var httpURLs = (arg.match(new RegExp(/http\:\/\/(.*)\//g)));
      var httpsURLs = (arg.match(new RegExp(/https\:\/\/(.*)\//g)));
      var wwwURLs = (arg.match(new RegExp(/www\.(.*)\//g)));
      console.log(httpURLs + '\n' + httpsURLs + '\n' + wwwURLs)
      console.log(typeof httpURLs)
      if (httpURLs != null)
      {
        var count = 0;
        var toPush = httpURLs[0].split(" ");
        console.log('toPush = ' + toPush)
        var upTo = toPush.length;
        while (count < upTo)
        {
          URLs.push(toPush[count] + '/')
          var count = count + 1
        };
      }
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
      }
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
      }
      console.log(URLs)  
    }
		catch(e)
		{
      console.log(e)
      console.log('URL forming failed')
		}
    try
    {
      console.log(URLs)
      console.log(typeof URLs)
      if (URLs.length == 1)
      {
		if (URLs[0].indexOf('google.com') == -1 && URLs[0].indexOf('youtube.com') == -1 && URLs[0].indexOf('minecraft.net') == -1 && URLs[0].indexOf('play.pokemonshowdown') == -1 && URLs[0].indexOf('reddit.com') == -1 && URLs[0].indexOf('twitter.com') == -1 && URLs[0].indexOf('facebook.com') == -1 && URLs[0].indexOf('imgur.com') == -1 && URLs[0].indexOf('youtu.be') == -1 && URLs[0].indexOf('discordapp.net') == -1 && URLs[0].indexOf('discordapp.com') == -1 && URLs[0].indexOf('gfycat.com') == -1 && URLs[0].indexOf('pastebin.com') == -1 && URLs[0].indexOf('giphy.com') == -1 )
        {
			console.log('Single URL check initiating');
			lookup.checkSingle(URLs[0])
			.then(isMalicious => {
			console.log(isMalicious)
			console.log(isMalicious ? msg.react(unsafeEmote) : msg.react(safeEmote));
			})
			.catch(err => {
			console.log('So sad...');
			console.log(err);
			});
		}
      }
      else
      { 
        console.log('multiple URL check initiating');
        lookup.checkMulti(URLs)
        .then(urlMap => {
          for (let url in urlMap)
		  {
			  if (url.indexOf('google.com') == -1 && url.indexOf('youtube.com') == -1 && url.indexOf('minecraft.net') == -1 && url.indexOf('play.pokemonshowdown') == -1 && url.indexOf('reddit.com') == -1 && url.indexOf('twitter.com') == -1 && url.indexOf('facebook.com') == -1 && url.indexOf('imgur.com') == -1 && url.indexOf('youtu.be') == -1 && url.indexOf('discordapp.net') == -1 && url.indexOf('discordapp.com') == -1 && url.indexOf('gfycat.com') == -1 && url.indexOf('pastebin.com') == -1 && url.indexOf('giphy.com') == -1 )
				{
					if(url.indexOf('meatspin.cc') != -1 || url.indexOf('octopusgirl.com') != -1 || url.indexOf('ccrollbelow.com') != -1 || url.indexOf('2girls1cup.cc') != -1 || url.indexOf('painolympics.info') != -1 || url.indexOf('1man2needles.com') != -1 || url.indexOf('lolshock.com') != -1 || url.indexOf('prolapseman.com') != -1 || url.indexOf('walkthedinosaur.com') != -1 || url.indexOf('themacuser.org') != -1 || url.indexOf('loltrain.com') != -1 || url.indexOf('fruitlauncher.com') != -1 || url.indexOf('milkfountain.com') != -1 || url.indexOf('japscat.org') != -1 || url.indexOf('dadparty.com') != -1 || url.indexOf('hai2u.com') != -1 || url.indexOf('bottleguy.com') != -1 || url.indexOf('turdgasm.com') != -1 || url.indexOf('vomitgirl.org') != -1 || url.indexOf('1priest1nun.com') != -1 || url.indexOf('bowlgirl.com') != -1 || url.indexOf('eelsoup.net') != -1 || url.indexOf('goatsegirl.org') != -1 || url.indexOf('clownsong.com') != -1 || url.indexOf('phonejapan.com') != -1 || url.indexOf('wormgush.com') != -1 || url.indexOf('whipcrack.org') != -1 || url.indexOf('funnelchair.com') != -1 || url.indexOf('lolhello.com') != -1 || url.indexOf('mudmonster.org') != -1 || url.indexOf('nutabuse.com') != -1 || url.indexOf('suckdude.com') != -1 || url.indexOf('tubgirl.me') != -1 || url.indexOf('lemonparty.biz') != -1 || url.indexOf('1man1jar.org') != -1 || url.indexOf('meatspin.biz') != -1 || url.indexOf('thehomo.org') != -1 || url.indexOf('selfpwn.org') != -1 || url.indexOf('goatse.biz') != -1 || url.indexOf('bluewaffle.biz') != -1 || url.indexOf('merryholidays.org') != -1 || url.indexOf('howtotroll.org') != -1 || url.indexOf('2girls1finger.org') != -1 || url.indexOf('2guys1stump.org') != -1 || url.indexOf('3guys1hammer.ws') != -1 || url.indexOf('1guy1cock.com') != -1 || url.indexOf('1girl1pitcher') != -1 || url.indexOf('4girlsfingerpaint.org') != -1 || url.indexOf('donotwatch.org') != -1)
					{
						console.log('Troll link detected.');
						msg.react(trollEmote);
					}
					else
					{
						console.log(urlMap[url] ? msg.react(unsafeEmote) : msg.react(safeEmote));
					}
				}
          }
        })
        .catch(err => {
          console.log('So sad...');
          console.log(err);
        });
      }
    }
    catch(e)
    {
      console.log(e)
      console.log('URL checked. Found probably not real. Could be an error in forming?')
    }
  },
  spamCheck: function(arg, msg, msgHistory, client)
  {
    console.log('spamCheck initiated')
    var commonSender = msgHistory[msgHistory.length -1].Sender;
    var commonText = msgHistory[msgHistory.length -1].Content;
    channelChecked = msgHistory[msgHistory.length -1].Channel;
    var highLength = 500;
    var lowLength = 5;
    var listOfSenders = [];
    var listOfContent = [];
    var listOfTimes = [];
    try
    {
      for(var i = 0; i < msgHistory.length; i++)
      {
        if(msgHistory[i].Channel == channelChecked)
        {
          listOfSenders.push(msgHistory[i].Sender);
          listOfContent.push(msgHistory[i].Content);
          listOfTimes.push(msgHistory[i].Stamp);
        }
      }
    }
    catch(e)
    {
      console.log(e)
    }

    var listOfRecentSenders = [];
    var listOfRecentContent = [];
    var listOfRecentTimes = [];
    var currentS = 0
    var currentC = 0
    var currentT = 0
    for(var i = listOfSenders.length - 6; i < msgHistory.length; i++)
    {
      listOfRecentSenders[currentS] = listOfSenders[i]
      currentS++
    }
    for(var i = listOfContent.length - 6; i < msgHistory.length; i++)
    {
      listOfRecentContent[currentC] = listOfContent[i]
      currentC++
    }
    for(var i = listOfTimes.length - 6; i < msgHistory.length; i++)
    {
      listOfRecentTimes[currentT] = listOfTimes[i]
      currentT++
    }
    var numOfRepeatSenders = 0
    for(var i=0;i<listOfRecentSenders.length;i++)
    {
      if(listOfRecentSenders[i] === listOfRecentSenders[listOfRecentSenders.length -1])
      numOfRepeatSenders++;
    }
    var numOfRepeatContent = 0
    for(var i=0;i<listOfRecentContent.length;i++)
    {
      if(listOfRecentContent[i] === listOfRecentContent[listOfRecentContent.length -1])
      numOfRepeatContent++;
    }
      if(listOfRecentContent[listOfRecentContent.length -1].length <= lowLength && listOfRecentContent[listOfRecentContent.length -2].length <= lowLength && listOfRecentContent[listOfRecentContent.length -3].length <= lowLength)
      {
        console.log('Short Content Detected')
        try
        {
          if(listOfRecentContent[listOfRecentContent.length -4].length <= lowLength)
          {
            console.log('Waiting for reset')
          }
        }
        catch(e)
        {
          msg.channel.send("Man, those are some short-ass messages dude.")
          client.users.get("322041078385737739").sendMessage(msgHistory[msgHistory.length -1].Sender + ' has been spamming super short messages in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
        }
      }
      else if(listOfRecentContent[listOfRecentContent.length -1].length >= highLength && listOfRecentContent[listOfRecentContent.length -2].length >= highLength && listOfRecentContent[listOfRecentContent.length -3].length >= highLength)
      {
        console.log('Long Content Detected.');
        try
        {
          if(listOfRecentContent[listOfRecentContent.length -4].length >= lowLength)
          {
            console.log('Waiting for reset')
          }
        }
        catch(e)
        {
          msg.channel.send("Man, those are some long-ass messages dude.")
          client.users.get("322041078385737739").sendMessage(msgHistory[msgHistory.length -1].Sender + ' has been spamming super long messages in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
        }
      }
    if (numOfRepeatSenders > 7)
    {
      if (listOfRecentTimes[listOfRecentTimes.length -1] - listOfRecentTimes[1] < 1)
      {
        console.log('Spam Sender Detected.');
        msg.reply("That's a lot of messages. Maybe think about using more than one sentence per message, yeah?")
        client.users.get("322041078385737739").sendMessage(msgHistory[msgHistory.length -1].Sender + ' has been spamming messages frequently in: ' +  msgHistory[msgHistory.length -1].Server + ', in channel: ' + msgHistory[msgHistory.length -1].Channel);
        var oldHistory = msgHistory.splice(0,msgHistory.length);
        contentWarnings = 0
      }
      else
      {
        console.log('Not soon enough.')
      }
    }
    else if (numOfRepeatContent > 7)
    {
      if (listOfRecentTimes[listOfRecentTimes.length -1] - listOfRecentTimes[1] < 1)
      {
        console.log('Repeated Content Detected.');
        msg.channel.send("Yo, guys. Could we have something different in here please?")
        client.users.get("322041078385737739").sendMessage(msgHistory[msgHistory.length -1].Sender + ' has been spamming the message: ' + listOfRecentContent[listOfRecentContent.length -1] + ' in: '+  msgHistory[msgHistory.length -1].Server + ', in channel:' + msgHistory[msgHistory.length -1].Channel);
        var oldHistory = msgHistory.splice(0,msgHistory.length);
        contentWarnings = 0
      }
      else
      {
        console.log('Not soon enough.')
      }
    }
  },
  offenseLog: function(arg, msg, msgHistory, fs, currentDir)
  {
    forFile = 'Time: ' + msgHistory[msgHistory.length -1].Time + ' Sender: ' + msgHistory[msgHistory.length -1].Sender + ' Content: ' + msgHistory[msgHistory.length -1].Content + '\n';
    msgServer = msgHistory[msgHistory.length -1].Server
    msgChannel = msgHistory[msgHistory.length -1].Channel
    console.log(forFile)
    var filePath = (currentDir + '/data/logs/' + msgServer + '/' + msgChannel + '.txt')
    
        fs.appendFile(filePath, forFile, function (err) 
        {
          if (err) throw err;
          console.log('Saved');
        });
  }
}