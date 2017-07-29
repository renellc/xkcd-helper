const https = require("https");
const hostUrl = "https://www.xkcd.com/";
const comicPath = "info.0.json";


/**
 * getData: Retrives the JSON data from https://www.xkcd.com/
 * 
 * @param {number} [comicNum=null]: If no value is given, function will get the latest comic's data. Else, will get the specified comic number (if it exists). 
 * @returns: If data is able to be retrieved, the function can be resolved with the data that is received. If there is an error communicating with the servers, the function will reject with the error.
 */
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


/**
 * getLatest: Gets the latest comic that has been released on https://www.xkcd.com/
 * 
 * @returns: The latest comic's data.
 */
let getLatest = function () {
    return new Promise((resolve, reject) => {
        getData().then(comicData => resolve(comicData))
        .catch(err => reject(err));
    });
};


/**
 * getComic: Gets a specific comic's data.
 * 
 * @param {number} comicNum: Any integer that is greater than 1. 
 * @returns: The requested comic's data.
 */
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


/**
 * getRandom: Gets a random comic from https://www.xkcd.com/
 * 
 * @returns: The random comic's data.
 */
let getRandom = function () {
    return new Promise((resolve, reject) => {
        getData().then(latestComic => {
            // Gets random number between 1 and the latest comic's number
            let randComicNum = Math.floor(Math.random() * latestComic.num);
            getData(randComicNum).then(randComicData => resolve(randComicData))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
};

exports.getComic = getComic;
exports.getLatest = getLatest;
exports.getRandom = getRandom;