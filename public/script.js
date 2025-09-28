// ==========================================================
// PEST.HTML (HOMEPAGE) - FINAL AND COMPLETE SCRIPT
// ==========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    // Firebase project ka configuration
    const firebaseConfig = {
      apiKey: "AIzaSyA0mWorUy-UkxZLm-GY6txTe8fK36vUqO4",
      authDomain: "pest-control-fb12e.firebaseapp.com",
      projectId: "pest-control-fb12e",
      storageBucket: "pest-control-fb12e.appspot.com",
      messagingSenderId: "900865632802",
      appId: "1:900865632802:web:d55dcb70d276a8d34b787b"
    };
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // ===================================
    // Element Selectors
    // ===================================
    const userProfile = document.getElementById('user-profile');
    const userInitial = document.getElementById('user-initial');
    const userDisplayName = document.getElementById('user-display-name');
    const navbarLogoutButton = document.getElementById('navbar-logout-button');
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');
    const closeMenuIcon = document.getElementById('close-menu-icon');
    const sideMenuUserProfile = document.getElementById('side-menu-user-profile');
    const sideMenuUserInitial = document.getElementById('side-menu-user-initial');
    const sideMenuUserDisplayName = document.getElementById('side-menu-user-display-name');
    const sideMenuLogoutButton = document.getElementById('side-menu-logout-button');
    const allServiceCardFlippers = document.querySelectorAll('.service-card-flipper');
    const fabMainButton = document.getElementById('fab-main-button');
    const fabContainer = document.querySelector('.fab-container');
    const adminLoginModal = document.getElementById('admin-login-modal');

    // ===================================
    // Hamburger Menu Logic
    // ===================================
    if(menuIcon) {
        menuIcon.addEventListener('click', () => {
            if(sideMenu) sideMenu.classList.add('active');
        });
    }
    if(closeMenuIcon) {
        closeMenuIcon.addEventListener('click', () => {
            if(sideMenu) sideMenu.classList.remove('active');
        });
    }

    // ===================================
    // User Authentication State Change
    // ===================================
    onAuthStateChanged(auth, user => {
        if (user) {
            // User Logged In
            const name = user.displayName || 'User';
            const initial = name.charAt(0).toUpperCase();

            if (userProfile) userProfile.style.display = 'flex';
            if (userInitial) userInitial.textContent = initial;
            if (userDisplayName) userDisplayName.textContent = name;
            if (navbarLogoutButton) navbarLogoutButton.style.display = 'block';

            if (sideMenuUserProfile) sideMenuUserProfile.style.display = 'flex';
            if (sideMenuUserInitial) sideMenuUserInitial.textContent = initial;
            if (sideMenuUserDisplayName) sideMenuUserDisplayName.textContent = name;

        } else {
            // User Logged Out
            if (userProfile) userProfile.style.display = 'none';
            if (navbarLogoutButton) navbarLogoutButton.style.display = 'none';
            if (sideMenuUserProfile) sideMenuUserProfile.style.display = 'none';
        }
    });

    // ===================================
    // Logout Logic
    // ===================================
    const handleLogout = () => {
        signOut(auth).catch(error => console.error('Sign out error:', error));
    };
    if(navbarLogoutButton) navbarLogoutButton.addEventListener('click', handleLogout);
    if(sideMenuLogoutButton) sideMenuLogoutButton.addEventListener('click', handleLogout);

    // ===================================
    // Card Flip Logic
    // ===================================
    allServiceCardFlippers.forEach(flipper => {
        flipper.addEventListener('click', () => {
            const card = flipper.querySelector('.service-card');
            const isFlipped = card.classList.contains('is-flipped');
            
            // Un-flip all cards first
            allServiceCardFlippers.forEach(otherFlipper => {
                otherFlipper.querySelector('.service-card').classList.remove('is-flipped');
            });
            
            // Flip the clicked card only if it wasn't already flipped
            if (!isFlipped) {
                card.classList.add('is-flipped');
            }
        });
    });

   
    // ===================================
    // Admin Login Modal Logic
    // ===================================
    if (adminLoginModal) {
        const openAdminModalLinks = document.querySelectorAll('.open-admin-modal-link');
        const adminLoginButton = document.getElementById('admin-login-button');
        const closeModalButton = adminLoginModal.querySelector('.close-modal');
        const toggleAdminPassword = document.getElementById('toggle-admin-password');
        const adminPasswordInput = document.getElementById('admin-password');

        openAdminModalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (sideMenu) sideMenu.classList.remove('active');
                adminLoginModal.style.display = 'flex';
            });
        });

        if (closeModalButton) {
            closeModalButton.addEventListener('click', () => {
                adminLoginModal.style.display = 'none';
            });
        }
        
        if (adminLoginButton) {
            adminLoginButton.addEventListener('click', async () => {
                const email = document.getElementById('admin-email').value;
                const password = document.getElementById('admin-password').value;

                if (!email || !password) {
                    alert("Please enter both email and password.");
                    return;
                }

                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    const userDocRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(userDocRef);

                   if (docSnap.exists() && docSnap.data().role === 'admin') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Redirecting to the admin dashboard...',
                        timer: 2000, // 2 second ka timer
                        showConfirmButton: false // "OK" button chhupa dega
                    }).then(() => {
                        window.location.href = 'admin.html';
                    });
                } else { //...
                        alert("You are not authorized to access the admin panel.");
                        await signOut(auth);
                    }
                } catch (error) {
                    alert("Login Failed: Wrong email or password.");
                    console.error("Login error details:", error);
                }
            });
        }

        if (toggleAdminPassword && adminPasswordInput) {
            toggleAdminPassword.addEventListener('click', function () {
                const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                adminPasswordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            });

        }
    }
});
// script.js mein aakhir mein diye gaye code ko isse replace karein

    // ===================================
    // FINAL - Hero Slider Logic
    // ===================================
    const slides = document.querySelectorAll('.hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        // Pehle slide ko active karein
        slides[currentSlide].classList.add('active');

        setInterval(() => {
            // Puraane slide se active class hatayein
            slides[currentSlide].classList.remove('active');
            
            // Agle slide par jaayein
            currentSlide = (currentSlide + 1) % slides.length;

            // Naye slide par active class lagayein
            slides[currentSlide].classList.add('active');
        }, 3000); // Har 3 second mein
    }