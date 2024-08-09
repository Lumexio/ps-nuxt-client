<script setup>
import { useGenericFetchQueries } from '~/api/generic-fetch-querys';
const props = defineProps({
  title: String,
  columns: Array,
  mockData: Array,
  formFields: Array,
  endpoint: String,
});


const dialog = ref(null);
const mode = ref('create'); // Track the mode of the modal
const selectedItem = ref(null); // Track the selected item

const { fetchQuery, createMutation, updateMutation, deleteMutation } = useGenericFetchQueries(props.endpoint);


onMounted(() => {
  const fet = fetchQuery.refetch();
  console.log(fet);

});
function openModal(modalMode, item = null) {
  mode.value = modalMode;
  selectedItem.value = item;
  dialog.value.handleOpen();
}

function updateQueryhandler() {
  updateMutation.mutate(selectedItem.value, {
    onSuccess: () => {
      dialog.value.handleClose();
      fetchQuery.refetch();
    },
    onError: (error) => {
      console.error('Failed to update data:', error);
    }
  });
}

function deleteQueryhandler() {
  deleteMutation.mutate(selectedItem.value.id, {
    onSuccess: () => {
      dialog.value.handleClose();
      fetchQuery.refetch();
    },
    onError: (error) => {
      console.error('Failed to delete data:', error);
    }
  });
}

function createQueryhandler() {
  createMutation.mutate(dialog.value.valueItem, {
    onSuccess: () => {
      dialog.value.handleClose();
      fetchQuery.refetch();
    },
    onError: (error) => {
      console.error('Failed to create data:', error);
    }
  });
}

</script>

<template>
  <div>
    <v-toolbar class="pa-2">
      <h2>{{ props.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn @click="openModal('create')" color="primary" variant="tonal">Create</v-btn>
    </v-toolbar>

    <v-table fixed-header>
      <thead>
        <tr>
          <th v-for="column in props.columns" :key="column?.id">
            {{ column?.title }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in props.mockData" :key="data?.id">
          <td v-for="column in props.columns" :key="column?.id">
            {{ data[column?.key] }}
          </td>
          <td>
            <!-- Updated Button Code -->
            <v-btn @click="openModal('edit', data)" density="comfortable" color="primary" icon="mdi-pencil" />

            <v-btn @click="openModal('delete', data)" density="comfortable" color="error" icon="mdi-delete" />

          </td>
        </tr>
      </tbody>
    </v-table>

    <modal-generic ref="dialog" :title="props.title" :formFields="props.formFields" :mode="mode" :item="selectedItem">
      <template #buttonAction>
        <v-btn v-if="mode === 'create'" @click="createQueryhandler" color="primary" variant="tonal">
          Guardar <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn v-if="mode === 'edit'" @click="updateQueryhandler" color="primary" variant="tonal">
          Guardar <v-icon>mdi-check</v-icon>
        </v-btn>
        <v-btn v-if="mode === 'delete'" @click="deleteQueryhandler" color="error" variant="tonal">
          Confirmar <v-icon>mdi-check</v-icon>
        </v-btn>
      </template>
    </modal-generic>
  </div>
</template>
