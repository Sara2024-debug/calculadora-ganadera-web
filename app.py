from flask import Flask, render_template, request, redirect, flash

# creo la app Flask
app = Flask(__name__)
app.secret_key = "calculadora_ganadera_secret"  # para mensajes flash (errores/exitos)

# historial temporal para guardar los animales agregados
# ojo: se pierde al cerrar la app, sirve mientras la app corre
historial = []

# ==============================
# FUNCIÓN PARA CALCULAR PRODUCCIÓN E INGRESOS
# ==============================
def calcular(animal, cantidad, produccion, precio):
    """
    Calcula la producción diaria, mensual y los ingresos según el animal.
    """
    produccion_dia = 0
    produccion_mes = 0
    ingresos_dia = 0
    ingresos_mes = 0

    if animal == "Vacas":
        produccion_dia = cantidad * produccion
        produccion_mes = produccion_dia * 30
        ingresos_dia = produccion_dia * precio
        ingresos_mes = produccion_mes * precio

    elif animal == "Gallinas":
    # para gallinas la producción ya es TOTAL del día, no multiplicar por cantidad
     produccion_dia = produccion
     produccion_mes = produccion_dia * 30
     ingresos_dia = produccion_dia * precio  # solo multiplicar por precio
     ingresos_mes = produccion_mes * precio

    elif animal == "Cerdos":
    # la producción mensual ya es TOTAL, no multiplicar por cantidad
     produccion_mes = produccion
     ingresos_mes = produccion_mes * precio
     produccion_dia = 0  # no hay producción diaria
     ingresos_dia = 0
    return {
        "animal": animal,
        "cantidad": cantidad,
        "produccion_dia": produccion_dia,
        "produccion_mes": produccion_mes,
        "precio": precio,
        "ingresos_dia": ingresos_dia,
        "ingresos_mes": ingresos_mes
    }

# ==============================
# RUTA PRINCIPAL
# ==============================
@app.route("/", methods=["GET", "POST"])
def index():
    """
    Maneja:
    - el formulario para agregar animales
    - filtro para ver solo un tipo de animal
    """
    if request.method == "POST":
        try:
            animal = request.form.get("animal")
            cantidad = int(request.form.get("cantidad", 0))
            produccion = float(request.form.get("produccion", 0))
            precio = float(request.form.get("precio", 0))

            # VALIDACIONES básicas
            if animal not in ["Vacas", "Gallinas", "Cerdos"]:
                flash("Tipo de animal no válido.", "error")
            elif cantidad <= 0:
                flash("La cantidad debe ser mayor a 0.", "error")
            elif produccion < 0:
                flash("La producción no puede ser negativa.", "error")
            elif precio < 0:
                flash("El precio no puede ser negativo.", "error")
            else:
                resultado = calcular(animal, cantidad, produccion, precio)
                historial.append(resultado)

        except ValueError:
            flash("Por favor ingresa valores numéricos válidos.", "error")

    # FILTRO de resultados
    filtro = request.args.get("filtro", "Todos")
    if filtro == "Todos":
        resultados = historial
    else:
        resultados = [r for r in historial if r["animal"] == filtro]

    return render_template("index.html", resultados=resultados, filtro=filtro)

# ==============================
# RUTA DE CONTACTO
# ==============================
@app.route("/contacto", methods=["POST"])
def contacto():
    """
    Maneja el formulario de contacto y guarda los mensajes en mensajes.txt
    """
    nombre = request.form.get("nombre", "")
    correo = request.form.get("correo", "")
    mensaje = request.form.get("mensaje", "")

    if nombre and correo and mensaje:
        with open("mensajes.txt", "a", encoding="utf-8") as archivo:
            archivo.write(f"{nombre},{correo},{mensaje}\n")
        flash("Mensaje enviado correctamente.", "success")
    else:
        flash("Todos los campos son obligatorios.", "error")

    return redirect("/")

# ==============================
# EJECUCIÓN
# ==============================
if __name__ == "__main__":
    app.run(debug=True)