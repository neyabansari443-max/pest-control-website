import { Metadata } from "next";
import BookingForm from "@/components/booking/BookingForm"; // Path check kar lena

export const metadata: Metadata = {
    title: "Book Service | Arya Pest Control",
    description: "Book our expert pest control services online. Choose your service, date, and time slot conveniently.",
};

export default function BookServicePage() {
    return (
        <main className="bg-[color:var(--background)] min-h-screen pb-20">
            
            {/* 1. Premium Hero Banner */}
            <section className="relative h-[45vh] flex items-center justify-center bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('/images/main5.png')" }}>
                <div className="absolute inset-0 bg-black/75"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" data-aos="zoom-in">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-xl tracking-tight">
                        Book Your <span className="text-[color:var(--accent)]">Service</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                        Fast, reliable, and 100% safe pest management. Schedule your inspection in just 2 minutes.
                    </p>
                </div>
            </section>

            {/* 2. Glassmorphism Form Container */}
            <section className="container mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <BookingForm />
            </section>

        </main>
    );
}