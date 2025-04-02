import express, { Application } from "express";
import TiendaRoute from "./routes/TiendaRoute";
import ProductoRoute from "./routes/ProductoRoute";
import InformeRoute from "./routes/InformeRoute";
import inventraRoute from "./routes/InventarioRoute";
const app: Application = express();

//-----
app.use(express.json());


app.use("/api/welcome", (req, res) => {
  res.send("Bienvenido a la API de inventario");  
} 
);
app.use("/api/tienda", TiendaRoute);
app.use("/api/producto", ProductoRoute);
app.use("/api/informe", InformeRoute);
app.use("/api/inventario", inventraRoute);

export default app;