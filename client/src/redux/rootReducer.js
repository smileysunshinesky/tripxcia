import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import {
  authReducer,
  queryReducer,
  userReducer,
  clientReducer,
  vendorReducer
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
    client: clientReducer,
    vendor: vendorReducer,

});

export { rootPersistConfig, rootReducer };
