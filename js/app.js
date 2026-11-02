function go(r) {
    route = r;
    closeModal();
    closeMobileMenu();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderNav() {
    const menus = [
        { r: "beranda", label: "Beranda", icon: "fa-house" },
        { r: "pengumuman", label: "Pengumuman", icon: "fa-bullhorn" },
        { r: "panitia", label: "Panitia", icon: "fa-users" },
        { r: "timeline", label: "Timeline", icon: "fa-calendar-days" },
        { r: "tatib", label: "Tata Tertib", icon: "fa-file-pdf" },
        { r: "kontak", label: "Kontak", icon: "fa-address-book" }
    ];

    document.getElementById("navDesktop").innerHTML = menus.map(m => `
        <button onclick="go('${m.r}')" class="px-3.5 py-2 rounded-xl transition-all ${route === m.r ? 'bg-white/20 font-bold text-amber-300' : 'hover:bg-white/10 text-white'}">
            ${m.label}
        </button>
    `).join("");

    document.getElementById("navMobile").innerHTML = menus.map(m => `
        <button onclick="go('${m.r}')" class="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition ${route === m.r ? 'bg-amber-400 text-emerald-950 font-bold' : 'hover:bg-white/10 text-white'}">
            <i class="fa-solid ${m.icon} w-5"></i> ${m.label}
        </button>
    `).join("");
}

function render() {
    renderNav();
    const app = document.getElementById("app");
    let html = "";
    switch (route) {
        case "beranda": html = viewBeranda(); break;
        case "pengumuman": html = viewPengumuman(); break;
        case "panitia": html = viewPanitia(); break;
        case "timeline": html = viewTimeline(); break;
        case "tatib": html = viewTatib(); break;
        case "kontak": html = viewKontak(); break;
        case "loginAdmin": html = viewLoginAdmin(); break;
        case "admin": html = viewAdmin(); break;
        default: html = viewBeranda();
    }
    app.innerHTML = html;
    initReveal();
    syncDynamicTexts();
    if (route === "beranda") startCountdown();
}

// Event Listener Menu Mobile
function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const iconMenu = document.getElementById("iconMenu");
    const iconClose = document.getElementById("iconClose");
    mobileMenu.classList.add("hidden");
    iconMenu.classList.remove("hidden");
    iconClose.classList.add("hidden");
}

document.getElementById("btnMenu").addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobileMenu");
    const iconMenu = document.getElementById("iconMenu");
    const iconClose = document.getElementById("iconClose");
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
        mobileMenu.classList.remove("hidden");
        iconMenu.classList.add("hidden");
        iconClose.classList.remove("hidden");
    } else {
        closeMobileMenu();
    }
});

document.getElementById("modal").addEventListener("click", e => {
    if (e.target.id === "modal") closeModal();
});

// Mulai Aplikasi
async function initApp() {
    DB = await loadDB();
    render();
}
initApp();