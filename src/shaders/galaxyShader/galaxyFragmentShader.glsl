precision mediump float;

uniform sampler2D uTexture;
varying vec3 vColor;

void main()
{
    vec4 textureColor = texture2D(uTexture, gl_PointCoord);
    gl_FragColor = vec4(vColor, textureColor.a) * textureColor;
}