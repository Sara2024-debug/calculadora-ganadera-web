// JS para cambiar label y placeholder según animal seleccionado

// obtiene el select donde el usuario elige el animal
const animal = document.getElementById("animal");

// obtiene el label que cambia dependiendo del animal
const label = document.getElementById("labelProduccion");

// obtiene el input donde se escribe la producción
const produccionInput = document.getElementById("produccion");



// ==============================
// USUARIO ACTIVO DEL SISTEMA
// ==============================

// variable donde se guardará el usuario que está usando el sistema
// se usa para registrar quién hace cada cálculo
let usuarioActual = "";



// ==============================
// FUNCIÓN PARA GUARDAR EL USUARIO
// ==============================

function guardarUsuario(){

    // obtiene el nombre que escribió el usuario
    const nombre = document.getElementById("nombreUsuario").value.trim();

    // validación básica para evitar nombre vacío
    if(nombre === ""){
        alert("Debe ingresar un nombre de usuario.");
        return;
    }

    // guarda el usuario actual
    usuarioActual = nombre;

    // muestra el usuario en pantalla
    document.getElementById("usuarioActivo").textContent =
    "Usuario activo: " + usuarioActual;

}



// Función para actualizar el label y el placeholder según el animal seleccionado
function actualizarLabel() {

    // si el usuario selecciona vacas
    if (animal.value === "Vacas") {

        // cambia el texto del label
        label.textContent = "Litros de leche por vaca (por día)";

        // cambia el ejemplo dentro del input
        produccionInput.placeholder = "Ej: 5";
    }

    // si selecciona gallinas
    else if (animal.value === "Gallinas") {

        // cambia el texto del label
        label.textContent = "Huevos totales por día";

        // cambia el ejemplo
        produccionInput.placeholder = "Ej: 10";
    }

    // si selecciona cerdos
    else if (animal.value === "Cerdos") {

        // cambia el texto del label
        label.textContent = "Kg de carne por cerdo (mensual)";

        // ejemplo de producción
        produccionInput.placeholder = "Ej: 20";
    }
}



// Función para validar la producción ingresada
function validarProduccion() {

    // convierte lo que escribió el usuario a número
    const valor = parseFloat(produccionInput.value);

    // Si no es número, muestra alerta y borra el input
    if (isNaN(valor)) {

        // alerta para avisar al usuario
        alert("Error: solo se permiten números");

        // limpia el input
        produccionInput.value = "";

        // termina la función
        return;
    }

    // Si es negativo, bloquea también
    if (valor < 0) {

        // muestra alerta
        alert("Error: no se permiten números negativos");

        // borra el valor
        produccionInput.value = "";
    }
}



// ==============================
// HISTORIAL (reemplaza el de Python)
// ==============================

// array donde se guardan todos los animales agregados
// funciona como el historial que antes estaba en Python
let historial = [];




// ==============================
// FUNCIÓN PARA CALCULAR PRODUCCIÓN E INGRESOS
// (esta es la lógica que estaba en Python)
// ==============================

function calcular(animal, cantidad, produccion, precio) {

    // variables donde se guardarán los resultados
    let produccion_dia = 0;
    let produccion_mes = 0;
    let ingresos_dia = 0;
    let ingresos_mes = 0;

    // lógica para vacas
    if (animal === "Vacas") {

        // producción diaria total
        produccion_dia = cantidad * produccion;

        // producción mensual
        produccion_mes = produccion_dia * 30;

        // ingresos diarios
        ingresos_dia = produccion_dia * precio;

        // ingresos mensuales
        ingresos_mes = produccion_mes * precio;
    }

    // lógica para gallinas
    else if (animal === "Gallinas") {

        // para gallinas la producción ya es TOTAL del día
        produccion_dia = produccion;

        // producción mensual
        produccion_mes = produccion_dia * 30;

        // ingresos diarios
        ingresos_dia = produccion_dia * precio;

        // ingresos mensuales
        ingresos_mes = produccion_mes * precio;
    }

    // lógica para cerdos
    else if (animal === "Cerdos") {

        // la producción mensual ya es TOTAL
        produccion_mes = produccion;

        // ingreso mensual
        ingresos_mes = produccion_mes * precio;

        // los cerdos no tienen producción diaria
        produccion_dia = 0;
        ingresos_dia = 0;
    }

    // retorna un objeto con todos los resultados
    return {
        animal,
        cantidad,
        produccion_dia,
        produccion_mes,
        precio,
        ingresos_dia,
        ingresos_mes
    };
}




