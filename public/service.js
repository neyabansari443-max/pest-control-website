import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
      apiKey: "AIzaSyA0mWorUy-UkxZLm-GY6txTe8fK36vUqO4",
      authDomain: "pest-control-fb12e.firebaseapp.com",
      projectId: "pest-control-fb12e",
      storageBucket: "pest-control-fb12e.appspot.com",
      messagingSenderId: "900865632802",
      appId: "1:900865632802:web:d55dcb70d276a8d34b787b"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);
    const menuIcon = document.getElementById('menu-icon');
    const sideMenu = document.getElementById('side-menu');
    const closeMenuIcon = document.getElementById('close-menu-icon');
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
    const form = document.getElementById('booking-form');
    const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');
    const residentialDetails = document.getElementById('residential-details');
    const commercialDetails = document.getElementById('commercial-details');
    const residentialSelect = document.getElementById('property-size-res');
    const commercialSelect = document.getElementById('property-size-com'); 
    const customAreaContainer = document.getElementById('custom-area-container');
    const customAreaInput = document.getElementById('custom-area-input');
    const dateInput = document.getElementById('service-date');
    const timeSlots = document.querySelectorAll('.time-slot');
    if(dateInput) {
        dateInput.min = new Date().toISOString().split("T")[0];
    }
    if (form) {
        propertyTypeRadios.forEach(radio => radio.addEventListener('change', handlePropertyTypeChange));
        commercialSelect.addEventListener('change', handlePropertyTypeChange);
        timeSlots.forEach(slot => slot.addEventListener('click', handleTimeSlotSelection));
        form.addEventListener('submit', handleFormSubmit);
    }
    function handlePropertyTypeChange() {
        const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
        const commercialSize = commercialSelect.value;
        if (propertyType === 'residential') {
            if(residentialDetails) residentialDetails.style.display = 'block'; 
            if(commercialDetails) commercialDetails.style.display = 'none';
            if(customAreaContainer) customAreaContainer.style.display = 'none';
        } else { // Commercial
            if(residentialDetails) residentialDetails.style.display = 'none'; 
            if(commercialDetails) commercialDetails.style.display = 'block';
            if (commercialSize === 'custom') {
                if(customAreaContainer) customAreaContainer.style.display = 'block';
            } else {
                if(customAreaContainer) customAreaContainer.style.display = 'none';
            }
        }
    }
    function handleTimeSlotSelection() {
        timeSlots.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    }
    function calculatePrice() {
        let pestsPrice = 0; let basePrice = 0;
        const pestPriceChart = { 'Termite': 1500, 'Bed Bugs': 1800, 'Rodents': 1500, 'Cockroach': 1200, 'Mosquito': 1200, 'Ants': 1200, 'Spiders': 1200, 'Flies': 1200, 'Wood Borer': 1200, 'General': 1200 };
        const selectedPests = Array.from(document.querySelectorAll('input[name="pest"]:checked')).map(cb => cb.value);
        selectedPests.forEach(pestName => { pestsPrice += pestPriceChart[pestName] || 0; });
        const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
        if (propertyType === 'residential') {
            const size = residentialSelect.value;
            switch (size) {
                case '1BHK': basePrice = 800; break; case '2BHK': basePrice = 1000; break; case '3BHK': basePrice = 2000; break; case '4BHK': basePrice = 3000; break; case 'Villa': basePrice = 5000; break; default: basePrice = 0;
            }
        } else { // Commercial
            const size = commercialSelect.value;
            if (size === 'custom') {
                let area = parseInt(customAreaInput.value) || 0;
                basePrice = Math.round(area * 1.5); // Example: 1.5 INR per sq. ft.
            } else {
                switch (size) {
                    case '1000': basePrice = 1000; break; case '2000': basePrice = 1800; break; case '3000': basePrice = 2500; break; default: basePrice = 0;
                }
            }
        }
        let totalPrice = pestsPrice + basePrice;
        if (selectedPests.length === 0) return 0;
        return totalPrice;
    }
    async function handleFormSubmit(e) {
    e.preventDefault();
    const finalBookBtn = document.querySelector('.final-book-btn');
    finalBookBtn.disabled = true;

    // Purane text content ki jagah spinner daalein
    const originalButtonText = finalBookBtn.textContent;
    finalBookBtn.innerHTML = '<div class="loader"></div>';
        const finalPrice = calculatePrice();
        if (finalPrice === 0) {
            alert("Please service select karein.");
            finalBookBtn.disabled = false;
            finalBookBtn.textContent = 'Abhi Apni Booking Confirm Karein';
            return;
        }
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
        const propertySizeValue = (propertyType === 'residential')
            ? document.getElementById('property-size-res').value
            : (document.getElementById('property-size-com').value === 'custom' 
                ? document.getElementById('custom-area-input').value + ' sq. ft.' 
                : document.getElementById('property-size-com').value + ' sq. ft.');
        const bookingData = {
            userId: "anonymous", 
            userName: document.getElementById('full-name').value,
            userEmail: document.getElementById('email-address').value, 
            mobile: document.getElementById('mobile-number').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value,
            services: Array.from(document.querySelectorAll('input[name="pest"]:checked')).map(cb => cb.value),
            propertyType: propertyType,
            propertySize: propertySizeValue,
            bookingDate: document.getElementById('service-date').value,
            timeSlot: selectedTimeSlot ? selectedTimeSlot.dataset.slot : "Not Selected",
            estimatedCost: `₹ ${finalPrice}`,
            status: "Scheduled",
            paymentStatus: "Pending",
            createdAt: serverTimestamp()
        };
        try {
             await addDoc(collection(db, "bookings"), bookingData);
            // alert ko isse badal dein
            Swal.fire({
                icon: 'success',
                title: 'Booking Confirmed!',
                text: 'Our team will contact you soon',
                confirmButtonColor: '#8A2BE2'
                });
            form.reset();
            timeSlots.forEach(s => s.classList.remove('selected'));
            if(customAreaContainer) customAreaContainer.style.display = 'none';
        } catch (error) {
            console.error("Error saving booking: ", error);
            // alert ko isse badal dein
            Swal.fire({
                icon: 'error',
                title: 'Oops... Error!',
                text: 'Booking save karne mein error aa gaya. Please dobara try karein.',
                confirmButtonColor: '#8A2BE2'
            });
        } finally {
            finalBookBtn.disabled = false;
            finalBookBtn.textContent = 'Abhi Apni Booking Confirm Karein';
            finalBookBtn.innerHTML = originalButtonText;
        }
    }
