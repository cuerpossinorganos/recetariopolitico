// 005 · Sunfo atado en tres nudos. Texto del PDF de historias.
// `___` dibuja un espacio en blanco subrayado.

export default {
  number: '005',
  title: 'Sunfo atado en tres nudos',
  subtitle: 'falta un paso',
  facts: [
    { label: 'Rinde', value: 'un atado' },
    { label: 'Origen', value: 'ya estaba' },
    { label: 'Tiempo', value: 'un segundo, quizá dos, en el tercer nudo' },
    { label: 'Dificultad', value: 'falta un paso' },
    { label: 'Se conserva', value: 'lejos del sol' },
    { label: 'Aprendida de', value: 'de una vecina' },
  ],
  note: {
    label: 'Nota de quien cocina',
    title: 'El tercer nudo',
    paragraphs: [
      {
        text: 'Lo primero que te preguntan, antes del precio y a veces antes del saludo, es de quién aprendiste, y lo segundo para qué sirve. A eso contestas sin pensar: para el mal aire. A la primera pregunta la ves venir, porque la clienta se inclina sobre el mostrador medio segundo antes. De una vecina, dices, y esperas.',
      },
      {
        text: 'Tu madre vendía jarabes en un mercado grande de la costa. Los cocía de noche, en una olla sobre el fogón del patio. Uno solo era para la tos de los niños y es el único que se te quedó en la nariz. Azúcar quemada, un amargo debajo, algo verde que nunca supiste nombrar. Ya te lo voy a enseñar, decía. Primero tienes que aprender a vigilar el fuego.',
      },
      {
        text: 'Murió cuando tenías diecisiete, de una neumonía que su propio jarabe habría curado, o eso dijeron después. Buscaste una libreta, una hoja, un papel, en los cajones, detrás del espejo, dentro de las ollas, y no había nada. Una tía te dijo que lo mejor era olvidarlo y dijiste que sí. En el fondo de un cajón encontraste la cuchara de palo, oscura, con una muesca en el mango, y te la llevaste.',
      },
      {
        text: 'A los veintidós te casaste con un hombre de la sierra y te mudaste a una ciudad donde no conocías a nadie. A la tercera semana la viuda de al lado, que desgranaba hierbas en el umbral, te preguntó si sabías usar el sunfo. No sabías ni qué era. Te miró con incredulidad, después con algo parecido a la lástima. Siéntate, te dijo.',
      },
      {
        text: 'Te enseñó durante tres años. En el orden en que fueron apareciendo las cosas: la tos de un niño, un vecino con el estómago revuelto, una mujer que no dormía. Para qué servía lo dijo una sola vez. Te enseñó a reconocerlo por el olor antes que por la hoja, a no dejarlo al sol, a atarlo con tres nudos.',
      },
      { text: 'A no contar nunca cuántas personas curaste.' },
      { text: 'Cuando murió te dejó el puesto. Ahora atas.' },
      { text: 'Primer nudo, cerca de la base.' },
      { text: 'Segundo, en la mitad.' },
      { text: 'Tercero, arriba.' },
      {
        text: 'Y en el tercero te detienes. Un segundo, quizá dos, con el hilo tenso entre los dedos y la mano en el aire. Falta un paso, uno que nadie te enseñó. Después sigues.',
      },
      {
        text: 'Nadie lo ha notado. ¿O sí? ¿Lo notaba la vecina, que te miró atar tres años sin corregirte? ¿Lo nota tu marido, que nunca entra al mercado? Te lo preguntas a la hora del cierre, con el puesto vacío. Es demasiado breve, te respondes.',
      },
      {
        text: 'Un jueves de lluvia entra una clienta mayor con bolsa de tela. Pregunta cuánto por un atado y después, sin cambiar el tono, de quién aprendiste. De una vecina. Ella arquea apenas las cejas. Ah, dice. Ella compra siempre en el puesto del fondo, que es de familia. Las hierbas de familia son otra cosa, dice.',
      },
      {
        text: 'Atas. Primer nudo, segundo nudo. En el tercero la mano se te detiene en el aire y por primera vez te das cuenta de que la clienta no está mirando la mano. Te está mirando la cara.',
      },
      {
        text: 'Cuando se va te quedas quieta con las manos sobre el mostrador, te las llevas a la cara y huelen a sunfo, a lluvia, y debajo, muy abajo, a algo dulce y quemado que no está.',
      },
      {
        text: 'La que entra después pregunta primero cuánto. Se lo dices. Primer nudo, cerca de la base.',
      },
    ],
  },
  ingredients: [
    {
      qty: 'Un manojo',
      name: 'sunfo',
      note: 'se reconoce por el olor antes que por la hoja',
    },
    { qty: 'Una', name: 'hebra' },
    {
      qty: 'Un',
      name: 'mostrador chico',
      note: 'en un rincón del mercado, con una balanza vieja y un cajón de hebras',
    },
    {
      qty: 'Una',
      name: 'vecina',
      note: 'que enseña durante tres años y deja el puesto al morir',
    },
  ],
  preparation: {
    blocks: [
      {
        type: 'steps',
        items: [
          'Primer nudo, cerca de la base, para juntar los tallos.',
          'Segundo nudo, a la mitad, para sujetar.',
          'Tercer nudo, arriba, para cerrar.',
          '___ *[aquí hay un paso; nadie lo enseñó]*',
          'Cerrar el nudo. Entregar el atado.',
        ],
      },
      {
        type: 'box',
        label: 'Receta heredada · incompleta',
        title: 'Jarabe para la tos de los niños',
        paragraphs: [
          '*Ingredientes —* Azúcar quemada. Un punto de amargo debajo. Algo verde que nunca se supo nombrar. Una olla grande sobre el fogón del patio. Frascos de vidrio con tapa de corcho.',
          '*Preparación —* De noche, con la cuchara de palo, despacio. Primero hay que aprender a vigilar el fuego. ___ *[el resto no llegó a decirse]*',
          '*Advertencia —* Una cuchara de palo, oscura, con una muesca en el mango. Se guarda.',
        ],
      },
    ],
  },
}
