const validRoutes = [
  '/home',
  '/calendar',
  '/course',
  '/program',
  '/course-class',
  '/management-class',
] as const;

export type ValidRoutes = (typeof validRoutes)[number];
