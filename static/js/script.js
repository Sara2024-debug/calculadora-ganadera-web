// JS para cambiar label y placeholder según animal seleccionado
const animal = document.getElementById("animal");
const label = document.getElementById("labelProduccion");
const produccionInput = document.getElementById("produccion");

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

// actualizar al cargar la página
actualizarLabel();

// actualizar cada vez que cambie el animal
animal.addEventListener("change", actualizarLabel);