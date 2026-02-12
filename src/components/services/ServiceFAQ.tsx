export default function ServiceFAQ() {
    const faqs = [
        {
            q: "Are the chemicals safe for my kids and pets?",
            a: "Yes, we prioritize safety. We use Bayer and Tata certified chemicals that are odorless and safe for humans and pets once dry. We recommend keeping them away during the treatment (1-2 hours) as a precaution."
        },
        {
            q: "How long does a termite treatment last?",
            a: "Our drill-fill-seal anti-termite treatment provides long-lasting protection. We offer warranties ranging from 1 to 5 years depending on the service package you choose."
        },
        {
            q: "Do I need to clean my kitchen before cockroach treatment?",
            a: "No, our gel baiting system is advanced. You don't need to empty your cabinets or wash utensils. It's a hassle-free process."
        },
        {
            q: "How often should I get pest control done?",
            a: "For general pest control (cockroaches/ants), we recommend a quarterly service (every 3 months). For termites, a one-time comprehensive treatment lasts for years."
        },
        {
            q: "Do you provide services on weekends?",
            a: "Yes, Arya Pest Control operates 7 days a week. We understand you're busy, so we schedule treatments at your convenience, including Sundays."
        },
        {
            q: "What if the pests come back after treatment?",
            a: "We offer a service warranty. If pests return within the warranty period, we will re-treat the affected area at no extra cost to you."
        },
        {
            q: "How much time does a standard 2BHK treatment take?",
            a: "A general pest control service for a 2BHK typically takes 30-45 minutes. Termite treatment is more intensive and may take 4-6 hours."
        },
        {
            q: "Do you serve all areas in Gurugram?",
            a: "Yes, we cover all sectors of Gurugram, DLF phases, Sohna Road, Golf Course Road, and nearby areas including Manesar."
        },
        {
            q: "Is there any smell after the treatment?",
            a: "Our general pest control (cockroaches/ants) is completely odorless. For some specific treatments like bed bugs, there might be a mild odor that dissipates within a few hours."
        },
        {
            q: "Can I sleep in the room after bed bug treatment?",
            a: "We recommend airing out the room for 3-4 hours after bed bug treatment. Once dry and ventilated, it is safe to use."
        },
    ];

    return (
        <section className="py-20 section-alt text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Frequently Asked Questions</h2>
                    <p className="text-white/70" data-aos="fade-up" data-aos-delay="100">Everything you need to know about our services.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-xl shadow-sm border border-white/10 overflow-hidden hover:shadow-md transition-shadow bg-[rgba(11,12,18,0.55)]"
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                        >
                            <details className="group p-5 md:p-6 cursor-pointer">
                                <summary className="flex justify-between items-center font-semibold text-base md:text-lg text-[color:var(--accent-2)] list-none">
                                    {faq.q}
                                    <span className="transform group-open:rotate-180 transition-transform duration-200 ml-4 shrink-0">
                                        <i className="fas fa-chevron-down text-[color:var(--accent-2)]"></i>
                                    </span>
                                </summary>
                                <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base leading-relaxed border-t pt-3 md:pt-4 border-white/10">
                                    {faq.a}
                                </p>
                            </details>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
