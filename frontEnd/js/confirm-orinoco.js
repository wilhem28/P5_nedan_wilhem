// Récupération des informations reçues dans le local storage
const finalResponse = JSON.parse(localStorage.getItem("products"));
console.log(finalResponse);

// Insertion d'un message de remerciement personnalisé
const finalMsg =  async () => {

    const titleContainer = document.querySelector(".title-container");

    const thankMsg = 
            `
                <h1>Nous vous remercions pour votre commande, ${finalResponse.contact.firstName} !</h1>

            `
            titleContainer.innerHTML = thankMsg;
}

const confirmForm = document.querySelector(".form-validation");


// Récapitulatif de la commande de l'utilisateur
const orderGeneralInformations = async () => {

    await finalMsg();

    

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


}


// Retirer l'objet "products" du local storage

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


const functionReturnHome = async () => {

    await deleteLocalStorageKey();

    const btnHome = document.getElementById("btnHome");
    console.log(btnHome);
    
    btnHome.addEventListener("click", (event) => {
        event.preventDefault()

        localStorage.removeItem("products");
        window.location.href = "index.html";
    })

}
functionReturnHome();

