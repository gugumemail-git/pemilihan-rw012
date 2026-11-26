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
    if (!str) return "-";
    const d = new Date(str.includes('T') ? str : str + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(icon, msg) {
    const t = document.getElementById("toast");
    const ti = document.getElementById("toastIcon");
    const tm = document.getElementById("toastMsg");
    
    if (!t || !ti || !tm) return;

    ti.textContent = icon;
    tm.textContent = msg;
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

// Konversi Link YouTube (watch, youtu.be, shorts) ke URL Embed
function getYoutubeEmbedUrl(url) {
    if (!url) return "";
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }
    return url;
}

// Buka Modal Quick Preview Video Visi Misi
function openVideoPreviewModal(kandidatId) {
    const k = DB.kandidat.find(x => x.id === kandidatId);
    if (!k) return;

    const rawUrl = (k.videoUrl || k.video_url || "").trim();
    if (!rawUrl) {
        showToast("⚠️", "Link video visi misi belum tersedia untuk kandidat ini.");
        return;
    }

    const embedUrl = getYoutubeEmbedUrl(rawUrl);
    const vm = document.getElementById("videoModal");
    const vmc = document.getElementById("videoModalContent");
    if (!vm || !vmc) return;

    vmc.innerHTML = `
        <div class="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50 shrink-0">
            <div class="flex items-center gap-3 min-w-0">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <i class="fa-brands fa-youtube text-xl"></i>
                </div>
                <div class="min-w-0">
                    <h3 class="font-bold text-sm sm:text-base text-slate-900 truncate">
                        Video Visi & Misi — No. Urut 0${k.no} (${k.nama})
                    </h3>
                    <p class="text-[11px] font-mono text-slate-500 truncate">${rawUrl}</p>
                </div>
            </div>
            <div class="flex items-center gap-2 shrink-0 ml-2">
                <a href="${rawUrl}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm">
                    <span>Buka di YouTube</span>
                    <i class="fa-solid fa-arrow-up-right-from-square text-[11px]"></i>
                </a>
                <button type="button" onclick="closeVideoPreviewModal()" aria-label="Tutup Pratinjau"
                        class="w-9 h-9 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 flex items-center justify-center transition">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>
        </div>
        <div class="flex-1 relative bg-slate-950">
            <iframe id="videoPreviewIframe" class="w-full h-full border-0"
                    src="${embedUrl}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
            </iframe>
        </div>
    `;

    vm.classList.remove("hidden");
    vm.classList.add("flex");
    document.body.style.overflow = "hidden";
}

function closeVideoPreviewModal() {
    const vm = document.getElementById("videoModal");
    const iframe = document.getElementById("videoPreviewIframe");
    if (iframe) iframe.src = "about:blank"; // Hentikan suara video seketika
    if (vm) {
        vm.classList.add("hidden");
        vm.classList.remove("flex");
    }
    // Pertahankan kunci scroll jika modal profil kandidat di belakangnya masih terbuka
    const mainModal = document.getElementById("modal");
    if (!mainModal || mainModal.classList.contains("hidden")) {
        document.body.style.overflow = "";
    }
}

let cdInterval = null;
function startCountdown() {
    clearInterval(cdInterval);
    const target = new Date(DB.profil.countdown).getTime();

    function tick() {
        const now = new Date().getTime();
        const diff = Math.max(0, target - now);

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        const renderBox = (val, label) => `
            <div class="p-2.5 bg-emerald-950/80 rounded-2xl border border-white/20 text-center shadow">
                <span class="block text-xl sm:text-2xl font-black text-amber-300 tabular-nums">${String(val).padStart(2, '0')}</span>
                <span class="text-[9px] font-extrabold text-emerald-200 uppercase">${label}</span>
            </div>
        `;

        const html = renderBox(d, "Hari") + renderBox(h, "Jam") + renderBox(m, "Menit") + renderBox(s, "Detik");

        const elHero = document.getElementById("heroCountdown");
        if (elHero) elHero.innerHTML = html;

        const elMain = document.getElementById("mainCountdown");
        if (elMain) elMain.innerHTML = html;
    }

    tick();
    cdInterval = setInterval(tick, 1000);
}

function syncDynamicTexts() {
    const ab = DB.agendaBar || DEFAULT_DATA.agendaBar;
    const elBadge = document.getElementById("topBarBadge");
    if (elBadge) elBadge.textContent = ab.badge;
    
    const elJudul = document.getElementById("topBarJudul");
    if (elJudul) elJudul.innerHTML = `${ab.judulText}`;
    
    const elJam = document.getElementById("topBarJam");
    if (elJam) elJam.textContent = ab.jamText;

    const elTopBarLokasi = document.getElementById("topBarLokasi");
    if (elTopBarLokasi) elTopBarLokasi.textContent = ab.lokasiText;

    const heroLokasi = document.getElementById("heroLokasiTps");
    if (heroLokasi) heroLokasi.textContent = ab.lokasiText;

    const p = DB.profil;
    const footerLokasi = document.getElementById("footerLokasi");
    if (footerLokasi) footerLokasi.textContent = "Sekretariat RW 012 Perum GMG";
    const footerJam = document.getElementById("footerJam");
    if (footerJam) footerJam.textContent = p.jamLayanan;
    const footerEmail = document.getElementById("footerEmail");
    if (footerEmail) footerEmail.textContent = p.email;
    const footerWa = document.getElementById("footerWa");
    if (footerWa) footerWa.textContent = p.wa;
}

let revealObserver = null;
function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!revealObserver) {
        revealObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add("in");
                    revealObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });
    }
    els.forEach(el => revealObserver.observe(el));
}