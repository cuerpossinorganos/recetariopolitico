// 007 · Mashua, que se vende dos veces. Texto del PDF de historias.
// Ojo: en el PDF el dato "Se conserva" dice solo "v" (¿error de tipeo?). Se dejó tal cual.

export default {
  number: '007',
  title: 'Mashua, que se vende dos veces',
  subtitle: 'una bolsa para comer y otra para lo otro',
  facts: [
    { label: 'Rinde', value: 'dos bolsas: la de comer y la del reposo' },
    { label: 'Origen', value: 'ya estaba' },
    { label: 'Tiempo', value: 'una semana o diez días de sol' },
    { label: 'Dificultad', value: 'no decir para qué' },
    { label: 'Se conserva', value: 'v' },
    { label: 'Aprendida de', value: 'de una suegra, y de la suegra de ella' },
  ],
  note: {
    label: 'Nota de quien cocina',
    title: 'Los domingos',
    paragraphs: [
      {
        text: '*Motivo de consulta.* Qué evidencia hay. Dónde está el estudio. Por qué vende como remedio algo que mi tío, que es ingeniero agrónomo, llama tubérculo andino de interés nutricional. Son las preguntas que me enseñan a hacer en enfermería. Se las hago a mi mamá los domingos, con los libros abiertos entre los platos. Ella me sirve mashua con miel en un plato hondo y me escucha. Prueba, dice. Pruebo, hago una mueca por el picor que todavía queda y vuelvo a preguntar.',
      },
      {
        text: '*Antecedentes.* Veinte años vendiendo mashua en un puesto entre una frutera y un carnicero. A la izquierda, papas, ocas, mellocos y zanahoria blanca. A la derecha, más cerca de la pared, dos estantes con lo otro. Antes que ella la asoleaba mi abuela, la mamá de mi papá, en un patio de tierra. Antes que mi abuela, su suegra.',
      },
      {
        text: '*Exploración.* Cruda no se puede comer. O se puede una vez, y el que lo intenta lo cuenta durante años. Mi mamá la asolea en la terraza, sobre sacos de yute, una semana o diez días según el sol, y le da la vuelta cada tarde con las manos hasta que el picor se va y queda una dulzura rara, de fruta. Los vecinos del edificio de al lado se quejan del olor. Ella les lleva un plato cocido con miel. No dejan de quejarse, pero se lo comen.',
      },
      {
        text: '*Observación directa.* Un sábado la acompañé al puesto. Los clientes de la otra mitad eran hombres mayores, con la gorra en la mano o el sombrero bien puesto. Se acercaban un poco de lado y esperaban a que se fuera el de antes. Pedían mashua a media palabra. ¿Cuánto tiempo hace?, les preguntaba mi mamá. Contestaban con un gesto y ella bajaba la voz. Yo estaba a medio metro. No alcancé a oír los números.',
      },
      {
        text: 'Esa mañana vino también una profesora jubilada que compra los viernes y que esa semana se había atrasado. Mi mamá le vendió dos kilos en dos bolsas distintas. ¿Por qué, si es la misma mashua?, preguntó la profesora. Sí, es la misma, dijo mi mamá. La profesora pagó y se fue sonriendo.',
      },
      {
        text: '*Interconsulta.* En Navidad viene mi tío con una sopa de pescado y unos papeles con fotos de cultivos. Tropaeolum tuberosum, pariente de la capuchina, glucosinolatos. Mi mamá lo escucha con el cucharón detenido sobre la olla. Qué interesante, le dice.',
      },
      {
        text: '*Evolución.* El domingo pasado le leí en voz alta el resumen de un estudio sobre la mashua, entero, con las palabras difíciles, sin saltarme ninguna. Me escuchó hasta el final y me sirvió otro plato.',
      },
      { text: '*Pendiente.* ¿Y dice cuánto tiempo hay que asolearla?, preguntó.' },
    ],
  },
  ingredients: [
    {
      qty: 'Un kilo',
      name: 'mashua',
      note: 'chica, nudosa, amarilla con vetas moradas',
    },
    { qty: 'Unos sacos', name: 'de yute', note: 'para extenderla en la terraza' },
    { qty: 'Sol', name: 'una semana o diez días', note: 'según el mes' },
    { qty: 'Miel o panela', name: '—', note: 'para la de comer' },
    { qty: 'Dos bolsas', name: 'distintas', note: 'aunque sea la misma mashua' },
  ],
  preparation: {
    label: 'Preparación · en la misma balanza',
    blocks: [
      {
        type: 'steps',
        items: [
          'Extenderla sobre los sacos, al sol.',
          'Esperar a que se vaya el cliente de antes.',
          {
            text: 'Darle la vuelta cada tarde, con las manos, hasta que se le vaya el picor.',
            appendix: {
              title: 'apéndice 3 sobre el orden de los sabores',
              text: 'Safo llamó a eros *glukupikron*, dulce-amargo, y lo dijo en ese orden: primero lo dulce. La mashua va al revés: cruda pica, y después de diez días de sol se endulza. De la bolsa del reposo nadie ha dicho a qué sabe.',
            },
          },
          'Preguntar cuánto tiempo hace.',
          'Hervirla con la cáscara.',
          'Bajar la voz.',
          'Servirla en plato hondo, con miel o con un pellizco de panela.',
          'Lo demás no se alcanza a oír.',
          'Llevarles un plato a los vecinos que se quejan del olor.',
        ],
      },
      {
        type: 'prose',
        paragraphs: [
          {
            text: 'Es la misma mashua. Se pesa en la misma balanza y se entrega en bolsas distintas. La asoleada cuesta cincuenta centavos más el kilo.',
          },
        ],
      },
    ],
  },
}
