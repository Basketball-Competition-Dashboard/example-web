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
table.setFields({
  id: {
    name: 'ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  name: {
    name: 'TEAM',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  abbr: {
    name: 'ABBR',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  city: {
    name: 'CITY',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  year_founded: {
    name: 'YEAR-FOUNDED',
    type: Number,
    creatable: true,
    updatable: false,
    visible: true,
  },
  coach: {
    name: 'COACH',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
});
table.setCreate(async (record) => {
  try {
    return await postTeam({
      requestBody: {
        name: record.name as string,
        abbr: record.abbr as string,
        city: record.city as string,
        year_founded: record.year_founded as number,
        coach: record.coach as string,
      },
    });
  } catch (error) {
    alert(error);
    return;
  }
});
table.setRead(async (parameters) => {
  try {
    return await getTeams(parameters);
  } catch (error) {
    alert(error);
    return;
  }
});
table.setUpdate(async (record) => {
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
  table.setReadSortField('name');
  table.setReadSortOrder('ascending');
  await table.readRecords();
});
</script>

<template>
  <div id="team-view-vue">
    <Table
      :editable="editable"
      :table="table"
      title="球隊介紹" />
  </div>
</template>
