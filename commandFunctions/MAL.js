module.exports = 
{
	anime: function(arg, msg, username, password, MalApi, mal)
    {
		console.log('Command recieved.');
		//Passes arguments through to MAL API and returns the response to console until I can finish the command
		msg.channel.send('Sorry, this command is unavailable right now due to a problem with the API.')
		mal.manga.searchManga(arg)
		.then(res => console.log(res))
		.catch(err => console.error(err))
		msg.channel.sendMessage('Sorry, no anime was found with that name.')
    },
	manga: function(arg, msg, username, password, MalApi, mal)
    {
		console.log('Command recieved.');
		msg.channel.send('Sorry, this command is unavailable right now due to a problem with the API.')
		//Passes arguments through to MAL API and returns the response to console until I can finish the command
		mal.manga.searchManga(arg)
		.then(res => console.log(res))
		.catch(err => console.error(err))
		msg.channel.sendMessage('Sorry, no manga was found with that name.')
    }
}
