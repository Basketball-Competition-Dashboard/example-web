<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import Table from '@/components/Table.vue';

const editable = true; // fake store
const table = useTableStore();

table.setFieldsNew(['name', 'abbr', 'city', 'year_founded', 'coach']);
table.setFieldsPatch(['coach']);
table.setCreate(async (record) => {
  console.log('create', record);
  return false;
});
table.setRead(async (offset, length) => {
  console.log('read', offset, length);
  return [];
});
table.setUpdate(async (record) => {
  console.log('update', record);
  return false;
});
table.setDelete(async (id) => {
  console.log('delete', id);
  return false;
});
onMounted(async () => {
  await table.readRemoteRecords();
});
</script>

<template>
  <div id="team-view-vue">
    <!-- TODO: Should be non-deletable -->
    <Table
      v-if="editable"
      :deletable="true"
      :editable="editable"
      :headers="{
        name: 'TEAM',
        abbr: 'ABBR.',
        city: 'CITY',
        year_founded: 'YEAR FOUNDED',
        coach: 'COACH',
      }"
      :table="table"
      title="球隊介紹" />
  </div>
</template>
