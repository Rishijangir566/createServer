import http from "http";

let cars = [
  { id: 1, model: "porsche", make: 2000 },
  { id: 2, model: "lamborghini", make: 2023 },
  { id: 3, model: "mercedes", make: 2023 },
  { id: 4, model: "tesla", make: 2050 },
  { id: 5, model: "aston martin", make: 2000 },
];

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    response.writeHead(200,{"Content-Type":"appliaction/json"})
    response.end(JSON.stringify(cars))
  } 
  else if (request.method === "POST") {
      let body =""
      request.on("data" , (item)=>{
        body+=item
      });
      request.on("end",()=>{
        cars.push(JSON.parse(body));
        response.writeHead(201,{"Content-Type":"appliaction/json"})
        response.end(JSON.stringify(cars))
      })

  } 
  else if (request.method === "DELETE" && request.url.match(/\/\d+/)) {
    const idDelete =request.url.split("/")[1]
    const updatedata=cars.filter((caritem)=>caritem.id!==Number(idDelete))
    response.writeHead(200,{"Content-Type":"appliaction/json"})
    response.end(JSON.stringify(updatedata))
} 
else if (request.method === "PUT" && request.url.match(/\/\d+/)) {
      const idEdit =request.url.split("/")[1]
     let body =""
     request.on("data",(items)=>{
        body+=items
     })
     request.on("end", ()=>{
        const updateData =cars.map((caritem)=>{
            return caritem.id===Number(idEdit)?JSON.parse(body):caritem
        })
        response.writeHead(200,{"Content-Type":"appliaction/json"})
    response.end(JSON.stringify(updateData))
     })
}
});
   

server.listen(8080,"127.0.0.1", () => {
  console.log("Server has started on 127.0.0.1:8080");
});