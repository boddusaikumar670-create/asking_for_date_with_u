const API_URL = "http://localhost:3000";

async function loadResponses() {
    const status = document.getElementById("status");
    const container = document.getElementById("responses");

    status.textContent = "Loading responses...";

    try {
        const response = await fetch(`${API_URL}/api/date-responses`);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        status.textContent = `${data.responses.length} response(s)`;

        if (!data.responses.length) {
            container.innerHTML = `<div class="empty">No responses yet ❤️</div>`;
            return;
        }

        container.innerHTML = data.responses.map(item => `
            <article class="response-card">
                <div class="top">
                    <h2>${escapeHtml(item.name)} ❤️</h2>
                    <span>${new Date(item.created_at).toLocaleString()}</span>
                </div>
                <div class="grid">
                    <div><small>ANSWER</small><strong>${escapeHtml(item.answer)}</strong></div>
                    <div><small>MOVIE</small><strong>${escapeHtml(item.movie_choice || "—")}</strong></div>
                    <div><small>DATE</small><strong>${escapeHtml(item.date_choice || "—")}</strong></div>
                    <div><small>TIME</small><strong>${escapeHtml(item.time_choice || "—")}</strong></div>
                    <div><small>SNACKS</small><strong>${escapeHtml(item.snacks || "—")}</strong></div>
                </div>
                <div class="message">
                    <small>MESSAGE</small>
                    <p>${escapeHtml(item.message || "No message")}</p>
                </div>
            </article>
        `).join("");
    } catch (error) {
        status.textContent = "Unable to load responses.";
    }
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

loadResponses();
