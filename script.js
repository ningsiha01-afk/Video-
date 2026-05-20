const video = document.getElementById("coverVideo");
const btnBuka = document.getElementById("btnBuka");
const scroll = document.getElementById("scrollText");

// saat klik buka undangan
btnBuka.addEventListener("click", function(){

btnBuka.style.display = "none";

video.play();

});

// saat video selesai
video.addEventListener("ended", function(){

scroll.style.display = "block";

});


// nama tamu dari link
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if(nama){
document.getElementById("namaTamu").innerHTML = "Kepada Yth. " + nama;
}




// INFO MEMPELAI



// --- AKAD RESEPSI ---
// Ambil semua elemen yang punya class zoom-in
const zoomElements = document.querySelectorAll('.zoom-in'); 

const zoomObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.3 });

// Hanya jalankan loop jika elemennya ditemukan
if (zoomElements.length > 0) {
    zoomElements.forEach(el => zoomObserver.observe(el));
}


// GIFT //
// ===== GIFT OPEN CLOSE =====
const btn = document.getElementById("btnGift");
const content = document.getElementById("giftContent");
const close = document.getElementById("closeGift");

btn.onclick = () => {
  content.classList.add("active");
};

close.onclick = () => {
  content.classList.remove("active");
};

// ===== COPY REKENING =====
document.querySelectorAll(".btn-copy").forEach(btn => {
  btn.addEventListener("click", function(){
    const rek = this.dataset.rek;

    navigator.clipboard.writeText(rek);
    this.innerText = "Tersalin ✓";

    setTimeout(() => {
      this.innerText = "Salin";
    }, 2000);
  });
});

// ===== WHATSAPP KONFIRMASI =====
const phone = "628xxxxxxxxxx"; // 🔥 GANTI NOMOR MEMPELAI

document.querySelectorAll(".btn-wa").forEach(btn => {
  btn.addEventListener("click", function(e){
    e.preventDefault();

    const bank = this.dataset.bank;
    const norek = this.dataset.norek;
    const nama = this.dataset.nama;

    const namaTamuEl = document.getElementById("namaTamu");
    let namaTamu = "Tamu Undangan";

    if(namaTamuEl){
      namaTamu = namaTamuEl.innerText.replace("Kepada Yth. ", "");
    }

    const pesan = 
`Assalamu'alaikum
Saya ${namaTamu}

Saya sudah mengirim hadiah 💐

Bank: ${bank}
No Rek: ${norek}
Atas Nama: ${nama}

Mohon dicek ya 🙏`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
  });
});





//RSVP//
document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("rsvpForm");
  const list = document.getElementById("ucapanList");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const kehadiran = document.getElementById("kehadiran").value;
    const ucapan = document.getElementById("ucapan").value;

    const div = document.createElement("div");
    div.className = "ucapan-item";

    div.innerHTML = `
      <h4>${nama}</h4>
      <small>${kehadiran}</small>
      <p>${ucapan}</p>
    `;

    list.prepend(div);

    form.reset();
  });

});