import Rich from './Rich'
import './StoryPaper.css'
import './TinSheet.css'

// ---------- Bloques ----------

function List({ block }) {
  return (
    <div className="tin-sheet__group">
      {block.label && <h3 className="story__label story__label--strong">{block.label}</h3>}
      <ul className="tin-sheet__list">
        {block.items.map((text, i) => (
          <li key={i}>
            <Rich text={text} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Entries({ block }) {
  return block.items.map((entry) => (
    <section key={entry.title} className="tin-sheet__entry">
      <h3 className="tin-sheet__entry-title">{entry.title}</h3>
      {entry.gloss && <p className="tin-sheet__gloss">{entry.gloss}</p>}
      {entry.paragraphs.map((text, i) => (
        <p key={i} className="tin-sheet__p">
          <Rich text={text} />
        </p>
      ))}
    </section>
  ))
}

function Prose({ block }) {
  return block.paragraphs.map((text, i) => (
    <p key={i} className="tin-sheet__p">
      <Rich text={text} />
    </p>
  ))
}

// Diccionario: la palabra en un recuadro y, debajo, las notas numeradas que la usan
function Lexicon({ block }) {
  return block.entries.map((entry) => (
    <section key={entry.word} className="tin-sheet__word">
      <div className="tin-sheet__word-box">
        <h3>{entry.word}</h3>
        <p className="tin-sheet__form">
          <Rich text={entry.form} />
        </p>
        {entry.origin && (
          <p className="tin-sheet__origin">
            <Rich text={entry.origin} />
          </p>
        )}
        <p className="tin-sheet__senses">
          <Rich text={entry.senses} />
        </p>
      </div>
      <ol className="tin-sheet__notes">
        {entry.notes.map((note) => (
          <li key={note.n}>
            <span className="tin-sheet__note-n">{note.n}</span>
            <p>
              <Rich text={note.text} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  ))
}

// Planos: el dibujo (imagen, con la tinta del papel) y su leyenda en texto
function Plans({ block }) {
  return block.items.map((plan) => (
    <figure key={plan.title} className="tin-sheet__plan">
      <h3 className="tin-sheet__plan-title">{plan.title}</h3>
      <p className="tin-sheet__hint">Desliza para ver el plano completo.</p>
      <div className="tin-sheet__figure">
        <img src={plan.image} alt={plan.alt} draggable={false} />
      </div>
      <figcaption>
        {plan.caption.map((text, i) => (
          <p key={i}>
            <Rich text={text} />
          </p>
        ))}
      </figcaption>
    </figure>
  ))
}

// Versiones numeradas de una misma escena (Sin Novedad)
function Versions({ block }) {
  return (
    <ol className="tin-sheet__versions">
      {block.items.map((item) => (
        <li key={item.n}>
          <span className="tin-sheet__version-n">{item.n}</span>
          <p>
            <Rich text={item.text} />
          </p>
        </li>
      ))}
    </ol>
  )
}

// Formulario del permiso: un recuadro con líneas de texto y casillas (marcadas o vacías)
function Form({ block }) {
  return (
    <section className="tin-sheet__form-wrap">
      {block.caption && <p className="tin-sheet__caption">{block.caption}</p>}
      <h3 className="tin-sheet__part">{block.title}</h3>
      <div className="tin-sheet__form">
        {block.lines.map((line, i) =>
          typeof line === 'string' ? (
            <p key={i}>{line}</p>
          ) : (
            <p key={i} className="tin-sheet__check">
              <span className="tin-sheet__box" aria-hidden="true">
                {line.check ? '☒' : '☐'}
              </span>
              <span className="sr-only">{line.check ? 'Marcado: ' : 'Sin marcar'}</span>
              {line.text ? line.text : <span className="tin-sheet__fill" aria-hidden="true" />}
            </p>
          ),
        )}
      </div>
    </section>
  )
}

function Heading({ block }) {
  return <h3 className="tin-sheet__part tin-sheet__part--solo">{block.title}</h3>
}

// Acotaciones (en cursiva) y lo que dicen los personajes (con raya)
function Dialogue({ block }) {
  return (
    <div className="tin-sheet__dialogue">
      {block.items.map((item, i) => (
        <p key={i} className={`tin-sheet__${item.t}`}>
          <Rich text={item.text} />
        </p>
      ))}
    </div>
  )
}

const BLOCKS = {
  list: List,
  entries: Entries,
  prose: Prose,
  lexicon: Lexicon,
  plans: Plans,
  versions: Versions,
  form: Form,
  heading: Heading,
  dialogue: Dialogue,
}

// La hoja de cada objeto de la lata (lo que se lee al abrirlo): el mismo papel, encabezado y
// colores que las recetas. El contenido está en src/data/lata.js.
export default function TinSheet({ sheet }) {
  return (
    <article className="story tin-sheet">
      <div className="story__in">
        <header className="story__head tin-sheet__head">
          <p className="story__num">{sheet.eyebrow}</p>
          <h2 className="story__title">{sheet.title}</h2>
          {sheet.subtitle && (
            <p className="story__subtitle" style={{ '--ss': sheet.subtitle.length > 44 ? 0.8 : 1 }}>
              {sheet.subtitle}
            </p>
          )}
        </header>

        <section className="tin-sheet__body">
          {sheet.blocks.map((block, i) => {
            const Block = BLOCKS[block.type]
            return Block ? <Block key={i} block={block} /> : null
          })}
        </section>

        <span className="story__grain" aria-hidden="true" />
      </div>
    </article>
  )
}
