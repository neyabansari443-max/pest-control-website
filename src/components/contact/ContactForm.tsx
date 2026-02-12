"use client";

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // Only allow digits
            if (/^\d*$/.test(value) && value.length <= 15) {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (formData.phone.length < 10) {
            e.preventDefault();
            alert("Please enter a valid 10-digit phone number.");
            return;
        }
        // Allow default Formspree submission
    };

    return (
        <form
            action="https://formspree.io/f/mnngzzjp"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
        >
            <div>
                <label htmlFor="message-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="message-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] outline-none transition-all placeholder-gray-600"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label htmlFor="message-phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="message-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] outline-none transition-all placeholder-gray-600"
                    placeholder="e.g. 9876543210"
                    required
                    minLength={10}
                    pattern="[0-9]{10,}"
                    title="Please enter a valid mobile number (minimum 10 digits)"
                />
            </div>
            <div>
                <label htmlFor="message-text" className="block text-sm font-medium text-gray-300 mb-2">
                    Describe Your Problem <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message-text"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] focus:ring-1 focus:ring-[color:var(--accent)] outline-none transition-all placeholder-gray-600"
                    placeholder="E.g., I'm seeing termites in my wooden almirah..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-blue-500/20 flex justify-center items-center gap-2"
            >
                Send Message <i className="fas fa-paper-plane"></i>
            </button>
        </form>
    );
}
