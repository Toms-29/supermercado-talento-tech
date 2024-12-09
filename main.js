const apiCall = async () => {
    try {
        const response = await fetch(`https://dummyjson.com/products`)
        const data = await response.json()
        console.log(data.products)
    } catch (error) {
        const errorMesaje = `Error al llamar a la api: ${error}`
        return errorMesaje
    }
}

apiCall()