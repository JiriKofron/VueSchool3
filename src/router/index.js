import {createRouter, createWebHistory} from "vue-router";
import HomePage from '@/views/HomePage.vue'
import TheCountryDetail from '@/components/TheCountryDetail.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/:country', name:'country', component: TheCountryDetail },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router

