const video = document.getElementById("coverVideo");
const btnBuka = document.getElementById("btnBuka");
const tampilanAwal = document.getElementById("tampilanAwal");
const tampilanAkhir = document.getElementById("tampilanAkhir");
const overlay = document.getElementById("overlay");

document.body.style.overflow = "hidden";

video.pause();

const music = new Audio("assets/music/music.mp3");
music.loop = true;

btnBuka.addEventListener("click", () => {
  // 1. Hilangkan tampilan awal secara halus
  tampilanAwal.style.transition = "opacity 0.5s ease";
  tampilanAwal.style.opacity = "0";
  tampilanAwal.style.pointerEvents = "none"; // Matikan interaksi klik pada tombol lama

  setTimeout(() => {
    tampilanAwal.style.display = "none";
    
    // 2. Munculkan tampilan akhir (kubah)
    tampilanAkhir.classList.add("active");
  }, 500); // Sesuaikan dengan durasi transition opacity

  // 3. Putar video dan musik
  video.play();
  music.play();

  // 4. Buka akses scroll halaman
  document.body.style.overflowY = "auto";
});

window.addEventListener("scroll", () => {

if(window.scrollY > 50){
overlay.style.opacity = "0";
overlay.style.pointerEvents = "none";
}else{
overlay.style.opacity = "1";
overlay.style.pointerEvents = "auto";
}

});

// ========================================================
// FITUR UNDANGAN KAMU (NAMA TAMU, GIFT, RSVP - TETAP AMAN)
// ========================================================

// Ambil nama tamu dari link URL (?to=Nama)
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if(nama){
  const namaTamuEl = document.getElementById("namaTamu");
  if (namaTamuEl) {
    namaTamuEl.innerHTML = "Kepada Yth. <br><b style='font-size:20px;'>" + nama + "</b>";
  }
}

// --- ANIMASI INTERSECTION OBSERVER ---
const zoomElements = document.querySelectorAll('.zoom-in'); 
const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.3 });

if (zoomElements.length > 0) {
    zoomElements.forEach(el => zoomObserver.observe(el));
}

// ===== DIALOG BOX HADIAH (GIFT) =====
const btn = document.getElementById("btnGift");
const content = document.getElementById("giftContent");
const close = document.getElementById("closeGift");

if(btn && content && close) {
  btn.onclick = () => { content.classList.add("active"); };
  close.onclick = () => { content.classList.remove("active"); };
}

// ===== FITUR COPY NO REK =====
document.querySelectorAll(".btn-copy").forEach(btn => {
  btn.addEventListener("click", function(){
    const rek = this.dataset.rek;
    navigator.clipboard.writeText(rek);
    this.innerText = "Tersalin ✓";
    setTimeout(() => { this.innerText = "Salin"; }, 2000);
  });
});

// ===== KONFIRMASI HADIAH KE WHATSAPP =====
const phone = "628xxxxxxxxxx"; // 🔥 SILAKAN GANTI PAKAI NOMOR WA KAMU
document.querySelectorAll(".btn-wa").forEach(btn => {
  btn.addEventListener("click", function(e){
    e.preventDefault();
    const bank = this.dataset.bank;
    const norek = this.dataset.norek;
    const nama = this.dataset.nama;
    const namaTamuEl = document.getElementById("namaTamu");
    let namaTamu = "Tamu Undangan";
    if(namaTamuEl){ namaTamu = namaTamuEl.innerText.replace("Kepada Yth. ", ""); }

    const pesan = `Assalamu'alaikum\nSaya ${namaTamu}\n\nSaya sudah mengirim hadiah 💐\n\nBank: ${bank}\nNo Rek: ${norek}\nAtas Nama: ${nama}\n\nMohon dicek ya 🙏`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  });
});

// ===== SYSTEM RSVP & KIRIM UCAPAN =====
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("rsvpForm");
  const list = document.getElementById("ucapanList");
  if(form && list) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const nama = document.getElementById("nama").value;
      const kehadiran = document.getElementById("kehadiran").value;
      const ucapan = document.getElementById("ucapan").value;
      const div = document.createElement("div");
      div.className = "ucapan-item";
      div.innerHTML = `<h4>${nama}</h4><small>${kehadiran}</small><p>${ucapan}</p>`;
      list.prepend(div);
      form.reset();
    });
  }
});