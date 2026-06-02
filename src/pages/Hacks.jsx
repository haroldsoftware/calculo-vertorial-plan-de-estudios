import { useState } from 'react'
import Math from '../components/Math'

const secciones = [
  {
    id: 'A',
    titulo: 'A — Descarte Rápido de Opciones',
    icon: '🎯',
    contenido: [
      {
        titulo: 'Verificación de Dimensiones / Magnitud',
        desc: 'Antes de resolver, estima el orden de magnitud de la respuesta. Una integral sobre [0,1]×[0,1] de una función acotada entre 0 y 1 debe dar algo en (0,1). Si una opción dice 100, descártala.',
        ejemplo: 'En el quiz: ∫∫ y/(x⁵+1) dA sobre D⊂[0,1]². El máximo de y/(x⁵+1) ≈ 1 sobre la región de área ≤ 0.5 → la respuesta debe ser < 0.5. Opciones 1/5 y 1/10 son candidatas; ln(2)/5≈0.14 y ln(2)/10≈0.07 también. Descarta respuestas > 0.5.',
        alerta: '⚠️ No apliques esto si el dominio es grande (π, 2π, etc.).'
      },
      {
        titulo: 'Verificación de Signo',
        desc: 'Si el integrando f(x,y) ≥ 0 sobre toda la región D, la respuesta DEBE ser ≥ 0. Descarta opciones negativas.',
        ejemplo: 'V = ∫∫∫ dV (volumen). La respuesta siempre positiva. Si aparece -5 como opción: descártala.',
        alerta: '⚠️ Cuidado: si f puede ser negativa, el resultado podría ser negativo o cero.'
      },
      {
        titulo: 'Simetría del Integrando',
        desc: 'Si el integrando es impar (−f = f) sobre una región simétrica, la integral es 0.',
        ejemplo: 'R simétrico respecto al eje y. Si el integrando contiene x·g(y) (impar en x), la integral es 0. En el quiz: ∫∫(xy) dA sobre región simétrica en x → 0.',
        alerta: '⚠️ Solo funciona si AMBAS condiciones se cumplen: función impar Y región simétrica.'
      },
      {
        titulo: 'La r del Jacobiano: trampa clásica',
        desc: 'En polares, una opción siempre estará dividida o multiplicada por r de más o de menos. La correcta tiene el r del Jacobiano exactamente una vez.',
        ejemplo: 'Área de semicírculo r=1: A = ∫₀^π ∫₀¹ r dr dθ = π/2. Si una opción dice π, tiene r² en vez de r. Si dice π/4, le falta la r.',
        alerta: '⚠️ En esféricas son DOS factores: ρ² y sinφ. No confundas con polares.'
      },
      {
        titulo: 'Verificar Casos Límite',
        desc: 'Sustituye un valor simple (como a=0, a=1, r=0) y verifica qué opción da el resultado esperado.',
        ejemplo: 'Si te piden el volumen de la bola ρ≤R: debe ser (4/3)πR³. Sustituye R=1 → (4/3)π ≈ 4.19. Descarta opciones que no den ese valor para R=1.',
        alerta: '⚠️ Si ninguna opción coincide con el caso límite, replantea tus cálculos.'
      },
    ]
  },
  {
    id: 'B',
    titulo: 'B — Verificación con las Opciones',
    icon: '🔍',
    contenido: [
      {
        titulo: 'Back-substitution: verifica la respuesta en la ecuación',
        desc: 'Sustituye la opción en la ecuación original. Si da una contradicción, es incorrecta.',
        ejemplo: 'Quiz: "¿Cuál b hace que ∫₀^b∫₁² xy dx dy = 23?" Sustituye b=5.537: calcula ∫ y obtén 23. Sustituye b=4: obtienes 12 ≠ 23. Listo.',
        alerta: '⚠️ Solo funciona cuando la ecuación es simple de evaluar. No pierdas tiempo si la evaluación requiere resolver todo de nuevo.'
      },
      {
        titulo: 'Estimar por geometría',
        desc: 'El volumen bajo una superficie se puede estimar: base × altura promedio ≈ resultado esperado.',
        ejemplo: 'V bajo z=1 sobre semicírculo de radio 1: base = π/2 ≈ 1.57, altura = 1. V ≈ 1.57 = π/2. Si las opciones son π/4, π/2, π, 2π → elige π/2.',
        alerta: '⚠️ La estimación puede tener error. Úsala para descartar (no para confirmar) a menos que la estimación sea exacta.'
      },
      {
        titulo: 'Factor común en las opciones',
        desc: 'Observa si las opciones tienen un factor común (π, ln2, 1/2). Esto te dice qué tipo de expresión esperar.',
        ejemplo: 'Si las 4 opciones son fracciones de π (π/4, π/2, π, 2π): la integral involucra una región circular. Entonces confirma que estás usando polares y que el Jacobiano r está incluido.',
        alerta: '⚠️ No asumas que porque hay π en las opciones, la respuesta sea "algo circular". Siempre verifica.'
      },
      {
        titulo: 'Acotar la integral',
        desc: 'Si f(x,y) ∈ [m, M] sobre D y el área de D es A: m·A ≤ ∫∫f dA ≤ M·A. Descarta opciones fuera de este rango.',
        ejemplo: '∫∫(x+y) dA sobre [0,1]×[0,1]: f ∈ [0,2], área=1. Resultado ∈ [0,2]. Si las opciones son 0.5, 1, 2, 10 → descarta 10 inmediatamente.',
        alerta: '⚠️ Las cotas m·A y M·A pueden ser holgadas. Solo descarta lo que claramente esté fuera.'
      },
    ]
  },
  {
    id: 'C',
    titulo: 'C — Guía por Tipo de Problema',
    icon: '📋',
    contenido: [
      {
        titulo: 'Problema: Integral doble sobre región triangular',
        desc: 'Estrategia: dibuja el triángulo, identifica si es Tipo I o II. Normalmente uno de los dos da límites lineales simples. La trampa clásica: olvidar ajustar los límites al cambiar el orden.',
        ejemplo: '∫∫ y² dA, triángulo (0,1),(1,2),(4,1). Tipo II con y∈[1,2] da x de y-1 a 7-3y. Verifica: en y=1, x de 0 a 4 ✓. En y=2, x de 1 a 1 (punto) ✓.',
        alerta: '⚠️ Siempre verifica los vértices contra tus límites antes de integrar.'
      },
      {
        titulo: 'Problema: Integral en polares con dos curvas',
        desc: 'Estrategia: 1) Encuentra intersecciones (iguala r₁=r₂). 2) Identifica cuál es la curva interior/exterior. 3) Escribe ∫∫_{r₁(θ)}^{r₂(θ)} r dr dθ.',
        ejemplo: 'Entre x²+y²=4 y x²+y²=2x: r=2 y r=2cosθ. Se cruzan en θ=π/2 (cosθ=1 no). En el 1er cuadrante: r=2cosθ es interior (para θ∈[0,π/2], 2cosθ<2). Límites: r de 2cosθ a 2.',
        alerta: '⚠️ Compara las dos curvas r₁(θ) y r₂(θ) en un ángulo intermedio para saber cuál es interior.'
      },
      {
        titulo: 'Problema: Integral triple, elegir coordenadas',
        desc: 'Árbol de decisión: ¿aparece x²+y²+z²? → Esféricas. ¿Aparece x²+y² con z independiente? → Cilíndricas. ¿Región rectangular? → Rectangulares.',
        ejemplo: 'Sólido entre cono z=√(x²+y²) y esfera x²+y²+z²=4: tiene ambas, pero la esfera domina → Esféricas. El cono z=r se convierte en ρcosφ=ρsinφ → φ=π/4.',
        alerta: '⚠️ El cono z=√(x²+y²) en esféricas es φ=π/4, no φ=π/2 (que sería el plano z=0).'
      },
      {
        titulo: 'Problema: Función vectorial, dominio',
        desc: 'Estrategia: analiza restricción de CADA componente por separado, luego intersecta.',
        ejemplo: 'r(t)=⟨√(1-t²), ln(t), 1/(t-2)⟩: comp1 requiere t∈[-1,1]; comp2 requiere t>0; comp3 requiere t≠2. Dom = [-1,1]∩(0,∞)∩(ℝ\\{2}) = (0,1].',
        alerta: '⚠️ Siempre escribe el dominio con notación de intervalos. "t≠2 y t∈[-1,1]" no excluye nada porque 2∉[-1,1].'
      },
      {
        titulo: 'Problema: Vector tangente unitario',
        desc: "Pasos: 1) Deriva r'(t). 2) Evalúa en t=t₀. 3) Calcula la norma. 4) Divide. No simplifiques antes de evaluar.",
        ejemplo: 'r(t)=⟨cos t, sin t, t⟩ en t=0: r\'(0)=⟨0,1,1⟩, |r\'(0)|=√2. T(0)=(1/√2)⟨0,1,1⟩. Trampa: confundir T(0) con r\'(0).',
        alerta: '⚠️ T(t) siempre tiene magnitud 1. Si tu respuesta no está normalizada, está mal.'
      },
      {
        titulo: 'Problema: Cambiar orden de integración',
        desc: 'Pasos: 1) Dibuja la región D definida por los límites actuales. 2) Describe D con el orden invertido. 3) Reescribe la integral.',
        ejemplo: '∫₀¹∫ₓ¹ f dy dx: región {(x,y): 0≤x≤1, x≤y≤1} = triángulo con x≤y. Invertido: y∈[0,1], x∈[0,y]. Resultado: ∫₀¹∫₀^y f dx dy.',
        alerta: '⚠️ Siempre verifica que los puntos extremos (vértices) queden incluidos en la nueva descripción.'
      },
    ]
  },
]

