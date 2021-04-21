const bouton = document.querySelector(".oui");

const appel = async () => {
  fetch("https://loripsum.net/api/10/short/headers")
    .then((response) => {
        console.log(response)
    })
};

bouton.addEventListener("click", () => {
    appel()
});
