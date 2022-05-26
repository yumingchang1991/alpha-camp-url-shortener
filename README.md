# URL Shortener (短網址產生器)
## Features
1. 
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
GET     /:shortUrl                redirect to original url
```
<br><br><br>

## Client State
| STATE       | DEFINITION                             | STARTS ON                             | ENDS ON                |
| ----------- | -------------------------------------- | ------------------------------------- | ---------------------- |
| Awaiting    | app waits for user url input           | `app.load` <br> `anotherButton.click` | `shortenButton.click`  |
| Processing  | user click shorten to send data to app | `shortenButton.click`                 | when data fetched      |
| Completed   | app returns shortened url to browser   | when data fetched                     | `anotherButton.click`  |

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
| completed   | click "go back" button        | initialize shortener       | x                                         |

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
  }
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
- Font awesome are linked through CDN. no actions from you, YAY!
<br><br>

#### step4: add environment variable to connect to your MongoDB
- Create `.env` file to the same file level as `app.js`
- Add a variable name `MONGODB_URI` in `.env` and assign your URI to it
<br><br>

#### step5: **Seed Your Database** by `npm run seed`, this will add 8 dummy data to database
<br><br>

#### step6: **Run Application** by `npm run dev`, this will open localhost for you automatically
<br><br>

## Improvements Directions
- [x] Seperate Express routing from app.js
- [x] Seperate Model, View & Utility from app.js
- [x] Enable user to choose how the list is sorted, by what property, and in ascending or descending order
- [ ] Enable friendly alert when there is error modifying restaurant data (it now redirects user to homepage only)
- [ ] Enable user to choose what target to search, is it name or category
<br><br><br>

## How To Participate
You could interact with this project by making a pull request, with a file containing information:
1. How you think I could improve this project
2. How you think I could improve as a software developer
3. Open to anything on your mind

Or send messages on [LinkedIn](https://www.linkedin.com/in/yumingchang1991/) <br>
Or in email [yumingchang1991@gmail.com](mailto:yumingchang1991@gmail.com)
<br><br><br>
