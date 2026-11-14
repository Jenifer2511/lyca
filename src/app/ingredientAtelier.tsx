import { useState } from "react"
import { Link } from "react-router"
import { ArrowUpRight } from "lucide-react"
import { landingStories } from "./landingData"
import { images } from "./data"
import { IngredientPhoto } from "./ingredientPhoto"

// The opening coconut photograph belongs to the hero; this later exhibit starts with dairy.
const atelierStories = [{ ...landingStories[0], name: "Dairy ingredients", tag: "DAIRY", image: images.dairyIngredients, alt: "Milk, yoghurt, cheese, butter and milk powder", detail: "From milk powders and whey proteins to butter and cheese powder. Explore ingredients that bring richness and texture to your next product.", to: "/products#dairy-ingredients" }, ...landingStories.slice(1)]
export function IngredientAtelier() {
  const [active, setActive] = useState(0)
  const current = atelierStories[active]
  return <section className="atelier section" aria-labelledby="atelier-title">
    <div className="atelier-intro reveal"><p className="eyebrow">THE INGREDIENT ATELIER / 06 VISUAL STORIES</p><h2 id="atelier-title">A study in <em>good taste.</em></h2><p>Explore the colours, textures and flavours that give your ideas their character.</p></div>
    <div className="atelier-layout">
      <div className="atelier-menu" role="tablist" aria-label="Explore ingredient collections" aria-orientation="vertical">{atelierStories.map((category, i) => <button key={category.tag} id={`atelier-tab-${i}`} role="tab" type="button" aria-selected={active === i} aria-controls="atelier-panel" tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} onKeyDown={event => {
        let next = i
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (i + 1) % atelierStories.length
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (i - 1 + atelierStories.length) % atelierStories.length
        else if (event.key === "Home") next = 0
        else if (event.key === "End") next = atelierStories.length - 1
        else return
        event.preventDefault(); setActive(next); document.getElementById(`atelier-tab-${next}`)?.focus()
      }}><span>{category.name}</span><ArrowUpRight size={18} aria-hidden="true" /></button>)}</div>
      <div className="atelier-exhibit" id="atelier-panel" role="tabpanel" aria-labelledby={`atelier-tab-${active}`} tabIndex={0}>
        <div className="atelier-photograph" key={current.tag}><IngredientPhoto src={current.image} alt={current.alt} loading="lazy" sizes="(max-width: 700px) 90vw, 55vw" /><span className="atelier-plate">LYCA <i>Collection</i><b>0{active + 1}</b></span></div>
        <div className="atelier-caption"><div><p>{current.tag}</p><span>{current.detail}</span></div><Link to={current.to} aria-label={`Explore ${current.name}`}><ArrowUpRight size={24} /></Link></div>
      </div>
    </div>
  </section>
}
