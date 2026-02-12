"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface AdminLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const Swal = (await import("sweetalert2")).default;
        if (!email || !password) {
            Swal.fire("Error", "Please enter both email and password.", "warning");
            return;
        }

        setLoading(true);

        try {
            const [
                { signInWithEmailAndPassword, signOut },
                { doc, getDoc },
                { auth, db },
            ] = await Promise.all([
                import("firebase/auth"),
                import("firebase/firestore"),
                import("@/lib/firebase"),
            ]);

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists() && docSnap.data().role === "admin") {
                Swal.fire({
                    icon: "success",
                    title: "Access Granted",
                    text: "Redirecting...",
                    timer: 1000,
                    showConfirmButton: false,
                    background: '#141623',
                    color: '#fff',
                    confirmButtonColor: '#4d7cff'
                }).then(() => {
                    onClose(); // Close the modal
                    router.push("/admin");
                });
            } else {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Access Denied",
                    text: "Your account does not have admin privileges.",
                    background: '#141623',
                    color: '#fff',
                    confirmButtonColor: '#4d7cff'
                });
                await signOut(auth);
            }
        } catch (error: any) {
            setLoading(false);
            console.error("Login Error:", error);
            let errorMessage = "An unknown error occurred.";

            if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
                errorMessage = "Invalid email or password.";
            } else if (error.code === "auth/wrong-password") {
                errorMessage = "Incorrect password.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Invalid email format.";
            } else if (error.code === "auth/network-request-failed") {
                errorMessage = "Network error. Check your connection.";
            } else {
                errorMessage = error.message;
            }

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: errorMessage,
                background: '#141623',
                color: '#fff',
                confirmButtonColor: '#4d7cff'
            });
        }
    };

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">

            {/* Premium Dark Glass Card */}
            <div className="glass-card w-full max-w-md rounded-3xl overflow-hidden animate-fade-in-up border border-white/10 relative">

                {/* Background Glow inside modal */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[color:var(--secondary)] rounded-full blur-[80px] opacity-30 pointer-events-none"></div>

                {/* Modal Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-white text-xl font-bold flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[rgba(123,92,255,0.2)] flex items-center justify-center border border-[color:var(--accent)]/30">
                            <i className="fas fa-shield-alt text-[color:var(--accent)] text-sm"></i>
                        </div>
                        Admin Portal
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition text-3xl leading-none focus:outline-none">
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8 relative z-10">
                    <p className="text-[color:var(--accent)] mb-8 text-center text-xs uppercase tracking-[0.2em] font-bold">Authorized Personnel Only</p>

                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Fixed Email Input */}
                        <div className="relative group">
                            {/* Icon only visible when email is empty */}
                            {!email && (
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-gray-500 group-focus-within:text-[color:var(--accent)] transition-colors text-lg"></i>
                                </div>
                            )}
                            <input
                                type="email"
                                placeholder="Admin Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full ${email ? "pl-5" : "pl-16"} pr-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] outline-none transition-all placeholder-gray-500`}
                            />
                        </div>

                        {/* Fixed Password Input */}
                        <div className="relative group">
                            {/* Lock icon only visible when password is NOT shown */}
                            {!showPassword && (
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-500 group-focus-within:text-[color:var(--accent)] transition-colors text-lg"></i>
                                </div>
                            )}
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full ${showPassword ? "pl-5" : "pl-16"} pr-14 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] outline-none transition-all placeholder-gray-500`}
                            />
                            {/* Eye Icon Button */}
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-white transition-colors focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-lg`}></i>
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-4 text-lg shadow-lg flex justify-center items-center gap-3 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <i className="fas fa-circle-notch fa-spin"></i> Verifying...
                                </>
                            ) : (
                                <>
                                    Login Securely <i className="fas fa-arrow-right text-sm"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}