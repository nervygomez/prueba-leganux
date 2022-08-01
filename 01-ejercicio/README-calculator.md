# Calculadora
Calculadora básica
## usage
Ejecute el archivo index.html
## pasos
1. Iniciar debemos indicar la operacion que se desea realizar. Al momento que presionamos algun boton este pasa por una funcion para que esta vaya tomando los elemento de la cadena de string (numeros y signos) para posteriormente pasarlo a un array y sea más sencilla realizar las operaciones.
2. Al tener la operacion lista y presionar el boton de "=", se realiza una evaluacion para saber que el primer y ultimo valor no sea un signo, en el caso que lo sea, arroja un error en pantalla. En el caso que sea solo un elemento, este es retornado. Para cuando existe multiples operaciones se ejecuta la funcion recursiva que busca por prioridad de la operacion, elimina los elementos operados (para hacer más pequeño el array) y vuelve a ejecutarse hasta llegar a la menor prioridad y llegar a un solo elemento para que este al final sea retornado y muestre en pantalla el resultado.
