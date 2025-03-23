import {createRouter , createWebHistory} from 'vue-router';
import Login from '../view/Login.vue'
import SignUp from '../view/SignUp.vue'
import JobList from '../view/JobList.vue'
import JobDetail from '../view/JobDetail.vue'
import UserProfile from '../view/UserProfile.vue'

const routes = [
    {
        path: '/',
        component: Login
    },

]

const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router