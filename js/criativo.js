// Variáveis globais
let numeros = [];
let elementos = [];
let tempo = 0;
let moedas = 0;
let estrelas = [];

// Funções p5.js
function setup() {
    let canvas = createCanvas(800, 400);
    canvas.parent('canvas-container');
    background(11, 20, 38, 0.1);
    
    // Criar estrelas de fundo
    for (let i = 0; i < 50; i++) {
        estrelas.push({
            x: random(width),
            y: random(height),
            brilho: random(100, 255),
            velocidade: random(0.5, 2)
        });
    }
}

function draw() {
    background(11, 20, 38, 0.1);
    
    // Desenhar estrelas de fundo
    for (let estrela of estrelas) {
        fill(255, 255, 255, estrela.brilho * sin(tempo * estrela.velocidade));
        noStroke();
        ellipse(estrela.x, estrela.y, 2, 2);
    }
    
    // Desenhar elementos
    for (let elemento of elementos) {
        elemento.update();
        elemento.display();
    }
    
    tempo += 0.02;
}

// Classe para elementos visuais
class ElementoVisual {
    constructor(numero, x, y) {
        this.numero = numero;
        this.x = x;
        this.y = y;
        this.tamanho = map(numero, 1, 100, 15, 60);
        this.velocidade = map(numero, 1, 100, 0.3, 1.5);
        this.angulo = random(TWO_PI);
        this.rotacao = 0;
        this.cor = numero % 2 === 0 ? [0, 255, 255] : [255, 20, 147]; // Azul para pares, rosa para ímpares
        this.tipo = numero % 2 === 0 ? 'planeta' : 'estrela';
        this.orbita = random(50, 150);
        this.centroX = width / 2;
        this.centroY = height / 2;
    }
    
    update() {
        // Movimento orbital
        this.x = this.centroX + cos(tempo * this.velocidade + this.angulo) * this.orbita;
        this.y = this.centroY + sin(tempo * this.velocidade + this.angulo) * this.orbita;
        
        this.rotacao += this.velocidade * 0.05;
        
        // Manter dentro dos limites
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }
    
    display() {
        push();
        translate(this.x, this.y);
        rotate(this.rotacao);
        
        if (this.tipo === 'planeta') {
            // Planeta azul com anéis
            let brilho = sin(tempo * 2 + this.angulo) * 50 + 200;
            fill(this.cor[0], this.cor[1], this.cor[2], brilho);
            stroke(0, 255, 255, 100);
            strokeWeight(3);
            ellipse(0, 0, this.tamanho, this.tamanho);
            
            // Anéis do planeta
            noFill();
            stroke(0, 255, 255, 150);
            strokeWeight(2);
            ellipse(0, 0, this.tamanho * 1.5, this.tamanho * 0.3);
            
        } else {
            // Estrela rosa pulsante
            let pulsacao = sin(tempo * 4 + this.angulo) * 10 + this.tamanho;
            fill(this.cor[0], this.cor[1], this.cor[2], 200);
            noStroke();
            
            // Desenhar estrela de 5 pontas
            let raio = pulsacao / 2;
            for (let i = 0; i < 5; i++) {
                let angulo = (i * TWO_PI) / 5 - PI / 2;
                let x1 = cos(angulo) * raio;
                let y1 = sin(angulo) * raio;
                let x2 = cos(angulo + TWO_PI / 10) * (raio * 0.5);
                let y2 = sin(angulo + TWO_PI / 10) * (raio * 0.5);
                
                triangle(0, 0, x1, y1, x2, y2);
            }
            
            // Brilho central
            fill(255, 255, 255, 150);
            ellipse(0, 0, raio * 0.3, raio * 0.3);
        }
        
        // Mostrar o número
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(map(this.tamanho, 15, 60, 10, 18));
        text(this.numero, 0, 0);
        
        pop();
    }
}

// Funções principais
function adicionarNumero() {
    let input = document.getElementById('numero');
    let numero = parseInt(input.value);
    
    if (isNaN(numero) || numero < 1 || numero > 100) {
        alert('Por favor, digite um número válido entre 1 e 100!');
        return;
    }
    
    numeros.push(numero);
    moedas += 2; // Ganha 2 moedas por número adicionado
    
    // Criar elemento visual
    let x = random(50, width - 50);
    let y = random(50, height - 50);
    elementos.push(new ElementoVisual(numero, x, y));
    
    document.getElementById('moedas').textContent = moedas;
    input.value = '';
}

function gerarSequencia() {
    limparVisualizacao();
    moedas += 10; // Ganha 10 moedas por gerar sequência
    
    // Gerar sequência de números
    for (let i = 1; i <= 20; i++) {
        let numero = Math.floor(Math.random() * 100) + 1;
        numeros.push(numero);
        
        let x = random(50, width - 50);
        let y = random(50, height - 50);
        elementos.push(new ElementoVisual(numero, x, y));
    }
    
    document.getElementById('moedas').textContent = moedas;
}

function limparVisualizacao() {
    numeros = [];
    elementos = [];
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Permitir adicionar com Enter
    document.getElementById('numero').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            adicionarNumero();
        }
    });
    
    // Gerar alguns números iniciais
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            let numero = Math.floor(Math.random() * 100) + 1;
            numeros.push(numero);
            moedas += 2;
            
            let x = random(50, width - 50);
            let y = random(50, height - 50);
            elementos.push(new ElementoVisual(numero, x, y));
        }
        document.getElementById('moedas').textContent = moedas;
    }, 1000);
}); 