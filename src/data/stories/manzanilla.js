// 002 · Manzanilla, dicha dos veces. Texto del PDF de historias.
// La preparación es una pieza de teatro: ver los tipos de línea en `script`.

export default {
  number: '002',
  title: 'Manzanilla, dicha dos veces',
  subtitle: 'receta a dos voces',
  facts: [
    { label: 'Rinde', value: 'una madre y un niño' },
    { label: 'Origen', value: 'llegó; en griego, manzana del suelo' },
    { label: 'Tiempo', value: 'hasta que se enfríe del todo' },
    { label: 'Dificultad', value: 'repetirla en orden' },
    { label: 'Se conserva', value: 'no: se devuelve' },
    { label: 'Aprendida de', value: 'de una casa del norte, por mal camino' },
  ],
  note: {
    label: 'Nota de quien cocina',
    title: 'La casa del norte',
    paragraphs: [
      {
        text: 'Trabajé once años en una casa del norte. Los primeros tres dormí en un cuarto detrás de la lavandería. Después me dieron uno con ventana, que daba a un muro.',
      },
      {
        text: 'Mi hija tenía cuatro años cuando entré. Se quedó con mi mamá, en el pueblo, a siete horas de bus. La veía en diciembre y en Semana Santa. Le mandaba la plata a principios de mes por un giro que tardaba cuatro días. Esos cuatro días me comía las uñas.',
      },
      {
        text: 'Los feriados largos la señora me dejaba al menor. Tenía cuatro años, la edad que tenía mi hija cuando entré, y no dormía. Lloraba a las tres de la mañana con una constancia de adulto.',
      },
      {
        text: 'Esa noche yo estaba muy cansada. Lo pongo primero porque es lo único que puedo decir a mi favor.',
      },
      {
        text: 'Hacía tres meses que no veía a mi hija. Cuando la llamaba me contaba cosas de la escuela con una voz que ya no era de bebé. No supe en qué momento había dejado de serlo.',
      },
      {
        text: 'Le hice una manzanilla, la de siempre pero más cargada. No medí. Quería que durmiera.',
      },
      {
        text: 'Se la tomó sentado en mi cama, con las dos manos alrededor de la taza. Se la tomó toda. Pidió otra y le di otra.',
      },
      { text: 'A las cuatro se durmió. A las siete no despertó, y a las ocho tampoco.' },
      {
        text: 'El cuarto estaba a oscuras. No prendí la luz para no despertarlo, y después ya no pude. Prenderla era admitir que algo pasaba. Me arrodillé junto a la cama y le miré el pecho. Subía y bajaba, yo contaba, no sé para qué contaba.',
      },
      {
        text: 'No podía llamar a nadie. Llamar era decir que le había dado una taza más cargada de la cuenta. Era decir que no medí. En esa casa nadie sabía lo que yo sabía hacer con las plantas y yo quería que siguiera así. Si me despedían, mi hija se quedaba sin escuela.',
      },
      {
        text: 'La señora volvió el lunes. ¿Cómo se portó?, preguntó. Bien, dije. ¿Y comió? Bien.',
      },
      { text: 'Nunca supe si lo supo.' },
      {
        text: 'Ocho años después me fui de esa casa y puse el puesto. A mi hija, que ya tenía quince, la fui a buscar a la terminal. Me miró de arriba abajo. Estás más chiquita, dijo.',
      },
    ],
  },
  ingredients: [
    { qty: 'La que diga el puesto', name: 'manzanilla', note: 'flor seca, entera' },
    {
      qty: 'Una',
      name: 'bolsita de papel',
      note: 'con una grapa; se mide con los dedos',
    },
    { qty: 'Agua', name: 'hervida, y apagada' },
    { qty: 'Una', name: 'olla tapada' },
    { qty: 'Luz', name: 'de cocina', note: 'para verle la cara' },
  ],
  preparation: {
    blocks: [
      {
        type: 'script',
        items: [
          { t: 'label', text: 'reparto' },
          { t: 'cast', text: 'la que vende' },
          { t: 'cast', text: 'la joven *con un niño de tres años que no ha dormido*' },
          { t: 'cast', text: 'el niño *llora; parte sin texto*' },
          { t: 'cast', text: 'coro de clientas *en la cola; nadie apura*' },
          { t: 'cast', text: 'la libreta *parte muda; siempre sobre el mostrador; cerrada*' },

          { t: 'label', text: 'escenario' },
          {
            t: 'dir',
            text: 'el primer puesto de la fila izquierda, junto a la puerta lateral que da a la calle (puesto 2 del plano 2). bolsas de manzanilla colgadas de un alambre a la altura de los ojos',
          },

          { t: 'label', text: 'coro de clientas (a la cola, al público):' },
          { t: 'line', text: 'manzanilla' },
          { t: 'line', text: 'manzana chica' },
          { t: 'line', text: 'en griego, manzana del suelo' },
          { t: 'line', text: 'la que crece a ras de tierra' },
          { t: 'line', text: 'huele a fruta y se pisa' },

          { t: 'act', text: 'Acto I · los ingredientes' },
          {
            t: 'dir',
            text: '[entra la joven con el niño al hombro. el niño llora con la boca abierta. ella lleva las medias distintas y una chompa de hombre]',
          },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'algo para el llanto' },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'cuántos años tiene' },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'tres' },
          {
            t: 'dir',
            text: '[la que vende saca una bolsita de papel de debajo del mostrador. mide con los dedos. no se escribe cuánto]',
          },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'y no duerme' },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'van dos noches' },

          { t: 'act', text: 'Acto II · la preparación' },
          {
            t: 'dir',
            text: '[la que vende habla despacio, sin apuro. el niño tira de la solapa de su madre y le grita en el oído]',
          },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'que hierva el agua y la apague' },
          { t: 'line', text: 'que eche la flor con la olla tapada' },
          {
            t: 'line',
            text: 'que espere a que se enfríe del todo, hasta que pueda meter el dedo',
          },
          { t: 'line', text: 'que se lo dé sentado, no acostado' },
          { t: 'line', text: 'que si el llanto sigue no insista, y vaya a ver a alguien' },
          { t: 'dir', text: '[la joven asiente]' },
          {
            t: 'dir',
            text: '[la que vende lo dice otra vez, con las mismas palabras, en el mismo orden, con las mismas pausas]',
          },
          { t: 'label', text: 'coro de clientas:' },
          { t: 'line', text: 'aquí hay una paciencia' },
          { t: 'line', text: 'que no tenemos para nada más' },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'ahora usted' },
          { t: 'label', text: 'la joven (riendo):' },
          { t: 'line', text: 'ya entendí' },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'seguro' },
          { t: 'line', text: 'y quiero oírlo igual' },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'que hierva el agua y la apague' },
          { t: 'line', text: 'que eche la flor' },
          { t: 'line', text: 'que espere a que se' },
          {
            t: 'dir',
            text: '[se equivoca. la que vende la corrige sin levantar la voz. la joven vuelve al principio]',
          },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'que hierva el agua y la apague' },
          { t: 'line', text: 'que eche la flor con la olla tapada' },
          { t: 'line', text: 'que espere a que se enfríe del todo' },
          { t: 'line', text: 'que se lo dé sentado' },
          { t: 'line', text: 'que si el llanto sigue no insista y vaya a ver a alguien' },
          {
            t: 'dir',
            text: '[la que vende cobra cincuenta centavos y le pone la bolsita en la mano]',
          },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'vuelva a contarme cómo salió' },

          { t: 'act', text: 'Acto III · la advertencia' },
          {
            t: 'dir',
            text: '[sale la joven. la que vende queda con las manos sobre el mostrador. la libreta, cerrada. en el alambre, junto a las bolsas, hay un cartón escrito con otra letra: A LOS MENORES DE UN AÑO, NO. VAYA A VER A ALGUIEN. lo escribió una clienta que escribe mejor. la que vende nunca lo ha tocado]',
          },
          { t: 'label', text: 'la que vende (de lado, a nadie):' },
          { t: 'line', text: 'hubo una casa en el norte' },
          { t: 'line', text: 'y una taza más cargada de la cuenta' },
          { t: 'line', text: 'el niño no despertó a su hora' },
          { t: 'line', text: 'estaba bien' },
          { t: 'line', text: 'durmió hasta el mediodía y pidió pan' },
          { t: 'line', text: 'yo pasé esas horas de rodillas junto a la cama' },
          { t: 'line', text: 'mirándole el pecho' },
          { t: 'line', text: 'no podía llamar a nadie' },
          { t: 'line', text: 'desde entonces' },
          { t: 'line', text: 'nadie se lleva una cantidad sin devolvérmela' },
          {
            t: 'dir',
            text: '[el sábado siguiente. la joven vuelve con el niño dormido, atado a la espalda con un paño. no saluda]',
          },
          { t: 'label', text: 'la joven:' },
          { t: 'line', text: 'lo senté' },
          { t: 'line', text: 'esperé a que se enfriara' },
          {
            t: 'dir',
            text: '[sigue la lista completa, en orden, con las pausas que se le pusieron]',
          },
          { t: 'line', text: 'y se lo di en la cocina' },
          { t: 'line', text: 'no en el cuarto' },
          { t: 'line', text: 'en la cocina hay luz' },
          { t: 'line', text: 'y le puedo ver la cara' },
          { t: 'label', text: 'la que vende:' },
          { t: 'line', text: 'la luz es una buena idea' },
          {
            t: 'dir',
            text: '[vende dos bolsitas más. sale la joven. la que vende mira el alambre: las bolsas se mueven con el viento de la calle]',
          },
          {
            t: 'dir',
            text: '[entra otra madre. la que vende dice las instrucciones, despacio, dos veces. antes de pedirle que las repita agrega lo de la cocina y la luz, en el mismo tono y en el mismo lugar, sin decir de dónde viene]',
          },
        ],
      },
      {
        type: 'box',
        paragraphs: ['*Advertencia —* En la cocina, con luz.'],
      },
    ],
  },
}
