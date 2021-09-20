//index.html
// (function() {

// -------------------- UTILS VARIABLES ---------------------
let url = "http://localhost:3000/api/furniture";
let nameProduct = [];
let articleStructure = [];
const selectedArticlesContainer = document.getElementById("selected-articles-container");

// -------------------- GET ARTICLES DATA ---------------------
const fetchData = async () => 
    await fetch(url)
        .then(res => res.json())
        .then(data => nameProduct = data)
        .catch((error) => alert('Un incident est survenu lors de la connexion :' + ' ' + error.message));

// -------------------- BUILD HTML LAYOUT ---------------------
const buildHtmlIndex = async () => {
    await fetchData();

    for (let i = 0; i < nameProduct.length; i++) {

        articleStructure +=
            `
                <a href="products_orinoco.html?id=${nameProduct[i]._id}">
                    <div class="articles-list-article">
                        <figure class="articles-list-article-figure">
                            <div class="articles-list-article-container-image">
                                <img class="articles-list-article-image" src=${nameProduct[i].imageUrl} alt="">
                            </div>
                            <div class="articles-list-article-container-name-product">
                                <figcaption class="articles-list-article-title">${nameProduct[i].name}</figcaption>
                            </div>
                            <div class="articles-list-article-container-price">
                                <p>${nameProduct[i].price / 100} €</p>
                            </div>
                            <div class="articles-list-article-container-b">
                                <div class="articles-list-article-b" type="submit"><i class="far fa-eye"></i></i></div>
                            </div>
                        </figure> 
                    </div>
                </a>
            `

    }
}

// -------------------- DISPLAY ALL ARTICLES ---------------------
const articlesDisplay = async () => {
    await fetchData();
    await buildHtmlIndex();
    
    selectedArticlesContainer.innerHTML = articleStructure;

}
articlesDisplay();

// })();


