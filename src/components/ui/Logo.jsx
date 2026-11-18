import logo from '../../assets/logo.png'

// Logo "Recetario Político". Toma el color del texto (`color` en CSS),
// así sirve en crema sobre fondo oscuro y en marrón sobre el menú.
export default function Logo({ className = '' }) {
  return (
    <span
      className={`logo ${className}`}
      role="img"
      aria-label="Recetario Político"
      style={{ '--logo-url': `url(${logo})` }}
    />
  )
}
