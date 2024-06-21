<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useRoute } from 'vue-router';
import type { RecordType } from '@/stores/table';

const route = useRoute();
const tableHeaders = route.meta.tableHeaders as
  | Record<string, string>
  | undefined;
const tableFieldsNew = route.meta.tableFieldsNew as string[];
const tableFieldsPatch = route.meta.tableFieldsPatch as string[];
const createCall = route.meta.createCall as (
  record: RecordType,
) => Promise<Response>;
const readCall = route.meta.readCall as (
  offset: number,
  length: number,
) => Promise<Response>;
const updateCall = route.meta.updateCall as (
  record: RecordType,
) => Promise<Response>;
const deleteCall = route.meta.deleteCall as (
  id: number,
) => Promise<Response>;
</script>

<template>
  <div class="main-vue">
    <h1 id="title">{{ $route.name }}</h1>
    <section id="center">
      <Table
        v-if="tableHeaders"
        id="table"
        :deletable="true"
        :editable="true"
        :fieldsNew="tableFieldsNew"
        :fieldsPatch="tableFieldsPatch"
        :headers="tableHeaders"
        :createCall="createCall"
        :readCall="readCall"
        :updateCall="updateCall"
        :deleteCall="deleteCall" />
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
