const itemListContainer = document.querySelector('.left')
const searchBar = document.querySelector('.searchBar')
const searchBtn = document.querySelector('.searchBtn')


function fetchRecipeList(value) {
    const fetchData = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${value}`);
    fetchData
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            mappingData(data.data.recipes)
        })
}

function mappingData(data) {
    console.log(data)
    const dataIntoUi = data.map((item) => {
        const list = ` <div class="foodList d-flex mb-4 py-3 px-2" onclick="getData('${item.id}')">
        <div class="image me-4">
            <img src=${item.image_url} alt="hi" width="90px">
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

function filteringData(){
    const searchItem = searchBar.value;
    fetchRecipeList(searchItem);
    searchBar.value = "";
}

function getData(id){
    const fetchData = fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    fetchData
        .then((response) => response.json())
        .then((data)=>{
            console.log(data)
        })
}

searchBtn.addEventListener('click', filteringData)