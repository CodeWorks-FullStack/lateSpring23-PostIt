import { reactive } from 'vue'


// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Albums.js').Album[]} */
  albums: [],

  /** @type {import('./models/Albums.js').Album|null} */
  activeAlbum: null,

  /** @type {import('./models/Picture.js').Picture[]} */
  pictures: []
})
