import express, { Application } from "express";
import TiendaRoute from "./routes/TiendaRoute";
const app: Application = express();
const PORT = 3000;

//-----
app.use(express.json());


app.use("/api/welcome", (req, res) => {
  res.send("Bienvenido a la API de inventario");  
} 
);
app.use("/api/tienda", TiendaRoute);

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });