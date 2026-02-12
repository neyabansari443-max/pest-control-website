"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Booking {
    id: string;
    userName: string;
    userEmail: string;
    mobile: string;
    address: string;
    city: string;
    pincode: string;
    services: string[];
    bookingDate: string;
    timeSlot: string;
    status: string;
    estimatedCost: string;
}

interface UserData {
    name: string;
    email: string;
    mobile: string;
}

export default function AdminDashboardClient() {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
    const [completedBookings, setCompletedBookings] = useState<Booking[]>([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
    });
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const router = useRouter();

    const getFirebase = async () => {
        const [
            { collection, query, where, getDocs, doc, getDoc, updateDoc, setDoc, orderBy },
            { onAuthStateChanged },
            { auth, db },
        ] = await Promise.all([
            import("firebase/firestore"),
            import("firebase/auth"),
            import("@/lib/firebase"),
        ]);

        return {
            collection,
            query,
            where,
            getDocs,
            doc,
            getDoc,
            updateDoc,
            setDoc,
            orderBy,
            onAuthStateChanged,
            auth,
            db,
        };
    };

    const getSwal = async () => (await import("sweetalert2")).default;

    useEffect(() => {
        let unsubscribe = () => { };
        const initAuth = async () => {
            const { onAuthStateChanged, doc, getDoc, auth, db } = await getFirebase();
            unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists() && userDocSnap.data().role === "admin") {
                        loadData();
                    } else {
                        const Swal = await getSwal();
                        Swal.fire({
                            icon: "error",
                            title: "Access Denied",
                            text: "You must be an admin to view this page.",
                            background: '#141623',
                            color: '#fff',
                            confirmButtonColor: '#4d7cff'
                        }).then(() => {
                            router.push("/");
                        });
                    }
                } else {
                    router.push("/");
                }
            });
        };

        initAuth();
        return () => unsubscribe();
    }, [router]);

    const [pricingData, setPricingData] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("pests");

    // ... existing loadData ...
    const loadUsers = async () => {
        try {
            const { collection, getDocs, db } = await getFirebase();
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersList: UserData[] = [];
            querySnapshot.forEach((docItem) => {
                const data = docItem.data();
                usersList.push({
                    name: data.name,
                    email: data.email,
                    mobile: data.mobile,
                });
            });
            setUsers(usersList);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    const loadBookings = async () => {
        try {
            const { collection, query, where, getDocs, orderBy, db } = await getFirebase();
            const pendingQuery = query(
                collection(db, "bookings"),
                where("status", "==", "Scheduled"),
                orderBy("bookingDate", sortOrder)
            );
            const pendingSnapshot = await getDocs(pendingQuery);
            const pendingList: Booking[] = [];
            pendingSnapshot.forEach((docItem) => {
                pendingList.push({ id: docItem.id, ...docItem.data() } as Booking);
            });
            setPendingBookings(pendingList);

            const completedQuery = query(
                collection(db, "bookings"),
                where("status", "==", "Completed"),
                orderBy("bookingDate", "desc")
            );
            const completedSnapshot = await getDocs(completedQuery);
            const completedList: Booking[] = [];
            completedSnapshot.forEach((docItem) => {
                completedList.push({ id: docItem.id, ...docItem.data() } as Booking);
            });
            setCompletedBookings(completedList);
        } catch (error) {
            console.error("Error loading bookings:", error);
        }
    };

    const loadStats = async () => {
        try {
            const { collection, query, where, getDocs, db } = await getFirebase();
            const bookingsCol = collection(db, "bookings");
            const totalBookingsSnap = await getDocs(bookingsCol);
            const pendingSnap = await getDocs(
                query(bookingsCol, where("status", "==", "Scheduled"))
            );
            const completedSnap = await getDocs(
                query(bookingsCol, where("status", "==", "Completed"))
            );
            const cancelledSnap = await getDocs(
                query(bookingsCol, where("status", "==", "Cancelled"))
            );

            const usersSnap = await getDocs(collection(db, "users"));

            setStats({
                totalUsers: usersSnap.size,
                totalBookings: totalBookingsSnap.size,
                pendingBookings: pendingSnap.size,
                completedBookings: completedSnap.size,
                cancelledBookings: cancelledSnap.size,
            });
        } catch (error) {
            console.error("Error loading stats:", error);
        }
    };

    const loadPricing = async () => {
        try {
            const { doc, getDoc, setDoc, db } = await getFirebase();
            const pricingRef = doc(db, "pricing", "default");
            const pricingSnap = await getDoc(pricingRef);

            if (pricingSnap.exists()) {
                const pricingPayload = pricingSnap.data();
                const mergedPricing = {
                    ...pricingPayload,
                    settings: {
                        showEstimate: false,
                        ...(pricingPayload.settings || {}),
                    },
                };
                setPricingData(mergedPricing);
            } else {
                // Seed default data
                const defaultPricing = {
                    settings: {
                        showEstimate: false,
                    },
                    pests: {
                        Termite: 1500, "Bed Bugs": 1800, Rodents: 1500, Cockroach: 1200,
                        Mosquito: 1200, Ants: 1200, Spiders: 1200, Flies: 1200,
                        "Wood Borer": 1200, General: 1200
                    },
                    residential: {
                        "1BHK": 800, "2BHK": 1000, "3BHK": 2000, "4BHK": 3000, "Villa": 5000
                    },
                    commercial: {
                        "1000": 1000, "2000": 1800, "3000": 2500, "customMultiplier": 1.5
                    }
                };
                await setDoc(pricingRef, defaultPricing);
                setPricingData(defaultPricing);
                setPricingData(defaultPricing);
            }
        } catch (error) {
            console.error("Error loading pricing:", error);
        }
    };

    const initializePricing = async () => {
        try {
            const { doc, setDoc, db } = await getFirebase();
            const pricingRef = doc(db, "pricing", "default");

            // Default data structure
            const defaultPricing = {
                settings: {
                    showEstimate: false,
                },
                pests: {
                    Termite: 1500, "Bed Bugs": 1800, Rodents: 1500, Cockroach: 1200,
                    Mosquito: 1200, Ants: 1200, Spiders: 1200, Flies: 1200,
                    "Wood Borer": 1200, General: 1200
                },
                residential: {
                    "1BHK": 800, "2BHK": 1000, "3BHK": 2000, "4BHK": 3000, "Villa": 5000
                },
                commercial: {
                    "1000": 1000, "2000": 1800, "3000": 2500, "customMultiplier": 1.5
                }
            };

            await setDoc(pricingRef, defaultPricing);
            setPricingData(defaultPricing);

            const Swal = await getSwal();
            Swal.fire({
                icon: "success",
                title: "Initialized!",
                text: "Default pricing has been set successfully.",
                timer: 1500,
                showConfirmButton: false,
                background: '#141623',
                color: '#fff'
            });
        } catch (error: any) {
            console.error("Error initializing pricing:", error);
            const Swal = await getSwal();
            Swal.fire({
                icon: "error",
                title: "Initialization Failed",
                text: error.message || "Failed to set default pricing.",
                background: '#141623',
                color: '#fff'
            });
        }
    };

    const loadData = async () => {
        setLoading(true);
        try {
            await Promise.all([loadUsers(), loadBookings(), loadStats(), loadPricing()]);
        } catch (error) {
            console.error("Error initializing dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePriceChange = (category: string, key: string, value: string) => {
        setPricingData((prev: any) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: parseFloat(value) || 0
            }
        }));
    };

    const toggleEstimateVisibility = () => {
        setPricingData((prev: any) => ({
            ...(prev || {}),
            settings: {
                ...(prev?.settings || {}),
                showEstimate: !prev?.settings?.showEstimate,
            },
        }));
    };

    const savePricing = async () => {
        try {
            const { doc, setDoc, db } = await getFirebase();
            const pricingRef = doc(db, "pricing", "default");
            await setDoc(pricingRef, pricingData);

            const Swal = await getSwal();
            Swal.fire({
                icon: "success",
                title: "Pricing Updated",
                text: "The new prices have been saved successfully.",
                timer: 1500,
                showConfirmButton: false,
                background: '#141623',
                color: '#fff'
            });
        } catch (error) {
            console.error("Error saving pricing:", error);
            const Swal = await getSwal();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to save pricing.",
                background: '#141623',
                color: '#fff'
            });
        }
    };

    // ... existing toggleSortOrder, useEffect, markAsCompleted ...
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };

    useEffect(() => {
        if (!loading) loadBookings();
    }, [sortOrder]);

    const markAsCompleted = async (bookingId: string) => {
        try {
            const { doc, updateDoc, db } = await getFirebase();
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, { status: "Completed" });
            loadData();
            const Swal = await getSwal();
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Booking marked as completed.",
                timer: 1500,
                showConfirmButton: false,
                background: '#141623',
                color: '#fff'
            });
        } catch (error) {
            console.error("Error updating status:", error);
            const Swal = await getSwal();
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update status",
                background: '#141623',
                color: '#fff',
                confirmButtonColor: '#4d7cff'
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[color:var(--background)]">
                <div className="loader"></div>
                <p className="mt-4 text-[color:var(--accent)] font-semibold text-lg animate-pulse">
                    Authenticating & Loading Data...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[color:var(--background)] p-6 md:p-10 pt-24 md:pt-32 relative overflow-hidden text-white">

            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[color:var(--secondary)]/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-[color:var(--accent)]/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                            <i className="fas fa-shield-alt text-[color:var(--accent)]"></i> Admin Command Center
                        </h1>
                        <p className="text-gray-400 mt-2">Manage your bookings, users, and pricing.</p>
                    </div>
                </header>

                {/* --- 1. Overview Cards --- */}
                <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {[
                        { title: "Total Users", value: stats.totalUsers, icon: "fa-users", color: "text-blue-400" },
                        { title: "Total Bookings", value: stats.totalBookings, icon: "fa-calendar-alt", color: "text-purple-400" },
                        { title: "Pending", value: stats.pendingBookings, icon: "fa-clock", color: "text-yellow-400" },
                        { title: "Completed", value: stats.completedBookings, icon: "fa-check-circle", color: "text-green-400" },
                        { title: "Cancelled", value: stats.cancelledBookings, icon: "fa-times-circle", color: "text-red-400" },
                    ].map((stat, idx) => (
                        <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 bg-[rgba(20,22,35,0.7)] flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
                            <i className={`fas ${stat.icon} ${stat.color} text-3xl mb-3 opacity-80`}></i>
                            <h4 className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">{stat.title}</h4>
                            <p className={`text-4xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </section>

                {/* --- Pricing Management Section --- */}
                <section className="mb-12">
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[rgba(11,12,18,0.7)]">
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 p-4 md:p-6 border-b border-white/10 gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-tags text-pink-400"></i> Manage Pricing
                            </h2>
                            <div className="grid grid-cols-2 gap-2 w-full md:w-auto md:flex md:items-center md:gap-4">
                                <button
                                    type="button"
                                    onClick={toggleEstimateVisibility}
                                    disabled={!pricingData}
                                    className={`px-2 py-2 md:px-4 rounded-lg border text-xs md:text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center ${pricingData?.settings?.showEstimate
                                        ? "bg-[color:var(--accent)]/20 border-[color:var(--accent)] text-[color:var(--accent)]"
                                        : "bg-white/5 border-white/10 text-gray-300 hover:text-white"
                                        }`}
                                >
                                    <i className={`fas ${pricingData?.settings?.showEstimate ? "fa-toggle-on" : "fa-toggle-off"} mr-1 md:mr-2`}></i>
                                    {pricingData?.settings?.showEstimate ? "Est: On" : "Est: Off"}
                                </button>
                                <button
                                    onClick={savePricing}
                                    className="px-2 py-2 md:px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-colors flex justify-center items-center gap-2 shadow-lg shadow-green-500/20 text-xs md:text-sm"
                                >
                                    <i className="fas fa-save"></i> Save
                                </button>
                            </div>
                        </div>

                        <div className="p-4 md:p-6">
                            {/* Tabs */}
                            <div className="flex border-b border-white/10 mb-6 gap-4 md:gap-6 overflow-x-auto">
                                {['pests', 'residential', 'commercial'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`pb-3 px-2 text-xs md:text-sm font-bold uppercase tracking-wide transition-colors relative whitespace-nowrap ${activeTab === tab
                                            ? "text-[color:var(--accent)]"
                                            : "text-gray-400 hover:text-white"
                                            }`}
                                    >
                                        {tab}
                                        {activeTab === tab && (
                                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[color:var(--accent)] rounded-full"></div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            {pricingData ? (
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                                    {Object.entries(pricingData[activeTab] || {}).map(([key, value]) => (
                                        <div key={key} className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                                            <label className="block text-gray-400 text-[10px] md:text-xs uppercase font-bold mb-1 md:mb-2 truncate" title={key.replace(/([A-Z])/g, ' $1').trim()}>
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs md:text-sm">₹</span>
                                                <input
                                                    type="number"
                                                    value={value as number}
                                                    onChange={(e) => handlePriceChange(activeTab, key, e.target.value)}
                                                    className="w-full pl-6 md:pl-8 pr-2 md:pr-4 py-1.5 md:py-2 bg-black/20 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-[color:var(--accent)] transition-colors"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 mb-4">No pricing data found. Please try reloading or initialize defaults.</p>
                                    <button
                                        onClick={initializePricing}
                                        className="px-6 py-2 bg-[color:var(--accent)] text-white font-bold rounded-lg hover:bg-[color:var(--accent)]/80 transition-colors"
                                    >
                                        Initialize Default Pricing
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* --- 2. Pending Bookings Table --- */}
                <section className="mb-12">
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[rgba(11,12,18,0.7)]">
                        <div className="flex flex-wrap justify-between items-center bg-white/5 p-6 border-b border-white/10 gap-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-hourglass-half text-yellow-400"></i> Pending Action
                            </h2>
                            <button
                                onClick={toggleSortOrder}
                                className="px-4 py-2 bg-[rgba(123,92,255,0.1)] border border-[color:var(--accent)]/30 text-[color:var(--accent)] rounded-lg hover:bg-[color:var(--accent)] hover:text-white transition-all text-sm font-semibold flex items-center gap-2"
                            >
                                <i className="fas fa-sort"></i> Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className="bg-black/20">
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Customer</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Contact</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Address</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Service</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Date & Time</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10 text-center">Status</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingBookings.length === 0 ? (
                                        <tr><td colSpan={7} className="p-8 text-center text-gray-500">No pending bookings found.</td></tr>
                                    ) : (
                                        pendingBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4 border-b border-white/5 font-medium">{booking.userName || "N/A"}</td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300">
                                                    <div className="text-white">{booking.mobile || "N/A"}</div>
                                                    <div className="text-gray-500">{booking.userEmail || "N/A"}</div>
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300 max-w-[200px] truncate" title={`${booking.address}, ${booking.city} - ${booking.pincode}`}>
                                                    {booking.address || ""}, {booking.city || ""}
                                                </td>
                                                <td className="p-4 border-b border-white/5">
                                                    <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs">
                                                        {booking.services && Array.isArray(booking.services) ? booking.services.join(", ") : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-sm">
                                                    <div className="text-white"><i className="far fa-calendar-alt text-gray-500 mr-1"></i> {booking.bookingDate || "N/A"}</div>
                                                    <div className="text-gray-400"><i className="far fa-clock text-gray-500 mr-1"></i> {booking.timeSlot || "N/A"}</div>
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-center">
                                                    <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">
                                                        {booking.status || "Pending"}
                                                    </span>
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-center">
                                                    {/* Modern Tailwind Toggle */}
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            className="sr-only peer"
                                                            onChange={(e) => {
                                                                if (e.target.checked) markAsCompleted(booking.id);
                                                            }}
                                                        />
                                                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 border border-white/20"></div>
                                                    </label>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* --- 3. Completed Bookings Table --- */}
                <section className="mb-12">
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[rgba(11,12,18,0.7)]">
                        <div className="bg-white/5 p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-check-circle text-green-400"></i> Completed History
                            </h2>
                        </div>
                        <div className="overflow-x-auto max-h-[400px]">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="sticky top-0 bg-[#0f111b] z-10 shadow-sm">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Customer</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Contact</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Address</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Service</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Date</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedBookings.length === 0 ? (
                                        <tr><td colSpan={6} className="p-8 text-center text-gray-500">No completed bookings found.</td></tr>
                                    ) : (
                                        completedBookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 border-b border-white/5 font-medium">{booking.userName || "N/A"}</td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300">
                                                    <div>{booking.mobile || "N/A"}</div>
                                                    <div className="text-gray-500">{booking.userEmail || "N/A"}</div>
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300 max-w-[200px] truncate">
                                                    {booking.city || ""} - {booking.pincode || ""}
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300">
                                                    {booking.services && Array.isArray(booking.services) ? booking.services.join(", ") : "N/A"}
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-sm text-gray-300">{booking.bookingDate || "N/A"}</td>
                                                <td className="p-4 border-b border-white/5 text-center">
                                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                                        Completed
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* --- 4. Users Table --- */}
                <section>
                    <div className="glass-card rounded-2xl overflow-hidden border border-white/10 bg-[rgba(11,12,18,0.7)]">
                        <div className="bg-white/5 p-6 border-b border-white/10">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <i className="fas fa-users text-blue-400"></i> Registered Users
                            </h2>
                        </div>
                        <div className="overflow-x-auto max-h-[300px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-[#0f111b] z-10 shadow-sm">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Name</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Email</th>
                                        <th className="p-4 font-semibold text-gray-400 uppercase text-xs tracking-wider border-b border-white/10">Phone Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr><td colSpan={3} className="p-8 text-center text-gray-500">No users found.</td></tr>
                                    ) : (
                                        users.map((user, index) => (
                                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 border-b border-white/5 font-medium flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[color:var(--accent)]/20 flex items-center justify-center text-[color:var(--accent)] font-bold text-sm">
                                                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                                    </div>
                                                    {user.name || "N/A"}
                                                </td>
                                                <td className="p-4 border-b border-white/5 text-gray-300">{user.email || "N/A"}</td>
                                                <td className="p-4 border-b border-white/5 text-gray-300">{user.mobile || "N/A"}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}