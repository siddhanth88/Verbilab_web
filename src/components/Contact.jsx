import { useEffect, useRef } from 'react'
import { Mail, Share2, MessageCircle, PlayCircle } from 'lucide-react'
import { fadeUp } from '../utils/animations'
import SectionAccent3D from './SectionAccent3D'

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.contact-reveal', { trigger: sectionRef.current })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section id="contact" ref={sectionRef} className="section-pad">
      <p className="section-label contact-reveal">◆ GET IN TOUCH</p>
      <h2 className="section-title contact-reveal">
        Ready to Transform How You Work?
      </h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="contact-reveal grain-overlay relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-7">
          <p className="max-w-md text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Tell us about your challenge. Our team will get back to you within 24 hours.
          </p>
          <a
            href="mailto:hello@verbilab.ai"
            className="inline-flex items-center gap-3 text-lg transition-colors hover:text-[var(--accent)]"
          >
            <Mail size={20} className="text-[var(--accent)]" />
            hello@verbilab.ai
          </a>
          <div className="flex flex-wrap gap-6 text-sm text-[var(--muted)]">
            <a href="#" className="inline-flex items-center gap-2 hover:text-[var(--white)]">
              <Share2 size={16} /> LinkedIn
            </a>
            <a href="#" className="inline-flex items-center gap-2 hover:text-[var(--white)]">
              <MessageCircle size={16} /> Twitter/X
            </a>
            <a href="#" className="inline-flex items-center gap-2 hover:text-[var(--white)]">
              <PlayCircle size={16} /> YouTube
            </a>
          </div>
          <ul className="space-y-2 text-[0.85rem] text-[var(--muted)]">
            <li>• Fast onboarding for BPO, BFSI, and enterprise operations.</li>
            <li>• Implementation support from discovery to deployment.</li>
            <li>• Dedicated review within 24 hours after form submission.</li>
          </ul>
          <SectionAccent3D className="contact-accent" color="#63d5ff" />
        </div>

        <form onSubmit={handleSubmit} className="contact-reveal grain-overlay rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Full Name" name="name" required />
            <Field label="Company Name" name="company" required />
          </div>
          <Field label="Email Address" name="email" type="email" required />
          <Field label="Phone Number (optional)" name="phone" />

          <div>
            <label className="field-label" htmlFor="industry">
              Industry / Sector
            </label>
            <select id="industry" name="industry" className="field-input" required>
              <option value="">Select industry</option>
              <option>BPO / Contact Centre</option>
              <option>Banking & NBFC</option>
              <option>Insurance</option>
              <option>Film & Entertainment</option>
              <option>Enterprise</option>
              <option>Startup</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="field-label" htmlFor="challenge">
              What are you looking to solve?
            </label>
            <textarea
              id="challenge"
              name="challenge"
              rows={4}
              className="field-input resize-y"
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="source">
              How did you hear about us?
            </label>
            <select id="source" name="source" className="field-input">
              <option value="">Select one</option>
              <option>LinkedIn</option>
              <option>Google</option>
              <option>Referral</option>
              <option>Event</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[var(--accent)] py-4 text-[0.9rem] font-medium text-[#050508] transition-opacity hover:opacity-85"
          >
            Let&apos;s Talk AI →
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required = false }) {
  const id = name
  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="field-input"
      />
    </div>
  )
}
