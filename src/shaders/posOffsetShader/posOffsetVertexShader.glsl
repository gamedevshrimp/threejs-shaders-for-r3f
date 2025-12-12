        attribute float aRandom; // get custom attribute from geometry

        varying float vRandom; 

        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);

          // coordinates manipulation
          // modelPosition.z = sin(modelPosition.x * 10.0) * 0.5;
          modelPosition.z += aRandom * 0.1;

          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;

          vRandom = aRandom;// sent custom attribute to fragment shader
        }