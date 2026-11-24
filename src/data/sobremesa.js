import laTaza from '../assets/home/sobremesa/la-taza.webp'
import aLasOnce from '../assets/home/sobremesa/a-las-once.webp'
import sinNovedad from '../assets/home/sobremesa/sin-novedad.webp'

// Sobremesa: las historias de la versión de NOCHE ("lo que pasa después de comer cuando el mercado
// se vacía"). Las cards salieron del diseño en versión clara y se rehicieron en oscuro: la
// ilustración es la del diseño y la etiqueta de abajo se pasó a colores oscuros.
//   chip     texto de la categoría que filtra         ratio  ancho / alto de la imagen de la card
//   El texto de cada historia está más abajo (sobremesaStories), tomado de sobremesa.pdf.
const RATIO = 380 / 665

export const sobremesa = [
  { id: 'la-taza', number: '001', chip: 'La Taza', title: 'La Taza', image: laTaza, ratio: RATIO },
  { id: 'a-las-once', number: '002', chip: 'A las Once', title: 'A las Once', image: aLasOnce, ratio: RATIO },
  { id: 'sin-novedad', number: '003', chip: 'Sin Novedad', title: 'Sin Novedad', image: sinNovedad, ratio: RATIO },
]

// Las tres historias (cara de atrás de cada card). Mismo formato de hojas que la lata (ver lata.js y TinSheet):
//   eyebrow, title, subtitle?   encabezado
//   blocks                      bloques, en este orden:
//     { type: 'prose', paragraphs: [texto] }                     texto corrido (*cursiva* como en el PDF)
//     { type: 'versions', items: [{ n, text }] }                 versiones numeradas de una misma escena
//     { type: 'form', caption?, title, lines: [texto | { check }] }   formulario (check: casilla marcada o vacía)
//     { type: 'heading', title }                                 título de una parte (C ·, E ·)
//     { type: 'dialogue', items: [{ t: 'dir' | 'line', text }] } acotaciones y diálogo
// En "A las Once" la narración va en *cursiva* y lo que dicen los personajes en redonda, como en el PDF.
export const sobremesaStories = {
  'la-taza': {
    eyebrow: 'Sobremesa',
    title: 'La Taza',
    subtitle: 'la otra que vende chilca',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          'Vendo chilca en el mismo mercado que la señora de los cargadores, en la isla del medio, en uno de los puestos que les dieron a las últimas en llegar, y nos saludamos de lejos, ella con la barbilla y yo con la mano, y la gente cree que nos llevamos mal; cada una tiene a los suyos.',
          'Los de ella son hombres de espalda, cargadores, choferes. Los míos son más difíciles de explicar: llegan con una molestia que no tiene lugar fijo, un cansancio, un peso, algo que se cambia de sitio cuando una les pide que lo señalen.',
          'Aprendí a escuchar con mi marido, veintidós años con un hombre que hablaba poco y se levantaba a medianoche con un dolor sin lugar fijo, entre el pecho, la espalda y el brazo, y al principio yo le preguntaba dónde exactamente y desde cuándo y si era punzada o presión, y él me contestaba cada vez distinto y con impaciencia, hasta que dejé de preguntar y me quedaba despierta con la mano puesta en su cadera.',
          'Murió de un ataque, y nunca supe si los dolores de esas noches eran el ataque avisando o eran otra cosa.',
          'Para los míos tengo un banco, un cajón de madera con un poncho encima, que no le ofrezco a todo el mundo.',
          'Hace un año, un martes poco antes de las cuatro, con el mercado casi vacío, se paró frente al puesto un hombre delgado, bien afeitado, con una mochila escolar colgada de un solo hombro, una mochila de colores, de niño, que le quedaba chica, y estuvo un rato sin hablar hasta que dijo chilca, para un dolor que no se explica, así, como si lo hubiera ensayado.',
          'Mientras envolvía el manojo le pregunté dónde le dolía y se tocó el hombro, y después dijo que también abajo y bajó la mano al costado, y cuando le pregunté si el hombro o el costado se rió, una risa corta, y se tocó el pecho y dijo aquí, en realidad aquí. Le pregunté si había ido a un médico. A varios, dijo mirando la calle. Todos dicen que no tengo nada.',
          'Le expliqué cómo calentar el manojo. Sacó del bolsillo de la camisa un billete de veinte, arrugado, y lo dejó en el mostrador, y cuando levanté la vista con el cambio en la mano ya se había dado la vuelta, y en la esquina se detuvo un momento y pensé que iba a volverse, y no se volvió.',
          'Guardé el cambio en una taza de latón, debajo del mostrador, aparte de la caja. La primera semana la miraba cada mañana al abrir, la segunda de a ratos, y al mes se me olvidaba que estaba ahí, y de pronto me acordaba, con una punzada más abajo de la conciencia, en el estómago.',
          'Una tarde crucé el pasillo con el pretexto de unos trapos y le pregunté a la señora de los cargadores si había visto a un hombre delgado con una mochila de colores. No, dijo, ¿por qué? Por nada. No insistió.',
          'Meses después, un día de mucha lluvia, la taza se cayó del estante y el cambio rodó por el piso, y recogí las monedas de a una y los billetes mojados y los eché en la caja, y esa tarde, cada vez que alguien me pagaba, le devolvía un billete que había sido de él. No sentí alivio.',
          'Ahora, cuando alguien me pide chilca sin decir para qué, mirando un punto que no es el mostrador, me quedo un momento con la bolsa abierta. Después la lleno.',
        ],
      },
    ],
  },

  'a-las-once': {
    eyebrow: 'Sobremesa',
    title: 'A las Once',
    blocks: [
      {
        type: 'prose',
        paragraphs: [
          '*El hombre de la escoba entra por el patio de carga y le pasa la mano por el lomo al perro del vigilante, que no es de nadie. Empieza por el fondo, como se lo indicó su primer jefe hace diecinueve años, y nadie le dijo después que podía cambiar. Son las once, o eso marca el reloj de la panadería, que atrasa. En algún parlante suena un villancico cortado: una estrofa, cuatro segundos de nada, la misma estrofa. Faltan siete días para Navidad. Desde que murió su mujer compra todo por mitades, media libra de arroz, medio pollo.*',
          '*En el último puesto del pasillo de la izquierda la mujer de la chilca baja la persiana a medias. Él se detiene y le hace la pregunta de todos los días.* ¿Va a dejar eso ahí? Sí. Se va a echar a perder. Ya se sabe. *Sobre el mostrador queda un manojo, a la vista.*',
          '*En el banco de atrás el cargador se levanta y se estira. Hace seis años que el hombre de la escoba lo ve salir los jueves y nunca lo había visto estirarse.* Buen día*, dice el cargador, a nadie. El hombre de la escoba contesta cuando ya se ha ido.*',
          '*Desde el puesto de enfrente, la vendedora que conoce a todos le señala con la barbilla el puesto cuatro. Una mujer acomoda un manojo en la punta del mostrador, de espaldas. Al fondo de la bolsa del día asoma otro, atado con una hebra distinta. ¿Para quién es?, pregunta él. La vendedora se encoge de hombros y él sigue barriendo.*',
          '*En el puesto cinco, en un rincón, una mujer ata un atado de sunfo para una clienta que mira el celular. Primer nudo, segundo nudo. En el tercero se detiene, un segundo, con la mano en el aire. Él la ha visto atar cientos de veces y siempre se detiene ahí; pensó una vez que le faltaba un paso. Hoy la mujer levanta la cara y la clienta levanta la suya, dos segundos, y después la mujer cierra el nudo. Se acordó, piensa él, y sigue barriendo.*',
          '*En el puesto dos, junto a la puerta lateral, una mujer con un niño en brazos repite cinco cosas en orden. Él se sabe la primera de memoria.*',
          '*Cruza por el frente y sube por el pasillo de la derecha. En el rincón de la escalera, donde nadie mira, la que vende solo toronjil se sirve otra taza del termo. Una mujer de zapatos cómodos le dice* qué frío hace*. Él pasa por detrás sin rozar la pared con la escoba.*',
          '*Frente a la escalera, las ramas del romero salen del mostrador hacia el pasillo. A esta hora ya nadie se roza con ellas, pero en el piso hay agujitas verdes que se le meten en las cerdas. Las barre y el olor sube. Le suena a una cocina. No sabe a cuál. La de la trenza blanca lo mira barrer.* Ayer una señora se llevó dos ramas largas*, dice.* Se fue por el pasillo golpeando a medio mercado. *Él dice que le suena a una cocina.* A todos*, dice ella.* Casi nunca a la misma.',
          '*En el puesto siete, entre la frutera y el carnicero, la de la mashua ya tapó con un saco los cajones de la izquierda. Los estantes de la pared siguen descubiertos. Un hombre mayor, con el sombrero en la mano, espera de lado a que pase la escoba. Él apura el paso. Alcanza a oír* cuánto tiempo hace*. Lo demás no.*',
          '*En un puesto chico de la isla del medio, la otra que vende chilca cuenta el cambio. Debajo del mostrador hay una taza de latón, vacía. Cuando él pasa, ella levanta la vista.* ¿Vio al último? *Él no entiende.* Al último que me compró. *Piensa.* Uno de camisa de cuadros. Con bigote. Pagó con cinco. Bigote*, repite ella. Lo repite otra vez, moviendo apenas los labios. Después dice* gracias*. Barre alrededor de la taza sin moverla.*',
          '*En el puesto de la ruda hay tres sillas ocupadas. En la primera, una anciana con las manos juntas sobre la cartera. En la segunda, una joven con un niño dormido contra el hombro. En la tercera, el inspector, con la carpeta sobre las rodillas. No se ha dado cuenta de que se sentó en una de las sillas del puesto, o se dio cuenta tarde. La señora está de pie, con el permiso en la mano. En el puesto de al lado la muchacha de las aromáticas aprieta contra el pecho una lata de galletas de coco y no mira a nadie.*',
          '*Ha medido el frente y el fondo con la cinta amarilla, como todos los años. Después ha mirado las tres sillas, y a quienes están sentadas en ellas, una por una, más de lo necesario. La anciana le sostiene la mirada. Él baja los ojos.*',
          '*Lee en voz alta lo que escribe, como hace siempre: permiso vigente, tasa al día, metraje conforme. Se detiene. La renovación llegó el lunes. Vuelve a mirar las sillas. Sin novedad, dice, y lo escribe.*',
          '*Se levanta, dobla la cinta, dice* qué frío hace *y la señora dice que sí. No se va enseguida; parece que va a preguntar algo, pero no pregunta. Dice* hasta luego *y se va por el pasillo con el paraguas colgando del codo.*',
          '*Cuando el hombre de la escoba llega al puesto, el inspector ya no está. La señora saca del mandil lo que queda del ovillo, un resto del grosor de un dedo. Ata con él un último manojo y corta. Lo que sobra cae junto a la pata de una silla: tres centímetros de hilo rojo. Él lo levanta.* Se le cayó. *Ella lo mira un rato en la palma abierta de él.* Quédeselo. ¿Y qué hago con esto? Llevarlo. *Él pregunta si se vende.* Ese no. *Se lo guarda en el bolsillo de la camisa, junto al lápiz.*',
          '*Termina el pasillo a las once y cuarenta, saca la hoja de su turno, doblada en cuatro, y escribe lo de todos los días: sin novedad. Esta tarde va a ir al mercado de la avenida a pedir un pollo entero y, si le preguntan si lo quiere partido, va a decir que no.*',
        ],
      },
    ],
  },

  'sin-novedad': {
    eyebrow: 'Sobremesa',
    title: 'Sin Novedad',
    subtitle: 'tres versiones de una visita',
    blocks: [
      {
        type: 'versions',
        items: [
          { n: '1.', text: '*El inspector se sentó en una de las cuatro sillas para escribir, y nadie le preguntó si quería sentarse. Midió el frente y el fondo. Miró las tres sillas ocupadas más tiempo del necesario. Dijo que la renovación había llegado el lunes.*' },
          { n: '2.', text: '*18 dic. Inspector. Se sentó. Renovado.*' },
          { n: '3.', text: '`Observaciones: sin novedad.`' },
        ],
      },
      {
        type: 'form',
        caption: 'Permiso de puesto fijo',
        title: 'C · Formulario de renovación',
        lines: [
          'FORMULARIO DE RENOVACIÓN · puesto 1',
          'TIPO DE ACTIVIDAD',
          { check: true, text: 'venta de plantas medicinales y aromáticas' },
          { check: false },
          'OBSERVACIONES DEL INSPECTOR: sin novedad.',
        ],
      },
      { type: 'heading', title: 'E · Palinodia' },
      {
        type: 'dialogue',
        items: [
          { t: 'dir', text: '*[diciembre, después de la visita. la muchacha le muestra a la señora las hojas de cuadros. pasa las cuentas, las palabras, las técnicas. se detiene en una]*' },
          { t: 'line', text: '—Esta también la quiero imprimir.' },
          { t: 'line', text: '—¿Eso va a hacer que venda más?' },
          { t: 'line', text: '—Probablemente.' },
          { t: 'line', text: '—¿Es necesario?' },
          { t: 'line', text: '—No. Necesario no.' },
          { t: 'line', text: '—Entonces no.' },
          { t: 'dir', text: '*[la muchacha tacha la receta, línea por línea, y escribe encima: no la pongo aquí]*' },
        ],
      },
    ],
  },
}

// Hoja de atrás de una card: su historia o, si todavía no hay, un aviso en el mismo papel
export const sobremesaSheet = (card) =>
  sobremesaStories[card.id] ?? {
    eyebrow: 'Sobremesa',
    title: card.title,
    blocks: [{ type: 'prose', paragraphs: ['El contenido de esta historia llega pronto.'] }],
  }
