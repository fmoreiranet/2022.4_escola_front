import AlunoController from "./js/controller/AlunoController.js"

const alunoController = new AlunoController;


// Loadding.......
function loadingShow() {
    let loading = document.querySelector("#loading");
    loading.classList.remove("visually-hidden");
}

function loadingHide() {
    let loading = document.querySelector("#loading");
    loading.classList.add("visually-hidden");
}
