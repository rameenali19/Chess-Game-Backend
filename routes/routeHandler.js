export function setupRoutes(router, routes) {
  routes.forEach((route) => {
    router[route.method](route.path, async (req, res, next) => {
      try {
        const controller = route.controller
        const handler = controller[route.handler]
        const response = await handler.call(req);
        res.json(response);
      } catch (error) {
        next(error);
      }
    });
  });
}