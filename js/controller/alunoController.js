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

    let btnEntrarAluno = document.getElementById("entrar-aluno");
    if (btnEntrarAluno) {
        btnEntrarAluno.addEventListener("click", function () {
            entrarAluno();
        });
    }

    let btnSairAluno = document.getElementById("sair-aluno");
    if (btnSairAluno) {
        btnSairAluno.addEventListener("click", function () {
            sairAluno();
        });
    }

    showEditAluno();
    verifyAluno();
})();

async function enviarDados() {
    try {
        const aluno = mountAluno();
        aluno.validarDados();
        await addAluno(aluno, function (result) {
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

async function listaAluno() {
    try {
        await getAllAluno((alunos) => {
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
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

async function editarAluno(matricula) {
    try {
        console.log("editar:", matricula);
        await getAluno(matricula, (aluno) => {
            sessionStorage.setItem("editAluno", JSON.stringify(aluno));
            location.href = "alunoCadastro.html";
        });
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

function showEditAluno() {
    try {
        let editAluno = JSON.parse(sessionStorage.getItem("editAluno"));
        if (editAluno != null) {
            let alunoTemp = editAluno;
            document.getElementById("matricula").value = alunoTemp.matricula;
            document.getElementById("nome").value = alunoTemp.nome;
            document.getElementById("email").value = alunoTemp.email;
            document.getElementById("senha").value = alunoTemp.senha;
            document.getElementById("data_nasc").value = alunoTemp.data_nasc;
            sessionStorage.removeItem("editAluno");
            return alunoTemp;
        }
        return null;
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

async function removerAluno(matricula, nome) {
    try {
        console.log("remover:", matricula);
        let pergunta = `Deseja remover o cadastro: ${nome}?`;
        if (confirm(pergunta)) {
            await deleteAluno(matricula, (result) => {
                console.log(result);
                alert(result.message);
                listaAluno();
            });
        }
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

async function entrarAluno() {
    try {
        let email = document.getElementById("email").value;
        let senha = document.getElementById("senha").value;
        await loginAluno(email, senha, function (result) {
            console.log(result);
            if (result) {
                sessionStorage.setItem("userInfo", JSON.stringify(result));
                verifyAluno();
                location.href = "/projetos/escola_front/";
            }
        });
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

function sairAluno() {
    try {
        sessionStorage.removeItem("userInfo");
        verifyAluno();
        location.href = "/projetos/escola_front/";
    } catch (error) {
        alert("Erro: \n" + error);
    }
}

function verifyAluno() {
    try {
        let areaAluno = document.getElementById("nome-user");
        let menuOn = document.getElementsByClassName("menu-aluno-on");
        let menuOff = document.getElementsByClassName("menu-aluno-off");
        let aluno = JSON.parse(sessionStorage.getItem("userInfo"));
        for (let menu of menuOn) {
            menu.style.display = "none";
        }
        for (let menu of menuOff) {
            menu.style.display = "block";
        }
        if (aluno) {
            areaAluno.innerHTML = aluno.nome;
            for (let menu of menuOn) {
                menu.style.display = "block";
            }
            for (let menu of menuOff) {
                menu.style.display = "none";
            }
        }
        return aluno != null;
    } catch (error) {
        alert("Erro: \n" + error);
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

