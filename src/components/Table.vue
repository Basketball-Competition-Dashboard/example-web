<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type TableStore } from '@/stores/table';
import ViewTitle from './ViewTitle.vue';
import TablePaginator from './TablePaginator.vue';
import TableEditButton from './TableEditButton.vue';

const props = defineProps<{
  editable: boolean;
  table: TableStore;
}>();

const pageLengthEnums = [5, 10, 25] as const;

props.table.setReadPageOffset(0);
props.table.setReadPageLength(pageLengthEnums[1]);
</script>

<template>
  <div class="table-vue">
    <section class="top">
      <ViewTitle />
      <section class="edit-buttons">
        <aside v-if="editable">
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
        </aside>
      </section>
    </section>
    <section class="center">
      <div class="table-overflow">
        <table>
          <thead>
            <tr>
              <th
                v-for="({ name }, field) of table.getVisibleFields"
                :key="field"
                :id="field">
                <div>
                  {{ name }}
                  <Icon
                    :icon="
                      field === table.getReadSortField
                        ? table.getReadSortOrder === 'ascending'
                          ? 'akar-icons:chevron-up'
                          : 'akar-icons:chevron-down'
                        : 'akar-icons:drag-horizontal'
                    "
                    @click="
                      table.setReadSortOrder(
                        field === table.getReadSortField &&
                          table.getReadSortOrder === 'descending'
                          ? 'ascending'
                          : 'descending',
                      );
                      table.setReadSortField(field);
                      table.readRecords();
                    " />
                </div>
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
                  v-if="editable && table.isFieldEditable(index, field)"
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
    <section class="bottom">
      <aside class="paginator">
        <TablePaginator
          :page-length-enums="pageLengthEnums"
          :table="table" />
      </aside>
    </section>
  </div>
</template>

<style scoped lang="sass">
.table-vue
  align-items: center
  display: flex
  flex-direction: column
  height: 100%
  width: 100%

.top
  padding-block-end: 1em
  width: 94%

  .edit-buttons
    min-height: 1em

    aside
      display: flex
      justify-content: flex-end

      .edit-button
        padding-inline: 0.8em
        font-size: 1.15em

        &.disabled
          cursor: not-allowed
          filter: grayscale(1) opacity(0.5)

.center
  width: 94%

  .table-overflow
    border-block-end: 0.08rem solid #f4f7fc
    display: block
    height: calc(93.5vh - 23.5em)
    overflow-y: auto
    overscroll-behavior-y: contain

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
    height: 100%
    hyphens: auto
    table-layout: fixed
    text-indent: 0
    word-break: break-word
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

        &:first-child
          border-inline-start: 0.08rem solid #c3c5cb

        &:last-child
          border-inline-end: 0.08rem solid #c3c5cb

        div
          align-items: center
          display: flex
          flex-direction: column
          font-weight: inherit
          justify-content: flex-start

          svg.iconify
            cursor: pointer
            font-size: 0.8em
            user-select: none
            -webkit-user-select: none

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
      user-select: none
      -webkit-user-select: none
      vertical-align: middle

      &.edit-button
        font-size: 0.75em
        padding-block: 1.35em
        text-align: left
        width: 6.4em

      div, span
        user-select: auto
        -webkit-user-select: auto

        &.edit-button
          user-select: none
          -webkit-user-select: none

.bottom
  padding-block-start: 2.2em
  width: 94%

  .paginator
    background-color: #f4f7fc
    display: flex
    font-size: 1.1em
    justify-content: flex-end
    min-height: 1em
    width: 100%
</style>
