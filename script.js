document.addEventListener("DOMContentLoaded", function () {
  
  const PUBLIC_KEY = "3O5tNY2-qMHJPfTia";
  const SERVICE_ID = "service_uvn7z8j";
  const TEMPLATE_ID = "template_swh41ll";

  // 1. Initialisation sécurisée d'EmailJS
  if (typeof emailjs !== "undefined") {
    try {
      emailjs.init(PUBLIC_KEY);
    } catch (e) {
      console.warn("Erreur d'initialisation EmailJS :", e);
    }
  }

  // 2. Gestion du Mode Sombre (Dark Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

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
    console.warn("localStorage non accessible.");
  }

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
        console.warn("Impossible de sauvegarder dans localStorage.");
      }
    });
  }

  // 3. Soumission du Formulaire d'Inscription
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

      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formInscription, PUBLIC_KEY)
        .then(() => {
          alert("Votre demande d'inscription a bien été envoyée !");
          formInscription.reset();
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi EmailJS :", error);
          alert("Une erreur s'est produite lors de l'envoi. Vérifiez vos identifiants EmailJS ou réessayez plus tard.");
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
