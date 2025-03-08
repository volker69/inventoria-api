import express, { Application } from "express";
const app: Application = express();
const PORT = 3000;

//-----
app.use(express.json());


app.use("/api/welcome", (req, res) => {
  res.send("Bienvenido a la API de inventario");  
} 
);


app.listen(PORT,() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });