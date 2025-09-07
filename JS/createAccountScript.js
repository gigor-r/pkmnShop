
let usuariosBases = [{ nombre: "Ash Ketchum", pass: "pikachu123", email: "" },
{ nombre: "Misty", pass: "togepi123", email: "" }];
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosBases;
// Referencias a los elementos del formulario
const user = document.getElementById("nombre");
const contra1 = document.getElementById("pass1");
const contra2 = document.getElementById("pass2");
const email1 = document.getElementById("email");
const form = document.getElementById("Form");
const parrafoWarning = document.getElementById("warning");


if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();// Evita el envío del formulario

    let warning = "";
    // Expresión regular para validar email
    let regaxEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    let entrar = false;

    if (user.value.length < 6) {
      warning += "El nombre debe tener al menos 6 caracteres <br>";
      entrar = true;
    }

    if (!regaxEmail.test(email1.value)) {
      warning += "El email no es válido <br>";
      entrar = true;
    }

    if (contra1.value.length < 8) {
      warning += "La contraseña debe tener al menos 8 caracteres <br>";
      entrar = true;
    }

    if (contra1.value !== contra2.value) {
      warning += "Las contraseñas no coinciden <br>";
      entrar = true;
    }

    if (entrar) {
      parrafoWarning.innerHTML = warning;
      return;
    } else {
      parrafoWarning.innerHTML = "Usuario registrado";

      if (usuarios.find(u => u.nombre.toLowerCase() === user.value.toLowerCase())) {
        alert("El nombre de usuario ya existe");
        return;
      }
      if (usuarios.find(u => u.email.toLowerCase() === email1.value.toLowerCase())) {
        alert("El email ya está registrado");
        return;
      }

      let usuario = {
        nombre: user.value,
        pass: contra1.value,
        email: email1.value
      };
      usuarios.push(usuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      alert("Usuario registrado con éxito");
      form.reset();
      window.location.href = "IniciarSession.html";
    }
  });
}


//  Función que valida login
function loguear() {

  const nombre = document.getElementById("loginNombre").value;
  const pass = document.getElementById("loginPass").value;
  // Recuperar usuarios guardados en localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  // Buscar coincidencia
  const user = usuarios.find(u => u.nombre === nombre && u.pass === pass);


  if (!nombre || !pass) {
    alert("Por favor, complete todos los campos");
    return;
  }
  if (user) {
    localStorage.setItem("usuario", user.nombre);
    alert("Bienvenido " + user.nombre);
    window.location.href = "menuPokeShop.html"; // Redirige a inicio
    return true;
  } else {
    alert("Nombre o contraseña incorrectos");

  }
  return false;
}

function logout() {
  localStorage.removeItem("usuario");
  window.location.href = "menuPokeShop.html";
}

function actualizarNavbar() {
  const authLinks = document.getElementById("authLinks");
  if (!authLinks) return;

  const usuario = localStorage.getItem("usuario");
  authLinks.innerHTML = "";

  if (usuario) {
    authLinks.innerHTML = `

    <nav id="nav1">
        <ul >
        
            <li><a href="menuPokeShop.html"><img src="images/menuPokeShopImages/pokeballIcon.png" height="50px" width="50px" alt="pagPrincipal" id="pokeballIcon"></a></li>
            <li><a href="#">Cart</a></li>
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" high="50px" width="50px" aria-expanded="false">
            <img src="images/menuPokeShopImages/lucas.png" hight="50px">${usuario}</a>
            <il class="dropdown-menu" style="background-color: #2c3e50;">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            </il class="dropdown-menu">
            <li><a href="#" onclick="logout()">Cerrar sesión</a></li>
        </ul>
        <il id="authLinks"></il>
    </nav>
    `;
  } else {
    authLinks.innerHTML = `
      <nav id="nav1">
        <ul >
            <li><a href="menuPokeShop.html"><img src="images/menuPokeShopImages/pokeballIcon.png" height="50px" width="50px" alt="pagPrincipal" id="pokeballIcon"></a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="IniciarSession.html">Login</a></li>
            <li><a href="createAccount.html">Register</a></li>
        </ul>
        <il id="authLinks"></il>
    </nav>
    `;
  }
}

document.addEventListener("DOMContentLoaded", actualizarNavbar);

