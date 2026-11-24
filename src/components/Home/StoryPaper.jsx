import Rich from './Rich'
import './StoryPaper.css'

// Pequeñas diferencias de posición de los números de los pasos, como si estuvieran
// escritos a mano uno por uno (en unidades del diseño: 1 unidad = 1/1628 del ancho).
const NUMERAL_JITTER = [
  { x: 12, y: 16 },
  { x: 2, y: 24 },
  { x: 6, y: 24 },
  { x: 0, y: 19 },
  { x: 1, y: 22 },
  { x: 4, y: 27 },
  { x: 0, y: 7 },
]

const pad = (n) => String(n).padStart(2, '0')

function MapIcon() {
  return (
    <svg className="story__map-icon" viewBox="115 8 275 266" aria-hidden="true" focusable="false">
      <path d="M125 70 L205 108 M125 70 V220 L210 265 L290 222 L372 265 V152" />
      <circle cx="312" cy="85" r="68" />
      <circle cx="312" cy="85" r="36" />
      <rect
        x="-12"
        y="-46"
        width="24"
        height="92"
        rx="12"
        transform="translate(241.5 156.5) rotate(46.7)"
      />
    </svg>
  )
}

// ---------- Bloques de la preparación ----------

function Paragraphs({ paragraphs, className }) {
  return paragraphs.map((p, i) => (
    <p key={i} className={[className, p.tight ? 'is-tight' : ''].filter(Boolean).join(' ')}>
      <Rich text={p.text} />
    </p>
  ))
}

function Steps({ block }) {
  const items = block.items.map((it) => (typeof it === 'string' ? { text: it } : it))
  return (
    <div className="story__steps-wrap">
      {block.label && <p className="story__meta">{block.label}</p>}
      <ol className={`story__steps${items.length > 7 ? ' story__steps--dense' : ''}`}>
        {items.map((item, i) => {
          const j = NUMERAL_JITTER[i % NUMERAL_JITTER.length]
          return (
            <li key={i} style={{ '--nx': j.x, '--ny': j.y }}>
              <span className="story__step-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              {item.text ? <Rich text={item.text} /> : <span className="sr-only">(en blanco)</span>}
              {item.appendix && (
                <aside className="story__appendix">
                  <p className="story__meta">{item.appendix.title}</p>
                  {[].concat(item.appendix.text).map((text, k) => (
                    <p key={k}>
                      <Rich text={text} />
                    </p>
                  ))}
                </aside>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Script({ items }) {
  return (
    <div className="story__script">
      {items.map((it, i) => (
        <p key={i} className={`sc sc--${it.t}`}>
          <Rich text={it.text} />
        </p>
      ))}
    </div>
  )
}

function Recipes({ items }) {
  return (
    <div className="story__recipes">
      {items.map((r) => (
        <section key={r.title}>
          <h4>{r.title}</h4>
          <p className="story__recipe-by">{r.by}</p>
          <ol>
            {r.steps.map((s, i) => (
              <li key={i}>
                <span className="story__recipe-num" aria-hidden="true">
                  {i + 1}
                </span>
                <span>
                  <Rich text={s} />
                </span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

function Box({ block }) {
  return (
    <div className="story__box-wrap">
      {block.label && <h3 className="story__label story__label--strong">{block.label}</h3>}
      <aside className="story__box">
        {block.title && <h4>{block.title}</h4>}
        {block.paragraphs.map((p, i) => (
          <p key={i}>
            <Rich text={p} />
          </p>
        ))}
      </aside>
    </div>
  )
}

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'steps':
        return <Steps key={i} block={b} />
      case 'prose':
        return (
          <div key={i} className="story__prose">
            <Paragraphs paragraphs={b.paragraphs} />
          </div>
        )
      case 'script':
        return <Script key={i} items={b.items} />
      case 'recipes':
        return <Recipes key={i} items={b.items} />
      case 'box':
        return <Box key={i} block={b} />
      default:
        return null
    }
  })
}

// Cuando una planta todavía no tiene su historia cargada
function EmptyStory({ card }) {
  return (
    <div className="story__empty">
      <p className="story__num">{card.number}</p>
      <h2 className="story__title">{card.title}</h2>
      <p className="story__empty-note">La historia de esta planta todavía no está cargada.</p>
    </div>
  )
}

// La cara de atrás de una card: la historia completa de la planta, con el diseño del PDF.
// El tamaño de todo escala con el ancho del papel (container queries), y en pantallas
// angostas se reacomoda en una sola columna.
export default function StoryPaper({ story, card }) {
  const hasNotes = story?.ingredients?.some((row) => row.note)

  return (
    <article className="story">
      <div className="story__in">
        {!story ? (
          <EmptyStory card={card} />
        ) : (
          <>
            <header className="story__head">
              <p className="story__num">{story.number}</p>
              <p className="story__map">
                <MapIcon />
                <span>MAP</span>
              </p>
              <h2
                className="story__title"
                style={{ '--ts': story.title.length > 34 ? 0.82 : 1 }}
              >
                {story.title}
              </h2>
              <p
                className="story__subtitle"
                style={{
                  '--ss': story.subtitle.length > 44 ? 0.8 : 1,
                  '--sg': story.subtitleGap ?? -5,
                }}
              >
                {story.subtitle}
              </p>
            </header>

            <section className="story__body">
              <div className="story__note">
                <h3 className="story__label story__label--strong">
                  {story.note.label}
                  {story.note.title && ` · «${story.note.title}»`}
                </h3>
                <Paragraphs paragraphs={story.note.paragraphs} />
              </div>

              <aside className="story__facts">
                <dl>
                  {story.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </section>

            <section className="story__ingredients">
              <h3 className="story__label story__label--strong">Ingredientes</h3>
              <table className={`story__table${hasNotes ? ' story__table--wide' : ''}`}>
                <thead>
                  <tr>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Ingrediente</th>
                  </tr>
                </thead>
                <tbody>
                  {story.ingredients.map((row, i) => (
                    <tr key={i}>
                      <td>{row.qty}</td>
                      <td>
                        <span className="story__ing-name">{row.name}</span>
                        {row.note && <span className="story__ing-note">{row.note}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {story.illustration && (
                <img className="story__flower" src={story.illustration} alt="" draggable={false} />
              )}
            </section>

            <div className="story__prep">
              {story.preparation.label && (
                <h3 className="story__label story__label--strong story__prep-label">
                  {story.preparation.label}
                </h3>
              )}
              <Blocks blocks={story.preparation.blocks} />
            </div>
          </>
        )}
        <span className="story__grain" aria-hidden="true" />
      </div>
    </article>
  )
}
