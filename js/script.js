//Dados inicias
let altura = 0;
let largura = 0;
let vidas = 1;
let segundos = 15;
let intervaloTempoMosquito = 2000;

document.querySelector('.segundos').innerHTML = segundos;

let nivel = window.location.search;
nivel = nivel.replace('?','');

switch(nivel) {
    case 'facil':
        intervaloTempoMosquito = 2000;
        break;
    case 'normal':
        intervaloTempoMosquito = 1500;
        break;
    case 'dificil':
        intervaloTempoMosquito = 1000;
        break;
    case 'mt_dificil':
        intervaloTempoMosquito = 750;
        break;
}

//Funções

function carregarDimesoes() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(altura, largura);
}

function definirPosicaoAleatoria() {

    //Verificar se existe mosquito
    if(document.querySelector('#mosquito')){
        document.querySelector('#mosquito').remove();

        if(vidas > 3) {
            window.location.href = 'game_over.html';
        } else {
            document.querySelector(`#v${vidas}`).src = 'imagens/coracao_vazio.png';
            vidas++;
        }
        
    }


    //Criar Mosquito
    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = (posicaoX < 0) ? 0 : posicaoX;
    posicaoY = (posicaoY < 0) ? 0 : posicaoY;

    let mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosquito.png';
    mosquito.className = definirTamanhoAleatorio();
    mosquito.style.transform = `scaleX(${definirLado()})`;
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function() {
        this.remove();
    }

    document.body.appendChild(mosquito);
}

function definirTamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);

    switch(classe){
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2: 
            return 'mosquito3';
    }
}

function definirLado() {
    let lado = Math.floor(Math.random() * 2);
    return lado = (lado === 0) ? 1 : -1;
}

//Eventos
carregarDimesoes();
definirPosicaoAleatoria();

let cronometro = setInterval(()=>{
    if(segundos <= 0) {
        window.location.href = 'you_win.html';
        clearInterval(criarMosquito);
        clearInterval(cronometro);
    } else {
        segundos--;
        document.querySelector('.segundos').innerHTML = segundos;
    }
},1000);

let criarMosquito = setInterval(()=>{
    definirPosicaoAleatoria();
},intervaloTempoMosquito);
