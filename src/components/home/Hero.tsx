"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        "/images/main2.png",
        "/images/main1.png",
        "/images/main4.png",
        "/images/main5.png",
    ];

    useEffect(() => {
        // AOS.init hata diya kyunki wo ClientLayout me hai

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="hero-section pt-28 md:pt-36" id="hero">
            <div className="hero-slider">
                {slides.map((src, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? "active" : ""}`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${src}')`,
                        }}
                    ></div>
                ))}
            </div>
            <div className="hero-content text-left max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-lg" data-aos="fade-up">
                    Expert Pest Control <br />
                    <span className="text-[color:var(--accent-2)]">You Can Trust</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl drop-shadow-md" data-aos="fade-up" data-aos-delay="100">
                    Protect your home and business with our certified, eco-friendly, and 100% effective pest solutions.
                </p>
                <div className="hero-buttons flex gap-4" data-aos="fade-up" data-aos-delay="200">
                    <a
                        href="https://wa.me/919650162125?text=I%20need%20a%20free%20inspection"
                        className="btn-primary"
                        target="_blank"
                    >
                        Get Free Inspection
                    </a>
                    <Link href="/services" className="px-8 py-3 bg-white text-purple-900 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg">
                        Explore Services
                    </Link>
                </div>
            </div>
        </section>
    );
}
