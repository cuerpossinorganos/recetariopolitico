// Zona "Contenido" del inicio. El switch cambia entre lecturas de DÍA y de NOCHE:
// cada modo tiene sus propias pestañas (01, 02…) y su propia lista de lecturas.
//
//   minutes   minutos de lectura que se muestran arriba a la derecha (null = no se muestra)
//   tabs      [{ id, heading, kind, items }]
//             heading   título de la pestaña (null = sin título)
//             kind      'recipes' = las recetas con filtros por categoría (ver RecipeBrowser)
//                       'tin' = la lata de galletas con sus cuatro objetos (ver TinBrowser)
//                       'sobremesa' = las tres historias de la noche, con cards oscuras (ver SobremesaBrowser)
//             subtitle  línea corta bajo el título de la pestaña (opcional)
//             items     lista simple de lecturas; vacío = se muestra "Contenido por llegar"
//
// De noche solo hay una pestaña (01). Pendiente: los minutos de lectura de la noche.

export const contents = {
  day: {
    minutes: 50,
    tabs: [
      { id: '01', heading: 'Recetas', kind: 'recipes', items: [] },
      { id: '02', heading: 'Lata de galletas', kind: 'tin', items: [] },
    ],
  },
  night: {
    minutes: null,
    tabs: [
      {
        id: '01',
        heading: 'Sobremesa',
        subtitle: 'Lo que pasa después de comer cuando el mercado se vacía',
        kind: 'sobremesa',
        items: [],
      },
    ],
  },
}
