<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore, type RecordType } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  getGames,
  patchGamesByIdTeamsByTeamId,
  postGame,
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
  home_id: {
    name: 'HOME_ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  away_id: {
    name: 'AWAY_ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  date: {
    name: 'DATE',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  home_name: {
    name: 'HOME',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  away_name: {
    name: 'AWAY',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
  home_score: {
    name: 'HOME SCORE',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  away_score: {
    name: 'AWAY SCORE',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  winner: {
    name: 'WINNER',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
});
table.setCreate(async (record) => {
  try {
    return await postGame({
      requestBody: {
        date: record.date as string,
        home_name: record.home_name as string,
        away_name: record.away_name as string,
        home_score: record.home_score as number,
        away_score: record.away_score as number,
        is_home_winner:
          record.winner === undefined ||
          (record.winner !== record.home_name &&
            record.winner !== record.away_name)
            ? undefined
            : record.winner === record.home_name,
      },
    });
  } catch (error) {
    alert(error);
    return;
  }
});
table.setRead(async (offset, length) => {
  try {
    return (
      await getGames({
        pageLength: length,
        pageOffset: offset,
        sortField: 'date',
        sortOrder: 'ascending',
      })
    ).map((record: RecordType) => {
      if (record.is_home_winner !== undefined) {
        record.winner = record.is_home_winner
          ? record.home_name
          : record.away_name;
      }
      return record;
    });
  } catch (error) {
    alert(error);
    return;
  }
});
table.setUpdate(async (record) => {
  try {
    await patchGamesByIdTeamsByTeamId({
      id: record.id as number,
      teamId: record.home_id as number,
      requestBody: {
        score: record.home_score as number,
        is_winner:
          record.winner === undefined
            ? undefined
            : record.home_name === record.winner,
      },
    });
    await patchGamesByIdTeamsByTeamId({
      id: record.id as number,
      teamId: record.away_id as number,
      requestBody: {
        score: record.away_score as number,
        is_winner:
          record.winner === undefined
            ? undefined
            : record.away_name === record.winner,
      },
    });
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
});
onMounted(async () => {
  await table.editOffsetAndLength(0, 3);
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
