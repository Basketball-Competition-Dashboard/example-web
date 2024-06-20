import { defineStore } from 'pinia';

interface RecordType {
  [key: string]: unknown;
  id: number;
}

interface TableState {
  editModes: ('Create' | 'Delete' | 'Save' | 'Update')[];
  records: RecordType[];
}

export const useTableStore = defineStore('table', {
  state: () =>
    <TableState>{
      editModes: [],
      records: [],
    },
  getters: {
    getEditModes(state) {
      return state.editModes;
    },
    getRecords(state) {
      return state.records;
    },
  },
  actions: {
    switchCreateRecord() {
      console.log('Creating record');
    },
    switchDeleteRecord() {
      console.log('Deleting record');
      this.editModes = this.editModes.fill(
        this.editModes.findIndex((mode) => mode === 'Delete') < 0
          ? 'Delete'
          : 'Update',
      );
    },
    editRecord(index: number, record: RecordType) {
      const mode = this.editModes[index];
      if (mode === 'Delete') {
        console.log('Deleting record:', record);
        return;
      }
      if (mode === 'Save') {
        console.log('Saving record:', record);
        this.editModes[index] = 'Update';
        return;
      }
      if (mode === 'Update') {
        console.log('Updating record:', record);
        this.editModes[index] = 'Save';
        return;
      }
    },
    setRecords(records: RecordType[]) {
      this.records = records;
      this.editModes = new Array(records.length).fill('Update');
    },
  },
});
