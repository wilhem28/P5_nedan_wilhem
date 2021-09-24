// Initialisation de variables utiles

// let articlesSoldByOrinoco = [];
let availablesArticlesHtmlStructure = [];

// Sélection de certaines éléments du D.O.M placés dans des constantes
const availablesArticlesContainer = document.getElementById("availables-articles-container");
const indexTitleContainer = document.querySelector(".title-container");

// Fonction de récupération de l'ensemble des informations de chaque article disponible dans l'A.P.I avec les mots clés ASYNC & AWAIT
// Les informations des articles préalablement observées avec l'usage du CONSOLE.LOG, sont placées à l'intérieur d'un tableau []
// Nous obeservons un tableau contenant 5 objets ((5) & length: 5) avec les informations suivantes pour chaque objet (article) :
// ---- La description (description)
// ---- L'url de l'image (imageUrl)
// ---- Le nom (name)
// ---- Le prix (price)
// ---- Les différents vernis disponibles (varnish)

// En cas d'incident, une pop-up est affiché
const fetchDataFurnitureApi = async () => {

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
   
// Fonction d'itération relative à la construction du modèle de présenation des articles
// La boucle FOR permet de répertorier dynamiquement la totalité des articles présents
const iterationAvaiblesArticles = async () => {

    await fetchDataFurnitureApi();

    if (articlesSoldByOrinoco !== null) {

    for (let i = 0; i < articlesSoldByOrinoco.length; i++) {

            availablesArticlesHtmlStructure +=
            `
                <a href="products_orinoco.html?id=${articlesSoldByOrinoco[i]._id}">
                    <div class="articles-list-article">
                        <figure class="articles-list-article-figure">
                            <div class="articles-list-article-container-image">
                                <img class="articles-list-article-image" src=${articlesSoldByOrinoco[i].imageUrl} alt="">
                            </div>
                            <div class="articles-list-article-container-name-product">
                                <figcaption class="articles-list-article-title">${articlesSoldByOrinoco[i].name}</figcaption>
                            </div>
                            <div class="articles-list-article-container-price">
                                <p>${articlesSoldByOrinoco[i].price / 100} €</p>
                            </div>
                            <div class="articles-list-article-container-b">
                                <div class="articles-list-article-b" type="submit"><i class="far fa-eye"></i></i></div>
                            </div>
                        </figure> 
                    </div>
                </a>
         `
    } 
    }else {
        alert('Vos articles ne peuvent pas être affcihés ! Veuillez tenter une nouevlle connexion.');   
    }
};

// Fonction d'affichage de l'ensemble des articles
// En cas d'absence, d'élément dans le tableau availablesArticlesHtmlStructure, un message est injecté dans le container du titre de la page index.html
const articlesDisplay = async () => {

    await iterationAvaiblesArticles();

    availablesArticlesHtmlStructure !== null ? availablesArticlesContainer.innerHTML = availablesArticlesHtmlStructure : indexTitleContainer.innerHTML = "<h1>Rafraîssissez la page pour afficher vos produits !</h1>";
       
}
articlesDisplay();
