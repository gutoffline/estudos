function ApagarAnterior(){
    let exp = document.getElementById("visor").value;
    document.getElementById("visor").value = exp.substring(0, exp.length - 1);
}

function InserirNoVisor(valor){
    document.getElementById("visor").value += valor;
}

function LimparVisor(){
    document.getElementById("visor").value = '';
}

function RaizQuadrada(){
    document.getElementById("visor").value =  Math.sqrt(document.getElementById("visor").value);
}

function Calcular(){
    let resultado =  eval(document.getElementById("visor").value);
    document.getElementById("visor").value = resultado;
}