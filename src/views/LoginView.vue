<template>
<div class="hero min-h-screen bg-base-100">
    <div class="hero-content flex-col lg:flex-row-reverse w-full">
        <div class="text-center lg:text-left flex flex-col justify-center items-center">
            <h1 class="text-5xl font-bold">Login now!</h1>
        </div>
        <form  @submit.prevent="login" class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" class="input input-bordered" v-model="login_form.email" />
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" class="input input-bordered" v-model="login_form.password" />
                    <label class="label justify-end">
						<router-link 
						name="register"
						to="/register"
						>
						<a href="#" class="label-text-alt link link-hover">Sign Up!</a>
						</router-link>
                        
                    </label>
                </div>
                <div class="form-control mt-6">
                    <button type="submit" value="Login" class="btn btn-primary">Login</button>
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
        const login_form = ref({});
        const store = useStore();
        const login = () => {
            store.dispatch('login', login_form.value);
        }
        return {
            login_form,
            login,
        }
    }
}
</script>

<style>

</style>
