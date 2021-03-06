const errorMessage = document.getElementById("errors");
// search part
const getSearchValue = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    // if empty search / searchText null
    if (searchText === "") {
        errorMessage.innerText = "please write a book name!!"
    };
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getBookData(data));
};
// search data load part
const getBookData = data => {
    // when unexpected word use by search set error 
    if (data.numFound === 0) {
        errorMessage.innerText = 'no result found';
    }
    else {
        errorMessage.innerText = "";
    };
    const details = data.docs.slice(0, 25);
    const divContainer = document.getElementById("div-container");
    divContainer.textContent = "";
    details.forEach(detail => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card h-80">
        <img h-50 src="https://covers.openlibrary.org/b/id/${detail.cover_i ? detail.cover_i : ""}-L.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title"><span class="text-primary">Book Name</span>: ${detail.title ? detail.title : "name not found"}</h5>
          <h5><span class="text-primary">Author Name</span>:${detail.author_name ? detail.author_name : "author name missing"}</h5>
          <h5><span class="text-primary">Publisher</span>:${detail.publisher.slice(0, 3)}</h5>
          
        </div>
        <div class="card-footer">
          <h5 class="text-muted">First-publish-year: ${detail.first_publish_year ? detail.first_publish_year : "not found"}</h5>
        </div>
      </div>`;
        divContainer.appendChild(div);

    });

};