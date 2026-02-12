export default function WhyMatters() {
    return (
        <section className="py-20 section-alt text-white">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[color:var(--accent-2)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div data-aos="fade-right">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                        Why Pest Control <br /> <span className="text-[color:var(--accent-2)]">Matters?</span>
                        </h2>
                                <p className="text-white/70 text-lg mb-8 leading-relaxed">
                            Pests are more than just a nuisance. They pose serious health risks and can cause significant damage to your property. Ignoring a small infestation can lead to costly repairs and health issues down the line.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-800/50 rounded-lg text-[color:var(--accent-2)]">
                                    <i className="fas fa-notes-medical text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Health Hazards</h4>
                                            <p className="text-white/60">Cockroaches and rodents carry bacteria like Salmonella and E. coli, causing food poisoning and allergies.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-800/50 rounded-lg text-[color:var(--accent-2)]">
                                    <i className="fas fa-house-damage text-xl"></i>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Property Damage</h4>
                                            <p className="text-white/60">Termites alone cause billions in property damage annually, often eating away structures silently.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative" data-aos="fade-left">
                        <div className="glass-card p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div className="p-6 bg-purple-900/40 rounded-xl">
                                        <div className="text-4xl font-bold text-[color:var(--accent-2)] mb-2">50+</div>
                                    <div className="text-sm text-gray-300">Diseases carried by pests</div>
                                </div>
                                <div className="p-6 bg-purple-900/40 rounded-xl">
                                        <div className="text-4xl font-bold text-[color:var(--accent-2)] mb-2">20%</div>
                                    <div className="text-sm text-gray-300">Annual food supply destroyed</div>
                                </div>
                                <div className="p-6 bg-purple-900/40 rounded-xl">
                                        <div className="text-4xl font-bold text-[color:var(--accent-2)] mb-2">100%</div>
                                    <div className="text-sm text-gray-300">Peace of mind with Arya</div>
                                </div>
                                <div className="p-6 bg-purple-900/40 rounded-xl">
                                        <div className="text-4xl font-bold text-[color:var(--accent-2)] mb-2">24/7</div>
                                    <div className="text-sm text-gray-300">Emergency Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
