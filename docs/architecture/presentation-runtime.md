# Presentation Runtime

The scroll presentation is the canonical delivery surface. The legacy deck and print views are retained as compatibility and submission paths, loaded only when their query route is requested.

React Three Fiber is the approved 3D engine. The earlier Spline-led proposal in PLAN-3D.md is historical context, not current architecture.

Every section is semantic HTML over a progressive scene layer. One runtime selects at most one live scene. Posters are the loading, lite, reduced-motion, error, and context-loss experience.

The Big Idea timeline is pure presentation state. The overlay and R3F scene consume the same normalized progress but never import one another.
