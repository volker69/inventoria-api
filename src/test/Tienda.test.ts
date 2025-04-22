import app from "../app"
import request from "supertest";
import {ITienda} from "../interface/models/Tienda.Interface";

describe('GET /tienda',()=>{
    test("Debe responder con código 201 y retornar una lista",async ()=>{
        
        const response = await request(app).get("/api/tienda").send();
        //✅ Verificar que la respuesta tenga un código de estado 200
        expect(response.statusCode).toBe(200);

        //✅ Verificar que la respuesta tenga un tipo sea un array
        expect(Array.isArray(response.body)).toBe(true); 

        //✅ Validamos si la lista tiene al menos un elemento
        expect(response.body.length).toBeGreaterThan(0);
        //✅ Validamos que el primer elemento de la lista sea un objeto y tenga las propiedades esperadas   
        const tienda:ITienda = response.body[0];
        expect(typeof tienda.tienda_id).toBe("number");
        expect(typeof tienda.nombre_sucursal).toBe("string");
        expect(typeof tienda.direccion).toBe("string");
        expect(typeof tienda.estado).toBe("boolean");
        expect(typeof tienda.empresa_id).toBe("number");
        if(tienda.comuna_id !== undefined && tienda.comuna_id !== null){
            expect(typeof tienda.comuna_id).toBe("number") ;
        }
        },10000);
});