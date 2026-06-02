import { useState } from 'react'
import Math from '../components/Math'

const preguntas = [
  {
    enunciado: 'Calcule \\iint_D \\frac{y}{x^5+1}\\,dA donde D es la región acotada por y=x^2, y=0, x=1 (ver quiz)',
    opciones: ['\\frac{1}{5}', '\\frac{\\ln 2}{5}', '\\frac{1}{10}', '\\frac{\\ln 2}{10}'],
    correcta: 3,
    explicacion: 'Región D: 0≤x≤1, 0≤y≤x². Integra y primero: ∫₀^{x²} y/(x⁵+1) dy = x⁴/(2(x⁵+1)). Luego ∫₀¹ x⁴/(2(x⁵+1)) dx = (1/10)[ln(x⁵+1)]₀¹ = ln(2)/10.',
    formula: '\\int_0^1\\frac{x^4}{2(x^5+1)}\\,dx = \\frac{1}{10}\\ln(x^5+1)\\Big|_0^1 = \\frac{\\ln 2}{10}',
    porQueOtrasNo: ['1/5: no completa la integración en y correctamente.', 'ln2/5: error de factor 2 al integrar ∫y dy = y²/2.', '1/10: no evalúa ln, toma el numerador incorrecto.']
  },
  {
    enunciado: 'El valor de b tal que \\int_0^b\\int_1^2 xy\\,dx\\,dy = 23 es aproximadamente:',
    opciones: ['3.537', '4.000', '5.537', '6.000'],
    correcta: 2,
    explicacion: '∫₁² xy dx = y[x²/2]₁² = y(2-1/2) = 3y/2. Luego ∫₀^b (3y/2) dy = 3b²/4 = 23 → b² = 92/3 → b = √(92/3) ≈ 5.537.',
    formula: '\\frac{3b^2}{4}=23 \\Rightarrow b=\\sqrt{\\frac{92}{3}}\\approx 5.537',
    porQueOtrasNo: ['3.537: corresponde a b²≈12.5, que no satisface la ecuación.', '4.000: da 3(16)/4=12≠23.', '6.000: da 3(36)/4=27≠23.']
  },
  {
    enunciado: 'El volumen del sólido bajo z=xy sobre el triángulo con vértices (1,1),(4,1),(1,2) es:',
    opciones: ['\\frac{23}{8}', '\\frac{8}{3}', '\\frac{15}{8}', '\\frac{31}{8}'],
    correcta: 3,
    explicacion: 'Región: y∈[1,2]. Lado de (4,1) a (1,2): x = 4+3(1-y) = 7-3y. Límites de x: 1 a 7-3y (esto es un triángulo). V = ∫₁²∫₁^{7-3y} xy dx dy = ∫₁² y·[x²/2]₁^{7-3y} dy = ∫₁² y[(7-3y)²-1]/2 dy. Expandiendo y evaluando se obtiene 31/8.',
    formula: '\\int_1^2\\int_1^{7-3y} xy\\,dx\\,dy = \\frac{31}{8}',
    porQueOtrasNo: ['23/8: error en los límites del triángulo.', '8/3: confunde el problema con otra integral.', '15/8: error aritmético en la expansión del polinomio.']
  },
  {
    enunciado: 'Al resolver \\iint_D x\\,dA con D en el 1er cuadrante entre x^2+y^2=4 y x^2+y^2=2x:',
    opciones: ['\\frac{5}{2}-\\frac{3}{4}\\pi', '\\frac{8}{3}-\\frac{1}{2}\\pi', '\\frac{5-\\pi}{2}', '\\frac{8}{3}-\\frac{3}{4}\\pi'],
    correcta: 1,
    explicacion: 'Círculo 1: r=2 (radio 2). Círculo 2: r=2cosθ (pasa por origen). En 1er cuadrante, D es la región entre r=2cosθ y r=2 para θ∈[0,π/2]. I=∫₀^{π/2}∫_{2cosθ}^{2} rcosθ·r dr dθ = 8/3 - π/2.',
    formula: '\\int_0^{\\pi/2}\\cos\\theta\\cdot\\frac{8-8\\cos^3\\theta}{3}\\,d\\theta = \\frac{8}{3}-\\frac{\\pi}{2}',
    porQueOtrasNo: ['La opción A usa coeficiente de π=3/4, error en ∫cos⁴θ dθ.', 'La opción C no separa correctamente los términos.', 'La opción D tiene el factor de π incorrecto.']
  },
  {
    enunciado: 'La integral iterada \\int_0^3\\int_0^{\\sqrt{9-x^2}}\\int_0^{6-x-y} dz\\,dy\\,dx representa el volumen de:',
    opciones: [
      'Un cilindro completo de radio 3 y altura 6',
      'El sólido en el primer octante acotado por el plano x+y+z=6 y el cilindro x^2+y^2=9',
      'La esfera x^2+y^2+z^2=9',
      'El paraboloide z=x^2+y^2 bajo el plano z=6'
    ],
    correcta: 1,
    explicacion: 'x∈[0,3], y∈[0,√(9-x²)] describe el cuarto de disco de radio 3 (primer cuadrante). z∈[0,6-x-y] está acotada por el plano x+y+z=6. Es exactamente el sólido del primer octante.',
    formula: 'E: x^2+y^2\\leq 9,\\; x,y,z\\geq 0,\\; z\\leq 6-x-y',
    porQueOtrasNo: ['Un cilindro completo requeriría y desde -√(9-x²) a √(9-x²) y z constante.', 'La esfera tiene límites curvos en z que incluirían √(9-x²-y²).', 'El paraboloide tendría z empezando desde x²+y² no desde 0.']
  },
  {
    enunciado: 'La integral \\int_0^1\\int_0^{1-x}\\int_{2y}^{1+y^2} x\\,dz\\,dy\\,dx es igual a:',
    opciones: ['\\frac{3}{10}', '\\frac{1}{5}', '\\frac{2}{5}', '\\frac{1}{10}'],
    correcta: 3,
    explicacion: '1) Integra dz: x(1+y²-2y)=x(1-y)². 2) ∫₀^{1-x} x(1-y)² dy: sea u=1-y → x∫ₓ¹u² du = x(1-x³)/3. 3) ∫₀¹ x(1-x³)/3 dx = (1/3)∫₀¹(x-x⁴)dx = (1/3)(1/2-1/5) = (1/3)(3/10) = 1/10.',
    formula: '\\frac{1}{3}\\left(\\frac{1}{2}-\\frac{1}{5}\\right) = \\frac{1}{3}\\cdot\\frac{3}{10} = \\frac{1}{10}',
    porQueOtrasNo: ['3/10: olvida dividir por 3 en el último paso.', '1/5: error en ∫(x-x⁴)dx: no aplica bien los límites.', '2/5: error de cálculo mayor en la segunda integración.']
  },
  {
    enunciado: 'El área de la región dentro de (x-1)²+y²=1 y x²+y²=1 es aproximadamente:',
    opciones: ['0.785', '1.000', '1.228', '1.571'],
    correcta: 2,
    explicacion: 'Círculo 1: (x-1)²+y²=1 → r=2cosθ. Círculo 2: x²+y²=1 → r=1. Intersección en cosθ=1/2 → θ=±π/3. La región común es el área de intersección. Calculando la integral con polares se obtiene π/3+√3/2·... ≈ 1.228.',
    formula: 'A = 2\\int_0^{\\pi/3}\\int_0^{2\\cos\\theta} r\\,dr\\,d\\theta + 2\\int_{\\pi/3}^{\\pi/2}\\int_0^1 r\\,dr\\,d\\theta \\approx 1.228',
    porQueOtrasNo: ['0.785 ≈ π/4: solo un sector.', '1.000 = π·r²/π: valor sin cálculo real.', '1.571 ≈ π/2: área de media circunferencia, no la intersección.']
  },
  {
    enunciado: 'Para convertir \\iiint_E (x^2+y^2+z^2)\\,dV sobre la esfera x^2+y^2+z^2\\leq 4 a esféricas, el integrando se convierte en:',
    opciones: ['\\rho^2\\cdot\\rho^2\\sin\\phi', '\\rho\\cdot\\rho^2\\sin\\phi', '\\rho^3\\sin\\phi', '\\rho^2 + \\rho^2\\sin\\phi'],
    correcta: 0,
    explicacion: 'x²+y²+z²=ρ². El elemento de volumen dV=ρ²sinφ dρ dφ dθ. El integrando completo es ρ²·ρ²sinφ = ρ⁴sinφ.',
    formula: '\\iiint_E \\rho^2 \\cdot \\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta = \\int_0^{2\\pi}\\int_0^\\pi\\int_0^2 \\rho^4\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta',
    porQueOtrasNo: ['ρ·ρ²sinφ: confunde ρ² con ρ para x²+y²+z².', 'ρ³sinφ: omite un factor ρ del integrando.', 'ρ²+ρ²sinφ: suma incorrecta del integrando y el jacobiano.']
  },
  {
    enunciado: 'La integral \\int_{-1}^1\\int_0^{\\sqrt{1-x^2}} dA representa:',
    opciones: ['El área de un cuadrado de lado 1', 'El área de un círculo de radio 1', 'El área de la semiesfera superior', '\\pi/2'],
    correcta: 3,
    explicacion: 'La región es: -1≤x≤1, 0≤y≤√(1-x²), que es el semicírculo superior de radio 1. Su área es π·1²/2 = π/2. La respuesta correcta es π/2 (no "área de semicírculo" que es ambiguo).',
    formula: '\\int_{-1}^1\\int_0^{\\sqrt{1-x^2}}dy\\,dx = \\frac{\\pi}{2}',
    porQueOtrasNo: ['Cuadrado: los límites son circulares, no lineales.', 'Área del círculo completo sería π (incluiría y<0).', 'Semiesfera es 3D; aquí es una región 2D.']
  },
  {
    enunciado: 'Para encontrar los límites del sólido x^2+y^2+z^2\\leq 9, z\\geq 0 en esféricas: φ va de...',
    opciones: ['0 a 2π', '0 a π', '0 a π/2', 'π/2 a π'],
    correcta: 2,
    explicacion: 'z≥0 significa ρcosφ≥0, es decir cosφ≥0, lo que equivale a φ∈[0,π/2]. ρ va de 0 a 3 (radio de la esfera). θ va de 0 a 2π (giro completo).',
    formula: 'z\\geq 0 \\Leftrightarrow \\rho\\cos\\phi\\geq 0 \\Leftrightarrow \\phi\\in[0,\\pi/2]',
    porQueOtrasNo: ['[0,2π]: ese es el rango de θ.', '[0,π]: eso sería toda la esfera (incluyendo z<0).', '[π/2,π]: eso corresponde a z≤0 (semiesfera inferior).']
  },
  {
    enunciado: 'Relacione: La integral (I) \\int_{-1}^1\\int_0^{\\sqrt{1-x^2}} dA corresponde a:',
    opciones: ['2\\pi', '\\pi/2', '0', '4\\pi'],
    correcta: 1,
    explicacion: 'Esta integral es el área del semicírculo superior: D={x²+y²≤1, y≥0}. En polares: θ∈[0,π], r∈[0,1]. A=∫₀^π∫₀¹ r dr dθ = π/2.',
    formula: 'A = \\int_0^\\pi\\int_0^1 r\\,dr\\,d\\theta = \\pi\\cdot\\frac{1}{2} = \\frac{\\pi}{2}',
    porQueOtrasNo: ['2π sería el área del círculo completo de radio √2.', '0 solo si hay simetría impar con el integrando.', '4π es el área de un círculo de radio 2.']
  },
  {
    enunciado: 'El vector tangente unitario T(t) de r(t)=⟨cos(t), sin(t), t⟩ en t=0 es:',
    opciones: ['\\langle 0, 1, 1 \\rangle', '\\frac{1}{\\sqrt{2}}\\langle 0, 1, 1 \\rangle', '\\langle -1, 0, 1 \\rangle', '\\frac{1}{\\sqrt{2}}\\langle -1, 0, 1 \\rangle'],
    correcta: 1,
    explicacion: "r'(t)=⟨-sin(t),cos(t),1⟩. En t=0: r'(0)=⟨0,1,1⟩. |r'(0)|=√(0+1+1)=√2. T(0)=(1/√2)⟨0,1,1⟩.",
    formula: "T(0) = \\frac{\\langle 0,1,1\\rangle}{\\sqrt{2}}",
    porQueOtrasNo: ['⟨0,1,1⟩ no está normalizado (magnitud √2 ≠ 1).', '⟨-1,0,1⟩ es r\'(π/2), no r\'(0).', '(1/√2)⟨-1,0,1⟩ evalúa en t=π/2, no en t=0.']
  },
  {
    enunciado: 'Para calcular \\iiint_E\\sqrt{x^2+y^2}\\,dV sobre el sólido E: x^2+y^2\\leq z\\leq 1, el sistema más conveniente es:',
    opciones: ['Rectangular', 'Cilíndrico', 'Esférico', 'Cualquiera por igual'],
    correcta: 1,
    explicacion: 'El paraboloide z=x²+y² en cilíndricas es z=r². √(x²+y²)=r. El integrando simplifica a r, y los límites son z∈[r²,1], r∈[0,1], θ∈[0,2π]. Perfecto para cilíndricas.',
    formula: '\\int_0^{2\\pi}\\int_0^1\\int_{r^2}^1 r\\cdot r\\,dz\\,dr\\,d\\theta = \\int_0^{2\\pi}\\int_0^1 r^2(1-r^2)\\,dr\\,d\\theta',
    porQueOtrasNo: ['Rectangular: √(x²+y²) no simplifica y los límites del paraboloide son complejos.', 'Esférico: el paraboloide z=ρ²sin²φ es más complicado que z=r².', 'No son equivalentes en dificultad: cilíndrico es claramente más simple aquí.']
  },
  {
    enunciado: 'Si r(t)=⟨t², 2t, ln(t)⟩, la integral \\int_1^e \\mathbf{r}(t)\\,dt es:',
    opciones: [
      '\\langle \\frac{e^3-1}{3}, e^2-1, 1 \\rangle',
      '\\langle \\frac{e^3+1}{3}, e^2+1, 0 \\rangle',
      '\\langle e^2, 2e, 1/e \\rangle',
      '\\langle 2t, 2, 1/t \\rangle'
    ],
    correcta: 0,
    explicacion: '∫t² dt = t³/3, evaluado en [1,e] = (e³-1)/3. ∫2t dt = t², evaluado en [1,e] = e²-1. ∫ln(t) dt = t·ln(t)-t, evaluado en [1,e] = (e·1-e)-(1·0-1)=0+1=1.',
    formula: '\\int_1^e \\mathbf{r}\\,dt = \\left\\langle \\frac{e^3-1}{3},\\, e^2-1,\\, 1 \\right\\rangle',
    porQueOtrasNo: ['La opción B suma en vez de restar los límites de integración.', 'La opción C evalúa r en t=e, no integra.', 'La opción D es r\'(t), la derivada, no la integral.']
  },
  {
    enunciado: 'La integral doble \\iint_R (xy)\\,dA sobre la región acotada por \\sqrt{1-x^2}\\leq y \\leq \\sqrt{9-x^2} en el primer cuadrante es:',
    opciones: ['\\frac{\\pi}{2}', '10', '0', '4\\pi'],
    correcta: 1,
    explicacion: 'En polares: la región R está en el 1er cuadrante entre r=1 y r=3 (círculos). xy=r²cosθ·sinθ=(r²/2)sin(2θ). I=∫₀^{π/2}∫₁³ (r²cosθsinθ)r dr dθ = [∫₀^{π/2}sinθcosθ dθ]·[∫₁³ r³ dr] = (1/2)·(80/4)/2 = 10.',
    formula: '\\int_0^{\\pi/2}\\sin\\theta\\cos\\theta\\,d\\theta\\cdot\\int_1^3 r^3\\,dr = \\frac{1}{2}\\cdot 20 = 10',
    porQueOtrasNo: ['π/2: resultado de ∫∫1 dA sobre el semicírculo, no xy.', '0: la función xy>0 en el primer cuadrante, nunca cancela.', '4π: corresponde a ∫∫r dA sobre la región, no ∫∫xy dA.']
  },
]

function Pregunta({ q, idx }) {
  const [sel, setSel] = useState(null)
  const respondio = sel !== null

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display:'flex', gap:'0.6rem', marginBottom:'0.7rem', alignItems:'flex-start' }}>
        <span style={{ minWidth:28, height:28, borderRadius:'50%', background:'rgba(239,83,80,0.2)', border:'1px solid var(--red)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:700, color:'var(--red)', flexShrink:0 }}>{idx+1}</span>
        <p style={{ margin:0, fontSize:'0.9rem' }}><Math tex={q.enunciado} /></p>
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
              {sel===q.correcta?'¡Correcto!':'Incorrecto — Respuesta: ' + String.fromCharCode(65+q.correcta)}
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

export default function EjerciciosDificiles() {
  const [reiniciar, setReiniciar] = useState(0)
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'0.7rem' }}>
        <div>
          <h1>🔴 Ejercicios Difíciles</h1>
          <p style={{ color:'var(--text2)' }}>15 preguntas de nivel avanzado — estilo de los quices de la profesora.</p>
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
