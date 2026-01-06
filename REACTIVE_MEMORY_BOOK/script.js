const pages = document.querySelectorAll(".page");
let current = 0;

function startBook() {
  pages[0].classList.remove("active");
  current = 1;
  showPage(current);
}

function showPage(index) {
  pages[index].classList.add("active");

  const video = pages[index].querySelector("video");
  if (video) {
    video.play().catch(() => {}); // Handle autoplay restrictions gracefully
    video.onended = () => {
      pages[index].classList.remove("active");
      current++;
      if (pages[current]) showPage(current);
    };
  }
}

// Reactive polka dots: Move background position based on mouse (arrow) movement
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100; // Percentage for smooth shift
  const y = (e.clientY / window.innerHeight) * 100;
  pages.forEach(page => {
    page.style.backgroundPosition = `${x}% ${y}%`; // Shifts dots reactively
  });
});
