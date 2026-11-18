// Slides de la intro (Prólogo), en orden. Al avanzar desde la última se entra al inicio.
//
//   id        identificador único
//   chapter   id del capítulo (ver chapters.js): da el "01 — PRÓLOGO" de arriba a la derecha
//   month     etiqueta de abajo a la izquierda
//   segments  bloques de texto que aparecen línea por línea, subiendo;
//             font: 'serif' (Lora cursiva, por defecto) o 'sans' (DM Sans)

export const slides = [
  {
    id: 'prologo-01',
    chapter: 'prologo',
    month: 'Octubre',
    segments: [
      { text: 'Me quedé sin trabajo un viernes de octubre', font: 'sans' },
      {
        text: 'la oficina de seguros donde contestaba el teléfono cerró sin avisar y el dueño nos pagó la mitad del mes en efectivo, en sobres con el nombre de cada uno escrito a mano.',
      },
    ],
  },
  {
    id: 'prologo-02',
    chapter: 'prologo',
    month: 'Octubre',
    segments: [{ text: 'Al mío le faltaba una letra.' }],
  },
  {
    id: 'prologo-03',
    chapter: 'prologo',
    month: 'Noviembre',
    segments: [{ text: 'Pasé noviembre mandando hojas de vida' }],
  },
  {
    id: 'prologo-04',
    chapter: 'prologo',
    month: 'Diciembre',
    segments: [
      {
        text: 'En diciembre mi mamá dijo que vendiera lo que a ella le sobraba en el patio, cedrón, hierba luisa, tilo, que al menos así me pagaba el bus.',
      },
    ],
  },
  {
    id: 'prologo-05',
    chapter: 'prologo',
    month: 'Diciembre',
    segments: [
      {
        text: 'El primer día llegué a las cinco y media con tres cajones, una balanza que nos prestó la vecina y el permiso plastificado.',
      },
    ],
  },
  {
    id: 'prologo-06',
    chapter: 'prologo',
    month: 'Diciembre',
    segments: [
      {
        text: 'Esa primera semana vendí once dólares. Mi mamá contó los billetes en la mesa de la cocina, dos veces. Está bien para empezar, dijo.',
      },
    ],
  },
  {
    id: 'prologo-07',
    chapter: 'prologo',
    month: 'Enero',
    segments: [{ text: 'En enero empecé a anotar. Al principio eran cuentas' }],
  },
  {
    id: 'prologo-08',
    chapter: 'prologo',
    // En el mockup esta slide dice "Diciembre", pero sigue a "Enero": confirmar.
    month: 'Enero',
    segments: [
      {
        text: 'y después fueron otras cosas: lo que decía la señora, lo que preguntaban las mujeres de las sillas, las palabras que usaban para nombrarnos los que no venían a comprar.',
      },
    ],
  },
]
