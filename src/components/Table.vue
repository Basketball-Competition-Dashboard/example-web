<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  headers: {
    type: Array<[string, string]>,
    required: true,
  },
  records: {
    type: Array<Record<string, string>>,
    required: true,
  },
});
</script>

<template>
  <div id="table-vue">
    <table>
      <thead>
        <tr>
          <th
            v-for="[schemaName, displayName] in headers"
            :key="schemaName">
            {{ displayName }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in records"
          :key="record.id">
          <td
            v-for="[schemaName, _] in headers"
            :key="schemaName">
            {{ record[schemaName] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="sass">
table
  border-collapse: collapse
  font-family: "Anek Tamil", sans-serif
  font-size: 1.25em
  table-layout: fixed
  width: 100%

  thead
    border: 1px solid #c3c5cb

  td, th
    padding-inline: 1.0em
    text-align: center
    vertical-align: middle

  th
    color: #464a53
    font-weight: 700
    font-size: 100%
    padding-block: 0.6em

  td
    color: #000000
    font-weight: 600
    font-size: 90%
    padding-block: 1.2em

  tbody
    tr
      border-block-end: 1px solid #dddfe1

      &:nth-child(odd)
        background-color: #f3f3f3
</style>
