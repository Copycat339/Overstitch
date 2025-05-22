document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a, .btn");
  const secciones = document.querySelectorAll(".seccion");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const texto = link.textContent.trim().toLowerCase();
      const seccion = document.getElementById(texto);

      if (seccion) {
        secciones.forEach(sec => sec.classList.add("oculto"));
        seccion.classList.remove("oculto");

        // Si vamos a productos, cargar productos
        if (texto === "productos") cargarProductos();
      }
    });
  });

  function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    fetch("productos.json")
      .then(res => res.json())
      .then(productos => {
        productos.forEach(producto => {
          const div = document.createElement("div");
          div.classList.add("producto");
          div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio} MXN</p>
            <button>Agregar al carrito</button>
          `;
          contenedor.appendChild(div);
        });
      });
  }
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const seccion = e.target.getAttribute("data-seccion");

    document.querySelectorAll(".seccion").forEach(sec => {
      sec.classList.add("oculto");
    });

    document.getElementById(seccion).classList.remove("oculto");
  });
});