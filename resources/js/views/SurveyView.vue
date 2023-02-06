<template>
    <Page>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title : "Create a Survey" }}
                </h1>
            </div>
        </template>

        <form @submit.prevent="saveSurvey">
            <div class="px-4 py-5 shadow sm:rounded-md sm:overflow-hidden">
                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Image
                    </label>
                    <div class="mt-1 flex items-center">
                        <img
                            :src="model.image"
                            :alt="model.title"
                            v-if="model.image"
                            class="w-64 h-48 object-cover"
                        />
                        <span
                            v-else
                            class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-[80%] w-[80%] text-gray-300"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                            </svg>
                        </span>
                        <button
                            type="button"
                            class="relative overflow-hidden ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700"
                        >
                            <input
                                type="file"
                                class="absolute top-0 left-0 right-0 bottom-0 opacity-0 cursor-pointer"
                            />
                            Change
                        </button>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        v-model="model.title"
                        autocomplete="survey_title"
                        class="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:border-indigo-500"
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div class="mt-1">
                        <textarea
                            name="description"
                            rows="3"
                            v-model="model.description"
                            autocomplete="survey_description"
                            placeholder="description"
                            class="shadow-sm focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">
                        Expiry Date
                    </label>
                    <input
                        type="date"
                        name="expire_date"
                        id="expire_date"
                        v-model="model.expire_date"
                        class="mt-1 block w-full shadow-sm sm:text-sm border-gray-500 rounded-md focus:border-indigo-500"
                    />
                </div>
            </div>
        </form>
    </Page>
</template>
<script setup>
import Page from "../components/Page.vue";
import { ref } from "vue";
import store from "../store";
import { useRoute } from "vue-router";

const router = useRoute();

let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: [],
});

if (router.params.id) {
    model.value = store.state.surveys.find(
        (s) => s.id === parseInt(router.params.id)
    );
}
</script>
