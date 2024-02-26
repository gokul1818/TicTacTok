import { persistStore } from 'redux-persist';
import configureStore from './configureStore';
import persistReducers from './persistReducers';
import rootReducer from '../slice/rootReducer';

const store = configureStore(persistReducers(rootReducer));
const persistor = persistStore(store);

export { store, persistor };
