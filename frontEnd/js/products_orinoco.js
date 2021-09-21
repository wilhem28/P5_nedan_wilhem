// --------------- UTILS VARIABLES & CONSTANT----------------
let url = "http://localhost:3000/api/furniture";
let dataArticles = [];
let urlId = [];
let id = [];
let idSelectedArticle =[];
let urlSearchParams = [];
let structureOptions = [];

const lessArt = document.querySelector(".lessArticle");
const productTitleContainer = document.querySelector(".title-container");


// -------------------- GET ARTICLES DATA ---------------------
const fetchData = async () => 
    await fetch(url)
        .then(res => res.json())
        .then(data => dataArticles = data)
        .catch((error) => alert('Un incident est survenu lors de la connexion :' + ' ' + error.message));

// -------------------- GET URL INFORMATION ---------------------
const catchUrl = async () => urlId = window.location.search;

// -------------------- GET SELECTED ARTICLE ID ---------------------
const catchIdSelectedArticle = async () => {

    await fetchData();
    await catchUrl();
    const urlSearchParams = new URLSearchParams(urlId);

    (id = urlSearchParams.get("id")) !== null ? productTitleContainer.innerHTML = "<h1>VOTRE SÉLECTION</h1>" : productTitleContainer.innerHTML ="<h1>Votre sélection n'a pas été enregistréé</h1>";   
}

// -------------------- GET SELECTED ARTICLE ID INTO API ---------------------
const matchIdSelectedArticle = async () => {

    await catchIdSelectedArticle();

    (idSelectedArticle = dataArticles.find((element) => element._id === id)) == false ? console.log("KO") : console.log("OK");
}

// -------------------- DYNAMIC HTML BUILDING OF SELECTED ARTICLE ---------------------
const buildHtmlProduct = async () => {
    
    structureSelectedArticle = 
    `
        <div class="selected-article">
            <figure class="selected-article-figure">
                <figcaption class="container-name-product"><h2>${idSelectedArticle.name}</h2></figcaption>
                <div class="container-image">
                    <img class="selected-article-image-b" src="${idSelectedArticle.imageUrl}"/>
                </div>
            </figure>
            <div class="selected-article-informations-container">
                <p class="container-description">${idSelectedArticle.description}</p>
                <div class="container-price">${idSelectedArticle.price / 100} €</div>
                <div id="container-input">
                    <input type="button" value="-" class="lessArticle">
                    <span class="articleCount">1</span>
                    <input type="button" value="+" class="moreArticle">
                </div>
                <form id="idForm">
                    <div class="container-option-product">
                        <label for="id_option_produit">OPTIONS</label>
                        <select name="option_produit" id="id_option_produit"></select>
                    </div>
                    <button type="submit" id="id-btn-send" name="btn-send">Mettre dans mon panier</button>
                </form>
            </div>
        </div>
    `
    ;  

}

// -------------------- DYNAMIC DISPLAY OF THE SELECTED ARTICLE ---------------------
const displaySelectedArticle = async () => {

    await matchIdSelectedArticle();
    await buildHtmlProduct();

    const injectedHtmlSelectedArticle = document.getElementById("selected-article-container"); 

    injectedHtmlSelectedArticle.innerHTML = structureSelectedArticle;
}

// -------------------- DYNAMIC DISPLAY OF THE SELECTED ARTICLE OPTIONS ---------------------
const optionsSelectedArticle = async () => {
    
    await displaySelectedArticle();
    more();
    less();

    const choice = idSelectedArticle.varnish;
    const optionsSelect = document.getElementById("id_option_produit");

    
    for(let j = 0; j < choice.length; j++) {
      
        structureOptions += 
            `
                <option value="${choice[j]}">${choice[j]}</option>
        
            `
            ; 
    }
    optionsSelect.innerHTML = structureOptions;
}

let articleCount = 1;
// -------------------- DYNAMIC DISPLAY OF SELECTED ARTICLE INCREASING COUNT ---------------------
const more = () => {

    const moreArt = document.querySelector(".moreArticle");
    const count = document.querySelector(".articleCount");

    moreArt.addEventListener("click", (event) => {

        event.preventDefault();
        articleCount++;
        // console.log(articleCount);
        count.innerHTML = ` ${articleCount}`;           
    })
    
}

// -------------------- DYNAMIC DISPLAY OF SELECTED ARTICLE DECREASING COUNT ---------------------
const less = () => {
 
    const lessArticle = document.querySelector(".lessArticle");
    const count = document.querySelector(".articleCount");

    lessArticle.addEventListener("click", (event) => {

        event.preventDefault();
        if (articleCount > 1) {
            articleCount--;
            count.innerHTML = ` ${articleCount}`;
        } 
    })
}

// -------------------- REGISTRATION IN THE LOCALSTORAGE AND ORDER CONFIRMATION ---------------------
const btnConfirm = async () => {

    await optionsSelectedArticle();

    const idForm = document.getElementById("id_option_produit");
    const id_btn_send = document.getElementById("id-btn-send");
    const choiceForm = idForm.value;
    
    id_btn_send.addEventListener("click", (event) => {

        event.preventDefault();

        let articleCharacteristics = 
        {
            nomProduit: idSelectedArticle.name,
            idSelectedProduct: idSelectedArticle._id,
            optionProduit: choiceForm,
            quantite: articleCount,
            prix: idSelectedArticle.price / 100,
        };

        const confirmMsg = () => {

            if (window.confirm(`${idSelectedArticle.name} avec l'option: ${choiceForm} a été ajouté à votre panier. Pour consulter le panier cliquez sur OK ou sur ANNULER pour retourner à l'acceuil.`)) 
            window.location.href = "basket_orinoco.html";
                else {
                      window.location.href = "index.html";
                    }
        }

        //----------------------- LOCALSTORAGE ----------------------------
        // Vérification de l'existence d'une clé "product" dans le localStorage préalablement convertit en javascript (parse)
        let loadProduct = JSON.parse(localStorage.getItem("product"));
       
        // Condition d'existence ou non de la clé "product"

        const createKeyLocalStorage = () => {
            loadProduct.push(articleCharacteristics);
            window.localStorage.setItem("product", JSON.stringify(loadProduct));
        } 

        if (loadProduct) {
            createKeyLocalStorage();
            confirmMsg();
        } else {
            loadProduct = [];
            createKeyLocalStorage();
            confirmMsg();
        }   
    })
}
btnConfirm();
    


 
  








  
  