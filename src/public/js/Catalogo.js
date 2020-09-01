var contenidoJson = [];
var contenidoJsonCategorias = [];
var contenidoJsonSubCategorias = [];
var objetoProducto = [];
var carrito = [];
var categorias = [];
var subcategorias = [];

renderCategorias();
function initializer() {
    document.getElementById("botonFiltro").click();
    loadProducts();
    cargarCategoriasDesdeJson();
    renderCategorias()
}

function loadProducts() {
    const url = 'https://localhost:5001/api/product/getcatalogall';
    var prueba = [];
    fetch(url)
        .then(data => data.json())
        .then(data => {
            for (dat of data.productsCards){
                prueba.push(dat)
            }
            for(pr of prueba){
                objetoProducto.push(new ProductoModel(pr.idProduct, pr.name, pr.marca, pr.price, pr.path,1))
            }
            debugger
            console.log("asdasdasd",objetoProducto);
            cargarProductosCatalogo(objetoProducto);
        })
        .catch(error => {
            console.log(error);
        })
}
//check("@",1)
function cargarCategoriasDesdeJson() {
    fetch('categorias.json')
        .then(data1 => data1.json())
        .then(data1 => {
            for (dat of data1) {
                contenidoJsonCategorias.push(dat);
                categorias.push(new Categorias(dat.idCategoria, dat.nombre))
            }
            cargarSubcategorias();
        })
        .catch(error => {
            console.log(error);
        })

}

function cargarSubcategorias() {
    fetch('subcategorias.json')
        .then(data2 => data2.json())
        .then(data2 => {
            //debugger;
            for (dat of data2) {
                contenidoJsonSubCategorias.push(dat);
                subcategorias.push(new Categorias(dat.idSubCategoria, dat.nombre, dat.idCategoria));
            }
            renderCategorias();
        })
        .catch(error => {
            console.log(error);
        })
}


class Categorias {
    constructor(idCategoria, nombre) {
        this.idCategoria = idCategoria,
            this.nombre = nombre
    }
}

class SubCategorias {
    constructor(idSubCategoria, nombre, idCategoria) {
        this.idSubCategoria = idSubCategoria,
            this.nombre = nombre
        this.idCategoria = idCategoria
    }
}

function cargarProductosCatalogo(objetoProducto) {
    var catalogo = document.querySelector('#producto');

    console.log(catalogo)
    for (let item of objetoProducto) {
        catalogo.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.path}
                         alt="Card image cap">
                     <div class="card-block" >
                         <h3 class="card-title cardProductoT">${item.marca}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.name}</h4>
                         <h3>$${item.price}</h3>
                         <button href="#"  class="btnprimary cardProductoBTN" " onclick="agregarAlCarrito(${item.idProduct})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}
function agregarAlCarrito(idProduct) {
    var productoActual = objetoProducto.filter(data => data.idProduct == idProduct);
    var estaAgregado;
    debugger;
    var carrito = loadLs();
    console.log(carrito)
    if (carrito.length == 0){
        for (let carritos of productoActual) {
        carrito.push(new CarritoModel(carritos.idProduct, carritos.name, carritos.marca, carritos.price, carritos.path,1,Math.floor((Math.random() * 1000000) + 1)))
    }
    }else{
     for (let car of carrito){
         if (Number(car.idProduct) === Number(idProduct)){
             car.quantity = Number(car.quantity) + 1;
             estaAgregado = true;
             break;
         }
     }
     if(!estaAgregado){
        for (let carritos of productoActual) {
            carrito.push(new CarritoModel(carritos.idProduct, carritos.name, carritos.marca, carritos.price, carritos.path,1,Math.floor((Math.random() * 1000000) + 1)))
        }
     }

    }
    setLs("carrito",carrito);

}
// function check(id) {
//     console.log(document.getElementById(id))//.setAttribute('checked', 'checked');      
// }

