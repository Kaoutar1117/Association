document.addEventListener("DOMContentLoaded", function () {
  
  // ==========================================
  // 1. INITIALISATION EMAILJS
  // ==========================================
  // Remplacez "YOUR_PUBLIC_KEY" par votre clé publique EmailJS
  if (typeof emailjs !== "undefined") {
    emailjs.init("YOUR_PUBLIC_KEY");
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

    // Fermer le menu lors du clic sur un lien
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==========================================
  // 3. GESTION DYNAMIQUE DU FORMULAIRE D'INSCRIPTION
  // ==========================================
  const selectCours = document.getElementById("cours");
  const sectionEnfant = document.getElementById("section-enfant");
  const inputsEnfant = sectionEnfant ? sectionEnfant.querySelectorAll("input") : [];
  const formInscription = document.getElementById("formInscription");
  const btnSubmit = document.getElementById("btnSubmit");

  // Liste des cours nécessitant les informations d'un enfant
  const coursPourEnfant = ["Soutien Scolaire", "Mathématiques"];

  if (selectCours && sectionEnfant) {
    selectCours.addEventListener("change", function () {
      const valeurSelectionnee = selectCours.value;

      // Vérifie si le cours sélectionné est dans la liste des cours pour enfants
      if (coursPourEnfant.includes(valeurSelectionnee)) {
        sectionEnfant.style.display = "block";
        // Rendre les champs obligatoires
        inputsEnfant.forEach((input) => input.setAttribute("required", "true"));
      } else {
        sectionEnfant.style.display = "none";
        // Retirer le caractère obligatoire et réinitialiser la valeur
        inputsEnfant.forEach((input) => {
          input.removeAttribute("required");
          input.value = "";
        });
      }
    });
  }

  // ==========================================
  // 4. SOUMISSION ET ENVOI PAR EMAILJS
  // ==========================================
  if (formInscription) {
    formInscription.addEventListener("submit", function (e) {
      e.preventDefault();

      // Changement du bouton durant l'envoi
      const originalText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours...';

      // Identifiants EmailJS (à remplacer par les vos propres clés)
      const serviceID = "service_uvn7z8j";
      const templateID = "template_swh41ll";
      const PUBLIC_KEY = "3O5tNY2-qMHJPfTia";

      // Envoi du formulaire via EmailJS
      emailjs
        .sendForm(serviceID, templateID, formInscription,PUBLIC_KEY)
        .then(() => {
          alert("Votre demande d'inscription a bien été envoyée ! Nous vous contacterons rapidement.");
          formInscription.reset();
          if (sectionEnfant) sectionEnfant.style.display = "none";
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi :", error);
          alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou nous contacter directement.");
        })
        .finally(() => {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = originalText;
        });
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // 1. Lecture sécurisée du thème enregistré
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    }
  } catch (e) {
    console.warn("localStorage non accessible dans cet environnement.");
  }

  // 2. Basculement au clic
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');

      // Changement de l'icône
      if (themeIcon) {
        if (isDarkMode) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }

      // 3. Sauvegarde sécurisée
      try {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      } catch (e) {
        console.warn("Impossible de sauvegarder dans localStorage.");
      }
    });
  }
});
