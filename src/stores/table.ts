import { checkResponse } from '@/utils/checkResponse';
import { defineStore } from 'pinia';

export interface RecordType {
  [key: string]: unknown;
  id?: number;
}

export interface TableState {
  editModes: ('Create' | 'Delete' | 'Save' | 'Update')[];
  fieldsNew: string[];
  fieldsPatch: string[];
  records: RecordType[];
  redundantRecord?: RecordType;
  offset: number;
  length: number;
}

export const useTableStore = defineStore('table', {
  state: () =>
    <TableState>{
      editModes: [],
      fieldsNew: [],
      fieldsPatch: [],
      records: [],
      redundantRecord: undefined,
      offset: 0,
      length: 4,
    },
  getters: {
    getEditModes(state) {
      return state.editModes;
    },
    getFieldsNew(state) {
      return state.fieldsNew;
    },
    getFieldsPatch(state) {
      return state.fieldsPatch;
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
    setPreviousPage() {
      if (this.offset < this.length) {
        return;
      }
      this.offset -= this.length;
    },
    setNextPage() {
      this.offset += this.length;
    },
    setFieldsNew(fields: string[]) {
      this.fieldsNew = fields;
    },
    setFieldsPatch(fields: string[]) {
      this.fieldsPatch = fields;
    },
    setRecords(records: RecordType[]) {
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async createRemoteRecord(
      call: (record: RecordType) => Promise<Response>,
    ) {
      const record = this.records[0]!;
      const response = await call(record);
      if (!(await checkResponse(response))) {
        return;
      }
      const newRecord: RecordType = await response.json();
      this.records[0] = newRecord;
      this.editModes[0] = 'Update';
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
    async updateRemoteRecord(
      index: number,
      call: (record: RecordType) => Promise<Response>,
    ) {
      const record = this.records[index];
      if (!record) {
        return;
      }
      const filtedRecord: RecordType = { id: record.id };
      for (const field of this.fieldsPatch) {
        const fieldValue = record[field];
        if (fieldValue === undefined) {
          filtedRecord[field] = fieldValue;
        }
      }
      const response = await call(filtedRecord);
      if (!(await checkResponse(response))) {
        return;
      }
      this.editModes[index] = 'Update';
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
        if (record.id === undefined) {
          this.records.splice(index, 1);
          this.editModes.splice(index, 1);
        } else {
          const response = await deleteCall(record.id);
          if (!(await checkResponse(response))) {
            return;
          }
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
    async commitEditRecord(
      index: number,
      createCall: (record: RecordType) => Promise<Response>,
      readCall: (offset: number, length: number) => Promise<Response>,
      updateCall: (record: RecordType) => Promise<Response>,
      deleteCall: (id: number) => Promise<Response>,
    ) {
      const mode = this.editModes[index];
      const record = this.records[index];
      if (mode === 'Delete') {
        console.log('Deleting record:', record);
        await this.deleteRemoteRecord(index, deleteCall, readCall);
      } else if (mode === 'Save') {
        console.log('Saving record:', record);
        if (record?.id === undefined) {
          await this.createRemoteRecord(createCall);
        } else {
          await this.updateRemoteRecord(index, updateCall);
        }
      } else if (mode === 'Update') {
        console.log('Updating record:', record);
        await this.updateRemoteRecord(index, updateCall);
      }
    },
    toggleCreateEditMode() {
      if (this.redundantRecord) {
        console.log('Uncreating record');
        this.editModes.shift();
        this.editModes.unshift('Update');
        this.records.shift();
        this.records.push(this.redundantRecord);
        this.redundantRecord = undefined;
      } else {
        console.log('Creating record');
        this.editModes.pop();
        this.editModes.unshift('Save');
        this.redundantRecord = this.records.pop();
        this.records.unshift(<RecordType>{});
      }
    },
    toggleDeleteEditMode() {
      this.editModes = this.editModes.fill(
        this.editModes.includes('Delete') ? 'Delete' : 'Update',
      );
    },
  },
});
