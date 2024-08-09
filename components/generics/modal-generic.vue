<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text v-if="props.mode !== 'delete'">
        <v-row v-for="input in props.formFields" :key="input.label">
          <v-col cols="12">
            <v-text-field v-model="input.value" :label="input.label" :rules="input.rules" :type="input.type"
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        Quieres eliminar este registro?
      </v-card-text>
      <v-card-actions class="flex justify-end gap-4">
        <v-spacer></v-spacer>
        <v-btn @click="handleClose" variant="tonal" color="info">Cerrar</v-btn>
        <slot name="buttonAction"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
let isOpen = ref(false);
let valueItem = ref(null);
const props = defineProps({
  title: String,
  formFields: Array,
  mode: String,
  item: Object,
});
watchEffect(() => {
  valueItem.value = props.item;


  if (props.mode === 'edit') {
    props.formFields.forEach((field) => {
      field.value = props.item[field.label];
    });
  } else if (props.mode === 'create') {
    props.formFields.forEach((field) => {
      field.value = '';
    });
  }
});


function handleOpen() {
  isOpen.value = true;
}

const handleClose = () => {
  isOpen.value = false;
};
defineExpose({
  handleOpen,
  handleClose,
  valueItem,
});
</script>
