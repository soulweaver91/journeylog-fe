import { types } from "mobx-state-tree";
import RequestState, { RequestStateType } from "./util/RequestState";
import { flow } from "mobx-state-tree";
import Api from "../util/Api";

const ConfigStore = types
  .model("ConfigStore", {
    online: types.optional(types.boolean, true),
    config: types.optional(
      types.model({
        HOME_TIMEZONE: types.optional(types.string, "Etc/UTC")
      }),
      {}
    ),
    status: types.optional(RequestStateType, RequestState.UNINITIALIZED)
  })
  .actions((self) => ({
    load: flow(function*() {
      try {
        self.status = RequestState.LOADING;

        const reply = yield Api.request("status/");
        self.online = reply.online;
        self.config = reply.settings;

        self.status = RequestState.LOADED;
      } catch (e) {
        self.status = RequestState.ERROR;
        console.log(e);
      }
    })
  }));

export default ConfigStore;
