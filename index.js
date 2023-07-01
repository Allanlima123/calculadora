const numOperandos = document.querySelectorAll(".operandoValue");
const resultvalue = document.querySelector(".resultvalue");
const btnVerificarResult = document.querySelector(".btnVerificarResult");
const operadoresSimbols = document.querySelectorAll(".simbols");
const clearResult = document.querySelector(".clear");
const backDelete = document.querySelector(".backDelete");

let numero1 = 0;
let numero2 = 0;
let operador = null;
let resultFinal = 0;

const pegarSimbols = $evt =>{
  if(numero1 === 0) return
  resultFinal = 0;
  numero2 = 0;
  operador = $evt.target.textContent;
  resultvalue.value = "";
}

const mapearButtons = () => {
  numOperandos.forEach((item) => {
    item.addEventListener("click", ($evt) => {
        resultvalue.value += $evt.target.textContent;
        
        if(operador === null){
          numero1 += $evt.target.textContent; 
        }else{
          numero2 += $evt.target.textContent; 
        }
    });
  });
};

const calcularOperadores = operador => {
    let res = 0;

    switch (operador) {
        case '+':
          res = Number.parseFloat(numero1) + Number.parseFloat(numero2);
          break;
        case '-':
          res = Number.parseFloat(numero1) - Number.parseFloat(numero2);
          break;
        case '*':
          res = Number.parseFloat(numero1) * Number.parseFloat(numero2);
          break;
        case '/':
          res = Number.parseFloat(numero1) / Number.parseFloat(numero2);
          break;
        default:
          alert("Resultado Invalido....");
          break;
      }
 
    return res;
};

const resultCalc = result => {
  numero1 = result;
  resultFinal = result;
  resultvalue.value = result;
};

btnVerificarResult.addEventListener("click", () =>{
  if(numero2 === 0) return
    const calRes = calcularOperadores(operador);
    const numberFormatResult = calRes.toLocaleString('pt-BR', { currency: 'BRL' });
    resultCalc(numberFormatResult)
});

const zeraResultado = () =>{
  numero1 = 0;
  numero2 = 0;
  operador = null;
  resultFinal = 0;
  resultvalue.value = "";
}

const deleteNum = () =>{
  if(resultFinal !== 0) return
  
  const deleteArr = resultvalue.value.split("");
  let alan = deleteArr.splice(0,deleteArr.length -1).join("");

  operador === null ? numero1 = alan : numero2 = alan 

  resultvalue.value = alan
}

clearResult.addEventListener("click", zeraResultado);
operadoresSimbols.forEach(item => item.addEventListener("click", pegarSimbols));
backDelete.addEventListener("click", deleteNum);
mapearButtons();


