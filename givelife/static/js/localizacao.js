function buscarLocaisDoacao() {
    const locaisContainer = document.getElementById('locais-doacao');
    const carregando = document.getElementById('carregando');
    carregando.style.display = 'block';

    const latitude = -23.5505;
    const longitude = -46.6333;

    fetch(`https://jsonplaceholder.typicode.com/posts`)
        .then(response => response.json())
        .then(data => {
            carregando.style.display = 'none';

            const locais = [
                { nome: "Banco de Sangue Central", endereco: "Av. Principal, 123", distancia: "2 km" },
                { nome: "Hemocentro Municipal", endereco: "Rua Secundária, 456", distancia: "5 km" },
                { nome: "Clínica de Doação Vida", endereco: "Praça das Flores, 789", distancia: "7 km" }
            ];

            locais.forEach(local => {
                const cartao = document.createElement('div');
                cartao.classList.add('cartao-passo');
                cartao.innerHTML = `
                    <h2>${local.nome}</h2>
                    <p>Endereço: ${local.endereco}</p>
                    <p>Distância: ${local.distancia}</p>
                `;
                locaisContainer.appendChild(cartao);
            });
        })
        .catch(error => {
            carregando.style.display = 'none';
            const erro = document.createElement('div');
            erro.classList.add('cartao-passo');
            erro.innerHTML = `<p>Erro ao buscar locais de doação. Tente novamente mais tarde.</p>`;
            locaisContainer.appendChild(erro);
            console.error("Erro ao buscar locais:", error);
        });
}

window.onload = buscarLocaisDoacao;