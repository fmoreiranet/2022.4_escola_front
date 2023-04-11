(function () {
    let btnEnvioDados = document.getElementById("enviar-dados")
    btnEnvioDados.addEventListener("click", function () {
        enviarDados();
    });
})();

function enviarDados() {
    try {
        const aluno = mountAluno();
        aluno.validarDados();
        addAluno(aluno);
        limparForm();
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

function loadingShow() {
    let loading = document.querySelector("#loading");
    loading.classList.remove("visually-hidden");
}

function loadingHide() {
    let loading = document.querySelector("#loading");
    loading.classList.add("visually-hidden");
}

