<template>
<nav v-if="$store.state.user">
    <div class="navbar bg-base-100 py-8 xs:justify-center">
        <div class="flex-1">
            <router-link name="home" to="/">
                <div class="flex items-center space-x-2 sm:hidden xs:hidden">
                    <img class="h-7" src="registered-trademark.png" alt="Logo">
                    <label class="font-semibold text-xl " style="cursor: pointer;">Recipe Api</label>
                </div>
            </router-link>
        </div>
        <div class="flex-none gap-4">
            <router-link class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" to="/">Home</router-link> |
            <router-link class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" to="/about">About</router-link> |
            <label for="logout-modal" class=" text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" cusor="pointer">Logout</label>
        </div>
    </div>
    <!-- Modal for logout -->
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
</template>

<script>
import {
    onBeforeMount
} from 'vue'
import {
    useStore
} from 'vuex'
import {
    useToast
} from "vue-toastification";
const toast = useToast();
export default {
    setup() {
        try {
            const store = useStore()
            onBeforeMount(() => {
                store.dispatch('fetchUser')
            })
        } catch (error) {
            toast.success("Error Dispath: " + error, {
                timeout: 2000
            });
        }
    },
}
</script>

<style>

</style>
