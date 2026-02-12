export default function ProcessSteps() {
    const steps = [
        {
            id: 1,
            title: "Inspection",
            desc: "Our certified experts conduct a thorough layout inspection to identify pest infestations and risk areas.",
            icon: "fa-search",
        },
        {
            id: 2,
            title: "Treatment",
            desc: "We use WHO-approved, eco-friendly chemicals to eliminate pests safely without harming your family or pets.",
            icon: "fa-spray-can",
        },
        {
            id: 3,
            title: "Prevention",
            desc: "We don't just kill pests; we implement long-term barriers and provide tips to prevent future outbreaks.",
            icon: "fa-shield-virus",
        },
    ];

    return (
        <section className="py-20 section-alt process-steps-section">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gradient mb-4" data-aos="fade-up">Our 3-Step Process</h2>
                    <p className="text-muted max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                        We follow a scientific approach to ensure complete pest elimination.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-step-card relative p-8 rounded-2xl transition-all duration-300 group"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="process-step-number absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                                {step.id}
                            </div>
                            <div className="mt-8 text-center">
                                <i className={`process-step-icon fas ${step.icon} text-5xl mb-6 transition-colors`}></i>
                                <h3 className="process-step-title text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="process-step-text leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
