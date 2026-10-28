document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVIGATION FIXE AU DÉFILEMENT ---
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-liens a');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Effet de fondu pour la navbar
        if (scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Gestion du lien actif en fonction de la section visible
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Décalage pour éviter la navbar
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. SCROLL FLUIDE ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le saut instantané
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Calcul précis de la position avec décalage pour la navbar
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. ANIMATION DES STATISTIQUES (INTERSECTION OBSERVER) ---
    const statsBoxes = document.querySelectorAll('.stat-carte strong');
    
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                // Si le texte contient un nombre (ex: "+23", "2000")
                const numberMatch = text.match(/(\d+)/);
                if (numberMatch) {
                    const finalNumber = parseInt(numberMatch[0]);
                    let currentNumber = 0;
                    const increment = finalNumber / 50; // Vitesse de l'animation
                    
                    const updateNumber = () => {
                        currentNumber += increment;
                        if (currentNumber < finalNumber) {
                            target.textContent = text.replace(/\d+/, Math.floor(currentNumber));
                            requestAnimationFrame(updateNumber);
                        } else {
                            target.textContent = text; // Remet le texte final (ex: +23, 2000)
                        }
                    };
                    updateNumber();
                }
                statsObserver.unobserve(target); // Arrête l'observation une fois animé
            }
        });
    }, observerOptions);

    statsBoxes.forEach(box => {
        statsObserver.observe(box);
    });

    // --- 4. EFFET VISUEL SUPPLÉMENTAIRE : HOVER SUR LES CARTES ---
    // Ajoute une petite ombre dynamique quand on passe la souris sur une carte
    document.querySelectorAll('.filiere-carte, .labo-carte, .actu-carte, .stat-carte, .etape-carte, .heb-carte').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
            card.style.transition = 'all 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px)';
            card.style.boxShadow = '0 4px 12px var(--ombre-douce)';
        });
    });

    // --- 5. MENU HAMBURGER ---
const hamburger = document.getElementById('hamburger');
const navLiens = document.querySelector('.nav-liens');

hamburger.addEventListener('click', function() {
    // Toggle l'affichage du menu
    navLiens.classList.toggle('open');

    // Mise à jour de l'attribut aria-expanded pour l'accessibilité
    const isOpen = navLiens.classList.contains('open');
    this.setAttribute('aria-expanded', isOpen);
});

// Fermer le menu quand on clique sur un lien (mobile)
navLiens.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLiens.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});
});
