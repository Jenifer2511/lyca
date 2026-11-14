import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { Link } from "react-router"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { categories } from "./data"
import { useReducedMotion } from "./cinematic"
import "./ingredientUniverse.css"

gsap.registerPlugin(ScrollTrigger)

const families = [
  { label: "Fruit", title: "Fruit.", items: [
    ["Alphonso mango", "Alphonso Mango Pulp"], ["Guava", "White Guava Juice Concentrate / Pulp"],
    ["Tomato", "Tomato Paste 36–38 (CB & HB)"], ["Chilli", "Red and Green Chilli Puree"],
  ] },
  { label: "Coconut", title: "Coconut.", items: [
    ["Coconut cream", "Coconut Cream Powder"], ["Virgin coconut oil", "Virgin Coconut Oil"],
    ["Coconut sugar", "Coconut Sugar"], ["Coconut milk", "Aseptic Coconut Milk & Water"],
  ] },
  { label: "Coffee & cocoa", title: "Coffee\n& cocoa.", items: [
    ["Cocoa powder", "Cocoa Powder"], ["Coffee extract", "Coffee Extract"],
    ["Instant coffee", "Spray-Dried Instant Coffee"], ["Coffee oil", "Coffee Oil"],
  ] },
  { label: "Dairy", title: "Dairy.", items: [
    ["Whole milk powder", "Whole Milk Powder"], ["Whey protein", "Whey Protein Powder"],
    ["Sweet cream butter", "Unsalted Sweet Cream Lactic Butter"], ["Cheese powder", "Cheese Powder"],
  ] },
  { label: "Fruit preparations", title: "Fruit\npreparations.", items: [
    ["Fruit for ice cream", "Ice cream"], ["Fruit for bakery", "Bakery products"],
    ["Fruit for desserts", "Desserts"], ["Fruit for beverages", "Beverages"],
  ] },
  { label: "Powders", title: "Powders.", items: [
    ["Mango powder", "Ripe Mango"], ["Honey powder", "Honey"],
    ["Orange powder", "Orange"], ["Tamarind powder", "Tamarind"],
  ] },
  { label: "Colours", title: "Colour.", items: [
    ["Beetroot", "Beetroot"], ["Spirulina", "Spirulina"],
    ["Black carrot", "Black Carrot"], ["Hibiscus", "Hibiscus"],
  ] },
]

const bubbleLabels = ["Juice & Fruit Ingredients", "Coconut Products", "Coffee & Cocoa", "Dairy Ingredients", "Fruit Preparations", "Spray-Dried Powders", "Food Colors"]
const tints = ["255 151 119", "130 228 185", "229 171 112", "147 210 255", "242 143 201", "192 163 255", "104 225 218"]
const bubbleSizes = [136, 120, 112, 144, 128, 112, 128]
const stories = [
  { title: "From\nnature.", copy: "Fruit, coconut, cocoa. Every idea has a beginning." },
  { title: "Find your\nsignature.", copy: "Bring flavour, texture and colour into your next creation." },
  { title: "Made for\nyour craft.", copy: "Discover the ingredient family that brings your idea to life." },
]

