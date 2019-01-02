# Megumeme
An anime themed discord bot with commands of various types. Designed for personal use but can be configured to run on multiple servers at once.

This is a personal project, as such commenting is a bit subpar and will improve over time.

Coded in Node.js using the Discord.js module.

## If you plan to host this personally:
Create a folder in `/data/logs/` called `ServerName:ServerID` for each server you add the bot to. This directory is required for the bot to save logs of offensive language.

Open `/preferences/unchanging.js` and fill in the required data such as bot tokens and API keys.

Open `/preferences/AdminRole.txt` and change that to the name of the role you want to have access to admin commands.

Open `/commandFunctions/management.js` and change instances of `"YOUR USER ID HERE"` to your user ID (Or delete the lines to remove PMs when the the bot is triggered).

Open `/commandFunctions/pokemon.js` and change instances of `"DIRECTORYOFSPRITESHERE"` and `"DIRECTORYOFSHINYSPRITESHERE"` to wherever you are storing the sprites and shiny sprites respectively.

Create the folder `data` in the directory you intend to run the bot from and place inside it the `setdex_sm.js` file that can be found in the official damagecalc Git here: https://github.com/Zarel/honko-damagecalc and show some love to those guys while you're at it.
(This avoids the pathing conflict had previously, since I pull these assets from a source outside of the bot project itself.)

Install the following modules (can be done with `npm i`):
  >Discord.js, 
  >danbooru, 
  >request, 
  >xml2js, 
  >jquery,
  >superagent, 
  >jsdom, 
  >mal-api, 
  >request-promise, 
  >safe-browse-url-lookup, 
  >axios
  
**These may become unnecessary in future updates. Currently the bot contains some repeated code to be less resource intensive, this is likely to be removed over time.**
