// --------------- UTILS VARIABLES AND CONSTANT----------------
let structureArticlesBasket = [];
let articlesSoldByOrinoco = [];
let globalDataClient = [];
let products = [];
// --------------- DISPLAY ARTICLES BASKET ----------------
const positionElement = document.getElementById("orinoco-articles-selection-container");

// Déclaration de la variable "loadProduct" qui récupère les informations du localStorage et les convertit en javascript

//  JSON.parse convertit les données au format JSON basées dans le localStorage en objet javascript

let loadProducts = JSON.parse(localStorage.getItem("products"));

// Fonction de construction de la table de l'I.D des articles
const tableProducts = () => {
          
    for( let w = 0; w < loadProducts.length; w++) {
    
        products.push(loadProducts[w].idSelectedArtcile);
    }
}
tableProducts();

// Fonction d'affichage du panier de la selection
const basketDisplay = async () => {

if(loadProducts == null || loadProducts == 0) {
    const basketEmpty = 
    `
    <div class="container-basket-empty">
        <div>Vous devez constituer votre panier d'articles</div>
    </div>
    `
    positionElement.innerHTML = basketEmpty;

} else {
    
        for(let k = 0; k < loadProducts.length; k++) {

            structureArticlesBasket += 

            `   <div class="selection">
                    <button class="btn-article-delete">SUPPRIMER</button>
                    <div class="articleName">${loadProducts[k].nameSelectedArticle}</div>
                    <div class="articleOptions">${loadProducts[k].optionSelectedArticle}</div>
                    <div class="articlePrice">${(loadProducts[k].priceSelectedArticle) * (loadProducts[k].quantitySelectedArticle)} €</div>
                    <div class="articleAmount">${loadProducts[k].quantitySelectedArticle}</div>
                </div>        
            `;
            positionElement.innerHTML = structureArticlesBasket;
        }
    }
}

// -------------------- DATA FURNITURE API ---------------------
const fetchDataFurnitureApi = async () => {

    await basketDisplay();

    const urlFurnitureApi = "http://localhost:3000/api/furniture/"; // Sélection de l'A.P.I furniture
        try {
            await fetch(urlFurnitureApi)
            .then(res => res.json())
            .then(data => articlesSoldByOrinoco = data);
        }
        catch(error) {
            alert('Un incident est survenu lors de la connexion :' + ' ' + error.message);
        } 
}

// -------------------- ACTIVE BUTTON DELETE ITEM ---------------------
let getIdSelectedArticle = [];

const functionBtnDeleteItem = async () => {

    await fetchDataFurnitureApi();

    const btnArticleDelete = document.querySelectorAll(".btn-article-delete");
   
    for ( let w = 0 ; w < btnArticleDelete.length ; w++) {
        
        btnArticleDelete[w].addEventListener("click", (event) => {
            event.preventDefault();

        // Select id selected article
        let deleteIdSelectedArticle = loadProducts[w].idSelectedArtcile;

        // Delete selected article in local storage
        loadProducts = loadProducts.filter(el => el.idSelectedArtcile !== deleteIdSelectedArticle);

        // Update local storage
        localStorage.setItem("products", JSON.stringify(loadProducts))

        // Alert
        alert("Le produit a été supprimé du panier !");
        window.location.href = "basket-orinoco.html";
        })
    }
}

// -------------------- INSERT BUTTON GLOBAL DELETE ---------------------

const insertBtnGlobalDelete = async () => {

    await functionBtnDeleteItem();

    const btnDeleteAll = 
        `
        <button class="deleteAll">VIDER LE PANIER</button>
        
        `
    ;
    positionElement.insertAdjacentHTML("beforeend", btnDeleteAll);
    
}

// -------------------- ACTIVE BUTTON GLOBAL DELETE ---------------------

const activeBtnGlobalDelete = async () => {

    await insertBtnGlobalDelete();

    const selectedBtnDeleteAll = document.querySelector(".deleteAll");
    selectedBtnDeleteAll.style.color = "black";
    
    selectedBtnDeleteAll.addEventListener("click", (event) => {

        event.preventDefault();

        if(localStorage.removeItem("products") !== null) {

            alert("Votre panier a été vidé !");
            window.location.href = "basket-orinoco.html";
        } else {
            alert("Votre panier est vide !")  
        }
        
    })
}

// -------------------- TOTAL PRICE ---------------------

let resultTotalPriceArticles = [];

