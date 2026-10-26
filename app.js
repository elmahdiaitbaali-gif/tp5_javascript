
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

