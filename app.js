(async () => {
    let myResponse = await fetch("./recipes.json");
    let myData = await myResponse.json();
    let myInput = document.getElementById("nav-input");
    let myBtn = document.getElementById("nav-btn");
    let recipeList = document.getElementById("recipe-list");
    let recipeDetail = document.getElementById("recipe");
    const mySearch = () => {
        let myQuery = myInput.value.toLowerCase();
        let myFetch = myData.filter((element) => {
            return element.title.toLowerCase().includes(myQuery) || element.ingredients.join(" ").toLowerCase().includes(myQuery);
        });
        myResult(myFetch);
    }
    myBtn.addEventListener("click",mySearch);
    const myResult = (myFetch) => {
        recipeList.innerHTML = ``;
        myFetch.forEach(element => {
            let creList = document.createElement("li");
            creList.innerHTML = `<h2 class="title">${element.title}</h2>  
            <p class="description">${element.description}</p> `;
            creList.addEventListener("click",fetchDetail(element));
            recipeList.appendChild(creList);
        });
    };
    const fetchDetail = (details) => {
        recipeDetail.innerHTML = `
        <h1 class="title">Author Name : ${details.author}</h1>
        <h2 class="title">${details.title}</h2>
        <h3 class="ins">Ingredients:</h3>
        <img src="${details.url}" alt="reciepeImage">
        <ul>${details.ingredients.map((element) => {
            return "<li>" + element + "</li>";
        }).join("")}</ul>
        <h3 class="ins">Instruction</h3>
                <p>${details.instructions}</p>
        `;
    }
})();