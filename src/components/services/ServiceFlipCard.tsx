import Link from "next/link";

interface ServiceFlipCardProps {
    imageClass: string;
    title: string;
    description: string;
    causes: string;
    prevention: string;
    delay?: number;
}

export default function ServiceFlipCard({
    imageClass,
    title,
    description,
    causes,
    prevention,
    delay = 0,
}: ServiceFlipCardProps) {
    return (
        <div
            className="service-card-flipper"
            data-aos="zoom-in-up"
            data-aos-easing="ease-in-out-back"
            data-aos-delay={delay}
        >
            <div className="service-card">
                <div className="card-front">
                    <div className={`card-image-top ${imageClass}`}></div>
                    <div className="card-description-bottom">
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="card-back">
                    <h4>Causes of Infestation:</h4>
                    <p>{causes}</p>
                    <h4>How to Prevent:</h4>
                    <p>{prevention}</p>
                    <div className="card-back-links">
                        <Link href="/service">Book Service</Link>
                        <Link href="/contact">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
