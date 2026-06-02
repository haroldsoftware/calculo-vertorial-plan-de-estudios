import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Conceptos from './pages/Conceptos'
import Plan from './pages/Plan'
import EjerciciosFaciles from './pages/EjerciciosFaciles'
import EjerciciosDificiles from './pages/EjerciciosDificiles'
import Hacks from './pages/Hacks'
import './App.css'

const nav = [
  { to: '/', label: '📚 Conceptos Clave' },
  { to: '/plan', label: '🗓 Plan de Estudios' },
  { to: '/ejercicios-faciles', label: '🟢 Ejercicios Fáciles' },
  { to: '/ejercicios-dificiles', label: '🔴 Ejercicios Difíciles' },
  { to: '/hacks', label: '⚡ Hacks Opción Múltiple' },
]

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <nav style={{
          width: 230, minHeight: '100vh', background: 'var(--bg2)',
          borderRight: '1px solid var(--border)', padding: '1.5rem 0',
          position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
          display: 'flex', flexDirection: 'column', gap: 0
        }}>
          <div style={{ padding: '0 1.2rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 }}>
              Cálculo Vectorial
            </div>
            <div style={{ color: 'var(--text2)', fontSize: '0.78rem', marginTop: 4 }}>Plan de Estudio Parcial</div>
          </div>
          <div style={{ padding: '0.8rem 0' }}>
            {nav.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '0.6rem 1.2rem',
                  color: isActive ? 'var(--accent)' : 'var(--text2)',
                  background: isActive ? 'rgba(124,131,253,0.12)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                  textDecoration: 'none', fontSize: '0.88rem', fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s'
                })}>
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', maxWidth: 860 }}>
          <Routes>
            <Route path="/" element={<Conceptos />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/ejercicios-faciles" element={<EjerciciosFaciles />} />
            <Route path="/ejercicios-dificiles" element={<EjerciciosDificiles />} />
            <Route path="/hacks" element={<Hacks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
