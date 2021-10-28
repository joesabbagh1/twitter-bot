var Twit = require('twit');
var config = require('./config');
var fs = require('fs');
var T = new Twit(config);

//first page
T.get('search/tweets', { q: '', count: 100 }, function gotData(err, data, response) {
    var tweets = data.statuses;

    for (let i = 0; i < tweets.length; i++) {
        if (typeof tweets[i].entities.media != "undefined") {

            console.log(tweets[i].created_at);
            console.log(tweets[i].user.name);
            console.log(tweets[i].text);

            for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
                console.log(tweets[i].extended_entities.media[j].media_url);
            }
            console.log("\n");
        }
    }

    fs.readFile('data.json', function (err, content) {
        if (err) throw err;
        var parseJson = JSON.parse(content);
        for (let i = 0; i < tweets.length; i++) {
            if (typeof tweets[i].entities.media != "undefined") {
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
                parseJson.table.push(obj)
            }
        }

        fs.writeFile('data.json', JSON.stringify(parseJson, null, 2), function (err) {
            if (err) throw err;
        })
    })

    //the id of the last tweet we used
    // var last_id = tweets[tweets.length - 1].id_str;

    //Next page
    // T.get('search/tweets', { q: '', count: 200, last_id: last_id }, function gotData(err, data, response) {
    //     for (let i = 0; i < tweets.length; i++) {
    //         if (typeof tweets[i].entities.media != "undefined") {

    //             console.log(tweets[i].created_at);
    //             console.log(tweets[i].user.name);
    //             console.log(tweets[i].text);

    //             for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
    //                 console.log(tweets[i].extended_entities.media[j].media_url);
    //             }
    //             console.log("\n");
    //         }
    //     }

    //     fs.readFile('data.json', function (err, content) {
    //         if (err) throw err;
    //         var parseJson = JSON.parse(content);
    //         for (let i = 0; i < tweets.length; i++) {
    //             if (typeof tweets[i].entities.media != "undefined") {
    //                 let media_arr = [];
    //                 for (let j = 0; j < tweets[i].extended_entities.media.length; j++) {
    //                     media_arr[j] = tweets[i].extended_entities.media[j].media_url;
    //                 }
    //                 var obj = {
    //                     date: tweets[i].created_at,
    //                     user_name: tweets[i].user.name,
    //                     text: tweets[i].text,
    //                     media: [],
    //                 }
    //                 obj['media'].push(media_arr);
    //                 parseJson.table.push(obj)
    //             }
    //         }

    //         fs.writeFile('data.json', JSON.stringify(parseJson, null, 2), function (err) {
    //             if (err) throw err;
    //         })
    //     })
    // })
})

