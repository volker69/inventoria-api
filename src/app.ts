import express, { Application } from "express";
import TiendaRoute from "./routes/TiendaRoute";
import ProductoRoute from "./routes/ProductoRoute";
import InformeRoute from "./routes/InformeRoute";
import inventraRoute from "./routes/InventarioRoute";
import TallaRoute from "./routes/TallaRoute"
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import { boomErrorHandler } from "./middleware/error.handler";
const app: Application = express();

//-----
app.use(express.json());
import("./helpers/auth/index");

app.use("/api/welcome", (req, res) => {
  res.send("Bienvenido a la API de inventario");  
} 
);
app.use("/api/tienda", TiendaRoute);
app.use("/api/producto", ProductoRoute);
app.use("/api/informe", InformeRoute);
app.use("/api/inventario", inventraRoute);
app.use("/api/talla",TallaRoute);
app.use("/api/user",UserRoute);
app.use("/api/auth",AuthRoute);

app.use(boomErrorHandler);

export default app;