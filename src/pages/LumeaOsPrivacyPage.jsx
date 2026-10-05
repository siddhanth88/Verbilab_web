import { useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import '../styles/lumea-privacy.css'

const WIDGETS = [
  {
    name: 'Weather',
    optional: true,
    api: 'ACCESS_COARSE_LOCATION / ACCESS_FINE_LOCATION',
    purpose:
      'Used to obtain localized weather conditions and temperatures. Location information is used only when required to request weather information and is not used by Lumea OS for advertising or behavioral tracking.',
  },
  {
    name: 'Calendar / Next Event',
    optional: true,
    api: 'READ_CALENDAR (Optional)',
    purpose:
      "Reads upcoming calendar events so titles and times can be displayed on the user's home screen. Calendar information remains on the device.",
  },
  {
    name: 'Clock & World Clock',
    api: 'Device Time Services',
    purpose: "Uses Android's standard time and timezone services. No sensitive permission is required.",
  },
  {
    name: 'Next Alarm',
    api: 'AlarmManager.getNextAlarmClock()',
    purpose:
      'Displays the time of the next scheduled system alarm. Lumea OS does not create or modify alarms through this widget.',
  },
  {
    name: 'Search / App Drawer',
    api: 'Device Package Engine',
    purpose: 'Indexes installed applications locally so the launcher can provide app search and quick access.',
  },
  {
    name: 'Photo Widget',
    api: 'Android System Photo Picker (PickVisualMedia)',
    purpose:
      "The user explicitly chooses the photo shown by the widget. Lumea OS receives access only to the selected image through Android's secure Photo Picker and does not require broad gallery access.",
  },
  {
    name: 'Notes & Reminders',
    api: 'Local App Sandbox',
    purpose:
      "User-created notes, checklist content and reminders are stored locally in the application's private storage and are not synced to our servers.",
  },
  {
    name: 'Countdown',
    api: 'Local Device Clock',
    purpose: 'Calculates the time remaining until a date or milestone selected by the user.',
  },
  {
    name: 'Steps',
    optional: true,
    api: 'ACTIVITY_RECOGNITION',
    purpose:
      'Reads the device step-counter sensor to display daily steps and user-selected activity goals. Step information is not uploaded to Lumea OS servers.',
  },
  {
    name: 'Battery',
    api: 'ACTION_BATTERY_CHANGED',
    purpose: 'Reads battery percentage and charging state to display battery information in widgets.',
  },
  {
    name: 'Music / Now Playing',
    optional: true,
    api: 'MediaSessionManager / Notification Listener',
    purpose:
      'Access is used to identify active media playback information such as song title, artist and playback state for the music widget. Lumea OS does not use this capability to collect private messages or personal notifications.',
  },
  {
    name: 'Quick Apps / Radial Menu',
    api: 'QUERY_ALL_PACKAGES',
    purpose:
      'Required for the launcher experience so installed apps can be shown in the app drawer, categorized glass bubbles and radial wheel.',
  },
]

export default function LumeaOsPrivacyPage() {
  useEffect(() => {
    const title = 'Lumea OS Privacy Policy | Verbilab'
    const description =
      'Privacy Policy for Lumea OS, the premium 3D glass Android launcher and widget experience.'
    const previousTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    const created = !meta
    const previousDescription = meta?.getAttribute('content') ?? ''
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (created) meta.remove()
      else meta.setAttribute('content', previousDescription)
    }
  }, [])

  return (
    <>
      <Nav homeHref="/" />
      <main id="main-content" className="legal-page lumea-privacy">
        <article className="legal-page-inner lumea-privacy-inner section-inner">
          <p className="section-kicker">LUMEA OS · PRIVACY</p>
          <h1 className="display-lg legal-page-title">Privacy Policy for Lumea OS</h1>
          <p className="lumea-updated">Last updated: October 1, 2026</p>

          <section className="lumea-block">
            <h2>Introduction</h2>
            <p>
              Lumea OS (&quot;we,&quot; &quot;our,&quot; or &quot;the App&quot;) is developed as a premium paid home
              screen replacement and widget studio application. We believe digital elegance should never come at
              the expense of your personal privacy. This Privacy Policy details our operational practices regarding
              on-device data processing, runtime permissions, widget functionalities, and store transactions.
            </p>
          </section>

          <section className="lumea-block">
            <h2>1. On-device data processing</h2>
            <p>Lumea OS does not harvest, monetize, sell, or maintain external profiles from your personal data.</p>
            <p>The core launcher, themes and Widget Studio primarily process information locally on your device.</p>
            <p>
              We do not require account creation, do not track advertising IDs, and do not upload your notes,
              selected photos, calendar entries, reminders, step history or routine habits to our own servers.
            </p>
            <p>
              Some features require limited external communication as described under Third-Party Network Services,
              such as weather requests and Google Play services.
            </p>
          </section>

          <section className="lumea-block">
            <h2>2. Widget Studio and runtime permission disclosures</h2>
            <div className="lumea-widgets">
              {WIDGETS.map((item) => (
                <section key={item.name} className="lumea-widget">
                  <h3>
                    {item.name}
                    {item.optional ? <span className="lumea-optional">Optional</span> : null}
                  </h3>
                  <p>
                    <strong>Permission / API:</strong> {item.api}
                  </p>
                  <p>
                    <strong>Purpose:</strong> {item.purpose}
                  </p>
                </section>
              ))}
            </div>

            <h3>In-app access and user consent</h3>
            <p>
              The Privacy Policy is accessible from within Lumea OS at any time through the app&apos;s About /
              Privacy Policy area.
            </p>
            <p>
              When Lumea OS requires sensitive or special access for an optional feature, the app presents an
              in-app explanation before requesting or directing the user to enable that capability.
            </p>
            <p>
              Access is feature-specific and user initiated. Users may decline optional access. Permissions and
              special access can also be revoked later through Android system settings.
            </p>
            <p>
              Weather/location, Activity Recognition for Steps, Calendar access and Music/Notification access are
              optional feature permissions. They are not required for the core launcher.
            </p>
          </section>

          <section className="lumea-block">
            <h2>3. Payment processing and financial information</h2>
            <p>Lumea OS is a paid upfront purchase distributed through Google Play.</p>
            <p>
              All payment processing, currency exchange, billing address handling and applicable tax processing are
              performed by Google Play.
            </p>
            <p>
              Lumea OS does not receive or store users&apos; credit/debit card numbers or financial account
              credentials.
            </p>
          </section>

          <section className="lumea-block">
            <h2>4. Third-party network services</h2>
            <p>Lumea OS does not include commercial advertising networks or invasive behavioral analytics SDKs.</p>
            <p>The software may make these limited network connections:</p>
            <ul>
              <li>
                <strong>Weather API providers.</strong> Encrypted HTTPS requests may include location coordinates or
                city information required to retrieve current meteorological information.
              </li>
              <li>
                <strong>Google Play Services / Licensing.</strong> Google Play may perform verification and
                purchase/licensing operations required for official distribution and software authenticity.
              </li>
            </ul>
          </section>

          <section className="lumea-block">
            <h2>5. Data retention, backup and deletion</h2>
            <p>Users control information configured within Lumea OS.</p>
            <ul>
              <li>
                <strong>Widget content.</strong> Notes, reminders, countdown milestones and selected photo references
                can be changed or removed from within the app.
              </li>
              <li>
                <strong>Manual reset.</strong> Clearing Lumea OS storage/data through Android Settings removes local
                application preferences and locally stored widget configuration.
              </li>
              <li>
                <strong>Uninstallation.</strong> Uninstalling Lumea OS removes application-local data according to
                Android&apos;s application storage behavior.
              </li>
            </ul>
          </section>

          <section className="lumea-block">
            <h2>6. Children&apos;s privacy</h2>
            <p>
              Lumea OS does not knowingly use children&apos;s personal data for advertising or behavioral profiling.
              The app is intended to comply with applicable privacy requirements, including relevant requirements
              under COPPA and GDPR where they apply.
            </p>
          </section>

          <section className="lumea-block">
            <h2>7. Policy revisions</h2>
            <p>
              We may update this Privacy Policy when Lumea OS features, Android platform requirements or applicable
              policies change.
            </p>
            <p>Updates will be published on this page with a revised &quot;Last Updated&quot; date.</p>
          </section>

          <section className="lumea-block">
            <h2>8. Contact information</h2>
            <dl className="lumea-contact">
              <div>
                <dt>Developer / Organization</dt>
                <dd>Verbilab LLP</dd>
              </div>
              <div>
                <dt>Contact email</dt>
                <dd>
                  <a href="mailto:support@verbilab.com">support@verbilab.com</a>
                </dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>
                  <a href="https://verbilab.com">https://verbilab.com</a>
                </dd>
              </div>
            </dl>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
