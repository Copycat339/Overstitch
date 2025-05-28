document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a, .btn");
  const secciones = document.querySelectorAll(".seccion");
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const totalCarrito = document.getElementById("total-carrito");
  const btnComprar = document.getElementById("btn-comprar");

  let carrito = [];

  // Navegación entre secciones
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const seccion = link.getAttribute("data-seccion");
      if (seccion) {
        secciones.forEach(sec => sec.classList.add("oculto"));
        document.getElementById(seccion).classList.remove("oculto");

        if (seccion === "productos") cargarProductos();
        if (seccion === "carrito") actualizarCarrito();
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

  <div class="opciones-producto">
    <label>Talla:
      <select class="select-talla">
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M" selected>M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
    </label>

    <label>Color:
      <select class="select-color">
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
        <option value="Gris">Gris</option>
        <option value="Rosa">Rosa</option>
        <option value="Beige">Beige</option>
        <option value="Azul marino">Azul marino</option>
      </select>
    </label>
  </div>

  <button class="btn-agregar" 
    data-id="${producto.id}" 
    data-nombre="${producto.nombre}" 
    data-precio="${producto.precio}"
  >Agregar al carrito</button>
`;
          div.querySelector("button").addEventListener("click", agregarAlCarrito);
          contenedor.appendChild(div);
        });
      });
  }

  function agregarAlCarrito(e) {
  const card = e.target.closest(".producto");
  const id = parseInt(e.target.getAttribute("data-id"));
  const nombre = e.target.getAttribute("data-nombre");
  const precio = parseFloat(e.target.getAttribute("data-precio"));
  const talla = card.querySelector(".select-talla").value;
  const color = card.querySelector(".select-color").value;

  const clave = `${id}-${talla}-${color}`; // única combinación

  const productoExistente = carrito.find(item => item.clave === clave);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio, talla, color, cantidad: 1, clave });
  }

  alert(`${nombre} (${talla}, ${color}) agregado al carrito.`);
}

  function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = "<p>Tu carrito está vacío.</p>";
    } else {
      carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
  <span>${item.nombre} (${item.talla}, ${item.color}) x${item.cantidad}</span>
  <span>$${(item.precio * item.cantidad).toFixed(2)} MXN</span>
  <button data-id="${item.clave}" class="eliminar-item">Eliminar</button>
`;
        contenedorCarrito.appendChild(div);

        total += item.precio * item.cantidad;
      });
    }

    totalCarrito.textContent = `Total: $${total.toFixed(2)} MXN`;

   document.querySelectorAll(".eliminar-item").forEach(btn => {
  btn.addEventListener("click", e => {
    const clave = e.target.getAttribute("data-id");
    carrito = carrito.filter(item => item.clave !== clave);
    actualizarCarrito();
  });
});
  }

  btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
    } else {
      alert("¡Gracias por tu compra! Tu pedido ha sido simulado exitosamente.");
      carrito = [];
      actualizarCarrito();
    }
  });
});

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Reemplaza estos valores con los de tu proyecto
const supabaseUrl = 'https://aboroaqzobrlycvlteab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFib3JvYXF6b2JybHljdmx0ZWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MDA3NDksImV4cCI6MjA2Mzk3Njc0OX0.dLIzp9VbZzCXkPzbgsdAwFbZ6rACPc63P6c6aa-FVYE';
const supabase = createClient(supabaseUrl, supabaseKey);
