import express, { Application } from "express";
import TiendaRoute from "./routes/TiendaRoute";
import ProductoRoute from "./routes/ProductoRoute";
const app: Application = express();
const PORT = 3000;
const HOSTLOCAL = '0.0.0.0';


//-----
app.use(express.json());


app.use("/api/welcome", (req, res) => {
  res.send("Bienvenido a la API de inventario");  
} 
);
app.use("/api/tienda", TiendaRoute);
app.use("/api/producto", ProductoRoute);

app.listen(PORT,HOSTLOCAL,() => {
      
      console.log(`Servidor corriendo en http://${HOSTLOCAL}:${PORT}`);
  });