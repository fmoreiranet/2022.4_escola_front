const alunos = getAllAluno();

(function () {
    montarTabela();
    let btnEnvioDados = document.getElementById("enviar-dados")
    //https://www.w3schools.com/jsref/met_element_addeventlistener.asp
    btnEnvioDados.addEventListener("click", function () {
        enviarAvaliacao();
    });

    document.getElementById("avaliacao2")
        .addEventListener("keypress", (e) => {
            if (e.key == "Enter") {
                enviarAvaliacao();
            }
        });

    let caixaCEP = document.getElementById("cep");
    caixaCEP.addEventListener("keyup", (event) => {
        if (caixaCEP.value.length >= 8) {
            verificaCEP(caixaCEP.value);
        }
    });
})();

function enviarAvaliacao() {
    const aluno = mountAluno();

    let errosEncontrados = aluno.validarDados();
    if (errosEncontrados != "") {
        alert(errosEncontrados);
        return
    }

    //let media = aluno.calculoMedia();
    //aluno.media = media;
    aluno.calculoMedia();
    //let resultado = aluno.validarResultado();
    //aluno.resultado = resultado;
    aluno.validarResultado();

    if (Number.isNaN(aluno.id_aluno)) {
        addAluno(aluno);
    } else {
        updateAluno(aluno);
        document.getElementById("id_aluno").value = "";
    }

    montarTabela();
    limparForm();
}

function montarTabela() {
    let dadosAlunos = getAllAluno();
    let saidaTexto = document.getElementById("saidaTexto");
    saidaTexto.innerHTML = "";
    for (let index = 0; index < dadosAlunos.length; index++) {
        saidaTexto.innerHTML += `
        <tr>
            <td>${dadosAlunos[index].id_aluno}</td>
            <td>${dadosAlunos[index].nome}</td>
            <td>${dadosAlunos[index].resultado}</td>
            <td>${dadosAlunos[index].media}</td>
            <td><img src="./img/trash-can-regular.svg" alt="" class="icon" onclick="deleteAluno(${index})"></td>
            <td><img src="./img/pen-to-square-regular.svg" alt="" class="icon" onclick="editFormAluno(${index})"></td>
        <tr>`;
    }
}

function limparForm() {
    document.getElementById("formCadadastro").reset()
}

function mountAluno() {
    // let alunoTemp = criarAluno();
    let alunoTemp = new Aluno();
    alunoTemp.nome = document.getElementById("nome").value;
    //alunoTemp.matricula = document.getElementById("matricula").value;
    //alunoTemp.turma = document.getElementById("turma").value;
    alunoTemp.avaliacao1 = parseFloat(document.getElementById("avaliacao1").value);
    alunoTemp.avaliacao2 = parseFloat(document.getElementById("avaliacao2").value);
    alunoTemp.id_aluno = parseInt(document.getElementById("id_aluno").value);
    return alunoTemp;
}

function editFormAluno(index) {
    let aluno = getAluno(index);
    document.getElementById("nome").value = aluno.nome;
    //document.getElementById("matricula").value = aluno.matricula;
    //document.getElementById("turma").value aluno.turma;
    document.getElementById("avaliacao1").value = aluno.avaliacao1;
    document.getElementById("avaliacao2").value = aluno.avaliacao2;
    document.getElementById("id_aluno").value = aluno.id_aluno;
}


//Busca CEP -------------------
function verificaCEP(cep) {
    //let cep = document.getElementById("cep").value;
    if (!cep) {
        alert("Cep obrigatório!");
        return;
    } else if (cep.length < 8) {
        alert("Cep invalido!");
        return;
    }
    loadingShow();
    buscaCEP2(cep, function (res) {
        if (res.erro) {
            loadingHide();
            alert("Cep não existe!")
        } else {
            loadingHide();
            //document.getElementById("cep").value = res.cep;
            document.getElementById("logradouro").value = res.logradouro;
            document.getElementById("bairro").value = res.bairro;
            document.getElementById("localidade").value = res.localidade;
            document.getElementById("uf").value = res.uf;
        }
    });
}


function loadingShow() {
    let loading = document.querySelector("#loading");
    loading.classList.remove("visually-hidden");
}

function loadingHide() {
    let loading = document.querySelector("#loading");
    loading.classList.add("visually-hidden");
}

