// --------------- UTILS VARIABLES AND CONSTANT----------------
let structureProduitPanier = [];


// --------------- DISPLAY ARTICLES BASKET ----------------
const positionElement = document.getElementById("resum-container");

const basketDisplay = async () => {

// Déclaration de la variable "loadProduct" qui récupère les informations du localStorage et les convertit en javascript
let loadProducts = JSON.parse(localStorage.getItem("product"));
//  JSON.parse convertit les données au format JSON basées dans le localStorage en objet javascript

if(loadProducts === null) {
    const panierVide = 
    `
    <div class="container-basket-empty">
        <div>Vous devez constituer votre panier d'articles</div>
    </div>
    `
    positionElement.innerHTML = panierVide;

} else {
    
        for(let k = 0; k < loadProducts.length; k++) {
            structureProduitPanier += 

            `   <div class="selection">
                    <button class="btn-delete">SUPPRIMER</button>
                    <div class="articleName">${loadProducts[k].nomProduit}</div>
                    <div class="articleOptions">${loadProducts[k].optionProduit}</div>
                    <div class="articlePrice">${loadProducts[k].prix * loadProducts[k].quantite} €</div>
                </div>
                
            `;

            positionElement.innerHTML = structureProduitPanier;
        }
    }
}

// -------------------- INSERT BUTTON GLOBAL DELETE ---------------------

const insertBtnGlobalDelete = async () => {

    await basketDisplay();

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

        if(localStorage.removeItem("product") !== null) {

            alert("Votre panier a été vidé !");
            window.location.href = "basket_orinoco.html";
        } else {
            alert("Votre panier est vide !")
        }
        
    })
}
activeBtnGlobalDelete();



    
    


