"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLoginModal = dynamic(
    () => import("@/components/auth/AdminLoginModal"),
    { ssr: false }
);

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let unsubscribe = () => { };
        const initAuth = async () => {
            const [{ onAuthStateChanged }, { auth }] = await Promise.all([
                import("firebase/auth"),
                import("@/lib/firebase"),
            ]);
            unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
            });
        };

        initAuth();
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            const [{ signOut }, { auth }] = await Promise.all([
                import("firebase/auth"),
                import("@/lib/firebase"),
            ]);
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
    const closeSideMenu = () => setIsSideMenuOpen(false);

    return (
        <>
            {/* Mobile Side Menu Overlay */}
            {isSideMenuOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden" onClick={closeSideMenu}></div>
            )}

            {/* Mobile Side Menu */}
            <div className={`fixed inset-y-0 left-0 z-[100] w-72 bg-[color:var(--surface)] border-r border-white/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center relative">
                    {/* Simple glow behind logo in mobile menu */}
                    <div className="absolute top-1/2 left-10 -translate-y-1/2 w-20 h-10 bg-white/20 blur-xl rounded-full pointer-events-none"></div>
                    <Link href="/" onClick={closeSideMenu}>
                        <img src="/images/logo.png" alt="Arya Pest Control Logo" className="h-10 relative z-10" />
                    </Link>
                    <button onClick={closeSideMenu} className="text-gray-400 hover:text-white text-2xl relative z-10">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <ul className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {['Home', 'About', 'Services', 'Contact Us'].map((item) => (
                        <li key={item}>
                            <Link href={item === 'Home' ? '/' : item === 'Contact Us' ? '/contact' : `/${item.toLowerCase().replace(' ', '')}`} onClick={closeSideMenu} className="block px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors font-medium">
                                {item}
                            </Link>
                        </li>
                    ))}
                    <li className="pt-2">
                        <Link href="/service" onClick={closeSideMenu} className="block px-4 py-3 rounded-xl text-[color:var(--accent)] font-bold bg-[color:var(--accent)]/10 border border-[color:var(--accent)]/20 text-center shadow-lg">
                            Book Service
                        </Link>
                    </li>
                    <li className="pt-2">
                        <button onClick={(e) => {
                            e.preventDefault();
                            if (user) router.push("/admin");
                            else setIsAdminModalOpen(true);
                            closeSideMenu();
                        }} className="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-colors font-medium flex items-center gap-3">
                            <i className="fas fa-shield-alt"></i> Admin Portal
                        </button>
                    </li>
                </ul>

                {/* Mobile User Footer */}
                {user && (
                    <div className="p-6 border-t border-white/10 bg-black/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[color:var(--accent)] to-purple-600 flex items-center justify-center text-white border border-white/20">
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <div>
                                <span className="text-white font-bold block text-sm">Admin Access</span>
                                <span className="text-gray-400 text-xs truncate block max-w-[150px]">{user.displayName || "Administrator"}</span>
                            </div>
                        </div>
                        <button onClick={handleLogout} className="w-full py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors border border-white/5 font-semibold flex justify-center items-center gap-2 text-sm">
                            <i className="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                    </div>
                )}
            </div>

            {/* 🌟 Desktop Navbar (Sleek, Spacious, No Box) 🌟 */}
            <header className="fixed w-full top-0 z-50 bg-[rgba(11,12,18,0.85)] backdrop-blur-xl border-b border-white/10 shadow-lg">
                <AdminLoginModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />

                {/* Fixed height (h-20) for perfect vertical centering and max-w-7xl for wide spacing */}
                <nav className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                    {/* Logo Section */}
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSideMenu} className="text-gray-300 hover:text-white text-2xl lg:hidden">
                            <i className="fas fa-bars"></i>
                        </button>

                        <Link href="/" className="relative flex items-center group py-2">
                            {/* Invisible background glow (No solid box) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-white/20 blur-xl rounded-full group-hover:bg-white/30 transition-all duration-300 pointer-events-none"></div>
                            <img src="/images/logo.png" alt="Arya Pest Control Logo" className="h-12 relative z-10 transition-transform duration-300 group-hover:scale-105" />
                        </Link>
                    </div>

                    {/* Navigation Links (More gap, elegant font size) */}
                    <ul className="hidden lg:flex items-center gap-10">
                        {['Home', 'About', 'Services', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link href={item === 'Home' ? '/' : item === 'Contact Us' ? '/contact' : `/${item.toLowerCase().replace(' ', '')}`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">
                                    {item}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/service" className="text-sm font-bold text-[color:var(--accent)] hover:text-white transition-colors tracking-wide drop-shadow-[0_0_8px_rgba(77,124,255,0.4)]">
                                Book Service
                            </Link>
                        </li>
                        <li>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (user) router.push("/admin");
                                else setIsAdminModalOpen(true);
                            }} className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide">
                                Admin
                            </button>
                        </li>
                    </ul>

                    {/* Right Action Section */}
                    <div className="hidden lg:flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4 bg-white/5 pl-2 pr-4 py-1.5 rounded-full border border-white/10 shadow-inner">
                                <div className="flex items-center gap-2">
                                    {/* Sleek Admin Shield */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[color:var(--accent)] to-purple-600 flex items-center justify-center text-white border border-white/20 shadow-[0_0_10px_rgba(77,124,255,0.3)]">
                                        <i className="fas fa-user-shield text-sm"></i>
                                    </div>
                                    <span className="text-sm font-bold text-gray-200">Admin</span>
                                </div>
                                <div className="w-px h-5 bg-white/20"></div>
                                <button onClick={handleLogout} className="text-xs font-bold text-gray-400 hover:text-red-400 transition-colors uppercase tracking-wider flex items-center gap-1.5">
                                    <i className="fas fa-sign-out-alt"></i> Logout
                                </button>
                            </div>
                        ) : (
                            <a href="tel:+919650162125" className="hidden xl:flex items-center gap-2 text-sm font-bold text-white bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:border-[color:var(--accent)] hover:bg-[color:var(--surface)] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(77,124,255,0.2)] tracking-wide">
                                <i className="fas fa-phone-alt text-[color:var(--accent)]"></i> +91 96501 62125
                            </a>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}