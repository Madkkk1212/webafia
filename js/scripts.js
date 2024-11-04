// JavaScript untuk mengatur underline posisi, menu responsif, dan animasi scroll
const navLinks = document.querySelectorAll("nav a");
const underline = document.querySelector(".underline");
const responsiveNav = document.getElementById("responsiveNav");
const menuIcon = document.querySelector(".menu-icon");
const sections = document.querySelectorAll(".section");

// Fungsi untuk memindahkan underline ke posisi link yang di-klik
function moveUnderline(link) {
    underline.style.width = `${link.offsetWidth}px`;
    underline.style.left = `${link.offsetLeft}px`;
}


 function openModal(imageElement) {
     const modal = document.getElementById("imageModal");
     const fullImage = document.getElementById("fullImage");

     // Setel sumber gambar modal dengan sumber gambar yang diklik
     fullImage.src = imageElement.src;
     modal.style.display = "block";
 }

 // Fungsi untuk menutup modal
 function closeModal() {
     const modal = document.getElementById("imageModal");
     modal.style.display = "none";
 }

 // Menutup modal ketika pengguna mengklik di luar gambar
 window.onclick = function (event) {
     const modal = document.getElementById("imageModal");
     if (event.target == modal) {
         modal.style.display = "none";
     }
 };
// Toggle dropdown menu visibility saat ikon menu diklik
menuIcon.addEventListener("click", function (event) {
    event.stopPropagation(); // Menghentikan event bubbling
    responsiveNav.classList.toggle("active");
});

// Menutup menu ketika mengklik di luar atau pada link di dalam menu
window.addEventListener("click", function (event) {
    const isClickInsideMenu = responsiveNav.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    // Tutup menu jika klik di luar dan menu sedang aktif
    if (
        !isClickInsideMenu &&
        !isClickOnMenuIcon &&
        responsiveNav.classList.contains("active")
    ) {
        responsiveNav.classList.remove("active");
    }
});

// Menutup menu ketika item menu di dalam navigasi responsif diklik
document.querySelectorAll(".responsive-nav a").forEach((item) => {
    item.addEventListener("click", (event) => {
        event.stopPropagation();
        responsiveNav.classList.remove("active");
    });
});

// Mengatur posisi awal underline ke link yang aktif
const activeLink = document.querySelector("nav a.active");
if (activeLink) moveUnderline(activeLink);

// Menambahkan kelas aktif dan memindahkan underline saat link di-klik
navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        navLinks.forEach((link) => link.classList.remove("active")); // Hapus 'active' dari semua link
        this.classList.add("active"); // Tambah 'active' ke link yang diklik
        moveUnderline(this); // Pindahkan underline ke link yang diklik
    });
});

// Smooth scroll reveal animation saat halaman di-scroll
function scrollAnimation() {
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight / 1.3;
        if (sectionTop < triggerPoint) {
            section.classList.add("visible");
        } else {
            section.classList.remove("visible");
        }
    });
}

// Offset scroll position untuk menyesuaikan dengan navbar yang fixed
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // Mencegah perilaku default anchor
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);

        // Hitung offset dengan tinggi navbar
        const navbarHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        // Scroll ke posisi target dengan smooth
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
        });
    });
});

// Menjalankan animasi scroll saat halaman di-scroll
window.addEventListener("scroll", scrollAnimation);
scrollAnimation(); // Memastikan animasi sudah diterapkan saat halaman pertama kali dimuat
