class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
    }
  
    async validateExistFile() {
      try {
        await fs.promises.stat(this.fileName);
        return 1;
      } catch (error) {
        console.log("El archivo no existe! Creandolo...");
        await fs.promises.writeFile(this.fileName, JSON.stringify([]));
        return 0;
      }
    }
  
    async getAll() {
      try {
        const data = await fs.promises.readFile(this.fileName, "utf-8");
        return JSON.parse(data);
      } catch (error) {
        console.log("No se pudo obtener los productos!", error);
      }
    }
  
    async saveProducts(products) {
      try {
        const data = JSON.stringify(products, null, "\t");
        await fs.promises.writeFile(this.fileName, data);
      } catch (error) {
        console.log("No se pudo guardar los productos!", error);
      }
    }
  
    async getById(id) {
      try {
        const products = await this.getAll();
        const index = products.findIndex((product) => product.id === id);
        if (index < 0) {
          throw new Error("El producto buscado no existe!");
        }
        return products[index];
      } catch (error) {
        console.log("Error al buscar el producto!", error);
      }
    }
  
    async saveProduct(data) {
      if (
        !data.title ||
        !data.price ||
        !data.thumbnail ||
        typeof data.title !== "string" ||
        typeof data.price !== "number" ||
        typeof data.thumbnail !== "string"
      )
        throw new Error("Datos incorrectos!");
  
      try {
        const products = await this.getAll();
        let id = 1;
        if (products.length) {
          id = products[products.length - 1].id + 1;
        }
  
        const newProduct = {
          title: data.title,
          price: data.price,
          thumbnail: data.thumbnail,
          id: id,
        };
  
        products.push(newProduct);
  
        await this.saveProducts(products);
      } catch (error) {
        console.log("Error al guardar el producto!", error);
      }
    }
  
    async deleteAll() {
      try {
        await this.saveProducts([]);
      } catch (error) {
        console.log("Error al borrar todos los productos!", error);
      }
    }
  
    async deleteById(id) {
      try {
        const products = await this.getAll();
  
        const index = products.findIndex((product) => product.id === id);
  
        if (index < 0) {
          throw new Error("El producto que intenta eliminar no existe!");
        }
  
        products.splice(index, 1);
  
        await this.saveProducts(products);
      } catch (error) {
        console.log("Error al borrar producto!", error);
      }
    }
  }
  
  const fs = require("fs");
  const fileName = "productos.js";
  const file = new Contenedor(fileName);
  
  const main = async () => {
    try {
      let exist = await file.validateExistFile();
      if (exist === 1) {
        console.log("El archivo ya existe!");
      }
  
      let products = await file.getAll();
  
      if (products.length == 0) {
        console.log("El archivo no tiene productos para mostrar!");
      } else {
        console.log(products);
      }
  
      const product = await file.getById(1);
      if (product != null) {
        console.log(product);
      }
  
      const newProduct = {
        nombre: "nissan",
        precio: 3500,
        thumbnail:
          "https://www.diariomotor.com/imagenes/2013/11/111942_1_5_portada.jpg",
      };
  
      await file.saveProduct(newProduct);
      products = await file.getAll();
      console.log(products);
  
      try {
        await file.deleteById(3);
        products = await file.getAll();
        console.log(products);
      } catch (error) {
        console.log(error);
      }
  
      await file.deleteAll();
      products = await file.getAll();
      console.log(products);
    } catch (error) {
      console.log("Problemas!!!", error);
    }
  };
  
  main();