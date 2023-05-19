import Aluno from '../model/Aluno.js';
import AlunoService from '../services/AlunoService.js';
class AlunoController {
    constructor() {
        let btnEnvioDados = document.getElementById("enviar-dados");
        if (btnEnvioDados) {
            btnEnvioDados.addEventListener("click", function () {
                this.enviarDados();
            });
        }
        let localListAluno = document.getElementById("localListAluno");
        if (localListAluno) {
            this.listaAluno();
        }

        let btnEntrarAluno = document.getElementById("entrar-aluno");
        if (btnEntrarAluno) {
            btnEntrarAluno.addEventListener("click", function () {
                this.entrarAluno();
            });
        }

        let btnSairAluno = document.getElementById("sair-aluno");
        if (btnSairAluno) {
            btnSairAluno.addEventListener("click", function () {
                this.sairAluno();
            });
        }

        this.showEditAluno();
        this.verifyAluno();
    }

    async enviarDados() {
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

    limparForm() {
        document.getElementById("formCadadastro").reset()
    }

    mountAluno() {
        let alunoTemp = new Aluno();
        alunoTemp.matricula = document.getElementById("matricula").value;
        alunoTemp.nome = document.getElementById("nome").value;
        alunoTemp.email = document.getElementById("email").value;
        alunoTemp.senha = document.getElementById("senha").value;
        alunoTemp.data_nasc = document.getElementById("data_nasc").value;
        return alunoTemp;
    }

    async listaAluno() {
        try {
            const alunoService = new AlunoService();
            await alunoService.getAllAluno((alunos) => {
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

    async editarAluno(matricula) {
        try {
            console.log("editar:", matricula);
            const alunoService = new AlunoService();
            await alunoService.getAluno(matricula, (aluno) => {
                sessionStorage.setItem("editAluno", JSON.stringify(aluno));
                location.href = "alunoCadastro.html";
            });
        } catch (error) {
            alert("Erro: \n" + error);
        }
    }

    showEditAluno() {
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

    async removerAluno(matricula, nome) {
        try {
            console.log("remover:", matricula);
            const alunoService = new AlunoService();
            let pergunta = `Deseja remover o cadastro: ${nome}?`;
            if (confirm(pergunta)) {
                await alunoService.deleteAluno(matricula, (result) => {
                    console.log(result);
                    alert(result.message);
                    listaAluno();
                });
            }
        } catch (error) {
            alert("Erro: \n" + error);
        }
    }

    async entrarAluno() {
        try {
            const alunoService = new AlunoService();
            let email = document.getElementById("email").value;
            let senha = document.getElementById("senha").value;
            await alunoService.loginAluno(email, senha, (result) => {
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

    sairAluno() {
        try {
            sessionStorage.removeItem("userInfo");
            verifyAluno();
            location.href = "/projetos/escola_front/";
        } catch (error) {
            alert("Erro: \n" + error);
        }
    }

    verifyAluno() {
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
}

export default AlunoController;