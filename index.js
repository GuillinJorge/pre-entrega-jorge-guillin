// --------------------------------------------------
// Captura los argumentos ingresados desde la terminal
// method: GET, POST, PUT, DELETE
// resource: products o products/<id>
// params: parámetros adicionales (title, price, category)
// --------------------------------------------------
let [, , method, resource, ...params] = process.argv;

// Normalizamos los valores para evitar errores de mayúsculas/minúsculas
method = method.toUpperCase();
resource = resource.toLowerCase();

// --------------------------------------------------
// Función para mostrar un producto de forma legible
// --------------------------------------------------
function printProduct(product) {
  const { id, title, price, category } = product;
  console.log(`ID: ${id}\nTítulo: ${title}\nPrecio: $${price}\nCategoría: ${category}\n---`);
}

// --------------------------------------------------
// Funciones auxiliares para cada operación con la API
// --------------------------------------------------

// Obtener todos los productos
async function fetchAllProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  data.forEach(printProduct); // Imprime cada producto
}

// Obtener un producto por ID
async function fetchProduct(id) {
  if (isNaN(id) || id <= 0) {
    console.log("ID inválido");
    return;
  }
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  printProduct(data);
}

// Crear un nuevo producto
async function createProduct({ title, price, category }) {
  if (!title || !price || !category) {
    console.log("Faltan parámetros. Uso: POST products <title> <price> <category>");
    return;
  }
  const res = await fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, price: parseFloat(price), category })
  });
  const data = await res.json();
  console.log("Producto creado:");
  printProduct(data);
}

// Actualizar un producto existente
async function updateProduct(id, { title, price, category }) {
  if (isNaN(id) || id <= 0) {
    console.log("ID inválido");
    return;
  }
  const dataToUpdate = {};
  if (title) dataToUpdate.title = title;
  if (price) dataToUpdate.price = parseFloat(price);
  if (category) dataToUpdate.category = category;

  if (Object.keys(dataToUpdate).length === 0) {
    console.log("Proporciona al menos un campo para actualizar: title, price o category");
    return;
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataToUpdate)
  });
  const data = await res.json();
  console.log(`Producto con ID ${id} actualizado:`);
  printProduct(data);
}

// Eliminar un producto
async function deleteProduct(id) {
  if (isNaN(id) || id <= 0) {
    console.log("ID inválido");
    return;
  }
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: 'DELETE'
  });
  const data = await res.json();
  console.log(`Producto con ID ${id} eliminado:`);
  console.log(data);
}

// --------------------------------------------------
// Función principal que interpreta los comandos
// --------------------------------------------------
async function main() {
  try {
    if (method === "GET" && resource === "products") {
      await fetchAllProducts(); // Lista todos los productos
    } else if (method === "GET" && resource.startsWith("products/")) {
      const id = parseInt(resource.split("/")[1]);
      await fetchProduct(id); // Muestra un producto específico
    } else if (method === "POST" && resource === "products") {
      const [title, price, category] = params;
      await createProduct({ title, price, category }); // Crea un producto
    } else if (method === "PUT" && resource.startsWith("products/")) {
      const id = parseInt(resource.split("/")[1]);
      const [title, price, category] = params;
      await updateProduct(id, { title, price, category }); // Actualiza un producto
    } else if (method === "DELETE" && resource.startsWith("products/")) {
      const id = parseInt(resource.split("/")[1]);
      await deleteProduct(id); // Elimina un producto
    } else {
      // Mensaje de ayuda si el comando no coincide
      console.log("Comando no reconocido. Uso:");
      console.log("GET products");
      console.log("GET products/<productId>");
      console.log("POST products <title> <price> <category>");
      console.log("PUT products/<productId> <title> <price> <category>");
      console.log("DELETE products/<productId>");
    }
  } catch (error) {
    console.error("Ocurrió un error:", error.message); // Manejo de errores
  }
}

// Ejecuta la función principal
main();
