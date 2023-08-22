import express from "express"
import connect from "./config/connectDB";
import initAPIRoute from "./route/route";
import cookieParser from "cookie-parser";




const app = express()
const port = 8080;
app.use(express.urlencoded({ extended: true }));
connect();
app.use(express.json());
app.use(cookieParser())
initAPIRoute(app)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

