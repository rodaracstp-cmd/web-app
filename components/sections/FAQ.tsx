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
      "You will need a valid passport, a driver's license (held for at least 1 year), and a credit card in the main driver's name. International visitors may also need an International Driving Permit (IDP) depending on their country of origin.",
  },
  {
    question: "Are the roads in São Tomé safe to drive?",
    answer:
      "The main roads around São Tomé city and between major towns are paved and generally in good condition. However, some roads to more remote beaches and attractions can be unpaved or have potholes, especially during the rainy season. We recommend an SUV or 4x4 if you plan to explore beyond the main routes.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Yes! Full insurance is included on all our vehicles at no extra cost. This covers collision damage, theft protection, and third-party liability, so you can explore the islands with complete peace of mind.",
  },
  {
    question: "Do you offer airport pickup?",
    answer:
      "Yes, we offer pickup and drop-off at São Tomé International Airport (TMS). Just let us know your flight details when booking and we will have your vehicle ready when you arrive. We can also deliver to hotels and other locations across the island.",
  },
  {
    question: "Can I drive to Príncipe?",
    answer:
      "No, it is not possible to drive between the two islands. However, we can help you arrange ferry or flight transport to Príncipe. Contact us and we will be happy to assist with planning your inter-island trip.",
  },
  {
    question: "What fuel policy do you use?",
    answer:
      "We operate a full-to-full fuel policy. You will receive the car with a full tank and simply need to return it with a full tank. If the car is not returned full, a refueling charge will apply.",
  },
  {
    question: "Do you provide baby seats and GPS?",
    answer:
      "Yes, both baby seats and GPS devices are available upon request. Please let us know when making your reservation so we can have them ready for your pickup. There is no additional charge for GPS on SUV and 4x4 rentals.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, Apple Pay, and Google Pay. A credit card is required at the time of pickup for the security deposit. Debit cards are accepted for online reservations but not for the deposit.",
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
            Everything you need to know before exploring the islands.
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
