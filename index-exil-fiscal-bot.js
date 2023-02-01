var twit = require("twit")
const config = require("./config.json")

const T = new twit({
    consumer_key:config.consumer_key,
    consumer_secret:config.consumer_secret,
    access_token:config.access_token,
    access_token_secret:config.access_token_secret
})

const matchWords = [
    "exil fiscal",
    "exiles fiscaux",
    "evasion fiscal",
    "exile fiscal"
]
const RetweetedTweets = [
]
//works for simple bots but poorly implemented
function retweet(){
    matchWords.forEach(word=>{
        T.get('search/tweets', { q: word, count: 100 }, function(err, data, response) {
            for(let i=0;i<data.statuses.length;i++){
                let id = data.statuses[i].id_str;
                if(RetweetedTweets.length>=100)
                {
                    RetweetedTweets.shift();
                }
                if(!RetweetedTweets.includes(data.statuses[i].id)){
                    console.log("retweeting status:"+data.statuses[i].id_str)
                    T.post("statuses/retweet/" + data.statuses[i].id_str, {}, (error, response) => {
                        if (error) {
                            console.log(error.message);
                        }
                    })
                    RetweetedTweets.push(data.statuses[i].id)
                }
            }
        })
    })
}
setInterval(retweet,1000 * 60) // searches for new tweets to retweet every minute