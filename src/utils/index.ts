import { APPS_PATH, type APPS } from "../constant/app";

export const getRoutePath = (apps: APPS, path: string) => {
  const route = APPS_PATH[apps];

  return `/${route}/${path}`;
};

export const generateIdentifiers = (prefix: string) => {
  const randomString = Math.random().toString(36).slice(-8).toUpperCase();

  return `${prefix.toUpperCase()}-${randomString}`;
};

export function getEntityFromUrl(): string | null {
  const segments = window.location.pathname.split("/");
  return segments[1] || null;
}
