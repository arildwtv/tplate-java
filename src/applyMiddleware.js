export function applyMiddleware(javaSegments, ...middleware) {
  return Object.keys(javaSegments)
    .reduce((middlewareSegments, segmentKey) =>
      Object.assign({}, middlewareSegments, {
        [segmentKey]: spec => {
          const newSpec = middleware.reduce((prevSpec, mid) =>
            mid(prevSpec), spec);
          const segment = javaSegments[segmentKey];
          return segment(newSpec);
        }
      }), {});
}