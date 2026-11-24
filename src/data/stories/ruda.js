import rudaFlower from '../../assets/stories/ruda-flower.webp'

// 001 · Ruda al hilo rojo. Texto extraído del PDF de la planta (diseño aprobado).

export default {
  number: '001',
  title: 'Ruda al hilo rojo',
  subtitle: 'para quien la lleve',
  note: {
    label: 'Nota de quien cocina',
    paragraphs: [
      {
        text: 'No, no te lo he dicho. Mamá no quería que yo la enterrara. Quería que fueras tú, que vivías en otra ciudad y llegaste tarde. Me lo dijo a mí porque yo estaba. Tenía la mano afuera de la sábana y movía los dedos en el aire, dando puntadas.',
        tight: false,
      },
      {
        text: 'De esa mañana me acuerdo por pedazos. Un jueves a las cinco, hace tres años. El olor a alcohol. Una enfermera del turno de la tarde que no se había ido. La bolsa de plástico con su ropa. Tú en la puerta con la mochila todavía puesta. La sopa que le llevé y no se tomó: cuando la enfermera la retiró tenía una película encima. El costurero no lo abrí para buscar nada. Estaba debajo de la cama, donde siempre. Botones. Agujas clavadas en un cojín con forma de tomate. Un ovillo de hilo rojo. Lo metí en el bolsillo del abrigo, junto a una moneda y un caramelo, y hasta la tarde no supe para qué.',
        tight: false,
      },
      {
        text: 'No, atar con ese hilo no fue idea mía. Ella ataba la ruda con él desde antes de que naciéramos, y cuando saqué el permiso siguió atándola en mi puesto, sentada en la segunda silla, veintitrés años. Yo creía que atar era eso, dar tres vueltas y cortar. Tenía unas tijeras chicas, de sastre, que no dejaba tocar.',
        tight: false,
      },
      {
        text: 'No, a la vecina no le cobré. Fue esa tarde, en el velorio. Me pidió un ramo, corté un pedazo, até. ¿Cuánto? Nada, lléveselo nomás. A mamá nunca le oímos decir un precio sin que sonara a disculpa. Después fueron muchos ramos. El ovillo ya es del tamaño de una nuez. No me atrevo a pesarlo.',
        tight: true,
      },
      {
        text: 'No, lo de agosto no es por la tierra. Te dije que en agosto está más blanda. En agosto fui por primera vez sin ella.',
        tight: false,
      },
      {
        text: 'No, en el bolsillo del mandil no llevo solo el ovillo. Llevo otra cosa. La toco cada vez que paso un ramo por el cuerpo de otra persona. Una clienta me preguntó si me dolía la mano. Le dije que sí.',
        tight: false,
      },
      {
        text: 'No, en el pasillo no estoy sola. Desde diciembre hay una muchacha en el puesto de al lado que me mira cortar. Yo veo las tijeras. Cuando se acabe voy a comprar uno rojo en la mercería de la esquina. La dependienta me va a preguntar para qué y le voy a decir que para coser. A ti te voy a decir lo mismo.',
        tight: true,
      },
    ],
  },
  facts: [
    { label: 'Rinde', value: 'para quien la lleve,\nno para quien la vende' },
    { label: 'Origen', value: 'llegó' },
    { label: 'Tiempo', value: 'lo que dure un ovillo' },
    { label: 'Se conserva', value: 'no se conserva: se entierra' },
    { label: 'Aprendida de', value: 'de una madre, sin\nque lo supiera' },
  ],
  ingredients: [
    { qty: 'Un manojo', name: 'Ruda' },
    { qty: 'Un pedazo', name: 'Hilo rojo' },
    { qty: 'Un tarro', name: 'de pintura, con\ntierra negra' },
    { qty: 'Un vaso', name: 'para quien vive\nen un quinto piso' },
    { qty: 'Una vez al año', name: 'agosto' },
    { qty: 'Algo pequeño', name: 'en el bolsillo\ndel mandil' },
  ],
  preparation: {
    blocks: [
      {
        type: 'steps',
        items: [
          'Atar con hilo rojo. Cada manojo se lleva un pedazo del ovillo. (Véase Utensilios, hilo rojo.)',
          'Entregar con el manojo todavía en la mano y mirando a los ojos. Decir: la ruda protege a quien la lleva, no a quien la vende. Esperar a que la persona asienta.',
          'Enterrar lo usado. Un manojo que pasó por un cuerpo se lleva lo que había en ese cuerpo. Se entierra de a dos, con un dedo, sin ceremonia, en el tarro. A quien vive en un quinto piso, sin patio ni macetas, decirle que saque tierra del parterre de la avenida con un vaso, que lo entierre ahí y que deje el vaso donde nadie lo patee.',
          'A las embarazadas no venderles ruda para tomar. A las que la pidan para eso, darles un puñado de manzanilla, sin explicar por qué.',
          'Una vez al año, en agosto, vaciar el tarro en una bolsa y llevarla al cementerio. Si preguntan por qué agosto, decir que la tierra está más blanda.',
          'Cuidarse con otra cosa, que se lleva en el bolsillo del mandil. Tocarla cada vez que se pase un manojo por el cuerpo de otra persona.',
          'Cuando se acabe el hilo, atar con otro y ver.',
        ],
      },
    ],
  },
  illustration: rudaFlower,
}
