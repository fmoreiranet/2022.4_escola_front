class Aluno {
    constructor() {
        this.id_aluno = 0,
            this.nome = "",
            this.matricula = "",
            this.turma = "",
            this.avaliacao1 = 0,
            this.avaliacao2 = 0,
            this.media = 0,
            this.resultado = ""
    }
    validarDados() {
        let erros = "";
        if (this.nome) {
            erros += "Nome em branco.\n";
        }
        if (this.avaliacao1 < 0 || this.avaliacao1 > 10 || Number.isNaN(this.avaliacao1)) {
            erros += "Valor da Avaliação 1 esta fora do padrão (0,0 a 10,0).\n";
        }
        if (this.avaliacao2 < 0 || this.avaliacao2 > 10 || Number.isNaN(this.avaliacao2)) {
            erros += "Valor da Avaliação 2 esta fora do padrão (0,0 a 10,0).\n";
        }
        return erros;
    };
    calculoMedia() {
        this.media = (this.avaliacao1 + this.avaliacao2) / 2;
        return this.media;
    };
    validarResultado() {
        let result = ""
        if (this.media >= 6) {
            result = "Aprovado";
        } else if (this.media >= 3 && this.media < 6) {
            result = "Exame";
        } else {
            result = "Reprovado";
        }
        this.resultado = result;
    };
}