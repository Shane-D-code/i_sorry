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
      setTimeout(() => {
        pages[index].classList.remove("active");
        current++;
        if (pages[current]) showPage(current);
      }, 1000); // 1-second delay before advancing
    };
  } else if (index === pages.length - 1) { // Last page (polaroid page)
    // Show the sorry modal after a short delay
    setTimeout(() => {
      document.getElementById("sorryModal").style.display = "block";
    }, 2000); // 2 seconds after page loads
  }
}

// Reactive polka dots and stars: Move background position based on mouse (arrow) movement
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100; // Percentage for smooth shift
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.setProperty('--bg-pos-x', `${x}%`);
  document.body.style.setProperty('--bg-pos-y', `${y}%`);
});
