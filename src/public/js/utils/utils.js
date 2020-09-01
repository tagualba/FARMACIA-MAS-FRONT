function redirect(url){
    window.location.href = url;
}
function loadLs(){
    var carrito = []
    //valido que haya algo en el localstorage para renderizar el carro;
    let ls = JSON.parse(localStorage.getItem('carrito'))
    console.log(ls);
    if(ls == null){
        localStorage.setItem("carrito",'[]');
        return JSON.parse(localStorage.getItem('carrito'))
    }else{
        for(let local of ls){
            carrito.push(local);
        }
        return carrito;
    }
}
function setLs(variableLs,variableValor){
    localStorage.setItem(variableLs, JSON.stringify(variableValor));

}