import Testimonials from "@/components/common/Testimonials"; // Make sure path is correct
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | Arya Pest Control - Trusted Since 2010",
    description: "Learn about Arya Pest Control, the most trusted pest management company in Gurugram. Founded in 2010, we serve 2000+ homes with certified experts.",
};

export default function About() {
    return (
        <main className="bg-[color:var(--background)] overflow-hidden">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('/images/main1.png')" }}>
                <div className="absolute inset-0 bg-black/70"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" data-aos="zoom-in">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl tracking-tight">
                        About <span className="text-[color:var(--accent)]">Arya Pest Control</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-2xl font-light leading-relaxed">
                        Defending your homes and businesses with cutting-edge, eco-friendly pest solutions since 2010.
                    </p>
                </div>
            </section>

            {/* 2. Our Story Section (New & Engaging) */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div data-aos="fade-right">
                            <h4 className="text-[color:var(--secondary-light)] font-bold tracking-wider uppercase mb-2">Our Journey</h4>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It All <span className="text-gray-400">Started</span></h2>
                            <div className="h-1 w-20 bg-[color:var(--accent)] mb-8 rounded-full"></div>
                            
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                Founded in <span className="text-white font-semibold">2010</span>, Arya Pest Control began with a very simple mission: to provide the families of Gurugram with a safe, chemical-hazard-free environment. 
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                What started as a small two-man team has now evolved into Gurugram's most trusted pest management agency. We realized early on that traditional pest control was toxic and outdated. That’s why we shifted completely to <span className="text-[color:var(--accent)] font-semibold">WHO-approved, odorless, and family-safe</span> treatments. Today, we don't just kill pests; we engineer permanent prevention solutions.
                            </p>
                            
                            {/* Author/Founder Signature feel */}
                            <div className="flex items-center gap-4 mt-8 border-t border-white/10 pt-6">
                                <div className="w-14 h-14 rounded-full bg-[color:var(--surface)] border border-white/20 flex items-center justify-center">
                                    <i className="fas fa-shield-alt text-2xl text-[color:var(--accent)]"></i>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-lg">Trusted & Certified</h4>
                                    <p className="text-gray-500 text-sm">Government Approved Agency</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Grid for Story */}
                        <div className="relative" data-aos="fade-left">
                            <div className="absolute inset-0 bg-purple-600 rounded-2xl transform rotate-3 opacity-10 filter blur-xl"></div>
                            <div className="grid grid-cols-2 gap-4 relative z-10">
                                <img src="/images/main3.png" alt="Pest Control Work" className="rounded-2xl shadow-xl w-full h-64 object-cover border border-white/10 transform translate-y-8" />
                                <img src="/images/main4.png" alt="Safe Chemicals" className="rounded-2xl shadow-xl w-full h-64 object-cover border border-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Impact Stats Strip (Floating Design) */}
            <section className="relative z-20 -mt-10 mb-10 px-6">
                <div className="container mx-auto">
                    <div className="glass-card p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center" data-aos="fade-up">
                        <div>
                            <div className="text-5xl font-extrabold text-[color:var(--accent)] mb-2">13+</div>
                            <div className="text-gray-300 font-medium uppercase tracking-wider text-sm">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold text-[color:var(--accent)] mb-2">2k+</div>
                            <div className="text-gray-300 font-medium uppercase tracking-wider text-sm">Happy Homes</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold text-[color:var(--accent)] mb-2">50+</div>
                            <div className="text-gray-300 font-medium uppercase tracking-wider text-sm">Certified Experts</div>
                        </div>
                        <div>
                            <div className="text-5xl font-extrabold text-[color:var(--accent)] mb-2">100%</div>
                            <div className="text-gray-300 font-medium uppercase tracking-wider text-sm">Safe Chemicals</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Mission & Vision */}
            <section className="py-20 bg-[color:var(--surface-alt)] relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-white mb-4">Our Philosophy</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">The core values that drive our everyday operations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="glass-card p-10 rounded-2xl text-center group" data-aos="fade-up" data-aos-delay="0">
                            <div className="w-20 h-20 bg-[rgba(123,92,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-bullseye text-3xl text-[color:var(--secondary-light)]"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                            <p className="text-gray-400 leading-relaxed">To create pest-free, healthy environments for families and businesses using safe, scientific, and eco-friendly technologies.</p>
                        </div>

                        <div className="glass-card p-10 rounded-2xl text-center group" data-aos="fade-up" data-aos-delay="100">
                            <div className="w-20 h-20 bg-[rgba(123,92,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-eye text-3xl text-[color:var(--secondary-light)]"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                            <p className="text-gray-400 leading-relaxed">To be the most trusted and preferred pest control partner across India, known strictly for our uncompromised quality and integrity.</p>
                        </div>

                        <div className="glass-card p-10 rounded-2xl text-center group" data-aos="fade-up" data-aos-delay="200">
                            <div className="w-20 h-20 bg-[rgba(123,92,255,0.1)] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <i className="fas fa-heart text-3xl text-[color:var(--secondary-light)]"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Core Values</h3>
                            <p className="text-gray-400 leading-relaxed">Safety First. Customer Obsession. Integrity in Service. Continuous Innovation in Pest Management.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Why Choose Us (Redesigned for Dark Theme) */}
            <section className="py-24 relative overflow-hidden">
                {/* Background Glow Effect */}
                <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-[color:var(--secondary)]/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[10%] left-[-10%] w-96 h-96 bg-[color:var(--accent)]/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        <div className="relative" data-aos="fade-right">
                            <div className="glass-card p-2 rounded-2xl">
                                <img
                                    src="/images/main2.png" 
                                    alt="Professional pest control technician"
                                    loading="lazy"
                                    className="rounded-xl shadow-2xl w-full object-cover"
                                />
                            </div>
                            
                            {/* Floating Badge on Image */}
                            <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl flex items-center gap-4 animate-bounce-slow">
                                <i className="fas fa-award text-4xl text-yellow-500"></i>
                                <div>
                                    <div className="text-white font-bold text-lg">Top Rated</div>
                                    <div className="text-gray-400 text-sm">in Gurugram</div>
                                </div>
                            </div>
                        </div>

                        <div data-aos="fade-left">
                            <h4 className="text-[color:var(--secondary-light)] font-bold tracking-wider uppercase mb-2">The Arya Advantage</h4>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose <span className="text-[color:var(--accent)]">Us?</span></h2>
                            <p className="text-gray-400 text-lg mb-10">We don't just spray chemicals and leave. We analyze, treat, and prevent. Your peace of mind is our final product.</p>

                            <div className="space-y-8">
                                <div className="flex gap-6 group">
                                    <div className="w-16 h-16 rounded-xl bg-[color:var(--surface)] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[color:var(--accent)] transition-colors">
                                        <i className="fas fa-user-shield text-2xl text-[color:var(--accent)]"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Professional & Verified Team</h3>
                                        <p className="text-gray-400 leading-relaxed">Every technician undergoes strict background checks and months of rigorous training before entering your home.</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-16 h-16 rounded-xl bg-[color:var(--surface)] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[color:var(--accent)] transition-colors">
                                        <i className="fas fa-leaf text-2xl text-[color:var(--accent)]"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Eco-Friendly & Safe Products</h3>
                                        <p className="text-gray-400 leading-relaxed">We strictly use Bayer/Tata chemicals that are WHO-certified, odorless, and 100% safe for children, elders, and pets.</p>
                                    </div>
                                </div>

                                <div className="flex gap-6 group">
                                    <div className="w-16 h-16 rounded-xl bg-[color:var(--surface)] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[color:var(--accent)] transition-colors">
                                        <i className="fas fa-bolt text-2xl text-[color:var(--accent)]"></i>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Quick & Lasting Results</h3>
                                        <p className="text-gray-400 leading-relaxed">Our advanced targeted treatments don't just repel pests, they destroy the breeding colonies for long-term relief.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-12">
                                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                                    Book an Inspection <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Testimonials Section */}
            <div className="border-t border-white/10 pt-10 pb-10 bg-[color:var(--background)]">
                <div className="text-center mb-4" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-white">Loved by Thousands</h2>
                </div>
                <Testimonials />
            </div>

        </main>
    );
}