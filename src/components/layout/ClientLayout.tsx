"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
    ssr: false,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
    ssr: false,
});

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-in-out",
        });
    }, []);

    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
