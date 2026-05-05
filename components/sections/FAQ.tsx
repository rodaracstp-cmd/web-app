"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid driver's license (held for at least 1 year), a valid ID or passport, and a credit card in the main driver's name. International visitors may need an International Driving Permit (IDP) depending on their country of origin.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer:
      "Yes! You can cancel or modify your reservation free of charge up to 48 hours before your scheduled pickup time (72 hours for luxury vehicles). Cancellations made within 48 hours may be subject to a fee.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Yes, basic insurance (CDW — Collision Damage Waiver and theft protection) is included in all our rentals. You can upgrade to full coverage for additional peace of mind at a small daily supplement.",
  },
  {
    question: "What is the fuel policy?",
    answer:
      "We operate a full-to-full fuel policy. You'll receive the car with a full tank and simply need to return it with a full tank. If the car isn't returned full, a refueling charge will apply.",
  },
  {
    question: "Can I add an additional driver?",
    answer:
      "Yes, additional drivers can be added to your rental. For SUV & Premium and Luxury categories, one additional driver is included free of charge. For Economy vehicles, a small daily fee applies.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "We offer a 30-minute grace period. After that, a late return fee equivalent to an extra day's rental may be charged. We recommend contacting us if you anticipate being late so we can assist you.",
  },
  {
    question: "Do you offer airport pickup and delivery?",
    answer:
      "Yes! We have desks at Lisbon (LIS), Porto (OPO), and Faro (FAO) airports. For luxury rentals, we also offer a complimentary meet & greet service where we bring the car directly to you at arrivals.",
  },
  {
    question: "What is the minimum age to rent a car?",
    answer:
      "The minimum age to rent is 21 years old. Drivers under 25 may be subject to a young driver surcharge. For luxury vehicles, the minimum age is 25.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif italic text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-text-muted">
            Everything you need to know before hitting the road.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-white rounded-xl border border-border px-6"
            >
              <AccordionTrigger className="text-left font-medium text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-text-muted leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* FAQ structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
