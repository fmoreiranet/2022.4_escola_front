//CRUD ----------------------
const url = "http://localhost/projetos/escola_back/";
async function addAluno(aluno, callback) {
    var parameter = {
        method: 'POST',
        body: JSON.stringify(aluno)
    };
    await fetch(url + "aluno", parameter)
        .then(res => res.text())
        .then(txt => {
            let result = JSON.parse(txt);
            return callback(result.message);
        })
        .catch(err => {
            throw err.error;
        })
}

async function getAllAluno(callback) {
    var parameter = {
        method: 'GET',
    };
    await fetch(url + "aluno", parameter)
        .then(res => res.text())
        .then(content => {
            let result = JSON.parse(content);
            return callback(result.dados);
        })
        .catch(err => {
            throw err.error;
        })
}

function getAluno(matricula) {

}

function deleteAluno() {
    let pergunta = `Deseja remover o aluno ${dadosAlunos[index].nome}?`;
    if (confirm(pergunta)) {

    }
    return novoVetor;
}

function updateAluno(aluno) {

}




// //Busca CEP ------------------
// function buscaCEP(cep = "", callback) {
//     let url = `https://viacep.com.br/ws/${cep}/json/`;
//     const http = new XMLHttpRequest();
//     http.onload = function (res) {
//         let endereco = JSON.parse(res.target.response);
//         return callback(endereco);
//     };
//     http.open("GET", url);
//     http.send();
// }

// //https://www.w3schools.com/js/js_async.asp
// //https://www.w3schools.com/js/js_api_fetch.asp
// async function buscaCEP2(cep = "", callback) {
//     let url = `https://viacep.com.br/ws/${cep}/json/`;

//     //https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API/Using_Fetch
//     //Definimos o objeto com os parâmetros de envio da requisição 
//     var parameter = {
//         method: 'GET'
//     };

//     //buscar dados de um arquivo ou url
//     await fetch(url, parameter)
//         //processa os dados de textos recebidos. O termino depende do tamanho dos dados
//         .then(res => res.text())
//         //pegar os dados do processamento do 'then' anterior para se convertido para um Objeto;
//         .then(txt => {
//             let endereco = JSON.parse(txt);
//             return callback(endereco);
//         })
//         //Erro na tratativa dos dados. Os then anteriores;
//         .catch(err => {
//             console.error("Erro:" + err.message);
//         })
// }
