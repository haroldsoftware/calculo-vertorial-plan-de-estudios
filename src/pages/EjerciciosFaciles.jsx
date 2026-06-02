import { useState } from 'react'
import Math from '../components/Math'

const preguntas = [
  {
    enunciado: '¿Cuál es el Jacobiano de la transformación a coordenadas polares?',
    opciones: ['1', 'r', 'r²', 'sinθ'],
    correcta: 1,
    explicacion: 'Al cambiar a polares x=rcosθ, y=rsinθ, el Jacobiano es r. Por eso dA = r dr dθ. Sin la r, la integral estaría mal.',
    formula: 'dA = r\\,dr\\,d\\theta',
    porQueOtrasNo: ['dA=dr dθ no es correcto porque ignora la distorsión del área al curvar el espacio.', 'r² aparece en coordenadas esféricas (ρ²sinφ), no polares.', 'sinθ solo aparece en coordenadas esféricas como parte de ρ²sinφ.']
  },
  {
    enunciado: 'El Teorema de Fubini establece que para una función continua sobre un rectángulo R=[a,b]×[c,d]:',
    opciones: [
      '\\iint_R f\\,dA = \\int_a^b f(x,c)\\,dx',
      '\\iint_R f\\,dA = \\int_a^b\\int_c^d f(x,y)\\,dy\\,dx = \\int_c^d\\int_a^b f(x,y)\\,dx\\,dy',
      '\\iint_R f\\,dA = \\left(\\int_a^b f\\,dx\\right)^2',
      '\\iint_R f\\,dA = \\int_a^b f(x,x)\\,dx'
    ],
    correcta: 1,
    explicacion: 'Fubini garantiza que se puede cambiar el orden de integración sobre rectángulos cuando f es continua. Los dos órdenes dan el mismo resultado.',
    formula: '\\iint_R f\\,dA = \\int_a^b\\int_c^d f\\,dy\\,dx = \\int_c^d\\int_a^b f\\,dx\\,dy',
    porQueOtrasNo: ['La opción A evalúa f solo en y=c, no integra sobre toda la región.', 'La opción C sería para (∫f dx)·(∫g dy) solo si f se factoriza.', 'La opción D integra sobre la diagonal, no sobre el rectángulo.']
  },
  {
    enunciado: 'El área de la región D usando integral doble es:',
    opciones: ['\\iint_D f(x,y)\\,dA', '\\iint_D 0\\,dA', '\\iint_D 1\\,dA', '\\iint_D x\\,dA'],
    correcta: 2,
    explicacion: 'El área es la integral doble de la función constante 1 sobre la región D. Piénsalo como el volumen de un sólido de altura 1 sobre D.',
    formula: 'A(D) = \\iint_D 1\\,dA',
    porQueOtrasNo: ['∫∫f dA da el volumen bajo la superficie z=f.', '∫∫0 dA = 0, trivialmente.', '∫∫x dA da el momento de primer orden, no el área.']
  },
  {
    enunciado: 'La relación x²+y²=9 en coordenadas polares es:',
    opciones: ['r = 9', 'r = 3', 'θ = 3', 'r² = 9θ'],
    correcta: 1,
    explicacion: 'Como x²+y² = r², la ecuación x²+y²=9 se convierte en r²=9, es decir r=3 (tomando r≥0).',
    formula: 'x^2+y^2 = r^2 \\Rightarrow r^2=9 \\Rightarrow r=3',
    porQueOtrasNo: ['r=9 confunde r² con r.', 'θ=3 no tiene sentido porque x²+y²=9 es un círculo, no una línea recta.', 'r²=9θ introduce θ sin razón.']
  },
  {
    enunciado: 'Para una región de Tipo I, los límites de integración son:',
    opciones: [
      '\\int_c^d\\int_{h_1(y)}^{h_2(y)} f\\,dx\\,dy',
      '\\int_a^b\\int_{g_1(x)}^{g_2(x)} f\\,dy\\,dx',
      '\\int_0^{2\\pi}\\int_0^R f\\cdot r\\,dr\\,d\\theta',
      '\\int_a^b\\int_a^b f\\,dy\\,dx'
    ],
    correcta: 1,
    explicacion: 'Tipo I: x ∈ [a,b] (constantes), y va de g₁(x) a g₂(x) (funciones de x). Se integra y primero.',
    formula: '\\int_a^b\\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx',
    porQueOtrasNo: ['La opción A es Tipo II (x depende de y).', 'La opción C es coordenadas polares.', 'La opción D es un rectángulo con límites iguales, no Tipo I.']
  },
  {
    enunciado: 'El dominio de r(t) = ⟨√(1-t), ln(t+2), 1/t⟩ es:',
    opciones: ['(-2, 0) ∪ (0, 1]', '(-∞, 1]', '(0, 1]', '(-∞, 0)'],
    correcta: 0,
    explicacion: 'Comp 1: t≤1. Comp 2: t+2>0 → t>-2. Comp 3: t≠0. Intersección: t∈(-2,1] y t≠0, es decir (-2,0)∪(0,1].',
    formula: '(-2,0)\\cup(0,1]',
    porQueOtrasNo: ['(-∞,1] no incluye la restricción de ln(t+2) ni t≠0.', '(0,1] excluye el intervalo (-2,0).', '(-∞,0) ignora la restricción t≤1 y excluye (0,1].']
  },
  {
    enunciado: 'El Jacobiano en coordenadas esféricas dV = ... es:',
    opciones: ['d\\rho\\,d\\phi\\,d\\theta', 'r\\,dr\\,d\\theta\\,dz', '\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta', '\\rho\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta'],
    correcta: 2,
    explicacion: 'En coordenadas esféricas, el elemento de volumen es ρ²sinφ dρ dφ dθ. El factor ρ²sinφ es el Jacobiano de la transformación esférica.',
    formula: 'dV = \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta',
    porQueOtrasNo: ['Sin Jacobiano (opción A): incorrecto, el cambio de variables distorsiona volúmenes.', 'La opción B es el elemento de volumen cilíndrico, no esférico.', 'ρsinφ (opción D) es el Jacobiano incorrecto: falta un factor ρ.']
  },
  {
    enunciado: 'Si f(x,y) = g(x)·h(y) sobre el rectángulo [a,b]×[c,d], entonces ∬f dA es:',
    opciones: [
      '\\int_a^b g(x)\\,dx + \\int_c^d h(y)\\,dy',
      '\\int_a^b g(x)\\,dx \\cdot \\int_c^d h(y)\\,dy',
      '\\int_a^b g(x)h(x)\\,dx',
      '\\iint [g(x)+h(y)]\\,dA'
    ],
    correcta: 1,
    explicacion: 'Si f se factoriza sobre un rectángulo, la integral doble se separa en producto de dos integrales simples. Es una propiedad muy útil para simplificar.',
    formula: '\\iint_R g(x)h(y)\\,dA = \\left(\\int_a^b g(x)\\,dx\\right)\\left(\\int_c^d h(y)\\,dy\\right)',
    porQueOtrasNo: ['La suma (opción A) no aplica para productos.', 'La opción C combina variables incorrecto.', 'La opción D no es equivalente a g(x)·h(y).']
  },
  {
    enunciado: 'La derivada de r(t) = ⟨t², sin(t), e^t⟩ es:',
    opciones: [
      '\\langle 2t, \\cos t, e^t \\rangle',
      '\\langle t^3/3, -\\cos t, e^t \\rangle',
      '\\langle 2, \\cos t, e^t \\rangle',
      '\\langle 2t, -\\cos t, te^t \\rangle'
    ],
    correcta: 0,
    explicacion: "Se deriva componente a componente: (t²)'=2t, (sin t)'=cos t, (e^t)'=e^t.",
    formula: "\\mathbf{r}'(t) = \\langle 2t,\\,\\cos t,\\,e^t \\rangle",
    porQueOtrasNo: ['La opción B es la integral de r(t), no la derivada.', 'La opción C diferencia t² como si fuera lineal: (t²)\'=2t, no 2.', 'La opción D tiene signos y factores incorrectos.']
  },
  {
    enunciado: '¿Qué rango de φ corresponde al casquete esférico superior (z ≥ 0)?',
    opciones: ['\\phi \\in [0, 2\\pi]', '\\phi \\in [0, \\pi]', '\\phi \\in [0, \\pi/2]', '\\phi \\in [\\pi/2, \\pi]'],
    correcta: 2,
    explicacion: 'En coordenadas esféricas z=ρcosφ ≥ 0 requiere cosφ ≥ 0, es decir φ ∈ [0, π/2]. La semiesfera superior corresponde a φ ∈ [0, π/2].',
    formula: 'z = \\rho\\cos\\phi \\geq 0 \\Rightarrow \\phi \\in [0,\\pi/2]',
    porQueOtrasNo: ['[0,2π] es el rango de θ, no φ.', '[0,π] es el rango completo de φ (toda la esfera).', '[π/2,π] corresponde a z≤0 (semiesfera inferior).']
  },
  {
    enunciado: 'Para cambiar ∫₀¹∫ₓ¹ f(x,y) dy dx al orden inverso, el resultado es:',
    opciones: [
      '\\int_0^1\\int_0^y f\\,dx\\,dy',
      '\\int_0^1\\int_y^1 f\\,dx\\,dy',
      '\\int_0^1\\int_0^1 f\\,dx\\,dy',
      '\\int_0^1\\int_x^1 f\\,dy\\,dx'
    ],
    correcta: 0,
    explicacion: 'Región D: 0≤x≤1, x≤y≤1. Esto es el triángulo con x≤y. Para Tipo II: y∈[0,1], x∈[0,y].',
    formula: '\\int_0^1\\int_0^y f(x,y)\\,dx\\,dy',
    porQueOtrasNo: ['La opción B invierte el límite de x incorrectamente.', 'La opción C convierte D en un cuadrado completo.', 'La opción D es la integral original sin cambio.']
  },
  {
    enunciado: 'El volumen del cilindro r ≤ 2, 0 ≤ z ≤ 5 es:',
    opciones: ['10π', '20π', 'π', '40π'],
    correcta: 1,
    explicacion: 'V = ∫₀²π ∫₀² ∫₀⁵ r dz dr dθ = 2π · ∫₀² 5r dr = 2π · 5·[r²/2]₀² = 2π·10 = 20π.',
    formula: 'V = \\int_0^{2\\pi}\\int_0^2\\int_0^5 r\\,dz\\,dr\\,d\\theta = 20\\pi',
    porQueOtrasNo: ['10π = π·r²·h/2 ≠ volumen del cilindro completo.', 'π sería solo el radio al cuadrado sin los demás factores.', '40π tiene un factor extra de 2.']
  },
  {
    enunciado: 'El límite de r(t) = ⟨sin(t)/t, t², cos(t)⟩ cuando t→0 es:',
    opciones: ['⟨0, 0, 1⟩', '⟨1, 0, 1⟩', '⟨1, 1, 0⟩', 'No existe'],
    correcta: 1,
    explicacion: 'lim(sin t/t)=1 (límite notable), lim(t²)=0, lim(cos t)=1. El límite existe y es ⟨1,0,1⟩.',
    formula: '\\lim_{t\\to 0}\\mathbf{r}(t) = \\langle 1, 0, 1 \\rangle',
    porQueOtrasNo: ['⟨0,0,1⟩ comete error en el primer componente: sin(t)/t→1, no 0.', '⟨1,1,0⟩ confunde los valores de t² y cos(t).', 'El límite sí existe porque todos los componentes tienen límite.']
  },
  {
    enunciado: 'En coordenadas cilíndricas, el cono z = √(x²+y²) se escribe como:',
    opciones: ['z = r²', 'z = r', 'z = θ', 'z = ρ'],
    correcta: 1,
    explicacion: 'Como r = √(x²+y²), el cono z=√(x²+y²) se convierte simplemente en z=r en coordenadas cilíndricas.',
    formula: 'z = \\sqrt{x^2+y^2} = r',
    porQueOtrasNo: ['z=r² sería el paraboloide, no el cono.', 'z=θ mezcla variables angulares con altura.', 'ρ es la variable de coordenadas esféricas, no cilíndricas.']
  },
  {
    enunciado: '¿Cuántos órdenes posibles de integración existen para una integral triple?',
    opciones: ['2', '4', '6', '8'],
    correcta: 2,
    explicacion: 'Hay 3! = 6 permutaciones de (x,y,z): dz dy dx, dz dx dy, dy dz dx, dy dx dz, dx dz dy, dx dy dz. Todos son válidos si los límites se ajustan correctamente.',
    formula: '3! = 6 \\text{ órdenes posibles}',
    porQueOtrasNo: ['2 órdenes aplica para integrales dobles.', '4 no tiene justificación combinatoria.', '8 = 2³ no corresponde a permutaciones.']
  },
]