const functionTotalPrice = async () => {

    await activeBtnGlobalDelete();

    let priceArticle = [];
    let totalPriceArticles = [];

    for ( let m = 0; m < loadProducts.length; m++) {

        priceArticle = loadProducts[m].priceSelectedArticle * loadProducts[m].quantitySelectedArticle;
        totalPriceArticles.push(priceArticle);

    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    resultTotalPriceArticles = totalPriceArticles.reduce(reducer);

}

// -------------------- DISPLAY TOTAL PRICE ---------------------

const functionDisplayTotalPriceArticles = async () => {

    await functionTotalPrice();

        const structureHtmlTotalPriceArticles = 
                `
                    <div class="container-total-price-article">
                        <div class= "text-total-price-article">
                            <p>Le montant total de votre sélection est de</p>
                        </div>
                        <div class="total-price-article"> ${resultTotalPriceArticles} €</div>
                    </div>
                `
        positionElement.insertAdjacentHTML("beforeend", structureHtmlTotalPriceArticles );

}

// -------------------- DISPLAY FORM ---------------------

const functionDisplayForm = async () => {

    await functionDisplayTotalPriceArticles();

    const displayForm = document.getElementById("orinoco-articles-selection-container");

    const templateForm = 
        `
        <form id= "form-validation">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label for="idUserLastName" class="userLastName">Nom</label>
                        </td>
                        <td>
                            <input type="text" name="usererLastName" id="idUserLastName">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idBuyerFirstName">Prénom</label>
                        </td>
                        <td>
                            <input type="text" name="userFirstName" id="idUserFirstName">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idEmail">E - mail</label>
                        </td>
                        <td>
                            <input type="email" name="email" id="idEmail">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idAddress">Adresse</label>
                        </td>
                        <td>
                            <textarea name="address" id="idAddress" rows="5"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idCountry">Ville</label>
                        </td>
                        <td>
                            <input type="text" name="country" id="idCountry">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button id="btnSubmit" type="submit">COMMANDER</button>
                        </td>
                    </tr>   
                </tbody>
            </table>
        </form>
        `
        displayForm.insertAdjacentHTML("afterend",templateForm);
}

// -------------------- VALID INPUT FORM ---------------------

const functionValidInputsForm = async () => {

    await functionDisplayForm();

    const formTitleContainer = document.querySelector(".title-container");
    const formValidation = document.getElementById("form-validation");
    const btnSendForm = document.getElementById("btnSubmit");

    btnSendForm.addEventListener("click", (event) => {
        event.preventDefault();

        // Création d'un objet pour répertorier les informations recueillies du user
        contact = {

            firstName: document.getElementById("idUserFirstName").value,
            lastName: document.getElementById("idUserLastName").value,
            address: document.getElementById("idAddress").value,
            city: document.getElementById("idCountry").value,
            email: document.getElementById("idEmail").value,
        }
        
        // Fonction de validation du nom patronymique, du prénom et du nom de la ville
        const validLastNameFirstNameCity = () => {

            if ((/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.lastName)) && (/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.firstName)) && (/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.city))) {
                console.log("OKAY");
                return true;
            } else {
                console.log("KO");
                return false;
            } 
        }
       
        // Fonction de validation de l'e-mail
        const validEmail = () => {

            if ((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(contact.email)) {
                console.log("OKAYYYYY");
                return true;
            } else {
                console.log("KO000");
                return false;
            } 
        }
            
        // Fonction de validation de l'adresse
        const validAddress = () => {

            if ((/^[\d\w\s]{10,40}$/).test(contact.address)) {
                console.log("Wouaw");
                return true;
            } else {
                console.log("OH NONN");
                return false;
            } 
        }
    
        // Fonction d'enregistrement dans le local storage des informations reçues du formulaire
        const loadDataForm = () => {

            if(validLastNameFirstNameCity() && validEmail() && validAddress()) {
                localStorage.setItem("valuesForm", JSON.stringify(contact));
                formTitleContainer.innerHTML = "<h1>Votre sélection de produits et votre formaulaire ont bien été enregistrés. À très bientôt !";
                formValidation.innerHTML = "";
            } else {
                formTitleContainer.innerHTML = "<h1>Les informations recueillies du formulaire n'ont pas été enregistrées !";
                formTitleContainer.style.color = "red";
            }
        }
        loadDataForm(); 
        
        // GLOBAL DATA CLIENT

        globalDataClient = {contact,products,};
        
         // FETCH POST
         
         const fetchPost = () => {
         
            fetch("http://localhost:3000/api/furniture/order", {
         
                 method: "POST",
         
                 body: JSON.stringify(globalDataClient),
         
                 headers : {
                     'Accept': 'application/json',
                     "content-Type": "application/json",
                 },
             })
             .then(response => localStorage.setItem("orderId", response))
             .catch((error) => alert('Un incident est survenu lors de la confirmation :' + ' ' + error.message));
         }
         fetchPost();
    })  
}
functionValidInputsForm();


