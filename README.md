# Calculadora Ganadera Web

Descripcion del proyecto

La Calculadora Ganadera Web** es una pequeña aplicacion web hecha en Python usando Flask.
La idea del proyecto es poder calcular de forma sencilla la produccion diaria de leche, los ingresos que se obtienen por venderla y tambien la ganancia final despues de restar los gastos.

El usuario simplemente ingresa algunos datos como el numero de vacas, los litros que produce cada vaca, el precio del litro de leche y los gastos diarios. Luego la aplicacion hace los calculos automaticamente y muestra los resultados en la pagina.

Este proyecto tambien sirve para entender como funciona Flask, ya que permite crear una aplicacion web basica usando Python y un formulario HTML.

Funcionalidades

La aplicacion permite:

* Ingresar el numero de vacas
* Ingresar los litros que produce cada vaca
* Ingresar el *precio por litro de leche
* Ingresar los gastos diarios

Con esos datos el sistema calcula:

* La produccion total de leche
* Los ingresos obtenidos por la venta
* La ganancia final despues de restar los gastos

Requisitos

Para poder ejecutar este proyecto se necesita tener instalado:

* Python 3.x
* Flask

Instalacion

1. Descargar o clonar el proyecto en el computador.

2. Abrir una terminal dentro de la carpeta del proyecto.

3. Instalar las dependencias usando el siguiente comando:

pip install -r requirements.txt

Este comando instala todas las librerias necesarias para que el programa funcione correctamente.

Ejecucion

Para ejecutar la aplicacion se debe usar el siguiente comando en la terminal:

python app.py

Despues de ejecutar ese comando, Flask inicia un servidor local.

Luego se debe abrir un navegador y entrar a esta direccion:

http://127.0.0.1:5000

En esa pagina ya se puede usar la calculadora ganadera.

Estructura del proyecto

El proyecto tiene una estructura sencilla:

calculadora-ganadera-web/

app.py → archivo principal donde esta el codigo de la aplicacion Flask.

requirements.txt → archivo donde se guardan las dependencias necesarias del proyecto.

README.md → documento donde se explica el proyecto, instalacion y uso.

Tecnologias utilizadas

* Python
* Flask
* HTML

Autor

Sara Nikol Salgado Villada

VERSION ACTUALIZADA 

Las cosas que faltaban era:
Separar css, html, y js en archivos externos y hacer las mejoras que nos puso el profe que fueron:

"Boton donde pueda fltrar y elegir el tipo de animal, y dependiendo del animal se modifique y podamos agregar, cuantos animales tiene, cuantos huevos o leche o carne produce, cuanto vale la leche huevos o kg de carne.
Que en el momento de dar calcular le permita seccionarlo para ver el calculo de cada seccion, que tenga una tabla bonita al momento de dar el calculo.
Y que de fondo tenga un estilo agropecuario"

Además la página solo tenia la calculadora, no tenía enlaces internos ni nada por el estilo.
Ahora todo lo que viene es nuevo:

ACTUALIZACIÓN

1 ¿Qué es el sistema?

Este es un sistema web que sirve para calcular la producción de animales en una finca. Puedes poner cuántas vacas, gallinas o cerdos tienes, cuánto producen y a qué precio vendes su producto, y te dice cuánto ganas al día o al mes.

2  Qué se puede hacer ahora
Poner los animales y la cantidad.
Calcular la producción diaria y mensual para vacas y gallinas.
Calcular la producción mensual de los cerdos.
Saber cuánto dinero genera cada animal según el precio.
Ver un historial de los animales que agregaste y filtrarlos por tipo.
Mandar un mensaje por el formulario de contacto.
Todo está en una página web con HTML y CSS, y la tabla de resultados se ve bonita.
Hay validaciones para que no metas números negativos o cosas raras.
3 ¿Qué falta?
Poder borrar o editar animales del historial.
Que se puedan generar reportes en PDF o Excel.
4 ¿Qué dificultades técnicas encontraron? 
Yo tuve miles de dificultades como por ejemplo:

Crear la selección de resultados
Lograr que los mensajes del formulario quedaran en mensajes.txt
Que quedara el registro de los datos de la calculadora en la página 
Que el JS cambiara correctamente el texto del campo de producción según el animal elegido.
Uf muchos errores de estructura, muchos errores para construir lo qeu el profesor me pidió porque en cada intento surgía un error como que aparecieran las opciones de los animales en texto plano. 

5 ¿Cómo el entorno les ayudó a avanzar?
Usar VS Code me facilitó todo porque tenía el código y la terminal en el mismo lugar, y el tema oscuro no me cansaba la vista, además las herramientas que me proporciona me permitieron realizar y modificar código para mejorar el proyecto. 
Basicamente gracias al entorno fue que pude realizar el proyecto. 