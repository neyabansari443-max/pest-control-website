import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-[color:var(--surface-alt)] border-t border-white/10 pt-20 pb-10 overflow-hidden text-center md:text-left">

            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[color:var(--secondary)]/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-[-10%] w-80 h-80 bg-[color:var(--accent)]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div data-aos="fade-up" className="flex flex-col items-center md:items-start">
                        {/* 🌟 Glowing Logo Fix for Footer 🌟 */}
                        <Link href="/" className="inline-block relative mb-6 group">
                            <div className="absolute inset-0 bg-white/10 blur-xl rounded-full group-hover:bg-white/20 transition-all"></div>
                            <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/10 relative z-10 inline-block">
                                <img src="/images/logo.png" alt="Arya Pest Control Logo" loading="lazy" className="h-14 drop-shadow-md" />
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Your trusted partner in creating safe, pest-free environments for homes and businesses across Delhi NCR.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <h4 className="text-white text-lg font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                            <i className="fas fa-link text-[color:var(--accent)] text-sm"></i> Key Links
                        </h4>
                        <ul className="space-y-3">
                            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Home' ? '/' : item === 'About Us' ? '/about' : `/${item.toLowerCase()}`} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div data-aos="fade-up" data-aos-delay="200">
                        <h4 className="text-white text-lg font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                            <i className="fas fa-map-marker-alt text-[color:var(--accent)] text-sm"></i> Address & Hours
                        </h4>
                        <div className="text-gray-400 space-y-4">
                            <p className="leading-relaxed">
                                S block, Road No S-27/15,<br />
                                Sector 24, DLF phase 3,<br />
                                Nathupur, Gurugram, 122002
                            </p>
                            <div>
                                <strong className="text-white">Plus Code:</strong><br />
                                <a href="https://www.google.com/maps/search/?api=1&query=F4Q3%2B28" target="_blank" className="text-[color:var(--accent)] hover:underline">
                                    F4Q3+28, Gurugram
                                </a>
                            </div>
                            <div>
                                <strong className="text-white">Hours:</strong> <span className="text-green-400">24/7 Service Available</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div data-aos="fade-up" data-aos-delay="300">
                        <h4 className="text-white text-lg font-bold mb-6 flex items-center justify-center md:justify-start gap-2">
                            <i className="fas fa-hashtag text-[color:var(--accent)] text-sm"></i> Follow Us
                        </h4>
                        <div className="flex justify-center md:justify-start gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all hover:-translate-y-1">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-sky-500 hover:text-white hover:border-sky-500 transition-all hover:-translate-y-1">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/aryapestcontrol1?utm_source=qr&igsh=OGJsc2N1MTA0aDJm" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all hover:-translate-y-1">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 text-center md:text-left">
                    <p>© {new Date().getFullYear()} Arya Pest Control. All Rights Reserved.</p>
                    <p>Designed for Excellence.</p>
                </div>
            </div>

            {/* Modern Floating Action Buttons (FAB) */}
            <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-3">
                <a href="https://wa.me/919650162125?text=Hello" target="_blank" className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-500 to-green-400 text-white flex items-center justify-center text-3xl shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:scale-110 transition-transform cursor-pointer relative group">
                    <i className="fab fa-whatsapp"></i>
                    <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">Chat with us</span>
                </a>
                <a href="tel:+919650162125" className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-[color:var(--accent)] text-white flex items-center justify-center text-2xl shadow-[0_10px_20px_rgba(77,124,255,0.3)] hover:scale-110 transition-transform cursor-pointer relative group">
                    <i className="fas fa-phone-alt"></i>
                    <span className="absolute right-full mr-4 bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-medium">Call Now</span>
                </a>
            </div>
        </footer>
    );
}