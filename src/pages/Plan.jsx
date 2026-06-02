import { useState } from 'react'
import Math from '../components/Math'

const temas = [
  {
    id: 'id1',
    titulo: 'Integrales Dobles Rectangulares',
    tiempo: '3 horas',
    peso: 'Alto',
    descripcion: 'Base de todo el parcial. Dominar el teorema de Fubini, tipos de región y cambio de orden de integración.',
    subtemas: ['Definición como límite de sumas de Riemann', 'Teorema de Fubini (rectángulos)', 'Regiones de Tipo I y Tipo II', 'Cambio del orden de integración', 'Área y volumen como aplicaciones'],
    pasos: [
      { titulo: 'Ejemplo 1: Integral sobre rectángulo', enunciado: 'Calcule \\int_0^2\\int_1^3 (x^2 y + 2x)\\,dy\\,dx', pasos: ['Integra respecto a y: \\int_1^3 (x^2 y + 2x)\\,dy = x^2\\frac{y^2}{2}\\Big|_1^3 + 2xy\\Big|_1^3', '= x^2\\cdot\\frac{9-1}{2} + 2x(3-1) = 4x^2 + 4x', 'Integra respecto a x: \\int_0^2 (4x^2+4x)\\,dx = \\frac{4x^3}{3}+2x^2\\Big|_0^2', '= \\frac{32}{3}+8 = \\frac{56}{3}'], resultado: '\\frac{56}{3}' },
      { titulo: 'Ejemplo 2: Cambio de orden', enunciado: 'Cambie el orden de integración en \\int_0^1\\int_x^1 f(x,y)\\,dy\\,dx', pasos: ['Región D: 0 ≤ x ≤ 1, x ≤ y ≤ 1. Es decir, x ≤ y con x,y ∈ [0,1].', 'Dibuja: triángulo con vértices (0,0),(0,1),(1,1).', 'Tipo II: para y fijo en [0,1], x va de 0 a y.', 'Resultado: \\int_0^1\\int_0^y f(x,y)\\,dx\\,dy'], resultado: '\\int_0^1\\int_0^y f(x,y)\\,dx\\,dy' },
      { titulo: 'Ejemplo 3 (Quiz)', enunciado: 'Halle \\iint_D y^2\\,dA donde D es el triángulo con vértices (0,1),(1,2),(4,1)', pasos: ['Los tres lados forman un triángulo. Halla las ecuaciones de los lados.', 'Lado de (0,1) a (4,1): y=1 (base inferior)', 'Lado de (0,1) a (1,2): pendiente 1, y=x+1, o sea x=y-1', 'Lado de (1,2) a (4,1): pendiente -1/3, y=-\\frac{1}{3}(x-4)+1, o sea x=4-3(y-1)=7-3y', 'Tipo II: y ∈ [1,2], x de y-1 a 7-3y.', '\\int_1^2\\int_{y-1}^{7-3y} y^2\\,dx\\,dy = \\int_1^2 y^2(7-3y-(y-1))\\,dy', '= \\int_1^2 y^2(8-4y)\\,dy = \\int_1^2 (8y^2-4y^3)\\,dy', '= \\frac{8y^3}{3}-y^4\\Big|_1^2 = (\\frac{64}{3}-16)-(\\frac{8}{3}-1) = \\frac{56}{3}-15 = \\frac{11}{3}'], resultado: '\\frac{11}{3}' },
    ]
  },
  {
    id: 'id2',
    titulo: 'Integrales Dobles en Coordenadas Polares',
    tiempo: '2.5 horas',
    peso: 'Alto',
    descripcion: 'Esencial para regiones circulares. El Jacobiano r es crítico: nunca olvidarlo.',
    subtemas: ['Relaciones x=rcosθ, y=rsinθ', 'Jacobiano dA=r dr dθ', 'Regiones polares simples y complejas', 'Área en polares', 'Integrales con x²+y²'],
    pasos: [
      { titulo: 'Ejemplo 1: Área de círculo desplazado', enunciado: 'Calcule el área dentro de x^2+y^2=2x usando coordenadas polares', pasos: ['En polares: r^2 = 2r\\cos\\theta \\Rightarrow r = 2\\cos\\theta', 'θ ∈ [-π/2, π/2], r de 0 a 2cosθ.', 'A = \\int_{-\\pi/2}^{\\pi/2}\\int_0^{2\\cos\\theta} r\\,dr\\,d\\theta', '= \\int_{-\\pi/2}^{\\pi/2} 2\\cos^2\\theta\\,d\\theta = \\int_{-\\pi/2}^{\\pi/2}(1+\\cos 2\\theta)\\,d\\theta = \\pi'], resultado: 'A = \\pi' },
      { titulo: 'Ejemplo 2 (Quiz)', enunciado: 'Calcule \\iint_D x\\,dA donde D es la región en el 1er cuadrante entre x^2+y^2=4 y x^2+y^2=2x', pasos: ['Círculo grande: r=2, círculo pequeño: r=2cosθ', 'Primer cuadrante: θ ∈ [0,π/2]', 'Para θ ∈ [0,π/3]: la curva pequeña r=2cosθ ≥ r=2... espera, comparar: 2cosθ=2 ↔ θ=0. En θ=π/3: 2cos(π/3)=1 < 2.', 'La región entre los dos círculos: r de 2cosθ a 2 cuando θ ∈ [0,π/2].', 'I = \\int_0^{\\pi/2}\\int_{2\\cos\\theta}^{2} r\\cos\\theta \\cdot r\\,dr\\,d\\theta', '= \\int_0^{\\pi/2}\\cos\\theta\\int_{2\\cos\\theta}^{2}r^2\\,dr\\,d\\theta', '= \\int_0^{\\pi/2}\\cos\\theta\\cdot\\frac{r^3}{3}\\Big|_{2\\cos\\theta}^{2}d\\theta = \\int_0^{\\pi/2}\\cos\\theta\\cdot\\frac{8-8\\cos^3\\theta}{3}d\\theta', '= \\frac{8}{3}\\int_0^{\\pi/2}(\\cos\\theta - \\cos^4\\theta)d\\theta = \\frac{8}{3}\\left[1 - \\frac{3\\pi}{16}\\right] = \\frac{8}{3}-\\frac{\\pi}{2}'], resultado: '\\frac{8}{3} - \\frac{\\pi}{2}' },
    ]
  },
  {
    id: 'id3',
    titulo: 'Integrales Triples',
    tiempo: '4 horas',
    peso: 'Alto',
    descripcion: 'El tema más pesado. Dominar los 3 sistemas de coordenadas y saber cuándo usar cada uno.',
    subtemas: ['Integrales triples rectangulares (6 órdenes)', 'Volumen de sólidos', 'Coordenadas cilíndricas: x=rcosθ, y=rsinθ, z=z', 'Coordenadas esféricas: x=ρsinφcosθ, y=ρsinφsinθ, z=ρcosφ', 'Jacobiano cilíndrico: r; Jacobiano esférico: ρ²sinφ'],
    pasos: [
      { titulo: 'Ejemplo 1 (Quiz)', enunciado: 'La integral iterada en orden dz dy dx para el volumen del sólido: x+y+z=6, cilindro 9-x^2-y^2=0, primer octante', pasos: ['Cilindro: x^2+y^2=9, radio 3. Plano: z=6-x-y.', 'Primer octante: x≥0, y≥0, z≥0.', 'x: 0 a 3. Para cada x, y: 0 a √(9-x²). Para cada (x,y), z: 0 a 6-x-y.', 'I = \\int_0^3\\int_0^{\\sqrt{9-x^2}}\\int_0^{6-x-y} dz\\,dy\\,dx'], resultado: '\\int_0^3\\int_0^{\\sqrt{9-x^2}}\\int_0^{6-x-y}dz\\,dy\\,dx' },
      { titulo: 'Ejemplo 2 (Quiz)', enunciado: 'Calcule \\int_0^1\\int_0^{1-x}\\int_{2y}^{1+y^2} x\\,dz\\,dy\\,dx', pasos: ['Integra z: \\int_{2y}^{1+y^2} x\\,dz = x(1+y^2-2y) = x(1-y)^2', 'Integra y: \\int_0^{1-x} x(1-y)^2\\,dy = x\\cdot\\frac{-(1-y)^3}{3}\\Big|_0^{1-x} = x\\cdot\\frac{0+1}{3}\\cdot... ', '= x\\cdot\\frac{1-(1-(1-x))^3}{3}... Cálculo directo: = x\\cdot\\frac{(1-x)^3}{3}... espera.', '\\int_0^{1-x}(1-y)^2 dy: sea u=1-y, du=-dy. Cuando y=0 u=1, y=1-x u=x.', '= \\int_1^{x}u^2(-du) = \\int_x^1 u^2 du = \\frac{1-x^3}{3}', 'Integra x: \\int_0^1 x\\cdot\\frac{1-x^3}{3}dx = \\frac{1}{3}\\int_0^1(x-x^4)dx = \\frac{1}{3}[\\frac{1}{2}-\\frac{1}{5}] = \\frac{1}{3}\\cdot\\frac{3}{10} = \\frac{1}{10}'], resultado: '\\frac{1}{10}' },
      { titulo: 'Ejemplo 3: Cilíndricas', enunciado: 'Calcule el volumen del sólido acotado por z=\\sqrt{x^2+y^2} y z=4-x^2-y^2', pasos: ['Intersección: r = 4-r² → r²+r-4=0 → r=(√17-1)/2 ≈ 1.56... Mejor: z=r y z=4-r² se cruzan donde r=4-r², r²+r-4=0.', 'En cilíndricas: z de r a 4-r², r de 0 a r₀, θ de 0 a 2π.', 'V = \\int_0^{2\\pi}\\int_0^{r_0}\\int_r^{4-r^2} r\\,dz\\,dr\\,d\\theta', '= 2\\pi\\int_0^{r_0} r(4-r^2-r)\\,dr = 2\\pi\\int_0^{r_0}(4r-r^3-r^2)\\,dr'], resultado: 'V = 2\\pi\\int_0^{r_0}(4r-r^3-r^2)\\,dr' },
    ]
  },
  {
    id: 'id4',
    titulo: 'Funciones Vectoriales',
    tiempo: '2 horas',
    peso: 'Medio',
    descripcion: 'Derivadas e integrales componente a componente. Clave: dominio, límites, vector tangente.',
    subtemas: ['Definición y dominio', 'Límites de funciones vectoriales', 'Continuidad', 'Derivada e interpretación geométrica', 'Vector tangente unitario T(t)', 'Integrales de funciones vectoriales'],
    pasos: [
      { titulo: 'Ejemplo 1: Dominio', enunciado: 'Halle el dominio de \\mathbf{r}(t) = \\langle \\sqrt{4-t^2},\\, \\ln(t),\\, \\frac{1}{t-1} \\rangle', pasos: ['Componente 1: √(4-t²) requiere 4-t² ≥ 0 → -2 ≤ t ≤ 2', 'Componente 2: ln(t) requiere t > 0', 'Componente 3: 1/(t-1) requiere t ≠ 1', 'Dom = [-2,2] ∩ (0,∞) ∩ (ℝ\\{1}) = (0,2]\\{1}'], resultado: '(0,1)\\cup(1,2]' },
      { titulo: 'Ejemplo 2: Límite', enunciado: "Calcule \\lim_{t\\to 0}\\mathbf{r}(t) = \\left\\langle \\frac{\\sin t}{t},\\, e^{2t},\\, \\frac{1-\\cos t}{t} \\right\\rangle", pasos: ['Comp 1: lim_{t→0} sin(t)/t = 1 (límite notable)', 'Comp 2: lim_{t→0} e^{2t} = e^0 = 1', 'Comp 3: lim_{t→0} (1-cos t)/t = 0 (por L\'Hôpital o serie: ≈ t²/2 / t → 0)'], resultado: '\\langle 1, 1, 0 \\rangle' },
      { titulo: 'Ejemplo 3: Derivada y tangente', enunciado: "Halle T(t) en t=0 para \\mathbf{r}(t) = \\langle e^t, \\sin(\\pi t), t^2+1 \\rangle", pasos: ["r'(t) = \\langle e^t, \\pi\\cos(\\pi t), 2t \\rangle", "r'(0) = \\langle 1, \\pi, 0 \\rangle", "|r'(0)| = \\sqrt{1+\\pi^2}", "T(0) = \\frac{1}{\\sqrt{1+\\pi^2}}\\langle 1, \\pi, 0 \\rangle"], resultado: 'T(0) = \\frac{\\langle 1,\\pi,0\\rangle}{\\sqrt{1+\\pi^2}}' },
    ]
  },
]

