import app from "./app"
const PORT = 3000;
const HOSTLOCAL = '0.0.0.0';

app.listen(PORT,HOSTLOCAL,() => {
      
      console.log(`Servidor corriendo en http://${HOSTLOCAL}:${PORT}`);
  });

  export default app;