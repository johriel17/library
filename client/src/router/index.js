import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BooksIndex from '../views/books/Index.vue'
import BooksView from '../views/books/View.vue'
import BooksAdd from '../views/books/Add.vue'
import BooksEdit from '../views/books/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  //books
  { path: '/books',component: BooksIndex},
  { path: '/books/view/:id', component: BooksView},
  { path: '/books/add', component: BooksAdd},
  { path: '/books/edit/:id', component: BooksEdit},
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
