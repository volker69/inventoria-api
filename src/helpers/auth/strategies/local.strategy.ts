import bcrypt from 'bcryptjs';
import { Strategy } from "passport-local";
import { UsuarioService } from "../../../services/UserServce";
import postgres_db from "../../../db/postgressConexion";
import boom from "@hapi/boom";

const service = new UsuarioService(postgres_db);


export const LocalStrategy = new Strategy({
        usernameField: 'email',
        passwordField: 'clave_hash'
    },
    async (email:string,password:string,done)=>{
        try {
            const user = await service.findUserByEmail(email);
            if(user.length === 0){
                done(boom.unauthorized(),false);                

            }

            console.log("Creo que entre user[0].clave_hash ==>",user[0].clave_hash);
            const isMatch = await bcrypt.compare(password, user[0].clave_hash);
            
            if (!isMatch) {
                done(boom.unauthorized(),false);                
            }

            done(null,user[0]);            
        } catch (error) {
            done(error,false);
        }
    }

);
