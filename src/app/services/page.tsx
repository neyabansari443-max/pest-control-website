import Link from "next/link";
import ServiceFlipCard from "@/components/services/ServiceFlipCard";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServiceFAQ from "@/components/services/ServiceFAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Pest Control Services - Termite, Cockroach & More | Arya Pest Control",
    description: "Explore our wide range of pest control services in Gurugram including Termite (Deemak), Bed Bugs, Cockroaches, and Rodents. 100% Safe & Effective.",
};


export default function Services() {
    const services = [
        {
            imageClass: "termite-image",
            title: "Termite Control",
            description:
                "Protect your home's foundation and valuable furniture from termites.",
            causes:
                "Moisture, wood contact with the ground, and old wood around the house.",
            prevention:
                "Get leakages fixed, don't let water accumulate near the house, and get regular inspections done.",
            delay: 0,
        },
        {
            imageClass: "rodent-image",
            title: "Rodent Control",
            description: "Keep your family safe from diseases and damage.",
            causes: "Open food, cracks in walls, and garbage accumulation.",
            prevention:
                "Keep food in sealed containers, seal all holes in the house, and maintain cleanliness.",
            delay: 100,
        },
        {
            imageClass: "cockroach-image",
            title: "Cockroach Control",
            description:
                "Make your kitchen and home cockroach-free and get a healthy environment.",
            causes:
                "Unwashed utensils, kitchen filth, and garbage accumulated in drain pipes.",
            prevention:
                "Keep the kitchen clean, wash utensils before sleeping at night, and keep drains clean.",
            delay: 200,
        },
        {
            imageClass: "mosquito-image",
            title: "Mosquito Control",
            description: "Eradicate mosquitoes to prevent diseases like Dengue and Malaria.",
            causes: "Stagnant clean water around the house (in coolers, pots, old tires).",
            prevention:
                "Do not let water stagnate anywhere, change the water in the cooler weekly, and install mesh doors.",
            delay: 0,
        },
        {
            imageClass: "bedbug-image",
            title: "Bed Bug Control",
            description: "Get rid of bed bugs that spoil your night's sleep forever.",
            causes: "They come from old furniture, travel luggage, or any infected place.",
            prevention:
                "Check second-hand furniture thoroughly, and wash clothes in hot water after returning from a hotel.",
            delay: 100,
        },
        {
            imageClass: "ant-image",
            title: "Ant Control",
            description: "Stop the lines of ants in your house and keep your food safe.",
            causes: "Leaving sweets or food uncovered, and small cracks in walls or floors.",
            prevention:
                "Always keep food covered, and seal the places from where ants are coming.",
            delay: 200,
        },
        {
            imageClass: "spider-image",
            title: "Spider Control",
            description:
                "Create a clean environment by cleaning spiders and their webs from the corners of the house.",
            causes:
                "The presence of small insects in the house (their food) and dark, quiet places.",
            prevention: "Clean webs regularly, keep the house well-lit, and seal cracks.",
            delay: 0,
        },
        {
            imageClass: "fly-image",
            title: "Fly Control",
            description: "Free your home or office from disease-spreading flies.",
            causes: "Open garbage cans, rotten fruits or vegetables, and leaving food uncovered.",
            prevention:
                "Keep the garbage can covered, keep the house clean, and install nets on the doors.",
            delay: 100,
        },
        {
            imageClass: "woodborer-image",
            title: "Wood Borer Control",
            description:
                "Protect wooden furniture from wood borers that damage it and increase its life.",
            causes: "Un-treated or old wood, and high moisture content in the wood.",
            prevention:
                "Keep furniture polished or painted, and protect the wood from getting wet.",
            delay: 200,
        },
    ];

    return (
        <main>
            {/* Hero Section Removed - Modern Text Header */}
            <section className="pt-32 pb-10 px-6 section-alt text-center">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient" data-aos="fade-down">
                        Our Professional <span className="text-accent">Services</span>
                    </h1>
                    <section className="pest-pedia-promo mb-12">
                        <div className="container">
                            <p className="text-xl text-muted mb-2" data-aos="fade-up" data-aos-delay="100">
                                Wanna know how they come and how to prevent them?
                            </p>
                            <p
                                className="promo-subtext text-accent font-semibold"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                Just click on any card to see!
                            </p>
                        </div>
                    </section>
                </div>
            </section>

            <section className="px-6 pb-20 section-alt">
                <div className="services-grid container mx-auto">
                    {services.map((service, index) => (
                        <ServiceFlipCard key={index} {...service} />
                    ))}
                </div>
                <ServiceDetails />
                <ServiceFAQ />
                <div
                    className="services-action-btn text-center mt-12"
                    data-aos="zoom-in-up"
                    data-aos-easing="ease-in-out-back"
                >
                    <Link href="/service" className="btn-primary inline-block text-lg px-8 py-3">
                        Book Service Now
                    </Link>
                </div>
            </section>

            <section className="gallery-section" id="gallery">
                <div className="container">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Before & After Results</h2>
                        <p>Real transformations after our professional treatments.</p>
                    </div>
                    <div className="gallery-grid" data-aos="fade-up" data-aos-delay="100">
                        <figure className="gallery-item">
                            <img
                                src="/images/main1.png"
                                alt="Termite treatment before and after"
                                loading="lazy"
                            />
                            <figcaption>Termite Treatment</figcaption>
                        </figure>
                        <figure className="gallery-item">
                            <img
                                src="/images/main2.png"
                                alt="Cockroach control before and after"
                                loading="lazy"
                            />
                            <figcaption>Cockroach Control</figcaption>
                        </figure>
                        <figure className="gallery-item">
                            <img
                                src="/images/main3.png"
                                alt="Rodent control before and after"
                                loading="lazy"
                            />
                            <figcaption>Rodent Control</figcaption>
                        </figure>
                        <figure className="gallery-item">
                            <img
                                src="/images/main4.png"
                                alt="Bed bug treatment before and after"
                                loading="lazy"
                            />
                            <figcaption>Bed Bug Treatment</figcaption>
                        </figure>
                        <figure className="gallery-item">
                            <img
                                src="/images/main5.png"
                                alt="General pest control before and after"
                                loading="lazy"
                            />
                            <figcaption>General Pest Control</figcaption>
                        </figure>
                        <figure className="gallery-item">
                            <img
                                src="/images/service.png"
                                alt="Service quality inspection"
                                loading="lazy"
                            />
                            <figcaption>Quality Inspection</figcaption>
                        </figure>
                    </div>
                </div>
            </section>


            <section className="service-areas-section" id="areas">
                <div className="container">
                    <div className="section-title" data-aos="fade-up">
                        <h2>Service Areas</h2>
                        <p>We serve homes and businesses across Gurugram, Delhi, and NCR.</p>
                    </div>
                    <ul className="areas-list" data-aos="fade-up" data-aos-delay="100">
                        {[
                            "Gurugram (DLF, Sector 24, Golf Course Road)",
                            "Delhi (South, Central, West)",
                            "Noida & Greater Noida",
                            "Faridabad",
                            "Ghaziabad",
                            "Manesar",
                        ].map((area, index) => (
                            <li key={index}>{area}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
