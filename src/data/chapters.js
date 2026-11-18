// Índice del libro (menú). Los capítulos que se habilitan al avanzar se
// controlan con la prop `reached` del componente Menu.
export const chapters = [
  { id: 'prologo', title: 'Prólogo' },
  {
    id: 'recetas',
    title: 'Recetas',
    items: [
      'Ruda al hilo rojo',
      'Manzanilla, dicha dos veces',
      'Chilca cortada',
      'Ñachag a nueve días',
      'Sunfo atado en tres nudos',
      'Romero, dos recetas que no se reconcilian',
      'Mashua, que se vende dos veces',
    ],
  },
  { id: 'lata-de-galletas', title: 'Lata de Galletas' },
  {
    id: 'sobremesa',
    title: 'Sobremesa',
    items: ['La taza', 'A las once', 'Sin novedad'],
  },
]
