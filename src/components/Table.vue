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
                  v-model="record[field]"
                  spellcheck="false"
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
    max-height: 17.5em
    overflow: auto
    overscroll-behavior: none
    width: 94%

    $scrollbar-width: 0.3em
    scrollbar-color: unset
    scrollbar-gutter: stable
    scrollbar-width: $scrollbar-width

    &::-webkit-scrollbar
      width: $scrollbar-width

    &::-webkit-scrollbar-track
      background-color: unset
      border-radius: 0.5 * $scrollbar-width

    &::-webkit-scrollbar-thumb
      background-clip: content-box
      -webkit-background-clip: content-box
      background-color: #888888
      border-radius: 0.5 * $scrollbar-width
      border: 0.08rem solid #888888

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
      position: sticky
      top: 0
      left: 0

      th
        border-block: 0.08rem solid #c3c5cb
        color: #464a53
        font-weight: 700
        font-size: 1em
        padding-block: 0.7em

      th:first-child
        border-inline-start: 0.08rem solid #c3c5cb

      th:last-child
        border-inline-end: 0.08rem solid #c3c5cb

    tbody
      tr
        &:nth-child(even)
          background-color: #ffffff

        &:nth-child(odd)
          background-color: #f3f3f3

      td
        border-block-end: 0.08rem solid #dddfe1
        color: #000000
        font-weight: 600
        font-size: 0.9em
        padding-block: 1.1em

        & > *
          padding-block: 0.2em

        input
          border: 0.08rem solid #000000
          border-radius: 0.15em
          caret-color: #4186d7
          font-family: inherit
          font-size: inherit
          font-weight: inherit
          padding-inline: 0.4em
          text-align: center
          width: 90%

          &:focus
            outline: 0.08rem solid #000000

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
