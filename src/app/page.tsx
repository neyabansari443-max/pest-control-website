import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import ProcessSteps from "@/components/home/ProcessSteps";
import WhyMatters from "@/components/home/WhyMatters";
import TrustStrip from "@/components/home/TrustStrip";
import Testimonials from "@/components/common/Testimonials"; 
import QuickQuote from "@/components/home/QuickQuote";
import { Metadata } from "next";
import Link from "next/link"; // Link add kiya buttons ke liye

export const metadata: Metadata = {
  title: "Best Pest Control Services in Gurugram | Arya Pest Control",
  description: "Get certified, odorless, and safe pest control services in Gurugram. We specialize in Termite, Cockroach, and Bed Bug treatments with warranty.",
  keywords: "Pest Control Gurugram, Termite Control, Cockroach Control, Pest Control Near Me",
};

export default function Home() {
  return (
    <main className="bg-[color:var(--background)] overflow-hidden">
      <Hero />
      <Features /> 
      
      {/* 🆕 Naya Chhota Services Teaser (Deep Dive ki jagah) */}
      <section className="py-20 text-center relative border-y border-white/5 bg-[rgba(20,22,35,0.3)]">
        <div className="container mx-auto px-6 max-w-4xl" data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Comprehensive Pest <span className="text-[color:var(--accent)]">Solutions</span></h2>
            <p className="text-gray-400 text-lg mb-10">From silent destroying Termites to disease-carrying Cockroaches, our certified experts handle it all with 100% safe chemicals.</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["Termites", "Cockroaches", "Rodents", "Bed Bugs", "Mosquitoes", "Spiders"].map((pest, i) => (
                    <span key={i} className="px-5 py-2 rounded-full border border-white/10 bg-[color:var(--surface)] text-gray-300 text-sm font-medium">
                        <i className="fas fa-check-circle text-[color:var(--accent)] mr-2"></i> {pest}
                    </span>
                ))}
            </div>

            <Link href="/services" className="btn-primary inline-flex items-center gap-2">
                Explore All Services <i className="fas fa-arrow-right"></i>
            </Link>
        </div>
      </section>

      <WhyMatters />
      <ProcessSteps />
      <TrustStrip />
      
      <div className="py-12 bg-[color:var(--surface-alt)] border-t border-white/5">
        <Testimonials />
      </div>
      
      <QuickQuote />
    </main>
  );
}