<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  deletePlayersByIdProfile,
  getPlayersProfile,
  patchPlayersByIdProfile,
  postPlayerProfile,
} from '@/generated/web-api';

const editable = true; // Hardcoded for now
const table = useTableStore();

table.setDeletable(true);
table.setFields({
  id: {
    name: 'ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  name: {
    name: 'PLAYER',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  team_name: {
    name: 'TEAM',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  position: {
    name: 'POSITION',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  birthdate: {
    name: 'BIRTH',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  height: {
    name: 'HEIGHT',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  weight: {
    name: 'WEIGHT',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  country: {
    name: 'COUNTRY',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
});
table.setCreate(async (record) => {
  try {
    return await postPlayerProfile({
      requestBody: {
        name: record.name as string,
        team_name: record.team_name as string,
        position: record.position as string,
        birthdate: record.birthdate as string,
        height: record.height as string,
        weight: record.weight as number,
        country: record.country as string,
      },
    });
  } catch (error) {
    alert(error);
    return;
  }
});
table.setRead(async (parameters) => {
  try {
    return await getPlayersProfile(parameters);
  } catch (error) {
    alert(error);
    return;
  }
});
table.setUpdate(async (record) => {
  try {
    await patchPlayersByIdProfile({
      id: record.id as number,
      requestBody: {
        name: record.name as string,
        team_name: record.team_name as string,
        position: record.position as string,
        birthdate: record.birthdate as string,
        height: record.height as string,
        weight: record.weight as number,
        country: record.country as string,
      },
    });
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
});
table.setDelete(async (record) => {
  try {
    await deletePlayersByIdProfile({
      id: record.id as number,
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
  <div id="player-profile-view-vue">
    <Table
      :editable="editable"
      :table="table"
      :title="String($route.name)" />
  </div>
</template>
