<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  getTeams,
  patchTeamsById,
  postTeam,
  type Team,
  type TeamPatch,
} from '@/generated/web-api';

const editable = true; // Hardcoded for now
const table = useTableStore();

table.setDeletable(false);
table.setFields({
  name: {
    name: 'TEAM',
    type: String,
    creatable: true,
    updatable: false,
  },
  abbr: {
    name: 'ABBR.',
    type: String,
    creatable: true,
    updatable: false,
  },
  city: {
    name: 'CITY',
    type: String,
    creatable: true,
    updatable: false,
  },
  year_founded: {
    name: 'YEAR FOUNDED',
    type: Number,
    creatable: true,
    updatable: false,
  },
  coach: {
    name: 'COACH',
    type: String,
    creatable: true,
    updatable: true,
  },
});
table.setCreate(async (record) => {
  console.log('create', { ...record });
  try {
    return await postTeam({
      requestBody: record as Team,
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
      requestBody: record as TeamPatch,
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
      :table="table"
      title="球隊介紹" />
  </div>
</template>
