// je récupère l'id produit dans url grace à méthode URLSearchParams
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
console.log(id)

//  affiche un seul produit dans la page

let request = new XMLHttpRequest()
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        furniture = JSON.parse(this.responseText)
        affichageProduit()
    }
};
request.open("GET", "http://localhost:3000/api/furniture/" + id)
request.send()


// Affichage du produit
function affichageProduit() {
    const titre = document.getElementById("titre")
    titre.textContent = furniture.name
    const prix = document.getElementById("prix")
    prix.textContent = furniture.price + " €"
    const description = document.getElementById("description")
    description.textContent = furniture.description
    const image = document.getElementById("image")
    image.src = furniture.imageUrl
    //je créé les options du vernis
    const lesVernis = document.getElementById("varnish-select")
    const options = furniture.varnish
    options.forEach(function(element, vernis) {
        lesVernis[vernis] = new Option(element, element)
    })
    //bouton retour à la liste       
    const retour_liste = document.getElementById("btn-liste")
    retour_liste.textContent = "Retour à la liste"
    retour_liste.addEventListener("click", function() {
        window.location.href = "index.html"
    })
    // bouton voir le panier
    const voir_panier = document.getElementById("btn-panier")
    voir_panier.textContent = "Voir le panier"
    voir_panier.addEventListener("click", function() {
        window.location.href = "panier.html"
    })

    //selection du vernis
    let selectionVernis = document.getElementById("varnish-select").addEventListener("change", function (e) {
        selectionVernis = e.target.value;
        console.log("vernis : " + e.target.value);
    });
    // selection du nombre de produit
    let nombreProduit = document.getElementById("nombreProduit").addEventListener('change', function (e) {
        nombreProduit = e.target.value
        console.log("nombre de produit :" + e.target.value)
    })
    //bouton ajouter au panier
    const ajouter_panier = document.getElementById("btn-ajouter")
        ajouter_panier.textContent = "Ajouter au panier"
        ajouter_panier.addEventListener("click", function() {
            alert("Tu ajoute " + furniture.name + " au panier.")
            furniture.varnish = selectionVernis
            furniture.quantity = nombreProduit
            prixTotal()
            ajoutSessionStorage()
        })

}

//j'enregistre le prix total dans sessionstorage pour le proposer dans la page panier
function prixTotal(){
    let price = parseInt(furniture.price);
    let prixDuPanier = JSON.parse(sessionStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        sessionStorage.setItem("prixTotal", prixDuPanier + (price * furniture.quantity));
    } else {
        sessionStorage.setItem("prixTotal", price * furniture.quantity);
    }
}

function ajoutSessionStorage(){
    let panier = sessionStorage.getItem('panier');
    panier = JSON.parse(panier);
    
    if(panier != null){

        if(panier[furniture.name] === undefined) {
            panier = {...panier, [furniture.name] : furniture}
        } else {
            console.log("Existe déjà");
            if(panier[furniture.name]['varnish'] != furniture.varnish) {
                let newElem = furniture.name+' couleur '+ furniture.varnish;
                panier = {...panier, [newElem] : furniture}
            } else {
                furniture.quantity + 1
            }
        }
    } else {
        panier = {[furniture.name] : furniture}
        
    }
    sessionStorage.setItem("panier", JSON.stringify(panier));
}






 

