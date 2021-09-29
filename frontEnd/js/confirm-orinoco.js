// Sélection de la balise form
const confirmForm = document.querySelector(".form-validation");

// Récupération des informations reçues dans le local storage résultant du retour du fetch post
const finalResponse = JSON.parse(localStorage.getItem("products"));

// Insertion d'un message de remerciement personnalisé
const finalMsg = async () => {

    if(finalResponse) {

        const titleContainer = document.querySelector(".title-container");

        const thankMsg = 
                `
                    <h1>Nous vous remercions pour votre commande, ${finalResponse.contact.firstName} !</h1>
    
                `
        titleContainer.innerHTML = thankMsg;
    } else {

        const titleContainer = document.querySelector(".title-container");

        const finalErrorMsg = 
        `
            <h1>Excusez - nous, ${finalResponse.contact.firstName} !<br/> Votre commande n'est pas validée.</h1>

        `
        titleContainer.innerHTML = finalErrorMsg;
    }  
}

// Récapitulatif de la commande de l'utilisateur avec le montant final et le numéro de commande du fetch post
const orderGeneralInformations = async () => {

    await finalMsg();

    if(finalResponse) {

        const orderSummary = 
            `
                <div class="container-total-price">
                    <p class="textTotalPrice">Montant total :</p>
                    <p class="totalPrice">${finalResponse.products[0].price / 100} €</p>
                </div>
                <div class="container-number-order">
                    <p class="text-order">Votre numéro de commande :</p>
                    <p class="number-order">${finalResponse.orderId}</p>
                </div>
       
            `
        confirmForm.innerHTML = orderSummary;
    } else {

        const orderSummary = 
            `
                <div class="container-total-price">
                    <p>Veuillez - nous contacter pour obtenir de plus amples informations.</p>
                </div>
       
            `
        confirmForm.innerHTML = orderSummary;
    } 
}

// Injection d'un bouton de retour vers l'accueil
const deleteLocalStorageKey =  async () => {
    
    await orderGeneralInformations();
    
    const structureHtmlBtnHome = 
    `
        <a href="index.html>
            <button type="button" id="btnHome">
                <p class="home">Retour à l'accueil</p>
            </button>
        </a>
    
    `
    confirmForm.insertAdjacentHTML("afterend", structureHtmlBtnHome)  
}

// Suppression de l'objet "products" du local storage

const functionReturnHome = async () => {

    await deleteLocalStorageKey();

    const btnHome = document.getElementById("btnHome");
    
    btnHome.addEventListener("click", (event) => {
        event.preventDefault()

        localStorage.removeItem("products");
        window.location.href = "index.html";
    })

}
functionReturnHome();

