const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pellentesque turpis vitae mattis. Cras rutrum turpis non urna mattis maximus. Quisque condimentum sit amet purus vitae vehicula. Mauris pretium, nisl ac consequat ultrices, dui est scelerisque libero, at congue elit neque eget diam. Nulla lobortis ligula vitae elit vulputate tempus et non metus. Suspendisse volutpat elementum aliquet. Duis a diam elit.\nMorbi vitae tortor sed odio ultrices laoreet a ac erat. Integer libero nisl, laoreet vitae eros semper, lacinia blandit orci. Integer efficitur dui vulputate ullamcorper ultricies. Donec at pellentesque erat. Donec tincidunt felis nunc, tempor venenatis libero sollicitudin vel. Suspendisse ligula tortor, dictum vel placerat sit amet, consequat id felis. Integer vitae iaculis urna. Pellentesque laoreet eros eget faucibus consequat. Duis fringilla viverra arcu, id porttitor risus rutrum eget. Suspendisse quis arcu ornare, mollis nunc sit amet, venenatis nulla. Maecenas condimentum risus et aliquam sagittis. Sed laoreet laoreet nunc, sed aliquam ligula tincidunt lobortis. Duis dignissim purus odio, eget suscipit urna elementum sit amet. Donec pellentesque fermentum urna eget ornare. Mauris sit amet mauris massa.\nPraesent eu massa id justo egestas bibendum luctus vel lacus. Proin semper tempus turpis, id molestie erat rutrum in. Sed iaculis ut ipsum at convallis. Sed feugiat nec ipsum at rhoncus. Morbi sed ex vehicula, egestas eros ut, pretium dolor. Sed sed ex non est ultrices ultricies sit amet eu ipsum. Nunc faucibus non quam a posuere.\nCurabitur odio ex, efficitur non sagittis at, rhoncus sed nisi. Cras leo ligula, aliquam eget leo id, mattis pulvinar dui. Aenean quis eros erat. Vivamus pellentesque fermentum mauris, eu luctus arcu tristique sed. Mauris varius lorem vel nibh rhoncus interdum. Donec porta ante id metus tristique, vel auctor nibh cursus. Cras a malesuada dolor. Duis est turpis, semper ut tristique eget, eleifend non eros. Integer ut lorem mattis augue gravida bibendum. Mauris vel faucibus dui. Etiam ut semper metus. Donec elit libero, tempor a tortor interdum, suscipit congue sem. \nNulla molestie lectus a mi interdum cursus ut nec lectus. Pellentesque imperdiet mi at risus euismod porta. Mauris accumsan eros vel hendrerit volutpat. Pellentesque et rutrum enim. Maecenas ut leo ac libero tincidunt finibus eu quis erat. Mauris varius lacus eu augue auctor, non bibendum sapien venenatis. Phasellus non ultrices diam. Pellentesque sit amet lobortis libero. Aliquam tempus ligula orci. Donec eget lacinia sapien. Ut faucibus est sed iaculis iaculis. \n";
const bouton = document.querySelector(".oui");
const number = document.querySelector("input");
const choix = document.querySelector("select");
const contenu = document.querySelector(".content");

let copy = "";

const setText = () => {
  const selector = document.querySelectorAll("option");
  if (number.value <= 1 && number.value) {
    selector[0].textContent = "mot";
    selector[1].textContent = "phrase";
    selector[2].textContent = "paragraphe";
    selector[3].textContent = "ligne de liste";
  } else {
    selector[0].textContent = "mots";
    selector[1].textContent = "phrases";
    selector[2].textContent = "paragraphes";
    selector[3].textContent = "lignes de liste";
  }
};
const getLorem = (amount, option) => {
  setText();
  contenu.innerHTML = "";
  let texte = [];
  let rendu = "";
  ////////////////////////////////////////////////////////
  switch (option) {
    case "1": //mots
      texte = lorem.split(" ");
      for (let index = 0; index < amount; index++) {
        let mot = texte[index];
        if (mot) {
          rendu = rendu + " " + mot;
        } else {
          rendu = rendu + " " + texte[Math.floor(Math.random() * texte.length)];
        }
      }
      if (rendu.charAt(rendu.length - 1) == ",") {
        rendu = rendu.slice(0, -1);
      }

      if (rendu.charAt(rendu.length - 1) != "." && rendu.length > 0) {
        rendu = rendu + ".";
      }

      const paragraphe = document.createElement("p");
      paragraphe.textContent = rendu;

      contenu.appendChild(paragraphe);
      break;
    ////////////////////////////////////////////////////////
    case "2": // phrase
      lorem.split(".").forEach((elt, index) => {
        if (elt.trim() != "\n" && elt.trim() != "") {
          texte[index] = elt.trim();
        }
      });
      for (let index = 0; index < amount; index++) {
        if (texte[index]) {
          let phrase = texte[index];
          rendu = rendu + phrase + ". ";
        } else {
          rendu =
            rendu + texte[Math.floor(Math.random() * texte.length)] + ". ";
        }
      }
      const phrases = document.createElement("p");
      phrases.textContent = rendu;
      contenu.appendChild(phrases);
      break;
    ////////////////////////////////////////////////////////
    case "3": //paragraphe
      texte = lorem.split("\n");
      for (let index = 0; index < amount; index++) {
        let p = document.createElement("p");
        if (texte[index]) {
          rendu = rendu + texte[index] + "\n";
          p.textContent = texte[index];
        } else {
          rendu =
            rendu + texte[Math.floor(Math.random() * texte.length)] + "\n";
          p.textContent = texte[Math.floor(Math.random() * texte.length)];
        }
        contenu.appendChild(p);
      }
      break;
    ////////////////////////////////////////////////////////
    case "4": // liste
      texte = lorem.split(".");
      const ul = document.createElement("ul");
      for (let index = 0; index < amount; index++) {
        let li = document.createElement("li");
        let ligne = "";
        if (texte[index]) {
          ligne = texte[index];
        } else {
          ligne = texte[Math.floor(Math.random() * texte.length)];
        }
        ligne = ligne.trim();
        if (ligne != "") {
          rendu = rendu + "\n- " + ligne;
          li.textContent = ligne;
          ul.appendChild(li);
        }
      }
      rendu = rendu.substring(1);
      contenu.appendChild(ul);
      break;
    default:
      break;
  }
  copy = rendu; //Clipboard
};

//Set event listeners

number.addEventListener("input", () => {
  if(parseInt(number.value) <= 1){
    number.value = 1
  }
  getLorem(number.value, choix.value);
});

choix.addEventListener("input", () => {
  getLorem(number.value, choix.value);
});

bouton.addEventListener("click", () => {
  navigator.clipboard.writeText(copy);
});

getLorem(number.value, choix.value);
