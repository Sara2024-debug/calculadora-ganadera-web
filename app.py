# Importamos las herramientas necesarias de Flask
# Flask: crea la aplicación web
# request: permite leer los datos enviados desde el formulario
# render_template_string: permite renderizar HTML directamente desde el código
from flask import Flask, request, render_template_string

# Creamos la aplicación
app = Flask(__name__)


# ==============================
# FUNCIONES DE CÁLCULO
# ==============================

# Esta función recibe todos los datos necesarios
# y devuelve los resultados en un diccionario.
def calcular_resultados(vacas, litros_por_vaca, precio_litro, gastos):

    # Producción total de leche
    produccion = vacas * litros_por_vaca

    # Dinero obtenido por vender la leche
    ingresos = produccion * precio_litro

    # Ganancia final después de restar gastos
    ganancia = ingresos - gastos

    return {
        "produccion": produccion,
        "ingresos": ingresos,
        "ganancia": ganancia
    }


# ==============================
# HTML DE LA APLICACIÓN
# ==============================

# Guardamos todo el HTML en una variable para mantener
# el proyecto en un solo archivo como pide la tarea.
HTML_TEMPLATE = """

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Calculadora Ganadera</title>

<style>

body{
font-family: Arial;
background:#f4f6f7;
padding:40px;
}

.container{
max-width:450px;
margin:auto;
background:white;
padding:25px;
border-radius:8px;
box-shadow:0 0 10px rgba(0,0,0,0.1);
}

h1{
text-align:center;
}

form{
display:flex;
flex-direction:column;
gap:10px;
}

input{
padding:10px;
font-size:16px;
}

button{
padding:12px;
background:#2e7d32;
color:white;
border:none;
cursor:pointer;
}

button:hover{
background:#1b5e20;
}

.resultado{
margin-top:20px;
background:#eef7ee;
padding:15px;
border-radius:5px;
}

.error{
color:red;
}

</style>

</head>

<body>

<div class="container">

<h1>🐄 Calculadora Ganadera</h1>

<form method="POST">

<label>Número de vacas</label>
<input type="number" name="vacas" required>

<label>Litros por vaca</label>
<input type="number" step="0.1" name="litros" required>

<label>Precio por litro</label>
<input type="number" step="0.1" name="precio" required>

<label>Gastos diarios</label>
<input type="number" step="0.1" name="gastos" required>

<button type="submit">Calcular</button>

</form>

{% if resultado %}

<div class="resultado">

{% if resultado.error %}
<p class="error">{{ resultado.error }}</p>
{% else %}

<h3>Resultados</h3>

<p><strong>Producción total:</strong> {{ resultado.produccion }} litros</p>
<p><strong>Ingresos:</strong> ${{ resultado.ingresos }}</p>
<p><strong>Ganancia:</strong> ${{ resultado.ganancia }}</p>

{% endif %}

</div>

{% endif %}

</div>

</body>
</html>

"""


# ==============================
# FUNCIÓN PARA LEER Y VALIDAR DATOS
# ==============================

# Esta función intenta convertir los datos del formulario
# a números. Si algo falla, lanza un error.
def obtener_datos_formulario():

    vacas = int(request.form["vacas"])
    litros = float(request.form["litros"])
    precio = float(request.form["precio"])
    gastos = float(request.form["gastos"])

    return vacas, litros, precio, gastos


# ==============================
# RUTA PRINCIPAL
# ==============================

# Esta ruta controla la página principal de la aplicación.
@app.route("/", methods=["GET", "POST"])
def index():

    resultado = None

    # Si el usuario envía el formulario
    if request.method == "POST":

        try:

            # Obtenemos los datos ingresados
            vacas, litros, precio, gastos = obtener_datos_formulario()

            # Calculamos los resultados
            resultado = calcular_resultados(vacas, litros, precio, gastos)

        except ValueError:

            # Si los datos no son números válidos
            resultado = {
                "error": "Por favor ingrese valores numéricos válidos."
            }

    # Mostramos la página
    return render_template_string(HTML_TEMPLATE, resultado=resultado)


# ==============================
# EJECUCIÓN DE LA APLICACIÓN
# ==============================

# Esto permite ejecutar la aplicación con:
# python app.py
if __name__ == "__main__":
    app.run(debug=True)