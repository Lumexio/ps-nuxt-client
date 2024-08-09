<template>
  <generic-table-crud :title="title" :columns="columns" :endPoint="endpoint" :formFields="formFields"
    :mockData="mockData" />
</template>

<script>

export default {
  name: 'CategoryMain',
  data() {
    return {
      title: 'Categoria',
      columns: [
        { id: 0, key: 'id', title: 'ID' },
        { id: 1, key: 'name', title: 'Name' },
      ],
      endpoint: '/category',
      formFields: [
        { label: 'name', value: '', rules: [v => !!v || 'Name is required'] },
        { label: 'description', value: '', rules: [v => !!v || 'Description is required'] },
      ],
      mockData: [
        { id: 1, name: 'Category 1', description: 'Description 1' },
        { id: 2, name: 'Category 2', description: 'Description 2' },
      ],
    }
  },
}
</script>
