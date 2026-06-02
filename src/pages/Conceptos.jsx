import { useState } from 'react'
import Math from '../components/Math'

const temas = [
  {
    id: 'dobles',
    titulo: 'Integrales Dobles',
    conceptos: [
      {
        nombre: 'Integral Doble sobre Rectángulo',
        formula: '\\iint_R f(x,y)\\,dA = \\int_a^b\\int_c^d f(x,y)\\,dy\\,dx',
        intuicion: 'Suma el volumen bajo la superficie f(x,y) sobre la región R. Imagina apilar columnas infinitesimales de altura f(x,y) y área dA.',
        hack: '💡 Si f(x,y) = g(x)·h(y) sobre un rectángulo → se separa: ∫g dx · ∫h dy',
      },
      {
        nombre: 'Teorema de Fubini',
        formula: '\\iint_R f(x,y)\\,dA = \\int_a^b\\left(\\int_c^d f(x,y)\\,dy\\right)dx = \\int_c^d\\left(\\int_a^b f(x,y)\\,dx\\right)dy',
        intuicion: 'Puedes integrar en cualquier orden sobre un rectángulo. Elige el orden que haga la integral más fácil.',
        hack: '💡 ¿Difícil integrar en un orden? Prueba el otro. Muchas veces uno de los dos es trivial.',
      },
      {
        nombre: 'Región de Tipo I (x fijo, y varía)',
        formula: '\\iint_D f\\,dA = \\int_a^b\\int_{g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx',
        intuicion: 'Para cada x en [a,b], y va de la curva inferior g₁(x) a la superior g₂(x). Dibuja cortes verticales.',
        hack: '💡 Tipo I: límites de y dependen de x. Integra y primero.',
      },
      {
        nombre: 'Región de Tipo II (y fijo, x varía)',
        formula: '\\iint_D f\\,dA = \\int_c^d\\int_{h_1(y)}^{h_2(y)} f(x,y)\\,dx\\,dy',
        intuicion: 'Para cada y en [c,d], x va de h₁(y) a h₂(y). Dibuja cortes horizontales.',
        hack: '💡 Tipo II: límites de x dependen de y. Integra x primero.',
      },
      {
        nombre: 'Área de región plana',
        formula: 'A(D) = \\iint_D 1\\,dA',
        intuicion: 'La integral doble de la función constante 1 da el área. Es la base: si f=1, la "altura" es 1 por todo.',
        hack: '💡 Para área: f(x,y) = 1. Para volumen bajo z=f: integra f directamente.',
      },
      {
        nombre: 'Volumen bajo una superficie',
        formula: 'V = \\iint_D f(x,y)\\,dA \\quad (f \\geq 0)',
        intuicion: 'El volumen del sólido acotado arriba por z=f(x,y) y abajo por la región D en el plano xy.',
        hack: '💡 Verifica signo: si f puede ser negativa, el resultado es volumen algebraico (puede cancelar).',
      },
    ]
  },
  {
    id: 'polares',
    titulo: 'Coordenadas Polares en Integrales Dobles',
    conceptos: [
      {
        nombre: 'Cambio a Polares',
        formula: 'x = r\\cos\\theta,\\quad y = r\\sin\\theta,\\quad dA = r\\,dr\\,d\\theta',
        intuicion: 'La clave: ¡no olvides la r! El área de un "pedacito" polar es r dr dθ, no solo dr dθ.',
        hack: '💡 Detecta que necesitas polares cuando aparece x²+y², círculos, o la región es un sector.',
      },
      {
        nombre: 'Fórmula de Integral en Polares',
        formula: '\\iint_D f(x,y)\\,dA = \\int_\\alpha^\\beta\\int_{r_1(\\theta)}^{r_2(\\theta)} f(r\\cos\\theta, r\\sin\\theta)\\cdot r\\,dr\\,d\\theta',
        intuicion: 'Sustituyes x e y en términos de r y θ, y multiplicas por r (el jacobiano).',
        hack: '💡 x²+y² = r². Siempre simplifica a r² antes de integrar.',
      },
      {
        nombre: 'Área en Polares',
        formula: 'A = \\int_\\alpha^\\beta\\int_0^{r(\\theta)} r\\,dr\\,d\\theta = \\frac{1}{2}\\int_\\alpha^\\beta [r(\\theta)]^2\\,d\\theta',
        intuicion: 'El área de una región polar se obtiene integrando r·dr·dθ. La mitad de r² viene de integrar r dr.',
        hack: '💡 Área de círculo x²+y²=R²: r va de 0 a R, θ de 0 a 2π → A = πR² ✓',
      },
      {
        nombre: 'Identificar círculos en polares',
        formula: 'x^2+y^2=a^2 \\Rightarrow r=a \\qquad x^2+y^2=2ax \\Rightarrow r=2a\\cos\\theta',
        intuicion: 'El círculo x²+y²=2ax pasa por el origen. En polares es r=2a·cosθ, θ ∈ [−π/2, π/2].',
        hack: '💡 Si el círculo pasa por el origen, siempre se escribe como r = f(θ), no como r = constante.',
      },
    ]
  },
  {
    id: 'triples',
    titulo: 'Integrales Triples',
    conceptos: [
      {
        nombre: 'Integral Triple Rectangular',
        formula: '\\iiint_E f(x,y,z)\\,dV = \\int_a^b\\int_{g_1(x)}^{g_2(x)}\\int_{u_1(x,y)}^{u_2(x,y)} f\\,dz\\,dy\\,dx',
        intuicion: 'Extiende la integral doble a 3D. El orden de integración puede ser cualquiera de 6 (3! = 6).',
        hack: '💡 Integra primero la variable cuyos límites son más simples (idealmente constantes).',
      },
      {
        nombre: 'Volumen con integral triple',
        formula: 'V = \\iiint_E dV = \\iiint_E 1\\,dV',
        intuicion: 'La integral triple de 1 sobre E da el volumen del sólido E.',
        hack: '💡 Para hallar volumen sin función f: pon f=1 y estructura los límites desde la región.',
      },
      {
        nombre: 'Coordenadas Cilíndricas',
        formula: 'x = r\\cos\\theta,\\;y = r\\sin\\theta,\\;z = z \\qquad dV = r\\,dr\\,d\\theta\\,dz',
        intuicion: 'Polares + z sin cambios. Úsalas cuando la región tiene simetría alrededor del eje z (cilindros, conos).',
        hack: '💡 Cilíndricas = polares en xy, con z libre. Si ves x²+y² en los límites, piensa en r².',
      },
      {
        nombre: 'Coordenadas Esféricas',
        formula: 'x=\\rho\\sin\\phi\\cos\\theta,\\;y=\\rho\\sin\\phi\\sin\\theta,\\;z=\\rho\\cos\\phi \\qquad dV=\\rho^2\\sin\\phi\\,d\\rho\\,d\\phi\\,d\\theta',
        intuicion: 'ρ es la distancia al origen, φ es el ángulo desde el eje z (0 a π), θ es el ángulo en xy (0 a 2π).',
        hack: '💡 El Jacobiano ρ²sinφ NUNCA se olvida. Es la "penalización" por curvar el espacio.',
      },
      {
        nombre: 'x²+y²+z² en esféricas',
        formula: 'x^2+y^2+z^2 = \\rho^2 \\qquad z = \\rho\\cos\\phi \\qquad x^2+y^2 = \\rho^2\\sin^2\\phi',
        intuicion: 'Estas identidades son las que convierten integrales con esferas en integrales simples.',
        hack: '💡 Esfera x²+y²+z²=R² → ρ de 0 a R. Cono z=√(x²+y²) → φ=π/4.',
      },
    ]
  },
  {
    id: 'cil-vs-esf',
    titulo: 'Cilíndricas vs Esféricas: ¿Cuándo usar cuál?',
    conceptos: [
      {
        nombre: 'Usa Cilíndricas cuando...',
        formula: '\\text{Cilindro: } x^2+y^2=R^2 \\quad \\text{Cono: } z^2=x^2+y^2',
        intuicion: 'La región es un cilindro, un cono, o tiene simetría alrededor del eje z SIN ser una esfera.',
        hack: '💡 Clave: si los límites de z dependen de r (o de x,y), cilíndricas. Si todo depende de la distancia al origen, esféricas.',
      },
      {
        nombre: 'Usa Esféricas cuando...',
        formula: '\\text{Esfera: } x^2+y^2+z^2=R^2 \\quad \\text{Semiesfera, bola}',
        intuicion: 'La región es una esfera, semiesfera, o la función integrando tiene x²+y²+z² como factor.',
        hack: '💡 Si la integral tiene (x²+y²+z²)^n o e^{-(x²+y²+z²)}, usa esféricas sin dudar.',
      },
    ]
  },
  {
    id: 'vectoriales',
    titulo: 'Funciones Vectoriales',
    conceptos: [
      {
        nombre: 'Definición',
        formula: '\\mathbf{r}(t) = f(t)\\,\\mathbf{i} + g(t)\\,\\mathbf{j} + h(t)\\,\\mathbf{k} = \\langle f(t), g(t), h(t) \\rangle',
        intuicion: 'Una función que a cada número real t le asigna un vector en ℝ³. La curva trazada es la imagen de r.',
        hack: '💡 Piénsalo como la posición de una partícula en el tiempo t.',
      },
      {
        nombre: 'Dominio',
        formula: '\\text{Dom}(\\mathbf{r}) = \\text{Dom}(f) \\cap \\text{Dom}(g) \\cap \\text{Dom}(h)',
        intuicion: 'El dominio es la intersección de los dominios de cada componente. Busca restricciones de cada función.',
        hack: '💡 Raíces pares: argumento ≥ 0. Logaritmos: argumento > 0. Denominadores: ≠ 0.',
      },
      {
        nombre: 'Límite',
        formula: '\\lim_{t\\to a}\\mathbf{r}(t) = \\left\\langle \\lim_{t\\to a}f(t),\\; \\lim_{t\\to a}g(t),\\; \\lim_{t\\to a}h(t) \\right\\rangle',
        intuicion: 'El límite de una función vectorial existe si y solo si existen los límites de cada componente.',
        hack: '💡 Calcula los 3 límites por separado. Si alguno no existe, el límite vectorial no existe.',
      },
      {
        nombre: 'Derivada',
        formula: "\\mathbf{r}'(t) = \\langle f'(t), g'(t), h'(t) \\rangle",
        intuicion: 'El vector tangente a la curva en t. Apunta en la dirección de movimiento de la partícula.',
        hack: "💡 El vector tangente unitario: T(t) = r'(t)/|r'(t)|. Normaliza dividiendo por la magnitud.",
      },
      {
        nombre: 'Vector tangente unitario',
        formula: "\\mathbf{T}(t) = \\frac{\\mathbf{r}'(t)}{|\\mathbf{r}'(t)|}",
        intuicion: 'Dirección pura del movimiento, sin información de velocidad. Tiene magnitud 1 siempre.',
        hack: "💡 Para evaluar T en t=a: calcula r'(a) primero, luego divide por su norma.",
      },
      {
        nombre: 'Integral de función vectorial',
        formula: '\\int \\mathbf{r}(t)\\,dt = \\left\\langle \\int f\\,dt,\\; \\int g\\,dt,\\; \\int h\\,dt \\right\\rangle + \\mathbf{C}',
        intuicion: 'Integra componente a componente. La constante de integración C es un vector constante.',
        hack: '💡 C = ⟨C₁, C₂, C₃⟩. Si hay condición inicial r(t₀)=r₀, úsala para encontrar cada Cᵢ.',
      },
    ]
  },
]

