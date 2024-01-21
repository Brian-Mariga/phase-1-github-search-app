const githubForm = document.getElementById("github-form");
const searchInput = document.getElementById("search");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");

githubForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    searchUsers(searchTerm);
  }
});

async function searchUsers(username) {
  const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`;
  try {
    const response = await fetch(userSearchEndpoint, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data = await response.json();
    displayUsers(data.items);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" />
            <p>${user.login}</p>
            <a href="#" data-repos-url="${user.repos_url}">View Repositories</a>
          `;
    userList.appendChild(listItem);

    listItem.querySelector("a").addEventListener("click", function (e) {
      e.preventDefault();
      const reposUrl = this.getAttribute("data-repos-url");
      fetchUserRepos(reposUrl);
    });
  });
}

async function fetchUserRepos(reposUrl) {
  try {
    const response = await fetch(reposUrl, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }

    const data = await response.json();
    displayUserRepos(data);
  } catch (error) {
    console.error("Error fetching user repos:", error);
  }
}

function displayUserRepos(repos) {
  reposList.innerHTML = "";

  repos.forEach((repo) => {
    const listItem = document.createElement("li");
    listItem.textContent = repo.name;
    reposList.appendChild(listItem);
  });
}
