export default function TrustStrip() {
    return (
        <section className="py-12 bg-[color:var(--surface-alt)] border-y border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>
            
            <div className="container mx-auto px-6 relative z-10 max-w-5xl">
                {/* Changed to Perfect Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center">
                    
                    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform" data-aos="fade-up" data-aos-delay="0">
                        <div className="w-14 h-14 rounded-full bg-[color:var(--background)] border border-white/5 flex items-center justify-center shadow-lg">
                            <i className="fas fa-shield-alt text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">100% Safe Chemicals</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform" data-aos="fade-up" data-aos-delay="100">
                        <div className="w-14 h-14 rounded-full bg-[color:var(--background)] border border-white/5 flex items-center justify-center shadow-lg">
                            <i className="fas fa-bolt text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">Same‑Day Service</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform" data-aos="fade-up" data-aos-delay="200">
                        <div className="w-14 h-14 rounded-full bg-[color:var(--background)] border border-white/5 flex items-center justify-center shadow-lg">
                            <i className="fas fa-certificate text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">Certified Technicians</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform" data-aos="fade-up" data-aos-delay="300">
                        <div className="w-14 h-14 rounded-full bg-[color:var(--background)] border border-white/5 flex items-center justify-center shadow-lg">
                            <i className="fas fa-thumbs-up text-2xl text-[color:var(--accent)]"></i>
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">Trusted by 2k+ Homes</span>
                    </div>

                </div>
            </div>
        </section>
    );
}