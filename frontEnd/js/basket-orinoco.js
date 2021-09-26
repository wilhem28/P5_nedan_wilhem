// --------------- UTILS VARIABLES AND CONSTANT----------------
let structureArticlesBasket = [];

// --------------- DISPLAY ARTICLES BASKET ----------------
const positionElement = document.getElementById("orinoco-articles-selection-container");

// Déclaration de la variable "loadProduct" qui récupère les informations du localStorage et les convertit en javascript

//  JSON.parse convertit les données au format JSON basées dans le localStorage en objet javascript

let loadProducts = JSON.parse(localStorage.getItem("orinocoSelection"));

const basketDisplay = async () => {

if(loadProducts == null) {
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
                    <div class="articlePrice">${loadProducts[k].priceSelectedArticle * loadProducts[k].quantitySelectedArticle} €</div>
                </div>        
            `;
            positionElement.innerHTML = structureArticlesBasket;
        }
    }
}

// -------------------- ACTIVE BUTTON DELETE ITEM ---------------------

const functionBtnDeleteItem = async () => {

    await basketDisplay();

    const btnArticleDelete = document.querySelectorAll(".btn-article-delete");


    for ( let w = 0 ; w < btnArticleDelete.length ; w++) {
        
        btnArticleDelete[w].addEventListener("click", (event) => {
            event.preventDefault();

        
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
    selectedBtnDeleteAll.style.color = "red";
    
    selectedBtnDeleteAll.addEventListener("click", (event) => {

        event.preventDefault();

        if(localStorage.removeItem("orinocoSelection") !== null) {

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

        priceArticle = loadProducts[m].priceSelectedArticle;
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
                    <div class="total-Price-Article">Le montant total de votre sélection est de ${resultTotalPriceArticles} €</div>

                `
        positionElement.insertAdjacentHTML("beforeend", structureHtmlTotalPriceArticles );

}

// -------------------- DISPLAY FORM ---------------------

const functionDisplayForm = async () => {


    await functionDisplayTotalPriceArticles();

    const displayForm = document.getElementById("orinoco-articles-selection-container");

    const templateForm = 
        `
        <table>
                <tbody>
                    <tr>
                        <td>
                            <label for="idBuyerLastName" class="labelLastName">Nom :</label>
                            <div class="informationName"><div>
                        </td>
                        <td>
                            <input type="text" name="buyerLastName" id="idBuyerLastName">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idBuyerFirstName">Prénom :</label>
                        </td>
                        <td>
                            <input type="text" name="buyerFirstName" id="idBuyerFirstName">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idEmail">E - mail :</label>
                        </td>
                        <td>
                            <input type="email" name="email" id="idEmail">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idAddress">Adresse :</label>
                        </td>
                        <td>
                            <textarea name="address" id="idAddress" rows="5"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label for="idCountry">Ville :</label>
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
        
        `
        displayForm.insertAdjacentHTML("afterend",templateForm);


}

functionDisplayForm();

