const agregarAlCarrito = (cardId, cardTitle, cardPrice) => {
    const KEY_PRODUCTOS_CARRITO = 'productosCarrito'

    const title = document.getElementById(cardTitle)
    const price = document.getElementById(cardPrice)

    const datoParaCarrito = {
        'producto': title.innerText,
        'precio': price.innerText.slice(8)
    }

    const lista = JSON.parse(sessionStorage.getItem(KEY_PRODUCTOS_CARRITO)) || [];
    lista.push(datoParaCarrito);
    sessionStorage.setItem(KEY_PRODUCTOS_CARRITO, JSON.stringify(lista));

    alert('Producto agregado al carrito!')


};



const mainProducts = async () => {
    try {
        const cardsContainer = document.querySelector('.cardsContainer');

        const response = await fetch(`https://dummyjson.com/products?limit=20`);
        if (!response.ok) throw new Error('Error al obtener los productos');
        const data = await response.json();


        data.products.map(product => {

            const productBox = document.createElement('div');

            const productCardId = `product-card-${product.id}`
            const productTitle = `card-title-${product.id}`
            const productPrice = `card-price-${product.id}`

            productBox.innerHTML =
                `<div id=${productCardId} class="card" style="width: 18rem;">
                    <img src="${product.images[0]}" style="width: 300px; height:300px;" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 id="${productTitle}" class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <p id="${productPrice}" >Precio: ${product.price}</p>
                        <button onclick="agregarAlCarrito('${productCardId}','${productTitle}','${productPrice}')" class="btn btn-primary agregarACarrito">Agregar al carrito</button>
                    </div>    
                </div>`;

            cardsContainer.appendChild(productBox);

        });

    } catch (error) {
        console.error('Error en mainProducts:', error);

    }
};



mainProducts();