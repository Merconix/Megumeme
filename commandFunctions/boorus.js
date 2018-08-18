module.exports = 
{
  dan: function(arg, msg, Danbooru, sfwEmote, nsfwEmote, questionEmote, superSafeMode, adminRole)
    {
			console.log('Command recieved.');
      console.log(arg)
			// Perform a search for popular image posts
			var booru = new Danbooru();
      if (arg == 'random' || arg == 'dan')
      {
        var arg = ('');
      }
      else
      {
        var spaceCount = ((arg.match(/ /g) || []).length);
        console.log(spaceCount)
        console.log(typeof spaceCount)
        if(spaceCount > 1)
        {
          msg.channel.send("Sorry, Danbooru doesn't let us search more than 2 tags ;-;")
          return;
        };
      }
      console.log(arg)
      booru.posts().then(posts => 
      {
				booru.posts({ tags: arg}).then(posts => 
        {
					// Select a random post from posts array
					var index = Math.floor(Math.random() * posts.length);
					var post = posts[index];
					// Get post's url and create a filename for it
            try
            {
              var url = booru.url(post.file_url);
					    var name = `${post.md5}.${post.file_ext}`;
					    console.log('URL grab successful.');
              console.log(url)
              var fixedURL = url.href.replace('us//', 'us/')
					    // Bypass download and copy direct url straight to discord's file embedding
					    require('https').get(url, response => 
              {
                if (post.rating == 's')
                {
                  var rating = 'safe' + sfwEmote
                }
                else if (post.rating == 'q')
                {
                  var rating = 'questionable' + questionEmote
                }
                else if (post.rating == 'e')
                {
                  var rating = 'explicit' + nsfwEmote
                }
                msg.channel.send({embed: 
                {
                  "title": 'ID: ' + post.id,
                  "url": 'https://danbooru.donmai.us/posts/' + post.id,
                  "color": 0xff5511,
                  ///"timestamp": "2018-07-16T23:26:49.041Z",
                  "footer": 
                  { 
                    "icon_url": "https://i.imgur.com/XWE7GV8.jpg",
                    "text": "Click on the post ID for it's details. Very large images may not preview."
                  },
                  "image":
                  {
                    "url": fixedURL
                  },
                  "author": 
                  {
                    "name": "Danbooru",
                    "url": "https://danbooru.donmai.us",
                    "icon_url": "https://i.imgur.com/88HP9ik.png"
                  },
                  "fields": [
                  {                    "name": "Score:",
                    "value": post.score,
                    "inline": true
                  },
                  {
                    "name": "Rating:",
                    "value": rating,
                    "inline": true
                  }
                  ]                
                }
              });
              if (fixedURL.indexOf('.webm') > -1 || fixedURL.indexOf('.mp4') > -1)
              {
                msg.channel.send("Video file detected (discord doesn't like these, they're big). Click the ID to view if you really want it.");
              }
            });
            }
            catch (e) 
            {
              console.log(e)
              if (e instanceof TypeError)
              {
                msg.reply('Sorry, it appears your search returned no images.')
                console.log('ERROR: IMAGE NOT FOUND')
              }
            }
        });
			});
	  },
		gel: function(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, superSafeMode, adminRole) 
    {
      console.log('Command recieved.');
      console.log(arg)
      //Adds "new" sort to posts to get more variety when searching
      var arg = arg + '+sort:new:asc'
      //Checks if argument is "random" or not there at all since there is no real random tag, then searches separately if it is
      if (arg == 'random+sort:new:asc' || arg == 'gel+sort:new:asc' || arg == 'gelbooru+sort:new:asc')
      {
        if (superSafeMode == 'true' && !msg.member.roles.find("name", adminRole))
        {
          var arg = '+-loli+-shota+sort:new:asc'
          var address = 'http://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&json=1&tags=' + arg
          console.log('Safe mode tags integrated.')
        }
        else
        {
          var address = 'http://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&json=1&tags=sort:new:asc'
        }
      }
      //Otherwise, it adds tags as normal and moves on
      else
      {
        var tags = arg.trim().split(/ +/g);
        var upTo = tags.length
        var counter = 1
        var address = 'http://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=100&json=1&tags=' + tags[0]
        // Adds tags one by one into URL with correct formatting
        while (counter != upTo)
        {
          var address = address + '+' + tags[counter]
          var counter = counter + 1
        }
        if (superSafeMode == 'true' && !msg.member.roles.find("name", adminRole))
        {
          var address = address + '+-loli+-shota'
          console.log('Safe mode tags integrated.')
        }
      }
      console.log(address);
      //Caching data from API for manipulation
      request({
      url: address,
      json: true
      }, function (error, response, body) 
      {
        //Checks for error and response codes so process does not overtake the retrieval of data
        if (!error && response.statusCode === 200) 
        {
          try
          {
            //Randomises which of 100 posts it grabs and sends
          var final = body[Math.floor(Math.random() * body.length)]
          console.log(final);
          if (final.rating == 's')
            {
              var rating = 'safe' + sfwEmote
            }
            else if (final.rating == 'q')
            {
              var rating = 'questionable' + questionEmote
            }
            else if (final.rating == 'e')
            {
              var rating = 'explicit' + nsfwEmote
            }
          msg.channel.send({embed: 
                {
                  "title": 'ID: ' + final.id,
                  "url": 'https://gelbooru.com/index.php?page=post&s=view&id=' + final.id,
                  "color": 0xff5511,
                  ///"timestamp": "2018-07-16T23:26:49.041Z",
                  "footer": 
                  {
                    "icon_url": "https://i.imgur.com/XWE7GV8.jpg",
                    "text": "Click on the post ID for it's details. Very large images may not preview."
                  },
                  "image":
                  {
                    "url": final.file_url
                  },
                  "author": 
                  {
                    "name": "Gelbooru",
                    "url": "https://gelbooru.com",
                    "icon_url": "https://imagizer.imageshack.us/161x161f/922/4GfreX.jpg"
                  },
                  "fields": [
                  {
                    "name": "Score:",
                    "value": final.score,
                    "inline": true
                  },
                  {
                    "name": "Rating:",
                    "value": rating,
                    "inline": true
                  }
                  ]
                }
              });
              if (final.file_url.indexOf('.webm') > -1 || final.file_url.indexOf('.mp4') > -1)
              {
                msg.channel.send("Video file detected (discord doesn't like these, they're big). Click the ID to view if you really want it.");
              }
          }
          catch (e) 
          {
            console.log(e)
            if (e instanceof TypeError)
          {
            msg.reply('Sorry, it appears your search returned no images.')
            console.log('ERROR: IMAGE NOT FOUND')
          }
        }
      }
      });
		},
    lewd: function(arg, msg, sfwEmote, nsfwEmote, questionEmote, request, parseString, jsdom, { JSDOM }, { window }, { document }, $, fs, readline, superSafeMode, adminRole, total)
    {
      console.log('Command recieved.');
      console.log(arg)
      //Checks if argument is "random" since there is no real random tag, then searches separately if it is
      if (arg == 'random' || arg == 'lewd' || arg == 'lewdbooru')
      {
        var postNum = Math.floor(Math.random() * total)
        var address = ('http://lewd.booru.org/index.php?page=post&s=view&id=' + postNum);
        console.log(address)
        request.get(address, function(error, response, body) 
        {
          if (!error && response.statusCode == 200) 
          {
            try
            {
              ///console.log(body.match(new RegExp(/Score\:(.*) \<br/g)));
              var score = body.match(new RegExp(/Score\:(.*) \<br/g))
              var score = score[0].replace('Score: ', '')
              var score = score.replace('<br', '')
              ///console.log(body.match(new RegExp(/Rating\:(.*) \<br/g)));
              var rating = body.match(new RegExp(/Rating\:(.*) \<br/g))
              var rating = rating[0].replace('Rating: ', '')
              var rating = rating.replace('<br', '')
              var rating = rating.toLowerCase()
              if (rating == 'safe ')
              {
                var rating = 'safe' + sfwEmote                
              }
              else if (rating == 'questionable ')
              {
                var rating = 'questionable' + questionEmote
              }
              else if (rating == 'explicit ')
              {
                var rating = 'explicit' + nsfwEmote
              }
              var url = body.split('\n')[56];
              var url = url.split('=',)[3]
              var url = url.replace('"','')
              var url = url.replace('"','')
              var url = url.replace("id","")
              var url = url.slice(0, 25) + url.slice(26);
              console.log(url)
              msg.channel.send({embed: 
              {
                "title": 'ID: ' + postNum,
                "url": address,
                "color": 0xff5511,
                ///"timestamp": "2018-07-16T23:26:49.041Z",
                "footer": 
                {
                  "icon_url": "https://i.imgur.com/XWE7GV8.jpg",
                  "text": "Click on the post ID for it's details. Very large images may not preview."
                },
                "image":
                {
                  "url": url
                },
                "author": 
                {
                  "name": "Lewdbooru",
                  "url": "http://lewd.booru.org/",
                  "icon_url": "https://i.imgur.com/srkKHLv.jpg"
                },
                "fields": [
                {
                  "name": "Score:",
                  "value": score,
                  "inline": true
                },
                {
                  "name": "Rating:",
                  "value": rating,
                  "inline": true
                }
                ]
              }
              });
              if (url.indexOf('.webm') > -1 || url.indexOf('.mp4') > -1)
              {
                msg.channel.send("Video file detected (discord doesn't like these, they're big). Click the ID to view if you really want it.");
              }
            }
            catch (e) 
            {
              console.log(e)
              if (e instanceof TypeError)
              {
                msg.reply('Sorry, it appears that image has been deleted!')
                console.log('ERROR: IMAGE DELETED')
              }
            }
          }
        });
      }
      //Otherwise, it adds tags as normal and moves on
      else
      {
        if (arg.toLowerCase().startsWith('id:'))
        {
          var backup = arg.toLowerCase()
          var postNum = backup.replace('id:', '')
          var address = ('http://lewd.booru.org/index.php?page=post&s=view&id=' + postNum);
          console.log(address)
          request.get(address, function(error, response, body) 
          {
            if (!error && response.statusCode == 200) 
            {
              try
              {
                ///console.log(body.match(new RegExp(/Score\:(.*) \<br/g)));
                var score = body.match(new RegExp(/Score\:(.*) \<br/g))
                var score = score[0].replace('Score: ', '')
                var score = score.replace('<br', '')
                ///console.log(body.match(new RegExp(/Rating\:(.*) \<br/g)));
                var rating = body.match(new RegExp(/Rating\:(.*) \<br/g))
                var rating = rating[0].replace('Rating: ', '')
                var rating = rating.replace('<br', '')
                var rating = rating.toLowerCase()
                if (rating == 'safe ')
                {
                  var rating = 'safe' + sfwEmote
                }
                else if (rating == 'questionable ')
                {
                  var rating = 'questionable' + questionEmote
                }
                else if (rating == 'explicit ')
                {
                  var rating = 'explicit' + nsfwEmote
                }
                var url = body.split('\n')[56];
                var url = url.split('=',)[3]
                var url = url.replace('"','')
                var url = url.replace('"','')
                var url = url.replace("id","")
                var url = url.slice(0, 25) + url.slice(26);
                console.log(url)
                msg.channel.send({embed: 
                {
                  "title": 'ID: ' + postNum,
                  "url": address,
                  "color": 0xff5511,
                  ///"timestamp": "2018-07-16T23:26:49.041Z",
                  "footer": 
                  {
                    "icon_url": "https://i.imgur.com/XWE7GV8.jpg",
                    "text": "Click on the post ID for it's details. Very large images may not preview."
                  },
                  "image":
                  {
                    "url": url
                  },
                  "author": 
                  {
                    "name": "Lewdbooru",
                    "url": "http://lewd.booru.org/",
                    "icon_url": "https://i.imgur.com/srkKHLv.jpg"
                  },
                  "fields": [
                  {
                    "name": "Score:",
                    "value": score,
                    "inline": true
                  },
                  {
                    "name": "Rating:",
                    "value": rating,
                    "inline": true
                  }
                  ]
                }
              });
              if (url.indexOf('.webm') > -1 || url.indexOf('.mp4') > -1)
              {
                msg.channel.send("Video file detected (discord doesn't like these, they're big). Click the ID to view if you really want it.");
              }
              }
              catch (e) 
              {
                console.log(e)
                if (e instanceof TypeError)
                {
                  msg.reply('Sorry, it appears that image has been deleted!')
                  console.log('ERROR: IMAGE DELETED')
                }
              }
            }
          });
        }
        else
        {
          var tags = arg.trim().split(/ +/g);
          var upTo = tags.length
          var counter = 1
          var url = 'http://lewd.booru.org/index.php?page=post&s=list&tags=' + tags[0]
          // Adds tags one by one into URL with correct formatting
          while (counter != upTo)
          {
            var url = url + '+' + tags[counter]
            var counter = counter + 1
          }
          if (superSafeMode == 'true' && !msg.member.roles.find("name", adminRole))
          {
            var url = url + '+-loli+-shota'
            console.log('Safe mode tags integrated.')
          }
          //Requests HTML from booru search
          request({
          url: url,
          json: false
          }, function (error, response, body) 
          {
            try
            {
              //Captures every instance of "posts[ID]", "rating:RATING", and "score:SCORE"
              ///console.log(body.match(new RegExp(/posts\[(.*)\]/g)));
              ///console.log(body.match(new RegExp(/rating\:(.*)\/\>\</g)));
              ///console.log(body.match(new RegExp(/score\:(.*)rating/g)));
              var IDs = (body.match(new RegExp(/posts\[(.*)\]/g)));
              var ratings = (body.match(new RegExp(/rating\:(.*)\/\>\</g)));
              var scores = (body.match(/score\:(.*)rating/g));
              //Removes unnecessary characters from posts[ID] to leave a working ID array
              var upToA = IDs.length
              var upToB = ratings.length
              var upToC = ratings.length
              var count = 0
              while (count != upToA)
              {
                var current = IDs[count]
                IDs[count] = current.substr(6,current.indexOf(']'));
                var current = IDs[count]
                IDs[count] = current.replace(']', '');
                var count = count + 1
              }
              var count = 0
              while (count != upToB)
              {
                var current = ratings[count]
                ratings[count] = current.substr(7,current.indexOf('"/><'));
                var current = ratings[count]
                ratings[count] = current.replace('"/><', '');
                var current = ratings[count]
                ratings[count] = current.toLowerCase()
                var current = ratings[count]
                if (current == 'explicit')
                {
                  ratings[count] = current + nsfwEmote
                }
                else if (current == 'questionable')
                {
                    ratings[count] = current + questionEmote
                }
                else if(current == 'safe')
                {
                  ratings[count] = current + sfwEmote
                }
                var count = count + 1
              }
              var count = 0
              while (count != upToC)
              {
                var current = scores[count]
                scores[count] = current.substr(6,current.indexOf(' '));
                var current = scores[count]
                scores[count] = current.replace(' ratin', '');
                var count = count + 1
              }
              var randNum = Math.random();
              var postNum = IDs[Math.floor(randNum * IDs.length)]
              var postRating = ratings[Math.floor(randNum * ratings.length)]
              var postScore = scores[Math.floor(randNum * scores.length)]
              var address = ('http://lewd.booru.org/index.php?page=post&s=view&id=' +   postNum);
              console.log(address)
            }
            catch (e) 
            {
              console.log(e)
              if (e instanceof TypeError)
              {
              msg.reply('Sorry, it appears that your search returned no results.')
              console.log('ERROR: IMAGE NOT FOUND')
              }
            }
          request.get(address, function(error, response, body) 
          {
            if (!error && response.statusCode == 200) 
            { 
              try
              {
                  var url = body.split('\n')[56];
                  var url = url.split('=',)[3]
                  var url = url.replace('"','')
                  var url = url.replace('"','')
                  var url = url.replace("id","")
                  var url = url.slice(0, 25) + url.slice(26);
                  console.log(url)
                  msg.channel.send({embed: 
                  {
                    "title": 'ID: ' + postNum,
                    "url": address,
                    "color": 0xff5511,
                    ///"timestamp": "2018-07-16T23:26:49.041Z",
                    "footer": 
                    {
                      "icon_url": "https://i.imgur.com/XWE7GV8.jpg",
                      "text": "Click on the post ID for it's details. Very large images may not preview."
                    },
                    "image":
                    {
                      "url": url
                    },
                      "author":                   {
                      "name": "Lewdbooru",
                      "url": "http://lewd.booru.org/",
                      "icon_url": "https://i.imgur.com/srkKHLv.jpg"
                    },
                      "fields": [
                    { 
                      "name": "Score:",
                      "value": postScore,
                      "inline": true                    
                    },
                    {
                      "name": "Rating:",
                      "value": postRating,
                      "inline": true
                    }
                    ]
                  }
                  });
                  if (url.indexOf('.webm') > -1 || url.indexOf('.mp4') > -1)
                  {
                    msg.channel.send("Video file detected (discord doesn't like these, they're big). Click the ID to view if you really want it.");
                  }
                }
                catch (e) 
                {
                  console.log(e)
                  if (e instanceof TypeError)
                  {
                  msg.reply('Sorry, it appears that your search returned no results.')
                  console.log('ERROR: IMAGE NOT FOUND')
                  }
                }
              }
            });
          });
        }
      }
	  }
}
