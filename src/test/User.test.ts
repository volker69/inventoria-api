import app from "../app"
import request from "supertest";
import { IUser } from "../interface/User.Interface";

describe('GET /user',()=>{
    test("Debe responder con código 200 y retornar una lista",async ()=>{
        const response = await request(app).get('/api/user').send();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        
        if (response.body.length) {
            const user:IUser = response.body[0];
            
           if(user.usuario_id !== undefined && user.usuario_id !== null) {
                expect(typeof user.usuario_id).toBe("number");
            }   
            expect(typeof user.nombre_usuario).toBe("string");
            expect(typeof user.email).toBe("string");
            expect(typeof user.clave_hash).toBe("string");
            if (user.rol_id !== undefined && user.rol_id !== null) {
                expect(typeof user.rol_id).toBe("number");
              } 
            expect(typeof user.activo).toBe("boolean");
            expect(typeof user.fecha_creacion).toBe("string"); // Cambiado a string para la fecha
            
        }
    },10000);
});