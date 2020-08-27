var carrito = [];
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
renderCarrousel();

function cargarProductosDesdeJson() {
    fetch('./public/views/productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                contenidoJson.push(dat);
                objetoProducto.push(new Producto(dat.nombre, dat.descripcion, dat.img, dat.precio, dat.precioTotal, dat.cantidad, dat.idProducto, dat.precioProducto))
            }
            cargarProductosCatalogo();
        })
        .catch(error => {
            console.log(error);
        })

}
function renderCarrousel() {

    var carrousel1 = document.querySelector('#Carrousel1');
    //for (let item of objetoProducto) {
    carrousel1.innerHTML = `                                 
    <br>
    <h5>Cosmeticos</h5>
    <hr class="separator1">
    <div class='row'>
        <div class='col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
            <div class="card cardProducto">
                <img class="card-img-top img-fluid" src="/resources/productoTest.jpg"
                    alt="Card image cap">
                <div class="card-block">
                    <h3 class="card-title cardProductoT">Producto</h3>
                    <h4 class="card-subtitle cardProductoST">descripcion</h4>
                    <h3>$22</h3>
                    <button href="#" class='btnprimary cardProductoBTN'>Agregar al
                        carrito</button>
                </div>
            </div>
        </div>

        <div class='col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
            <div class="card cardProducto">
                <img class="card-img-top img-fluid" src="/resources/productoTest.jpg"
                    alt="Card image cap">
                <div class="card-block">
                    <h3 class="card-title cardProductoT">Producto</h3>
                    <h4 class="card-subtitle cardProductoST">descripcion</h4>
                    <h3>$22</h3>
                    <button href="#" class='btnprimary cardProductoBTN'>Agregar al
                        carrito</button>
                </div>
            </div>
        </div>

        <div class='col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
            <div class="card cardProducto">
                <img class="card-img-top img-fluid" src="/resources/productoTest.jpg"
                    alt="Card image cap">
                <div class="card-block">
                    <h3 class="card-title cardProductoT">Producto</h3>
                    <h4 class="card-subtitle cardProductoST">descripcion</h4>
                    <h3>$22</h3>
                    <button href="#" class='btnprimary cardProductoBTN'>Agregar al
                        carrito</button>
                </div>
            </div>
        </div>

        <div class='col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'>
            <div class="card cardProducto">
                <img class="card-img-top img-fluid" src="/resources/productoTest.jpg"
                    alt="Card image cap">
                <div class="card-block">
                    <h3 class="card-title cardProductoT">Producto</h3>
                    <h4 class="card-subtitle cardProductoST">descripcion</h4>
                    <h3>$22</h3>
                    <button href="#" class='btnprimary cardProductoBTN'>Agregar al
                        carrito</button>
                </div>
            </div>
        </div>

    </div>`
    //}
}