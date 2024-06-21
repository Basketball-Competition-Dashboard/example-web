<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import Table from '@/components/Table.vue';
import { getTeams, postTeam } from '@/generated/web-api';

const editable = true; // fake store
const table = useTableStore();

table.setFieldsNew(['name', 'abbr', 'city', 'year_founded', 'coach']);
table.setFieldsPatch(['coach']);
table.setCreate(async (record) => {
  console.log('create', { ...record });
  const response = await postTeam({
    requestBody: {
      name: record.name as string,
      abbr: record.abbr as string,
      city: record.city as string,
      year_founded: parseInt(record.year_founded as string),
      coach: record.coach as string,
    },
  }).catch(alert);

  if (response) {
    return response;
  } else {
    return false;
  }
});
table.setRead(async (offset, length) => {
  console.log('read', offset, length);
  const response = await getTeams({
    pageLength: length,
    pageOffset: offset,
    sortField: 'name',
    sortOrder: 'ascending',
  }).catch(alert);

  if (response) {
    return response;
  } else {
    return false;
  }
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
  await table.readRecords();
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
