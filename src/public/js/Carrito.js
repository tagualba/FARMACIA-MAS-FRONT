//cargarProductosDesdeJson();
var contenidoJson = [];
loadLs();
function cargarProductosDesdeJson() {
    fetch('productos.json')
        .then(data => data.json())
        .then(data => {
            for (dat of data) {
                contenidoJson.push(dat);
            }
            cargarProductosCarrito(contenidoJson, false);
            loadLS();
        })
        .catch(error => {
            console.log(error);
        })
}
function loadLs(){
    debugger;
    var lista =[];
    //valido que haya algo en el localstorage para renderizar el carro;
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        localStorage.setItem("carrito",'[]');
    }else{
         lista = JSON.parse(localStorage.getItem('carrito')) ;
    }
        if (lista.length>0){
            for(let item of lista){
                console.log(item);
                contenidoJson.push(item);
            }
        }
    cargarProductosCarrito(contenidoJson, false);
}

class carrito{
    constructor(producto,cantidad,precioProducto){
        this.producto = producto,
        this.cantidad = cantidad,
        this.precioProducto = precioProducto
    }
}

function cargarProductosCarrito(contenidoJson, cargoCarrito) {
    var categoria = document.querySelector('#productos');

    var total = 0;
    if (cargoCarrito) {
        categoria.innerHTML = ''
    }
    for (let item of contenidoJson) {
        //   total = Number(total) + totalPorProductos(Number(item.cantidad),Number(item.precio));
        var totalProductos = totalPorProductos(Number(item.cantidad), Number(item.precio));
        categoria.innerHTML += `
                <tr><!--esto-->
                    <td>
                            <img src="${item.img}" alt="..." class="img-thumbnail">   
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h4> ${item.nombre}</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h9>${item.descripcion}</h4>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4>$${item.precio}</h4>
                        </td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend" >
                                    <button class="botonCustomCarrito botonCarritoMM"  type="button" onclick="restar(${item.idProducto})">-</button>
                                    <h4 id="${item.idProducto}">${item.cantidad}</h4>
                                    <button class="botonCustomCarrito botonCarritoMM"  type="button" onclick="sumar(${item.idProducto})">+</button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4 id="${item.precioProducto}">$${totalProductos > item.precio ? totalProductos : item.precio}</h4>
                        </td>
                        <td>
                            <a  onClick="eliminarProducto(${item.idProducto})">X</a>
                        </td>
                    </tr><!--esto-->`
    }
    cargarTotalesCarrito(false);
}
function cargarTotalesCarrito(actualizados) {
    var total=0;
    for (let item of contenidoJson) {
        total = Number(total) + totalPorProductos(Number(item.cantidad), Number(item.precio));
    }
        var totalCarrito = document.querySelector('#totalCarrito');
        
        totalCarrito.innerHTML = `<h4 id="totalCarrito">Total $${Number(total)}</h4>
                                   <button type="button id="siguientePaso" class=" btn botonCustomCarrito ">Siguiente Paso</button>`   
}

class producto {
    constructor(nombre, descripcion, img, precio, cantidad, idProducto,  precioProducto) {
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.img = img,
        this.precio = precio,
        this.cantidad = cantidad,
        this.idProducto = idProducto,
        this.precioProducto = precioProducto
    }
}
function restar(idProducto) {
    var filter = contenidoJson.filter(data => data.idProducto == idProducto)
    var cantidad;
    for (let f of filter) {
        var objeto = new producto(f.nombre, f.descripcion, f.img, f.precio,f.cantidad, f.idProducto, f.precioProducto);
    }
    if (objeto.cantidad > 0) {
        objeto.cantidad = objeto.cantidad - 1;
        var total = totalPorProductos(objeto.cantidad, objeto.precio);
    }
    if (objeto.cantidad == 0) {
        contenidoJson = contenidoJson.filter(data => data.idProducto != objeto.idProducto);
        cargarProductosCarrito(contenidoJson, true);
    } else {
        contenidoJson.filter(data => data.idProducto == idProducto ? data.cantidad = objeto.cantidad : data.cantidad = data.cantidad);
        localStorage.setItem("carrito", JSON.stringify(contenidoJson)); 
        var cantidadProducto = document.getElementById(objeto.idProducto)
        var totalProducto = document.getElementById(objeto.precioProducto);
        bindeo(cantidadProducto,objeto.cantidad);
        bindeo(totalProducto,total,true);
        cargarTotalesCarrito(true);
    }
}

function bindeo(element,objeto,esTotal){
    var signo = ""
    if (esTotal){
        signo = "$";
    }
    var objCantidad = { a: signo + objeto}
        var a = new Binding({
            object: objCantidad,
            property: "a"
        })
        a.addBinding(element, "value", "keyup")
        a.addBinding(element, "innerHTML")
}

function sumar(idProducto) {
    var filter = contenidoJson.filter(data => data.idProducto == idProducto);
    var cantidad = 0;
    var objeto;
    for (let f of filter) {
         objeto = new producto(f.Producto, f.descripcion, f.img, f.precio, f.cantidad, f.idProducto, f.precioProducto);
    }
    if (objeto.cantidad > 0) {
        objeto.cantidad = Number(objeto.cantidad) + 1 ;
        var total = totalPorProductos(objeto.cantidad, objeto.precio);
    }
    contenidoJson.filter(data => data.idProducto == idProducto ? data.cantidad = objeto.cantidad : data.cantidad = data.cantidad);
    localStorage.setItem("carrito", JSON.stringify(contenidoJson));
    var cantidades = document.getElementById(objeto.idProducto);
    var totalProducto = document.getElementById(objeto.precioProducto);
    bindeo(cantidades,objeto.cantidad );
    bindeo(totalProducto,total,true);
    cargarTotalesCarrito(true);
}
function totalPorProductos(cantidad, precio) {

    return Number(cantidad) * Number(precio);
}
function eliminarProducto(idProducto) {
    contenidoJson = contenidoJson.filter(data => data.idProducto != idProducto);
    console.log(contenidoJson)
    localStorage.setItem("carrito", JSON.stringify(contenidoJson));
    cargarProductosCarrito(contenidoJson, true);
}
function Binding(b) {
    _this = this
    this.elementBindings = []
    this.value = b.object[b.property]
    this.valueGetter = function () {
        return _this.value;
    }
    this.valueSetter = function (val) {
        _this.value = val
        for (var i = 0; i < _this.elementBindings.length; i++) {
            var binding = _this.elementBindings[i]
            binding.element[binding.attribute] = val
        }
    }
    this.addBinding = function (element, attribute, event) {
        var binding = {
            element: element,
            attribute: attribute
        }
        if (event) {
            element.addEventListener(event, function (event) {
                _this.valueSetter(element[attribute]);
            })
            binding.event = event
        }
        this.elementBindings.push(binding)
        element[attribute] = _this.value
        return _this
    }

    Object.defineProperty(b.object, b.property, {
        get: this.valueGetter,
        set: this.valueSetter
    });

    b.object[b.property] = this.value;
}
