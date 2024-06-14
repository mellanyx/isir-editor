<script setup>
  import isirConfig from "../configs/isir_config";

  const isir = ref(null);

  const isirMaxLength = 7704;

  const strChunks = ref([]);

  let newISIRString = ref("");

  let isirData = reactive(isirConfig);

  let arIsirs = reactive([]);

  const insertAt = (str, sub, pos) => `${str.slice(0, pos)}${sub}${str.slice(pos)}`;

  const uploadISIR = (e) => {
    isir.value = e.target.files[0];

    let reader = new FileReader();

    if (isir.value) {
      reader.readAsText(isir.value);

      reader.onload = function() {
        const str = reader.result.toString().trimStart();
        strChunks.value = str.match(new RegExp(`.{1,${isirMaxLength}}`, 'g'));
      };

      reader.onloadend = function() {
        strChunks.value.forEach((isirStr, isirKey) => {
          let isirTemplate = [];

          isirData.forEach((field_data, field_key) => {
            field_data.value = isirStr.substring(parseInt(field_data.pos), parseInt(field_data.pos) + parseInt(field_data.len));

            if (newISIRString.length > 0) {
              newISIRString = insertAt(newISIRString, field_data.value, parseInt(field_data.pos));
            } else {
              newISIRString = field_data.value;
            }

            isirTemplate.push({
              name: field_data.name,
              len: parseInt(field_data.len),
              pos: parseInt(field_data.pos),
              value: field_data.value,

            });
          });

          arIsirs.push(isirTemplate);
        })
      };

      reader.onerror = function() {
        console.log(reader.error);
      };
    }
  }
</script>

<template>
    <div>
      <div class="col-span-full">
        <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900">Upload ISIR File</label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div class="text-center">
            <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
            </svg>
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                <span>Upload ISIR file</span>
                <input id="file-upload" name="file-upload" type="file" accept="*.dat" class="sr-only" @change="uploadISIR">
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">dat up to 10MB</p>
          </div>
        </div>
      </div>

      <div v-if="arIsirs.length > 0" v-for="(isir, index) in arIsirs" :key="'isir-block-' + index">
        <div data-accordion="collapse">
          <IsirEditor :isir-data="isir" :isir-key="'isir-block-' + index" />
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>