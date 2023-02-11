import type { RouteRecordRaw } from "vue-router";

export enum RouteNames {
  Landing = "Landing",
  NotFound = "NotFound",
}

export const Routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.Landing,
    component: () => import("@/views/LandingView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: RouteNames.NotFound,
    component: () => import("@/views/NotFoundView.vue"),
  },
];
