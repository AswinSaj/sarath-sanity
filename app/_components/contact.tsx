import { client } from "@/sanity/lib/client";
import { contactQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { ContactForm } from "./contact-form";

interface ContactData {
    _id: string;
    title: string;
    heading: string;
    instagram: string;
    email: string;
    phone: string;
    image?: {
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
    };
}

async function getContactData(): Promise<ContactData | null> {
    try {
        const data = await client.fetch(contactQuery);
        return data;
    } catch (error) {
        console.error("Error fetching contact data:", error);
        return null;
    }
}

export default async function Contact() {
    const contactData = await getContactData();

    // Fallback content if no data is available
    const fallbackData = {
        title: "CONTACT",
        heading: "Let's work together",
        instagram: "sarathmenonfilms",
        email: "sarathmenonfilms@gmail.com",
        phone: "+91 7387000371"
    };

    const displayData = contactData || fallbackData;

    return (
        <section id="contact" className="min-h-screen bg-black text-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-8 tracking-wider">{displayData.title}</h2>
                </div>

                {/* Main Content - 50/50 Layout */}
                <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Vertical Separator Line - Hidden on mobile */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>
                    {/* Left Half - Let's work together + Contact Info + Image */}
                    <div className="space-y-8">
                        {/* Center-aligned heading */}
                        <div className="text-center">
                            <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                                {displayData.heading}
                            </h3>
                        </div>

                        {/* Image and Contact Info Side by Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {/* Image on Left */}
<div className="relative h-[250px] md:h-[300px] overflow-hidden bg-black">
                                {contactData?.image ? (
                                    <Image
                                        src={contactData.image.asset.url}
                                        alt={contactData.image.alt || "Contact"}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                        <div className="text-gray-400 text-center">
                                            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                            </svg>
                                            <p className="text-xs sm:text-sm">Add Contact Image</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Info on Right */}
                            <div className="space-y-6 flex flex-col md:items-start items-center text-left">
                                {/* Instagram */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </div>
                                    <a
                                        href="https://www.instagram.com/sarathmenonfilms/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        sarathmenonfilms
                                    </a>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <a
                                        href={`mailto:${displayData.email}`}
                                        className="text-lg text-gray-300 hover:text-white transition-colors duration-300 break-all"
                                    >
                                        {displayData.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <a
                                        href={`tel:${displayData.phone}`}
                                        className="text-lg text-gray-300 hover:text-white transition-colors duration-300"
                                    >
                                        {displayData.phone}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Half - Get in Touch + Contact Form */}
                    <div className="space-y-8">
                        {/* Center-aligned heading */}
                        <div className="text-center">
                            <h3 className="text-3xl lg:text-4xl font-bold leading-tight">
                                Get in Touch
                            </h3>
                        </div>
                        <ContactForm />
                    </div>
                </div>


            </div>
        </section>
    );
}