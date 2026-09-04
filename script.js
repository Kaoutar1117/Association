document.addEventListener("DOMContentLoaded", function () {


 

  // ==========================================
  // 1. GESTION DU MENU MOBILE (NAVBAR)
  // ==========================================
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==========================================
  // 2. GESTION DE LA MODALE GALERIE / ARTICLE
  // ==========================================
  const modal = document.getElementById("galerieModal");
  const galerieItems = document.querySelectorAll(".galerie-item");
  const spanFermer = document.querySelector(".modal-fermer");

  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalArticle = document.getElementById("modalArticle");

  if (modal && galerieItems.length > 0) {
    galerieItems.forEach(item => {
      item.addEventListener("click", function () {
        const imgSrc = this.getAttribute("data-img");
        const title = this.getAttribute("data-title");
        const desc = this.getAttribute("data-desc");
        const article = this.getAttribute("data-article");

        if (modalImg) modalImg.src = imgSrc;
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalArticle) modalArticle.textContent = article;

        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Empêche le défilemet de la page en arrière-plan
      });
    });

    if (spanFermer) {
      spanFermer.addEventListener("click", fermerModal);
    }

    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        fermerModal();
      }
    });
  }

  function fermerModal() {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // ==========================================
  // 3. SOUMISSION DU FORMULAIRE D'INSCRIPTION
  // ==========================================
  const formInscription = document.getElementById("formInscription");
  const btnSubmit = document.getElementById("btnSubmit");

  if (formInscription) {
    formInscription.addEventListener("submit", function (e) {
      e.preventDefault();

      const originalText = btnSubmit ? btnSubmit.innerHTML : "";
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';
      }

      const templateParams = {
        nom: document.getElementById("nom") ? document.getElementById("nom").value : "",
        prenom: document.getElementById("prenom") ? document.getElementById("prenom").value : "",
        email: document.getElementById("email") ? document.getElementById("email").value : "",
        telephone: document.getElementById("telephone") ? document.getElementById("telephone").value : "",
        cours: document.getElementById("cours-select") ? document.getElementById("cours-select").value : "",
        nom_enfant: document.getElementById("nom-enfant") && document.getElementById("nom-enfant").value 
          ? document.getElementById("nom-enfant").value 
          : "Non renseigné",
        prenom_enfant: document.getElementById("prenom-enfant") && document.getElementById("prenom-enfant").value 
          ? document.getElementById("prenom-enfant").value 
          : "Non renseigné",
        classe: document.getElementById("classe") && document.getElementById("classe").value 
          ? document.getElementById("classe").value 
          : "Non renseignée"
      };

      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(() => {
          alert("Votre demande d'inscription a bien été envoyée ! Nous vous contacterons rapidement.");
          formInscription.reset();
        })
        .catch((error) => {
          console.error("Erreur d'envoi EmailJS :", error);
          alert("Une erreur s'est produite lors de l'envoi. Veuillez vérifier votre console.");
        })
        .finally(() => {
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = originalText;
          }
        });
    });
  }
});
