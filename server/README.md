# DB Setup

 - wake up mongo by entering `mongo` on the command line (terminal)
 - switch to the tweeter db by entering `use tweeter`
 - READ BELOW BEFORE PRESSING ENTER create our first record for the system to work - type `db.tweets.insertOne(`
 - copy and paste the following code and then add a `)` before pressing enter

 ```{
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}```