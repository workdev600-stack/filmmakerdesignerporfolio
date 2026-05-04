
 const loadComponent = async (id, file) => {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(res.status);

    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    if (id === "nav") initScrollSpy(); 
    if (id === "work") initFilter();

  } catch (err) {
    console.error(`Error loading ${file}:`, err);
  }
};

  loadComponent("nav", "./components/nav.html");
  loadComponent("hero", "./components/hero.html");
  loadComponent("services", "./components/services.html");
  loadComponent("work", "./components/work.html");
  loadComponent("about", "./components/about.html");
  loadComponent("faq", "./components/faq.html");
  loadComponent("footer", "./components/footer.html");
  function initScrollSpy() {
  const sections = document.querySelectorAll("body > div[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-link");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active-link");
      }
    });
  }

  window.addEventListener("scroll", setActiveLink);
  setActiveLink();  
}
function initFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll("[data-category]");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      // active button
      filterButtons.forEach(b => {
        b.classList.remove("border-primary", "opacity-100");
        b.classList.add("opacity-40");
      });

      btn.classList.add("border-primary", "opacity-100");
      btn.classList.remove("opacity-40");

      // filtering
      projects.forEach((project) => {
        const category = project.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });
}
