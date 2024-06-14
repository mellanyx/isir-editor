<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})

const props = defineProps(['isirData', 'isirKey'])

const firstName = props.isirData[24];
const middleName = props.isirData[25];
const lastName = props.isirData[26];

let newISIRString = ref("");

const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

const saveToFile = () => {
  props.isirData.forEach((field_data, field_key) => {
    if (newISIRString.length > 0) {
      newISIRString = insertAt(newISIRString, field_data.value, parseInt(field_data.pos));
    } else {
      newISIRString = field_data.value;
    }

  });

  const a = document.createElement('a');
  const blob = new Blob([newISIRString.toString()]);
  a.href = URL.createObjectURL(blob);
  a.download = `${lastName.value.trim()}_${middleName.value.trim()}_${firstName.value.trim()}_ISIR`;
  a.click();

  newISIRString = "";
}
</script>

<template>
  <div class="my-5">
    <form class="max-w-full" @submit.prevent="saveToFile">
        <h2 :id="props.isirKey + '-heading'">
          <button type="button" class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" :data-accordion-target="'#' + props.isirKey + '-body'" aria-expanded="false" :aria-controls="props.isirKey + '-body'">
            <span>{{ lastName.value }} {{ middleName.value }} {{ firstName.value }}</span>
            <div class="flex items-center">
              <button
                  type="submit"
                  class="me-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Сохранить в файл
              </button>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </div>
          </button>
        </h2>
        <div :id="props.isirKey + '-body'" class="hidden" :aria-labelledby="props.isirKey + '-heading'">
        <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <div class="grid grid-flow-row-dense gap-4 grid-cols-4">
              <div class="mb-3" v-for="(field, field_index) in props.isirData" :key="'f_' + (field_index + 1)">
                <label
                    :for="'f_' + (field_index + 1)"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white break-all"
                >
                  <span class="font-semibold">Название: {{ field.name ? field.name : 'Неизвестно' }}</span>
                  <p><small>Необходимая длина строки: {{field.len}}</small></p>
                  <p><small>Текущая длина строки: {{field.value.length}}</small></p>
                </label>
                <input
                    type="text"
                    :id="'f_' + (field_index + 1)"
                    :class="{ 'input-error': parseInt(field.len) !== field.value.length, 'input-success': parseInt(field.len) === field.value.length }"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    v-model="field.value"
                    :minlength="parseInt(field.len)"
                    :maxlength="parseInt(field.len)"
                />
                <p
                    v-if="parseInt(field.len) !== field.value.length"
                    class="mt-2 text-sm text-red-600 dark:text-red-500"
                >
                  <span class="font-medium">Внимание!</span>
                  <p>Необходимая длина строки: {{ field.len }}</p>
                  <p>Текущая длина строки: {{ field.value.length }}</p>
                </p>
              </div>
            </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
input.input-error {
  --tw-bg-opacity: 1;
  background-color: rgb(253 242 242 / var(--tw-bg-opacity));
  border-color: rgb(240 82 82 / var(--tw-border-opacity));
  color: rgb(119 29 29 / var(--tw-text-opacity));
}
input.input-success {
  --tw-bg-opacity: 1;
  background-color: rgb(243 250 247/var(--tw-bg-opacity));
  border-color: rgb(14 159 110/var(--tw-border-opacity));
  color: rgb(1 71 55/var(--tw-text-opacity));
}
</style>