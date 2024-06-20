<script setup lang="ts">
import TableEditButton from './TableEditButton.vue';

defineProps<{
  editable: boolean;
  headers: Record<string, string | number>;
  records: Record<string, string | number>[];
}>();
</script>

<template>
  <div id="table-vue">
    <table>
      <thead>
        <tr>
          <th
            v-for="(displayName, schemaName) of headers"
            :key="schemaName">
            {{ displayName }}
          </th>
          <th class="button"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="record in records"
          :key="record.id">
          <td
            v-for="(_, schemaName) of headers"
            :key="schemaName">
            {{ record[schemaName] }}
          </td>
          <td class="button">
            <TableEditButton
              :editable="editable"
              :label="'Delete'"
              @click="(label) => console.log(label, record.id)" />
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
    border: 0.05em solid #c3c5cb

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
      border-block-end: 0.05em solid #dddfe1

      &:nth-child(odd)
        background-color: #f3f3f3

  td.button, th.button
    font-size: 75%
    padding: 0
    text-align: left
    width: 6em
</style>
