const accessKey = "xAOJpJ56NdlYWWcSNfPZlqU6oDnW5jXmSShRCq7bHHc";
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more');

let keyword = "";
let page = 1;

async function searchImage(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    // this will clear pre result if we search for another keyword
    if(page === 1){
        searchResult.innerHTML = "";
    }
     
    const results = data.results;
    results.map((result) =>{
        // this will create an element img
        const image = document.createElement('img');
        //fetching images from unsplash
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        // it will add a link in image that wll redirect to unplash
        imageLink.href = result.links.html; 
        imageLink.target = '_blank';

        // image will be inside a tag
        imageLink.appendChild(image);

        searchResult.appendChild(imageLink);
    })
    showMore.style.display = "block";
    
}
searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    page = 1;
    searchImage();

    // Clear the search input field
    // searchBox.value = ""; 
})
showMore.addEventListener("click", () =>{
    page++;
    searchImage();
})