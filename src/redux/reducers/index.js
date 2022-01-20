import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import user from './user';
import piutang from './piutang';
import unbill from './unbill';
import invoice from './invoice';
import lop from './lop';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'piutang', 'unbill', 'invoice', 'lop'],
};

const rootReducer = combineReducers({
  user,
  piutang,
  unbill,
  invoice,
  lop,
});

export default persistReducer(persistConfig, rootReducer);
