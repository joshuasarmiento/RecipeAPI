<template>
<main>
    <div class="flex items-center justify-center">
        <div class="">
        </div>
        <div class="form-control">
            <div class="input-group">
                <input type="text" @keyup="getAlldata" v-model="search" placeholder="Search…" class="input input-bordered" />
                <button class="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
            </div>
        </div>
    </div>
    <div v-if="!search.length">
        <section class="mt-40">
            <span class="font-bold text-2xl flex justify-center items-center space-x-2">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
                </svg>
                <p>Search for recipes</p>
            </span>
        </section>
    </div>
    <div v-else class="">
        <LazyList class="pt-10" :data="totalVuePackages" :itemsPerRender="10" containerClasses="list" defaultLoadingColor="#222">
            <template :slot:item="recipe" class="mx-4 xl:mx-4 md:mx-0 xs:mx-0 grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 sm:gap-1 xs:gap-1 place-items-center ">
                <div v-for="recipe of totalVuePackages" :key="recipe.recipe" class="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure><img class="img" :src="recipe.recipe.image" :alt="recipe.recipe.label" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">{{recipe.recipe.label}}</h2>
                        <div class="text-left">
                            Source:
                            <p class="badge">{{recipe.recipe.source}}</p>
                        </div>
                        <div class="text-left">
                            Calories:
                            <p class="badge">{{parseInt(recipe.recipe.calories)}}</p>
                        </div>
                        <div class="card-actions justify-end pt-4">
                            <label for="modal-toggle" cursor="pointer" class="text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500">Ingredients</label>
                            <a class="text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" target="__blank" rel="noopener" cursor="pointer" :href="recipe.recipe.url">Full Recipe</a>
                        </div>
                    </div>
                </div>
                <!-- Put this part before </body> tag -->
                <input type="checkbox" id="modal-toggle" class="modal-toggle" />
                <div v-for="recipe in totalVuePackages" :key="recipe.recipe" class="modal">
                    <div class="modal-box w-11/12 max-w-5xl">
                        <h3 class="font-bold text-left pb-4 uppercase">Ingredients</h3>
                        <!-- Modal Body -->
                        <div class="overflow-x-auto">
                            <table class="table w-full text-sm">
                                <!-- head -->
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Food Category</th>
                                        <th>Food</th>
                                        <th>Ingredients</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- row 1 -->
                                    <tr v-for="(ingredient, index) in recipe.recipe.ingredients" :key="ingredient.text">
                                        <td>{{index}}</td>
                                        <td>{{ingredient.foodCategory}}</td>
                                        <td>{{ingredient.food}}</td>
                                        <td>{{ingredient.text}}</td>
                                        <td>{{ingredient.weight}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-action">
                            <a class="text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500" target="__blank" cursor="pointer" :href="recipe.recipe.url">Full Recipe</a>
                            <label for="modal-toggle" class="text-gray-500 hover:text-gray-600 cursor-pointer rounded-lg border hover:bg-gray-100 shadow-sm p-3 duration-500">Close</label>
                        </div>
                    </div>
                </div>
            </template>
        </LazyList>
    </div>

</main>
</template>

<script>
import axios from 'axios';
import LazyList from 'lazy-load-list/vue';
import {
    useToast
} from "vue-toastification";

const toast = useToast();

export default {
    name: 'HomeView',
    data() {
        return {
            APP_ID: "50ed1265",
            APP_KEY: "a178b41924dac129014210b533ad35f0",
            search: '',
            error: '',
            totalVuePackages: [],
        };
    },
    components: {
        LazyList
    },
    methods: {
        async getAlldata() {
            // GET request using axios with set headers
            const headers = {
                "Content-Type": "application/json"
            };
            await axios.get("https://api.edamam.com/search?q=" + this.search + "&app_id=" + this.APP_ID + "&app_key=" + this.APP_KEY, {
                    delayed: true,
                    headers
                })
                .then(response => this.totalVuePackages = response.data.hits)
                // I dont't know the best approach here but it's working :)
                .then(res => {
                    try {
                        // To avoid coming across situations where undefined variables may be accessed accidentally, an if check should be added before dealing with variable
                        if (this.search !== undefined) {
                            return res.hits.filter(item =>
                                item.recipe.label.toLowerCase().includes(this.search.toLowerCase())
                            );
                        } else {
                            return res.hits;
                        }
                    } catch (error) {
                        // Flood Erros
                        // TypeError: Cannot read properties of undefined (reading 'filter')
                        console.log(error)
                    }
                })
                // Catching full errors after responses
                .catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log("Request made and server responded")
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        toast.error("Error Response Data: " + error.response.data, {
                            timeout: 2000
                        });
                        toast.error("Error Response Status: " + error.response.status, {
                            timeout: 2000
                        });
                        toast.error("Error Response Headers: " + error.response.headers, {
                            timeout: 2000
                        });
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log("The request was made but no response was received")
                        console.log(error.request);
                        toast.error("Error Request: " + error.request, {
                            timeout: 2000
                        });
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Something happened in setting up the request that triggered an Error")
                    }

                });
            // https://stackoverflow.com/questions/72494154/a-listener-indicated-an-asynchronous-response-by-returning-true-but-the-messag
            // You need to return true when fetching data from cross-origins. 
            return true;
        }
    },
    created() {
        this.getAlldata()
    },
}
</script>

<style scoped>
.img {
    width: 100%;
    height: 150px;
    object-fit: cover;
}
</style>
