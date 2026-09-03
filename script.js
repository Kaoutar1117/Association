document.addEventListener("DOMContentLoaded", function () {

  // 1. INITIALISATION EMAILJS
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init("3O5tNY2-qMHJPfTia");
    } catch (e) {
      console.warn("Erreur d'initialisation EmailJS :", e);
    }
  }

  // 2. GESTION DU MODE SOMBRE (DARK MODE)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Restauration du thème enregistré
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
    console.warn("localStorage indisponible.");
  }

  // Événement clic sur le bouton
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');

      if (themeIcon) {
        if (isDarkMode) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }

      try {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      } catch (e) {
        console.warn("Impossible de sauvegarder le thème.");
      }
    });
  }

  // 3. SOUMISSION DU FORMULAIRE VIA EMAILJS
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

      const serviceID = "service_uvn7z8j";
      const templateID = "template_swh41ll";
      const PUBLIC_KEY = "3O5tNY2-qMHJPfTia";

      emailjs
        .sendForm(serviceID, templateID, formInscription, PUBLIC_KEY)
        .then(() => {
          alert("Votre demande d'inscription a bien été envoyée !");
          formInscription.reset();
        })
        .catch((error) => {
          console.error("Erreur d'envoi :", error);
          alert("Une erreur s'est produite lors de l'envoi.");
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
