import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight, Pause, Play } from "lucide-react"
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

const scattered = [[.12,.08],[.38,.09],[.64,.08],[.88,.1],[.2,.28],[.8,.28],[.1,.52],[.9,.52],[.2,.75],[.8,.75],[.12,.93],[.37,.91],[.63,.93],[.88,.92]]
const compact = [[.22,.08],[.76,.16],[.2,.27],[.78,.73],[.22,.85],[.76,.94],[.78,.3]]
const gathered = [[.2,.23],[.8,.23],[.18,.78],[.82,.78]]
const gatheredCompact = [[.23,.15],[.77,.23],[.23,.78],[.77,.86]]

export function IngredientUniverse() {
  const root = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [paused, setPaused] = useState(false)
  const [instant, setInstant] = useState(false)
  const small = size.width < 800
  const running = visible && pageVisible && !paused && !reduce

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
        const shown = size.width > 0 && (active === null ? itemIndex < (small ? 1 : 2) : active === familyIndex)
        const scatteredPoint = small ? compact[familyIndex] : scattered[familyIndex * 2 + itemIndex % 2]
        const point = active === familyIndex ? (small ? gatheredCompact : gathered)[itemIndex] : scatteredPoint
        const margin = small ? 68 : 96
        let x = Math.max(margin, Math.min(size.width - margin, point[0] * size.width))
        const verticalMargin = small ? 40 : 56
        const y = Math.max(verticalMargin, Math.min(size.height - verticalMargin, point[1] * size.height))
        if (active !== null && active !== familyIndex) x += point[0] < .5 ? -40 : 40
        return <div key={`${familyIndex}-${product}`} className="ingredient-universe__node" aria-hidden={!shown}
          data-shown={shown} data-family={categories[familyIndex].id}
          style={{ transform: `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${shown ? 1 : .85})`, opacity: shown ? 1 : 0 }}>
          <Link className={`ingredient-universe__ingredient ${["title-6", "title-7", "title-1"][familyIndex % 3]}`} tabIndex={shown ? 0 : -1}
            aria-label={`Enquire about ${label}`} to={`/enquiry?category=${encodeURIComponent(categories[familyIndex].title)}&product=${encodeURIComponent(product)}`}>
            <span className="ingredient-universe__drift" style={{ animationDuration: `${9 + familyIndex % 3 * 2}s`, animationDelay: `${-familyIndex - itemIndex * 1.7}s` }}>
              {label}<span className="ingredient-universe__arrow" aria-hidden="true">↗</span>
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
      {!reduce && <button className="ingredient-universe__motion caption-2" type="button"
        onClick={() => setPaused(value => !value)}>{paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}{paused ? "Resume motion" : "Pause motion"}</button>}
    </div>
  </section>
}
