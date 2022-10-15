// Variáveis da Bolinha.
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15
let raio = dBolinha / 2;

// Velocidade da Bolinha.
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

// Variáveis da Raquete.
let xRaquete = 5;
let yRaquete = 165;
let raqueteComprimento = 8;
let raqueteAltura = 70;

// Variáveis do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 165;
let velocidadeYOponente;

// Placar do Jogo.
let meusPontos = 0;
let pontosDoOponente = 0;

// Chance de Errar
let chanceDeErrar = 0;

// Sons do Jogo.
let raquetada;
let ponto;
let trilha;

  function preload(){
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
  }

let colidiu = false;

function setup() {
  createCanvas(600, 400);
  trilha.loop();  
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  colisaoMinhaRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcarPontos(); 
  bolinhaNaoFicaPresa();
}
  function mostraBolinha(){
      circle(xBolinha, yBolinha, dBolinha);    
  }
  
  function movimentaBolinha(){
      xBolinha += velocidadeXBolinha;
      yBolinha += velocidadeYBolinha; 
  }
  
  function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0)
      velocidadeXBolinha *= -1;
  
  
  if (yBolinha + raio > height || yBolinha - raio < 0)
      velocidadeYBolinha *= -1;
  }
  
  function mostraRaquete(x, y){
      rect(x, y, raqueteComprimento, raqueteAltura);
  }
  
  function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW))
    yRaquete -= 10;
  
    if (keyIsDown(DOWN_ARROW))
    yRaquete += 10;
  }

  function verificaColisaoRaquete(){
    if (xBolinha - raio < xRaquete + raqueteComprimento &&
       yBolinha - raio < yRaquete + raqueteAltura &&
       yBolinha + raio > yRaquete){
       velocidadeXBolinha *= -1;
      raquetada.play();
    }
    
  }

  function colisaoMinhaRaqueteBiblioteca(x, y){
    colidiu = 
    collideRectCircle (x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu){
      velocidadeXBolinha *= -1;
      raquetada.play();
  }
}

  function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
      xBolinha = 35
    }
  }

  function calcularChanceDeErrar() {
    if (pontosDoOponente >= meusPontos) {
      chanceDeErrar += 1
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40
    }  
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
    }
  }
}
   
  function movimentaRaqueteOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente + chanceDeErrar
    calcularChanceDeErrar()
}
   
  function incluiPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(50);
    fill(color(255, 140, 0));
    rect(139, 10, 70, 50);
    fill (255);
    text (meusPontos, 172, 52);
    fill (color(255, 140, 0));
    rect(387, 10, 70, 50);
    fill(255);
    text (pontosDoOponente, 420, 52);
}
  
  function marcarPontos(){
    if (xBolinha > 590){
      meusPontos += 1;
      ponto.play();
      
    }
    if (xBolinha < 10){
      pontosDoOponente += 1;
     ponto.play();

    } 
  }


  