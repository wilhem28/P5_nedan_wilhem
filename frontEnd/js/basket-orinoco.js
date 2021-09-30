// Variables utiles

let structureArticlesBasket = [];
let articlesSoldByOrinoco = [];
let globalDataClient = [];
let products = [];

// Affichage des articles sélectionés dans le panier

const positionElement = document.getElementById("orinoco-articles-selection-container");

// Déclaration de la variable "loadProduct" qui récupère les informations du localStorage et les convertit en javascript
//  JSON.parse convertit les données au format JSON basées dans le localStorage en objet javascript

let loadProducts = JSON.parse(localStorage.getItem("products"));

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

        for( let w = 0; w < loadProducts.length; w++) {
        
            products.push(loadProducts[w].idSelectedArtcile);
        }
    
        for(let k = 0; k < loadProducts.length; k++) {

            structureArticlesBasket += 

            `   <div class="selection">
                    <button class="btn-article-delete">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <div class="articleName">${loadProducts[k].nameSelectedArticle}</div>
                    <div class="articleOptions">${loadProducts[k].optionSelectedArticle}</div>
                    <div class="articlePrice">${(loadProducts[k].priceSelectedArticle) * (loadProducts[k].quantitySelectedArticle)} €</div>
                    <div class="articleAmount">x${loadProducts[k].quantitySelectedArticle}</div>
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

// Suppression d'un élément du panier 
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

// Insertion du bouton pour la suppression de l'ensemble des articles du panier

const insertBtnGlobalDelete = async () => {

    await functionBtnDeleteItem();

    const btnDeleteAll = 
        `
        <button class="deleteAll">VIDER LE PANIER</button>
        
        `
    ;
    positionElement.insertAdjacentHTML("beforeend", btnDeleteAll);
    
}

// Activation du bouton de suppression de l'ensemble des articles du panier

const activeBtnGlobalDelete = async () => {

    await insertBtnGlobalDelete();

    const selectedBtnDeleteAll = document.querySelector(".deleteAll");
    selectedBtnDeleteAll.style.color = "black";
    
    selectedBtnDeleteAll.addEventListener("click", (event) => {

        event.preventDefault();

        if( loadProducts !== null) {

            alert("Votre panier a été vidé !");
            localStorage.removeItem("products"),
            window.location.href = "basket-orinoco.html";

        } else {
            alert("Votre panier est vide !")  
        }
        
    })
}

// Affichage du prix total

let resultTotalPriceArticles = [];

const functionTotalPrice = async () => {

    await activeBtnGlobalDelete();

    let priceArticle = [];
    let totalPriceArticles = [];

    if(totalPriceArticles !== true && loadProducts !== null) {

        for ( let m = 0; m < loadProducts.length; m++) {

            priceArticle = loadProducts[m].priceSelectedArticle * loadProducts[m].quantitySelectedArticle;
            totalPriceArticles.push(priceArticle);
    
        }
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        resultTotalPriceArticles = totalPriceArticles.reduce(reducer);

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

    } else {

        const structureHtmlTotalPriceArticles = 
                `
                    <div class="container-total-price-article">
                        <div class= "text-total-price-article">
                            <p>Le montant total de votre sélection est de</p>
                        </div>
                        <div class="total-price-article"> 0 €</div>
                    </div>
                `
        positionElement.insertAdjacentHTML("beforeend", structureHtmlTotalPriceArticles );
    }   
}

// Affichage du formulaire

const functionDisplayForm = async () => {

    await functionTotalPrice();

    const displayForm = document.getElementById("orinoco-articles-selection-container");

    const templateForm = 
        `
        <form id= "form-validation">
            <div class="container-input-information">
                <label for="idUserLastName" class="userLastName">Nom</label>      
                <input type="text" name="usererLastName" id="idUserLastName">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <span class="errorMessage"> Attention !</span>
            </div> 
            <div class="container-input-information">          
                <label for="idBuyerFirstName">Prénom</label>
                <input type="text" name="userFirstName" id="idUserFirstName">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <span class="errorMessage"> Attention !</span>
            </div>
            <div class="container-input-information"> 
                <label for="idEmail">E - mail</label>
                <input type="email" name="email" id="idEmail">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <span class="errorMessage"> Attention !</span>
            </div>
            <div class="container-input-information"> 
                <label for="idAddress">Adresse</label>
                <input name="address" id="idAddress">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <span class="errorMessage"> Attention !</span>
            </div> 
            <div class="container-input-information"> 
                <label for="idCountry">Ville</label>
                <input type="text" name="country" id="idCountry">
                <i class="far fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <span class="errorMessage"> Attention !</span>
            </div>        
                <button id="btnSubmit" type="submit" value="order">COMMANDER</button>      
        </form>
        `
        displayForm.insertAdjacentHTML("afterend",templateForm);
}

// Validation de chaque champs du formulaire

const functionValidInputsForm = async () => {

    await functionDisplayForm();

    const formTitleContainer = document.querySelector(".title-container");
    const btnSendForm = document.getElementById("btnSubmit");
    let responseFetchPost =[];

    const getFirstName = document.getElementById("idUserFirstName");
    const getLastName = document.getElementById("idUserLastName");
    const getAddress = document.getElementById("idAddress");
    const getCity = document.getElementById("idCountry");
    const getEmail = document.getElementById("idEmail");

    btnSendForm.addEventListener("click", (event) => {

        event.preventDefault();

        //Création d'un objet pour répertorier les informations recueillies du user
        contact = {

            firstName: document.getElementById("idUserFirstName").value.trim(),
            lastName: document.getElementById("idUserLastName").value.trim(),
            address: document.getElementById("idAddress").value.trim(),
            city: document.getElementById("idCountry").value.trim(),
            email: document.getElementById("idEmail").value.trim(),
        }

        const checklastName = () => {

            if(contact.lastName === "") {
                setErrorFor(getLastName, "Le champs du nom est vide !");
                return false;
            } else if (/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.lastName) == false) {
                setErrorFor(getLastName, "Seuls les lettres sans accents sont valides !");
                return false;
            } else {
                setSuccessFor(getLastName);
                return true;
            }
        }
                 
        const checkfirstName = () => {
            if(contact.firstName === "") {
                setErrorFor(getFirstName, "Le champs du prénom est vide !");
                return false;
            } else if (/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.firstName) == false) {
                setErrorFor(getFirstName, "Seuls les lettres sans accents sont valides !");
                return false;
            } else {
                setSuccessFor(getFirstName);
                return true;
            }
        }

        const checkCity = () => {
            if(contact.city === "") {
                setErrorFor(getCity, "Le champs de la ville est vide !");
                return false;
            } else if (/^[A-Za-z][-'a-zA-Z ]{3,20}$/.test(contact.city) == false) {
                setErrorFor(getCity, "Seuls les lettres sans accents sont valides !");
                return false;
            } else {
                setSuccessFor(getCity);
                return true;
            } 
        }

        const checkEmail = () => {
            if(contact.email === "") {
                setErrorFor(getEmail, "Le champs de l'e-mail est vide !");
                return false;
            } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contact.email) == false) {
                setErrorFor(getEmail, "Exemple : cheick.antadiop@alkebulan.com !");
                return false;
            } else {
                setSuccessFor(getEmail);
                return true;
            }
        }

        const checkAddress = () => {
            if(contact.address === "") {
                setErrorFor(getAddress, "Le champs de l'adresse est vide !");
                return false;
            } else if (/^[\d\w\s]{10,40}$/.test(contact.address) == false) {
                setErrorFor(getAddress, "L'adresse doit contenir entre 10 et 40 caractères");
                return false;
            } else {
                setSuccessFor(getAddress);
                return true;
            }
        }
            
        function setErrorFor(input, message) {
            const inputParent = input.parentElement;
            const errorMsg = inputParent.querySelector(".errorMessage");

            errorMsg.innerHTML = message;
            inputParent.className = "container-input-information error";
        }

        function setSuccessFor(input) {
            const inputParent = input.parentElement;

            inputParent.className = "container-input-information success";
        }

        // Fonction d'enregistrement dans le local storage des informations reçues du formulaire
        // GLOBAL DATA CLIENT

        globalDataClient = {contact,products};

            const loadDataForm = async () => {
            
            if(checklastName() && checkfirstName() && checkEmail() && checkAddress() && checkCity() && globalDataClient.products.length !== 0) {
                localStorage.setItem("contact", JSON.stringify(contact));
                localStorage.setItem("totalPrice",JSON.stringify(resultTotalPriceArticles));
                window.location.href = "confirm-orinoco.html";

                // FETCH POST
            
             const fetchPost = async () => {
            
                await fetch("http://localhost:3000/api/furniture/order", {
            
                    method: "POST",
            
                    body: JSON.stringify(globalDataClient),
            
                    headers : {
                        'Accept': 'application/json',
                        "content-Type": "application/json",
                    },
                })
                .then(response => response.json())
                .then (data => responseFetchPost = data)
                .catch((error) => alert('Un incident est survenu lors de la confirmation :' + ' ' + error.message));

                localStorage.setItem("products", JSON.stringify(responseFetchPost)); 
            }
            fetchPost();

            } else {
                // formTitleContainer.innerHTML = "<h1>Le formulaire est incomplet !";
                formTitleContainer.style.color = "red";
            }
        }
        loadDataForm();  
    })     
}
functionValidInputsForm();
