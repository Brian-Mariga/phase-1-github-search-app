const githubForm = document.getElementById("github-form");
const searchInput = document.getElementById("search");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");

githubForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  searchUsers(searchTerm);
});

function searchUsers(username) {
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((res) => res.json())
    .then((data) => {
      displayUsers(data.items);
    });
}

function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <img src="${user.avatar_url}" alt="${user.login}">
    <p>${user.login}</p>
    `;
    userList.appendChild(listItem);

    listItem.querySelector("p").addEventListener("click", (e) => {
      e.preventDefault();
      searchRepos(user.login);
    });
  });
}

function searchRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => res.json())
    .then((data) => {
      displayRepos(data);
    });
}

function displayRepos(repos) {
  reposList.innerHTML = "";

  repos.forEach((repo) => {
    const li = document.createElement("li");
    li.textContent = repo.name;
    reposList.appendChild(li);
  });
}
