"use client";

import { useRef } from "react";

export default function Testimonials() {
    const trackRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (trackRef.current) {
            const cardWidth = trackRef.current.querySelector(".testimonial-card")?.clientWidth || 300;
            const scrollAmount = cardWidth + 20; // + gap
            trackRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="section-title" data-aos="fade-up">
                    <h2>What Our Customers Say</h2>
                    <p>Real stories from satisfied clients who trust Arya Pest Control.</p>
                </div>
                <div className="testimonials-slider" data-slider="testimonials">
                    <button
                        className="slider-btn prev"
                        aria-label="Previous testimonial"
                        onClick={() => scroll("left")}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="testimonials-track" ref={trackRef}>
                        <div className="testimonial-card glass-card p-6 m-4" data-aos="fade-up" data-aos-delay="100">
                            <i className="fas fa-quote-left text-3xl mb-4"></i>
                            <p className="review-text italic mb-6">
                                The team was extremely professional and courteous. They explained
                                the entire process and used products that were safe for my kids
                                and pets. Highly recommended!
                            </p>
                            <div className="customer-info flex items-center gap-4">
                                <div>
                                    <div className="stars mb-1">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <h4 className="font-bold">Priya Sharma</h4>
                                    <span className="text-sm">Homeowner, Delhi</span>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card glass-card p-6 m-4" data-aos="fade-up" data-aos-delay="200">
                            <i className="fas fa-quote-left"></i>
                            <p className="review-text">
                                We had a serious rodent problem at our office. Arya Pest Control
                                responded quickly and resolved the issue with minimal disruption
                                to our work. Excellent service!
                            </p>
                            <div className="customer-info">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <h4>Amit Kumar</h4>
                                <span>Office Manager, Gurugram</span>
                            </div>
                        </div>
                        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
                            <i className="fas fa-quote-left"></i>
                            <p className="review-text">
                                I've been using their services for years for regular pest control.
                                They are always on time, reliable, and effective. Truly a
                                trustworthy company.
                            </p>
                            <div className="customer-info">
                                <div className="stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                <h4>Sunita Singh</h4>
                                <span>Resident, Noida</span>
                            </div>
                        </div>
                    </div>
                    <button
                        className="slider-btn next"
                        aria-label="Next testimonial"
                        onClick={() => scroll("right")}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
}
