/*1 passo = criar constantes para cada tag que desejamos manipular
 passando neste caso a classe  */

const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const bannerImagem = document.querySelector('.app__image');
const alteraTitulo = document.querySelector('.app__title', 'app__title-strong');
const botoes = document.querySelectorAll('.app__card-button');
const tocarMusica = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/1-08. Minecraft.mp3');
const startPauseBotoes = document.querySelector('#start-pause');
musica.loop = true; // aqui faz com que a musica fique em loop repetindo assim que acabar.

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

const audioPause = new Audio('/sons/pause.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioAlertaFim = new Audio('/sons/beep.mp3');

tocarMusica.addEventListener('change', () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();

  }
})

/*2 passo = pegar a constante e adicionar um evento de click para isso 
foi usado a função de adicionar evento do javascript com uma função anonima 
e passando outra função do javascript que altera o atributo com o nome de 
serAttribute , veja que foi alterado o foco do HTML pelo descanso-curto do CSS*/

focoBotao.addEventListener('click', () => {
  alteraContexto('foco');
  focoBotao.classList.add('active');

})

curtoBotao.addEventListener('click', () => {
  alteraContexto('descanso-curto');
  curtoBotao.classList.add('active');

})

longoBotao.addEventListener('click', () => {
  alteraContexto('descanso-longo')
  longoBotao.classList.add('active');

})

function alteraContexto(contexto, novoTexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active');
  })
  html.setAttribute('data-contexto', contexto);
  bannerImagem.setAttribute('src', `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      alteraTitulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
      break;

    case "descanso-curto":
      alteraTitulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
      break;

    case "descanso-longo":
      alteraTitulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
      break;

    default:
      break;


  }

}

const contagemRegressiva = () => {

  if (tempoDecorridoEmSegundos <= 0) {
    zerarTempo();
    alert('Fim de tempo!')
    return
  }

  tempoDecorridoEmSegundos -= 1;
  console.log('Temporizador:' + tempoDecorridoEmSegundos);
}

startPauseBotoes.addEventListener('click', iniciarPausar);

function iniciarPausar() {

  if (intervaloId) {
    zerarTempo();
    return;
  }

  audioPlay.play();
  
  intervaloId = setInterval(contagemRegressiva, 1000)

}


function zerarTempo() {
  audioPause.play();
  clearInterval(intervaloId);
  intervaloId = null;
}

