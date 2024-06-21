import { checkResponse } from '@/utils/checkResponse';
import { defineStore } from 'pinia';

export interface RecordType {
  [key: string]: unknown;
  id?: number;
}

export interface TableState {
  editModes: ('Create' | 'Delete' | 'Save' | 'Update')[];
  editModesToSwap: ('Create' | 'Delete' | 'Save' | 'Update')[];
  fieldsNew: string[];
  fieldsPatch: string[];
  records: RecordType[];
  offset: number;
  length: number;
  create: (record: RecordType) => Promise<RecordType | false>;
  read: (
    offset: number,
    length: number,
  ) => Promise<RecordType[] | false>;
  update: (record: RecordType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
}

export type TableStore = ReturnType<typeof useTableStore>;

export const useTableStore = defineStore('table', {
  state: () =>
    <TableState>{
      editModes: [],
      editModesToSwap: [],
      fieldsNew: [],
      fieldsPatch: [],
      records: [],
      recordToSwap: undefined,
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
    async createRecord(index: number) {
      const newRecord = this.records[index];
      if (!newRecord) {
        throw new RangeError('Invalid index');
      }
      const record = await this.create(newRecord);
      if (!record) {
        return;
      }
      this.editModes[index] = 'Update';
      this.records[index] = record;
    },
    async readRecords() {
      const records = await this.read(this.offset, this.length);
      if (!records) {
        return;
      }
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async updateRecord(index: number) {
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      const recordPatch: RecordType = { id: record.id };
      for (const field of this.fieldsPatch) {
        const fieldValue = record[field];
        if (fieldValue !== undefined) {
          recordPatch[field] = fieldValue;
        }
      }
      const isUpdated = await this.update(recordPatch);
      if (!isUpdated) {
        return;
      }
      this.editModes[index] = 'Update';
    },
    async deleteRecord(index: number) {
      {
        const record = this.records[index];
        if (!record) {
          throw new RangeError('Invalid index');
        }
        if (record.id !== undefined) {
          const isDeleted = await this.delete(record.id);
          if (!isDeleted) {
            return;
          }
        }
        this.records.splice(index, 1);
      }
      {
        const remoteIndex = this.offset + this.length - 1;
        const records = await this.read(remoteIndex, 1);
        if (!records || records[0] === undefined) {
          return;
        }
        this.records.push(records[0]);
      }
    },
    async editRecord(index: number) {
      const mode = this.editModes[index];
      const record = this.records[index];
      if (!mode || !record) {
        throw new RangeError('Invalid index');
      }
      if (mode === 'Delete') {
        console.log('Deleting record:', record);
        await this.deleteRecord(index);
      } else if (mode === 'Save') {
        if (record.id === undefined) {
          console.log('Creating record:', record);
          await this.createRecord(index);
        } else {
          console.log('Updating record:', record);
          await this.updateRecord(index);
        }
      }
    },
    createEmptyRecord(): void {
      if (this.isDeleteMode()) {
        return;
      }
      console.log('Creating empty record');
      this.editModes.unshift('Save');
      this.records.unshift({});
      if (this.records.length > this.length) {
        console.log('Removing last record');
        this.records.pop();
        this.editModes.pop();
      }
    },
    isDeleteMode(): boolean {
      return this.editModes.includes('Delete');
    },
    isFieldEditable(index: number, field: string): boolean {
      if (this.isRecordEditable(index)) {
        const record = this.records[index]!;
        const fields =
          record.id === undefined ? this.fieldsNew : this.fieldsPatch;
        return fields.includes(field);
      }
      return false;
    },
    isRecordEditable(index: number): boolean {
      const mode = this.editModes[index];
      const record = this.records[index];
      if (!mode || !record) {
        throw new RangeError('Invalid index');
      }
      return mode === 'Save';
    },
    toggleDeleteMode(): void {
      if (!this.isDeleteMode()) {
        console.log('Entering delete mode');
        this.editModesToSwap = this.editModes.slice();
        this.editModes.fill('Delete');
      } else {
        console.log('Exiting delete mode');
        this.editModes = this.editModesToSwap.slice();
      }
    },
  },
});
