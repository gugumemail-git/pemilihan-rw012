const DEFAULT_DATA = {
    "agendaBar": {
        "badge": "AGENDA RESMI",
        "judulText": "Hari Pemungutan Suara PILWE 012 GMG: Ahad, 17 Januari 2027",
        "jamText": "06:00 – 11:00 WIB",
        "lokasiText": "GOR Perum GMG"
    },
        "profil": {
        "rw": "012", "perumahan": "Perum Grand Mutiara Gading", "desa": "Telajung",
        "kecamatan": "Cikarang Barat", "kabupaten": "Bekasi", "periode": "2027–2030",
        "dpt": 150, // TAMBAHKAN INI (Sesuaikan jumlah KK)
        "tagline": "Bersama Membangun Lingkungan GMG yang Guyub, Aman, Transparan & Maju",
        // ... sisa kode ...
        "countdown": "2027-01-17T06:00:00+07:00",
        "lokasiTps": "Sekretariat RW 012 Perum GMG",
        "alamatSekretariat": "Kantor Sekretariat RW 012 Perum Grand Mutiara Gading, Desa Telajung, Kec. Cikarang Barat, Kab. Bekasi",
        "jamLayanan": "Senin – Sabtu, 08:00 – 16:00 WIB",
        "email": "pilwe.gmg2026@gmail.com",
        "wa": "+62 812-1946-122",
        "koordinat": { "lat": "-6.327153", "lng": "107.059916", "zoom": 17 },
        "mapsLink": "https://maps.google.com/?q=-6.327153,107.059916"
    },
    "adminAuth": {
        "userHash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", // admin
        "passHash": "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9"  // admin123 (Sudah valid SHA-256)
    },
    "kandidat": [
        {
            "id": 1, "no": 1, "nama": "Calon 1", "umur": 40, "pekerjaan": "Wiraswasta", "alamat": "Blok xx No. 00",
            "emoji": "👨‍💼", "warna": "from-emerald-600 to-emerald-800",
            "visi": "Mewujudkan RW 012 Perum Grand Mutiara Gading sebagai lingkungan yang asri, aman berbasis teknologi modern, serta transparan dalam pengelolaan kas warga.",
            "misi": ["Pemasangan sistem CCTV online 24 jam dan optimalisasi ronda malam poskamling.", "Digitalisasi laporan keuangan kas RW dan pelayanan surat pengantar warga.", "Program pengolahan sampah mandiri dan bank sampah bernilai ekonomis.", "Meningkatkan kerukunan antar blok melalui kegiatan sosial dan olahraga berkala."],
            "program": [{ "icon": "⭐", "judul": "Program Kerja Utama", "desc": "Optimalisasi kebersihan & keamanan RW 012." }]
        },
        {
            "id": 2, "no": 2, "nama": "Calon 2", "umur": 40, "pekerjaan": "Ibu Rumah Tangga / UMKM", "alamat": "Blok xx No. 00",
            "emoji": "👩‍💼", "warna": "from-amber-600 to-amber-800",
            "visi": "Memberdayakan warga RW 012 melalui penguatan UMKM lokal, kesehatan keluarga, dan lingkungan yang ramah anak serta lansia.",
            "misi": ["Mengembangkan potensi UMKM warga GMG dengan pelatihan usaha & bazar bulanan.", "Mengoptimalkan Posyandu Balita, Ibu Hamil, dan Posbindu Lansia secara rutin.", "Membangun taman baca dan revitalisasi area bermain anak di lingkungan RW.", "Penguatan peranan PKK dan kegiatan keagamaan warga."],
            "program": [{ "icon": "⭐", "judul": "Program Kerja Utama", "desc": "Optimalisasi kebersihan & keamanan RW 012." }]
        },
        {
            "id": 3, "no": 3, "nama": "Calon 3", "umur": 40, "pekerjaan": "Karyawan Swasta / IT", "alamat": "Blok xx No. 00",
            "emoji": "👨‍💻", "warna": "from-blue-600 to-blue-800",
            "visi": "Menjadikan RW 012 sebagai pemukiman hijau, bebas banjir, responsif terhadap keluhan, serta mendorong partisipasi aktif generasi muda.",
            "misi": ["Percepatan normalisasi drainase dan saluran air lingkungan bebas genangan.", "Penyediaan kanal pengaduan cepat tanggap warga berbasis WhatsApp Bot.", "Penerangan Jalan Umum (PJU) hemat energi solar cell di titik remang.", "Pemberdayaan Karang Taruna GMG dalam inovasi teknologi dan kebersihan."],
            "program": [{ "icon": "⭐", "judul": "Program Kerja Utama", "desc": "Optimalisasi kebersihan & keamanan RW 012." }]
        }
    ],
    "pengumuman": [
        { "id": 1, "tanggal": "2026-10-25", "kategori": "Informasi", "judul": "Penetapan Tata Tertib, Tahapan & Anggaran PILWE 012", "isi": "Panitia Pemilihan Ketua RW 012 Perum Grand Mutiara Gading telah merampungkan dan menetapkan Tata Tertib, alur tahapan, serta rencana anggaran pelaksanaan Pemilihan Ketua RW 012 Periode 2027–2030." },
        { "id": 2, "tanggal": "2026-10-31", "kategori": "Informasi", "judul": "Pendataan Daftar Pemilih Sementara (DPS)", "isi": "Proses pendataan pemilih sementara telah dilaksanakan bersama para Ketua RT di lingkungan RW 012 Perum GMG untuk memastikan seluruh warga terdata dengan akurat." },
        { "id": 3, "tanggal": "2026-11-01", "kategori": "Penting", "judul": "Pendaftaran Bakal Calon Ketua RW 012 Resmi Dibuka", "isi": "Pendaftaran Bakal Calon Ketua RW 012 Perum Grand Mutiara Gading dibuka mulai 1 hingga 15 November 2026. Berkas pendaftaran dapat diambil dan diserahkan di Kantor Sekretariat RW 012." }
    ],
    "timeline": [
        { "id": 1, "urutan": 1, "tanggal": "10–25 Okt 2026", "icon": "📝", "judul": "Pembuatan Tata Tertib, Tahapan dan Anggaran", "status": "selesai", "desc": "Pembuatan Tata Tertib, Tahapan dan Anggaran oleh Panitia Pemilihan Ketua RW 012 Perum GMG" },
        { "id": 2, "urutan": 2, "tanggal": "26–31 Okt 2026", "icon": "📝", "judul": "Pendataan Daftar Pemilih Sementara Ketua RW 012 Perum GMG", "status": "selesai", "desc": "Panitian melakukan pendataan pemiliha sementara dengan meminta setiap ketua RT untuk menyerahkan data warga yang masuk DPS dengan data terbaru" },
        { "id": 3, "urutan": 3, "tanggal": "1–15 Nov 2026", "icon": "📝", "judul": "Pendaftaran Balon Ketua RW 012 Perum GMG", "status": "berjalan", "desc": "Panitia melakukan Penetapan dan Pengambilan No. Urut Balon Ketua RW 012 Perum GMG" },
        { "id": 4, "urutan": 4, "tanggal": "25 Nov 2026", "icon": "📋", "judul": "Penetapan dan Pengambilan No. Urut Balon Ketua RW 012 Perum GMG", "status": "akan", "desc": "Panitia melakukan Penetapan dan Pengambilan No. Urut Balon Ketua RW 012 Perum GMG sesuai dengan data yang telah di dapatkan" }
    ],
    "panitia": {
        "ketua": { "nama": "M. Widodo", "jabatan": "Ketua Panitia" },
        "wakil": { "nama": "Supriyadi", "jabatan": "Wakil Ketua" },
        "sekretaris": { "nama": "A. N. Hidayat", "jabatan": "Sekretaris" },
        "bendahara": { "nama": "Nanang Setyo P.", "jabatan": "Bendahara" },
        "anggota": [
            { "nama": "Uus Supriatna", "jabatan": "Sie Humas & Media" },
            { "nama": "Aris W.", "jabatan": "Sie Humas & Media" },
            { "nama": "Gugum Gumbira", "jabatan": "Sie Humas & Media" }
        ]
    },
    "tatibPdf1": "https://drive.google.com/file/d/147flMheyCqKY-WIurx1aidm99C3A18Xn/preview?usp=drive_link",
    "tatibJudul1": "Dokumen Tata Tertib & Pedoman Pemilihan",
    "tatibPdf2": "https://drive.google.com/file/d/1e5_JxU8O2IjXuqVRXQ-gPJBf5EHl2z46/preview?usp=sharing",
    "tatibJudul2": "Dokumen Berita Acara & Lampiran Tambahan",
    "dokumen": [] // Tambahan array dokumen
};

