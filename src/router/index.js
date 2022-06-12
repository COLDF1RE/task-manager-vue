import VueRouter from 'vue-router'
import Users from "../view/Users";
import Tasks from "../view/Tasks";
import TestUI from "../view/TestUI";
import TaskEvent from "../view/TaskEvent";
import TaskOpen from "../view/TaskOpen";
import UserOpen from "../view/UserOpen";
import Login from "../view/Login";
import Error404 from "../view/Error404";

Vue.use(VueRouter)

const router = () => {
	const r = 
	 new VueRouter({
		// Important to prevent hash changes!
		// Otherwise we'll get instances conflict
		mode: 'hash',
		routes: [
			{
				path: '/ui',
				name: 'TestUI',
				component: TestUI,
				props: true,
				children: []
			},
			{
				path: '/tasks',
				name: 'Tasks',
				component: Tasks,
				props: true,
				children: []
			},
			{
				path: '/tasks/event/',
				name: 'taskAdd',
				component: TaskEvent,
				props: true,
				children: []
			},
			{
				path: '/tasks/event/:id',
				name: 'taskEdit',
				component: TaskEvent,
				props: true,
				children: []
			},
			{
				path: '/tasks/:id',
				name: 'TaskOpen',
				component: TaskOpen,
				props: true,
				children: []
			},
			{
				path: '/users/',
				name: 'Users',
				component: Users,
				props: true,
				children: []
			},
			{
				path: '/users/:id',
				name: 'UserOpen',
				component: UserOpen,
				props: true,
				children: []
			},
			{
				path: '/login',
				name: 'Login',
				component: Login,
				props: true,
				children: []
			},
			{
				path: '*',
				name: 'Error404',
				component: Error404,
				props: true,
				children: []
			},

			// {
			// 	path: '/', redirect: { name: 'ListView1' }
			// },
			// {
			// 	path: '*', redirect: { name: 'ListView1' }
			// }
		],
		
	});

	// r.beforeEach((to, from, next) => {
	// 	console.log(from)
	// 	console.log(to)
	// 	//next()
	// })

	return r
}

export default router