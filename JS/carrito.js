const productosEnStorage = JSON.parse(sessionStorage.getItem('productosCarrito')) || []

const productosTitle = productosEnStorage.map(dato => (dato.producto))


const crearListaCarrito = async (producto, cantidad) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${producto}`);
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();


        const carrito = document.querySelector('.cajaDeProductosDelCarrito')
        const hola = document.createElement('div')
        hola.setAttribute('class', 'cardCarrito')


        hola.innerHTML = `
                <div class="col-md-4">
                    <img src="${data.products[0].images[0]}" class="img-fluid rounded-start" style='width: 200px; height:200px;' alt="${data.title}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${data.products[0].title}</h5>
                    <p class="card-text">${data.products[0].description}</p>
                    <p class="card-text"><small class="text-muted">${data.products[0].price}</small></p>
                    <input id='cantidadProducto' type='number' min='1' required value=${cantidad} />
                    <button class='btn btn-danger' onclick='' >Eliminar</button>
                </div>`

        carrito.appendChild(hola)



    } catch (error) {
        console.error('Error en crearCarrito:', error);

    }

}


const crearCalculoPago = (datos, tituloProductos) => {
    const boxDePago = document.querySelector('.calculoPago')

    boxDePago.innerHTML = ''

    const tituloBoxPago = document.createElement('h1')
    tituloBoxPago.textContent = 'Lista de compra:'

    const totalAPagar = document.createElement('h2')
    let suma = 0

    const listaDeProductos = document.createElement('ul')

    const detalles = datos.map(dato => {

        let cantidad = tituloProductos.filter(p => p === dato.producto).length
        suma += dato.precio * cantidad
        return { producto: dato.producto, precio: (dato.precio * cantidad).toFixed(2) }

    })

    totalAPagar.innerHTML = `<span>Total a pagar:</span> <span>$${(suma).toFixed(2)}</span>`

    const seenIds = new Set();

    detalles.forEach(detalle => {
        if (!seenIds.has(detalle.producto)) {
            seenIds.add(detalle.producto)

            const itemProductList = document.createElement('li')
            itemProductList.setAttribute('class', 'itemProductList')
            itemProductList.innerHTML = `<span>${detalle.producto}</span>  <span>$${detalle.precio}</span>`
            listaDeProductos.appendChild(itemProductList)
        }
    });


    boxDePago.appendChild(tituloBoxPago)
    boxDePago.appendChild(listaDeProductos)
    boxDePago.appendChild(totalAPagar)

}





if (productosEnStorage.length > 0) {
    const productos = [... new Set(productosTitle)]

    productos.map(producto => {
        let cantidad = productosTitle.filter(p => p === producto).length

        crearListaCarrito(producto, cantidad)

    })

    crearCalculoPago(productosEnStorage, productosTitle)


} else {
    const carrito = document.querySelector('.cajaDeProductosDelCarrito')
    carrito.innerHTML = '<h1 class="mensajeCarrito">No hay productos en el carrito</h1>'

}

