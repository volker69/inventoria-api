import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";
import { UsuarioService } from "../services/UserServce";
import postgres_db from "../db/postgressConexion";
import { IUser } from "../interface/models/User.Interface";

const userServe = new UsuarioService(postgres_db);

// Configura la estrategia local
passport.use(new LocalStrategy(

    async (username, password, done) => {
     let dataUser:any = await userServe.findUserByEmail(username);
      // Simula búsqueda en DB
      if (username === dataUser[0].email && password === dataUser[0].clave_hash) {
        return done(null, dataUser[0]);
      }
      return done(null, false, { message: 'Credenciales inválidas' });
    }
  ));



passport.serializeUser((user: any, done) => {
  done(null, user.usuario_id);
});

passport.deserializeUser(async (id: number, done) => {
  let getUser = await userServe.findUserById(id);
  if(id === getUser[0].usuario_id){
  done(null, getUser[0]);
  } else{
   done(null, false);
  }
});