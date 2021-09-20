//GET KEY LOCALSTORAGE
let loadProducts = JSON.parse(localStorage.getItem("product"));

//UTILS VARIABLES
let products = [];
let globalDataClient = [];
let contact = [];

// BUILDING TABLE ID ARTICLES
    
const productsId = async () => {
          
    for( let w = 0; w <loadProducts.length; w++) {
    
        products.push(loadProducts[w].idSelectedProduct);
    }
}

//BUILDING FORM
const placeForm = document.getElementById("form_validation");

// DISPLAY FORM
const formDisplay = async () => {

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
                            <label for="idaddress">adresse :</label>
                        </td>
                        <td>
                            <textarea name="address" id="idaddress" rows="5"></textarea>
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
    placeForm.innerHTML = templateForm;
 
};

// LOAD DATA CLIENT
const loadDataClient = async () => {
    await formDisplay();

    const btnSendForm = document.getElementById("btnSubmit");
    const informationName = document.querySelector(".informationName");
    
    
    btnSendForm.addEventListener("click", (e) => {

        e.preventDefault();
    
        // GET VALUES FORM

        contact = {
            firstName: document.getElementById("idBuyerFirstName").value,
            lastName: document.getElementById("idBuyerLastName").value,
            address: document.getElementById("idaddress").value,
            city: document.getElementById("idCountry").value,
            email: document.getElementById("idEmail").value,
        };

        contact.toString();
        
        // UTILS FUNCTIONS
        const textInput = (value) => {
            return `${value} : Les chiffres et les symboles ne sont pas autorisés. Le nombre de caractères du prénom est compris entre 3 et 20.`;
        };
        const textRegex = (value) => {
           return /^[A-Za-z,.'-ÉÈéèàâä\s]{3,20}$/.test(value);
        }
        const emailRegex = (value) => {
           return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        };
        const addressRegex = (value) => {
           return /^[\d\w\s]{10,40}$/.test(value);
        };

        // CHECK VALUES FORM

        // LastName
        const controlLastName = () => {

            if(textRegex(contact.lastName)) {
                informationName.textContent = "";
                return true;
                
            } else {
                alert(textInput("Nom"));
                informationName.textContent = "Veuillez remplir ce champs !";
                informationName.style.color = " red";
                return false; 
            }
        };

        // FirstName
        const controlFirstName = () => {
              
            if(textRegex(contact.firstName)) {
                return true;
            } else {
                alert(textInput("Prénom"));
                return false;
            }
        };
       
        // Country
        const controlCity = () => {

            if(textRegex(contact.city)) {
                return true;
            } else {
                alert(textInput("Ville"));
                return false;
            }
        };

        // Email
        const controlEmail = () => {

            if(emailRegex(contact.email)) {
                return true;
            } else {
                alert("L'email doit être au bon format.");
                return false;
            }
        };
        // address
        const controladdress = () => {

            if(addressRegex(contact.address)) {
                return true;
            } else {
                alert("Veillez à bien écrire votre addresse");
                return false;
            }
        };
        
       
        // INSERT VALUES FORM IN LOCAL STORAGE 
        (controlFirstName() && controlLastName() && controlCity() && controlEmail() && controlEmail() && controladdress()) ? localStorage.setItem("valuesForm", JSON.stringify(contact)) : alert("L'enregistrement de vos informations n'a pas pu être réalisé. Veuillez essayer de nouveau !");
    
        // GLOBAL DATA CLIENT

        globalDataClient = {

           contact,
           products,
        };
        
        // FETCH POST
        
        const fetchPost = async () => {
        
            await productsId();
            await fetch("http://localhost:3000/api/furniture/order", {
        
                method: "POST",
        
                body: JSON.stringify(globalDataClient),
        
                headers : {
                    'Accept': 'application/json',
                    "content-Type": "application/json",
                },
            }).catch((error) => alert('Un incident est survenu lors de la confirmation :' + ' ' + error.message));
        }
        fetchPost();
    })
}
loadDataClient();





