import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight } from "lucide-react"
import { categories } from "./data"
import { useReducedMotion } from "./cinematic"
import "./ingredientUniverse.css"

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

const scattered = [[.14,.3],[.44,.1],[.8,.21],[.9,.54],[.72,.84],[.36,.88],[.1,.65]]
const compact = [[.22,.08],[.78,.1],[.16,.3],[.82,.76],[.18,.73],[.5,.92],[.84,.3]]
const gathered = [[.2,.23],[.8,.23],[.18,.78],[.82,.78]]
const gatheredCompact = [[.23,.15],[.77,.23],[.23,.78],[.77,.86]]
const bubbleSizes = [136, 120, 112, 144, 128, 112, 128]

export function IngredientUniverse() {
  const root = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [instant, setInstant] = useState(false)
  const small = size.width < 800
  const phone = size.width < 500
  const running = visible && pageVisible && !reduce

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
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    if (root.current) observer.observe(root.current)
    const visibility = () => setPageVisible(!document.hidden)
    document.addEventListener("visibilitychange", visibility)
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility) }
  }, [])

  function choose(index: number | null, keyboard: boolean) {
    setInstant(keyboard)
    setActive(index)
  }

  return <section ref={root} className="ingredient-universe wrap" aria-labelledby="ingredient-universe-title"
    data-family={active === null ? "all" : categories[active].id} data-running={running} data-instant={instant}>
    <div ref={field} className="ingredient-universe__field">
      <div className="ingredient-universe__centre" aria-live="polite" aria-atomic="true">
        <h2 id="ingredient-universe-title" className="heading-1">{active === null ? "Ideas come\ntogether." : families[active].title}</h2>
        <p className="body-5">{active === null ? "Find what comes next." : "An ingredient for your next idea."}</p>
      </div>
      {families.flatMap((family, familyIndex) => family.items.map(([label, product], itemIndex) => {
        const shown = size.width > 0 && (active === null ? itemIndex === 0 : active === familyIndex)
        const scatteredPoint = small ? compact[familyIndex] : scattered[familyIndex]
        const point = active === familyIndex ? (small ? gatheredCompact : gathered)[itemIndex] : scatteredPoint
        const diameter = phone ? (active === familyIndex ? 104 : 88) : small ? (active === familyIndex ? 128 : 112) : (active === familyIndex ? 144 : bubbleSizes[familyIndex])
        const margin = diameter / 2 + (phone ? 16 : 28)
        let x = Math.max(margin, Math.min(size.width - margin, point[0] * size.width))
        const y = Math.max(margin, Math.min(size.height - margin, point[1] * size.height))
        if (active !== null && active !== familyIndex) x += point[0] < .5 ? -40 : 40
        return <div key={`${familyIndex}-${product}`} className="ingredient-universe__node" aria-hidden={!shown}
          data-shown={shown} data-family={categories[familyIndex].id}
          style={{ width: diameter, height: diameter, transform: `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${shown ? 1 : .85})`, opacity: shown ? 1 : 0 }}>
          <Link className="ingredient-universe__ingredient title-3" tabIndex={shown ? 0 : -1}
            aria-label={`Enquire about ${label}`} to={`/enquiry?category=${encodeURIComponent(categories[familyIndex].title)}&product=${encodeURIComponent(product)}`}>
            <span className="ingredient-universe__drift ingredient-universe__bubble" style={{ animationDuration: `${18 + familyIndex % 3 * 4}s`, animationDelay: `${-familyIndex * 2.3 - itemIndex * 1.7}s` }}>
              <span className="ingredient-universe__label">{label}<span className="ingredient-universe__arrow" aria-hidden="true">↗</span></span>
            </span>
          </Link>
        </div>
      }))}
    </div>
    <div className="ingredient-universe__families" role="group" aria-label="Choose an ingredient family">
      <button type="button" className="button-sm" aria-pressed={active === null} onClick={event => choose(null, event.detail === 0)}>All ingredients</button>
      {families.map((family, index) => <button type="button" className="button-sm" key={family.label} aria-pressed={active === index}
        onClick={event => choose(index, event.detail === 0)}>{family.label}</button>)}
    </div>
    <div className="ingredient-universe__footer">
      <Link className="ingredient-universe__collection button-sm" to={active === null ? "/products" : `/products#${categories[active].id}`}>
        {active === null ? "Explore the full portfolio" : `Explore ${families[active].label.toLowerCase()}`}<ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </div>
  </section>
}
