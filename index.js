// console.log (process.argv);

//const method = process.argv[2];
//const resource = process.argv[3];
//console.log(method, resource);


let [, , method, resource] = process.argv;

method = method.toUpperCase()
resource = resource.toLowerCase()

if (method == "GET" && resource == "products"){
  //  fetch('https://fakestoreapi.com/products')
  //  .then(response => response.json())
  //  .then(data => console.log(data));
    
        
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json();
    console.log(data);
}