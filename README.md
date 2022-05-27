# URL Shortener (短網址產生器)
## Features
1. users could get a unique shorten-path from their input
2. users could get alert if they submit empty input, or a url that does not with https://
3. users will always get the same shorten-path for the same url
4. users could click button to copy shortened path to their clipboard
5. users could navigate to original url when navigating to shorten path
6. users would get redirected to home page with alert message when they try to access a shorten path that does not exist
<br><br><br>

## Technology
Runtime: `node@16.13.0` <br>
Framework: `express@4.18.1` <br>
Database: `MongoDB Atlas` + `mongoose@6.3.3` <br>
View Engine: `express-handlebars@6.0.5` <br>
<br><br><br>

## Application Routing
```
GET     /                         render a page for url input
POST    /urls                     create a new url in MongoDB
GET     /:shortenPath             redirect to original url
```
<br><br><br>

## Client State
| STATE       | DEFINITION                             | STARTS ON                             | ENDS ON                |
| ----------- | -------------------------------------- | ------------------------------------- | ---------------------- |
| Awaiting    | app waits for user url input           | `app.load` <br> `backButton.click`    | `shortenButton.click`  |
| Processing  | user click shorten to send data to app | `shortenButton.click`                 | when data fetched      |
| Completed   | app returns shortened url to browser   | when data fetched                     | `backButton.click`     |

<br><br><br>

## Client State & Program Flow
| STATE       | USER ACTION                   | CLIENT                     | SERVER                                    |
| ----------- | ----------------------------- | -------------------------- | ----------------------------------------- |
| x           | browse to url shortener app   | x                          | x                                         |
| x           | x                             | x                          | receive GET request & render index page   |
| awaiting    | x                             | initialize shortener       | x                                         |
| awaiting    | type/paste url                | x                          | x                                         |
| awaiting    | click "shorten" button        | x                          | x                                         |
| awaiting    | x                             | validate url input         | x                                         |
| processing  | x                             | change state to processing | x                                         |
| processing  | x                             | fetch data                 | x                                         |
| processing  | x                             | x                          | receive POST request, from methodoverride |
| processing  | x                             | x                          | find url in MongoDB, and send JSON back   |
| processing  | x                             | receive JSON & render page | x                                         |
| completed   | x                             | change state to completed  | x                                         |
| completed   | click "copy" button           | copy shorten url to board  | x                                         |
| completed   | click "back" button           | initialize shortener       | x                                         |

<br><br><br>

## URL Mongoose SchemaType
```
URL = {
  originUrl: {
    type: String,
    required: true
  },
  shortenPath: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 5
  },
  useCount: Number
}
```
<br><br><br>

## Instructions
#### step1: Clone a local copy by
`git clone https://github.com/yumingchang1991/alpha-camp-url-shortener`
<br><br>

#### step2: Change Directory to the copy
`cd alpha-camp-url-shortener`
<br><br>

#### step3: Install dependencies
Type in command line below to automatically install dependencies listed in package.json <br>
`npm i` <br>

**NOTE**
- Font awesome & Axios are linked through CDN. no actions from you, YAY!
<br><br>

#### step4: add environment variable to connect to your MongoDB
- Create `.env` file to the same file level as `app.js`
- Add a variable name `MONGODB_URI` in `.env` and assign your URI to it
<br><br>

#### step5: **Run Application** by `npm run dev`, this will open localhost for you automatically
<br><br>
