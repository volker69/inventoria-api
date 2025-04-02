import app from "../app"
import request from "supertest";
import { IProduct } from "../interface/Product.Interface";
import { v4 as uuidv4, v3 } from 'uuid';


describe("POST /api/producto", ()=>{
  describe("Esto debe recibir, pruductoi_id_jumpselller, nombre_producto, descripcion,estado y url_img", ()=>{
    const newProduct: any = {payload:{
      pruductoi_id_jumpselller: 23423243,
      nombre_producto: "Polera infalible TEST",
      descripcion: "polera infalible, hecho en chile, con las mejores telas",
      estado: true,
      url_img: ""}
    };
    

     // should respond with a 200 code
     test("Esto debe responder un codigo 201",async()=>{
        const response =await request(app).post('/api/producto/').send(newProduct);
        expect(response.statusCode).toBe(201)
     })


    test("Esto debira responder un objeto JSON como content-type",async ()=>{
        const response = await request(app).post('/api/producto/').send(newProduct);
        expect(response.header["content-type"]).toEqual(
            expect.stringContaining("json")
        )
    })
    // shoud respond with a json object containing the new task with an id

    test("Esto deberia responder ID ",async ()=>{
        const response = await request(app).post('/api/producto/').send(newProduct);
        console.log("response.body",response.body);
        expect(response.body[0].producto_id).toBeDefined();
    });

  })
})