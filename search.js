async function getData(event) {
    event.preventDefault(); // prevents from reloading the page
    
    const user = document.getElementById("search-input").value
    const response = await fetch(`https://api.github.com/users/${user}`);
    const userData = await response.json();

    document.getElementById("data").innerHTML = JSON.stringify(userData);
}
