"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    // Mock submission
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1000);
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif italic text-primary mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-text-muted">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-surface rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Message Sent!
                </h3>
                <p className="text-text-muted">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Your Name"
                  name="name"
                  placeholder="John Doe"
                  required
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-text mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                    className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-colors resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="accent"
                  className="w-full rounded-full"
                  disabled={sending}
                >
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Phone</h3>
                <a
                  href="tel:+351912345678"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  +351 912 345 678
                </a>
                <p className="text-sm text-text-muted mt-1">
                  Available 24/7 for emergencies
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Email</h3>
                <a
                  href="mailto:info@roda-rentals.com"
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  info@roda-rentals.com
                </a>
                <p className="text-sm text-text-muted mt-1">
                  We reply within 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Address</h3>
                <p className="text-text-muted">
                  Avenida da Liberdade, 110
                  <br />
                  1250-146 Lisbon, Portugal
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                <p className="text-text-muted">
                  Monday - Saturday: 08:00 - 20:00
                  <br />
                  Sunday: 09:00 - 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
