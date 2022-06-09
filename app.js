// Global constants
const api_key = "";
 
// Element constants
const movieFormEl = document.querySelector("movieForm");
const movieAreaEl = document.querySelector("#movieArea");

let pageNum = 0, offset = 0; 
let searchTerm = "";

// add event listener for submit button & get more button 
movieFormEl.addEventListener("submit", getResults);

function getResults(evt){
    // prevents page from re-loading
    evt.preventDefault();

    offset = 0;
    pageNum = 0;  
    searchTerm = evt.target.movieFormEl.value;
    movieAreaEl.innerHTML = ``;
  
    searchTerm = evt.target.movieFormEl.value;
    if(searchTerm == ''){
        window.alert("Please enter a search term before searching!");
    }else{
        getData(searchTerm);
    }
    
}

async function getData(searchTerm){
    offset = pageNum*limit;
    let apiUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key +"&q=" + searchTerm + "&limit="+limit+"&offset="+offset+"&rating="+rating+"&lang=en";
    
    // use the fetch method with your custom HTTP request.
    let response = await fetch(apiUrl);

    // Then convert the response to a JSON object
     let responseData = await response.json();

    // and finally return the data of the response.
    generateHTML(responseData);
}

function generateHTML(giphyData){
    //forEach way of traversing array 
    giphyData.data.forEach(function(element){ 
        giphyAreaElement.innerHTML += `
            <div id="imageContainer">
                <img src="${element.images.original.url}" alt="${element.title}" /> 
            </div>`});

    // for(var i = 0; i<limit; i++){
    //     giphyAreaElement.innerHTML += `
    //     <div id="imageContainer">
    //         <img src="${giphyData.data[i].images.original.url}" alt="${giphyData.data[i].title}" /> 
    //     </div>
    //         `;   
    // }
    getMoreBtnElement.classList.remove("hidden")
}

function showMore(){
    //increment pageNum
    pageNum++;
    
    // call the getData function with the same search term
    getData(searchTerm);
}

