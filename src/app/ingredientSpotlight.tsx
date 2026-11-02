import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { useReducedMotion } from "./cinematic"
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react"
import { IngredientPhoto } from "./ingredientPhoto"
import { landingImages } from "./landingData"
import "./ingredientSpotlight.css"

const collections = [
  { name: "Coconut products", image: landingImages.coconut, alt: "Fresh coconut with a white splash and a flower", to: "/products#coconut-products" },
  { name: "Fruit ingredients", image: landingImages.fig, alt: "A sliced purple fig with water droplets", to: "/products#juice-concentrates" },
  { name: "Colour & texture", image: landingImages.powders, alt: "Purple, green and yellow ingredient powders", to: "/products#food-colours" },
  { name: "Dessert inspiration", image: landingImages.dessert, alt: "Blueberry pancakes with syrup", to: "/applications" },
]

export function IngredientSpotlight() {
  const section = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [instant, setInstant] = useState(false)
  const running = playing && visible && pageVisible && !hovered && !reduce

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25), { threshold: 0.25 })
    if (section.current) observer.observe(section.current)
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setActive(index => (index + 1) % collections.length), 6000)
    return () => window.clearTimeout(timer)
  }, [running, active])

  function select(index: number, keyboard: boolean) {
    setInstant(keyboard)
    setPlaying(false)
    setActive((index + collections.length) % collections.length)
  }

  return <section ref={section} className="ingredient-spotlight wrap" aria-labelledby="ingredient-spotlight-title"
    aria-roledescription="carousel" data-active={active} data-running={running} data-instant={instant}
    data-hovered={hovered} data-visible={visible} data-page-visible={pageVisible}
    onFocusCapture={event => { if (!(event.target as HTMLElement).closest(".ingredient-spotlight__play")) setPlaying(false) }}
    onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true) }}
    onPointerLeave={() => setHovered(false)}>
    <div className="ingredient-spotlight__copy">
      <h2 id="ingredient-spotlight-title" className="heading-2">A world of<br />possibilities.</h2>
      <p className="body-3">Fruit, coconut, colour and texture. Find the inspiration for your next creation.</p>
      <Link className="ingredient-spotlight__link button-sm" to={collections[active].to}>
        Explore the collection <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <div className="ingredient-spotlight__controls" role="group" aria-label="Browse ingredient inspiration">
        <button type="button" aria-label="Previous collection" onClick={event => select(active - 1, event.detail === 0)}><ArrowLeft size={20} aria-hidden="true" /></button>
        <div className="ingredient-spotlight__choices">
          {collections.map((collection, index) => <button type="button" key={collection.name} aria-label={`Show ${collection.name}`}
            aria-pressed={index === active} onClick={event => select(index, event.detail === 0)}><span /></button>)}
        </div>
        <button type="button" aria-label="Next collection" onClick={event => select(active + 1, event.detail === 0)}><ArrowRight size={20} aria-hidden="true" /></button>
        {!reduce && <button type="button" className="ingredient-spotlight__play" aria-label={playing ? "Pause ingredient animation" : "Play ingredient animation"}
          onClick={() => { setInstant(false); setPlaying(value => !value) }}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>}
      </div>
    </div>
    <div className="ingredient-spotlight__deck" aria-live={playing && !reduce ? "off" : "polite"} aria-atomic="true">
      {collections.map((collection, index) => {
        const offset = (index - active + collections.length) % collections.length
        const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === collections.length - 1 ? "previous" : "hidden"
        return <div key={collection.name} className="ingredient-spotlight__card" data-position={position}
          role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${collections.length}`} aria-hidden={index !== active}>
          <Link className="ingredient-spotlight__card-link" to={collection.to} tabIndex={index === active ? 0 : -1} aria-label={`Explore ${collection.name}`}>
            <div className="ingredient-spotlight__photo"><IngredientPhoto src={collection.image} alt={collection.alt} loading="lazy" sizes="(max-width: 700px) 80vw, 40vw" /></div>
            <div className="ingredient-spotlight__caption"><h3 className="title-1">{collection.name}</h3><ArrowUpRight size={22} aria-hidden="true" /></div>
          </Link>
        </div>
      })}
    </div>
  </section>
}
