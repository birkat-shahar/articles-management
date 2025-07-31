function renderArticles(filters = {}) {
  var container = document.getElementById("articlesContainer");
  container.innerHTML = "";
  const filtered = articles.filter(article => {
    const matchText = filters.text ? article.title.includes(filters.text) : true;
    const matchCat = filters.category ? article.category === filters.category : true;
    const matchSub = filters.subcategory ? article.subcategory === filters.subcategory : true;
    return matchText && matchCat && matchSub;
  });

  filtered.forEach(article => {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4"; // שניים בשורה במסכים בינוניים, שלושה בשורה במסכים גדולים

  const card = document.createElement("div");
  card.className = "card h-100 shadow-sm p-3";

  card.innerHTML = `
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${article.title}</h5>
      <p class="card-text">${article.subject}</p>
      <div class="mt-auto">
        <a href="${article.url}" target="_blank" class="btn btn-outline-primary btn-sm w-100 btn-view-page">לצפייה</a>
      </div>
    </div>
  `;

  col.appendChild(card);
  container.appendChild(col);
});
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector("nav.sidebar-fixed-right .position-sticky");
  const topicContainer = document.createElement("div");
  topicContainer.classList.add("mt-4");

  topics.forEach((topic, index) => {
    const collapseId = `collapseTopic${index}`;

    // כפתור פתיחה/סגירה לנושא
    const topicButton = document.createElement("button");
    topicButton.className = "btn btn-sm btn-outline-secondary w-100 my-1";
    topicButton.setAttribute("data-bs-toggle", "collapse");
    topicButton.setAttribute("data-bs-target", `#${collapseId}`);
    topicButton.setAttribute("aria-expanded", "false");
    topicButton.setAttribute("aria-controls", collapseId);
    topicButton.textContent = topic.name;

    topicButton.addEventListener("click", () => {
      renderArticles({ category: topic.id });
    });

    topicContainer.appendChild(topicButton);

    // קונטיינר מתמוטט לתתי־נושאים
    const collapseDiv = document.createElement("div");
    collapseDiv.className = "collapse ms-3";
    collapseDiv.id = collapseId;

    if (topic.subtopics.length > 0) {
      topic.subtopics.forEach(sub => {
        const subBtn = document.createElement("button");
        subBtn.className = "btn btn-sm btn-outline-secondary w-100 my-1";
        subBtn.textContent = sub.name;
        subBtn.addEventListener("click", () => { renderArticles({ category: topic.id, subcategory: sub.id });});
        collapseDiv.appendChild(subBtn);
      });
    } else {
        const subBtn = document.createElement("button");
        subBtn.className = "btn btn-sm btn-outline-secondary w-100 my-1";
        subBtn.textContent = '-';
        collapseDiv.appendChild(subBtn);
    }

    topicContainer.appendChild(collapseDiv);
  });

  sidebar.appendChild(topicContainer);
});

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();
    renderArticles({ text: value });
  });

  renderArticles(); 
});

document.addEventListener("DOMContentLoaded", () => {
  renderArticles();
});