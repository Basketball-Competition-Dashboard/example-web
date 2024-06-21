<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  getTeams,
  patchTeamsById,
  postTeam,
} from '@/generated/web-api';

const editable = true; // Hardcoded for now
const table = useTableStore();

table.setDeletable(false);
table.setFieldsNew(['name', 'abbr', 'city', 'year_founded', 'coach']);
table.setFieldsPatch(['coach']);
table.setCreate(async (record) => {
  console.log('create', { ...record });
  try {
    return await postTeam({
      requestBody: {
        name: record.name as string,
        abbr: record.abbr as string,
        city: record.city as string,
        year_founded: parseInt(record.year_founded as string),
        coach: record.coach as string,
      },
    });
  } catch (error) {
    alert(error);
    return false;
  }
});
table.setRead(async (offset, length) => {
  console.log('read', offset, length);
  try {
    return await getTeams({
      pageLength: length,
      pageOffset: offset,
      sortField: 'name',
      sortOrder: 'ascending',
    });
  } catch (error) {
    alert(error);
    return false;
  }
});
table.setUpdate(async (record) => {
  console.log('update', { ...record });
  try {
    await patchTeamsById({
      id: record.id as number,
      requestBody: {
        coach: record.coach as string,
      },
    });
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
});
onMounted(async () => {
  await table.readRecords();
});
</script>

<template>
  <div id="team-view-vue">
    <Table
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