// ==============================
// FUNCIÓN PARA AGREGAR AL HISTORIAL
// (equivalente al POST de Flask)
// ==============================

function agregarAnimal() {

    // ==============================
    // VALIDACIÓN DE USUARIO
    // ==============================

    // evita que se puedan hacer cálculos si no se ingresó un usuario
    if(usuarioActual === ""){
        alert("Primero debe ingresar un usuario.");
        return;
    }

    // obtiene el tipo de animal seleccionado
    const tipoAnimal = document.getElementById("animal").value;

    // obtiene la cantidad de animales
    const cantidad = parseInt(document.getElementById("cantidad").value);

    // obtiene la producción
    const produccion = parseFloat(document.getElementById("produccion").value);

    // obtiene el precio
    const precio = parseFloat(document.getElementById("precio").value);


    // VALIDACIONES (las mismas que tenía Python)

    // verifica si el animal es válido
    if (!["Vacas", "Gallinas", "Cerdos"].includes(tipoAnimal)) {
        alert("Tipo de animal no válido.");
        return;
    }

    // verifica que la cantidad sea mayor a 0
    if (cantidad <= 0 || isNaN(cantidad)) {
        alert("La cantidad debe ser mayor a 0.");
        return;
    }

    // verifica que la producción no sea negativa
    if (produccion < 0 || isNaN(produccion)) {
        alert("La producción no puede ser negativa.");
        return;
    }

    // verifica que el precio no sea negativo
    if (precio < 0 || isNaN(precio)) {
        alert("El precio no puede ser negativo.");
        return;
    }

    // llama la función calcular para obtener los resultados
    const resultado = calcular(tipoAnimal, cantidad, produccion, precio);

    // ==============================
    // SE AGREGA EL USUARIO AL RESULTADO
    // ==============================

    resultado.usuario = usuarioActual;

    // guarda el resultado en el historial
    historial.push(resultado);

    // muestra los resultados en la tabla usando el filtro actual
    const filtroActual = document.getElementById("filtro").value;

    mostrarResultados(filtroActual);
}




// ==============================
// MOSTRAR RESULTADOS EN LA TABLA
// ==============================

function mostrarResultados(filtro = "Todos") {

    // obtiene el cuerpo de la tabla donde se mostrarán los datos
    const tabla = document.getElementById("tablaResultados");

    // limpia la tabla antes de mostrar nuevos datos
    tabla.innerHTML = "";

    // por defecto muestra todo el historial
    let resultados = historial;

    // si el filtro no es "Todos"
    if (filtro !== "Todos") {

        // filtra solo los animales del tipo seleccionado
        resultados = historial.filter(r => r.animal === filtro);
    }

    // recorre todos los resultados
    resultados.forEach(r => {

        // crea una fila de la tabla con los datos
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

        // agrega la fila a la tabla
        tabla.innerHTML += fila;

    });

}



// actualizar cada vez que cambie el animal
// cuando el usuario cambie el select se ejecuta la función
animal.addEventListener("change", actualizarLabel);



// validar cada vez que se escribe en el input
// cada vez que el usuario escribe algo se revisa si es válido
produccionInput.addEventListener("input", validarProduccion);



// actualizar al cargar la página
// esto hace que el label ya aparezca correcto al abrir la página
document.addEventListener("DOMContentLoaded", function () {

    actualizarLabel();

});