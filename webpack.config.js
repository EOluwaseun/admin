// export const resolve = {
//   fallback: { path: require.resolve('path-browserify') },
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  resolve: { fallback: { os: require.resolve('os-browserify/browser') } },
};
