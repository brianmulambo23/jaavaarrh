//variaveis da bola
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 27;
let rBolinha = dBolinha /2;

let velocidadeXBolinha = 4;
let velocidadeYBolinha = 4;

// variaveis das raquetes
let xRaquete = 3;
let yRaquete = 150;
let RaqueteComprimento = 15;
let RaqueteAltura = 90;
let colidiu = false;

//oponente
let xRaqueteO = 582;
let yRaqueteO = 150;
let velocidadeYO = 30;

//placar
let pontos = 0;
let pontosO = 0;

//sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  raquetada = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}
                     
//tamanho da tela
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw(){
  background(0);
  MostraBolinha();
  MovimentaBolinha(); 
  ColisaoBolinha();
  MostraRaquete(xRaquete,yRaquete);
  MovimentaRaquete();
  ColisaoRaquete(xRaquete,yRaquete);
  MostraRaquete(xRaqueteO,yRaqueteO);
  MovimentaRaqueteO();
  ColisaoRaquete(xRaqueteO,yRaqueteO);
  Placar();
  MarcaPonto();
  movimentaOponente();
// para jogar local com mais alguem comente a linha a cima
}

//posição e tamanho da bola
function MostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

//velocidade da bola
function MovimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

//Colisão da bola
function ColisaoBolinha(){

  if (xBolinha + rBolinha > width || 
    xBolinha < 0 + rBolinha){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + rBolinha > height ||
    yBolinha <0 + rBolinha){
    velocidadeYBolinha *=-1
  }
}

//Lugar e tamanho da raquete
function MostraRaquete(x,y){
  rect(x ,y , RaqueteComprimento, RaqueteAltura);
}

// movimento da sua raquete
function MovimentaRaquete(){
    if (keyIsDown(UP_ARROW)) {
    yRaquete -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 5;  
  yRaquete = constrain(yRaquete, 10, 310);
  }
}

// movimento da raquete do oponente se for contra a maquina
function MovimentaRaqueteO (){
  velocidadeYO = yBolinha - yRaqueteO - RaqueteComprimento / 2 - 30 ;
  yRaqueteO += velocidadeYO;

 // conter a raquete nos limites do canvas
  yRaqueteO = constrain(yRaqueteO, 0, 310);
}

// colisao da raquete e som da colisao da mesma
function ColisaoRaquete(x,y){
  colidiu =
collideRectCircle(x,y,RaqueteComprimento, RaqueteAltura,xBolinha,yBolinha,rBolinha);
  if (colidiu){velocidadeXBolinha *= -1
  raquetada.play();} 
}

// placar
function Placar(){
  stroke (255);
  textAlign(CENTER)
  textSize(16);
  fill (color(255, 140, 0))
  rect (150, 10, 40, 20);
  rect(430, 10, 40, 20);
  fill (255);
  text(pontosO, 450, 26);
  text(pontos, 170, 26); 
}

// marca os pontos e som dos pontos marcados
function MarcaPonto(){
  if(xBolinha > 585){
pontos += 1;
ponto.play();
}
  if(xBolinha < 13){
pontosO += 1;
ponto.play();
  }
}

// movimenta a raquete do oponente com W e S caso tenha esteja jogando com alguem 
function movimentaOponente(){
 if (keyIsDown(87)) {
    yRaqueteO -= 5;
  }

  if (keyIsDown(83)) {
    yRaqueteO += 5;  
  yRaqueteO = constrain(yRaqueteO, 0, 310);
  }
}