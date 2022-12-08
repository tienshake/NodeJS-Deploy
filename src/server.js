import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB'
const cookieParser = require("cookie-parser");
var cors = require('cors')
require("dotenv").config();

//evn
require("dotenv").config();
//khai bao
const app = express();
//fix cross call api login
app.use(cors({ credentials: true, origin: true }));
//config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//cookies
app.use(cookieParser());
//limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }, { extended: true }));
// viewEngine
viewEngine(app);
//route
initWebRoutes(app);
//connectDB
connectDB();

const port = process.env.PORT || 2001;
app.listen(port, () => {
    console.log("backend nodeJS is running on the port: " + port);
});
// ,
//     "query": {
//       "raw": true
//     }