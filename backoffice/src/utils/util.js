export const callAll =
  (...callbacks) =>
  (...args) =>
    callbacks.forEach((callback) => callback && callback(...args));
