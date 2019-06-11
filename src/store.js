import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'immutable';

const persistConfig = {
  key: 'root',
  storage : storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  serialize: {
    immutable: Immutable
  }
});

export const store = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));
export const persistor = persistStore(store)
