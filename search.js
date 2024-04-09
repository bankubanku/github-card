function appendImg(mainSection, src, alt, id) {
    const pfp = document.createElement("img");
    pfp.src = src; 
    pfp.alt = alt;
    pfp.id = id;
    mainSection.appendChild(pfp);
}

function appendInfo(mainSection, tag, content, id) {
    const name = document.createElement(tag);
    const textNode = document.createTextNode(content);
    name.id = id
    name.appendChild(textNode);
    mainSection.appendChild(name);
}


function displayData(userData) {
    const chosenData = [
        "login", 
        "repos_url", 
        "company", 
        "location", 
        "bio", 
        "email", 
        "public_repos", 
        "followers", 
        "following", 
        "created_at"
    ];
    
    const mainSection = document.getElementsByTagName("main")[0];

    appendImg(mainSection, userData.avatar_url, "profile picture", "pfp");
    appendInfo(mainSection, "h1", userData.name, "name");
}


async function getData(event) {
    event.preventDefault(); // prevents from reloading the page
    
    const user = document.getElementById("search-input").value
    const response = await fetch(`https://api.github.com/users/${user}`);
    const userData = await response.json();

    // document.getElementById("data").innerHTML = JSON.stringify(userData);
    displayData(userData);
}
