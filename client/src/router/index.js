import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
//books
import BooksIndex from '../views/books/Index.vue'
import BooksView from '../views/books/View.vue'
import BooksAdd from '../views/books/Add.vue'
import BooksEdit from '../views/books/Edit.vue'

//borrowed-books
import BorrowedBooksIndex from '../views/borrowed-books/Index.vue'
import BorrowedBooksView from '../views/borrowed-books/View.vue'
import BorrowedBooksAdd from '../views/borrowed-books/Add.vue'
import BorrowedBooksEdit from '../views/borrowed-books/Edit.vue'
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

  //borrowedBooks
  { path: '/borrowed-books',component: BorrowedBooksIndex},
  { path: '/borrowed-books/view/:id', component: BorrowedBooksView},
  { path: '/borrowed-books/add', component: BorrowedBooksAdd},
  { path: '/borrowed-books/edit/:id', component: BorrowedBooksEdit},
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
