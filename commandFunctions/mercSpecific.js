module.exports = 
{
  begin: function(arg, msg, client, adminRole, superSafeMode, total)
    {
		if (msg.content.toLowerCase().indexOf('you there?') > -1)
		{
			console.log('Conversation recieved.');
			msg.channel.send('Always, what would the world be without our explosions?');
		}
		else if (msg.content.toLowerCase().indexOf("what's up?") > -1)
		{
			console.log('Conversation recieved.');
			msg.channel.send('Uh...the usual');
		}
		else if (msg.content.toLowerCase().indexOf("how many") > -1)
		{
			if (msg.content.toLowerCase().indexOf("images") > -1 && msg.content.toLowerCase().indexOf("lewdbooru") > -1) 
			{
				console.log('Conversation recieved.');
				msg.channel.send(total + ' images.');
			}
		}
		else if (msg.content.toLowerCase().indexOf("is") > -1)
		{
			if ((msg.content.toLowerCase().indexOf("supersafemode") > -1 || msg.content.toLowerCase().indexOf("safe mode") > -1) && (msg.content.toLowerCase().indexOf("enabled") > -1 || msg.content.toLowerCase().indexOf("disabled") || msg.content.toLowerCase().indexOf("on") || msg.content.toLowerCase().indexOf("off"))) 
			{
				try
				{
					console.log('Conversation recieved.');
					if (superSafeMode == 'true')
					{
						msg.channel.send('Super Safe Mode is enabled. NSFW content featuring lolicon and/or shotacon will be avoided.');
					}
					else if (superSafeMode == 'false')
					{
						msg.channel.send('Super Safe Mode is disabled. NSFW content featuring lolicon and/or shotacon will be kept in the search.');
					}
					else
					{
						msg.channel.send("Sorry senpai, it seems that flag isn't set yet. Something must be wrong.");
					}
				}
				catch(e)
				{
					console.log('Conversation recieved.');
					console.log(e);
					msg.channel.send("Sorry senpai, it seems that flag isn't set yet. Something must be wrong.");
				}
			}
		}
		else if (msg.content.toLowerCase().indexOf('are explosions good?') > -1)
		{
			console.log('Conversation recieved.');
			msg.channel.send('OF COURSE',
			{
				file: 'https://media1.tenor.com/images/f4dc9b8602807ccc73d1579d9f59a1cd/tenor.gif?itemid=5827518.gif'
			});
		}
		else
		{
			console.log('Conversation recieved.');
			msg.channel.send('Senpai noticed me! OwO');
		}
	}
}

