// Introducción · Permiso de Puesto Fijo. Texto del PDF "permiso de puesto fijo.pdf" (págs. 8 a 15).
// Es la hoja del papel "Permiso de Puesto Fijo" del sobre. Usa el mismo formato que las recetas pero
// NO es una de las 7 cards, así que no está en el mapa de index.js (se abre desde Home/Envelope).
// `appendix` es un apéndice que cuelga de un paso; su texto puede ser un párrafo o varios.

export default {
  number: 'Introducción',
  title: 'Permiso de Puesto Fijo',
  subtitle: 'preparación base, para siete metros cuadrados',
  subtitleGap: 26, // más aire bajo el título (la cola de la j de «Fijo» baja hasta el subtítulo)
  facts: [
    { label: 'Rinde', value: 'un puesto, renovable' },
    { label: 'Tiempo', value: 'veintiséis años, y cada diciembre' },
    { label: 'Dificultad', value: 'baja el primer día, alta después' },
    { label: 'Origen', value: 'municipal' },
    { label: 'Se conserva', value: 'plastificado' },
    { label: 'Aprendida de', value: 'de una ventanilla' },
  ],
  note: {
    label: 'Nota de quien cocina',
    title: 'La lata',
    paragraphs: [
      { text: 'Mi abuela tiene una lata de galletas de Navidad con un ciervo en la tapa. Durante años creí que eran galletas.' },
      { text: 'Los sábados la ayudo a bajar los costales del camión. Me paga dos dólares y un pan con queso, que me como mientras ella ata ramos, sentado en el costal de la ruda seca, que es el más blando.' },
      { text: 'Ese sábado de noviembre llovió y se hizo tarde. Mi mamá había dicho que me pasaba a buscar a las cuatro y no llegaba, porque nunca llega a la hora, y yo me aburría. Mi abuela se puso a mirar la lata sin abrirla.' },
      { text: '¿Qué tiene?, pregunté. No sé estar callado.' },
      { text: 'Papeles, dijo.' },
      { text: '¿Qué papeles?' },
      { text: 'Recibos.' },
      { text: '¿De qué?' },
      { text: 'De todo lo que he pagado.' },
      { text: 'La abrió y fue poniendo los recibos sobre el mostrador, doblados en cuatro, ordenados por fecha, con una liga: veintiséis años de recibos. Le pregunté por qué no los botaba. Por si algún día alguien, además de mis clientas, necesita saber que estuve aquí, dijo.' },
      { text: 'Pensé que era como un diario, pero de números.' },
      { text: 'Después vi la hoja de cuadros. Tenía fechas y, al lado de cada fecha, un nombre y una frase. Enero, el inspector, la corbata aflojada, preguntó por la vigencia. Junio, dos, midieron con cinta amarilla. Y el miércoles de esa semana, entre comillas, una palabra: consultas.' },
      { text: '¿Qué significa?, pregunté.' },
      { text: 'Que alguien cree que aquí se hace algo que el permiso no dice.' },
      { text: '¿Y se hace?' },
      { text: 'Me miró.' },
      { text: 'No sé qué te cuenta tu mamá, dijo.' },
      { text: 'Mi mamá no me cuenta nada. Dice que mi abuela es especial. Lo dice como otra gente dice enferma. Mi papá, cuando todavía llamaba, decía que era una mujer de mucho carácter, y se reía solo.' },
      { text: 'En el colegio el profesor de Sociales había dicho que el Ministerio tiene una dirección de medicina tradicional, o algo así. No se acordaba del nombre. Se lo conté a mi abuela y le pregunté por qué no pedía que le reconocieran lo que hace.' },
      { text: 'Siguió atando.' },
      { text: 'Nunca me lo han ofrecido, dijo después de un rato.' },
      { text: 'Eso no significa que no puedas pedirlo.' },
      { text: 'Uno pide lo que le ofrecen.' },
      { text: 'La repetí en el bus como cuatro veces.' },
      { text: '¿Y lo quieres?, le pregunté.' },
      { text: 'Tardó. Miró el alambre, los ramos, la cortina.' },
      { text: 'Sí, dijo.' },
      { text: 'Tengo catorce años y no entiendo del todo.' },
      { text: 'La semana pasada, en el libro de Sociales, salió la palabra visita, con un sentido de hace siglos, y la subrayé dos veces.' },
      { text: 'Esa noche, en el bus, repitiendo lo de que uno pide lo que le ofrecen, me acordé de la hoja de cuadros, de las fechas con el nombre al lado, de la corbata aflojada.' },
      { text: 'Mi abuela no sabe que yo la leí entera, o sí sabe, porque la dejó abierta. Me pasé de parada.' },
    ],
  },
  ingredients: [
    { qty: 'Una', name: 'fotografía', note: 'la propia; la de hace nueve años' },
    { qty: 'Una', name: 'tasa anual', note: 'con recibo; guardar el recibo' },
    {
      qty: 'Siete',
      name: 'metros cuadrados',
      note: 'los que diga el permiso; se miden con cinta amarilla. (Véase Utensilios, cinta métrica amarilla.)',
    },
    {
      qty: 'Una',
      name: 'descripción del oficio',
      note: 'venta de plantas medicinales y aromáticas; no incluye lo demás',
    },
    { qty: 'Cuatro sillas, una cortina, un alambre', name: '—', note: 'no figuran; en el acta, un depósito' },
    { qty: 'Una', name: 'lata de galletas', note: 'para los recibos; sin galletas' },
  ],
  preparation: {
    blocks: [
      {
        type: 'prose',
        paragraphs: [{ text: '`EXPEDIENTE N.º` ___ `PUESTO FIJO · 7 m²`' }],
      },
      {
        type: 'steps',
        items: [
          'El permiso dice `venta de plantas medicinales y aromáticas, puesto fijo, siete metros cuadrados`; está plastificado y la fotografía tiene nueve años.',
          'En el puesto hay cuatro sillas plásticas apoyadas contra la pared, una cortina de tela floreada que separa el fondo, ramos de ruda colgados boca abajo de un alambre y varias botellas. Ninguno de esos objetos figura en el permiso.',
          'Las personas que vienen a sentarse no dicen *consulta*. Dicen que van a conversar con la señora, a que las vea, a que les pasen el ramo.',
          'Se sientan en una de las cuatro sillas y cuentan cosas. Ella hace dos o tres preguntas que parecen inofensivas y después toma un ramo; a veces solo escucha. Cobra lo que le dan, que muchas veces es nada. Una vez fue una bolsa de pan.',
          'Un inspector nuevo, joven, viene por primera vez en enero, a media mañana, con una carpeta bajo el brazo y la corbata aflojada. Se presenta con nombre y cargo, sin mirarla, y le pide el permiso. Pregunta por la vigencia, por el pago de la tasa, si duerme alguien en el puesto. Ella responde a todo y él anota. De las sillas, de la cortina, de los ramos y de las botellas no pregunta nada, y se va.',
          'Segunda visita, en junio. Vienen dos y miden el puesto con una cinta amarilla, primero el frente, luego el fondo, y anotan. El segundo levanta la cortina con dos dedos y mira detrás: los costales, un balde, una tela roja. La suelta y dice que eso no está en el permiso; ella dice que es el depósito. Ninguno de los dos pregunta por la ruda, por los ramos o por quién está sentado. A los veinte minutos se van.',
          'Tercera visita, en noviembre, un miércoles de llovizna. El inspector viene solo y pide el permiso, la vigencia, el pago, y ella se los da. Después, mirando el mostrador y no a ella, dice que ha recibido información: que no es un reclamo formal, que es solo un aviso, que en el puesto, según le han dicho, se están atendiendo consultas. Hace una pausa antes de la palabra y la dice con unas comillas que nadie escribió.',
          'Que eso no es compatible con el tipo de permiso. Que él no quiere complicarle la vida. Que la renovación del año que viene, según cómo se den las cosas, podría no salir. Lo dice con amabilidad, devuelve el permiso y se va por el pasillo con el paraguas colgando del codo.',
          'El inspector tiene razón.',
          'Ella no cambia nada: el puesto sigue abierto, las sillas donde estaban, la cortina colgada, y ella sentándose a escuchar como antes. Esa noche, cuando el mercado se vacía, se queda en el banco con la mano sobre el permiso; después toma un lápiz y, en la hoja de cuadros donde ya están enero y junio, escribe el nombre del inspector, la hora y lo que dijo, tal como lo recuerda, con las comillas.',
          'Al día siguiente vuelve a abrir la lata. Es de galletas de Navidad; la eligió hace veintiséis años por eso: nadie esperaría ahí otra cosa que hilos y agujas. Hasta ese día solo guardaba recibos, y la hoja de cuadros, con enero y junio, estaba en el cajón del mostrador.',
          'Guarda todo, no solo los recibos: la liga que se renueva cada año, copias de un permiso que ya no existe y del que lo reemplazó, un sello de tinta violeta estampado al reverso de una libreta de ventas, hasta los volantes que un funcionario deja sobre el mostrador. En la ventanilla sellan el recibo y se lo devuelven sin sacar copia. Anota las fechas de las visitas, los nombres cuando los sabe, las palabras exactas cuando las recuerda, y no tiene ningún plan para todo eso.',
          {
            text: 'Una noche, a la luz del foco, encuentra en la lata la copia del acta de junio, escrita a máquina: consta la medición del frente y del fondo, y la cortina, descrita como depósito. El papel se parece mucho al de la carpeta del inspector, con el mismo membrete y la misma manera de ordenar las cosas.',
            appendix: {
              title: 'apéndice 13 sobre el acta',
              text: '*Acta* viene del latín *acta*, cosas hechas. Un acta registra las cosas hechas que su formulario contempla: medidas, vigencias, pagos. (Véase Técnicas, *expedir*.)',
            },
          },
          'Guarda la hoja y cierra la tapa.',
          {
            text: 'Lo que pide, desde hace veintiséis años, es permiso para seguir sin que la molesten.',
            appendix: {
              title: 'apéndice 15 sobre pedir',
              text: [
                '**PERMISO** · de papel · vigencia: hasta diciembre · renovable: sí',
                '**PERMISO** · de que nadie pregunte · vigencia: mientras nadie pregunte · renovable: no consta',
                '**PERMISO** · el que da ella · vigencia: ___ · renovable:',
                '(Véase Técnicas, *permitir*.)',
              ],
            },
          },
          'Volver al diciembre anterior. Una mañana se instala en el puesto de al lado una muchacha que vende hierbas aromáticas, con tres cajones y una balanza prestada.',
          'A la segunda semana la muchacha, que ha visto las sillas, la cortina y a las mujeres sentadas hablando en voz baja, le pregunta con mucha precaución cómo hace para que no la molesten. Ella la mira un rato y le dice que se siente un ratito. La muchacha se sienta en una de las cuatro sillas.',
          'Le dice la advertencia, que es la más larga de todas las que repite, y la dice completa, despacio, sin omitir nada.',
          '*Que el permiso dice que ella vende plantas, y que vender plantas es verdad. Que también hace otra cosa que el permiso no dice y que nadie le ha prohibido con nombre, porque nadie la ha nombrado. Que si algún día le piden que elija, no hay nada que elegir. Que guarde los papeles de la primera para poder seguir con la segunda.*',
          'La muchacha dice que entiende.',
          'Se levanta, va hasta el rincón detrás de los costales, saca la lata del ciervo y la abre sobre las rodillas; le muestra la liga y las fechas y le dice que empiece esa misma noche.',
          'Cuando está por explicarle cómo, una mujer se detiene frente al puesto con una niña de la mano y pregunta, sin pasar del borde del mostrador, si la señora está libre.',
          {
            text: 'Tapa la lata, dice que sí y corre la silla.',
            appendix: {
              title: 'apéndice 23 sobre una mala fotografía',
              text: 'En el teléfono de una sobrina que trabaja en publicidad hay una foto de un puesto que vende solo toronjil. Está mal encuadrada, un poco movida. Salen el mostrador con sus dos cajones, una hilera de bolsas del mismo tamaño cerradas con un doblez y una grapa, el vitral sucio al fondo. No sale nadie. En el borde derecho, apenas dentro del encuadre, hay una banqueta plegable contra el mostrador y, encima, una taza esmaltada. Sube un hilo de vapor. La que vende vio a la sobrina levantar el teléfono desde diez metros y no volvió a sentarse hasta que se fue. No sale el olor.',
            },
          },
        ],
      },
    ],
  },
}
