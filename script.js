const btnPiada = document.getElementById("btnPiada");
const setup = document.getElementById("setup");
const punchline = document.getElementById("punchline");


function tipoPiada() {
    let radios = document.getElementsByName("type");

    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value === "random") {
                return "random_joke";
            } 
            return radios[i].value;
        }
    }
}

btnPiada.addEventListener("click", buscarPiada);

async function buscarPiada() {
    const valorSelecionado = tipoPiada();
    let resposta;
    
    try {
        if (valorSelecionado === "random_joke") {
            resposta = await fetch(
                `https://official-joke-api.appspot.com/jokes/random`
            );
            const dados = await resposta.json();
            setup.textContent = dados.setup;
            punchline.textContent = dados.punchline;
        } else {
            resposta = await fetch(
                `https://official-joke-api.appspot.com/jokes/${valorSelecionado}/random`
            );
            const dados = await resposta.json();
            setup.textContent = dados[0].setup;
            punchline.textContent = dados[0].punchline;
        }
        

    } catch (erro) {
        setup.textContent = "Erro ao carregar a piada.";
        punchline.textContent = "";
        console.error(erro);
    }
}