function catalogoOrdenado(objeto) {
    var catalogo = document.querySelector('#producto');
    catalogo.innerHTML = ''
    for (let item of objeto) {
        catalogo.innerHTML += `
            <div class="col-xs-12 col-md-4  d-flex justify-content-center" >
                <div class="card cardCatalogo">
                     <img class="card-img-top img-fluid"
                         src=${item.path}
                         alt="Card image cap">
                     <div class="card-block">
                         <h3 class="card-title cardProductoT">${item.marca}</h3>
                         <h4 class="card-subtitle cardProductoST">${item.name}</h4>
                         <h3>$${item.price}</h3>
                         <button href="#" class="btnprimary cardProductoBTN"  onclick="agregarAlCarrito(${item.idProduct})">Agregar al carrito</button>
                     </div>
                </div>     
            </div>             
             `
    }
}
class Categoria {
    constructor(idCategoria, nombre) {
        this.idCategoria = idCategoria,
            this.nombre = nombre
    }

}
class SubCategoria {
    constructor(idSubCategoria, nombre, idCategoria) {
        this.idSubCategoria = idSubCategoria,
            this.nombre = nombre,
            this.idCategoria = idCategoria
    }

}
function renderCategorias() {
    var acordeonCategorias = document.querySelector('#subaccordion1');
    var categoryHtmlBase =
    `<div id="Categoria@IDCATEGORIA">                                                  
        <div class="card border-0">
            <!--CATEGORIA HEADER-->  
            <div class="card-header bg-white border-0 p-1" id="HeaderCategoria@IDCATEGORIA">
                <div class="mb-0">    
                    <div class="form-check">
                        <div class="custom-control form-control-lg custom-checkbox">  
                            <input type="checkbox" value="IDCATEGORIA" class="custom-control-input checkBoton" id="IDCATEGORIA"><!--ID-->
                            <label class="custom-control-label" for="IDCATEGORIA"><!--Hace regerencia al id del check-->
                                <h7>@CATEGORIANOMBRE</h7>  
                            </label> 
                            <label class="custom-control-label"
                                data-toggle="collapse" data-target="#Subcategoria@IDSUBCATEGORIA
                                aria-expanded="true" aria-controls="Subcategoria@IDSUBCATEGORIA"> <!--Apunta al SubCategoriaContenedor para manejar el escondido de eso-->                                              
                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill flechita" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                    </svg> 
                            </label> 
                        </div>                                                                                                                             
                    </div>                                                     
                </div>
            </div>
            <!--CATEGORIA HEADER-->  

            <div id="Subcategoria@IDSUBCATEGORIA" class="collapse" aria-labelledby="HeaderCategoria@IDCATEGORIA"
                data-parent="#Categoria@IDCATEGORIA"><!--SubcategoriaContenedor-->
                    <div class="card-body p-1 ml-2">
                        @SUBCATEGORIASCONTAINER
                    </div>
            </div>
        </div>
    </div>`;
    var resCategorys="";
    for (let category of contenidoJsonCategorias)
    {   
        var auxCategory = categoryHtmlBase.replace(/IDCATEGORIA/g, category.idCategoria);
        auxCategory = auxCategory.replace(/@CATEGORIANOMBRE/g, category.nombre);
        for(let subCategoria of category.subCategorias){  
            auxCategory = auxCategory.replace(/IDSUBCATEGORIA/g, subCategoria.idSubCategoria);
        }
        //filter.categorys.push("CheckBoxCategoria" + category.id);
        resCategorys += auxCategory
        var subCategoryHtmlBase = 
        `<div class="form-check">
            <div class="custom-control form-control-lg custom-checkbox">  
                <input type="checkbox" class="custom-control-input checkBoton" id="SubCategoriaCheckBox@IDSUBCATEGORIA">  
                <label class="custom-control-label" for="SubCategoriaCheckBox@IDSUBCATEGORIA">
                    <h7>@SUBCATEGORIANOMBRE</h7>  
                </label>  
            </div>  
        </div>`;
        
        
        //debugger; 
        for(let subCategoria of category.subCategorias)
        {  
   //         debugger;
            if(Number( subCategoria.idCategoria) == Number(category.idCategoria)){
                var aux = subCategoryHtmlBase.replace(/IDSUBCATEGORIA/g, subCategoria.idSubCategoria);
                
                aux = aux.replace(/@SUBCATEGORIANOMBRE/g, subCategoria.nombre);
                
                resCategorys += aux;
            }
            //filter.subCategorys.push("SubCategoriaCheckBox" + subCategory.idSubCategoria);
        }

        resCategorys += auxCategory.replace(/SUBCATEGORIASCONTAINER/g, resCategorys);
    }
 //   console.log(resCategorys);
    acordeonCategorias.innerHTML = resCategorys;
}

function comboChange(opcion) {
    let object
    if (opcion == 1) {
        //menor a mayor
        object = objetoProducto.sort(((a, b) => a.price - b.price));
    } else if (opcion == 2) {
        //mayor a menor
        object = objetoProducto.sort(((a, b) => b.price - a.price));
    }

    catalogoOrdenado(object);
}