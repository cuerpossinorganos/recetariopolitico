import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import Menu from '../Menu/Menu'
import SiteHeader, { HOME_HREF } from '../Home/SiteHeader'
import { aboutProject } from '../../data/about'
import './AboutProject.css'

// Página aparte "Sobre el proyecto". El texto está en src/data/about.js (pendiente).
//   onReplay   volver a ver la intro
//   onGoHome   volver al inicio (opcionalmente llevando a las recetas)
export default function AboutProject({ onReplay, onGoHome }) {
  const [menuOpen, setMenuOpen] = useState(false)

  // La página siempre se abre desde arriba y deja su título en la pestaña
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const previous = document.title
    document.title = `${aboutProject.title} · Recetario Político`
    return () => {
      document.title = previous
    }
  }, [])

  const handleSelectChapter = (id) => {
    if (id === 'prologo') onReplay()
    if (id === 'recetas') onGoHome('recetas')
  }

  return (
    <motion.div
      className="home about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <SiteHeader page="about" menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

      <main className="about-page__main">
        <p className="about-page__eyebrow">Recetario Político</p>
        <h1 className="about-page__title">{aboutProject.title}</h1>

        <div className="about-page__body">
          <p className="about-page__lead">{aboutProject.lead}</p>
          {aboutProject.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        <a className="pill about-page__back" href={HOME_HREF}>
          Volver al inicio
        </a>
      </main>

      <Menu
        open={menuOpen}
        current="recetas"
        reached={['prologo', 'recetas']}
        onSelect={handleSelectChapter}
        onClose={() => setMenuOpen(false)}
      />
    </motion.div>
  )
}