export function IngredientUniverse() {
  const root = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const webgl = useRef<HTMLCanvasElement>(null)
  const trigger = useRef<ScrollTrigger | null>(null)
  const draw = useRef<(progress: number) => void>(() => {})
  const progress = useRef(0)
  const chapterRef = useRef(0)
  const reduce = useReducedMotion()
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [chapter, setChapter] = useState(0)
  const phone = size.width < 500
  const small = size.width < 800

  useLayoutEffect(() => {
    const element = field.current
    if (!element) return
    const measure = () => setSize({ width: element.clientWidth, height: element.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = webgl.current
    if (!canvas || reduce || !size.width || !size.height) return
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "low-power" })
    if (!gl) return
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }
    const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}")
    const fragment = compile(gl.FRAGMENT_SHADER, `precision highp float;
      varying vec2 uv;
      uniform vec2 resolution;
      uniform float time;
      uniform float scroll;
      float hash(float n){return fract(sin(n*127.1)*43758.5453);}
      void main(){
        vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
        float t=time*.12+scroll*1.35;
        float angle=atan(p.y,p.x);
        float radius=length(p);
        float warp=sin(angle*3.+t)*.018+sin(angle*7.-t*.7)*.009;
        float d1=abs(radius-(.29+warp));
        float d2=abs(radius-(.47+sin(angle*2.-t*.55)*.016));
        float d3=abs(radius-(.66+sin(angle*4.+t*.38)*.022));
        float filament=abs(sin(angle*5.+radius*19.-t*.8));
        vec3 color=vec3(.20,.92,.68)*(exp(-d1*34.)*.07+exp(-d1*180.)*.12);
        color+=vec3(.66,.38,.96)*(exp(-d2*32.)*.055+exp(-d2*170.)*.1);
        color+=vec3(1.,.61,.35)*(exp(-d3*28.)*.04+exp(-d3*150.)*.08);
        color+=vec3(.37,.69,1.)*filament*exp(-abs(radius-.49)*90.)*.025;
        float alpha=max(max(color.r,color.g),color.b);
        for(int i=0;i<16;i++){
          float n=float(i);
          float a=hash(n+2.)*6.28318+t*(.16+hash(n+8.)*.12);
          float r=.22+hash(n+19.)*.48;
          vec2 dotPosition=vec2(cos(a),sin(a))*r;
          float d=length(p-dotPosition);
          float glow=exp(-d*190.)*.045;
          float core=exp(-d*760.)*.2;
          vec3 tint=mix(vec3(.30,.95,.72),vec3(.81,.53,1.),hash(n+32.));
          color+=tint*(glow+core);
          alpha=max(alpha,glow+core);
        }
        alpha=clamp(alpha*.72,0.,.34);
        gl_FragColor=vec4(color*alpha,alpha);
      }`)
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
      return
    }
    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }
    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(size.width * ratio)
    canvas.height = Math.round(size.height * ratio)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const resolution = gl.getUniformLocation(program, "resolution")
    const time = gl.getUniformLocation(program, "time")
    const scroll = gl.getUniformLocation(program, "scroll")
    gl.uniform2f(resolution, canvas.width, canvas.height)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)
    let frame = 0
    let visible = false
    const render = (now: number) => {
      frame = 0
      if (!visible) return
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(time, now / 1000)
      gl.uniform1f(scroll, progress.current)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(render)
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(render)
      if (!visible && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }, { rootMargin: "100px" })
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
    }
  }, [reduce, size.width, size.height])

  useLayoutEffect(() => {
    const element = root.current
    if (!element || !size.width) return
    const nodes = Array.from(element.querySelectorAll<HTMLElement>(".ingredient-universe__node")).map(node => ({
      node,
      family: Number(node.dataset.familyIndex),
      item: Number(node.dataset.itemIndex),
      diameter: Number(node.dataset.diameter),
      rim: node.querySelector<HTMLElement>(".ingredient-universe__rim"),
    }))
    draw.current = amount => {
      progress.current = amount
      element.dataset.progress = amount.toFixed(4)
      nodes.forEach(({ node, family, item, diameter, rim }) => {
        const shown = item === 0
        if (!shown) { node.style.opacity = "0"; return }
        if (reduce) {
          node.style.transform = "none"
          node.style.opacity = "1"
          if (rim) rim.style.transform = "none"
          return
        }
        const count = families.length
        const order = family
        const angle = -Math.PI / 2 + order / count * Math.PI * 2 + amount * Math.PI * 2.2
        const margin = diameter * .55 + (phone ? 8 : 18)
        const spread = .96 + .04 * Math.sin(amount * Math.PI)
        const radiusX = Math.max(0, size.width / 2 - margin) * spread
        const radiusY = Math.max(0, size.height / 2 - margin) * spread
        const depth = (Math.sin(angle) + 1) / 2
        const x = size.width / 2 + Math.cos(angle) * radiusX
        const y = size.height / 2 + Math.sin(angle) * radiusY
        node.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) translate(-50%,-50%) scale(${(.9 + .14 * depth).toFixed(4)})`
        node.style.opacity = String(.8 + .2 * depth)
        node.style.zIndex = String(2 + Math.round(depth * 20))
        if (rim) rim.style.transform = `rotate(${amount * 720 + family * 42}deg)`
      })
      const nextChapter = reduce ? 0 : Math.min(stories.length - 1, Math.floor(amount * stories.length))
      if (chapterRef.current !== nextChapter) {
        chapterRef.current = nextChapter
        setChapter(nextChapter)
      }
    }
    draw.current(progress.current)
  }, [size, phone, reduce])

  useLayoutEffect(() => {
    const element = root.current
    if (!element) return
    if (reduce) {
      progress.current = 0
      draw.current(0)
      return
    }
    const state = { progress: 0 }
    const context = gsap.context(() => {
      const tween = gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: () => draw.current(state.progress),
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom bottom",
          scrub: .65,
          invalidateOnRefresh: true,
          onRefresh: () => draw.current(state.progress),
        },
      })
      trigger.current = tween.scrollTrigger || null
    }, element)
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(refresh)
      trigger.current = null
      context.revert()
    }
  }, [reduce])

  return <section ref={root} id="ingredient-story" className="ingredient-universe" aria-labelledby="ingredient-universe-title"
    data-family="all" data-reduced={reduce} data-chapter={chapter}>
    <h2 id="ingredient-universe-title" className="sr-only">A world of ingredients</h2>
    <div className="ingredient-universe__stage">
      <div className="ingredient-universe__layout wrap">
        <div ref={field} className="ingredient-universe__field">
          <canvas ref={webgl} className="ingredient-universe__webgl" aria-hidden="true" />
          <div className="ingredient-universe__centre">
            {stories.map((story, index) => <div key={story.title} className="ingredient-universe__story"
              data-active={chapter === index} aria-hidden={!reduce && chapter !== index}>
              <h3 className="heading-1">{story.title}</h3>
              <p className="body-5">{story.copy}</p>
            </div>)}
            <div className="ingredient-universe__chapter-marks" aria-hidden="true">
              {stories.map((story, index) => <span key={story.title} data-active={chapter === index} />)}
            </div>
          </div>
          <div className="ingredient-universe__nodes">
            {families.flatMap((family, familyIndex) => family.items.map(([label, product], itemIndex) => {
              const shown = size.width > 0 && itemIndex === 0
              const diameter = reduce ? (phone ? 88 : 112) : phone ? (size.width < 320 ? 64 : 76) : small ? 112 : Math.min(bubbleSizes[familyIndex], size.height < 520 ? 104 : 144)
              return <div key={`${familyIndex}-${product}`} className="ingredient-universe__node" aria-hidden={!shown}
                data-shown={shown} data-family={categories[familyIndex].id} data-family-index={familyIndex} data-item-index={itemIndex} data-diameter={diameter}
                style={{ width: diameter, height: diameter, "--bubble-tint": tints[familyIndex] } as CSSProperties}>
                <Link className="ingredient-universe__ingredient title-3" tabIndex={shown ? 0 : -1}
                  aria-label={`Enquire about ${bubbleLabels[familyIndex]}`} to={`/enquiry?category=${encodeURIComponent(categories[familyIndex].title)}&product=${encodeURIComponent(product)}`}>
                  <span className="ingredient-universe__bubble">
                    <span className="ingredient-universe__rim" aria-hidden="true" />
                    <span className="ingredient-universe__label">{bubbleLabels[familyIndex]}<span className="ingredient-universe__arrow" aria-hidden="true">↗</span></span>
                  </span>
                </Link>
              </div>
            }))}
          </div>
        </div>
        {!reduce && <p className="ingredient-universe__scroll-cue" aria-hidden="true"><ArrowDown size={12} />{chapter < 2 ? "Scroll to unfold the story" : "Keep scrolling to explore"}</p>}
      </div>
    </div>
  </section>
}
