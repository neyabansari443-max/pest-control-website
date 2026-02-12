export default function Features() {
    return (
        <section className="py-16 px-4 sm:px-6 relative z-20 bg-[color:var(--background)]">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="glass-card p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="100">
                        <div className="w-16 h-16 rounded-full bg-[rgba(123,92,255,0.1)] flex items-center justify-center mx-auto mb-5 border border-[color:var(--accent)]/30 shadow-[0_0_15px_rgba(123,92,255,0.2)]">
                            <i className="fas fa-shield-alt text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">93% Satisfaction</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Guaranteed results with advanced treatments to ensure your space is completely pest-free.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="glass-card p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="200">
                        <div className="w-16 h-16 rounded-full bg-[rgba(123,92,255,0.1)] flex items-center justify-center mx-auto mb-5 border border-[color:var(--accent)]/30 shadow-[0_0_15px_rgba(123,92,255,0.2)]">
                            <i className="fas fa-clock text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">24/7 Services</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">We are available around the clock for all your emergency pest control needs in Gurugram.</p>
                    </div>

                    {/* Card 3 */}
                    <div className="glass-card p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay="300">
                        <div className="w-16 h-16 rounded-full bg-[rgba(123,92,255,0.1)] flex items-center justify-center mx-auto mb-5 border border-[color:var(--accent)]/30 shadow-[0_0_15px_rgba(123,92,255,0.2)]">
                            <i className="fas fa-certificate text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Certified Experts</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Our team consists of background-verified, licensed, and experienced professionals.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}