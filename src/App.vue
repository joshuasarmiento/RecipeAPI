<template>
<div class="container md:mx-auto sm:mx-auto xs:mx-auto">
    <nav v-if="$store.state.user">
        <div class="navbar bg-base-100 py-8 xs:justify-between">
            <div class="flex-1">
                <router-link name="home" to="/">
                    <div class="flex items-center space-x-2">
                        <svg  style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
                        </svg>
                        <label class="font-semibold text-xl sm:hidden xs:hidden">Recipe Api</label>
                    </div>
                </router-link>
            </div>
            <div class="flex-none gap-4">
                <router-link class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" to="/">Home</router-link> |
                <router-link class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" to="/about">About</router-link> |
                <label for="logout-modal" class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" cusor="pointer">Logout</label>
            </div>
        </div>
        <!-- Modal for logging out -->
        <input type="checkbox" id="logout-modal" class="modal-toggle" />
        <div class="modal">
            <div class="modal-box text-left">
                <h3 class="font-bold text-lg">Logout Account</h3>
                <p class="py-4">Are you sure you want to logout?</p>
                <div class="modal-action">
                    <label class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" cusor="pointer" @click="$store.dispatch('logout')">Logout</label>
                    <label for="logout-modal" class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" cusor="pointer">Cancel</label>
                </div>
            </div>
        </div>
    </nav>
    <router-view v-slot="{ Component }">
        <transition name="router-fade" mode="out-in">
            <keep-alive include="/">
                <component :is="Component" />
            </keep-alive>
        </transition>
    </router-view>
    <!-- <transition name="fade" mode="out-in" appear>
    <router-view />
</transition>
 -->
</div>
</template>

<script>
import {
    onBeforeMount
} from 'vue'
import {
    useStore
} from 'vuex'

export default {
    setup() {
        const store = useStore()
        onBeforeMount(() => {
            store.dispatch('fetchUser')
        })
    },
}
</script>

<style>
#app {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /* text-align: center; */
}

a.router-link-exact-active {
    @apply text-primary-dark;
    @apply font-semibold;
}

.fade-enter-active {
    animation: coming 0.4s;
    animation-delay: 0.2s;
    opacity: 0;
}

.fade-leave-active {
    animation: going 0.4s;
}

@keyframes going {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-10px);
        opacity: 0;
    }
}

@keyframes coming {
    from {
        transform: translateX(-10px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
}
</style>
