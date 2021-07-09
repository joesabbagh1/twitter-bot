var Twit = require('twit');
var config = require('./config');
var fs = require('fs');
var T = new Twit(config);

var params = {
    q: '#FreeFromHijab',
    count: 100
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {

    var tweets = data.statuses;

    var data = {};
    data.table = [];

    for (let i = 0; i < tweets.length; i++) {
        if (typeof tweets[i].entities.media != "undefined") {

            console.log(tweets[i].created_at);
            console.log(tweets[i].user.name);
            console.log(tweets[i].text);

            for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
                console.log(tweets[i].extended_entities.media[j].media_url);
            }

            console.log("\n");

            // let media_arr = [];
            // for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
            //     media_arr[j] = tweets[i].extended_entities.media[j].media_url;
            // }
            // var obj = {
            //     date: tweets[i].created_at,
            //     user_name: tweets[i].user.name,
            //     text: tweets[i].text,
            //     media: [],
            // }
            // obj['media'].push(media_arr);
            // data.table.push(obj)

            // fs.writeFile("input.json", JSON.stringify(data, null, 2), function (err) {
            //     if (err) throw err;
            //     console.log('complete');
            // }
            // );

            fs.readFile('data.json', function (err, content) {
                if (err) throw err;
                var parseJson = JSON.parse(content);

                let media_arr = [];
                for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
                    media_arr[j] = tweets[i].extended_entities.media[j].media_url;
                }
                var obj = {
                    date: tweets[i].created_at,
                    user_name: tweets[i].user.name,
                    text: tweets[i].text,
                    media: [],
                }
                obj['media'].push(media_arr);
                parseJson.table.push(obj);

                fs.writeFile('data.json', JSON.stringify(parseJson, null, 2), function (err) {
                    if (err) throw err;
                })
            })
        }
    }
}