function Pregunta({ q, idx }) {
  const [sel, setSel] = useState(null)
  const respondio = sel !== null

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display:'flex', gap:'0.6rem', marginBottom:'0.7rem', alignItems:'flex-start' }}>
        <span style={{ minWidth:28, height:28, borderRadius:'50%', background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:700, color:'var(--accent2)', flexShrink:0 }}>{idx+1}</span>
        <p style={{ margin:0, fontSize:'0.92rem' }}>{q.enunciado.includes('\\') ? <Math tex={q.enunciado} /> : q.enunciado}</p>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom: respondio ? '0.8rem' : 0 }}>
        {q.opciones.map((op, i) => {
          let bg = 'var(--bg3)', borderCol = 'var(--border)', color = 'var(--text2)'
          if (respondio) {
            if (i === q.correcta) { bg='rgba(76,175,80,0.15)'; borderCol='var(--green)'; color='var(--text)' }
            else if (i === sel && sel !== q.correcta) { bg='rgba(239,83,80,0.15)'; borderCol='var(--red)'; color='var(--text)' }
          } else if (i === sel) { bg='rgba(124,131,253,0.15)'; borderCol='var(--accent)'; color='var(--text)' }

          return (
            <button key={i} onClick={() => !respondio && setSel(i)}
              style={{ textAlign:'left', padding:'0.55rem 0.9rem', borderRadius:8, border:`1px solid ${borderCol}`, background:bg, color, cursor: respondio?'default':'pointer', display:'flex', gap:'0.6rem', alignItems:'center', fontSize:'0.88rem', transition:'all 0.15s' }}>
              <span style={{ fontWeight:700, minWidth:18 }}>{String.fromCharCode(65+i)}.</span>
              <span>{op.includes('\\') || op.includes('^') || op.includes('_') ? <Math tex={op} /> : op}</span>
            </button>
          )
        })}
      </div>

      {respondio && (
        <div style={{ borderTop:'1px solid var(--border)', paddingTop:'0.8rem' }}>
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'0.5rem', alignItems:'center' }}>
            <span style={{ fontSize:'1.1rem' }}>{sel===q.correcta?'✅':'❌'}</span>
            <strong style={{ color: sel===q.correcta?'var(--green)':'var(--red)', fontSize:'0.9rem' }}>
              {sel===q.correcta?'¡Correcto!':'Incorrecto. La respuesta es ' + String.fromCharCode(65+q.correcta) + '.'}
            </strong>
          </div>
          <div style={{ background:'var(--bg3)', borderRadius:8, padding:'0.5rem 1rem', marginBottom:'0.5rem', textAlign:'center' }}>
            <Math tex={q.formula} display={true} />
          </div>
          <p style={{ fontSize:'0.88rem', color:'var(--text2)', marginBottom:'0.4rem' }}>{q.explicacion}</p>
          <details style={{ fontSize:'0.85rem' }}>
            <summary style={{ cursor:'pointer', color:'var(--accent2)', marginBottom:'0.4rem' }}>¿Por qué las otras son incorrectas?</summary>
            <ul style={{ marginTop:'0.3rem' }}>
              {q.porQueOtrasNo.map((r,i) => <li key={i} style={{ color:'var(--text2)', marginBottom:'0.2rem' }}>{r}</li>)}
            </ul>
          </details>
        </div>
      )}
    </div>
  )
}

export default function EjerciciosFaciles() {
  const [reiniciar, setReiniciar] = useState(0)
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'0.7rem' }}>
        <div>
          <h1>🟢 Ejercicios Fáciles</h1>
          <p style={{ color:'var(--text2)' }}>15 preguntas de selección múltiple — nivel básico. Selecciona tu respuesta para ver la explicación.</p>
        </div>
        <button onClick={() => setReiniciar(r=>r+1)}
          style={{ padding:'0.4rem 1rem', borderRadius:20, border:'1px solid var(--border)', background:'var(--bg3)', color:'var(--text2)', cursor:'pointer', fontSize:'0.85rem' }}>
          🔄 Reiniciar
        </button>
      </div>
      <div key={reiniciar}>
        {preguntas.map((q, i) => <Pregunta key={i} q={q} idx={i} />)}
      </div>
    </div>
  )
}
