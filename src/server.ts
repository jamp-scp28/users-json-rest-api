import express from "express";
import * as bodyParser from 'body-parser';
import routes from "./rest/routes/index.route";
const app = express();

app.use(function (req: express.Request, res: express.Response, next: any) {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json())
app.use(express.urlencoded({extended:true}));

app.use('/api/v1',routes);

const PORT = 8080
app.listen(PORT,()=>{console.log(`App up and running on port: ${PORT}`)});