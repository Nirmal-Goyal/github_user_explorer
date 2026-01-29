const usernameInput = document.getElementById('username');
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click", handleSearch);

function handleSearch(){
    const username = usernameInput.value.trim();
    if(!username){
        alert("Please enter valid a username");
        return;
    }
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        if(!response.ok){
            throw new Error("User not found")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error.message)
    })
}