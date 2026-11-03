import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { Link } from "react-router"
import { ArrowDown, ArrowUpRight } from "lucide-react"
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
  const trigger = useRef<ScrollTrigger | null>(null)
  const draw = useRef<(progress: number) => void>(() => {})
  const progress = useRef(0)
  const chapterRef = useRef(0)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
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
        const shown = active === null ? item === 0 : family === active
        if (!shown) { node.style.opacity = "0"; return }
        if (reduce) {
          node.style.transform = "none"
          node.style.opacity = "1"
          if (rim) rim.style.transform = "none"
          return
        }
        const count = active === null ? families.length : 4
        const order = active === null ? family : item
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
  }, [active, size, phone, reduce])

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
    data-family={active === null ? "all" : categories[active].id} data-reduced={reduce} data-chapter={chapter}>
    <h2 id="ingredient-universe-title" className="sr-only">A world of ingredients</h2>
    <div className="ingredient-universe__stage">
      <div className="ingredient-universe__layout wrap">
        <div ref={field} className="ingredient-universe__field">
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
              const shown = size.width > 0 && (active === null ? itemIndex === 0 : active === familyIndex)
              const diameter = reduce ? (phone ? 88 : 112) : phone ? (size.width < 320 ? (active === familyIndex ? 72 : 64) : (active === familyIndex ? 88 : 76)) : small ? (active === familyIndex ? 120 : 112) : Math.min(active === familyIndex ? 144 : bubbleSizes[familyIndex], size.height < 520 ? 104 : 144)
              return <div key={`${familyIndex}-${product}`} className="ingredient-universe__node" aria-hidden={!shown}
                data-shown={shown} data-family={categories[familyIndex].id} data-family-index={familyIndex} data-item-index={itemIndex} data-diameter={diameter}
                style={{ width: diameter, height: diameter, "--bubble-tint": tints[familyIndex] } as CSSProperties}>
                <Link className="ingredient-universe__ingredient title-3" tabIndex={shown ? 0 : -1}
                  aria-label={`Enquire about ${label}`} to={`/enquiry?category=${encodeURIComponent(categories[familyIndex].title)}&product=${encodeURIComponent(product)}`}>
                  <span className="ingredient-universe__bubble">
                    <span className="ingredient-universe__rim" aria-hidden="true" />
                    <span className="ingredient-universe__label">{label}<span className="ingredient-universe__arrow" aria-hidden="true">↗</span></span>
                  </span>
                </Link>
              </div>
            }))}
          </div>
        </div>
        <div className="ingredient-universe__controls">
          <div className="ingredient-universe__families" role="group" aria-label="Choose an ingredient family">
            <button type="button" className="button-sm" aria-pressed={active === null} onClick={() => setActive(null)}>All ingredients</button>
            {families.map((family, index) => <button type="button" className="button-sm" key={family.label} aria-pressed={active === index}
              onClick={() => setActive(index)}>{family.label}</button>)}
          </div>
          <label className="ingredient-universe__mobile-family">
            <span className="sr-only">Ingredient family</span>
            <select value={active === null ? "all" : String(active)} onChange={event => setActive(event.target.value === "all" ? null : Number(event.target.value))}>
              <option value="all">All ingredients</option>
              {families.map((family, index) => <option key={family.label} value={index}>{family.label}</option>)}
            </select>
          </label>
          <Link className="ingredient-universe__collection button-sm" to={active === null ? "/products" : `/products#${categories[active].id}`}>
            {active === null ? "View the portfolio" : "View the collection"}<ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        {!reduce && <p className="ingredient-universe__scroll-cue" aria-hidden="true"><ArrowDown size={12} />{chapter < 2 ? "Scroll to unfold the story" : "Keep scrolling to explore"}</p>}
      </div>
    </div>
  </section>
}
