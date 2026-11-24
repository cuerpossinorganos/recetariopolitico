import monogram from '../../assets/monogram.svg'

export const ABOUT_HREF = '#/sobre-el-proyecto'
export const HOME_HREF = '#/'

// Encabezado crema de todo el sitio: índice (menú), nombre, monograma y enlace a "Sobre el proyecto".
//   page   'home' | 'about': en "about" el nombre y el monograma llevan de vuelta al inicio
export default function SiteHeader({ page = 'home', menuOpen, onOpenMenu }) {
  const onAbout = page === 'about'

  const mark = (
    <img
      className="site-header__monogram"
      src={monogram}
      alt={onAbout ? '' : 'Recetario Político'}
      draggable={false}
    />
  )

  return (
    <header className="site-header">
      <div className="site-header__left">
        <button
          type="button"
          className="site-header__menu"
          aria-label="Abrir el índice"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onClick={onOpenMenu}
        >
          <span />
          <span />
          <span />
        </button>
        {onAbout ? (
          <a className="site-header__title" href={HOME_HREF}>
            Recetario Politico
          </a>
        ) : (
          <span className="site-header__title">Recetario Politico</span>
        )}
      </div>

      {onAbout ? (
        <a className="site-header__mark" href={HOME_HREF} aria-label="Ir al inicio">
          {mark}
        </a>
      ) : (
        mark
      )}

      <a
        className="site-header__about"
        href={ABOUT_HREF}
        aria-current={onAbout ? 'page' : undefined}
      >
        Sobre el proyecto
      </a>
    </header>
  )
}
