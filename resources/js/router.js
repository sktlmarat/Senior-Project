import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from "./components/Dashboard";
import Course from "./components/Course";
import CourseRegistration from "./components/CourseRegistration";
import UserManager from "./components/UserManager";
import CourseManager from "./components/CourseManager"

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Dashboard
        },
        {
            path: '/course/:id',
            component: Course
        },
        {
            path: '/course-registration',
            component: CourseRegistration
        },
        {
            path: '/admin/user-manager',
            component: UserManager
        },
        {
            path: '/admin/course-manager',
            component: CourseManager
        }
    ],
    mode: 'history',
    linkActiveClass: "",
    linkExactActiveClass: "active-page"
})
