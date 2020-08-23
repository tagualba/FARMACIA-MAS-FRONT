function initializer(){
    document.getElementById("botonFiltro").click();
}
var contenidoJson = [];
var objetoProducto= [];
var carrito=[];
cargarProductosDesdeJson();
function cargarProductosDesdeJson() {
    fetch('productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                contenidoJson.push(dat);
                objetoProducto.push(new Producto(dat.nombre,dat.descripcion,dat.img,dat.precio,dat.precioTotal,dat.cantidad,dat.idProducto,dat.precioProducto))
            }
            cargarProductosCatalogo(false,objetoProducto);
            console.log(objetoProducto)
        })
        .catch(error => {
            console.log(error);
        })
}

class Producto {
    constructor(nombre, descripcion, img, precio, precioTotal, cantidad, idProducto,  precioProducto) {
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.img = img,
        this.precio = precio,
        this.precioTotal = precioTotal,
        this.cantidad = cantidad,
        this.idProducto = idProducto,
        this.precioProducto = precioProducto
    }
}
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
function cargarProductosCatalogo() {
    var categoria = document.querySelector('#producto');
   
    console.log(categoria)
    for (let item of objetoProducto) {
        categoria.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.img}
                         alt="Card image cap">
                     <div class="card-block">
                         <h3 class="card-title cardProductoT">${item.nombre}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.descripcion}</h4>
                         <h3>$${item.precio}</h3>
                         <button href="#" class="btnprimary cardProductoBTN"  onclick="agregarAlCarrito(${item.idProducto})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}
function agregarAlCarrito(idProducto){
    var productoActual = objetoProducto.filter(data => data.idProducto == idProducto);
   
        //if (carrito.length == 0){
            for(let carritos of productoActual){
                carrito.push(new Carrito(carritos.nombre,carritos.descripcion,carritos.img,carritos.precio,carritos.precioTotal,1,carritos.idProducto,carritos.precioProducto))
            }
        //}else{
            // for (car of carrito){
            //     if (Number(car.idProducto) === Number(idProducto)){
            //         car.cantidad = Number(car.cantidad) + 1;
            //         break;
            //     }
            // }
            
        //}
        localStorage.setItem("carrito", JSON.stringify(carrito));
        console.log(carrito)
}

function catalogoOrdenado(objeto) {
    var categoria = document.querySelector('#producto');
   
    console.log(categoria)
    categoria.innerHTML = ''
    for (let item of objeto) {
        categoria.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.img}
                         alt="Card image cap">
                     <div class="card-block">
                         <h3 class="card-title cardProductoT">${item.nombre}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.descripcion}</h4>
                         <h3>$${item.precio}</h3>
                         <button href="#" class="btnprimary cardProductoBTN"  onclick="agregarAlCarrito(${item.idProducto})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}


function comboChange(opcion){
    let object
    if (opcion == 1){
        //menor a mayor
        object = objetoProducto.sort(((a, b) => a.precio - b.precio));
    }else if (opcion == 2){
        //mayor a menor
        object = objetoProducto.sort(((a, b) => b.precio - a.precio));
    }
    
    catalogoOrdenado(object);
}