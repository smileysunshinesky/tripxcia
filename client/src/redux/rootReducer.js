import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  authReducer,
  queryReducer,
//   contactReducer,
  userReducer,
} from "./reducers";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // allow or disallow a slice to persist
  // whitelist: []
  // blacklist: []
};

const rootReducer = combineReducers({
    auth: authReducer,
    query: queryReducer,
    user: userReducer,
//   project: projectReducer,
//   contact: contactReducer,
});

export { rootPersistConfig, rootReducer };
