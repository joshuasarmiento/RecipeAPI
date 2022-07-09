<template>
<div class="container md:mx-auto sm:mx-auto xs:mx-auto">
    <NavBar />
    <!-- <router-view v-slot="{ Component }">
        <transition name="router-fade" mode="out-in">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </transition>
    </router-view> -->
    <transition name="fade" mode="out-in" appear>
        <router-view />
    </transition>
    <br>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
    components: {
        NavBar
    }
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
