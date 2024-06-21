import { checkResponse } from '@/utils/checkResponse';
import { defineStore } from 'pinia';

export interface RecordTypeNew {
  [key: string]: unknown;
}

export interface RecordType extends RecordTypeNew {
  id: number;
}

export interface TableState {
  editModes: ('Create' | 'Delete' | 'Save' | 'Update')[];
  fields: string[];
  records: RecordType[];
  redundantRecord?: RecordType;
  offset: number;
  length: number;
}

export const useTableStore = defineStore('table', {
  state: () =>
    <TableState>{
      editModes: [],
      fields: [],
      records: [],
      redundantRecord: undefined,
      offset: 0,
      length: 4,
    },
  getters: {
    getEditModes(state) {
      return state.editModes;
    },
    getFields(state) {
      return state.fields;
    },
    getRecords(state) {
      return state.records;
    },
    getOffset(state) {
      return state.offset;
    },
    getLength(state) {
      return state.length;
    },
  },
  actions: {
    setRecords(records: RecordType[]) {
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async readRemoteRecords(
      call: (offset: number, length: number) => Promise<Response>,
    ) {
      const response = await call(this.offset, this.length);
      if (!(await checkResponse(response))) {
        return;
      }
      const records = await response.json();
      this.setRecords(records);
    },
    async createRemoteRecord(
      call: (record: RecordTypeNew) => Promise<Response>,
    ) {
      const record = this.records[0]!;
      const response = await call(record);
      if (!(await checkResponse(response))) {
        return;
      }
      const newRecord: RecordType = await response.json();
      this.records[0] = newRecord;
      this.commitEditRecord(0);
    },
    async updateRemoteRecord(
      index: number,
      call: (record: RecordType) => Promise<Response>,
    ) {
      const record = this.records[index];
      if (!record) {
        return;
      }
      const filtedRecord: RecordType = { id: record.id };
      for (const field of this.fields) {
        const fieldValue = record[field];
        if (typeof fieldValue !== 'undefined') {
          filtedRecord[field] = fieldValue;
        }
      }
      const response = await call(filtedRecord);
      if (!(await checkResponse(response))) {
        return;
      }
      this.commitEditRecord(index);
    },
    async deleteRemoteRecord(
      index: number,
      deleteCall: (id: number) => Promise<Response>,
      readCall: (offset: number, length: number) => Promise<Response>,
    ) {
      {
        const record = this.records[index];
        if (!record) {
          return;
        }
        const response = await deleteCall(record.id);
        if (!(await checkResponse(response))) {
          return;
        }
      }
      {
        const response = await readCall(this.offset + index, 1);
        if (!(await checkResponse(response))) {
          return;
        }
        const record = await response.json();
        this.records[index] = record;
      }
    },
    async commitEditRecord(index: number) {
      const mode = this.editModes[index];
      const record = this.records[index];
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
    toggleCreateEditMode() {
      if (this.redundantRecord) {
        console.log('Uncreating record');
        this.records.shift();
        this.records.push(this.redundantRecord);
        this.redundantRecord = undefined;
      } else {
        console.log('Creating record');
        this.redundantRecord = this.records.pop();
        this.records.unshift(<RecordType>{});
      }
    },
    toggleDeleteEditMode() {
      this.editModes = this.editModes.fill(
        this.editModes.findIndex((mode) => mode === 'Delete') < 0
          ? 'Delete'
          : 'Update',
      );
    },
  },
});
