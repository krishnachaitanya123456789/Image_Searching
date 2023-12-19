document.addEventListener("DOMContentLoaded", () => {
  const accessKey = "fRYEeEpQ83L3WXWa4TVU7RT3DzDn1QOzQ9w5RLzeBf8";
  const formE1 = document.getElementById("form");
  const inputE1 = document.getElementById("search-input");
  const searchResults = document.querySelector(".search-results");
  const showmore = document.getElementById("showmore");

  let inputData = "";
  let page = 1;

  async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const results = data.results;

      if (page === 1) {
        searchResults.innerHTML = "";
      }

      results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
      });

      page++;
      if (results.length > 0) {
        showmore.style.display = "block";
      } else {
        showmore.style.display = "none";
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  if (formE1) {
    formE1.addEventListener("submit", async (event) => {
      event.preventDefault();
      page = 1;
      await searchImages();
    });
  }

  if (showmore) {
    showmore.addEventListener("click", async () => {
      await searchImages();
    });
  }
});
