// Variáveis globais
let numeroAtual = 0;
let resultado = '';
let animacao = false;
let moedas = 0;
let tesouros = [];

// Funções p5.js
function setup() {
    let canvas = createCanvas(400, 200);
    canvas.parent('canvas-container');
    background(139, 69, 19, 0.1);
}

function draw() {
    if (animacao) {
        background(139, 69, 19, 0.1);
        
        if (resultado === 'par') {
            // Tesouros dourados para números pares
            for (let i = 0; i < numeroAtual && i < 20; i++) {
                let x = map(i, 0, 19, 50, width - 50);
                let y = height / 2 + sin(frameCount * 0.1 + i) * 30;
                
                // Brilho dourado
                fill(255, 215, 0, 100);
                ellipse(x, y, 30, 30);
                
                fill(255, 215, 0, 200);
                ellipse(x, y, 20, 20);
                
                // Símbolo de tesouro
                fill(255);
                textAlign(CENTER, CENTER);
                textSize(12);
                text('💎', x, y);
            }
        } else if (resultado === 'impar') {
            // Armadilhas vermelhas para números ímpares
            for (let i = 0; i < numeroAtual && i < 20; i++) {
                let x = map(i, 0, 19, 50, width - 50);
                let y = height / 2 + cos(frameCount * 0.1 + i) * 30;
                
                fill(244, 67, 54, 200);
                noStroke();
                rectMode(CENTER);
                rect(x, y, 20, 20);
                
                // Símbolo de armadilha
                fill(255);
                textAlign(CENTER, CENTER);
                textSize(12);
                text('💀', x, y);
            }
        }
    }
}

// Funções principais
function verificarNumero() {
    let input = document.getElementById('numero');
    let numero = parseInt(input.value);
    
    if (isNaN(numero)) {
        alert('Por favor, digite um número válido!');
        return;
    }
    
    numeroAtual = numero;
    let resultadoDiv = document.getElementById('resultado');
    
    if (numero % 2 === 0) {
        resultado = 'par';
        moedas += 5; // Ganha 5 moedas por tesouro
        resultadoDiv.innerHTML = `🎉 Tesouro encontrado! O número ${numero} é <strong>PAR</strong>! +5 moedas`;
        resultadoDiv.className = 'result par';
    } else {
        resultado = 'impar';
        resultadoDiv.innerHTML = `💀 Armadilha! O número ${numero} é <strong>ÍMPAR</strong>!`;
        resultadoDiv.className = 'result impar';
    }
    
    document.getElementById('moedas').textContent = moedas;
    resultadoDiv.style.display = 'block';
    animacao = true;
}

function limpar() {
    document.getElementById('numero').value = '';
    document.getElementById('resultado').style.display = 'none';
    animacao = false;
    background(139, 69, 19, 0.1);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Permitir verificação com Enter
    document.getElementById('numero').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarNumero();
        }
    });
}); 