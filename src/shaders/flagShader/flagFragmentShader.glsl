precision mediump float;

uniform vec3 uColor;
uniform sampler2D uTexture;
uniform bool uTextureEnabled;

varying vec2 vUv;
varying float shadowMask;

void main()
{
    vec4 result;
    float shadowTint = shadowMask + 0.8;
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= shadowTint;
    if (uTextureEnabled == true) {
        result = textureColor;
    } else {
        vec3 color = uColor * shadowTint;
        result = vec4 (color, 1);
    }
    gl_FragColor = vec4(result);
}