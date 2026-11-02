const DEFAULT_DATA = {
    // ... (SALIN SELURUH OBJEK DEFAULT_DATA DARI KODE LAMA ANDA KE SINI) ...
};

async function loadDB() {
    try {
        const [
            { data: siteConfig }, { data: kandidat }, { data: timeline },
            { data: pengumuman }, { data: panitia }, { data: tatib }
        ] = await Promise.all([
            supabaseClient.from('site_config').select('*').maybeSingle(),
            supabaseClient.from('kandidat').select('*'),
            supabaseClient.from('timeline').select('*'),
            supabaseClient.from('pengumuman').select('*'),
            supabaseClient.from('panitia').select('*').maybeSingle(),
            supabaseClient.from('tatib').select('*').maybeSingle()
        ]);

        return {
            profil: siteConfig?.data?.profil || DEFAULT_DATA.profil,
            agendaBar: siteConfig?.data?.agendaBar || DEFAULT_DATA.agendaBar,
            adminAuth: siteConfig?.data?.adminAuth || DEFAULT_DATA.adminAuth,
            kandidat: kandidat?.length ? kandidat : DEFAULT_DATA.kandidat,
            timeline: timeline?.length ? timeline : DEFAULT_DATA.timeline,
            pengumuman: pengumuman?.length ? pengumuman : DEFAULT_DATA.pengumuman,
            panitia: panitia?.data || DEFAULT_DATA.panitia,
            tatibPdf1: tatib?.pdf1 || DEFAULT_DATA.tatibPdf1,
            tatibJudul1: tatib?.judul1 || DEFAULT_DATA.tatibJudul1,
            tatibPdf2: tatib?.pdf2 || DEFAULT_DATA.tatibPdf2,
            tatibJudul2: tatib?.judul2 || DEFAULT_DATA.tatibJudul2,
        };
    } catch (error) {
        console.error("Gagal load dari Supabase:", error);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveDB() {
    localStorage.setItem("pilwe012_v8_db", JSON.stringify(DB));
    syncDynamicTexts();
}