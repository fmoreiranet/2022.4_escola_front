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
                <td><img src="../img/trash-can-regular.svg" alt="" class="icon" onclick=""></td>
                <td><img src="../img/pen-to-square-regular.svg" alt="" class="icon" onclick=""></td>
            <tr>`;
        }
        tempTable += `</table>`
        localListAluno.innerHTML = tempTable;
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

