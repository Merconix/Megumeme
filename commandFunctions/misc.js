module.exports = 
{
  explosion: function(arg, msg, $, prefs)
    {
      console.log('Command recieved.')
      //Grabs top 5 posts from the "Explosion" search on GIPHY
      var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=explosion&api_key=" + prefs.APIKey + "&limit=5");
      //Waits until download is done to prevent process overtaking download
      xhr.done(function(data)
      { 
        console.log("Data grab successful.");
        //Randomises which of the 5 posts is shown
        var chosen = data.data[Math.floor(Math.random() * data.data.length)]
        //Grabs looping MP4 file from that image and embeds it into discord message
        var final = chosen.images.looping.mp4
        console.log(final)
        msg.channel.send('',
        {
          file: final
        });
      });
    },
    deskflip: function(arg, msg, $, prefs)
    {
      console.log('Command recieved.')
      msg.channel.send('',
      {
        file: 'https://img00.deviantart.net/0bac/i/2013/091/f/c/desk_flip_guy_in_hd_by_lemmino-d6021t4.png'
      });
    },
	rng: function(arg, msg)
    {
    console.log('Command recieved.');
		try
		{
			if (arg == '' || arg == 'rng' || arg =='random')
			{
				var arg = 100
			}
			var randNum = Math.floor(Math.random() * arg)
			msg.channel.send('Your random number is: ' + randNum)
		}
		catch(e)
		{
			console.log(e)
			msg.reply("Sorry about that, it seems I've failed. Make sure you selected a number as your maximum value!")
		}
    },
	giveaway: function(arg, msg, client)
    {
    console.log('Command recieved.');
		var chan = msg.channel;
		var mems = chan.members;
		var counter = 0
		var viable = []
		try
		{
			for (let [snowflake, guildMember] of mems) 
			{ 
				console.log('snowflake: ' + snowflake);
				console.log('id: ' + guildMember.id);
				console.log('user id: ' + guildMember.user.id);
				console.log(client.users.get(guildMember.user.id));
				var user = client.users.get(guildMember.user.id);
				if (user.bot == false && (user.username + '#' + user.discriminator) != (msg.author.username + '#' + msg.author.discriminator))
				{
					viable.push(user.id);
				}
			};
			console.log(viable)
			msg.channel.send('<@' + viable[Math.floor(Math.random() * viable.length)] + '> PM ' + msg.author + ' to win your prize!')
		}
		catch(e)
		{
			console.log(e)
			msg.reply("Sorry about that, it seems I've failed. It seems the channel has no viable users.")
		}
	},
	celebrate: function(arg, msg)
  {
		msg.channel.send('',
		{
		  file: 'https://media.giphy.com/media/TPkLd5oec1SzS/giphy.gif'
		});
	},
	chucknorris: function(arg, msg)
	{
	const url = `https://api.chucknorris.io/jokes/random`;

	var footer = `Requested by: ${msg.author.tag} | Provided by api.chucknorris.io`;
	
	var rp = require('request-promise');	
	rp({uri: url,
			json: true})
	.then(function(data) {
		msg.channel.send({embed: {
			timestamp: new Date(),
			color: 0xdd67ff,
			fields: [{
				name: "Chuck Norris",
				value: data.value
			}],
			footer: {
				text: footer
			}
		}});
	})
	.catch(function (err) {
		msg.channel.send("`⊙﹏⊙ Sorry. This is broken right now.`")
	});
	}
}
