# Megumeme
An anime themed discord bot with commands of various types. Designed for personal use but can be configured to run on multiple servers at once.

This is a personal project, as such commenting is a bit subpar and will improve over time.

Coded in Node.js using the Discord.js module.

## If you plan to host this personally:
Create a folder in `/data/logs/` called `ServerName:ServerID` for each server you add the bot to. This directory is required for the bot to save logs of offensive language.

Open `/preferences/unchanging.js` and fill in the required data such as bot tokens and API keys.

Open `/preferences/AdminRole.txt` and change that to the name of the role you want to have access to admin commands.

Open `/commandFunctions/management.js` and change instances of `"YOUR USER ID HERE"` to your user ID (Or delete the lines to remove PMs when the the bot is triggered).

Install the following modules:
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
