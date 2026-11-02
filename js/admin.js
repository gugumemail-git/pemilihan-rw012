async function doLoginAdmin(e) {
    e.preventDefault();
    
    // --- KODE LOGIN YANG SUDAH DIPERBAIKI ---
    const u = document.getElementById("inUser").value.trim();
    const p = document.getElementById("inPassA").value.trim();

    const uHash = await sha256(u);
    const pHash = await sha256(p);

    const { data: siteData, error } = await supabaseClient
        .from('site_config').select('data').eq('id', 1).maybeSingle();

    const fallbackAuth = {
        userHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        passHash: "d2a6f3e9b8578bd7f9f3a0d5e9f3b8578bd7f9f3a0d5e9f3b8578bd7f9f3a0d5"
    };

    let adminAuth = fallbackAuth;
    if (!error && siteData && siteData.data && siteData.data.adminAuth) {
        adminAuth = siteData.data.adminAuth;
    }

    if (uHash !== adminAuth.userHash || pHash !== adminAuth.passHash) {
        showToast("❌", "Username atau Password salah!");
        return;
    }

    setSession({ role: "admin", nama: "Administrator PILWE 012" });
    showToast("✅", "Login Admin berhasil!");
    go("admin");
}

// ... (Salin fungsi admin lainnya: simpanAgendaBar, simpanTimeline, hapusTimeline, formKandidat, dll) ...