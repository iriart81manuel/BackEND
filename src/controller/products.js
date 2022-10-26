const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductosApi {
    constructor() {
        this.productos = [
            { id: uuidv4(), title: 'remera', price: 120 }
        ]
    }

    exist(id) {

        const indice = this.productos.findIndex(productId => productId.id == id);

        return indice >= 0 ;
    }

    getAll() {
        return this.productos;
    }

    getById(id) {

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(productId => productId.id == id);

        return this.productos[indice];
    }

    save(data) {
        
        if(!data.title || !data.price) throw createError(400, 'Datos invalidos');

        const nuevoProducto ={
            title: data.title,
            price: data.price,
            id: uuidv4(),
        }

        this.productos.push(nuevoProducto);

        return nuevoProducto;
    }

    update(id, dataNueva) {

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(productId => productId.id == id);
        const producto = this.productos[indice];
        
        const nuevoProducto ={
            title: dataNueva.title,
            price: dataNueva.price,
            id: producto.id,
        }

        this.productos.splice(indice, 1, nuevoProducto);

        return nuevoProducto;
    }

    deleteById(id) {

        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(productId => productId.id == id);

        this.productos.splice(indice, 1);
    }

};

const instanciaProductosApi = new ProductosApi();

module.exports = {
    ProductosController: instanciaProductosApi
}