import { createStore } from 'vuex';
import { auth } from '@/modules/auth';

const storage = createStore({
  modules: {
    auth,
  },
});

export default storage;
