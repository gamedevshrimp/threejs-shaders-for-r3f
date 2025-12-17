precision mediump float;

uniform vec3 uColorDepth;
uniform vec3 uColorSurface;

varying vec2 vUv;
varying float shadowMask;
uniform float uColorOffset;

void main()
{
    float shadowTint = shadowMask + uColorOffset;
    vec3 color = mix(uColorDepth, uColorSurface, shadowTint);

    gl_FragColor = vec4(color, 1);
}