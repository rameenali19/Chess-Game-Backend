export function setupRoutes(router, routes) {
  routes.forEach((route) => {
    const controller = new route.controller
    router[route.method](route.path, async (req, res, next) => {
      try {
        const response = await controller[route.handler](req);
        res.json(response);
      } catch (error) {
        next(error);
      }
    });
  });
}