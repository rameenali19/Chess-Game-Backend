export function setupRoutes(router, routes) {
  routes.forEach((route) => {
    router[route.method](route.path, async (req, res, next) => {
      try {
        const response = await route.handler(req);
        res.json(response);
      } catch (error) {
        next(error);
      }
    });
  });
}