"use client";

import { useState } from "react";

export default function ServiceDetails() {
    const [activeTab, setActiveTab] = useState("termite");

    const pestContent = {
        termite: {
            title: "Termite (Deemak) Control",
            desc: "Termites are silent destroyers that can ruin your wooden furniture and structural integrity before you even notice.",
            points: [
                "Drill-Fill-Seal treatment for long-lasting protection.",
                "Use of odorless and safe Bayer/Tata chemicals.",
                "Protection against subterranean and drywood termites.",
                "Warranty-backed service with periodic checkups."
            ],
            image: "/images/termite.webp"
        },
        cockroach: {
            title: "Cockroach & Ant Control",
            desc: "Cockroaches spread diseases like Salmonella and Dysentery. Our gel-based treatment is safe for kitchens and effective.",
            points: [
                "No need to empty your kitchen.",
                "Odorless gel baiting system.",
                "Effective against German and American cockroaches.",
                "Stops breeding cycle of pests."
            ],
            image: "/images/cockroach.webp"
        },
        rodent: {
            title: "Rodent (Rat) Control",
            desc: "Rats damage safe wires, pipes, and spread Leptospirosis. We use advanced trapping and baiting stations.",
            points: [
                "External bait stations for garden areas.",
                "Glue traps for indoor safety.",
                "Rodent entry point identification and sealing.",
                "Safe for pets and children."
            ],
            image: "/images/rodent.jpeg"
        },
        bedbug: {
            title: "Bed Bug Control",
            desc: "Bed bugs disturb your sleep and cause skin ratios. Our heat and chemical treatment ensures 100% elimination.",
            points: [
                "Thorough inspection of mattresses and crevices.",
                "Two-round treatment for killing eggs.",
                "Steam treatment for instant relief.",
                "Advice on preventing re-infestation."
            ],
            image: "/images/bedbugs.webp"
        },
        fly: {
            title: "Fly Control (Makkhi)",
            desc: "House flies contaminate food and spread serious diseases like Cholera and Typhoid. We use a mix of baiting and trapping technology to keep your space fly-free.",
            points: [
                "Installation of UV Light Fly Traps.",
                "Advanced baiting for adult flies.",
                "Treatment of breeding sources (larvae control).",
                "Safe for kitchens and dining areas."
            ],
            image: "/images/flies.jpeg"
        },
        spider: {
            title: "Spider Control (Makdi)",
            desc: "Spider webs make your home look untidy and neglected. Our treatment not only removes existing webs but also eliminates eggs to prevent their return.",
            points: [
                "Mechanical removal of webs from heights.",
                "Crack and crevice treatment to hideouts.",
                "Elimination of spider egg sacs.",
                "Spot spray that doesn't damage wall paint."
            ],
            image: "/images/spider.webp"
        },
        woodborer: {
            title: "Wood Borer Control (Furniture Ke Kide)",
            desc: "If you see yellow powder falling from furniture, it's a Wood Borer infestation. We use specialized injection methods to save your expensive wooden assets.",
            points: [
                "Syringe injection into wood holes.",
                "Oil-based chemical for deep penetration.",
                "Stops powder formation immediately.",
                "Preserves furniture life and strength."
            ],
            image: "/images/woodborer.png"
        },
        mosquito: {
            title: "Mosquito Control (Machhar)",
            desc: "Mosquitoes are the root cause of Dengue and Malaria. We provide a comprehensive solution targeting both breeding spots and flying mosquitoes.",
            points: [
                "Cold fogging for indoor areas (Odorless).",
                "Thermal fogging for society/garden compounds.",
                "Anti-larval treatment for stagnant water.",
                "Wall spray treatment for resting mosquitoes."
            ],
            image: "/images/mosquito.jpg"
        }
    };

    return (
        <section className="py-20 section-alt text-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Deep Dive: Know Your Pests</h2>
                    <p className="text-white/70" data-aos="fade-up" data-aos-delay="100">Select a pest type to learn how we eliminate them.</p>
                </div>

                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-12" data-aos="fade-up">
                    {Object.keys(pestContent).map((pest) => (
                        <button
                            key={pest}
                            onClick={() => setActiveTab(pest)}
                            className={`px-3 py-3 md:px-6 md:py-2 rounded-xl md:rounded-full font-semibold text-sm md:text-base transition-all ${activeTab === pest ? 'bg-[color:var(--accent)] text-white shadow-lg transform scale-105' : 'bg-[rgba(255,255,255,0.06)] text-white/70 hover:bg-[rgba(255,255,255,0.12)]'}`}
                        >
                            {pestContent[pest as keyof typeof pestContent].title}
                        </button>
                    ))}
                </div>

                <div className="glass-card p-5 md:p-12 rounded-3xl max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center" key={activeTab} data-aos="fade-up" data-aos-mode="wait">
                    <div className="flex-1">
                        <h3 className="text-3xl font-bold mb-6">{pestContent[activeTab as keyof typeof pestContent].title}</h3>
                        <p className="text-white/70 text-base md:text-lg mb-6 leading-relaxed">
                            {pestContent[activeTab as keyof typeof pestContent].desc}
                        </p>
                        <ul className="space-y-4">
                            {pestContent[activeTab as keyof typeof pestContent].points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <i className="fas fa-check-circle text-[color:var(--accent-2)] mt-1"></i>
                                    <span className="text-white/80">{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <a href="/contact" className="btn-primary inline-block">Get Pricing</a>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex justify-center items-center bg-[rgba(20,22,35,0.7)] border border-white/10 rounded-2xl h-80 overflow-hidden">
                        <img
                            src={pestContent[activeTab as keyof typeof pestContent].image}
                            alt={`${pestContent[activeTab as keyof typeof pestContent].title} service`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
