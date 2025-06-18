// Variáveis globais
let pontos = 0;
let acertos = 0;
let total = 0;
let numeroAtual = 0;
let respostaCorreta = '';
let jogoAtivo = false;
let animacao = false;
let particulas = [];
let moedas = 0;

// Funções p5.js
function setup() {
    let canvas = createCanvas(400, 200);
    canvas.parent('canvas-container');
    background(44, 62, 80, 0.1);
}

function draw() {
    if (animacao) {
        background(44, 62, 80, 0.1);
        
        // Atualizar e desenhar partículas
        for (let i = particulas.length - 1; i >= 0; i--) {
            particulas[i].update();
            particulas[i].display();
            
            if (particulas[i].isDead()) {
                particulas.splice(i, 1);
            }
        }
    }
}

// Classe para partículas
class Particula {
    constructor(x, y, cor, tipo) {
        this.x = x;
        this.y = y;
        this.vx = random(-5, 5);
        this.vy = random(-8, -2);
        this.life = 255;
        this.cor = cor;
        this.tipo = tipo; // 'escudo' ou 'espada'
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravidade
        this.life -= 8;
    }
    
    display() {
        fill(this.cor[0], this.cor[1], this.cor[2], this.life);
        noStroke();
        
        if (this.tipo === 'escudo') {
            ellipse(this.x, this.y, 12, 12);
            // Desenhar escudo
            fill(255, 255, 255, this.life * 0.5);
            ellipse(this.x, this.y, 8, 8);
        } else {
            rectMode(CENTER);
            rect(this.x, this.y, 10, 15);
            // Desenhar espada
            fill(255, 255, 255, this.life * 0.5);
            rect(this.x, this.y, 4, 12);
        }
    }
    
    isDead() {
        return this.life <= 0;
    }
}

// Funções principais
function gerarNumero() {
    numeroAtual = Math.floor(Math.random() * 100) + 1;
    respostaCorreta = numeroAtual % 2 === 0 ? 'par' : 'impar';
    document.getElementById('numeroDisplay').textContent = numeroAtual;
    jogoAtivo = true;
    
    // Habilitar botões
    document.getElementById('parBtn').disabled = false;
    document.getElementById('imparBtn').disabled = false;
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function escolher(escolha) {
    if (!jogoAtivo) return;
    
    jogoAtivo = false;
    total++;
    
    // Desabilitar botões
    document.getElementById('parBtn').disabled = true;
    document.getElementById('imparBtn').disabled = true;
    
    let resultadoDiv = document.getElementById('resultado');
    let acertou = escolha === respostaCorreta;
    
    if (acertou) {
        pontos += 10;
        acertos++;
        moedas += 3; // Ganha 3 moedas por acerto
        resultadoDiv.innerHTML = `🎉 Vitória! O número ${numeroAtual} é ${respostaCorreta.toUpperCase()}! +10 pontos +3 moedas`;
        resultadoDiv.className = 'result correct';
        
        // Criar partículas de vitória (escudos)
        animacao = true;
        for (let i = 0; i < 15; i++) {
            particulas.push(new Particula(width/2, height/2, [39, 174, 96], 'escudo'));
        }
        // Exibir vídeo de parabéns
        mostrarVideo();
    } else {
        moedas = Math.max(0, moedas - 1); // Perde 1 moeda por erro
        resultadoDiv.innerHTML = `💥 Derrota! O número ${numeroAtual} é ${respostaCorreta.toUpperCase()}. -1 moeda`;
        resultadoDiv.className = 'result incorrect';
        
        // Criar partículas de derrota (espadas)
        animacao = true;
        for (let i = 0; i < 10; i++) {
            particulas.push(new Particula(width/2, height/2, [231, 76, 60], 'espada'));
        }
    }
    
    resultadoDiv.style.display = 'block';
    document.getElementById('nextBtn').style.display = 'inline-block';
    
    // Atualizar pontuação e moedas
    document.getElementById('pontos').textContent = pontos;
    document.getElementById('acertos').textContent = acertos;
    document.getElementById('total').textContent = total;
    document.getElementById('moedas').textContent = moedas;
}

function proximoNumero() {
    animacao = false;
    particulas = [];
    gerarNumero();
}

// Modal de vídeo
function mostrarVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('parabensVideo');
    modal.classList.add('active');
    video.currentTime = 0;
    video.play();
}

function fecharVideo() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('parabensVideo');
    modal.classList.remove('active');
    video.pause();
}

// Inicialização
window.onload = function() {
    gerarNumero();
}; 