const SUPABASE_URL = "https://yopyipfgoznnkzzajutc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvcHlpcGZnb3pubmt6emFqdXRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM0NjcwNDEsImV4cCI6MjEwOTA0MzA0MX0.OB3JZlTHggwW0EjXNMVsxEWn2lqLYTqun_9vQb-7D58";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let DB = {}; 
let session = JSON.parse(localStorage.getItem("pilwe012_session") || "null");
let route = "beranda";
let activeTatibTab = 1;

const TIMELINE_ICONS = [
    { icon: "📝", label: "Pendaftaran" }, { icon: "🔍", label: "Verifikasi" },
    { icon: "📣", label: "Sosialisasi" }, { icon: "📋", label: "Penetapan DPT" },
    { icon: "🗳️", label: "Pemungutan" }, { icon: "🏆", label: "Hasil" },
    { icon: "📢", label: "Pengumuman" }, { icon: "📌", label: "Penting" },
    { icon: "📅", label: "Jadwal" }, { icon: "👥", label: "Musyawarah" },
    { icon: "⚖️", label: "Tata Tertib" }, { icon: "🎉", label: "Pelantikan" }
];