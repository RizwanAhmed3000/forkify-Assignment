const itemListContainer = document.querySelector('.left')
const searchBar = document.querySelector('.searchBar')
const searchBtn = document.querySelector('.searchBtn')
const productDetail = document.querySelector('.productDetail')


async function fetchRecipeList(value) {
    try {
        const fetchData = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${value}`);
        if (fetchData.status == 'fail') {
            throw new Error(`${fetchData.message}`)
        }
        const respInJson = await fetchData.json()
        console.log(respInJson)
        if(respInJson.result == 0){
            throw new Error(`result not found`)
        } else{
            mappingData(respInJson.data.recipes)
        }

    } catch (error) {
        console.error(error)
        productDetail.innerHTML == error
    }
}

function mappingData(data) {
    console.log(data)
    const dataIntoUi = data.map((item) => {
        const list = ` <div class="foodList d-flex mb-4 py-3 px-2" onclick="getData('${item.id}')">
        <div class="image me-4">
            <img class="rounded-circle" src=${item.image_url} alt="image here" width="72px">
        </div>
        <div class="text">
            <h5 id="heading">${item.title}</h5>
            <p>${item.publisher}</p>
        </div> 
    </div>`
        return list
    })

    itemListContainer.innerHTML = dataIntoUi
}

function singleItemDataInUi(data) {
    const productObjPath = data.data.recipe
    const product = `<div class="card mb-3" style="background-color: beige; border: none;">
    <div class="img">
        <img src=${productObjPath.image_url}
            class="card-img-top image-fit" alt="Recipe Image">
    </div>
    <div class="card-body d-flex flex-column align-items-center">
        <h1 class="card-title text-center recipeName">${productObjPath.title}</h1>
        <div class="container d-flex justify-content-center info">
            <div class="d-flex me-auto justify-content-center align-items-center">
                <p id="timeToCook"><i class="fa-regular fa-clock me-2"></i>${productObjPath.cooking_time} minutes</p>
                <p id="servings"><i class="fa-solid fa-user-group me-2"></i>${productObjPath.servings} servings</p>
            </div>
            <p id="bookmark"><i class="fa-solid fa-bookmark rounded-circle p-3 fs-5" style="color: #ffffff;"></i></p>
        </div>
    </div>
</div>

<div class="card ingredientCard mb-3" style="width: 100%; height: 400px; background-color: beige; border: none;">
                    <div class="card-body d-flex flex-column flex-wrap">
                        <h4 class="card-title text-center my-4 recipeIng">Recipe Ingredients</h4>
                        <div id="ingredientsList" class="d-flex flex-column flex-wrap">
                            ${ingredients(productObjPath.ingredients)}
                        </div>
                    </div>
                </div>

<div class="card mb-3" style="background-color: beige; border: none;">
    <div class="card-body">
        <h4 class="card-title text-center my-4 howToCook">How To Cook It</h4>
        <p class="card-text text-center">
            The source URL for the recipe is: 
            
            <a href=${productObjPath.source_url}>${productObjPath.source_url}</a>.
        </p>
        
    </div>
</div>`

    productDetail.innerHTML = product;

}

function ingredients(ingredients) {
    const dataToUi = ingredients.map((obj) => {
        const list = `<div class="items d-flex align-items-baseline p-2">
                    <i class="fa-solid fa-check me-2"></i>
                    <p class="text-break">${obj.quantity} ${obj.unit} ${obj.description}</p>
                </div>`

        return list
    })
    return dataToUi
}

function filteringData() {
    const searchItem = searchBar.value;
    fetchRecipeList(searchItem);
    searchBar.value = "";
}

async function getData(id) {
    try {
        const fetchData = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        console.log(fetchData)
        const dataInJson = await fetchData.json();
        console.log(dataInJson)
        singleItemDataInUi(dataInJson)
    } catch (error) {
        console.error(error)
    }
}

searchBtn.addEventListener('click', filteringData)