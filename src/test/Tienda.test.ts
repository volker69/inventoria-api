import app from "../app"
import request from "supertest";
import { ITienda } from "../interface/Tienda.Interface";

describe('GET /tienda',()=>{
    test("Debe responder con código 200 y retornar una lista",async ()=>{
        const response = await request(app).get('/api/tienda').send();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        
        if (response.body.length) {
            const tienda:ITienda = response.body[0];
            
            expect(typeof tienda.tienda_id).toBe("number");
            expect(typeof tienda.nombre_sucursal).toBe("string");
            expect(typeof tienda.direccion).toBe("string");
            if (tienda.comuna_id !== undefined && tienda.comuna_id !== null) {
                expect(typeof tienda.comuna_id).toBe("number");
              }
            expect(typeof tienda.estado).toBe("boolean");
        }
    },10000);
})