// Texto de la hoja "La despensa" (la que se abre desde el sobre). Una fila por planta.
//   origin   "llegó" (vino de Europa con los españoles) o "ya estaba" (de aquí)
//   notice   cómo se reconoce
//   say      lo que se dice al darla
export const despensa = {
  title: 'La despensa',
  columns: ['Planta', 'Origen', 'Se reconoce por', 'Se dice al darla'],
  rows: [
    {
      plant: 'Ruda',
      latin: 'Ruta graveolens',
      origin: 'llegó',
      notice: 'olor intenso; sabor amargo; flores amarillas',
      say: 'Para llevar nomás. Para tomar, no. Después del baño, sombra.',
    },
    {
      plant: 'Manzanilla',
      latin: 'Matricaria chamomilla',
      origin: 'llegó',
      notice: 'flor pequeña que huele a fruta',
      say: 'Al menor de un año, no. Vaya a ver a alguien.',
    },
    {
      plant: 'Chilca',
      latin: 'Baccharis latifolia',
      origin: 'ya estaba',
      notice: 'olor verde y resinoso; se corta, no se arranca',
      say: 'Para la espalda. Si está esperando o da de lactar, después. Si es para un niño, cuántos años tiene.',
    },
    {
      plant: 'Ñachag',
      latin: 'Bidens andicola',
      origin: 'ya estaba',
      notice: 'flor amarilla; crece al borde de los caminos',
      say: 'Nueve días, no más. Si la manzanilla le cae mal, esta también. Y el médico, igual.',
    },
    {
      plant: 'Sunfo',
      latin: 'Clinopodium nubigenum',
      origin: 'ya estaba',
      notice: 'el olor antes que la hoja: un frío verde con una punta de pimienta',
      say: 'Para el mal aire. Un atado alcanza. Si le cae pesado, se deja.',
    },
    {
      plant: 'Romero',
      latin: 'Salvia rosmarinus',
      origin: 'llegó',
      notice: 'ramas largas; olor que se huele desde la puerta',
      say: 'La rama, no el aceite. Si está esperando, poquito.',
    },
    {
      plant: 'Mashua',
      latin: 'Tropaeolum tuberosum',
      origin: 'ya estaba',
      notice: 'tubérculo nudoso, crema, amarillo o morado; cruda, pica',
      say: 'Cruda, no. Asoleada y cocida.',
    },
  ],
  note: 'Anoté «llegó» para las que vinieron de Europa con los españoles y «ya estaba» para las de aquí.',
}
