//cargarProductosDesdeJson();
var contenidoJson = [];
loadLs();

function loadLs() {
    debugger;
    var lista = [];
    //valido que haya algo en el localstorage para renderizar el carro;
    if (JSON.parse(localStorage.getItem('carrito')) == null) {
        localStorage.setItem("carrito", '[]');
    } else {
        lista = JSON.parse(localStorage.getItem('carrito'));
    }
    if (lista.length > 0) {
        for (let item of lista) {
            console.log(item);
            contenidoJson.push(item);
        }
    }
    cargarProductosCarrito(contenidoJson, false);
}


function cargarProductosCarrito(contenidoJson, cargoCarrito) {
    var categoria = document.querySelector('#productos');

    var total = 0;
    if (cargoCarrito) {
        categoria.innerHTML = ''
    }
    for (let item of contenidoJson) {
        //   total = Number(total) + totalPorProductos(Number(item.cantidad),Number(item.precio));
        var totalProductos = totalPorProductos(Number(item.quantity), Number(item.quantity));
        categoria.innerHTML += `
                <tr><!--esto-->
                    <td>
                            <img src="${item.path}" alt="..." class="img-thumbnail">   
                        </td>
                        <td>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h4> ${item.marca}</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <h9>${item.name}</h4>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4>$${item.price}</h4>
                        </td>
                        <td>
                            <div class="input-group">
                                <div class="input-group-prepend" >
                                    <button class="botonCustomCarrito botonCarritoMM"  type="button" onclick="restar(${item.idProduct})">-</button>
                                    <h4 id="${item.idProduct}">${item.quantity}</h4>
                                    <button class="botonCustomCarrito botonCarritoMM"  type="button" onclick="sumar(${item.idProduct})">+</button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <h4 id="idProducto@${item.idProduct}">$${totalProductos > item.price ? totalProductos : item.price}</h4>
                        </td>
                        <td>
                            <a  onClick="eliminarProducto(${item.idProduct})">X</a>
                        </td>
                    </tr><!--esto-->`
    }
    cargarTotalesCarrito(false);
}
function cargarTotalesCarrito(actualizados) {
    var total = 0;
    for (let item of contenidoJson) {
        total = Number(total) + totalPorProductos(Number(item.quantity), Number(item.price));
    }
    var totalCarrito = document.querySelector('#totalCarrito');

    totalCarrito.innerHTML = `<h4 id="totalCarrito">Total $${Number(total)}</h4>
                                   <button type="button id="siguientePaso" class=" btn botonCustomCarrito "  onclick="redirect('/views/CarritoStep2View.html')">Siguiente Paso</button>`
}

function restar(idProduct) {
    var filter = contenidoJson.filter(data => data.idProduct == idProduct)
    var cantidad;
    for (let f of filter) {
        var objeto = new CarritoModel(f.idProduct, f.name, f.marca, f.price, f.path,f.quantity,f.idPrice);
    }
    if (objeto.quantity > 0) {
        objeto.quantity = objeto.quantity - 1;
        var total = totalPorProductos(objeto.quantity, objeto.price);
    }
    if (objeto.quantity == 0) {
        contenidoJson = contenidoJson.filter(data => data.idProduct != objeto.idProduct);
        cargarProductosCarrito(contenidoJson, true);
    } else {
        contenidoJson.filter(data => data.idProduct == idProduct ? data.quantity = objeto.quantity : data.quantity = data.quantity);
        localStorage.setItem("carrito", JSON.stringify(contenidoJson));
        var cantidadProducto = document.getElementById(objeto.idProduct)
        var totalProducto = document.getElementById("idProducto@"+objeto.idProduct);
        bindeo(cantidadProducto, objeto.quantity);
        bindeo(totalProducto, total, true);
        cargarTotalesCarrito(true);
    }
}

function bindeo(element, objeto, esTotal) {
    var signo = ""
    if (esTotal) {
        signo = "$";
    }
    var objCantidad = { a: signo + objeto }
    var a = new Binding({
        object: objCantidad,
        property: "a"
    })
    a.addBinding(element, "value", "keyup")
    a.addBinding(element, "innerHTML")
}

function sumar(idProduct) {
    var filter = contenidoJson.filter(data => data.idProduct == idProduct);
    var objeto;
    for (let f of filter) {
         objeto = new CarritoModel(f.idProduct, f.name, f.marca, f.price, f.path,f.quantity);
    }
    if (objeto.quantity > 0) {
        objeto.quantity = Number(objeto.quantity) + 1;
        var total = totalPorProductos(objeto.quantity, objeto.price);
    }
    contenidoJson.filter(data => data.idProduct == idProduct ? data.quantity = objeto.quantity : data.quantity = data.quantity);
    localStorage.setItem("carrito", JSON.stringify(contenidoJson));
    var cantidades = document.getElementById(objeto.idProduct);
    var totalProducto = document.getElementById("idProducto@"+objeto.idProduct);
    bindeo(cantidades, objeto.quantity);
    bindeo(totalProducto, total, true);
    cargarTotalesCarrito(true);
}
function totalPorProductos(cantidad, precio) {

    return Number(cantidad) * Number(precio);
}
function eliminarProducto(idProduct) {
    contenidoJson = contenidoJson.filter(data => data.idProduct != idProduct);
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
