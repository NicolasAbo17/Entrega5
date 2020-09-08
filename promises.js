function makeXHRRequest(method, url, done) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () { return new Promise().resolve(); };
    xhr.onerror = function () { return new Promise().reject(); };
    xhr.send();
}

makeXHRRequest('GET', 'https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json')
    .then(function (response1) {
        return response1.json();
    }).then(function (productos) {
        prodCont = new Array(productos.length + 1).fill(0);

        makeXHRRequest('GET', 'https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
            .then(function (response2) {
                return response2.json();
            }).then(function (pedidos) {
                pedidos.array.forEach(element => {
                    prodCont[element.idproducto] += parseInt(element.cantidad);
                });
                var mayor = 0; var id = 0;
                for (var i = 1; i < prodCont.length; i++) {
                    if (prodCont[i] > mayor) {
                        mayor = prodCont[i];
                        id = i;
                    }
                }
                console.log("El producto más pedido es: " + productos[id - 1].nombreProducto);
            });

    });