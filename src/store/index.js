import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth'
import {
  useToast
} from "vue-toastification";

const toast = useToast();

export default createStore({
  state: {
    user: null
  },
  mutations: {
      
    SET_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    }

  },
  actions: {
    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            // alert("User not found")
            toast.warning("User not found", {
              timeout: 2000
            })
            break
          case 'auth/wrong-password':
            // alert("Wrong password")
            toast.warning("Wrong password", {
              timeout: 2000
            })
            break
          default:
            // alert("Something went wrong")
            toast.error("Something went wrong", {
              timeout: 2000
            })
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async register ({ commit}, details) {
       const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            // alert("Email already in use")
            toast.warning("Email already in use", {
              timeout: 2000
            })
            break
          case 'auth/invalid-email':
            // alert("Invalid email")
            toast.warning("Invalid email", {
              timeout: 2000
            })
            break
          case 'auth/operation-not-allowed':
            // alert("Operation not allowed")
            toast.warning("Operation not allowed", {
              timeout: 2000
            })
            break
          case 'auth/weak-password':
            // alert("Weak password")
            toast.warning("Weak password", {
              timeout: 2000
            })
            break
          default:
            alert("Something went wrong")
            toast.error("Something went wrong", {
              timeout: 2000
            })
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    }
    
  }
})