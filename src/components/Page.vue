<script setup lang="ts">

const props = defineProps<{
  dataNumber: number;
  rowNumber: number;
}>();
console.log(props)

</script>

<template>
  <div>
    <div :class="tablePagination">
      <div :class="numberOfDataWrapper">
        <div :class="['numberOfData', 'item']">1-{{ props.rowNumber }} of {{ props.dataNumber }}</div>
      </div>
      <div :class="tablePaginationInner">
        <div :class="frameWrapper">
          <div :class="rowsPerPageParent">
            <div :class="['rowsPerPage',  'item']">Rows per page:</div>
            <div :class="frameContainer">
              <div :class="frameParent">
                <div :class="wrapper">
                  <div :class="['rowNumber',  'item']">{{ props.rowNumber }}</div>
                </div>
                <img :class="['downIcon', 'item']" alt="Down Arrow Icon" src="@/assets/down.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="tablePaginationChild">
        <div :class="buttonParent">
          <div :class="button">
            <img :class="['leftIcon' , 'item']" loading="lazy" alt="Left Arrow Icon" src="@/assets/left.svg" />
          </div>
          <div :class="['pageCount', 'item']">
            <span>1</span>
            <span :class="span">/10</span>
          </div>
          <div :class="button1">
            <div :class="button2">
              <img :class="['rightIcon', 'item']" loading="lazy" alt="Right Arrow Icon" src="@/assets/right.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.tablePagination
    display: flex
    width: 100%
    justify-content: space-between
    align-items: center
    padding-bottom: 1rem

.item
    flex-basis: 15%
    margin: 10px

</style>
