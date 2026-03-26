const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });

const grid = document.querySelector("#projects-grid");
const count = document.querySelector("#project-count");

if (grid && count && Array.isArray(window.portfolioProjects)) {
  count.textContent = `[${window.portfolioProjects.length}]`;

  grid.innerHTML = window.portfolioProjects
    .map((project) => {
      const href = `./project.html?slug=${encodeURIComponent(project.slug)}`;

      return `
        <article class="project-card">
          <a href="${href}" class="project-thumb" aria-label="Open ${escapeHtml(project.title)}">
            <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} preview" loading="lazy" />
          </a>
          <h2 class="project-title">
            <a href="${href}">
              ${escapeHtml(project.title)}
              <span class="hover-arrow">-&gt;</span>
            </a>
          </h2>
          <p class="project-subtitle">${escapeHtml(project.subtitle)}</p>
        </article>
      `;
    })
    .join("");
}
