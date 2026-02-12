export default function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "PestControlService",
        "name": "Arya Pest Control",
        "image": "https://aryapestcontrol.in/images/logo.jpg",
        "description": "Professional pest control services in Gurugram specializing in termite, cockroach, and bed bug control.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "S block, Road No S-27/15, Sector 24, DLF phase 3",
            "addressLocality": "Gurugram",
            "addressRegion": "Haryana",
            "postalCode": "122002",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 28.4912,
            "longitude": 77.1045
        },
        "telephone": "+919650162125",
        "priceRange": "₹₹",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "08:00",
                "closes": "21:00"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
