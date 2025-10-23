// console.log (process.argv);

//const method = process.argv[2];
//const resource = process.argv[3];
//console.log(method, resource);


let [, , method, resource, ...params] = process.argv;

method = method.toUpperCase()
resource = resource.toLowerCase()

if (method == 'POST' && resource == 'products'){
    const [title, price, category] = params;

    const product = { 
        title, 
        price, 
        category, 
    };

fetch('https://fakestoreapi.com/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(product)
})
  .then(response => response.json())
  .then(data => console.log(data));
}

if (method == "GET" && resource.startsWith("products/")){
   let id = resource.split("/")[1];
   id = parseInt(id);

    if (isNaN (id) || id <= 0){
         console.log("No es un número");
    }
    fetch("https://fakestoreapi.com/products/" + id)
    .then(response => response.json())
    .then(data => console.log(data));
}


// // const match = argv.find((arg) => /^products\/\d+$/.test(arg));
// // const id = match ? match.split("/")[1]:null;

// // if (method == "GET" && id){}
 
if (method == "GET" && resource == "products"){
  //  fetch('https://fakestoreapi.com/products')
  //  .then(response => response.json())
  //  .then(data => console.log(data));
    
        
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    console.log(data);
}