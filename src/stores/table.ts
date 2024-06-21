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
  create: (record: RecordType) => Promise<RecordType | false>;
  read: (offset: number, length: number) => Promise<RecordType[] | false>;
  update: (record: RecordType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
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
      create: () => Promise.reject('table.create is not implemented'),
      read: () => Promise.reject('table.read is not implemented'),
      update: () => Promise.reject('table.update is not implemented'),
      delete: () => Promise.reject('table.delete is not implemented'),
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
    setFieldsNew(fields: TableState['fieldsNew']) {
      this.fieldsNew = fields;
    },
    setFieldsPatch(fields: TableState['fieldsPatch']) {
      this.fieldsPatch = fields;
    },
    setCreate(create: TableState['create']) {
      this.create = create;
    },
    setRead(read: TableState['read']) {
      this.read = read;
    },
    setUpdate(update: TableState['update']) {
      this.update = update;
    },
    setDelete(delele: TableState['delete']) {
      this.delete = delele;
    },
    async createRemoteRecord() {
      const newRecord = this.records[0];
      if (!newRecord) {
        return;
      }
      const record = await this.create(newRecord);
      if (!record) {
        return;
      }
      this.records[0] = record;
      this.editModes[0] = 'Update';
    },
    async readRemoteRecords() {
      const records = await this.read(this.offset, this.length);
      if (!records) {
        return;
      }
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async updateRemoteRecord(index: number) {
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
      const isUpdated = await this.update(filtedRecord);
      if (!isUpdated) {
        return;
      }
      this.editModes[index] = 'Update';
    },
    async deleteRemoteRecord(index: number) {
      {
        const record = this.records[index];
        if (!record) {
          return;
        }
        if (record.id === undefined) {
          this.records.splice(index, 1);
        } else {
          const isDeleted = await this.delete(record.id);
          if (!isDeleted) {
            return;
          }
        }
      }
      {
        const record = await this.read(this.offset + this.length - 1, 1);
        if (!record || record[0] === undefined) {
          return;
        }
        this.records.push(record[0]);
      }
    },
    async editRecord(index: number) {
      const mode = this.editModes[index];
      const record = this.records[index];
      if (!mode || !record) {
        return;
      }
      if (mode === 'Delete') {
        console.log('Deleting record:', record);
        await this.deleteRemoteRecord(index);
      } else if (mode === 'Save') {
        console.log('Saving record:', record);
        if (record.id === undefined) {
          await this.createRemoteRecord();
        } else {
          await this.updateRemoteRecord(index);
        }
      } else if (mode === 'Update') {
        console.log('Updating record:', record);
        await this.updateRemoteRecord(index);
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
    goPreviousPage() {
      if (this.offset < this.length) {
        return;
      }
      this.offset -= this.length;
    },
    goNextPage() {
      this.offset += this.length;
    },
  },
});
