function getAllYears() {
    allYearsHTMLContent = ``;
    fetch("/api/radio/schedule/today/").then(function (response) {
        response.json().then(function (data) {
            yearHTMLContent = `<li><a href="/archive/about/" class="">about</a></li>`;
        });
    });


    let yearListContainer = document.getElementById('year-nav-bar-list');

}

function getCurrentYear() {

}