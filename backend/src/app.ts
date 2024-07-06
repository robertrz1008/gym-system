import express, {Response, Request} from "express";
import morgan from "morgan"
import autRote from "./routes/aut.routes";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

const PORT = 3000
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())


app.use("/api", autRote)

app.listen(PORT, () => {
    console.log(`server on port: ${PORT}`)
})