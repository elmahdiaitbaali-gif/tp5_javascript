
const recherche = document.getElementById("recherche");
const filtre = document.getElementById("filtre");
const produits = document.querySelectorAll(".produit");
const compteur = document.getElementById("compteur");
const message = document.getElementById("message");

function filtrerProduits() {
    const texte = recherche.value.toLowerCase().trim();
    const categorie = filtre.value;
    let nombre = 0;

    produits.forEach(function(produit) {
        const nom = produit.querySelector("h3").textContent.toLowerCase();
        const categorieProduit = produit.dataset.categorie;

        const correspondRecherche = nom.includes(texte);
        const correspondCategorie =
            categorie === "tous" || categorieProduit === categorie;

        if (correspondRecherche && correspondCategorie) {
            produit.style.display = "block";
            nombre++;
        } else {
            produit.style.display = "none";
        }
    });

    compteur.textContent = nombre + " produit(s)";
    
    if (nombre === 0) {
        message.textContent = "Aucun produit trouvé.";
    } else {
        message.textContent = "";
    }
}

recherche.addEventListener("input", filtrerProduits);
filtre.addEventListener("change", filtrerProduits);

filtrerProduits();
