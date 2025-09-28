import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0mWorUy-UkxZLm-GY6txTe8fK36vUqO4",
  authDomain: "pest-control-fb12e.firebaseapp.com",
  projectId: "pest-control-fb12e",
  storageBucket: "pest-control-fb12e.appspot.com",
  messagingSenderId: "900865632802",
  appId: "1:900865632802:web:d55dcb70d276a8d34b787b"
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    
    const loadingMessage = document.getElementById('loading-message');
    const adminContent = document.getElementById('admin-content');
    const usersTableBody = document.querySelector('#users-table tbody');
    const pendingBookingsTableBody = document.querySelector('#pending-bookings-table tbody');
    const completedBookingsTableBody = document.querySelector('#completed-bookings-table tbody');

    // Summary cards
    const totalUsersCountElem = document.getElementById('total-users-count');
    const totalBookingsCountElem = document.getElementById('total-bookings-count');
    const completedBookingsCountElem = document.getElementById('completed-bookings-count');
    const cancelledBookingsCountElem = document.getElementById('cancelled-bookings-count');
    const pendingBookingsCountElem = document.getElementById('pending-bookings-count');
    
    // Sort order variable (default 'desc' matlab nayi booking upar)
    let currentSortOrder = 'desc';

    // User authentication check
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
                const userData = userDocSnap.data();
                const adminName = userData.name || 'Admin';
                document.getElementById('user-display-name').textContent = adminName;
                document.getElementById('side-menu-user-display-name').textContent = adminName;
                
                loadingMessage.style.display = 'none';
                adminContent.style.display = 'block';

                loadAllUsers();
                loadAndDisplayBookings();
                loadBookingStats();

            } else {
                Swal.fire({ icon: 'error', title: 'Access Denied', text: 'You must be an admin to view this page.'})
                .then(() => { window.location.href = 'pest.html'; });
            }
        } else {
            window.location.href = 'pest.html';
        }
    });

    // Function to load all users
    async function loadAllUsers() {
        const querySnapshot = await getDocs(collection(db, "users"));
        if (totalUsersCountElem) totalUsersCountElem.textContent = querySnapshot.size;
        
        usersTableBody.innerHTML = ''; 
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `<td>${userData.name || 'N/A'}</td><td>${userData.email || 'N/A'}</td><td>${userData.mobile || 'N/A'}</td>`;
            usersTableBody.appendChild(row);
        });
    }

    // Sort button ka event listener
    const sortBtn = document.getElementById('sort-bookings-btn');
    if (sortBtn) {
        sortBtn.addEventListener('click', () => {
            // Sort order ko toggle karna (desc -> asc, asc -> desc)
            currentSortOrder = currentSortOrder === 'desc' ? 'asc' : 'desc';
            console.log("New sort order:", currentSortOrder); // Debugging ke liye
            loadAndDisplayBookings(); // Table ko naye order ke saath reload karna
        });
    }

    // Function to load and display all bookings
    async function loadAndDisplayBookings() {
        // Pending Bookings ko fetch karna (naye sort order ke saath)
        const pendingQuery = query(collection(db, "bookings"), where("status", "==", "Scheduled"), orderBy("bookingDate", currentSortOrder));
        const pendingSnapshot = await getDocs(pendingQuery);

        pendingBookingsTableBody.innerHTML = ''; // Table saaf karna
        pendingSnapshot.forEach(doc => {
            const bookingData = doc.data();
            const bookingId = doc.id;
            const row = document.createElement('tr');
            row.setAttribute('data-id', bookingId);
            // Service column ko theek se display karna
            row.innerHTML = `
                <td>${bookingData.userName || 'N/A'}</td>
                <td><div>${bookingData.userEmail || 'N/A'}</div><div>${bookingData.mobile || 'N/A'}</div></td>
                <td>${bookingData.address || ''}, ${bookingData.city || ''} - ${bookingData.pincode || ''}</td>
                <td>${bookingData.services && Array.isArray(bookingData.services) ? bookingData.services.join(', ') : 'N/A'}</td>
                <td><div>${bookingData.bookingDate || 'N/A'}</div><div>${bookingData.timeSlot || 'N/A'}</div></td>
                <td class="status-cell">${bookingData.status || 'N/A'}</td>
                <td><label class="toggle-switch"><input type="checkbox" class="status-toggle"><span class="slider"></span></label></td>
            `;
            pendingBookingsTableBody.appendChild(row);
        });

        // Completed Bookings ko fetch karna (hamesha descending order mein)
        const completedQuery = query(collection(db, "bookings"), where("status", "==", "Completed"), orderBy("bookingDate", "desc"));
        const completedSnapshot = await getDocs(completedQuery);

        completedBookingsTableBody.innerHTML = ''; // Table saaf karna
        completedSnapshot.forEach(doc => {
            const bookingData = doc.data();
            const row = document.createElement('tr');
            // Service column ko theek se display karna
            row.innerHTML = `
                <td>${bookingData.userName || 'N/A'}</td>
                <td><div>${bookingData.userEmail || 'N/A'}</div><div>${bookingData.mobile || 'N/A'}</div></td>
                <td>${bookingData.address || ''}, ${bookingData.city || ''} - ${bookingData.pincode || ''}</td>
                <td>${bookingData.services && Array.isArray(bookingData.services) ? bookingData.services.join(', ') : 'N/A'}</td>
                <td><div>${bookingData.bookingDate || 'N/A'}</div><div>${bookingData.timeSlot || 'N/A'}</div></td>
                <td class="status-cell">${bookingData.status || 'N/A'}</td>
            `;
            completedBookingsTableBody.appendChild(row);
        });

        // Status toggle buttons par event listeners lagana
        document.querySelectorAll('.status-toggle').forEach(toggle => {
            toggle.addEventListener('change', function() {
                const bookingId = this.closest('tr').getAttribute('data-id');
                if (this.checked) {
                    updateBookingStatus(bookingId, 'Completed');
                }
            });
        });
    }
    
    // Function to update booking status
    async function updateBookingStatus(bookingId, newStatus) {
        const bookingDocRef = doc(db, "bookings", bookingId);
        try {
            await updateDoc(bookingDocRef, { status: newStatus });
            loadAndDisplayBookings(); // UI refresh
            loadBookingStats(); // Stats refresh
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    }

    // Function to load booking stats for overview cards
    async function loadBookingStats() {
        try {
            const bookingsCol = collection(db, "bookings");
            if (totalBookingsCountElem) totalBookingsCountElem.textContent = (await getDocs(bookingsCol)).size;
            if (pendingBookingsCountElem) pendingBookingsCountElem.textContent = (await getDocs(query(bookingsCol, where("status", "==", "Scheduled")))).size;
            if (completedBookingsCountElem) completedBookingsCountElem.textContent = (await getDocs(query(bookingsCol, where("status", "==", "Completed")))).size;
            if (cancelledBookingsCountElem) cancelledBookingsCountElem.textContent = (await getDocs(query(bookingsCol, where("status", "==", "Cancelled")))).size;
        } catch (error) {
            console.error("Error loading booking stats:", error);
        }
    }
});