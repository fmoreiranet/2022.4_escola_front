export default class AlunoService {
    getToken() {
        let token = JSON.parse(sessionStorage.getItem("token"));
        if (token) {
            return "Bearer " + token;
        }
        return "";
    }

    //CRUD ----------------------
    async addAluno(aluno, callback) {
        var parameter = {
            method: 'POST',
            body: JSON.stringify(aluno),
            headers: {
                'Authorization': this.this.getToken(),
                'Content-Type': 'application/json'
            }
        };
        await fetch(process.env.URL_API + "aluno", parameter)
            .then(res => res.text())
            .then(txt => {
                let result = JSON.parse(txt);
                valideResult(result)
                return callback(result.message);
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    async getAllAluno(callback) {
        var parameter = {
            method: 'GET',
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            }
        };
        await fetch(process.env.URL_API + "aluno", parameter)
            .then(res => res.text())
            .then(content => {
                let result = JSON.parse(content);
                valideResult(result)
                return callback(result.dados);
            })
            .catch(err => {
                throw new Error(err);
            });
    }

    async getAluno(matricula, callback) {
        let obj = { matricula: matricula };
        let parameter = {
            method: 'PUT',
            body: JSON.stringify(obj),
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            }
        };
        await fetch(process.env.URL_API + "aluno", parameter)
            .then(res => res.text())
            .then(content => {
                let result = JSON.parse(content);
                valideResult(result)
                return callback(result.dados[0]);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    async deleteAluno(matricula, callback) {
        let obj = { matricula: matricula };
        let parameter = {
            method: 'DELETE',
            body: JSON.stringify(obj),
            headers: {
                'Authorization': this.getToken(),
                'Content-Type': 'application/json'
            }
        };
        await fetch(process.env.URL_API + "aluno", parameter)
            .then(res => res.text())
            .then(content => {
                let result = JSON.parse(content);
                valideResult(result)
                return callback(result);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }

    async loginAluno(email, senha, callback) {
        let obj = { email: email, senha: senha };
        let parameter = {
            method: 'POST',
            body: JSON.stringify(obj)
        };
        await fetch(process.env.URL_API + "aluno/login", parameter)
            .then(res => res.text())
            .then(content => {
                let result = JSON.parse(content);
                valideResult(result)
                sessionStorage.setItem("token", JSON.stringify(result.token));
                return callback(result.dados[0]);
            })
            .catch(err => {
                console.log(err);
                throw new Error(err);
            });
    }

    valideResult(result) {
        // response = {
        //     error: "",
        //     data: [{}],
        //     requestDate: "",
        //     message: ""
        // }

        if (result.error && (result.error !== "" || result.error !== null))
            throw new Error(result.error);
    }
}