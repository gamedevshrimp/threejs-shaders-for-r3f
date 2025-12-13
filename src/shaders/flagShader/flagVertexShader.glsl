        uniform float uFrequency;
        uniform float uTime;
        uniform float uTimeMultiplier;

        varying vec2 vUv;
        varying float shadowMask;

        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // coordinates manipulation
          float zOffset = sin(modelPosition.x * uFrequency + (uTime * uTimeMultiplier)) * 0.3;
          modelPosition.z += zOffset;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;

          vUv = uv;
          shadowMask = zOffset;
        }