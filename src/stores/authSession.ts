import { defineStore } from 'pinia';
import Cookies from 'js-cookie';
import {
  deleteAuthSession,
  postAuthSession,
  type PostAuthSessionData,
} from '@/generated/web-api';

export interface AuthSessionState {
  exists: boolean;
}
export const useAuthSessionStore = defineStore('authSession', {
  state: () => ({
    has_session_id: Boolean(Cookies.get('has_session_id')),
  }),
  getters: {
    exists(state) {
      return state.has_session_id;
    },
  },
  actions: {
    async create(options: PostAuthSessionData['requestBody']): Promise<void> {
      await postAuthSession({ requestBody: options });
      Cookies.set('has_session_id', 'true', {
        expires: 365,
        path: '/',
        sameSite: 'Strict',
      });
      this.has_session_id = true;
    },
    async delete(): Promise<void> {
      Cookies.remove('has_session_id');
      this.has_session_id = false;
      await deleteAuthSession();
    },
  },
});
