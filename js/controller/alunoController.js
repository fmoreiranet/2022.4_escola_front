(function () {
    let btnEnvioDados = document.getElementById("enviar-dados");
    if (btnEnvioDados) {
        btnEnvioDados.addEventListener("click", function () {
            enviarDados();
        });
    }
    let localListAluno = document.getElementById("localListAluno");
    if (localListAluno) {
        listaAluno();
    }

    showEditAluno();
})();

function enviarDados() {
    try {
        const aluno = mountAluno();
        aluno.validarDados();
        addAluno(aluno, function (result) {
            limparForm();
            alert(result);
        });
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

function limparForm() {
    document.getElementById("formCadadastro").reset()
}

function mountAluno() {
    let alunoTemp = new Aluno();
    alunoTemp.matricula = document.getElementById("matricula").value;
    alunoTemp.nome = document.getElementById("nome").value;
    alunoTemp.email = document.getElementById("email").value;
    alunoTemp.senha = document.getElementById("senha").value;
    alunoTemp.data_nasc = document.getElementById("data_nasc").value;
    return alunoTemp;
}

function listaAluno() {
    getAllAluno((alunos) => {
        let localListAluno = document.getElementById("localListAluno");
        let tempTable = `
        <table class='table'>
        <tr>
            <th>Matricula</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Data Nasc.</th>
            <th><img src="../img/trash-can-regular.svg" alt="" class="icon"></th>
            <th><img src="../img/pen-to-square-regular.svg" alt="" class="icon"></th>
        </tr>
        `
        for (let index = 0; index < alunos.length; index++) {
            tempTable += `
            <tr>
                <td>${alunos[index].matricula}</td>
                <td>${alunos[index].nome}</td>
                <td>${alunos[index].email}</td>
                <td>${alunos[index].data_nasc}</td>
                <td><img src="../img/trash-can-regular.svg" alt="" class="icon" onclick="removerAluno(${alunos[index].matricula}, '${alunos[index].nome}')"></td>
                <td><img src="../img/pen-to-square-regular.svg" alt="" class="icon" onclick="editarAluno(${alunos[index].matricula})"></td>
            <tr>`;
        }
        tempTable += `</table>`
        localListAluno.innerHTML = tempTable;
    });
}

function editarAluno(matricula) {
    console.log("editar:", matricula);
    getAluno(matricula, (aluno) => {
        sessionStorage.setItem("editAluno", JSON.stringify(aluno));
        location.href = "alunoCadastro.html";
    });
}

function showEditAluno() {
    let editAluno = JSON.parse(sessionStorage.getItem("editAluno"));
    if (editAluno != null) {
        let alunoTemp = editAluno.dados[0];
        document.getElementById("matricula").value = alunoTemp.matricula;
        document.getElementById("nome").value = alunoTemp.nome;
        document.getElementById("email").value = alunoTemp.email;
        document.getElementById("senha").value = alunoTemp.senha;
        document.getElementById("data_nasc").value = alunoTemp.data_nasc;
        sessionStorage.removeItem("editAluno");
        return alunoTemp;
    }
    return null;
}

function removerAluno(matricula, nome) {
    console.log("remover:", matricula);
    let pergunta = `Deseja remover o cadastro: ${nome}?`;
    if (confirm(pergunta)) {
        deleteAluno(matricula, (result) => {
            console.log(result);
            alert(result.message);
            listaAluno();
        });
    }
}




// Loadding.......
function loadingShow() {
    let loading = document.querySelector("#loading");
    loading.classList.remove("visually-hidden");
}

function loadingHide() {
    let loading = document.querySelector("#loading");
    loading.classList.add("visually-hidden");
}