export default function Conceptos() {
  const [abierto, setAbierto] = useState(null)

  return (
    <div>
      <h1>📚 Conceptos Clave</h1>
      <p style={{ color: 'var(--text2)', marginBottom: '1.5rem' }}>
        Todos los conceptos del parcial con fórmulas, intuición y hacks de memorización rápida.
      </p>

      {temas.map(tema => (
        <div key={tema.id} style={{ marginBottom: '2rem' }}>
          <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}>{tema.titulo}</h2>
          {tema.conceptos.map((c, i) => {
            const key = `${tema.id}-${i}`
            const open = abierto === key
            return (
              <div key={key} className="card" style={{ cursor: 'pointer', marginBottom: '0.6rem' }}
                onClick={() => setAbierto(open ? null : key)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{c.nombre}</strong>
                  <span style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{open ? '▲' : '▼'}</span>
                </div>
                {open && (
                  <div style={{ marginTop: '0.8rem' }}>
                    <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '0.6rem 1rem', marginBottom: '0.7rem', textAlign: 'center' }}>
                      <Math tex={c.formula} display={true} />
                    </div>
                    <p style={{ color: 'var(--text2)', fontSize: '0.9rem' }}><strong style={{ color: 'var(--accent2)' }}>Intuición: </strong>{c.intuicion}</p>
                    <p style={{ background: 'rgba(124,131,253,0.1)', borderLeft: '3px solid var(--accent)', padding: '0.5rem 0.8rem', borderRadius: '0 6px 6px 0', fontSize: '0.88rem', marginTop: '0.5rem', marginBottom: 0 }}>
                      {c.hack}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      {/* Tabla de diferencias */}
      <h2>🔀 Tabla comparativa: Coordenadas</h2>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              {['Propiedad','Rectangulares','Cilíndricas','Esféricas'].map(h => (
                <th key={h} style={{ padding: '0.5rem', textAlign: 'left', color: 'var(--accent2)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['Variables','x, y, z','r, θ, z','ρ, φ, θ'],
              ['Jacobiano','1','r','ρ²sinφ'],
              ['dV','dx dy dz','r dr dθ dz','ρ²sinφ dρ dφ dθ'],
              ['Rangos típicos','—','r≥0, θ∈[0,2π]','ρ≥0, φ∈[0,π], θ∈[0,2π]'],
              ['Cuando usar','Siempre base','Cilindros, conos','Esferas, bolas'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i%2===0?'transparent':'rgba(255,255,255,0.02)' }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: '0.5rem', color: j===0?'var(--text2)':'var(--text)' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
