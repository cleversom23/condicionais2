# Arquivos JavaScript do Projeto

Este diretório contém todos os arquivos JavaScript separados do projeto "Verificador de Números - Par ou Ímpar".

## Estrutura dos Arquivos

### `index.js`
- **Página**: `index.html` (Página principal)
- **Funcionalidade**: Galáxia de fundo animada com p5.js
- **Características**:
  - Cria um canvas de fundo com estrelas animadas
  - Efeito de brilho pulsante nas estrelas
  - Responsivo ao redimensionamento da janela

### `simples.js`
- **Página**: `simples.html` (Caça ao Tesouro)
- **Funcionalidade**: Sistema de verificação de números pares/ímpares com animações
- **Características**:
  - Verificação de números com validação
  - Animações de tesouros dourados (pares) e armadilhas vermelhas (ímpares)
  - Sistema de moedas (+5 moedas por tesouro)
  - Suporte a tecla Enter

### `jogo.js`
- **Página**: `jogo.html` (Arena de Batalha)
- **Funcionalidade**: Jogo de adivinhação com sistema de pontuação
- **Características**:
  - Geração aleatória de números
  - Sistema de pontuação (+10 pontos por acerto)
  - Sistema de moedas (+3 moedas por acerto, -1 por erro)
  - Animações de partículas (escudos para vitória, espadas para derrota)
  - Modal de vídeo de comemoração
  - Classe `Particula` para efeitos visuais

### `criativo.js`
- **Página**: `criativo.html` (Galáxia Espacial)
- **Funcionalidade**: Visualização criativa de números em ambiente espacial
- **Características**:
  - Criação de planetas azuis (pares) e estrelas rosa (ímpares)
  - Movimento orbital dos elementos
  - Sistema de moedas (+2 moedas por número, +10 por sequência)
  - Estrelas de fundo animadas
  - Classe `ElementoVisual` para planetas e estrelas
  - Geração automática de elementos iniciais

## Dependências

Todos os arquivos dependem da biblioteca **p5.js** que é carregada via CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
```

## Funcionalidades Comuns

### Sistema de Moedas
- Todas as páginas implementam um sistema de recompensas
- As moedas são exibidas no canto superior direito
- Diferentes ações geram diferentes quantidades de moedas

### Animações p5.js
- Todos os arquivos usam p5.js para animações visuais
- Canvas responsivo e otimizado
- Efeitos visuais únicos para cada experiência

### Validação de Entrada
- Verificação de números válidos
- Feedback visual para o usuário
- Prevenção de erros de entrada

## Como Usar

1. Certifique-se de que a biblioteca p5.js está carregada
2. Inclua o arquivo JavaScript correspondente na página HTML
3. O código será executado automaticamente quando a página carregar

## Estrutura de Classes

### Classe Particula (jogo.js)
```javascript
class Particula {
    constructor(x, y, cor, tipo)
    update()
    display()
    isDead()
}
```

### Classe ElementoVisual (criativo.js)
```javascript
class ElementoVisual {
    constructor(numero, x, y)
    update()
    display()
}
```

## Event Listeners

Todos os arquivos implementam event listeners para:
- Tecla Enter para submissão
- Carregamento da página (DOMContentLoaded)
- Redimensionamento da janela (quando aplicável) 