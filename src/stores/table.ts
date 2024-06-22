import { defineStore } from 'pinia';

const isNewRecord = Symbol('isNewRecord');

/**
 * A record is a map of fields.
 */
export interface RecordType {
  [key: string]: unknown;
  [isNewRecord]?: true;
}

export type EditMode = 'Create' | 'Delete' | 'Save' | 'Update';

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
      visible: boolean;
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
  delete: (record: RecordType) => Promise<boolean>;
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
     * The fields of record are type-coerced before and after calling `create`.
     */
    setCreate(create: TableState['create']) {
      this.create = create;
    },
    /**
     * The fields of record are type-coerced after calling `read`.
     */
    setRead(read: TableState['read']) {
      this.read = read;
    },
    /**
     * The fields of record are type-coerced before calling `update`.
     */
    setUpdate(update: TableState['update']) {
      this.update = update;
    },
    /**
     * The fields of record are type-coerced before calling `delete`.
     */
    setDelete(delele: TableState['delete']) {
      this.delete = delele;
    },
    async createRecord(index: number) {
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      const recordNew = this.coerceRecordType(record);
      let recordCreated = await this.create(recordNew);
      if (!recordCreated) {
        return;
      }
      recordCreated = this.coerceRecordType(recordCreated);
      this.editModes[index] = 'Update';
      this.records[index] = recordCreated;
    },
    async readRecords() {
      let records = await this.read(this.offset, this.length);
      if (!records) {
        return;
      }
      records = records.map(this.coerceRecordType);
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
    },
    async updateRecord(index: number) {
      let record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      record = this.coerceRecordType(record);
      const isUpdated = await this.update(record);
      if (!isUpdated) {
        return;
      }
      this.editModes[index] = 'Update';
    },
    async deleteRecord(index: number) {
      {
        let record = this.records[index];
        if (!record) {
          throw new RangeError('Invalid index');
        }
        if (!record[isNewRecord]) {
          record = this.coerceRecordType(record);
          const isDeleted = await this.delete(record);
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
        if (record[isNewRecord]) {
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
    coerceRecordType(record: RecordType): RecordType {
      const recordTyped: RecordType = {};
      for (const [field, { type }] of Object.entries(this.fields)) {
        const value = record[field];
        if (value !== undefined) {
          recordTyped[field] = type(value);
        }
      }
      return recordTyped;
    },
    createEmptyRecord(): void {
      if (this.isDeleteMode()) {
        return;
      }
      console.log('Creating empty record');
      this.editModes.unshift('Save');
      this.records.unshift({ [isNewRecord]: true });
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
      const mode = this.editModes[index];
      const record = this.records[index];
      if (!mode || !record) {
        throw new RangeError('Invalid index');
      }
      if (mode === 'Save') {
        return Boolean(
          this.fields[field]?.[
            record[isNewRecord] ? 'creatable' : 'updatable'
          ],
        );
      }
      return false;
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
