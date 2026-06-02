import { useEffect, useRef } from 'react'
import katex from 'katex'

export default function Math({ tex, display = false }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    try {
      katex.render(tex, ref.current, {
        displayMode: display,
        throwOnError: false,
        strict: false,
      })
    } catch (e) {
      if (ref.current) ref.current.textContent = tex
    }
  }, [tex, display])
  return <span ref={ref} style={display ? { display: 'block', overflowX: 'auto', padding: '0.5rem 0' } : { display: 'inline' }} />
}
