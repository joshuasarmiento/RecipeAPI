<template>
  <div class="hero min-h-screen bg-base-100">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
        <div class="text-center lg:text-left flex flex-col justify-center items-center">
            <h1 class="text-5xl font-bold">Signup now!</h1>
        </div>
        <form  @submit.prevent="register" class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" class="input input-bordered" v-model="register_form.email" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" class="input input-bordered" v-model="register_form.password" />
                    <label class="label justify-end">
                        <a href="#" @click="$router.go(-1)" class="label-text-alt link link-hover">Login!</a>
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button type="submit" value="Register" class="btn btn-primary">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import {
    ref
} from 'vue'
import {
    useStore
} from 'vuex'
export default {
    setup() {
        const register_form = ref({});
        const store = useStore();
        const register = () => {
            store.dispatch('register', register_form.value);
        }
        return {
            register_form,
            register
        }
    }
}
</script>

<style>

</style>