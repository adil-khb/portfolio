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

const container = document.querySelector("#project-detail");
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = Array.isArray(window.portfolioProjects)
  ? window.portfolioProjects.find((item) => item.slug === slug)
  : null;

if (container) {
  if (!project) {
    document.title = "Project Not Found | Adil";
    container.innerHTML = `
      <a class="back-link" href="./index.html">
        <span class="back-arrow">&lt;-</span>
        projects
      </a>
      <section class="detail-copy">
        <h1>project not found</h1>
        <p>The project you tried to open is not available in this portfolio.</p>
      </section>
    `;
  } else {
    document.title = `${project.title} | Adil`;

    const externalLink = project.externalHref
      ? `
        <a class="detail-link" href="${escapeHtml(project.externalHref)}" target="_blank" rel="noreferrer">
          ${escapeHtml(project.externalLabel)} <span class="inline-arrow">/&gt;</span>
        </a>
      `
      : "";

    container.innerHTML = `
      <a class="back-link" href="./index.html">
        <span class="back-arrow">&lt;-</span>
        projects
      </a>

      <section class="detail-head">
        <div class="detail-copy">
          <h1>${escapeHtml(project.title)}</h1>
          <p class="detail-subtitle">${escapeHtml(project.subtitle)}</p>
        </div>

        <div class="detail-links">
          ${externalLink}
        </div>
      </section>

      <section class="detail-preview">
        <div class="detail-frame">
          <img src="${escapeHtml(project.thumbnail)}" alt="${escapeHtml(project.title)} preview" />
        </div>
      </section>

      <section class="detail-body">
        <p>${escapeHtml(project.body)}</p>
      </section>
    `;
  }
}
