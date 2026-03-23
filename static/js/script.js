// JS para cambiar label y placeholder según animal seleccionado
const animal = document.getElementById("animal");
const label = document.getElementById("labelProduccion");
const produccionInput = document.getElementById("produccion");

// Función para actualizar el label y el placeholder según el animal seleccionado
function actualizarLabel() {
    if (animal.value === "Vacas") {
        label.textContent = "Litros de leche por vaca (por día)";
        produccionInput.placeholder = "Ej: 5";
    } else if (animal.value === "Gallinas") {
        label.textContent = "Huevos totales por por día";
        produccionInput.placeholder = "Ej: 10";
    } else if (animal.value === "Cerdos") {
        label.textContent = "Kg de carne por cerdo (mensual)";
        produccionInput.placeholder = "Ej: 20";
    }
}

// Función para validar la producción ingresada
function validarProduccion() {
    const valor = parseFloat(produccionInput.value); // convierte a número

    // Si no es número, muestra alerta y borra el input
    if (isNaN(valor)) {
        alert("Error: solo se permiten números");
        produccionInput.value = "";
        return; // termina la función si es inválido
    }

    // Si es negativo, bloquea también
    if (valor < 0) {
        alert("Error: no se permiten números negativos");
        produccionInput.value = "";
    }
}

// actualizar al cargar la página
actualizarLabel();

// actualizar cada vez que cambie el animal
animal.addEventListener("change", actualizarLabel);

// validar cada vez que se escribe en el input
produccionInput.addEventListener("input", validarProduccion);