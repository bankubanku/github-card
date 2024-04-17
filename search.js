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
    if (userData.name === null) {
        userData.name = userData.login
        appendInfo(mainInfo, "h1", userData.name, "name");
    } else {
        appendInfo(mainInfo, "h1", userData.name, "name");
        appendInfo(mainInfo, "h2", userData.login, "login");
    } 

    if (userData.bio !== null) {
        appendInfo(mainInfo, "P", userData.bio, "bio");
    }
}


function createUserInfoSection(userData, mainSection) {
    const userInfo = document.createElement("div");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let createdAtDate = new Date(userData.created_at); 
    createdAtDate = `${months[createdAtDate.getMonth()]} ${createdAtDate.getFullYear()}`

    userInfo.id = "user-info";
    mainSection.appendChild(userInfo);
    
    appendInfo(userInfo, "h1", `About ${userData.name}:`, "about-user");

    if (userData.following === 0) {
        appendInfo(userInfo, "h5", `Follows nobody`, "following");
    } else if (userData.following === 1) {
        appendInfo(userInfo, "h5", `Follows only 1 person`, "following");
    } else {
        appendInfo(userInfo, "h5", `Follows ${userData.following} people`, "following");
    } 

    if (userData.followers === 0) {
        appendInfo(userInfo, "h5", "Followed by nobody", "followers");
    } else if (userData.followers === 1) {
        appendInfo(userInfo, "h5", "Followed by only 1 person", "followers");
    } else {
        appendInfo(userInfo, "h5", `Followed by ${userData.followers}`, "followers");
    } 

    appendInfo(userInfo, "h5", `Member since ${createdAtDate}`, "created-at");

    if (userData.location !== null) {
        appendInfo(userInfo, "h5", `Lives in ${userData.location}`, "location");
    }
}


function getStarsNumber(reposData) {
    let starsCount = 0;
    let forksCount = 0;
    let usedLanguagesArr = [];
    let usedLanguages = "";

    for (let x in reposData) {
        starsCount += reposData[x].stargazers_count;
        forksCount += reposData[x].forks_count;
        usedLanguagesArr.push(reposData[x].language);
    }
    
    usedLanguagesArr = [...new Set(usedLanguagesArr)]; 
    for (let x of usedLanguagesArr) {
        usedLanguages +=  x + ", ";
    }
    usedLanguages = usedLanguages.slice(0, -2); 

    return {
        starsCount:starsCount,
        forksCount:forksCount,
        usedLanguages:usedLanguages
    }
}

function createReposInfoSection(userData, mainSection) {
    const reposInfo = document.createElement("div");
    
    reposInfo.id = "repos-info";
    mainSection.appendChild(reposInfo);

    getReposData(userData.repos_url)
    .then(reposData => {
            if (userData.public_repos == 0) {
                appendInfo(reposInfo, "h1", `${userData.name} has no public repositories :c`, "repos-number");
            } else {
                appendInfo(reposInfo, "h1", `About ${userData.name}'s repositories`, "about-repos");

               if (userData.public_repos === 1) {
                    appendInfo(reposInfo, "h5", `${userData.name} created/forked only one repo`, "repos-number");
                } else {
                    appendInfo(reposInfo, "h5", `${userData.name} created/forked ${userData.public_repos} repos`, "repos-number");
                } 

                const reposAnalyzedData = getStarsNumber(reposData);
                if (reposAnalyzedData.starsCount === 0) {
                    appendInfo(reposInfo, "h5", `No stars :<`, "stars-count");
                } else if (reposAnalyzedData.starsCount === 1) {
                    appendInfo(reposInfo, "h5", `Starred only once`, "stars-count");
                } else {
                    appendInfo(reposInfo, "h5", `Starred ${reposAnalyzedData.starsCount} times`, "stars-count");
                } 

                if (reposAnalyzedData.forksCount === 0) {
                    appendInfo(reposInfo, "h5", `Forked by nobody :<`, "forks-count");
                } else if (reposAnalyzedData.forksCount === 1) {
                    appendInfo(reposInfo, "h5", `Forked only once`, "forks-count");
                } else {
                    appendInfo(reposInfo, "h5", `Forked ${reposAnalyzedData.forksCount} times`, "forks-count");
                } 

                appendInfo(reposInfo, "h5", `Repositories are build with ${reposAnalyzedData.usedLanguages}`, "languages");
            }
        })
}


function displayData(userData) {
    const mainSection = document.getElementsByTagName("main")[0];
    
    mainSection.innerHTML = '';

    createMainInfoSection(userData, mainSection);
    createUserInfoSection(userData, mainSection);
    createReposInfoSection(userData, mainSection);
}


function displayError(message) {
    const mainSection = document.getElementsByTagName("main")[0];
    
    mainSection.innerHTML = `<h1>${message}</h1>`;
}


async function getReposData(reposURL) {
    const response = await fetch(reposURL);
    const reposData = await response.json();
    return reposData
}

async function getUserData(event) {
    event.preventDefault(); // prevents from reloading the page
    
    const user = document.getElementById("search-input").value;

    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        if (response.ok) {
            const userData = await response.json();
            displayData(userData);
        } else {
            displayError("Are you sure this user exists? :>");
        }
    } catch (error) {
        console.error(error);
        displayError("Sorry, the network error occured :<");
    }
}
