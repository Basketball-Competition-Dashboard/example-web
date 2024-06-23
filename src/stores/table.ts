import { defineStore } from 'pinia';

/**
 * A record is a dictionary type mapping field names to values.
 */
export interface RecordType {
  [key: string]: unknown;
  [isNewRecord]?: true;
}

const isNewRecord = Symbol('isNewRecord');

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
  offset: number;
  length: number;
  create: (record: RecordType) => Promise<RecordType | undefined>;
  read: (
    offset: number,
    length: number,
  ) => Promise<RecordType[] | undefined>;
  update: (record: RecordType) => Promise<boolean>;
  delete: (record: RecordType) => Promise<boolean>;
}

type EditMode = 'Create' | 'Delete' | 'Save' | 'Update';

export const useTableStore = defineStore('table', {
  /* State definition and initialization */
  state: () =>
    <TableState>{
      deletable: false,
      editModes: [],
      editModesToSwap: [],
      fields: {},
      records: [],
      length: 0,
      offset: 0,
      create: () => Promise.reject('table.create is not implemented'),
      read: () => Promise.reject('table.read is not implemented'),
      update: () => Promise.reject('table.update is not implemented'),
      delete: () => Promise.reject('table.delete is not implemented'),
    },
  /* Getters */
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
    getVisibleFields(state): TableState['fields'] {
      return Object.fromEntries(
        Object.entries(state.fields).filter(([_, { visible }]) => visible),
      );
    },
    getLength(state) {
      return state.length;
    },
    getOffset(state) {
      return state.offset;
    },
    getRecords(state) {
      return state.records;
    },
  },
  actions: {
    /* Setters */

    setDeletable(deletable: TableState['deletable']) {
      this.deletable = deletable;
    },
    setFields(fields: TableState['fields']) {
      this.fields = fields;
    },
    setCreate(create: TableState['create']) {
      this.create = async (record) => {
        record = this.coerceRecordType(record);
        const recordCreated = await create(record);
        if (!recordCreated) {
          return;
        }
        return this.coerceRecordType(recordCreated);
      };
    },
    setRead(read: TableState['read']) {
      this.read = async (offset, length) => {
        return (await read(offset, length))?.map(
          this.coerceRecordType,
        );
      };
    },
    setUpdate(update: TableState['update']) {
      this.update = async (record) => {
        record = this.coerceRecordType(record);
        return update(record);
      };
    },
    setDelete(delele: TableState['delete']) {
      this.delete = async (record) => {
        record = this.coerceRecordType(record);
        return delele(record);
      };
    },

    /* Remote operations */

    async createRecord(index: number): Promise<void> {
      let record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      record = await this.create(record);
      if (!record) {
        return;
      }
      this.editModes[index] = 'Update';
      this.records[index] = record;
    },
    async readRecords(): Promise<boolean> {
      const records = await this.read(this.offset, this.length);
      if (!records) {
        return false;
      }
      this.editModes = new Array(records.length).fill('Update');
      this.records = records;
      return true;
    },
    async updateRecord(index: number): Promise<void> {
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      const isUpdated = await this.update(record);
      if (!isUpdated) {
        return;
      }
      this.editModes[index] = 'Update';
    },
    async deleteRecord(index: number): Promise<void> {
      if (!this.deletable) {
        return;
      }
      const record = this.records[index];
      if (!record) {
        throw new RangeError('Invalid index');
      }
      if (!record[isNewRecord]) {
        const isDeleted = await this.delete(record);
        if (!isDeleted) {
          return;
        }
      }
      this.records.splice(index, 1);
      const lastOffset = this.offset + this.length - 1;
      const records = await this.read(lastOffset, 1);
      if (!records || records[0] === undefined) {
        return;
      }
      this.records.push(records[0]);
    },
    async editOffsetAndLength(
      offset: number,
      length: number,
    ): Promise<void> {
      const originalLength = this.length;
      const originalOffset = this.offset;
      this.length = length;
      this.offset = offset;
      if (!(await this.readRecords())) {
        this.length = originalLength;
        this.offset = originalOffset;
        await this.readRecords();
      }
    },
    async editRecord(index: number): Promise<void> {
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

    /* Local operations */

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

export type TableStore = ReturnType<typeof useTableStore>;
