import { types } from "mobx-state-tree";
import Tag from "../models/Tag";
import Api from "../util/Api";
import { flow } from "mobx-state-tree";
import RequestState, { RequestStateType } from "./util/RequestState";

const TagStore = types
  .model("TagStore", {
    tags: types.array(Tag),
    status: types.optional(RequestStateType, RequestState.UNINITIALIZED)
  })
  .actions((self) => ({
    loadTags: flow(function*() {
      try {
        self.status = RequestState.LOADING;

        // self.tags = yield Api.request("tags");
        self.tags = [];
        self.status = RequestState.LOADED;
      } catch (e) {
        self.status = RequestState.ERROR;
        console.log(e);
      }
    })
  }));

export default TagStore;
