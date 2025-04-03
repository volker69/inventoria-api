import app from "../app"
import request from "supertest";

describe("POST /api/talla", ()=>{
  describe("Esto debe recibir los datos de talla [ tallaName | tallaPrice | tallaCount ] ademas de product_id y tienda_id", ()=>{
 
    const newTalla = {
        payload:{
            tallaName:"XXL",
            tallaPrice:1000,
            tallaCount:10
        },
        product_id:326,
        tienda_id:1
    }
    

     // should respond with a 200 code
     test("Esto debe responder un codigo 201",async()=>{
        const response =await request(app).post('/api/talla/').send(newTalla);
        expect(response.statusCode).toBe(201)
     })


    test("Esto debira responder un objeto JSON como content-type",async ()=>{
        const response = await request(app).post('/api/talla/').send(newTalla);
        expect(response.header["content-type"]).toEqual(
            expect.stringContaining("json")
        )
    })

    test("Esto deberia responder un mensaje y la id de producto_variante, producto_atributo_variante e inventario ",async ()=>{
        const response = await request(app).post('/api/talla/').send(newTalla);
        expect(response.body.producto_variante_id).toBeDefined();
        expect(response.body.producto_atributo_variante_id).toBeDefined();
        expect(response.body.inventario_id).toBeDefined();
    });

  })
})