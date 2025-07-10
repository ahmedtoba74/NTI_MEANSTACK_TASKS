const categories = [
    { name: "pizza", sectionId: "pizza" },
    { name: "pasta", sectionId: "pasta" },
    { name: "salad", sectionId: "salad" },
];

const API_BASE = "https://forkify-api.herokuapp.com/api/search?q=";

function createMealCard(recipe) {
    const mealDiv = document.createElement("div");
    mealDiv.className = "meal";

    const img = document.createElement("img");
    img.src = recipe.image_url;
    img.alt = recipe.title;

    const title = document.createElement("h3");
    title.textContent = recipe.title;
    title.style.margin = "0.5rem 0 0 0";
    title.style.fontWeight = "bold";
    title.style.textAlign = "center";

    const publisher = document.createElement("p");
    publisher.textContent = recipe.publisher;
    publisher.style.margin = "0 0 1rem 0";
    publisher.style.textAlign = "center";
    publisher.style.color = "#888";
    publisher.style.fontSize = "1rem";

    const actions = document.createElement("div");
    actions.className = "meal-actions";

    const sourceBtn = document.createElement("a");
    sourceBtn.className = "source-btn";
    sourceBtn.textContent = "Source";
    sourceBtn.href = recipe.source_url;
    sourceBtn.target = "_blank";
    sourceBtn.style.textDecoration = "none";

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "desc-btn";
    detailsBtn.textContent = "Details";
    detailsBtn.style.textDecoration = "none";
    detailsBtn.addEventListener("click", function () {
        showRecipeDetails(recipe.recipe_id);
    });

    actions.appendChild(sourceBtn);
    actions.appendChild(detailsBtn);

    mealDiv.appendChild(img);
    mealDiv.appendChild(title);
    mealDiv.appendChild(publisher);
    mealDiv.appendChild(actions);

    return mealDiv;
}

function displayMeals(category, recipes) {
    const section = document.getElementById(category.sectionId);
    const mealsDiv = section.querySelector(".meals");
    mealsDiv.innerHTML = "";
    recipes.forEach((recipe) => {
        mealsDiv.appendChild(createMealCard(recipe));
    });
}

async function fetchAndDisplayCategory(category) {
    try {
        const res = await fetch(API_BASE + category.name);
        const data = await res.json();
        if (data.recipes && data.recipes.length > 0) {
            displayMeals(category, data.recipes.slice(0, 24));
        }
    } catch (err) {
        console.error("Error fetching", category.name, err);
    }
}

function showSection(sectionId) {
    document.querySelectorAll(".menu-section").forEach((sec) => {
        sec.style.display = sec.id === sectionId ? "block" : "none";
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
        if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}

async function showRecipeDetails(recipeId) {
    const modal = document.getElementById("details-modal");
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = "<p>Loading...</p>";
    modal.style.display = "flex";
    try {
        const res = await fetch(
            `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
        );
        const data = await res.json();
        const recipe = data.recipe;
        modalBody.innerHTML = `
      <img src="${recipe.image_url}" alt="${recipe.title}">
      <h2>${recipe.title}</h2>
      <p><strong>Publisher:</strong> ${recipe.publisher}</p>
      <p><a href="${recipe.source_url}" target="_blank">View Source</a></p>
      <h3>Ingredients:</h3>
      <ul>${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>
    `;
    } catch (err) {
        modalBody.innerHTML = "<p>Failed to load recipe details.</p>";
    }
}

window.addEventListener("DOMContentLoaded", () => {
    categories.forEach(fetchAndDisplayCategory);
    showSection("home");
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const sectionId = this.getAttribute("href").replace("#", "");
            showSection(sectionId);
        });
    });
    const modal = document.getElementById("details-modal");
    const closeBtn = document.querySelector(".modal-close");
    modal.addEventListener("click", function (e) {
        if (e.target === modal || e.target === closeBtn) {
            modal.style.display = "none";
        }
    });
});