function EjemploResuelto({ ej }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="card" style={{ marginBottom: '0.7rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', cursor:'pointer', alignItems:'center' }}
        onClick={() => setAbierto(!abierto)}>
        <strong style={{ fontSize: '0.92rem' }}>{ej.titulo}</strong>
        <span style={{ color:'var(--accent)' }}>{abierto ? '▲' : '▼'}</span>
      </div>
      {abierto && (
        <div style={{ marginTop: '0.8rem' }}>
          <div style={{ background:'var(--bg3)', padding:'0.6rem 1rem', borderRadius:8, marginBottom:'0.7rem', textAlign:'center' }}>
            <Math tex={ej.enunciado} display={true} />
          </div>
          {ej.pasos.map((p, i) => (
            <div key={i} style={{ display:'flex', gap:'0.7rem', marginBottom:'0.4rem', alignItems:'flex-start' }}>
              <span style={{ minWidth:22, height:22, borderRadius:'50%', background:'var(--accent)', color:'white', fontSize:'0.75rem', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, marginTop:2 }}>{i+1}</span>
              <span style={{ fontSize:'0.88rem', color:'var(--text2)' }}>
                {p.includes('\\') || p.includes('^') || p.includes('_') ? <Math tex={p} /> : p}
              </span>
            </div>
          ))}
          <div style={{ marginTop:'0.7rem', background:'rgba(76,175,80,0.1)', borderLeft:'3px solid var(--green)', padding:'0.4rem 0.8rem', borderRadius:'0 6px 6px 0' }}>
            <span style={{ fontSize:'0.85rem', color:'var(--text2)' }}>Respuesta: </span>
            <Math tex={ej.resultado} />
          </div>
        </div>
      )}
    </div>
  )
}

