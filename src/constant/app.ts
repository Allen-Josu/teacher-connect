export const APPS = {
  USERS: "USERS",
} as const;

export type APPS = keyof typeof APPS;

export const APPS_PATH: Record<APPS, string> = {
  USERS: "/",
};
