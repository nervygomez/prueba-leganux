
/**
 * screen: toma de referencia el input de texto para mostrar los datos en pantalla;
 * screentext: toma un etiqueta p para mostrar al final la operacion que se desea resolver;
 */
const screen = document.querySelector('#screen');
const screentext = document.querySelector('#screen-text');

const screenNumber = document.querySelector('#screen-number');
const numberDesc = document.querySelector('#numberDesc');
const screenDesc = document.querySelector('#screen-desc');

let arrayNumber = [];
let operations = ['+','-','*','/','^', "√"];
let numberUnidad = '';
let cadena = '';

let arrayDesc = []

/**
 * 
 * @param {string} caracter: Es el parametro por donde pasa el dato del boton presionado en la calculadora.
 * @param {number} type: indica de que tipo es el dato del parametro caracter si es un numero o un signo.
 *                      [0]. [para los signos ] [1]. para los numeros.
 */

function addNumber(caracter, type = 0) {

  // El limiter de caractereres es de 30
  if(screen.value.length === 30) {
    return;
  } 

  if(type === 0) {
    if(numberUnidad){
      arrayNumber.push(Number(numberUnidad))
      numberUnidad = '';
    } 
     arrayNumber.push(caracter);
    
  } else {
      numberUnidad += caracter
  }

  screen.value += caracter;
  cadena += caracter;
}



function result() {

 // Se valida que no exista un valor por agregar al array de numeros en caso contrario se agrega de ultimo en el array.
  if(numberUnidad) {
    arrayNumber.push(Number(numberUnidad))
  }

 // Se valida que ni el primer o ultimo valor del array (de numeros y signos) sea un signo y arroja en pantalla error.
  if(arrayNumber[0] === '*' || arrayNumber[0] === '/' || arrayNumber[0] === '^' || arrayNumber[0] === '-' || 
     arrayNumber[arrayNumber.length-1] === '*' || arrayNumber[arrayNumber.length-1] === '/' || 
     arrayNumber[arrayNumber.length-1] === '+' || arrayNumber[arrayNumber.length-1] === '-' || arrayNumber[arrayNumber.length-1] === '^' 
     || arrayNumber[arrayNumber.length-1] === '√')  {
    screen.value = 'Error'
    return;
  }


  // en el caso que el array el primer valor sea un signo +, se elimina
  if(arrayNumber[0] === '+') {
    arrayNumber.shift()
  }

  // en el caso que el array solo tenga un valor, se retorna ese valor numerico.
  if(arrayNumber.length === 1) {
    return screentext.innerHTML = arrayNumber[0];     
  } 

  /**
   *  en este punto se garantiza que por lo menos existen 3 elementos en el array para realizar las operaciones.
   *  2 numeros y 1 signo para la operacion.
   * 
   *  se ejecuta una funcion recursiva respetando el orden de prioridad en las operaciones, realizando dichas operaciones
   * y reduciendo el array a la vez hasta que quedar solo 1 elemento con el resultado final.
   */
  screen.value = OperacionRecursiva(arrayNumber, ['^','√']);
  return screentext.innerHTML = cadena + ' =';
}

function OperacionRecursiva(array = [], signs) {
  if(array.length === 1) {
    return array[0]
  }

  let arraynew = array;
  index = -1;
  let sign = array.find((ele, i) => { 
      if(ele === signs[0] || ele === signs[1]) {
        index = i;
        return ele
      } 
    })
  if(sign) {
    let ope;
    switch (sign) {
      case '^':
        ope = arraynew[index-1] ** arraynew[index+1];
        arraynew[index-1] = ope;
        arraynew.splice(index,2)
        return OperacionRecursiva(arraynew, ['^', '√']);

      case '√':
        ope = Math.sqrt(arraynew[index+1]);
        arraynew[index] = ope;
        arraynew.splice(index + 1, 1)
        return OperacionRecursiva(arraynew, ['^', '√']);

      case '*':
        ope = arraynew[index-1] * arraynew[index+1];
        arraynew[index-1] = ope;
        arraynew.splice(index, 2)
        return OperacionRecursiva(arraynew, ['*', '/']);

      case '/':
        ope = arraynew[index-1] / arraynew[index+1];
        arraynew[index-1] = ope;
        arraynew.splice(index, 2)
        return OperacionRecursiva(arraynew, ['*', '/']);

      case '+':
       ope = arraynew[index-1] + arraynew[index+1];
       arraynew[index-1] = ope;
       arraynew.splice(index, 2)
       return OperacionRecursiva(arraynew, ['+', '-']);

      case '-':
       ope = arraynew[index-1] - arraynew[index+1];
       arraynew[index-1] = ope;
       arraynew.splice(index, 2)
       return OperacionRecursiva(arraynew, ['+', '-']);
    }
  } else {
      if(signs[0] === '^' || signs[1] === '√') {
        return OperacionRecursiva(arraynew, ['*', '/']);
      }

      if(signs[0] === '*' || signs[1] === '/') {
        return OperacionRecursiva(arraynew, ['+', '-']);
      }
  }
}

// Reinicia los elementos en la calculadora
function resetForm() {
  cadena = '';
  arrayNumber = [];
  numberUnidad = '';
  screen.value = '';
  screentext.innerHTML = cadena;
}

// ================== 

function addNumberA() {
  arrayDesc.push(Number(numberDesc.value))
  screenNumber.innerHTML = arrayDesc;
  numberDesc.value = '';
}

function resultArray() {
  let result = claculateMaxEvenSum(arrayDesc);
  screenDesc.innerHTML = `Resultado ${result}`;

}

function clearArray() {
  arrayDesc = [];
  screenNumber.innerHTML = '';
  numberDesc.value = '';
  screenDesc.innerHTML = '';
}

let claculateMaxEvenSum = function (array = []) {
  return array.reduce((total, num) => total + num, 0)
}

