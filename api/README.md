# api

Resources and steps to connect with api  
`npm i express --save`  
`npm i mongoose --save`  
`npm i body-parser --save` (optional) --> to load the middleware you can use body-parser or express

Connect with MongoDB  
There is a bug in the case of MacOS Catalina to solve it, it must be included in .zshrc:
`alias mongod="mongod --dbpath ~/mongodb/data/db"`

## Development server

For a dev server run `mongod` with hostname `127.0.0.1` and port `27017` and run `nodemon app.js`. Navigate to `http://localhost:3000/`.
