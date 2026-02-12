"use client";

import { useEffect, useState } from "react";
import AOS from "aos";

export default function QuickQuote() {
    useEffect(() => {
        // AOS animation initialize (agar globally nahi hai toh)
    }, []);

    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        service: "",
        location: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // Only allow digits
            if (/^\d*$/.test(value) && value.length <= 15) {
                setFormState(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name, phone, service, location } = formState;

        // Strict numeric check and length check
        if (phone.length < 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const message = `Hello, I need a quote.\nName: ${name}\nPhone: ${phone}\nService: ${service}\nLocation: ${location}`;
        const waUrl = `https://wa.me/919650162125?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");

        // Optional: Reset form after submission
        setFormState({
            name: "",
            phone: "",
            service: "",
            location: ""
        });
    };

    return (
        <section className="py-20 relative overflow-hidden" id="quick-quote">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                {/* Premium Glass Card Layout */}
                <div className="glass-card p-6 md:p-12 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-aos="fade-up">

                    {/* Left Side: Text Information */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Get an Instant Quote on <span className="text-green-500">WhatsApp</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Share your pest problem and preferred time. We’ll reply quickly with an estimate directly on your WhatsApp.
                        </p>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4 text-gray-300">
                                <i className="fas fa-check-circle text-[color:var(--accent)] text-2xl"></i>
                                <span className="text-lg">No hidden charges</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-300">
                                <i className="fas fa-check-circle text-[color:var(--accent)] text-2xl"></i>
                                <span className="text-lg">Flexible time slots</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-300">
                                <i className="fas fa-check-circle text-[color:var(--accent)] text-2xl"></i>
                                <span className="text-lg">Free inspection guidance</span>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side: Glassmorphic Form */}
                    <div className="bg-[rgba(11,12,18,0.5)] p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-500 text-base"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formState.phone}
                                onChange={handleChange}
                                placeholder="Phone Number (e.g. 9876543210)"
                                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-500 text-base"
                                required
                                minLength={10}
                                pattern="[0-9]{10,}"
                                title="Please enter a valid mobile number (minimum 10 digits)"
                            />
                            <div className="relative">
                                <select
                                    name="service"
                                    required
                                    value={formState.service}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all appearance-none text-base"
                                >
                                    <option value="" disabled className="bg-gray-900 text-gray-400">Select Service</option>
                                    <option value="Termite Control" className="bg-gray-900 text-white">Termite Control</option>
                                    <option value="Cockroach Control" className="bg-gray-900 text-white">Cockroach Control</option>
                                    <option value="Rodent Control" className="bg-gray-900 text-white">Rodent Control</option>
                                    <option value="Bed Bug Control" className="bg-gray-900 text-white">Bed Bug Control</option>
                                    <option value="General Pest Control" className="bg-gray-900 text-white">General Pest Control</option>
                                </select>
                                <i className="fas fa-chevron-down absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"></i>
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={formState.location}
                                onChange={handleChange}
                                placeholder="Area / Location (e.g., DLF Phase 3)"
                                className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder-gray-500 text-base"
                                required
                            />

                            {/* Premium WhatsApp Button */}
                            <button
                                type="submit"
                                className="w-full py-4 px-6 rounded-xl text-lg font-bold shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#25D366] text-white flex justify-center items-center gap-3 transform transition-all hover:scale-[1.02] active:scale-95 border border-white/10"
                            >
                                <i className="fab fa-whatsapp text-2xl"></i>
                                <span>Get Quote on WhatsApp</span>
                            </button>
                            <p className="text-center text-gray-500 text-sm mt-3">We respect your privacy. No spam.</p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}