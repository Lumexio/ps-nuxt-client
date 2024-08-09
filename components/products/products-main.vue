<template>
  <generic-table-crud :title="title" :columns="columns" :endpoint="endpoint" :formFields="formFields"
    :mockData="mockData" />
</template>

<script>

export default {
  name: 'ProductsMain',
  data() {
    return {
      title: 'Products',
      columns: [
        { id: 0, key: 'id', title: 'ID' },
        { id: 1, key: 'name', title: 'Name' },
      ],
      endpoint: 'http://localhost:8000/api/products',
      formFields: [
        { label: 'name', value: '', rules: [v => !!v || 'Name is required'] },
        { label: 'description', value: '', rules: [v => !!v || 'Description is required'] },
      ],
      mockData: [
        { id: 1, name: 'Product 1', description: 'Description 1' },
        { id: 2, name: 'Product 2', description: 'Description 2' },
      ],
    }
  },
}
</script>
