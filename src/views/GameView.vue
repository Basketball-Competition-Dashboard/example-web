<script setup lang="ts">
import { onMounted } from 'vue';
import { useTableStore, type RecordType } from '@/stores/table';
import Table from '@/components/Table.vue';
import {
  getGames,
  patchGamesByIdTeamsByTeamId,
  postGame,
} from '@/generated/web-api';
import { Alert } from '@/functions/alert';
import { Toast } from '@/functions/toast';
import { useAuthSessionStore } from '@/stores/authSession';

const authSession = useAuthSessionStore();
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
    name: 'HOME-ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  away_id: {
    name: 'AWAY-ID',
    type: Number,
    creatable: false,
    updatable: false,
    visible: false,
  },
  date: {
    name: 'DATE',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  home_name: {
    name: 'HOME',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  away_name: {
    name: 'AWAY',
    type: String,
    creatable: true,
    updatable: false,
    visible: true,
  },
  home_score: {
    name: 'HOME-SCORE',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  away_score: {
    name: 'AWAY-SCORE',
    type: Number,
    creatable: true,
    updatable: true,
    visible: true,
  },
  is_home_winner: {
    // The field key name is compliant with the API Spec
    name: 'WINNER',
    type: String,
    creatable: true,
    updatable: true,
    visible: true,
  },
});
table.setCreate(async (record) => {
  try {
    let response: RecordType = await postGame({
      requestBody: {
        date: record.date as string,
        home_name: record.home_name as string,
        away_name: record.away_name as string,
        home_score: record.home_score as number,
        away_score: record.away_score as number,
        is_home_winner:
          record.is_home_winner === undefined ||
          (record.is_home_winner !== record.home_name &&
            record.is_home_winner !== record.away_name)
            ? undefined
            : record.is_home_winner === record.home_name,
      },
    });
    response = formatIsHomeWinner(response);
    Toast.showSuccess('Create');
    return response;
  } catch (error) {
    Toast.showFailure('Create', error);
    return;
  }
});
table.setRead(async (parameters) => {
  try {
    return (await getGames(parameters)).map(formatIsHomeWinner);
  } catch (error) {
    Alert.showFailure('Read', error);
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
          record.is_home_winner === undefined
            ? undefined
            : record.home_name === record.is_home_winner,
      },
    });
    await patchGamesByIdTeamsByTeamId({
      id: record.id as number,
      teamId: record.away_id as number,
      requestBody: {
        score: record.away_score as number,
        is_winner:
          record.is_home_winner === undefined
            ? undefined
            : record.away_name === record.is_home_winner,
      },
    });
    Toast.showSuccess('Update');
    return true;
  } catch (error) {
    Toast.showFailure('Update', error);
    return false;
  }
});

onMounted(async () => {
  table.setReadSortField('date');
  table.setReadSortOrder('descending');
  await table.readRecords();
});

function formatIsHomeWinner(record: RecordType): RecordType {
  return {
    ...record,
    is_home_winner:
      record.is_home_winner === undefined
        ? undefined
        : record.is_home_winner
          ? record.home_name
          : record.away_name,
  };
}
</script>

<template>
  <Table
    id="team-view-vue"
    :editable="authSession.exists"
    :table="table" />
</template>
