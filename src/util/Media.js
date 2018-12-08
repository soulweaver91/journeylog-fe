import { observable } from "mobx/lib/mobx";

export const UI_BREAKPOINTS = observable({
  xs: "(max-width: 767px)",
  su: "(min-width: 768px)",
  sm: "(min-width: 768px) and (max-width: 991px)",
  md: "(min-width: 992px) and (max-width: 1199px)",
  mu: "(min-width: 992px)",
  lg: "(min-width: 1200px)",
  noScroll: "(min-width: 992px) and (min-height: 350px)"
});
