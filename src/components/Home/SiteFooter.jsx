import { useState } from 'react'
import monogram from '../../assets/monogram.svg'
import { footer } from '../../data/footer'
import { subscribe } from '../../services/subscribe'
import './SiteFooter.css'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const YEAR = new Date().getFullYear()

// Pie de página: el monograma grande y la invitación a recibir las próximas recetas por correo.
export default function SiteFooter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'invalid' | 'sending' | 'done' | 'failed'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!EMAIL.test(email.trim())) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    try {
      const { ok } = await subscribe(email.trim())
      setStatus(ok ? 'done' : 'failed')
      if (ok) setEmail('')
    } catch {
      setStatus('failed')
    }
  }

  const message = {
    invalid: footer.invalid,
    sending: footer.sending,
    done: footer.done,
    failed: footer.failed,
  }[status]

  return (
    <footer className="site-footer">
      <span
        className="site-footer__mark"
        role="img"
        aria-label="Recetario Político"
        style={{ '--mask-url': `url(${monogram})` }}
      />

      <div className="site-footer__news">
        <h2 className="site-footer__title">{footer.title}</h2>
        <p className="site-footer__text">{footer.text}</p>

        <form className="site-footer__form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="footer-email">
            Correo electrónico
          </label>
          <input
            id="footer-email"
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            placeholder={footer.placeholder}
            value={email}
            aria-invalid={status === 'invalid'}
            aria-describedby="footer-message"
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === 'invalid' || status === 'failed') setStatus('idle')
            }}
          />
          <button type="submit" disabled={status === 'sending'}>
            {footer.button}
          </button>
        </form>

        <p id="footer-message" className="site-footer__message" role="status" data-status={status}>
          {message}
        </p>
      </div>

      <p className="site-footer__rights">
        © {YEAR} {footer.rights}
      </p>
    </footer>
  )
}
