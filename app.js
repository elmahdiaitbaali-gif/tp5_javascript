
const filtre = document.getElementById("filtre");
const produits = document.querySelectorAll(".produit");

filtre.addEventListener("change", function() {
    const categorie = filtre.value;

    produits.forEach(function(produit) {
        if (
            categorie === "tous" ||
            produit.dataset.categorie === categorie
        ) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
});

const recherche = document.getElementById("recherche");


recherche.addEventListener("input", function() {
    const texte = recherche.value.toLowerCase().trim();

    produits.forEach(function(produit) {
        const nom = produit.querySelector("h3").textContent.toLowerCase();

        if (nom.includes(texte)) {
            produit.style.display = "block";
        } else {
            produit.style.display = "none";
        }
    });
});


