<script setup lang="ts">
import { onMounted } from 'vue';
import TableEditButton from './TableEditButton.vue';
import { useTableStore } from '@/stores/table';

const { records } = defineProps<{
  deletable: boolean;
  editable: boolean;
  headers: Record<string, string>;
  records: (Record<string, unknown> & { id: number })[];
}>();

const table = useTableStore();

onMounted(() => {
  table.setRecords(records);
});
</script>

<template>
  <div id="table-vue">
    <section id="edit-switches">
      <div class="edit-switch">
        <TableEditButton
          :mode="'Create'"
          @edit="table.switchCreateRecord" />
      </div>
      <div class="edit-switch">
        <TableEditButton
          :mode="'Delete'"
          @edit="table.switchDeleteRecord" />
      </div>
    </section>
    <table>
      <thead>
        <tr>
          <th
            v-for="(displayName, schemaName) of headers"
            :key="schemaName">
            {{ displayName }}
          </th>
          <th
            class="edit-button"
            v-if="editable"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(record, index) of records"
          :key="record.id">
          <td
            v-for="(value, schemaName) of record"
            :key="schemaName">
            {{ value }}
          </td>
          <td
            class="edit-button"
            v-if="editable">
            <TableEditButton
              :mode="table.getEditModes[index] ?? 'Update'"
              @edit="() => table.editRecord(index, record)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="sass">
#edit-switches
  display: flex
  font-size: 1.15em
  justify-content: flex-end
  width: 100%

  .edit-switch
    padding-inline: 1em
    padding-block-end: 1em
    width: 6em

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

  td.edit-button, th.edit-button
    font-size: 75%
    padding: 0
    text-align: left
    user-select: none
    width: 6em
</style>
