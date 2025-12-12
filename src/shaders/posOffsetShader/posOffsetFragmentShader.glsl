precision mediump float;

varying float vRandom; // get custom attribute from vertex shader
void main()
{
    gl_FragColor = vec4(0.5, vRandom, 0.0, 1);
}