export default function Hacks() {
  const [activa, setActiva] = useState('A')
  const seccion = secciones.find(s => s.id === activa)

  return (
    <div>
      <h1>⚡ Hacks para Opción Múltiple</h1>
      <p style={{ color:'var(--text2)', marginBottom:'1.5rem' }}>Estrategias para el día del parcial: descarte rápido, verificación con opciones y guías por tipo de problema.</p>

      <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
        {secciones.map(s => (
          <button key={s.id} onClick={() => setActiva(s.id)}
            style={{ padding:'0.45rem 1rem', borderRadius:20, border:'1px solid', cursor:'pointer', fontSize:'0.88rem', fontWeight: activa===s.id ? 700 : 400,
              borderColor: activa===s.id ? 'var(--accent)' : 'var(--border)',
              background: activa===s.id ? 'rgba(124,131,253,0.15)' : 'var(--bg2)',
              color: activa===s.id ? 'var(--accent)' : 'var(--text2)' }}>
            {s.icon} {s.titulo.split(' — ')[0]}
          </button>
        ))}
      </div>

      {seccion && (
        <div>
          <h2 style={{ marginBottom: '1rem' }}>{seccion.icon} {seccion.titulo}</h2>
          {seccion.contenido.map((item, i) => (
            <div key={i} className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ color:'var(--accent2)', marginBottom:'0.5rem' }}>{item.titulo}</h3>
              <p style={{ fontSize:'0.9rem', color:'var(--text)', marginBottom:'0.5rem' }}>{item.desc}</p>
              <div style={{ background:'rgba(124,131,253,0.08)', border:'1px solid rgba(124,131,253,0.2)', borderRadius:8, padding:'0.6rem 0.9rem', marginBottom:'0.5rem' }}>
                <strong style={{ fontSize:'0.8rem', color:'var(--accent)', display:'block', marginBottom:'0.3rem' }}>EJEMPLO</strong>
                <p style={{ fontSize:'0.88rem', color:'var(--text2)', margin:0 }}>{item.ejemplo}</p>
              </div>
              <div style={{ background:'rgba(255,213,79,0.08)', border:'1px solid rgba(255,213,79,0.2)', borderRadius:8, padding:'0.5rem 0.9rem' }}>
                <p style={{ fontSize:'0.85rem', color:'var(--yellow)', margin:0 }}>{item.alerta}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tabla resumen */}
      <div style={{ marginTop:'2rem' }}>
        <h2>📊 Chuleta Rápida: Jacobianos</h2>
        <div className="card" style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.88rem' }}>
            <thead>
              <tr style={{ borderBottom:'2px solid var(--border)' }}>
                {['Sistema','Jacobiano','dV / dA','Cuándo'].map(h=>(
                  <th key={h} style={{ padding:'0.5rem', textAlign:'left', color:'var(--accent2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Rectangulares 2D','1','dx dy','Siempre base'],
                ['Polares','r','r dr dθ','Círculos, x²+y²'],
                ['Rectangulares 3D','1','dx dy dz','Cajas, tetraedros'],
                ['Cilíndricas','r','r dr dθ dz','Cilindros, conos'],
                ['Esféricas','ρ²sinφ','ρ²sinφ dρ dφ dθ','Esferas, bolas'],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom:'1px solid var(--border)', background:i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding:'0.5rem', color:j===1?'var(--yellow)':j===0?'var(--accent2)':'var(--text)' }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ marginTop:'1.5rem' }}>⏱ Plan de Tiempo (Parcial ~2h)</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'0.7rem' }}>
          {[
            { tiempo:'2 min', accion:'Lee TODAS las preguntas. Marca las fáciles.' },
            { tiempo:'1 min/pregunta', accion:'Preguntas de descarte rápido (∫∫1 dA, dominio, Jacobiano).' },
            { tiempo:'3-4 min/pregunta', accion:'Problemas de cálculo real. Si te trabas: estima y descarta.' },
            { tiempo:'5 min final', accion:'Revisa respuestas con back-substitution donde sea posible.' },
          ].map((item, i) => (
            <div key={i} style={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, padding:'0.8rem', textAlign:'center' }}>
              <div style={{ color:'var(--accent)', fontWeight:700, fontSize:'1rem', marginBottom:'0.3rem' }}>{item.tiempo}</div>
              <div style={{ color:'var(--text2)', fontSize:'0.82rem' }}>{item.accion}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
