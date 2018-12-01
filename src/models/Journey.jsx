import { types, getType, flow } from "mobx-state-tree";
import JournalPageBase from "./JournalPageBase";
import MapLocationVisit from "./MapLocationVisit";
import MapPointVisit from "./MapPointVisit";
import JournalPage from "./JournalPage";
import RequestState, { RequestStateType } from "../stores/util/RequestState";
import Api from "../util/Api";

const Journey = types
  .model("Journey", {
    slug: types.identifier(types.string),
    name: types.string,
    description: types.optional(types.string, ""),
    journalPages: types.array(types.union(JournalPageBase, JournalPage)),
    journalPagesCount: types.number,
    mapLocations: types.optional(types.array(MapLocationVisit), []),
    mapRoute: types.optional(types.array(MapPointVisit), []),
    photosCount: types.number,
    background: types.maybe(types.string),

    pageRequestStatuses: types.optional(types.map(RequestStateType), {})
  })
  .views((self) => ({
    get route() {
      return `/journey/${self.slug}`;
    },
    getPage(slug) {
      return self.journalPages.find((page) => page.slug === slug);
    }
  }))
  .actions((self) => ({
    loadPage: flow(function*(slug) {
      try {
        const currentPageEntity = self.getPage(slug);

        if (getType(currentPageEntity) === JournalPage) {
          return null;
        }

        self.pageRequestStatuses.set(slug, RequestState.LOADING);

        const result = yield Api.request(
          `/journeys/${self.slug}/journal-pages/${slug}/`
        );

        // The array might have changed in the meantime, so find the page stub again
        const idx = self.journalPages.findIndex((page) => page.slug === slug);

        const fullPage = JournalPage.create(result);
        self.journalPages.splice(idx, 1, fullPage);
        self.pageRequestStatuses.set(slug, RequestState.LOADED);
      } catch (e) {
        self.pageRequestStatuses.set(slug, RequestState.ERROR);
        console.error(e.toString());
        throw e;
      }
    })
  }));

export default Journey;
