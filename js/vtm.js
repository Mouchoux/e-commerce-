function showSection(sectionId, button) {
  document.querySelectorAll(".catalogue-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  button.classList.add("active");
}
