import plano2 from '../assets/home/lata/plano-2.webp'
import plano5 from '../assets/home/lata/plano-5.webp'

// Hojas de la lata de galletas (texto de "Lata de galletas.pdf", págs. 48 a 58 del libro).
// La clave es el id del objeto de la lata (ver tin.js):
//   hoja = Utensilios · cuaderno = Técnicas · diccionario = Léxico de brujas · plano = Planos
//
//   eyebrow, title, subtitle?   encabezado de la hoja
//   blocks                      bloques, en este orden:
//     { type: 'list', label?, items: [texto] }               lista de objetos (nombre en **negrita**)
//     { type: 'entries', items: [{ title, gloss?, paragraphs: [texto] }] }   entradas con definición corta
//     { type: 'prose', paragraphs: [texto] }                 texto corrido
//     { type: 'lexicon', entries: [{ word, form, origin?, senses, notes: [{ n, text }] }] }
//                                                           diccionario: recuadro + notas numeradas
//     { type: 'plans', items: [{ title, image, alt, caption: [texto] }] }     planos (imagen + leyenda)
//
// Dentro de cualquier texto: **negrita** y *cursiva*.

export const lata = {
  hoja: {
    eyebrow: 'El cuaderno de cuadros',
    title: 'Utensilios',
    subtitle: 'los del puesto de la ruda, los del inspector y el de quien barre.',
    blocks: [
      {
        type: 'list',
        label: 'Del puesto',
        items: [
          '**Hilo rojo.** Se corta un pedazo por manojo. El que se acaba se repone en la mercería de la esquina.',
          '**Tarro de pintura.** Con tierra negra, para enterrar lo usado. En agosto se lleva al cementerio.',
          '**Trapo de sábana vieja.** Se calienta sobre el anafe y se pone en el hombro.',
          '**Anafe pequeño.** Para calentar un manojo, nunca para hervirlo.',
          '**Banco de atrás.** Es el del cargador de los jueves. (Véase Recetas, *chilca*.)',
          '**Balanza.** Pesa mal y nadie la ha querido arreglar.',
          '**Alambre.** De él cuelgan los ramos, boca abajo.',
          '**Cuatro sillas plásticas.** Están contra la pared y ninguna figura en el permiso. (Véase Medidas, *un ratito*.)',
          '**Cortina floreada.** Separa el fondo y en el acta figura como depósito.',
          '**Lata de galletas.** Es de Navidad, con un ciervo en la tapa, y adentro hay recibos.',
          '**Hoja de cuadros.** Va doblada en la lata, con fechas, nombres y lo que dijo cada inspector.',
          '**Cuchara de palo.** Es oscura, con una muesca en el mango, y era de una mujer que hacía jarabes. (Véase Recetas, *sunfo*.)',
        ],
      },
      {
        type: 'list',
        label: 'De la visita',
        items: [
          '**Cinta métrica amarilla.** Mide el frente y el fondo del puesto.',
          '**Carpeta.** La lleva bajo el brazo y adentro va el acta.',
          '**Sello.** De tinta violeta.',
          '**Paraguas.** Cuelga del codo aunque no llueva.',
        ],
      },
      {
        type: 'list',
        label: 'De las once',
        items: [
          '**Escoba.** Es la de quien barre el mercado, que empieza por el fondo.',
          '**Termo y taza esmaltada.** De la que vende solo toronjil.',
        ],
      },
    ],
  },

  cuaderno: {
    eyebrow: 'El cuaderno de cuadros',
    title: 'Técnicas',
    blocks: [
      {
        type: 'entries',
        items: [
          {
            title: 'Permitir',
            gloss: 'Dejar que alguien haga algo con lo tuyo: tu tiempo, tu cuerpo, lo que sabes.',
            paragraphs: [
              'La primera vez que vi a la señora pasarle un ramo a alguien por los hombros, antes de empezar le preguntó si le permitía. La mujer dijo que sí. La señora esperó todavía un momento, hasta que la mujer cerró los ojos, y recién ahí empezó.',
              'Mi permiso está colgado de un clavo, plastificado. Dice venta de plantas medicinales y aromáticas, el número del puesto y la fecha en que vence. De lo otro no dice nada.',
            ],
          },
          {
            title: 'Visitar',
            gloss: 'Ir a ver a alguien con un termo y pan.',
            paragraphs: [
              'En enero vino el inspector. Me dijo que era una visita de rutina. Yo pensé en las visitas de los domingos a mi tía del sur, con pan de la panadería de abajo, y casi le ofrezco un café. Me sudaban las manos. La señora me pasó un vaso de agua sin mirarme. Después me contó que en la primera visita sudan todas y que a la quinta ya no.',
              'El nieto de la señora, que viene los sábados, me dijo que en el colegio le habían enseñado otra clase de visita. Hace siglos, dijo, un hombre recorría los pueblos con un escribano, quemaba lo que no debía estar y el escribano apuntaba lo que se había quemado. Me lo contó comiendo su pan con queso, sentado en el costal de la ruda seca. En el cuaderno tenía la palabra subrayada dos veces.',
            ],
          },
          {
            title: 'Consultar',
            gloss: 'Pedir parecer. En el puesto lo da quien sabe. En la oficina lo pide quien manda.',
            paragraphs: [
              'En marzo una clienta preguntó si había hora de consulta. La señora dijo que no tenía horas. La clienta se sentó igual, en la segunda silla, con la cartera sobre las rodillas, y esperó.',
              'Yo conocía la palabra del centro de salud y de las noticias, cuando dicen que van a consultar a una comunidad por un río. Esa tarde, mientras cerrábamos, le pregunté a la señora si lo que hacía con las mujeres de las sillas era una consulta. Me pidió que no le pusiera nombre.',
            ],
          },
          {
            title: 'Recetar',
            gloss: 'Decir qué se usa y cómo se prepara, o qué remedio necesita un problema público.',
            paragraphs: [
              'En agosto le pedí a la señora una receta por escrito y dijo que no escribía, que me la iba a decir dos veces y que yo la repitiera. Me equivoqué en el tercer paso y empezamos de nuevo, sin apuro, mientras ella atendía.',
              'No la pongo aquí. La sé de memoria, y cuando la repito me sale con su voz.',
            ],
          },
          {
            title: 'Reducir',
            gloss:
              'En la cocina, hervir despacio hasta que quede lo que tiene sabor. En los libros de historia, juntar en un pueblo nuevo a la gente que vivía dispersa.',
            paragraphs: [
              'El ovillo de hilo rojo de la señora ya es del tamaño de una nuez porque cada ramo se lleva un pedazo. Le pregunté qué iba a hacer cuando se acabara y me dijo que ya se vería.',
              'Se lo conté a mi mamá mientras hacía salsa de maní. Me escuchó sin dejar de revolver y después apagó el fuego.',
            ],
          },
          {
            title: 'Expedir',
            gloss: 'Juntar los papeles de un asunto.',
            paragraphs: [
              'Empecé mi lata el día que la señora me mostró la suya. La mía es de galletas de coco y no tiene ciervo. Mi mamá preguntó dónde estaban las galletas y le dije que me las había comido, que era verdad.',
              'Al año tiene un recibo de la tasa, dos copias de mi permiso, una libreta con el sello violeta del inspector en el reverso y estas hojas.',
              'Hoy es miércoles diecisiete de diciembre. Mañana vence mi permiso, y el de la señora vence el mismo día. Ella no parece preocupada. Yo no he dormido bien.',
            ],
          },
        ],
      },
    ],
  },

  diccionario: {
    eyebrow: 'Lata de galletas',
    title: 'Léxico de brujas',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Mi mamá dice bruja. Un afiche de champú dice hechicera. Una profesora habló de superstición delante de cuarenta niños, y un estudiante con una encuesta quería saber si éramos informales. El permiso dice vendedora. Las clientas dicen mi doctora, o la señora que me ve. Fui anotando estas palabras en el orden en que me llegaron.',
        ],
      },
      {
        type: 'lexicon',
        entries: [
          {
            word: 'bruja',
            form: '*bruja, -s* sustantivo femenino',
            origin: '[origen incierto]',
            senses:
              '1. Mujer a la que se atribuyen poderes y un trato con el diablo. En los Andes de la Colonia, nombre que se les puso a las mujeres con oficios rituales. 2. (despectivo) Mujer vieja o de mal carácter. Ej.: *no creo en brujas, pero haberlas, haylas.*',
            notes: [
              {
                n: '1.0',
                text: 'Le conté a mi mamá, que es catequista de la parroquia y vende tamales a la salida de misa, dónde me había instalado. Dijo, bajito: junto a la bruja.',
              },
              {
                n: '1.1',
                text: 'Mi mamá tiene un manojo de ruda detrás de la puerta desde antes de que yo naciera. Dice que no cree en nada de eso. Lo cambia cada año.',
              },
              {
                n: '1.2',
                text: 'Esa noche repetí la palabra frente al espejo del baño, bajito, para ver cómo sonaba en mi boca. Apagué la luz.',
              },
            ],
          },
          {
            word: 'hechicera',
            form: '*hechicero, -ra* adjetivo y sustantivo',
            origin: '[de *hechizo*]',
            senses:
              '1. Que practica la hechicería. Así llamaban los visitadores coloniales a quienes hacían ritos andinos. 2. Que atrae por su belleza. Ej.: *cabello hechicero.*',
            notes: [
              {
                n: '2.0',
                text: 'En abril pegaron en la esquina del mercado un afiche de champú: una mujer de espaldas, la melena sobre un hombro, y arriba, en letras doradas, Cabello hechicero.',
              },
              {
                n: '2.1',
                text: 'La señora lo miró un rato largo, con un atado de ruda a medio contar. Dijo que qué cosas. Volvió a empezar desde uno.',
              },
            ],
          },
          {
            word: 'superstición',
            form: '*superstición, -es* sustantivo femenino',
            origin: '[del latín *superstitio*]',
            senses:
              '1. Creencia contraria a la razón. 2. En Roma, el culto que no era el del Estado. Ej.: *supersticiones populares.*',
            notes: [
              {
                n: '3.0',
                text: 'Cuarenta niños con uniforme y un cuaderno, de a dos, detrás de una profesora: la salida pedagógica de junio. Se pararon frente al alambre de ramos y ella les explicó que eso era superstición. Los niños escribieron la palabra y una niña la escribió mal, y su compañero se la corrigió.',
              },
              {
                n: '3.1',
                text: 'La señora vendió una bolsa de tilo mientras la profesora hablaba. Al final la profesora compró dos ramos de ruda. Para el jardín, dijo, para los pulgones.',
              },
            ],
          },
          {
            word: 'extirpar',
            form: '*extirpar* verbo transitivo',
            origin: '[del latín *exstirpare*, ‘arrancar de raíz’]',
            senses:
              '1. Arrancar de raíz una planta, o quitar un tejido enfermo. 2. Acabar del todo con algo. En la Colonia se llamó *extirpación de idolatrías* a la campaña contra los cultos andinos. Ej.: *extirpar la maleza.*',
            notes: [
              {
                n: '4.0',
                text: 'El nieto trajo una tarea: tres sinónimos de extirpar. Arrancar, erradicar, suprimir, leyó. Dijo que los cirujanos también extirpan, un tumor, una muela. Y las raíces, dijo la señora sin levantar la vista.',
              },
              {
                n: '4.1',
                text: 'Después dijo que la maleza se arranca y lo demás se corta. Que la chilca se corta. Que la ruda se corta.',
              },
              { n: '4.2', text: 'El nieto anotó eso en su cuaderno. Yo también, en la hoja de cuadros.' },
            ],
          },
          {
            word: 'ceniza',
            form: '*ceniza, -s* sustantivo femenino',
            origin: '[del latín *cinis*]',
            senses:
              '1. Lo que queda de las plantas quemadas en un sahumerio. 2. Lo que quedaba de los objetos rituales que los visitadores mandaban quemar. Ej.: *reducir a cenizas.*',
            notes: [
              {
                n: '5.0',
                text: 'También en agosto fui con la señora al cementerio. Llevaba una bolsa con la tierra de un tarro de pintura. Me dijo que no preguntara por qué agosto.',
              },
              {
                n: '5.1',
                text: 'Antes de entrar quemó un manojo seco en una lata abierta, junto a la puerta, y me hizo pararme del lado del viento. Lo que quedó no pesaba nada, y lo esparció sobre el pasto.',
              },
            ],
          },
          {
            word: 'médica',
            form: '*médico, -ca* adjetivo y sustantivo',
            origin: '[del latín *medicus*, de *mederi*, ‘curar’]',
            senses:
              '1. Relativo a la medicina. 2. Persona con título y permiso legal para ejercerla. Ej.: *receta médica.*',
            notes: [
              {
                n: '6.0',
                text: 'Un manojo de chilca para la espalda de su madre: lo compró en septiembre una mujer con una bata blanca bajo el abrigo. Venía del centro de salud, a tres cuadras. Dos semanas después compró otro, para la espalda de su madre otra vez.',
              },
              {
                n: '6.1',
                text: 'La señora no le preguntó nada. Le dijo que la bata se le veía por debajo. La mujer se la quitó, la dobló sobre el brazo y se rió una sola vez.',
              },
            ],
          },
          {
            word: 'informal',
            form: '*informal* adjetivo y sustantivo',
            origin: '[de *in-* y *formal*]',
            senses:
              '1. Dicho de un trabajo: que queda fuera de los registros del empleo. La palabra viene de unos informes sobre Kenia y Ghana de comienzos de los años setenta. 2. Que no guarda las formas. Ej.: *trato informal.*',
            notes: [
              {
                n: '7.0',
                text: 'Formal o informal, preguntó el estudiante de la encuesta que vino en octubre. Dije que tenía permiso. Marcó formal. A la señora le preguntó lo mismo. Ella dijo que tenía permiso desde hace veintiséis años y que si eso la hacía formal. El estudiante dijo que técnicamente sí.',
              },
              {
                n: '7.1',
                text: 'Después preguntó si en el puesto se atendían consultas. La señora le dijo que se sentara. Se sentó en la tercera silla y terminó contando él. La encuesta quedó en blanco.',
              },
            ],
          },
        ],
      },
    ],
  },

  plano: {
    eyebrow: 'Lata de galletas',
    title: 'Planos',
    blocks: [
      {
        type: 'plans',
        items: [
          {
            title: 'Plano 2 · Planta del mercado cubierto',
            image: plano2,
            alt: 'Esquema en planta del mercado cubierto, con los siete puestos de las recetas numerados, los puestos a, b y c, el recorrido de las once y la visita del inspector.',
            caption: [
              '**1** ruda · **2** manzanilla · **3** chilca · **4** ñachag · **5** sunfo · **6** romero · **7** mashua. **a**, el puesto de las aromáticas; **b**, la que vende solo toronjil; **c**, la vecina, la vendedora que conoce a todos. Muros con pilastras en los ejes, ventanas, SS.HH., escalera con la proyección del entrepiso y la línea del corte B–B. Niveles en metros.',
              'Trazo largo: el recorrido de las once, que empieza por el fondo del pasillo de la izquierda, cruza por el frente y sube por el de la derecha. Punteado fino: la visita del inspector.',
            ],
          },
          {
            title: 'Plano 5 · Mercado de la avenida',
            image: plano5,
            alt: 'Esquema en planta de un mercado grande: tres pabellones alrededor de una plaza con fuente, comedores, administración, patio y andén de carga, estacionamiento, paso cebra y parada.',
            caption: [
              'Implantación de un mercado grande: tres pabellones con estructura y proyección de cubierta alrededor de una plaza con jardineras, fuente y bancas; comedores, administración y SS.HH., andén de carga, estacionamiento, paso cebra y parada. La estrella es la pollería donde se compra un pollo entero.',
            ],
          },
        ],
      },
    ],
  },
}
