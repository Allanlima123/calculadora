const numOperandos = document.querySelectorAll(".operandoValue");
const resultvalue = document.querySelector(".resultvalue");
const btnVerificarResult = document.querySelector(".btnVerificarResult");
const operadoresSimbols = document.querySelectorAll(".simbols");
const clearResult = document.querySelector(".clear");
const backDelete = document.querySelector(".backDelete");

let numerosOperando = [0,0];
let operador = null;
let lima = false;
let resultFinal = 0;

const pegarSimbols = ($evt) => {
  if (numerosOperando[0] === 0) return;
  resultFinal = 0;
  operador = $evt.target.textContent;
  resultvalue.value = "";
  lima = false;
};

const mapearButtons = () => {
  numOperandos.forEach((item) => {
    item.addEventListener("click", ($evt) => {
      if(lima) zeraResultado();

      let buttonValue = $evt.target.textContent;
      resultvalue.value += buttonValue;

      if (operador === null) {
        numerosOperando[0] += buttonValue;
      } else {
        numerosOperando[1] += buttonValue;
      }
    });
  });
};

const calcularOperadores = (operador) => {
  let res = 0;

  const [numero1,numero2] = numerosOperando;
  
  switch (operador) {
    case "+":
      res = Number.parseFloat(numero1) + Number.parseFloat(numero2);
      break;
    case "-":
      res = Number.parseFloat(numero1) - Number.parseFloat(numero2);
      break;
    case "*":
      res = Number.parseFloat(numero1) * Number.parseFloat(numero2);
      break;
    case "/":
      res = Number.parseFloat(numero1) / Number.parseFloat(numero2);
      break;
    default:
      alert("Resultado Invalido....");
      break;
  }

  return res;
};

const resultCalc = (result) => {
  numerosOperando[0] = result;
  resultFinal = result;
  resultvalue.value = result;
};

btnVerificarResult.addEventListener("click", () => {
  if (numerosOperando[1] === 0) return;
  const calRes = calcularOperadores(operador);
  const numberFormatResult = calRes.toLocaleString("pt-BR", {
    currency: "BRL",
  });

  resultCalc(numberFormatResult);
  operador = null;
  lima = true;
  numerosOperando[1] = 0;
});

const zeraResultado = () => {
  numerosOperando[0] = 0;
  numerosOperando[1] = 0;
  operador = null;
  resultFinal = 0;
  resultvalue.value = "";
  lima = false;
};

const deleteNum = () => {
  if (resultFinal !== 0) return;

  const deleteArr = resultvalue.value.split("");
  let alan = deleteArr.splice(0, deleteArr.length - 1).join("");

  operador === null ? (numerosOperando[0] = alan) : (numerosOperando[1] = alan);

  resultvalue.value = alan;
};

clearResult.addEventListener("click", zeraResultado);
operadoresSimbols.forEach((item) =>
  item.addEventListener("click", pegarSimbols)
);

backDelete.addEventListener("click", deleteNum);
mapearButtons();