export default function Plan() {
  const [activo, setActivo] = useState('id1')
  const tema = temas.find(t => t.id === activo)

  return (
    <div>
      <h1>🗓 Plan de Estudios</h1>
      <p style={{ color:'var(--text2)', marginBottom:'1.5rem' }}>Estudia cada tema con ejemplos resueltos paso a paso del material real.</p>

      <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1.5rem' }}>
        {temas.map(t => (
          <button key={t.id} onClick={() => setActivo(t.id)}
            style={{ padding:'0.4rem 0.9rem', borderRadius:20, border:'1px solid', cursor:'pointer', fontSize:'0.85rem', fontWeight: activo===t.id ? 700 : 400,
              borderColor: activo===t.id ? 'var(--accent)' : 'var(--border)',
              background: activo===t.id ? 'rgba(124,131,253,0.15)' : 'var(--bg2)',
              color: activo===t.id ? 'var(--accent)' : 'var(--text2)' }}>
            {t.titulo}
          </button>
        ))}
      </div>

      {tema && (
        <div>
          <div style={{ display:'flex', gap:'0.7rem', marginBottom:'1rem', flexWrap:'wrap' }}>
            <span className="badge">⏱ {tema.tiempo}</span>
            <span className="badge" style={{ color:'var(--yellow)' }}>📊 Peso: {tema.peso}</span>
          </div>
          <p style={{ color:'var(--text2)', marginBottom:'1rem' }}>{tema.descripcion}</p>

          <h2>Subtemas</h2>
          <ul style={{ marginBottom:'1.2rem' }}>
            {tema.subtemas.map((s, i) => <li key={i} style={{ color:'var(--text2)', fontSize:'0.9rem' }}>{s}</li>)}
          </ul>

          <h2>Ejemplos Resueltos</h2>
          {tema.pasos.map((ej, i) => <EjemploResuelto key={i} ej={ej} />)}
        </div>
      )}
    </div>
  )
}
