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
    // Menambahkan T00:00:00 agar tidak terjadi pergeseran zona waktu (off-by-one)
    const d = new Date(str.includes('T') ? str : str + 'T00:00:00');
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function showToast(icon, msg) {
    const t = document.getElementById("toast");
    const ti = document.getElementById("toastIcon");
    const tm = document.getElementById("toastMsg");
    
    if (!t || !ti || !tm) return; // Guard

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

// Tambahkan ini di bawah fungsi closeModal() di dalam utils.js

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