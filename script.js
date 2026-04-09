// ==============================
// JS para cambiar label y placeholder según animal seleccionado
// ==============================

// obtiene el select donde el usuario elige el animal
const animal = document.getElementById("animal");

// obtiene el label que cambia dependiendo del animal
const label = document.getElementById("labelProduccion");

// obtiene el input donde se escribe la producción
const produccionInput = document.getElementById("produccion");

// ==============================
// USUARIO ACTIVO DEL SISTEMA
// ==============================

let usuarioActual = ""; // variable para guardar el usuario que está usando la calculadora

// ==============================
// FUNCIÓN PARA GUARDAR EL USUARIO
// ==============================
function guardarUsuario() {

    const nombre = document.getElementById("nombreUsuario").value.trim();

    if(nombre === "") {
        alert("Debe ingresar un nombre de usuario.");
        return;
    }

    usuarioActual = nombre;

    // muestra el usuario en la página
    document.getElementById("usuarioActivo").textContent =
    "Usuario activo: " + usuarioActual;
}

// ==============================
// FUNCIONES PARA CAMBIAR LABEL Y PLACEHOLDER
// ==============================
function actualizarLabel() {
    if(animal.value === "Vacas") {
        label.textContent = "Litros de leche por vaca (por día)";
        produccionInput.placeholder = "Ej: 5";
    } else if(animal.value === "Gallinas") {
        label.textContent = "Huevos totales por día";
        produccionInput.placeholder = "Ej: 10";
    } else if(animal.value === "Cerdos") {
        label.textContent = "Kg de carne por cerdo (mensual)";
        produccionInput.placeholder = "Ej: 20";
    }
}

// ==============================
// VALIDACIÓN DE PRODUCCIÓN
// ==============================
function validarProduccion() {
    const valor = parseFloat(produccionInput.value);

    if(isNaN(valor)) {
        alert("Error: solo se permiten números");
        produccionInput.value = "";
        return;
    }

    if(valor < 0) {
        alert("Error: no se permiten números negativos");
        produccionInput.value = "";
    }
}

// ==============================
// HISTORIAL DE CÁLCULOS
// ==============================
let historial = []; // array donde guardamos todos los resultados

// ==============================
// FUNCIÓN DE CÁLCULO DE PRODUCCIÓN E INGRESOS
// ==============================
function calcular(animal, cantidad, produccion, precio) {
    let produccion_dia = 0;
    let produccion_mes = 0;
    let ingresos_dia = 0;
    let ingresos_mes = 0;

    if(animal === "Vacas") {
        produccion_dia = cantidad * produccion;
        produccion_mes = produccion_dia * 30;
        ingresos_dia = produccion_dia * precio;
        ingresos_mes = produccion_mes * precio;
    } else if(animal === "Gallinas") {
        produccion_dia = produccion;
        produccion_mes = produccion_dia * 30;
        ingresos_dia = produccion_dia * precio;
        ingresos_mes = produccion_mes * precio;
    } else if(animal === "Cerdos") {
        produccion_mes = produccion;
        ingresos_mes = produccion_mes * precio;
        produccion_dia = 0;
        ingresos_dia = 0;
    }

    return {animal, cantidad, produccion_dia, produccion_mes, precio, ingresos_dia, ingresos_mes};
}

// ==============================
// FUNCIÓN PARA AGREGAR AL HISTORIAL
// ==============================
function agregarAnimal() {
    if(usuarioActual === "") {
        alert("Primero debe ingresar un usuario.");
        return;
    }

    const tipoAnimal = document.getElementById("animal").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const produccion = parseFloat(document.getElementById("produccion").value);
    const precio = parseFloat(document.getElementById("precio").value);

    // validaciones
    if(!["Vacas","Gallinas","Cerdos"].includes(tipoAnimal)){
        alert("Tipo de animal no válido.");
        return;
    }
    if(cantidad <= 0 || isNaN(cantidad)){
        alert("La cantidad debe ser mayor a 0.");
        return;
    }
    if(produccion < 0 || isNaN(produccion)){
        alert("La producción no puede ser negativa.");
        return;
    }
    if(precio < 0 || isNaN(precio)){
        alert("El precio no puede ser negativo.");
        return;
    }

    const resultado = calcular(tipoAnimal, cantidad, produccion, precio);

    // agregamos el usuario al resultado
    resultado.usuario = usuarioActual;

    historial.push(resultado);

    // mostramos resultados según filtro actual
    const filtroActual = document.getElementById("filtro").value;
    mostrarResultados(filtroActual);
}

// ==============================
// FUNCIÓN PARA MOSTRAR RESULTADOS EN LA TABLA
// ==============================
function mostrarResultados(filtro = "Todos") {
    const tabla = document.getElementById("tablaResultados");
    tabla.innerHTML = "";

    let resultados = historial;

    if(filtro !== "Todos") {
        resultados = historial.filter(r => r.animal === filtro);
    }

    resultados.forEach(r => {
        const fila = `
        <tr>
        <td>${r.usuario}</td>
        <td>${r.animal}</td>
        <td>${r.cantidad}</td>
        <td>${r.produccion_dia}</td>
        <td>${r.produccion_mes}</td>
        <td>${r.precio}</td>
        <td>${r.ingresos_dia}</td>
        <td>${r.ingresos_mes}</td>
        </tr>
        `;
        tabla.innerHTML += fila;
    });
}

// ==============================
// EVENTOS
// ==============================
animal.addEventListener("change", actualizarLabel);
produccionInput.addEventListener("input", validarProduccion);

document.addEventListener("DOMContentLoaded", function () {
    actualizarLabel();
});