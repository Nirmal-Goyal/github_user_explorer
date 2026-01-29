const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", handleSearch);
usernameInput.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        handleSearch();
    }
})

async function handleSearch(){
    const username = usernameInput.value.trim();
    if(!username){
        alert("Please enter valid a username");
        return;
    }
    
    try{
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if(!userResponse.ok){
            throw new Error("User not found");
        }

        const userData = await userResponse.json();
        displayUserInfo(userData);

        const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        if(!repoResponse.ok){
            throw new Error("Could not fetch repositories");
        }

        const repoData = await repoResponse.json();
        displayUserRepos(repoData);
    } catch(error){
        alert(error.message);
    }
}

function displayUserInfo(user){
    const userInfoSection = document.getElementById('user-info');
    userInfoSection.innerHTML = `
        <h2>${user.name}</h2>
        <img src="${user.avatar_url}" width="150">
        <p>Bio: ${user.bio}</p>
        <p>Followers: ${user.followers} / Following: ${user.following}</p>
        <p>Public Repositories count: ${user.public_repos}</p>
        `;
}

function displayUserRepos(repos){
    const userRepoSection = document.getElementById('user-repos');
    userRepoSection.innerHTML = `
        <h3>Latest 5 Repositories:</h3>
        <ul>
            ${repos.map(repo => `
                <li>
                    <h4>${repo.name}</h4>
                    <p><a href="${repo.html_url}">View repositort</a></p>
                </li>
            `).join("")}
        </ul>
    `;
}