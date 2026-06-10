import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CircuitBackground from './CircuitBackground'

import { prefersReducedMotion } from '../utils/motion'



gsap.registerPlugin(ScrollTrigger)



const INDUSTRIES = [

  'BPO & Contact Centres',

  'Banking & BFSI',

  'Enterprise',

  'Media & Compliance',

  'Startups',

  'Other',

]



const HEAR_ABOUT = ['Search', 'Referral', 'LinkedIn', 'Conference / Event', 'Other']

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/hello@verbilab.ai'



export default function Contact() {

  const sectionRef = useRef(null)

  const [status, setStatus] = useState('idle')



  useEffect(() => {

    const ctx = gsap.context(() => {

      if (prefersReducedMotion()) return



      gsap.from('.contact-reveal', {

        y: 24,

        opacity: 0,

        stagger: 0.08,

        duration: 0.8,

        ease: 'power3.out',

        immediateRender: false,

        scrollTrigger: {

          trigger: sectionRef.current,

          start: 'top 82%',

          once: true,

        },

      })

    }, sectionRef)

    return () => ctx.revert()

  }, [])



  const handleSubmit = async (e) => {

    e.preventDefault()

    const form = e.currentTarget

    setStatus('sending')



    const formData = new FormData(form)

    formData.append('_subject', 'New Verbilab consultation request')

    formData.append('_captcha', 'false')

    formData.append('_template', 'table')



    try {

      const res = await fetch(FORM_ENDPOINT, {

        method: 'POST',

        body: formData,

        headers: { Accept: 'application/json' },

      })



      if (!res.ok) throw new Error('submit failed')



      setStatus('success')

      form.reset()

    } catch {

      setStatus('error')

    }

  }



  return (

    <section id="contact" ref={sectionRef} className="contact-cta site-section">

      <CircuitBackground />

      <div className="cta-pulse" aria-hidden />

      <div className="contact-sonar-ping" aria-hidden />

      <p className="contact-watermark cta-watermark" aria-hidden>

        VERBILAB

      </p>



      <div className="contact-cta-grid section-inner">

        <div className="contact-cta-copy">

          <p className="section-kicker contact-reveal">CONTACT</p>

          <h2 className="display-lg contact-reveal contact-headline cta-line">

            READY TO BUILD INTELLIGENT SYSTEMS?

          </h2>

          <p className="body-short contact-reveal">

            Tell us your challenge. We respond within 24 hours.

          </p>

          <div className="contact-meta contact-reveal">

            <a

              href="mailto:hello@verbilab.ai"

              className="mono-label contact-email-link !text-[var(--white)]"

            >

              hello@verbilab.ai

            </a>

            <span className="contact-divider" aria-hidden />

            <span className="mono-label subtle">Enterprise · BPO · BFSI</span>

          </div>

        </div>



        <form

          id="contact-form"

          onSubmit={handleSubmit}

          className="contact-form contact-form--full contact-form--compact glass-panel glow-border tech-frame contact-reveal"

        >

          <span className="tech-frame-corner tl" aria-hidden />

          <span className="tech-frame-corner br" aria-hidden />

          <p className="mono-label subtle contact-form-label">REQUEST A CONSULTATION</p>



          <input type="text" name="_honey" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden />



          <div className="contact-form-grid contact-form-grid--2">

            <Field label="Full Name" name="fullName" required />

            <Field label="Company Name" name="company" required />

          </div>



          <div className="contact-form-grid contact-form-grid--2">

            <Field label="Email Address" name="email" type="email" required />

            <Field label="Phone Number (optional)" name="phone" type="tel" />

          </div>



          <div className="contact-form-grid contact-form-grid--2 contact-form-grid--selects">

            <SelectField label="Industry / Sector" name="industry" options={INDUSTRIES} required />

            <SelectField label="How did you hear about us?" name="source" options={HEAR_ABOUT} />

          </div>



          <div>

            <label className="field-label" htmlFor="solve">

              What are you looking to solve?

            </label>

            <textarea

              id="solve"

              name="solve"

              rows={2}

              className="field-input resize-y"

              placeholder="Describe your operational challenge"

              required

            />

          </div>



          <button type="submit" className="btn-premium contact-submit w-full" disabled={status === 'sending'}>

            {status === 'sending' ? 'Sending…' : "Let's Talk AI →"}

          </button>



          <p className="contact-form-status" role="status" aria-live="polite">

            {status === 'success' && 'Message sent. We will respond within 24 hours.'}

            {status === 'error' && 'Something went wrong. Email us at hello@verbilab.ai'}

          </p>

        </form>

      </div>

    </section>

  )

}



function Field({ label, name, type = 'text', required = false }) {

  return (

    <div className="contact-field">

      <label className="field-label contact-field-label" htmlFor={name}>

        {label}

      </label>

      <input id={name} name={name} type={type} required={required} className="field-input contact-field-input" />

    </div>

  )

}



function SelectField({ label, name, options, required = false }) {

  return (

    <div className="contact-field">

      <label className="field-label contact-field-label" htmlFor={name}>

        {label}

      </label>

      <div className="contact-select-wrap">

        <select id={name} name={name} required={required} className="field-input contact-field-input contact-select">

          <option value="">Select…</option>

          {options.map((opt) => (

            <option key={opt} value={opt}>

              {opt}

            </option>

          ))}

        </select>

      </div>

    </div>

  )

}


