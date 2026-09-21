import * as THREE from 'three';

/**
 * Atmospheric Fresnel Glow Shader
 * Produces realistic Rayleigh scattering envelope wrapping around Earth's rim.
 */

export const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 glowColor;
    uniform float coefficient;
    uniform float power;

    void main() {
      // Fresnel calculation: intensity is highest at grazing angles (Earth limb)
      vec3 viewCameraDir = normalize(-vPosition);
      float intensity = pow(coefficient - dot(vNormal, viewCameraDir), power);
      intensity = clamp(intensity, 0.0, 1.0);

      // Cyan-blue Rayleigh atmospheric scattering gradient
      vec3 atmosGlow = glowColor * intensity;
      gl_FragColor = vec4(atmosGlow, intensity * 0.95);
    }
  `
};

export function createAtmosphereMesh(radius: number): THREE.Mesh {
  // Sphere slightly larger than Earth (r * 1.14)
  const geometry = new THREE.SphereGeometry(radius * 1.15, 64, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader: AtmosphereShader.vertexShader,
    fragmentShader: AtmosphereShader.fragmentShader,
    uniforms: {
      glowColor: { value: new THREE.Color(0x00c8ff) },
      coefficient: { value: 0.72 },
      power: { value: 2.8 },
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide, // Glow viewed from outside around the silhouette
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Mesh(geometry, material);
}

/**
 * Inner rim atmosphere shader (subtle atmospheric haze on the front edge)
 */
export function createInnerAtmosphereMesh(radius: number): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(radius * 1.02, 64, 64);
  const material = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float fresnel = 1.0 - max(dot(vNormal, viewDir), 0.0);
        float intensity = pow(fresnel, 3.2) * 0.65;
        gl_FragColor = vec4(0.0, 0.85, 1.0, intensity);
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: true,
    depthWrite: false,
  });

  return new THREE.Mesh(geometry, material);
}
