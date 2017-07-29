/* jshint esversion: 6 */
const https = require("https");
const hostUrl = "https://www.xkcd.com/";
const comicPath = "info.0.json";

let getData = function (comicNum = null) {
    let comicUrl;
    if (comicNum) comicUrl = hostUrl + comicNum + "/" + comicPath;
    else comicUrl = hostUrl + comicPath;

    return new Promise((resolve, reject) => {
        https.get(comicUrl, res => {
            let data = "";
            res.on("data", chunk => rawData += chunk);
            res.on("end", () => {
                try {
                    data = JSON.parse(data);
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            });
        }).on("error", err => reject(err));
    });
};

let getLatest = function () {
    return new Promise((resolve, reject) => {
        getData().then(comicData => resolve(comicData))
        .catch(err => reject(err));
    });
};
