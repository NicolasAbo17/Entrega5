//global.fetch = require("node-fetch"); 

const fetchProductos = fetch("https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json");
fetchProductos.then(responseProductos => { return responseProductos.json(); })
.then(productos => {
    const fetchPedidos = fetch("https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json");
    fetchPedidos.then(responsePedidos => { return responsePedidos.json() })
    .then(pedidos => {
        let prodCont = new Array(productos.length+1).fill(0);
        pedidos.forEach(pedido => prodCont[pedido.idproducto]+=parseInt(pedido.cantidad));
        
        var idMayor = 0;
        var mayor = prodCont[0];

        for (var i = 1; i < prodCont.length; i++) {
          if (prodCont[i] > mayor) {
              idMayor = i;
              mayor = prodCont[i];
          }
        }
        console.log("Producto más vendido: "+productos[idMayor-1].nombreProducto+" Cantidad de veces que ha sido pedido: "+prodCont[idMayor]); 
    })
})