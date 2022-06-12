import api from '@/api'

export const mutation = {
    SET_LOADING: 'SET_LOADING',
    SET_TASKS: 'SET_TASKS',
    SET_USERS: 'SET_USERS',
    SET_AUTH: 'SET_AUTH',
    SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
    // SET_FILTER: 'SET_FILTER',
}

export default {
    state: {
        auth: false,
        loading: false,
        tasks: [],
        users: [],
        activeTab: '',
        // filters: {},
    },

    getters: {
        auth: state => state.auth,
        loading: state => state.loading,
        tasks: state => state.tasks,
        users: state => state.users,
        activeTab: state => state.activeTab,
        // filters: state => state.filters,
        // getCurrentFilter: (state, getters) => state.filters[getters.activeTab],
    },

    mutations: {
        [mutation.SET_AUTH]: (state, auth) => {
            state.auth = auth
        },
        [mutation.SET_LOADING]: (state, isLoading) => {
            state.loading = isLoading
        },
        [mutation.SET_TASKS]: (state, data) => {
            state.tasks = data || []
        },
        [mutation.SET_USERS]: (state, data) => {
            state.users = data || []
        },
        // [mutation.SET_FILTER]: (state, data) => {
        //     // state.events = data
        //     // state.filters[state. activeTab] = data
        //     //console.log(data)
        //     Vue.prototype.$set(state.filters, state.activeTab, data)
        // },
        [mutation.SET_ACTIVE_TAB]: (state, data) => {
            state.activeTab = data
        },
    },

    actions: {
        setAuth: ({dispatch, commit}, value) => {
            commit(mutation.SET_AUTH, value)
        },

        setCurrentLogin: ({dispatch, commit}, value) => {
            commit(mutation.SET_CURRENT_LOGIN, value)
        },

        setLoading: ({dispatch, commit}, value) => {
            commit(mutation.SET_LOADING, value)
        },
        fetchTasks: ({dispatch, commit, getters}, value) => {
            // dispatch('setLoading', true)
            commit(mutation.SET_LOADING, true)
            api.Events.getTasks(value)
                .then(({data}) => {
                    // setTimeout(() => {
                    console.log(data)
                        // dispatch('setLoading', false)
                        commit(mutation.SET_LOADING, false)
                        commit(mutation.SET_TASKS, data)
                    // }, 4000)
                })
        },
        fetchUsers: ({dispatch, commit, getters}, value) => {
            commit(mutation.SET_LOADING, true)
            api.Events.getUsers(value)
                .then(({data}) => {
                    commit(mutation.SET_LOADING, false)
                    commit(mutation.SET_USERS, data)
                })
        },


        setActiveTab: ({ dispatch, commit }, value) => {
        	commit(mutation.SET_ACTIVE_TAB, value)
        },
        // setFilters: ({ dispatch, commit }, value) => {
        // 	commit(mutation.SET_FILTER, value)
        // },
    }
}
