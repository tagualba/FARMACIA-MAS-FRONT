class Carrito {
    constructor(nombre, descripcion, img, precio, precioTotal, cantidad, idProducto,  precioProducto) {
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.img = img,
        this.precio = precio,
        this.precioTotal = precioTotal,
        this.cantidad = cantidad,
        this.idProducto = Number(idProducto),
        this.precioProducto = precioProducto
    }
}
Module.exports = Carrito;