// Affichage du numéro de commande avec message de remerciement
function commande(){
    let data = JSON.parse(sessionStorage.getItem('order'));
    let prix = JSON.parse(sessionStorage.getItem('prix'));
    let conteneurRecap = document.getElementById("recapitulatif")

    const p1 = document.createElement("p")
    p1.textContent = "Merci pour votre commande."
    recapitulatif.appendChild (p1)

    const p2 = document.createElement("p")
    p2.textContent = "Celle-ci a été enregistrée sous le numéro : " + data.orderId + "."
    recapitulatif.appendChild (p2)

    const p3 = document.createElement("p")
    p3.textContent = "Le montant total de " + prix + " €."
    recapitulatif.appendChild (p3)
    
}
commande();