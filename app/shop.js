// items

const inventarioProductos = [
    {
        id: 1,
        nombre: "Taza serie 001",
        desc: "Taza de cerámica realizada a mano en torno alfarero esmaltada jaspeada.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item1.jpeg',
        cantidad:1
    },

    {
        id: 2,
        nombre: "Jarra serie 001",
        desc: "Mini jarra de cerámica realizada a mano en torno alfarero esmaltada color blanco.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item2.jpeg',
        cantidad:1
    },

    {
        id: 3,
        nombre: "Bowl serie 001",
        desc: "Mini bowl de cerámica realizado a mano en torno alfarero esmaltada color negro.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item3.jpeg',
        cantidad:1
    },

    {
        id: 4,
        nombre: "Florero serie 001",
        desc: " Mini florero de cerámica realizado a mano en torno alfarero esmaltado color natural.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item4.jpeg',
        cantidad:1
    },

    {
        id: 5,
        nombre: "Maceta serie 001",
        desc: "Maceta de cerámica realizada a mano en torno alfarero esmaltada en color natural.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item5.jpeg',
        cantidad:1
    },

    {
        id: 6,
        nombre: "Florero serie 002",
        desc: "Florero amorfo realizado a mano esmaltado en color blanco.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item6.jpeg',
        cantidad:1
    },

    {
        id: 7,
        nombre: "Taza serie 002",
        desc: "Taza de cerámica realizada a mano en torno alfarero esmaltada en color blanco.",
        dimensiones: "Dimensiones: xcm alto x xcm Ø",
        precio: 500,
        img: '/app/public/img/item7.jpeg',
        cantidad:1
    },

    {
        id: 8,
        nombre: "Servicio de enmarcación",
        desc: "Enmarcados hechos a mano por encargo. Buscamos la mejor opción para resaltar tu obra. Contactános!",
        dimensiones: "Dimensiones: a convenir",
        precio: 500,
        img: '/app/public/img/imagen1.jpeg',
        cantidad:1
    }
]

// Capturo el id "contenedor-productos" para mostrar dinámicamente todos los productos del array de artículos 

const contenedorProductos = document.getElementById("contenedor-productos");

// función para mostrar dinámicamente en el dom los productos, consultando en stock.json.

const mostrarProductos = async () => {
    try {
        // ejecuto este código y si hay algún error lo capturo con catch. Await para esperar la request, y lo almaceno en la variable "response"
        const response = await fetch ("../stock.json") // --> en formato Json
        console.log(response)

        const data = await response.json(); // parseo, formato array de objetos
        console.log(data);
        
        data.forEach(producto => {
            const article = document.createElement("article"); // genero el elemento article
    
            article.classList.add("items"); // agrego clase ".items"
    
            article.innerHTML += `<div class="product-img" id="item-img1" > 
                        <a href="#"><img src="${producto.img}"></a>
                    </div>
                    <div class="product-name">
                        <h5><a href="#">${producto.nombre}</a></h5>
                    </div>
                    <div class="description">
                        <p>${producto.desc}<br>
                        ${producto.dimensiones}
                        </p>
                    </div>
                    <div class="product-price">
                        <span class="price">$ ${producto.precio}</span>
                        <button type="button" class="btn agregar-al-carrito btn-dark border-0 rounded-0" id="btn${producto.id}">Agregar al carrito</button>
                    </div>`
                    
            contenedorProductos.appendChild(article) 
        })

        return data;

    } catch (error) {
        console.log("Hubo un error", error) //muestro el error
    }
}

mostrarProductos();

// función para agregar artículo al carrito

const agregarAlCarrito = (inventarioProductos) => {

    inventarioProductos.forEach(producto => {

        const botonAgregarAlCarrito = document.getElementById(`btn${producto.id}`);
        
        botonAgregarAlCarrito.addEventListener("click", () => {
            carritoOffcanvas(producto.id);
            // console.log(producto.id);
            // console.log(producto.nombre);
            // console.log(producto.precio);
            botonAgregarAlCarrito.innerText = "Agregado!"
        })
    })  
}

agregarAlCarrito(inventarioProductos);

// función para mostrar en offcanvas el detalle del carrito

let carritoDeCompras = []; // --> array vacío para almacenar los datos que obtengo con click

const carritoOffcanvas = (productoId) => {
    let producto = inventarioProductos.find(producto => producto.id === productoId); // busco con find si hay una coincidencia en el array con el productoId que paso por parámetro (1, 2, 3)
    //producto.cantidad = 1; // inicializo la cantidad en 1

    carritoDeCompras.push(producto);

    let div = document.createElement("div");

    div.innerHTML = `<div id= "carrito-items">
                        <p>${producto.nombre}</p>
                        <p>Precio: $ ${producto.precio}</p>
                        <p id"cantidad${producto.id}"> Cantidad ${producto.cantidad}</p>
                        <button id "eliminar${producto.id}" class ="btn-eliminar"><i class="fa-solid fa-trash-can"></i></button> 
                    </div>
                    <div id= "carrito-footer">
                        <p>TOTAL</p>
                        <p class="carrito-total"></p>
                        <button class="carrito-checkout" type="button">Comprar</button>
                    </div>`;

    const bodyOffcanvas = document.querySelector(".offcanvas-body");
    bodyOffcanvas.appendChild(div);
    guardarStorage();
}

carritoOffcanvas();

function guardarStorage (){
    let carritoGuardado = localStorage.setItem("Carrito", JSON.stringify(carritoDeCompras))
    console.log(carritoGuardado)
}





