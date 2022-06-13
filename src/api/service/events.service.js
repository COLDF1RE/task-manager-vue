export default api => {
	api.Events = {
		login(data) {
            return api.instance.request({
                method: 'post',
                url: `users/login`,
                data: data,
            })
        },

        // TASKS
        getTasks(filter, page, limit) {
            return api.instance.request({
                method: 'post',
                url: `tasks`,
                data: {
                    filter: filter || {},
                    page: page || 0,
                    limit: limit || 0,
                }
            })
        },

        getCurrentTask(taskId){
            return api.instance.request({
                method: 'get',
                url: 'tasks/' + taskId,
            })
        },

        changeStatusTask(taskId, status){
            return api.instance.request({
                method: 'patch',
                url: 'tasks/' + taskId + '/status/' + status,
            })
        },

        createOrEditTask(data){
            return api.instance.request({
                method: 'put',
                url: 'tasks/createOrEdit',
                data: data,
            })
        },

        changeWorkTime(taskId, data){
            return api.instance.request({
                method: 'patch',
                url: 'tasks/' + taskId + '/worktime',
                data: data,
            })
        },

        deleteTask(taskId){
            return api.instance.request({
                method: 'delete',
                url: 'tasks/' + taskId,
            })
        },


        // COMMENTS
        getComments(taskId){
            return api.instance.request({
                method: 'get',
                url: 'comments/' + taskId,
            })
        },
        createOrEditComment(data){
            return api.instance.request({
                method: 'put',
                url: 'comments/createOrEdit',
                data: data,
            })
        },
        deleteComment(commentId){
            return api.instance.request({
                method: 'delete',
                url: 'comments/' + commentId,
            })
        },


        // USERS
        getUsers() {
            return api.instance.request({
                method: 'get',
                url: `users/all`,
            })
        },
        getCurrentUser(userId) {
            return api.instance.request({
                method: 'get',
                url: 'users/' + userId,
            })
        },
        editUser(data) {
            return api.instance.request({
                method: 'put',
                url: 'users/edit',
                data: data,
            })
        },


	}
}