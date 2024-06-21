<script setup lang="ts">
import { onMounted } from 'vue';
import TableEditButton from './TableEditButton.vue';
import { useTableStore, type RecordType } from '@/stores/table';

const props = defineProps<{
  deletable: boolean;
  editable: boolean;
  fieldsNew: string[];
  fieldsPatch: string[];
  headers: Record<string, string>;
  createCall: (record: RecordType) => Promise<Response>;
  readCall: (offset: number, length: number) => Promise<Response>;
  updateCall: (record: RecordType) => Promise<Response>;
  deleteCall: (id: number) => Promise<Response>;
}>();

const table = useTableStore();

onMounted(async () => {
  table.setFieldsNew(props.fieldsNew);
  table.setFieldsPatch(props.fieldsPatch);
  table.readRemoteRecords(props.readCall);
});
</script>

<template>
  <div id="table-vue">
    <section
      v-if="editable"
      id="edit-toggles">
      <div class="edit-toggle">
        <TableEditButton
          :mode="'Create'"
          @edit="table.toggleCreateEditMode" />
      </div>
      <div class="edit-toggle">
        <TableEditButton
          :mode="'Delete'"
          :style="{
            filter: !deletable && 'grayscale(1) opacity(0.5)',
          }"
          @edit="deletable && table.toggleDeleteEditMode()" />
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
          v-for="(record, index) of table.getRecords"
          :key="index">
          <td
            v-for="(displayName, schemaName) of headers"
            :key="schemaName">
            <input
              v-if="
                table.getEditModes[index] === 'Save' &&
                table.getRecords[index]!.id === undefined
                  ? table.getFieldsNew.includes(schemaName)
                  : table.getFieldsPatch.includes(schemaName)
              "
              v-model="record[schemaName]"
              type="text" />
            <span v-else>
              {{ record[schemaName] }}
            </span>
          </td>
          <td
            class="edit-button"
            v-if="editable">
            <TableEditButton
              :mode="table.getEditModes[index] ?? 'Update'"
              @edit="
                async () =>
                  table.commitEditRecord(
                    index,
                    createCall,
                    readCall,
                    updateCall,
                    deleteCall,
                  )
              " />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="sass">
#edit-toggles
  display: flex
  font-size: 1.15em
  height: 2.65em
  justify-content: flex-end
  width: 100%

  .edit-toggle
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

  tbody
    tr
      border-block-end: 0.05em solid #dddfe1

      &:nth-child(odd)
        background-color: #f3f3f3

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

    input
      border: 0.05em solid #000000
      font-family: inherit
      font-size: inherit
      font-weight: inherit
      padding: 0.2em
      text-align: center
      width: 75%

  td.edit-button, th.edit-button
    font-size: 75%
    padding: 0
    text-align: left
    user-select: none
    width: 6em
</style>
