function criarAluno() {
    return aluno = { //objetos ficam em chaves; Ex. const endereco = {}
        id_aluno: 0,
        nome: "",
        matricula: "",
        turma: "",
        avaliacao1: 0,
        avaliacao2: 0,
        media: 0,
        resultado: "",
        validarDados: function () {
            let erros = "";
            if (this.none) {
                erros += "Nome em branco.\n";
            }
            if (this.avaliacao1 < 0 || this.avaliacao1 > 10 || Number.isNaN(this.avaliacao1)) {
                erros += "Valor da Avaliação 1 esta fora do padrão (0,0 a 10,0).\n";
            }
            if (this.avaliacao2 < 0 || this.avaliacao2 > 10 || Number.isNaN(this.avaliacao2)) {
                erros += "Valor da Avaliação 2 esta fora do padrão (0,0 a 10,0).\n";
            }
            return erros;
        },
        calculoMedia: function () {
            this.media = (this.avaliacao1 + this.avaliacao2) / 2;
            return this.media;
        },
        validarResultado: function () {
            let result = ""
            if (this.media >= 6) {
                result = "Aprovado";
            } else if (this.media >= 3 && this.media < 6) {
                result = "Exame";
            } else {
                result = "Reprovado";
            }
            this.resultado = result;
        }
    }
}

// function validarDados(aluno = {}) {
//     let erros = "";
//     if (aluno.none) {
//         erros += "Nome em branco.\n";
//     }
//     if (aluno.avaliacao1 < 0 || aluno.avaliacao1 > 10 || Number.isNaN(aluno.avaliacao1)) {
//         erros += "Valor da Avaliação 1 esta fora do padrão (0,0 a 10,0).\n";
//     }
//     if (aluno.avaliacao2 < 0 || aluno.avaliacao2 > 10 || Number.isNaN(aluno.avaliacao2)) {
//         erros += "Valor da Avaliação 2 esta fora do padrão (0,0 a 10,0).\n";
//     }
//     return erros;
// }

// function calculoMedia(aluno) {
//     return (aluno.avaliacao1 + aluno.avaliacao2) / 2;
// }

// function montarResultado(mediaAluno = 0) {
//     if (mediaAluno >= 6) {
//         return "Aprovado";
//     } else if (mediaAluno >= 3 && mediaAluno < 6) {
//         return "Exame";
//     } else {
//         return "Reprovado";
//     }
// }