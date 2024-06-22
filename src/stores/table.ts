import { defineStore } from 'pinia';

export type EditMode = 'Create' | 'Delete' | 'Save' | 'Update';

export interface RecordType {
  [key: string]: unknown;
  id?: number;
}

export interface TableState {
  deletable: boolean;
  editModes: EditMode[];
  editModesToSwap: EditMode[];
  fields: Record<
    string,
    {
      creatable: boolean;
      name: string;
      type: Function;
      updatable: boolean;
    }
  >;
  records: RecordType[];
  offset: number; // hardcoded for now
  length: number; // hardcoded for now
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
      deletable: false,
      editModes: [],
      editModesToSwap: [],
      fields: {},
      records: [],
      offset: 0,
      length: 4,
      create: () => Promise.reject('table.create is not implemented'),
      read: () => Promise.reject('table.read is not implemented'),
      update: () => Promise.reject('table.update is not implemented'),
      delete: () => Promise.reject('table.delete is not implemented'),
    },
  getters: {
    getDeletable(state) {
      return state.deletable;
    },
    getEditModes(state) {
      return state.editModes;
    },
    getFields(state) {
      return state.fields;
    },
    getRecords(state) {
      return state.records;
    },
  },
  actions: {
    setDeletable(deletable: TableState['deletable']) {
      this.deletable = deletable;
    },
    setFields(fields: TableState['fields']) {
      this.fields = fields;
    },
    /**
     * The fields of record are type-coerced and filtered before calling `create`.
     */
    setCreate(create: TableState['create']) {
      this.create = create;
    },
    setRead(read: TableState['read']) {
      this.read = read;
    },
    /**
     * The fields of record are type-coerced and filtered before calling `update`.
     */
    setUpdate(update: TableState['update']) {
      this.update = update;
    },
    /**
     * The id of record is type-coerced before calling `delete`.
     */
    setDelete(delele: TableState['delete']) {
      this.delete = delele;
    },
    async createRecord(index: number) {
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      let recordNew = this.coerceRecordType(record);
      recordNew = this.filterRecordFields(recordNew, { creatable: true });
      let recordCreated = await this.create(recordNew);
      if (!recordCreated) {
        return;
      }
      recordCreated = this.coerceRecordType(recordCreated);
      this.editModes[index] = 'Update';
      this.records[index] = recordCreated;
    },
    async readRecords() {
      const records = await this.read(this.offset, this.length);
      if (!records) {
        return;
      }
      for (const [index, record] of records.entries()) {
        if (record.id === undefined) {
          throw new Error(`records[${index}] is missing id`);
        }
        records[index] = this.coerceRecordType(record);
      }
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async updateRecord(index: number) {
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      let recordPatch = this.coerceRecordType(record);
      recordPatch = this.filterRecordFields(recordPatch, { updatable: true });
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
        record.id = parseInt(`${record.id}`);
        if (!Number.isNaN(record.id)) {
          const isDeleted = await this.delete(record.id);
          if (!isDeleted) {
            return;
          }
        }
        this.records.splice(index, 1);
      }
      {
        const lastOffset = this.offset + this.length - 1;
        const records = await this.read(lastOffset, 1);
        if (!records || records[0] === undefined) {
          return;
        }
        const lastRecord = this.coerceRecordType(records[0]);
        this.records.push(lastRecord);
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
      } else if (mode === 'Update') {
        console.log('Editing record:', record);
        this.editModes[index] = 'Save';
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
    coerceRecordType(record: RecordType): RecordType {
      const recordEnsured: RecordType = { id: record.id };
      for (const [field, { type }] of Object.entries(this.fields)) {
        const value = record[field];
        if (value !== undefined) {
          recordEnsured[field] = type(value);
        }
      }
      return recordEnsured;
    },
    filterRecordFields(
      record: RecordType,
      mask: {
        [key in 'creatable' | 'updatable']?: boolean;
      },
    ): RecordType {
      const recordFiltered: RecordType = { id: record.id };
      for (const [field, descriptor] of Object.entries(this.fields)) {
        for (const [key, condition] of Object.entries(mask)) {
          if (condition && descriptor[key as 'creatable' | 'updatable']) {
            recordFiltered[field] = record[field];
          }
        }
      }
      return recordFiltered;
    },
    isDeleteMode(): boolean {
      return this.editModes.includes('Delete');
    },
    isFieldEditable(index: number, field: string): boolean {
      if (this.isRecordEditable(index)) {
        const record = this.records[index]!;
        return Boolean(
          this.fields[field]?.[
            record.id === undefined ? 'creatable' : 'updatable'
          ],
        );
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
      if (!this.deletable) {
        return;
      }
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
