function appendImg(section, src, alt, id) {
    const pfp = document.createElement("img");
    pfp.src = src; 
    pfp.alt = alt;
    pfp.id = id;
    section.appendChild(pfp);
}

function appendInfo(section, tag, content, id) {
    const name = document.createElement(tag);
    const textNode = document.createTextNode(content);
    name.id = id
    name.appendChild(textNode);
    section.appendChild(name);
}

function createMainInfoSection(userData, mainSection) {
    const mainInfo = document.createElement("div");

    mainInfo.id = "main-info";
    mainSection.appendChild(mainInfo);

    appendImg(mainInfo, userData.avatar_url, "profile picture", "pfp");
    appendInfo(mainInfo, "h1", userData.name, "name");
    appendInfo(mainInfo, "h2", userData.login, "login");
    appendInfo(mainInfo, "P", userData.bio, "bio");
}


function createUserInfoSection(userData, mainSection) {
    const userInfo = document.createElement("div");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var createdAtDate = new Date(userData.created_at); 
    createdAtDate = `${months[createdAtDate.getMonth()]} ${createdAtDate.getFullYear()}`

    userInfo.id = "user-info";
    mainSection.appendChild(userInfo);
    
    appendInfo(userInfo, "h1", `About ${userData.name}:`, "about-user")
    appendInfo(userInfo, "h5", `Follows ${userData.following} people`, "following");
    appendInfo(userInfo, "h5", `Followed by ${userData.followers}`, "followers");
    appendInfo(userInfo, "h5", `Member since ${createdAtDate}`, "created-at");
    appendInfo(userInfo, "h5", `Lives in ${userData.location}`, "location");
}


function displayData(userData) {
    const mainSection = document.getElementsByTagName("main")[0];

    createMainInfoSection(userData, mainSection);
    createUserInfoSection(userData, mainSection);
}


async function getData(event) {
    event.preventDefault(); // prevents from reloading the page
    
    const user = document.getElementById("search-input").value
    const response = await fetch(`https://api.github.com/users/${user}`);
    const userData = await response.json();

    // document.getElementById("data").innerHTML = JSON.stringify(userData);
    displayData(userData);
}
