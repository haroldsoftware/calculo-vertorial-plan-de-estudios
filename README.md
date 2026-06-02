# Parcial Cálculo Vectorial — App de Estudio

Aplicación web interactiva para preparar el parcial de Cálculo Vectorial.

## Cómo correr

```bash
cd parcial-app
npm install
npm run dev
```

Abre http://localhost:5173 en tu navegador.

## Páginas

| Ruta | Contenido |
|------|-----------|
| `/` | Conceptos Clave con fórmulas y hacks de memorización |
| `/plan` | Plan de estudios con ejemplos resueltos paso a paso |
| `/ejercicios-faciles` | 15 preguntas fáciles con feedback inmediato |
| `/ejercicios-dificiles` | 15 preguntas difíciles estilo quiz de la profesora |
| `/hacks` | Estrategias de descarte y guías por tipo de problema |

## Temas cubiertos

1. Integrales Dobles Rectangulares (Fubini, Tipos I y II, Área, Volumen)
2. Integrales Dobles en Coordenadas Polares (Jacobiano r, regiones circulares)
3. Integrales Triples (Rectangulares, Cilíndricas, Esféricas)
4. Funciones Vectoriales (Dominio, Límites, Derivada, T(t), Integrales)

## Stack

- React 19 + Vite
- KaTeX (fórmulas matemáticas)
- React Router DOM (navegación)
