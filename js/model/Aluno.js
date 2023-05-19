export default class Aluno {
    constructor() {
        this.matricula = 0,
            this.nome = "",
            this.email = "",
            this.senha = "",
            this.data_nasc = "",
            this.ativo = true
    }
    validarDados() {
        let erros = "";
        if (!this.nome) {
            erros += "Nome em branco.\n";
        }
        if (!this.email) {
            erros += "E-mail em branco.\n";
        }
        if (!this.senha) {
            erros += "Senha em branco.\n";
        }
        if (erros != "") throw erros;
    };
}