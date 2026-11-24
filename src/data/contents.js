// Zona "Contenido" del inicio. El switch cambia entre lecturas de DÍA y de NOCHE:
// cada modo tiene sus propias pestañas (01, 02…) y su propia lista de lecturas.
//
//   minutes   minutos de lectura que se muestran arriba a la derecha (null = no se muestra)
//   tabs      [{ id, heading, kind, items }]
//             heading   título de la pestaña (null = sin título)
//             kind      'recipes' = las recetas con filtros por categoría (ver RecipeBrowser)
//                       'tin' = la lata de galletas con sus cuatro objetos (ver TinBrowser)
//             items     lista simple de lecturas; vacío = se muestra "Contenido por llegar"
//
// Pendiente: la usuaria enviará qué lecturas van de noche.

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
      { id: '01', heading: null, items: [] },
      { id: '02', heading: null, items: [] },
    ],
  },
}
