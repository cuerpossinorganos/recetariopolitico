import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import logoHorizontal from '../../assets/logo-horizontal.svg'
import mantel from '../../assets/home/mantel.webp'
import { cards } from '../../data/cards'
import Menu from '../Menu/Menu'
import CardDeck from './CardDeck'
import Contents from './Contents'
import Envelope from './Envelope'
import Glasses from './Glasses'
import SiteFooter from './SiteFooter'
import SiteHeader, { ABOUT_HREF } from './SiteHeader'
import './Home.css'

const LEAD =
  'Una historia interactiva que pregunta de dónde vienen los saberes que llamamos medicina, superstición o comercio informal.'

// Página de inicio: encabezado, portada, mesa con las cards, el sobre con los papeles
// y la zona de contenido (de día / de noche).
//   focus   'recetas' = al abrir, bajar directo a las cards (viene del menú de otra página)
export default function Home({ onReplay, focus, onFocused }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const tableRef = useRef(null)

  const goToCards = () => {
    tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  useEffect(() => {
    if (focus !== 'recetas') return undefined
    const timer = window.setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      onFocused?.()
    }, 500)
    return () => window.clearTimeout(timer)
  }, [focus, onFocused])

  const handleSelectChapter = (id) => {
    if (id === 'prologo') onReplay()
    if (id === 'recetas') goToCards()
  }

  return (
    <motion.div
      className="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <SiteHeader page="home" menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />

      <main>
        <section className="hero">
          <h1
            className="hero__logo"
            role="img"
            aria-label="Recetario Político"
            style={{ '--mask-url': `url(${logoHorizontal})` }}
          />
          <p className="hero__lead">{LEAD}</p>
          <button type="button" className="pill pill--comenzar" onClick={goToCards}>
            Comenzar
          </button>
        </section>

        <section id="recetas" className="table" ref={tableRef} aria-label="Recetas">
          <div className="table__stage">
            <img className="table__mantel" src={mantel} alt="" draggable={false} />
            <Glasses />
            <CardDeck cards={cards} />
          </div>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about__text">
            <h2 id="about-title" className="about__title">
              <span>Toda receta empieza con</span> <span>una lista de ingredientes, y</span>{' '}
              <span>casi nunca nos preguntamos</span> <span>de dónde vienen</span>
            </h2>
            <p className="about__lead">
              Recetario Político hace esa pregunta con las palabras. ¿Quién decidió que unas
              plantas fueran medicina y otras remedio? ¿En qué momento curar con hierbas pasó a
              llamarse superstición, y vender lo que se sabe pasó a llamarse comercio informal?
            </p>
            <a className="pill pill--about" href={ABOUT_HREF}>
              Sobre el proyecto
            </a>
          </div>

          <Envelope />
        </section>

        <Contents />
      </main>

      <SiteFooter />

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
