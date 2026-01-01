uniform float uSize;
uniform float uTime;
uniform vec3 uInsideColor;
uniform vec3 uOutsideColor;

attribute float aSizes;
attribute float aDistance;

varying vec3 vColor;


void main() {
  // Position
  vec4 modelPosition = modelMatrix * vec4 (position, 1);

  // calculate spin ----
  float angle = atan(modelPosition.x, modelPosition.z);
  float distanceToCenter = length(modelPosition.xz);

  float offsetAngle = (1.0 / distanceToCenter) * uTime * 0.3;
  angle += offsetAngle;

  modelPosition.x = cos(angle) * distanceToCenter;
  modelPosition.z = sin(angle) * distanceToCenter;
  // ------


  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Size
  gl_PointSize = (aSizes * uSize) / -viewPosition.z;

  // Color
  vColor = mix(uInsideColor, uOutsideColor, aDistance);
}