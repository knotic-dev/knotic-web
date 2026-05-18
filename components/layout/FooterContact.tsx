"use client";

import { useState } from "react";
import { site } from "@/data/content";

export default function FooterContact() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", query: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.query}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setSent(false);
  };

  return (
    <div className="footer-contact">
      {!open && (
        <button
          type="button"
          className="footer-connect-btn"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-controls="footer-contact-form"
        >
          Contact Us
        </button>
      )}

      {open && (
        <div id="footer-contact-form" className="footer-form-card footer-contact-open">
          <div className="footer-form-header">
            <span className="footer-form-title">Send us a message</span>
            <button
              type="button"
              className="footer-form-close"
              onClick={handleClose}
              aria-label="Close form"
            >
              ×
            </button>
          </div>

          {sent ? (
            <p className="footer-form-success">
              Your email client will open shortly with your message.
            </p>
          ) : (
            <form className="footer-form" onSubmit={handleSubmit}>
              <div className="footer-form-row">
                <label className="footer-form-field">
                  <span className="footer-form-label">Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="footer-form-input"
                  />
                </label>
                <label className="footer-form-field">
                  <span className="footer-form-label">Email</span>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="footer-form-input"
                  />
                </label>
              </div>
              <label className="footer-form-field">
                <span className="footer-form-label">Your query</span>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about your project or idea…"
                  value={form.query}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, query: e.target.value }))
                  }
                  className="footer-form-input footer-form-textarea"
                />
              </label>
              <button type="submit" className="footer-form-submit">
                Send message
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
