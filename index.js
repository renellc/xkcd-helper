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
            res.on("data", chunk => data += chunk);
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

let getComic = function (comicNum) {
    return new Promise((resolve, reject) => {
        getData().then(latestComic => {
            if (comicNum < 1) {
                let errMsg = "Number must be greater than 1. Please re-enter a valid number.";
                reject(new Error(errMsg));
            } else if (comicNum > latestComic.num) {
                let errMsg = "That comic number is too high! The latest comic number is currently " + latestComic.num;
                reject(new Error(errMsg));
            } else {
                getData(comicNum).then(comicData => resolve(comicData))
                .catch(err => reject(err));
            }
        })
        .catch(err => reject(err));
    });
};

let getRandom = function () {
    return new Promise((resolve, reject) => {
        getData().then(latestComic => {
            let randComicNum = Math.floor(Math.random() * latestComic.num);
            getData(randComicNum).then(randComicData => resolve(randComicData))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
};