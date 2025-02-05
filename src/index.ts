import express, { Application } from "express";
import inventarioRoutes from "./routes/InventarioRoute";
import productoRoute from './routes/ProductoRoute';
import tiendaRoute from './routes/TiendaRoute';
const app: Application = express();
const PORT = 3000;

//-----
app.use(express.json());


app.use("/api/inventario",inventarioRoutes);
app.use("/api/producto",productoRoute);
app.use("/api/tienda",tiendaRoute);

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });