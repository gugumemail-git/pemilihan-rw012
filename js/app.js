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
        { r: "dokumen", label: "Dokumen", icon: "fa-folder-open" },
        { r: "kontak", label: "Kontak", icon: "fa-address-book" },
        { r: "hitung", label: "Hitung Suara", icon: "fa-calculator" } // TAMBAHKAN INI
    ];

    const navDesktop = document.getElementById("navDesktop");
    if (navDesktop) {
        navDesktop.innerHTML = menus.map(m => `
            <button onclick="go('${m.r}')" class="px-3.5 py-2 rounded-xl transition-all ${route === m.r ? 'bg-white/20 font-bold text-amber-300' : 'hover:bg-white/10 text-white'}">
                ${m.label}
            </button>
        `).join("");
    }

    const navMobile = document.getElementById("navMobile");
    if (navMobile) {
        navMobile.innerHTML = menus.map(m => `
            <button onclick="go('${m.r}')" class="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition ${route === m.r ? 'bg-amber-400 text-emerald-950 font-bold' : 'hover:bg-white/10 text-white'}">
                <i class="fa-solid ${m.icon} w-5"></i> ${m.label}
            </button>
        `).join("");
    }
}

function render() {
    renderNav();
    const app = document.getElementById("app");
    if (!app) return; 

    // Bersihkan interval countdown lama agar tidak memory leak
    if (typeof cdInterval !== 'undefined' && cdInterval) {
        clearInterval(cdInterval);
    }

    let html = "";
        switch (route) {
        case "beranda": html = viewBeranda(); break;
        case "pengumuman": html = viewPengumuman(); break;
        case "panitia": html = viewPanitia(); break;
        case "timeline": html = viewTimeline(); break;
        case "dokumen": html = viewDokumen(); break;
        case "kontak": html = viewKontak(); break;
        case "hitung": html = viewHitungSuara(); break; // TAMBAHKAN INI
        case "loginAdmin": html = viewLoginAdmin(); break;
        case "admin": html = viewAdmin(); break;
        default: html = viewBeranda();
    }
    app.innerHTML = html;
    
    if (typeof initReveal === 'function') initReveal();
    if (typeof syncDynamicTexts === 'function') syncDynamicTexts();
    if (route === "beranda" && typeof startCountdown === 'function') startCountdown();
    
    // Panggil drag and drop jika berada di halaman admin
    if (route === "admin" && typeof initDragAndDropTimeline === 'function') {
        initDragAndDropTimeline();
    }
}

// Event Listener Menu Mobile (DENGAN PENGAMAN)
function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    const iconMenu = document.getElementById("iconMenu");
    const iconClose = document.getElementById("iconClose");
    
    // Cek dulu apakah elemennya ada sebelum diakses
    if (mobileMenu) mobileMenu.classList.add("hidden");
    if (iconMenu) iconMenu.classList.remove("hidden");
    if (iconClose) iconClose.classList.add("hidden");
}

// Pastikan kode berjalan setelah HTML selesai dimuat
document.addEventListener("DOMContentLoaded", () => {
    
    const btnMenu = document.getElementById("btnMenu");
    if (btnMenu) {
        btnMenu.addEventListener("click", () => {
            const mobileMenu = document.getElementById("mobileMenu");
            const iconMenu = document.getElementById("iconMenu");
            const iconClose = document.getElementById("iconClose");
            
            if (!mobileMenu) return; // Jika menu tidak ada, hentikan

            const isHidden = mobileMenu.classList.contains("hidden");
            if (isHidden) {
                mobileMenu.classList.remove("hidden");
                if (iconMenu) iconMenu.classList.add("hidden");
                if (iconClose) iconClose.classList.remove("hidden");
            } else {
                closeMobileMenu();
            }
        });
    }

    const modal = document.getElementById("modal");
    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target.id === "modal") closeModal();
        });
    }

    // Jalankan aplikasi utama
    initApp();
});

// Fungsi Inisialisasi Aplikasi
async function initApp() {
    if (typeof loadDB === 'function') {
        DB = await loadDB();
        render();
    } else {
        console.error("Fungsi loadDB tidak ditemukan. Pastikan file data.js sudah dimuat.");
    }
}