const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const palavras = ['javascript', 'programacao', 'desenvolvedor', 'internet', 'computador', 'node']
const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

// CONFIGURAÇÃO DO ESTADO DO JOGO
let tentativasRestantes = 6
let letrasAdivinhadas = []
let progresso = Array(palavraSecreta.length).fill("_")

//FUNÇÃO PARA MOSTRAR O ESTADO ATUAL DO JOGO

function mostrarProgresso() {
    console.log(progresso.join(' '))
}

function adivinhar(letra) {
    if (letrasAdivinhadas.includes(letra)) {
        console.log('Você já adivinhou essa letra!')
        return
    }

    letrasAdivinhadas.push(letra)

    if (palavraSecreta.includes(letra)) {
        // Atualiza o progresso
        for(let i = 0; i < palavraSecreta.length; i++){
            if (palavraSecreta[i] === letra){
                progresso[i] = letra
            }
        }
        console.log('Boa, a letra está na palavra')
    } else {
        tentativasRestantes--
        console.log('A letra não está na palavra. Tentativas restantes: ', tentativasRestantes)
    }

    mostrarProgresso()
    verificarVitoriaOuDerrota()
}

function verificarVitoriaOuDerrota() {
    if(!progresso.includes('_')) {
        console.log('Parabéns, você ganhou')
        rl.close()
    } else if (tentativasRestantes <= 0) {
        console.log('Que pena! Você perdeu. a palavra secreta era: ', palavraSecreta)
        rl.close()
    } else {
        pedirLetra()
    }
}

function pedirLetra() {
    rl.question('Digite uma letra: ', (input) => {
        adivinhar(input)
    })
}

mostrarProgresso()
pedirLetra()