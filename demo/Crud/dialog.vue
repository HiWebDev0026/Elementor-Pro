<template>
  <pro-crud
    v-model="form"
    :columns="columns"
    :menu="{ label: 'Operations' }"
    :data="data"
    :detail="detail"
    :before-open="beforeOpen"
    :before-close="beforeClose"
    label-width="100px"
    @delete="deleteRow"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  defineCrudColumns,
  defineCrudBeforeOpen,
  defineCrudBeforeClose,
} from 'element-pro-components'

export default defineComponent({
  setup() {
    const form = ref({})
    const detail = ref({})
    const columns = defineCrudColumns([
      {
        label: 'Date',
        prop: 'date',
        component: 'el-input',
        form: true,
        detail: true,
      },
      {
        label: 'Name',
        prop: 'name',
        detail: true,
      },
      {
        label: 'Address',
        prop: 'address',
        detail: true,
      },
    ])
    const data = ref([
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ])

    const beforeOpen = defineCrudBeforeOpen((done, type, row) => {
      ElMessage(`beforeOpen: ${type}`)
      console.log('beforeOpen', type, row)
      if (type === 'edit') {
        form.value = row || {}
      } else if (type === 'detail') {
        detail.value = row || {}
      }
      done()
    })

    const beforeClose = defineCrudBeforeClose((done) => {
      ElMessage('beforeClose')
      console.log('beforeClose')
      done()
    })

    const deleteRow = (row) => {
      ElMessage('deleteRow')
      console.log('deleteRow', row)
    }

    return {
      form,
      columns,
      data,
      detail,
      beforeOpen,
      beforeClose,
      deleteRow,
    }
  },
})
</script>
