document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // CONFIGURATION EMAILJS
  // ==========================================
  const PUBLIC_KEY = "3O5tNY2-qMHJPfTia";
  const SERVICE_ID = "service_uvn7z8j";
  const TEMPLATE_ID = "template_swh41ll";

  // Initialisation sécurisée
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init(PUBLIC_KEY);
    } catch (e) {
      console.warn("Erreur d'initialisation EmailJS :", e);
    }
  }

  // ==========================================
  // 1. GESTION DU MODE SOMBRE (DARK MODE)
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Restauration du thème sauvegardé
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      if (themeIcon) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
      }
    }
  } catch (e) {
    console.warn("localStorage non accessible.");
  }

  // Clic sur le bouton de thème
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");

      if (themeIcon) {
        if (isDarkMode) {
          themeIcon.classList.remove("fa-moon");
          themeIcon.classList.add("fa-sun");
        } else {
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        }
      }

      try {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      } catch (e) {
        console.warn("Impossible de sauvegarder dans localStorage.");
      }
    });
  }

  // ==========================================
  // 2. GESTION DU MENU MOBILE (NAVBAR)
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
  // 3. AFFICHAGE DYNAMIQUE DES CHAMPS ENFANT
  // ==========================================
  const selectCours = document.getElementById("cours-select");
  const sectionEnfant = document.querySelector(".form-fieldset-enfant");
  const inputsEnfant = sectionEnfant ? sectionEnfant.querySelectorAll("input") : [];

  // Cours nécessitant la saisie des infos enfant
  const coursPourEnfant = ["Soutien Scolaire", "Mathématiques"];

  if (selectCours && sectionEnfant) {
    selectCours.addEventListener("change", function () {
      const valeurSelectionnee = selectCours.value;

      if (coursPourEnfant.includes(valeurSelectionnee)) {
        sectionEnfant.style.display = "block";
      } else {
        sectionEnfant.style.display = "block"; // Garde visible si souhaité, ou bascule sur "none"
      }
    });
  }

  // ==========================================
  // 4. SOUMISSION DU FORMULAIRE D'INSCRIPTION
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

      // Construction explicite des données pour le template EmailJS
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

      // Envoi sécurisé des paramètres
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(() => {
          alert("Votre demande d'inscription a bien été envoyée ! Nous vous contacterons rapidement.");
          formInscription.reset();
        })
        .catch((error) => {
          console.error("Erreur d'envoi EmailJS :", error);
          alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
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
