export const getHeaderHeight = () => {
  return document.getElementById("header")?.clientHeight || 0;
};

export const isPathActive = (path: string) => {
  return window.location.pathname.toLowerCase() === path.toLowerCase();
};

export const vibrate = (time = 300) => {
  if (window.navigator.vibrate) window.navigator.vibrate(time);
};
