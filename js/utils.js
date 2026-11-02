async function sha256(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function setSession(s) { session = s; localStorage.setItem("pilwe012_session", JSON.stringify(s)); }
function clearSession() { session = null; localStorage.removeItem("pilwe012_session"); }

function fmtTanggal(str) {
    const d = new Date(str);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(icon, msg) {
    const t = document.getElementById("toast");
    document.getElementById("toastIcon").textContent = icon;
    document.getElementById("toastMsg").textContent = msg;
    t.classList.remove("hidden");
    clearTimeout(window._tt);
    window._tt = setTimeout(() => t.classList.add("hidden"), 3000);
}

function openModal(html) {
    const m = document.getElementById("modal");
    const c = document.getElementById("modalContent");
    c.innerHTML = html;
    m.classList.remove("hidden");
    m.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const m = document.getElementById("modal");
    m.classList.add("hidden");
    m.classList.remove("flex");
    document.body.style.overflow = "";
}

// ... (Salin fungsi utilitas lain seperti handleSendWa, initReveal, startCountdown, syncDynamicTexts, dll ke sini) ...