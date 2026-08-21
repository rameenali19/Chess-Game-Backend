export function setupRoutes(router, routes) {
  routes.forEach((route) => {
    router[route.method](route.path, async (req, res, next) => {
      try {
        const response = await route.handler(req);
        const status =
          route.statusCode ??
          (route.method === "post" ? 201 : 200);
        res.status(status).json(response);
      } catch (error) {
        next(error);
      }
    });
  });
}