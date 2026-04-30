import React, { useEffect, useRef } from 'react';
import { useSpring, useScroll } from 'motion/react';

const VERTEX_SHADER = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform float scroll;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float dist = length(p);
    float angle = atan(p.y, p.x);
    
    float baseRadius = 0.38 + scroll * 0.5;
    float noiseScale = 0.8; 
    float noiseSpeed = 0.5;
    float noiseStr = 0.07 * (1.0 + scroll * 0.4);
    
    vec2 nCoord = vec2(cos(angle), sin(angle)) * noiseScale;
    
    float nR = noise(nCoord + time * noiseSpeed + 0.12);
    float nG = noise(nCoord + time * (noiseSpeed * 0.95));
    float nB = noise(nCoord + time * (noiseSpeed * 1.05) - 0.12);
    
    float radR = baseRadius + nR * noiseStr;
    float radG = baseRadius + nG * noiseStr;
    float radB = baseRadius + nB * noiseStr;

    float thick = 0.024 + (0.015 * scroll); 
    float falloff = 0.72;
    
    float rLayer = thick / pow(abs(dist - radR), falloff);
    float gLayer = thick / pow(abs(dist - radG), falloff);
    float bLayer = thick / pow(abs(dist - radB), falloff);
    
    vec3 colorR = vec3(1.0, 0.22, 0.0) * rLayer * 0.8;
    vec3 colorG = vec3(0.1, 1.0, 0.5) * gLayer * 0.7;
    vec3 colorB = vec3(0.0, 0.45, 1.0) * bLayer * 1.1;
    
    vec3 color = colorR + colorG + colorB;
    
    float coreThick = thick * 1.6;
    float coreIntensity = coreThick / pow(abs(dist - radG), 0.68);
    color += vec3(1.0) * coreIntensity * 0.6;

    float ghostDist = abs(dist - radG);
    float ghostHalo = exp(-ghostDist * 5.5) * 0.25; 
    vec3 ghostColor = vec3(0.2, 0.4, 1.0) * ghostHalo;
    
    vec3 finalColor = color + ghostColor;
    finalColor = pow(finalColor * 0.9, vec3(0.85));
    
    float alpha = smoothstep(2.6, 0.8, baseRadius);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function PulseOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothedScroll = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      const message = gl.getShaderInfoLog(s);
      if (message && message.length > 0) {
        console.error(message);
      }
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, VERTEX_SHADER)!);
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)!);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const resLoc = gl.getUniformLocation(program, 'resolution');
    const timeLoc = gl.getUniformLocation(program, 'time');
    const scrollLoc = gl.getUniformLocation(program, 'scroll');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    let frame: number;
    const startTime = Date.now();
    const render = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (Date.now() - startTime) * 0.001);
      gl.uniform1f(scrollLoc, smoothedScroll.get());
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [smoothedScroll]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-60"
    />
  );
}
