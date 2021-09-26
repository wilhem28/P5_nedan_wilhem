// Initialisation de variables utiles
let DataUrlSelectedArticle = [];
let idValueSelectedArticle = [];
let dataSelectedArticle = [];

// Constantes utiles pour la récupération d'éléments du D.O.M
const titleContainer = document.querySelector('.title-container');

//Fonction de récupération de l'information relative à l'article sélectionné par l'utilisateur 
// La propriété SEARCH de l'interface LOCATION récupère l'élément '?' et les paramètres suivants de l'url
const getDataUrlSelectedArticle = async () => {

    DataUrlSelectedArticle = window.location.search;
    
    if(DataUrlSelectedArticle !== null) {  
        titleContainer.innerHTML = "<h1>VOTRE CHOIX</h1>";
    } else {
        titleContainer.innerHTML = "<h1>Votre choix n'a pas été pris en compte ! Veuillez retourner à la page d'accueil.</h1>";
    }
}

// Fonction de récupération de la valeur de l'id transmise par l'url de la page products_orinoco.html?id=5be9cc611c9d440000c1421e

const getIdValueSelectedArticle = async () => {

    await getDataUrlSelectedArticle();

    const urlSearchParams = new URLSearchParams(DataUrlSelectedArticle);
    idValueSelectedArticle = urlSearchParams.get('id');
}

// Fonction de récupération des informations de l'article sélectionné 

const getDataSelectedArticle = async () => {

    await getIdValueSelectedArticle();

    const urlFurnitureApi = "http://localhost:3000/api/furniture/";

    try {
        await fetch(urlFurnitureApi + `${idValueSelectedArticle}`)
        .then(response => response.json())
        .then(data => dataSelectedArticle = data);

    } catch {  
        titleContainer.innerHTML = "<p>VOTRE SÉLECTION N'EST PAS DISPONIBLE</p>"
    } 
}

// Fonction d'établissement dynamique de la structure html de l'article sélcetionné par l'utilisateur

const structureFunctionSelectedArticle = async () => {
    
    await getDataSelectedArticle();

    structureSelectedArticle = 
    `
        <div class="selected-article">
            <figure class="selected-article-figure">
                <figcaption class="container-name-article"><h2>${dataSelectedArticle.name}</h2></figcaption>
                <div class="container-image">
                    <img class="selected-article-image-b" src="${dataSelectedArticle.imageUrl}"/>
                </div>
            </figure>
            <div class="selected-article-informations-container">
                <p class="container-description">${dataSelectedArticle.description}</p>
                <div class="container-price">${dataSelectedArticle.price / 100} €</div>
                <div id="container-input">
                    <span class="minusAmountSelectedArticle">
                        <i class="fas fa-minus"></i>
                    </span>
                    <span class="amountSelectedArticle">1</span>
                    <span class="plusAmountSelectedArticle">
                        <i class="fas fa-plus"></i>
                    </span>
                </div>
                <form id="idForm">
                    <div class="container-option-product">
                        <label for="idOptionsSelectedArticle">OPTIONS</label>
                        <select name="optionsSelectedArticle" id="idOptionsSelectedArticle"></select>
                    </div>
                    <button type="submit" id="id-btn-send" name="btn-send">Mettre dans mon panier</button>
                </form>
            </div>
        </div>
    `
    ;  
}

// Fonction d'affichage dynamique des options de l'article sélectionné 

const displayCharacteristicsSelectedArticle = async () => {

    await structureFunctionSelectedArticle();

    const availableArticleContainer = document.getElementById("available-article-container");

    (dataSelectedArticle !== null) ? (availableArticleContainer.innerHTML = structureSelectedArticle) : alert("Les informations de votre sélection ne sont pas disponibles !");
    }
  
// Fonction d'affichage dynamique des options de l'article sélectionné par l'utilisateur
const display0ptionsSelectedArticle = async () => {
    
    await displayCharacteristicsSelectedArticle();

    const userOptionschoice = dataSelectedArticle.varnish;
    const containerOptionsSelectedArticle = document.getElementById("idOptionsSelectedArticle");

    let structureHtmlOptions = [];
    
    if(userOptionschoice == null) {

        structureHtmlOptions = 
            `
                <option value="aucune-option">Aucune option</option>
            `
            ; 
        containerOptionsSelectedArticle.innerHTML = structureHtmlOptions;

    } else {

        for(let j = 0; j < userOptionschoice.length; j++) {
      
            structureHtmlOptions += 
               `
                   <option value="${userOptionschoice[j]}">${userOptionschoice[j]}</option>
               `
               ; 
       }
       containerOptionsSelectedArticle.innerHTML = structureHtmlOptions;
    }
}

// Fonction d'enregistrement dans le local storage

const functionBtnLoadSelectedArticle = async () => {

    await display0ptionsSelectedArticle();

    const btnLoadSelectedArticle = document.getElementById("id-btn-send");
    
    const containerOptionsSelectedArticle = document.getElementById("idOptionsSelectedArticle");

    btnLoadSelectedArticle.addEventListener("click", (event) => {

        event.preventDefault();

        let dataOptionsSelectedArticle = {

            descriptionSelectedArticle: dataSelectedArticle.description,
            imageUrlSelectedArticle: dataSelectedArticle.imageUrl,
            nameSelectedArticle: dataSelectedArticle.name,
            optionSelectedArticle: containerOptionsSelectedArticle.value,
            priceSelectedArticle: dataSelectedArticle.price / 100,
            quantitySelectedArticle: 1,
        }
    
        // Fonction d'accompagement l'utilsateur

        const helpUser = () => {
            if(window.confirm(`L'article ${dataSelectedArticle.name} avec l'option : ${containerOptionsSelectedArticle.value} a bien été ajouté au panier. Pour consulter le panier appuyer sur OK ou sur ANNULER pour revenir à l'accueil `)) {
                window.location.href = "basket-orinoco.html";
            }
            else {
                window.location = "index.html";
            }
        }
        helpUser();

        // Vérifier l'existence d'une clé "products"
        let loadedArticleLocalStorage = JSON.parse(localStorage.getItem("orinocoSelection"));
        
        if(loadedArticleLocalStorage) {
            loadedArticleLocalStorage.push(dataOptionsSelectedArticle);
            localStorage.setItem("orinocoSelection", JSON.stringify(loadedArticleLocalStorage)); 
    
        } else {
            newLoadedArticleLocalStorage = [];
            newLoadedArticleLocalStorage.push(dataOptionsSelectedArticle);
            localStorage.setItem("orinocoSelection", JSON.stringify(newLoadedArticleLocalStorage));
        }
    })
}
functionBtnLoadSelectedArticle();


