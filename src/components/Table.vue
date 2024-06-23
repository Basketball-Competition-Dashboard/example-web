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
      <div class="table-overflow">
        <table>
          <thead>
            <tr>
              <th
                v-for="({ name }, field) of table.getVisibleFields"
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
                v-for="(_, field) of table.getVisibleFields"
                :key="field"
                :id="field">
                <input
                  v-if="
                    editable && table.isFieldEditable(index, field)
                  "
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
      </div>
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

  .table-overflow
    display: block
    height: 20vh
    overflow: auto
    overscroll-behavior: none
    width: 94%

  table
    border-collapse: separate
    border-color: inherit
    border-spacing: 0
    font-family: "Anek Tamil", sans-serif
    font-size: 1.25em
    table-layout: fixed
    text-indent: 0
    width: 100%

    thead
      background-color: #ffffff
      border-inline: 1px solid #c3c5cb
      position: sticky
      top: 0
      left: 0

      th
        border-block: 1px solid #c3c5cb
        color: #464a53
        font-weight: 700
        font-size: 1em
        padding-block: 0.6em

      th:first-child
        border-inline-start: 1px solid #c3c5cb

      th:last-child
        border-inline-end: 1px solid #c3c5cb

    tbody
      tr
        &:nth-child(even)
          background-color: #ffffff

        &:nth-child(odd)
          background-color: #f3f3f3

      td
        border-block-end: 1px solid #dddfe1
        color: #000000
        font-weight: 600
        font-size: 0.9em
        padding-block: 1.2em

        input
          border: 1px solid #000000
          border-radius: 0.15em
          caret-color: #4186d7
          font-family: inherit
          font-size: inherit
          font-weight: inherit
          padding-block: 0.2em
          padding-inline: 0.3em
          text-align: center
          width: 90%

          &:focus
            outline: 2px solid #000000

          &::selection
            background-color: #96bce9

    td, th
      padding-inline: 1em
      text-align: center
      vertical-align: middle

      &.edit-button
        font-size: 0.75em
        padding-block: 1.44em
        text-align: left
        width: 6.75em

::selection
  background-color: #d9d9d9

.edit-button
  user-select: none
  -webkit-user-select: none
</style>
