import express from "express";
import morgan from "morgan"
import autRote from "./routes/aut.routes";
import clientRoute from "./routes/client.routes"
import productRoute from "./routes/product.routes"
import equipmentRoute from "./routes/equipament.routes"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
import saleRoute from "./routes/sale.routes"
import membership from "./routes/membership.routes"


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
app.use(express.static(path.join(__dirname, "dbImages")))

app.use("/api", autRote)
app.use("/api", clientRoute)
app.use("/api", productRoute)
app.use("/api", equipmentRoute)
app.use("/api", saleRoute)
app.use("/api", membership)


app.listen(PORT, () => {
    console.log(`server on port: ${PORT}`)
})