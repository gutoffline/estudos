function TrocarImagem(imagem){
    document.querySelector('.starbucks').src = imagem;
}

function MudarCirculo(cor){
    const circulo = document.querySelector('.circulo');
    circulo.style.background = cor;
}