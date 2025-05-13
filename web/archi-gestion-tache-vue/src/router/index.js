import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue'
import DashboardGestionnaire from '@/views/Dashboardgestionnaire.vue'
import AddTask from '@/views/AddTask.vue'
import EditTask from '@/views/EditTask.vue'
import TaskList from '@/views/TaskList.vue'
import Home from '@/views/Home.vue'

const routes = [
{ path: '/login', component: Login },
{ path: '/dashboardGestionnaire', component: DashboardGestionnaire },
{ path: '/addTask', component: AddTask },
{ path: '/editTask', component: EditTask },
{ path: '/taskList', component: TaskList },
{ path: '/home', component: Home },
]

const router = createRouter({
history: createWebHistory(),
routes,
})

export default router
