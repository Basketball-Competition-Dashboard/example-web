<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { type TableStore } from '@/stores/table';

const props = defineProps<{
  pageLengthEnums: readonly number[];
  table: TableStore;
}>();

async function selectPageLength({ target }: Event) {
  if (!(target instanceof HTMLSelectElement)) {
    return;
  }
  const pageLength = parseInt(target.value);
  props.table.setReadPageLength(pageLength);
  await props.table.readRecords();
}
async function movePageOffsetBy(direction: 1 | -1) {
  const delta = direction * props.table.getReadPageLength;
  const offset = props.table.getReadPageOffset + delta;
  if (offset < 0) {
    return;
  }
  props.table.setReadPageOffset(offset);
  if (!(await props.table.readRecords())) {
    props.table.setReadPageOffset(offset - delta);
  }
}
</script>

<template>
  <div id="table-paginator-vue">
    <section class="horizontal">
      <section id="page-length">
        <span>Records per page:</span>
        <select
          :value="table.getReadPageLength"
          @change="selectPageLength">
          <option
            v-for="pageLength of pageLengthEnums"
            :key="pageLength"
            :value="pageLength">
            {{ pageLength }}
          </option>
        </select>
        <Icon icon="akar-icons:chevron-down-small" />
      </section>
      <section id="page-number">
        <button
          id="page-number-dec"
          @click="movePageOffsetBy(-1)">
          <Icon icon="akar-icons:chevron-left-small" />
        </button>
        <span>
          Page
          {{
            1 +
            Math.floor(
              table.getReadPageOffset / table.getReadPageLength,
            )
          }}
        </span>
        <button
          id="page-number-inc"
          @click="movePageOffsetBy(+1)">
          <Icon icon="akar-icons:chevron-right-small" />
        </button>
      </section>
    </section>
  </div>
</template>

<style scoped lang="sass">
.horizontal
  color: #687182
  display: flex
  padding-inline: 0.6em

  & > *
    padding: 0.6em

  #page-length
    align-items: center
    display: flex
    gap: 0.25em

    select
      appearance: none
      background: none
      border: none
      color: inherit
      cursor: pointer

      option
        color: black

      &:focus
        outline: none

  #page-number
    align-items: center
    display: flex
    gap: 0.6em

    button
      background-color: #ffffff
      border: 0.08em solid rgba(70, 79, 96, 24%)
      border-radius: 0.35em
      cursor: pointer
      display: flex
      padding-block: 0.125em
      padding-inline: 0.25em

  svg.iconify
    color: #868fa0
</style>
