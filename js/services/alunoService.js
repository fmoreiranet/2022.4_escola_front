//CRUD ----------------------
function addAluno(aluno = {}) {
    aluno.id_aluno = new Date().getTime();
    alunos.push(aluno);
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

function getAllAluno() { //listAluno()
    let dadosAlunos = JSON.parse(localStorage.getItem("alunos"));
    if (dadosAlunos == null) {
        dadosAlunos = [];
    }
    return dadosAlunos;
}

function getAluno(index = 0) {
    let dadosAlunos = getAllAluno();
    let aluno = dadosAlunos[index];
    return aluno;
}

function deleteAluno(index = 0) {
    let dadosAlunos = getAllAluno();
    let novoVetor = [];
    let pergunta = `Deseja remover o aluno ${dadosAlunos[index].nome}?`;
    if (confirm(pergunta)) {
        //dadosAlunos.splice(index, 1);
        let cont = 0;
        for (let atual = 0; atual < (dadosAlunos.length - 1); atual++) {
            if (atual != index) {
                novoVetor[cont] = dadosAlunos[atual];
                cont++;
            }
        }
        // localStorage.clear();
        localStorage.setItem("alunos", JSON.stringify(novoVetor));
        montarTabela();
    }
    return novoVetor;
}

function updateAluno(aluno) {
    let dadosAlunos = getAllAluno();
    for (let index = 0; index < dadosAlunos.length; index++) {
        if (dadosAlunos[index].id_aluno == aluno.id_aluno) {
            dadosAlunos[index] = aluno;
        }
    }
    localStorage.setItem("alunos", JSON.stringify(dadosAlunos));
}

//Busca CEP ------------------
function buscaCEP(cep = "", callback) {
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    const http = new XMLHttpRequest();
    http.onload = function (res) {
        let endereco = JSON.parse(res.target.response);
        return callback(endereco);
    };
    http.open("GET", url);
    http.send();
}

//https://www.w3schools.com/js/js_async.asp
//https://www.w3schools.com/js/js_api_fetch.asp
async function buscaCEP2(cep = "", callback) {
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    //https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
    //Definimos o objeto com os parâmetros de envio da requisição 
    var parameter = {
        method: 'GET'
    };

    //buscar dados de um arquivo ou url
    await fetch(url, parameter)
        //processa os dados de textos recebidos. O termino depende do tamanho dos dados
        .then(res => res.text())
        //pegar os dados do processamento do 'then' anterior para se convertido para um Objeto;
        .then(txt => {
            let endereco = JSON.parse(txt);
            return callback(endereco);
        })
        //Erro na tratativa dos dados. Os then anteriores;
        .catch(err => {
            console.error("Erro:" + err.message);
        })
}
