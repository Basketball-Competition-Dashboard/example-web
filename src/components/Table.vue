<script setup lang="ts">
import TableEditButton from './TableEditButton.vue';
import { type TableStore } from '@/stores/table';

defineProps<{
  editable: boolean;
  table: TableStore;
  title: string;
}>();
</script>

<template>
  <div id="table-vue">
    <section class="top">
      <h1 id="title">{{ title }}</h1>
      <aside>
        <section
          class="edit-buttons"
          v-if="editable">
          <div
            class="edit-button"
            id="create">
            <TableEditButton
              mode="Create"
              @click="table.createEmptyRecord" />
          </div>
          <div
            class="edit-button"
            id="delete"
            :class="{ disabled: !table.getDeletable }">
            <TableEditButton
              mode="Delete"
              @click="table.toggleDeleteMode" />
          </div>
        </section>
      </aside>
    </section>
    <section class="bottom">
      <table>
        <thead>
          <tr>
            <th
              v-for="({ name, visible }, field) of table.getFields"
              v-show="visible"
              :key="field"
              :id="field">
              {{ name }}
            </th>
            <th
              class="edit-button"
              v-if="editable"></th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(record, index) of table.getRecords"
            :key="index"
            :id="`${index}`">
            <td
              v-for="({ visible }, field) of table.getFields"
              v-show="visible"
              :key="field"
              :id="field">
              <input
                v-if="editable && table.isFieldEditable(index, field)"
                spellcheck="false"
                v-model="record[field]"
                type="text" />
              <span v-else>
                {{ record[field] }}
              </span>
            </td>
            <td
              class="edit-button"
              v-if="editable">
              <TableEditButton
                :mode="table.getEditModes[index] ?? 'Update'"
                @click="table.editRecord(index)" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped lang="sass">
.top
  align-items: center
  display: flex
  flex-direction: column
  padding-block: 1em

  #title
    color: #000000
    font-size: 2.5em
    font-weight: 600
    padding-block-start: 0.4em
    text-align: center

  aside
    min-height: 1em
    width: 94%

    .edit-buttons
      display: flex
      justify-content: flex-end

      .edit-button
        padding-inline: 0.8em
        font-size: 1.15em

        &.disabled
          cursor: not-allowed
          filter: grayscale(1) opacity(0.5)

.bottom
  align-items: center
  display: flex
  flex-direction: column

  table
    border-collapse: collapse
    font-family: "Anek Tamil", sans-serif
    font-size: 1.25em
    table-layout: fixed
    width: 94%

    thead
      border: 0.05em solid #c3c5cb

    tbody
      tr
        border-block-end: 0.05em solid #dddfe1

        &:nth-child(even)
          background-color: #ffffff

        &:nth-child(odd)
          background-color: #f3f3f3

    td, th
      padding-inline: 1em
      text-align: center
      vertical-align: middle

      &.edit-button
        font-size: 0.75em
        padding-block: 1.44em
        text-align: left
        width: 6.25em

    th
      color: #464a53
      font-weight: 700
      font-size: 1em
      padding-block: 0.6em

    td
      color: #000000
      font-weight: 600
      font-size: 0.9em
      padding-block: 1.2em

      input
        border: 0.05em solid #000000
        border-radius: 0.15em
        caret-color: #4186d7
        font-family: inherit
        font-size: inherit
        font-weight: inherit
        padding: 0.3em
        text-align: center
        width: 80%

        &:focus
          outline: 0.10em solid #000000

        &::selection
          background-color: #96bce9

::selection
  background-color: #d9d9d9

.edit-button
  user-select: none
  -webkit-user-select: none
</style>
