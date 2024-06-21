<script setup lang="ts">
import Table from '@/components/table/Table.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTableStore, type TableState } from '@/stores/table';

const route = useRoute();
const tableHeaders = route.meta.tableHeaders as
  | Record<string, string>
  | undefined;
const table = useTableStore();

onMounted(async () => {
  table.setFieldsNew(<string[]>route.meta.tableFieldsNew);
  table.setFieldsPatch(<string[]>route.meta.tableFieldsPatch);
  table.setCreate(<TableState['create']>route.meta.tableCreate);
  table.setRead(<TableState['read']>route.meta.tableRead);
  table.setUpdate(<TableState['update']>route.meta.tableUpdate);
  table.setDelete(<TableState['delete']>route.meta.tableDelete);
  await table.readRemoteRecords();
});
</script>

<template>
  <div class="dashboard-vue">
    <h1 id="title">{{ $route.name }}</h1>
    <section id="center">
      <Table
        v-if="tableHeaders"
        id="table"
        :deletable="true"
        :editable="true"
        :headers="tableHeaders"
        :table="table" />
    </section>
  </div>
</template>

<style scoped lang="sass">
#title
  color: #000000
  font-size: 2.5em
  font-weight: 600
  padding-block-start: 1em
  text-align: center

#center
  display: flex
  flex-direction: column
  align-items: center
  width: 100%

  #table
    width: 94%
</style>
