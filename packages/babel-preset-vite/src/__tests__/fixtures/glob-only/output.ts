export const envVar = import.meta.env.VITE_VAR;
export const modules = {
  "files/file1.ts": () => import("files/file1.ts")
};
export const eagerModules = {
  "files/file1.ts": require("files/file1.ts")
};
