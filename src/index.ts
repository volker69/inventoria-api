import express, { Application } from "express";
import inventarioRoutes from "./routes/InventarioRoute";

const app: Application = express();
const PORT = 3000;

//-----
app.use(express.json());


app.use("/api/inventario",inventarioRoutes);

app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });