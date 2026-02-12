import QuickQuote from "@/components/home/QuickQuote";
import ContactForm from "@/components/contact/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Get a Free Pest Control Quote | Arya Pest Control",
    description: "Contact Arya Pest Control for a free inspection or estimate. Call us at +91-9650162125 or chat on WhatsApp. Serving all of Gurugram.",
};

export default function Contact() {
    return (
        <main className="bg-[color:var(--background)] min-h-screen">

            {/* 1. Premium Hero Banner (Consistent with About & Services) */}
            <section className="relative h-[45vh] flex items-center justify-center bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('/images/main4.png')" }}>
                <div className="absolute inset-0 bg-black/75"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" data-aos="zoom-in">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl tracking-tight">
                        Get In <span className="text-[color:var(--accent)]">Touch</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                        Have a pest emergency or need a free inspection? Our experts are just a message away.
                    </p>
                </div>
            </section>

            {/* 2. Main Contact Section (Dark Theme & Glassmorphism) */}
            <section className="py-20 relative overflow-hidden" id="contact">
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[10%] left-[-10%] w-96 h-96 bg-[color:var(--secondary)]/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[20%] right-[-5%] w-80 h-80 bg-[color:var(--accent)]/15 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">

                        {/* Contact Info Card */}
                        <div className="glass-card p-6 md:p-12 rounded-3xl border border-white/10" data-aos="fade-right">
                            <h3 className="text-3xl font-bold mb-3 text-white">Reach Out Directly</h3>
                            <p className="mb-10 text-gray-400 text-lg">Prefer talking to a human? Contact us using the details below.</p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[rgba(123,92,255,0.1)] border border-white/5 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 text-[color:var(--accent)] group-hover:scale-110 group-hover:bg-[color:var(--accent)] group-hover:text-white transition-all duration-300 shadow-lg">
                                        <i className="fab fa-whatsapp"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <strong className="block text-white text-lg mb-1">WhatsApp / Call 24/7:</strong>
                                        <a href="https://wa.me/919650162125?text=Hello" target="_blank" className="text-gray-300 hover:text-[color:var(--accent)] transition-colors text-lg tracking-wide block">
                                            +91 96501 62125
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[rgba(123,92,255,0.1)] border border-white/5 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 text-[color:var(--accent)] group-hover:scale-110 group-hover:bg-[color:var(--accent)] group-hover:text-white transition-all duration-300 shadow-lg">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <strong className="block text-white text-lg mb-1">Email Us:</strong>
                                        <a href="mailto:aryapestcontrol1@gmail.com" className="text-gray-300 hover:text-[color:var(--accent)] transition-colors text-lg break-all">
                                            aryapestcontrol1@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 md:gap-6 group">
                                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[rgba(123,92,255,0.1)] border border-white/5 flex items-center justify-center text-xl md:text-2xl flex-shrink-0 text-[color:var(--accent)] group-hover:scale-110 group-hover:bg-[color:var(--accent)] group-hover:text-white transition-all duration-300 shadow-lg">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="min-w-0">
                                        <strong className="block text-white text-lg mb-1">Head Office:</strong>
                                        <div className="text-gray-300 leading-relaxed text-lg break-words">
                                            S block, Road No S-27/15, Sector 24,<br />
                                            DLF phase 3, Nathupur, Gurugram, 122002
                                            <div className="mt-4">
                                                <a href="https://maps.google.com/?q=F4Q3+28,Gurugram,Haryana"
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 text-[color:var(--accent)] hover:text-white font-medium transition-colors">
                                                    <i className="fas fa-location-arrow"></i> View on Google Maps
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form Card */}
                        <div className="glass-card p-10 md:p-12 rounded-3xl border border-white/10" data-aos="fade-left" data-aos-delay="100">
                            <h3 className="text-3xl font-bold mb-3 text-white">Send a Message</h3>
                            <p className="mb-8 text-gray-400">We usually respond within a few hours.</p>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Quick Quote Component (At the bottom to capture remaining leads) */}
            <div className="border-t border-white/5 bg-[color:var(--surface-alt)]">
                <QuickQuote />
            </div>
        </main>
    );
}