const adminLoginModal = document.getElementById('admin-login-modal');
const openAdminModalLinks = document.querySelectorAll('.open-admin-modal-link');
const adminLoginButton = document.getElementById('admin-login-button');
const closeModalButton = adminLoginModal.querySelector('.close-modal');
openAdminModalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (adminLoginModal) adminLoginModal.style.display = 'flex';
    });
});
if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
        if (adminLoginModal) adminLoginModal.style.display = 'none';
    });
}
if (adminLoginButton) {
    adminLoginButton.addEventListener('click', () => {
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;
        if (!email || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Please enter both email and password.',
                confirmButtonColor: '#8A2BE2'
            });
            return;
        }
        
        // Disable button and show loader
        adminLoginButton.disabled = true;
        adminLoginButton.innerHTML = '<div class="loader"></div>';

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userDocRef = doc(db, "users", user.uid);
                return getDoc(userDocRef); // Return the promise
            })
            .then(docSnap => {
                if (docSnap.exists() && docSnap.data().role === 'admin') {
                    // Success Alert (auto-redirecting)
                    Swal.fire({
                        icon: 'success',
                        title: 'Login Successful!',
                        text: 'Redirecting to the admin panel...',
                        timer: 2000, // 2 seconds
                        showConfirmButton: false
                    }).then(() => {
                        window.location.href = 'admin.html';
                    });
                } else {
                    // Not an Admin Alert
                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied',
                        text: 'You are not authorized to access the admin panel.',
                        confirmButtonColor: '#8A2BE2'
                    });
                    auth.signOut();
                    adminLoginButton.disabled = false;
                    adminLoginButton.textContent = 'Login';
                }
            })
            .catch((error) => {
                // Login Failed Alert
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Please check your email and password.',
                    confirmButtonColor: '#8A2BE2'
                });
                adminLoginButton.disabled = false;
                adminLoginButton.textContent = 'Login';
            });
    });
}
const toggleAdminPassword = document.getElementById('toggle-admin-password');
const adminPasswordInput = document.getElementById('admin-password');
if (toggleAdminPassword && adminPasswordInput) {
    toggleAdminPassword.addEventListener('click', function () {
        const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        adminPasswordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash'); // Icon change karein
    });
}
});