async function loadDB() {
    try {
        const [
            { data: siteConfig },
            { data: kandidat },
            { data: timeline },
            { data: pengumuman },
            { data: panitia },
            { data: tatib },
            { data: dokumen }
        ] = await Promise.all([
            supabaseClient.from('site_config').select('*').eq('id', 1).maybeSingle(),
            supabaseClient.from('kandidat').select('*').order('no', { ascending: true }),
            supabaseClient.from('timeline').select('*').order('urutan', { ascending: true }), // Diurutkan
            supabaseClient.from('pengumuman').select('*').order('tanggal', { descending: false }),
            supabaseClient.from('panitia').select('*').eq('id', 1).maybeSingle(),
            supabaseClient.from('tatib').select('*').eq('id', 1).maybeSingle(),
            supabaseClient.from('dokumen').select('*').order('created_at', { ascending: false })
        ]);

                return {
            siteConfigRaw: siteConfig?.data || {}, // TAMBAHKAN BARIS INI
            profil: siteConfig?.data?.profil || DEFAULT_DATA.profil,
            agendaBar: siteConfig?.data?.agendaBar || DEFAULT_DATA.agendaBar,
            adminAuth: siteConfig?.data?.adminAuth || DEFAULT_DATA.adminAuth,
            // ... sisa kode ...
            kandidat: kandidat?.length ? kandidat : DEFAULT_DATA.kandidat,
            timeline: timeline?.length ? timeline : DEFAULT_DATA.timeline,
            pengumuman: pengumuman?.length ? pengumuman : DEFAULT_DATA.pengumuman,
            panitia: panitia?.data || DEFAULT_DATA.panitia,
            dokumen: dokumen || [], 
            tatibPdf1: tatib?.pdf1 || DEFAULT_DATA.tatibPdf1,
            tatibJudul1: tatib?.judul1 || DEFAULT_DATA.tatibJudul1,
            tatibPdf2: tatib?.pdf2 || DEFAULT_DATA.tatibPdf2,
            tatibJudul2: tatib?.judul2 || DEFAULT_DATA.tatibJudul2,
        };
    } catch (error) {
        console.error("Gagal load dari Supabase, menggunakan data default:", error);
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
}

function saveDB() {
    localStorage.setItem("pilwe012_v8_db", JSON.stringify(DB));
    syncDynamicTexts();
}