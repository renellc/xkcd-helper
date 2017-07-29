# xkcd-helper
A promise-based helper library for https://www.xkcd.com/

## Prerequisites 
- **node.js - 0.12.0+** (Due to the use of native promises)

## Installation
`npm install xkcd-helper`

## Usage
Everything in this package is promise-based so using this package is very easy.


**Example:**
```
const xkcd = require("xkcd-helper");

xkcd.getLatest().then((comicData) => console.log(data))
.catch((err) => console.log(err));
```

### List of available commands
- `getLatest()`: Gets the latest comic on [https://www.xkcd.com/](https://www.xkcd.com/).
- `getComic(comicNum)`: Takes one argument (an integer). Gets the specified comic.
- `getRandom()`: Gets a random comic.


### Having issues?
Open up an issue on the github page and I will try to fix the issue ASAP.
