export const isPathActive = (path: string) => {
  return window.location.pathname.toLowerCase() === path.toLowerCase();
};
