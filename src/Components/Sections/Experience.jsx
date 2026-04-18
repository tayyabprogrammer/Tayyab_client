// src/Components/sections/Experience.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ExperienceTimeline from '../3D/ExperienceTimeline'

const Experience = () => {
  return (
    <section className="experience-section">
      <h2 className="section-title">Experience</h2>
      <p className="section-subtitle">My professional journey</p>
      
      <div className="experience-canvas">
        <Canvas camera={{ position: [8, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#ff00ff" intensity={0.5} />
          
          <Stars radius={100} depth={50} count={1000} factor={4} fade />
          
          <ExperienceTimeline />
          
          <OrbitControls 
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>
    </section>
  )
}

export default Experience