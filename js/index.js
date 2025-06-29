// Galáxia de fundo com p5.js
let estrelas = [];

function setup() {
    let canvas = createCanvas(window.innerWidth, window.innerHeight);
    canvas.parent('galaxy-bg');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');
    canvas.style('pointer-events', 'none');
    
    for (let i = 0; i < 120; i++) {
        estrelas.push({
            x: random(width),
            y: random(height),
            r: random(0.5, 2.5),
            brilho: random(100, 255),
            velocidade: random(0.1, 0.6)
        });
    }
}

function draw() {
    background(11, 20, 38, 80);
    for (let estrela of estrelas) {
        fill(255, 255, 255, estrela.brilho * (0.7 + 0.3 * sin(frameCount * estrela.velocidade)));
        noStroke();
        ellipse(estrela.x, estrela.y, estrela.r, estrela.r);
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
} 