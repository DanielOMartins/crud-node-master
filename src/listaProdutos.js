function listaProdutos(){

    const url = 'http://localhost:3000/produtos';
    const options = {
        method: 'GET',
        mode: 'cors',
        Headers: {
            'content-type':'application/json;charset=utf-8'
        }
    }

    return fetch(url, options).then(
        resp => resp.json()
    ).then(
        data => {
            console.log(data);
            return data
        }
    )
}

function criaLinha(nome, quantidade, validade){
    const linha = document.createElement('li')
    const conteudo = `<p>${nome}: ${quantidade} - ${validade}</p>`

    linha.innerHTML = conteudo
    return linha
}

const lista = document.querySelector(['data-lista'])
async function render() {
    try{
        const produtos = listaProdutos()
        produtos.forEach(produto => {
            lista.appendChild(criaLinha(produto.id, produto.quant, produto.validade))
        });
    }catch(e){
        console.log(e);
    }
}

render();