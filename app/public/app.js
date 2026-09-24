const membersEl = document.getElementById("members");
const statusEl = document.getElementById("status");
const form = document.getElementById("memberForm");
const refreshBtn = document.getElementById("refreshBtn");

async function loadHealth() {
  try {
    const response = await fetch("/health");
    const data = await response.json();
    statusEl.textContent = data.database === "connected"
      ? "✓ Nginx, Node.js and PostgreSQL are connected."
      : "⚠ Application is running but database is unavailable.";
  } catch {
    statusEl.textContent = "✕ API is currently unavailable.";
  }
}

async function loadMembers() {
  membersEl.innerHTML = "";
  try {
    const response = await fetch("/api/members");
    const members = await response.json();

    if (!members.length) {
      membersEl.innerHTML = "<div class='member'><span>No members yet.</span><small>Add the first member above.</small></div>";
      return;
    }

    members.forEach(member => {
      const row = document.createElement("div");
      row.className = "member";
      row.innerHTML = `<span>${escapeHtml(member.name)}</span><small>${escapeHtml(member.goal)}</small>`;
      membersEl.appendChild(row);
    });
  } catch {
    membersEl.innerHTML = "<div class='member'><span>Unable to load members.</span></div>";
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const goal = document.getElementById("goal").value.trim();

  try {
    const response = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, goal })
    });

    if (!response.ok) throw new Error("Request failed");
    form.reset();
    await loadMembers();
    await loadHealth();
  } catch {
    statusEl.textContent = "Could not add member.";
  }
});

refreshBtn.addEventListener("click", () => {
  loadHealth();
  loadMembers();
});

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[char]));
}

loadHealth();
loadMembers();
