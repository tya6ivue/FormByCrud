import Vue from 'vue'
import Vuex from 'vuex'
import userData from './modules/user.modules'
// import user from './modules/user.modules'

Vue.use(Vuex)

export const store  = new Vuex.Store({
    modules: {
        userData,
    }
})
