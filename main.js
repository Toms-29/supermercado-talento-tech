const mainProducts = async () => {
    const cardsContainer = document.querySelector('.cardsContainer')

    const response = await fetch(`https://dummyjson.com/products?limit=20`)
    const data = await response.json()

    data.products.forEach(product => {
        const productBox = document.createElement('div')

        productBox.innerHTML =
            `<div id='product-card-${product.id}' class="card" style="width: 18rem;">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title} title</h5>
                    <p class="card-text">${product.description}</p>
                    <p>Price: ${product.price}</p>
                    <br />
                    <a href="#" class="btn btn-primary">Agregar al carrito</a>
                </div>
            </div>`

        cardsContainer.appendChild(productBox)
    })


}

mainProducts()