"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface BookingFormData {
    pests: string[];
    propertyType: "residential" | "commercial";
    propertySizeRes: string;
    propertySizeCom: string;
    customArea: string;
    fullName: string;
    mobileNumber: string;
    emailAddress: string;
    address: string;
    city: string;
    pincode: string;
    serviceDate: string;
    timeSlot: string;
}

const defaultPricing = {
    pests: {
        Termite: 1500, "Bed Bugs": 1800, Rodents: 1500, Cockroach: 1200,
        Mosquito: 1200, Ants: 1200, Spiders: 1200, Flies: 1200,
        "Wood Borer": 1200, General: 1200
    },
    residential: {
        "1BHK": 800, "2BHK": 1000, "3BHK": 2000, "4BHK": 3000, "Villa": 5000
    },
    commercial: {
        "1000": 1000, "2000": 1800, "3000": 2500, "customMultiplier": 1.5
    }
};

export default function BookingForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<BookingFormData>({
        pests: [],
        propertyType: "residential",
        propertySizeRes: "1BHK",
        propertySizeCom: "1000",
        customArea: "",
        fullName: "",
        mobileNumber: "",
        emailAddress: "",
        address: "",
        city: "",
        pincode: "",
        serviceDate: "",
        timeSlot: "",
    });
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pricing, setPricing] = useState<any>(defaultPricing);
    const showEstimate = Boolean(pricing?.settings?.showEstimate);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const [{ doc, getDoc }, { db }] = await Promise.all([
                    import("firebase/firestore"),
                    import("@/lib/firebase"),
                ]);
                const pricingRef = doc(db, "pricing", "default");
                const pricingSnap = await getDoc(pricingRef);
                if (pricingSnap.exists()) {
                    setPricing(pricingSnap.data());
                }
            } catch (error) {
                console.error("Failed to fetch pricing, using defaults", error);
            }
        };
        fetchPricing();
    }, []);

    useEffect(() => {
        calculatePrice();
    }, [
        formData.pests,
        formData.propertyType,
        formData.propertySizeRes,
        formData.propertySizeCom,
        formData.customArea,
        pricing
    ]);

    const calculatePrice = () => {
        let pestsPrice = 0;
        let basePrice = 0;

        formData.pests.forEach((pest) => {
            pestsPrice += (pricing.pests && pricing.pests[pest]) || defaultPricing.pests[pest as keyof typeof defaultPricing.pests] || 0;
        });

        if (formData.propertyType === "residential") {
            basePrice = (pricing.residential && pricing.residential[formData.propertySizeRes]) || 0;
        } else {
            if (formData.propertySizeCom === "custom") {
                const area = parseInt(formData.customArea) || 0;
                const multiplier = pricing.commercial?.customMultiplier || 1.5;
                basePrice = Math.round(area * multiplier);
            } else {
                basePrice = (pricing.commercial && pricing.commercial[formData.propertySizeCom]) || 0;
            }
        }

        setEstimatedPrice(formData.pests.length === 0 ? 0 : pestsPrice + basePrice);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "mobileNumber") {
            // Only allow digits for mobile number
            if (/^\d*$/.test(value) && value.length <= 15) {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePestChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            pests: checked ? [...prev.pests, value] : prev.pests.filter((p) => p !== value)
        }));
    };

    const handleTimeSlotSelect = (slot: string) => {
        setFormData((prev) => ({ ...prev, timeSlot: slot }));
    };

    const nextStep = async () => {
        const Swal = (await import("sweetalert2")).default;

        if (step === 1) {
            if (formData.pests.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Selection Required",
                    text: "Please select at least one pest service.",
                    confirmButtonColor: "#8A2BE2",
                });
                return;
            }
            if (formData.propertyType === "commercial" && formData.propertySizeCom === "custom" && !formData.customArea) {
                Swal.fire({
                    icon: "error",
                    title: "Missing Information",
                    text: "Please enter the custom area size.",
                    confirmButtonColor: "#8A2BE2",
                });
                return;
            }
        }

        if (step === 2) {
            // Check for empty fields
            if (!formData.fullName.trim() || !formData.mobileNumber || !formData.emailAddress.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
                Swal.fire({
                    icon: "error",
                    title: "Missing Fields",
                    text: "All fields are required. Please fill in all details.",
                    confirmButtonColor: "#8A2BE2",
                });
                return;
            }

            // Mobile validation (Strictly 10 digits)
            if (formData.mobileNumber.length < 10) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Phone Number",
                    text: "Please enter a valid mobile number (at least 10 digits).",
                    confirmButtonColor: "#8A2BE2",
                });
                return;
            }

            // Email validation (basic format check)
            const email = formData.emailAddress.trim().toLowerCase();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                Swal.fire({
                    icon: "error",
                    title: "Invalid Email",
                    text: "Please enter a valid email address.",
                    confirmButtonColor: "#8A2BE2",
                });
                return;
            }
        }

        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const Swal = (await import("sweetalert2")).default;

        if (showEstimate && estimatedPrice === 0) {
            Swal.fire("Error", "Please select at least one service.", "error");
            return;
        }

        if (!formData.timeSlot) {
            Swal.fire({
                icon: "error",
                title: "Time Slot Required",
                text: "Please select a preferred time slot.",
                confirmButtonColor: "#8A2BE2",
            });
            return;
        }

        setIsLoading(true);

        const propertySizeValue =
            formData.propertyType === "residential"
                ? formData.propertySizeRes
                : formData.propertySizeCom === "custom"
                    ? `${formData.customArea} sq. ft.`
                    : `${formData.propertySizeCom} sq. ft.`;

        const bookingData: Record<string, unknown> = {
            userId: "anonymous",
            userName: formData.fullName,
            userEmail: formData.emailAddress,
            mobile: formData.mobileNumber,
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
            services: formData.pests,
            propertyType: formData.propertyType,
            propertySize: propertySizeValue,
            bookingDate: formData.serviceDate,
            timeSlot: formData.timeSlot || "Not Selected",
            estimatedCost: showEstimate ? `₹ ${estimatedPrice}` : "Hidden",
            status: "Scheduled",
            paymentStatus: "Pending",
            createdAt: null,
        };

        try {
            const [{ addDoc, collection, serverTimestamp }, { db }] = await Promise.all([
                import("firebase/firestore"),
                import("@/lib/firebase"),
            ]);
            bookingData.createdAt = serverTimestamp();
            await addDoc(collection(db, "bookings"), bookingData);
            Swal.fire({
                icon: "success",
                title: "Booking Confirmed!",
                text: "Our team will contact you soon",
                confirmButtonColor: "#8A2BE2",
            });
            setFormData({
                pests: [], propertyType: "residential", propertySizeRes: "1BHK", propertySizeCom: "1000",
                customArea: "", fullName: "", mobileNumber: "", emailAddress: "", address: "", city: "",
                pincode: "", serviceDate: "", timeSlot: "",
            });
            setStep(1);
        } catch (error) {
            console.error("Error saving booking: ", error);
            Swal.fire({
                icon: "error",
                title: "Oops... Error!",
                text: "Failed to save booking. Please try again.",
                confirmButtonColor: "#8A2BE2",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="booking-form max-w-4xl mx-auto glass-card p-8 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[color:var(--secondary)]/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white mb-2" data-aos="fade-down">Complete Your Booking</h2>
                    <p className="text-gray-400">Secure your inspection in 3 easy steps</p>
                </div>

                {/* FIXED: Modern Progress Bar */}
                <div className="flex justify-between items-start mb-12 relative max-w-2xl mx-auto px-2">
                    {/* The Background Line (Perfectly Centered to the circles) */}
                    <div className="absolute left-0 top-6 transform -translate-y-1/2 w-full h-[2px] bg-white/10 z-0"></div>

                    {[1, 2, 3].map((num) => (
                        <div key={num} className={`flex flex-col items-center gap-2 relative z-10 ${step >= num ? "opacity-100" : "opacity-40"}`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= num
                                ? "bg-gradient-to-r from-[color:var(--secondary)] to-[color:var(--accent)] text-white shadow-[0_0_20px_rgba(77,124,255,0.4)] border-none"
                                : "bg-[#141623] text-gray-400 border border-white/20"
                                }`}>
                                {step > num ? <i className="fas fa-check"></i> : num}
                            </div>
                            <span className="text-sm font-medium text-gray-300 mt-1">
                                {num === 1 ? "Needs" : num === 2 ? "Details" : "Schedule"}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="min-h-[400px]">

                    {/* STEP 1: NEEDS */}
                    {step === 1 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">1. What pest is the service for?</h3>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                {[
                                    { value: "Cockroach", icon: "fa-bug" },
                                    { value: "Termite", icon: "fa-bug-slash" },
                                    { value: "Mosquito", icon: "fa-mosquito" },
                                    { value: "Rodents", icon: "fa-paw" },
                                    { value: "Bed Bugs", icon: "fa-bed" },
                                    { value: "Ants", icon: "fa-disease" },
                                    { value: "Spiders", icon: "fa-spider" },
                                    { value: "General", icon: "fa-shield-alt" },
                                ].map((pest) => (
                                    <label key={pest.value} className="cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            name="pest"
                                            value={pest.value}
                                            checked={formData.pests.includes(pest.value)}
                                            onChange={handlePestChange}
                                            className="peer hidden"
                                        />
                                        <div className="h-full flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.5)] text-gray-400 transition-all duration-300 peer-checked:border-[color:var(--accent)] peer-checked:bg-[rgba(77,124,255,0.15)] peer-checked:text-white hover:border-white/30 hover:bg-[rgba(255,255,255,0.05)] shadow-lg">
                                            <i className={`fas ${pest.icon} text-3xl mb-3 peer-checked:scale-110 transition-transform`}></i>
                                            <span className="font-medium text-sm text-center">{pest.value}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">2. Property Details</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <label className="cursor-pointer">
                                    <input type="radio" name="propertyType" value="residential" checked={formData.propertyType === "residential"} onChange={handleInputChange} className="peer hidden" />
                                    <div className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.5)] text-gray-300 transition-all peer-checked:border-[color:var(--accent)] peer-checked:bg-[rgba(77,124,255,0.15)] peer-checked:text-white">
                                        <i className="fas fa-home text-2xl"></i> <span className="text-lg font-medium">Residential (Home)</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" name="propertyType" value="commercial" checked={formData.propertyType === "commercial"} onChange={handleInputChange} className="peer hidden" />
                                    <div className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.5)] text-gray-300 transition-all peer-checked:border-[color:var(--accent)] peer-checked:bg-[rgba(77,124,255,0.15)] peer-checked:text-white">
                                        <i className="fas fa-building text-2xl"></i> <span className="text-lg font-medium">Commercial (Office)</span>
                                    </div>
                                </label>
                            </div>

                            <div className="mb-8">
                                {formData.propertyType === "residential" ? (
                                    <select name="propertySizeRes" value={formData.propertySizeRes} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.8)] text-white outline-none focus:border-[color:var(--accent)]">
                                        <option value="1BHK">1 BHK Apartment</option>
                                        <option value="2BHK">2 BHK Apartment</option>
                                        <option value="3BHK">3 BHK Apartment</option>
                                        <option value="4BHK">4 BHK Apartment</option>
                                        <option value="Villa">Villa / Independent House</option>
                                    </select>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <select name="propertySizeCom" value={formData.propertySizeCom} onChange={handleInputChange} className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.8)] text-white outline-none focus:border-[color:var(--accent)]">
                                            <option value="1000">Up to 1000 sq. ft.</option>
                                            <option value="2000">1000-2000 sq. ft.</option>
                                            <option value="3000">2000-3000 sq. ft.</option>
                                            <option value="custom">Custom Area</option>
                                        </select>
                                        {formData.propertySizeCom === "custom" && (
                                            <div className="flex items-center bg-[rgba(11,12,18,0.8)] border border-white/10 rounded-xl overflow-hidden focus-within:border-[color:var(--accent)]">
                                                <input type="number" name="customArea" placeholder="e.g. 2500" value={formData.customArea} onChange={handleInputChange} className="w-full px-5 py-4 bg-transparent text-white outline-none" />
                                                <span className="px-4 text-gray-400 border-l border-white/10">sq.ft</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <button type="button" onClick={nextStep} className="btn-primary w-full md:w-auto px-10">Next Step <i className="fas fa-arrow-right ml-2"></i></button>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: DETAILS */}
                    {step === 2 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Personal Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Mobile Number</label>
                                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="+91 00000 00000" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                                    <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-400 mb-2 text-sm">Full Address</label>
                                    <textarea name="address" rows={2} value={formData.address} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="House No, Street, Landmark..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">City</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="Gurugram" />
                                </div>
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Pincode</label>
                                    <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.6)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" placeholder="122002" />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4 gap-4">
                                <button type="button" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">Back</button>
                                <button type="button" onClick={nextStep} className="btn-primary flex-1 md:flex-none md:w-auto px-10">Next Step <i className="fas fa-arrow-right ml-2"></i></button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: SCHEDULE & CONFIRM */}
                    {step === 3 && (
                        <div className="animate-fade-in-up">
                            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Schedule Your Visit</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Select Date</label>
                                    <input type="date" name="serviceDate" min={new Date().toISOString().split("T")[0]} value={formData.serviceDate} onChange={handleInputChange} required className="w-full px-5 py-4 rounded-xl border border-white/10 bg-[rgba(11,12,18,0.8)] text-white focus:border-[color:var(--accent)] outline-none transition-colors" style={{ colorScheme: 'dark' }} />
                                </div>

                                <div>
                                    <label className="block text-gray-400 mb-2 text-sm">Select Time Slot</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        {["Morning (9am-12pm)", "Afternoon (1pm-4pm)", "Evening (4pm-7pm)"].map((slot) => (
                                            <div key={slot} onClick={() => handleTimeSlotSelect(slot.split(" ")[0])} className={`cursor-pointer px-5 py-4 rounded-xl border transition-all text-center font-medium ${formData.timeSlot === slot.split(" ")[0] ? "border-[color:var(--accent)] bg-[rgba(77,124,255,0.15)] text-white" : "border-white/10 bg-[rgba(11,12,18,0.5)] text-gray-400 hover:border-white/30"}`}>
                                                <i className={`far ${slot.includes('Morning') ? 'fa-sun text-yellow-500' : slot.includes('Afternoon') ? 'fa-cloud-sun text-orange-400' : 'fa-moon text-blue-300'} mr-2`}></i> {slot}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Price Preview Card */}
                            {showEstimate && (
                                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-white/10 rounded-2xl p-6 mb-8 flex justify-between items-center shadow-lg">
                                    <div>
                                        <span className="block text-gray-400 text-sm mb-1">Estimated Cost</span>
                                        <span className="text-xs text-green-400"><i className="fas fa-shield-alt"></i> No hidden charges</span>
                                    </div>
                                    <div className="text-3xl md:text-4xl font-extrabold text-white">
                                        ₹{estimatedPrice}
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between pt-4 gap-4">
                                <button type="button" onClick={prevStep} className="px-8 py-4 rounded-xl font-bold bg-white/10 text-white hover:bg-white/20 transition-colors">Back</button>
                                <button type="submit" disabled={isLoading || (showEstimate && estimatedPrice === 0)} className="btn-primary flex-1 py-4 text-lg shadow-lg shadow-blue-500/20 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? <><i className="fas fa-circle-notch fa-spin"></i> Processing...</> : <><i className="fas fa-calendar-check"></i> Confirm Booking</>}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}