var carrito = [];
var objetoProducto = [];
document.getElementById("nextCarruselCards1").addEventListener("click", function () {
    document.getElementById('nextCarruselCardButton1').click();
}, false);

document.getElementById("nextCarruselCards2").addEventListener("click", function () {
    document.getElementById('nextCarruselCardButton2').click();
}, false);

document.getElementById("nextCarruselCards3").addEventListener("click", function () {
    document.getElementById('nextCarruselCardButton3').click();
}, false);

document.getElementById("prevCarruselCards1").addEventListener("click", function () {
    document.getElementById('prevCarruselCardButton1').click();
}, false);

document.getElementById("prevCarruselCards2").addEventListener("click", function () {
    document.getElementById('prevCarruselCardButton2').click();
}, false);

document.getElementById("prevCarruselCards3").addEventListener("click", function () {
    document.getElementById('prevCarruselCardButton3').click();
}, false);

document.getElementById("nextCarruselCardButton1").addEventListener("click", function () {
}, false);

function Initializer() {
    document.getElementById("CarritoHTML").style.visibility = 'hidden';
    // loadLs()
}
loadLs()

function getCarrito() {
    document.getElementById("CarritoHTML").style.visibility = 'visible';
}

cargarProductosDesdeJson();
//deuda tecnica. ver de centralizar
class Producto {
            constructor(nombre, descripcion, img, precio, precioTotal, cantidad, idProducto, precioProducto) {
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
function loadLs() {
    //valido que haya algo en el localstorage para renderizar el carro;
    let ls = JSON.parse(localStorage.getItem('carrito'))
    console.log(ls);
    if (ls == null) {
        localStorage.setItem("carrito", '[]');
    } else {
        for (let local of ls) {
            carrito.push(local);
        }
    }
}

function cargarProductosDesdeJson() {
    fetch('./views/productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                objetoProducto.push(new Producto(dat.nombre, dat.descripcion, dat.img, dat.precio, dat.precioTotal, dat.cantidad, dat.idProducto, dat.precioProducto))
            }
            renderCarrousel();
        })
        .catch(error => {
            console.log(error);
        })
    .catch(erro => {
        console.log(erro);
    })
    console.log(objetoProducto)    

}
function renderCarrousel() {
    debugger;
    var i = 0;
    var carrousel1 = document.querySelector('#row1');
    var list = []
    var dom = `               
    <div class='col-6 col-md-6 col-lg-3 col-xl-3'>
        <div class="card cardProducto" >
            <img class="card-img-top img-fluid"
            src="@ProductoImg"
            alt="Card image cap">
            <div class="card-block">
                <h3 class="card-title cardProductoT">@ProductoNombre</h3>
                <h4 class="card-subtitle cardProductoST">@descripcion</h4>
                <h3>$22</h3>
                <button href="#" class='btnprimary cardProductoBTN' id = "@idProducto">Agregar al carrito</button>
            </div>
        </div>                      
    </div>`

    for(item of objetoProducto){
        list.push(item);
        }
        console.log(list[5])
    for (var i = 0; i<list; i++){
        var dom1 = dom.replace(/@ProductoImg/g, list[i].img);
            dom1 = dom.replace(/@ProductoNombre/g, list[i].nombre);
            dom1 = dom.replace(/@descripcion/g, list[i].descripcion);
            dom1 = dom.replace(/@idProducto/g, list[i].idProducto);
        carrousel1.innerHTML += dom1
        if ( list[i] == 4 ){
            break;
        }
    }
        
}