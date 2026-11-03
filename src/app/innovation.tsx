import { useLayoutEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "./cinematic"
import { IngredientPhoto } from "./ingredientPhoto"
import "./innovation.css"

gsap.registerPlugin(ScrollTrigger)

// Local ingredient photography; licensing and source records: IMAGE-SOURCES.json.
const photographs = ["fruit","coconut","coffee","cocoa","dairy","powder","berries","citrus","tomato","colors","mango","patisserie"]
const letters = [
  ["10000","10000","10000","10000","10000","10000","11111"],
  ["10001","10001","01010","00100","00100","00100","00100"],
  ["01111","10000","10000","10000","10000","10000","01111"],
  ["01110","10001","10001","11111","10001","10001","10001"],
]
const pixels = letters.flatMap((letter, letterIndex) => letter.flatMap((row,y) => [...row].flatMap((value,x) => value === "1" ? [{x:letterIndex*6+x,y}] : [])))
const pillars = [
  {title:"Smarter ingredient solutions.",copy:"We continuously explore food ingredients and sourcing opportunities to meet the changing requirements of manufacturers, businesses and consumers.",image:"fruit",alt:"A colourful still life of fruit ingredients",detail:"A broader perspective on sourcing."},
  {title:"Quality, at every step.",copy:"From ingredient selection to supply, we focus on improving quality standards, consistency and reliability. Better possibilities begin with dependable foundations.",image:"cocoa",alt:"Cocoa powder and chocolate ingredients",detail:"Consistency is where confidence begins."},
  {title:"New possibilities. Real applications.",copy:"Emerging food trends, innovative ingredients and evolving applications open up opportunities across the food industry. We look beyond the familiar to explore what an ingredient could become.",image:"patisserie",alt:"Patisserie illustrating creative food applications",detail:"From an ingredient to an experience."},
  {title:"A smarter way to connect.",copy:"Innovation also means making ingredient sourcing and distribution more accessible, reliable and efficient for our business partners. We look for smarter practices that bring people and possibilities closer.",image:"coconut",alt:"Coconut ingredients on a dark surface",detail:"Sourcing. Supply. Meaningful connections."},
  {title:"Your idea. Our starting point.",copy:"Every business has different requirements. We explore flexible ingredient solutions that support our customers’ product development and business goals, beginning with a conversation about what matters to them.",image:"berries",alt:"Fresh berries for food and beverage applications",detail:"Development begins with listening."},
]

export function InnovationPage() {
  const page=useRef<HTMLDivElement>(null)
  const journey=useRef<HTMLElement>(null)
  const reduce=useReducedMotion()
  useLayoutEffect(()=>{
    const root=journey.current
    if(!root||reduce)return
    const tiles=Array.from(root.querySelectorAll<HTMLElement>(".innovation-tile"))
    const intro=root.querySelector<HTMLElement>(".innovation-intro")
    const end=root.querySelector<HTMLElement>(".innovation-resolution")
    const spiral=root.querySelector<HTMLElement>(".innovation-spiral")
    const state={progress:0}
    const draw=()=>{
      const p=state.progress,w=root.clientWidth,h=window.innerHeight
      const unit=Math.min(w*.037,30),size=w<700?104:172
      const morph=gsap.utils.clamp(0,1,(p-.48)/.43)
      const blend=morph*morph*(3-2*morph)
      root.dataset.progress=p.toFixed(4)
      if(spiral)spiral.style.maskImage=p<.2?(w<700?"linear-gradient(180deg,#000,transparent 17%,transparent 58%,#000 75%)":"linear-gradient(90deg,transparent,transparent 43%,#000 68%)"):"none"
      tiles.forEach((tile,i)=>{
        const point=pixels[i],angle=i*.63-p*7.4
        const radius=(90+i*19)*(1-p*.63)
        const cx=w*(.7-.2*Math.min(1,p*2))
        const spiralX=cx+Math.cos(angle)*radius
        const spiralY=h*.52+Math.sin(angle)*radius*.72
        const targetX=w/2+(point.x-11)*unit
        const targetY=h*.5+(point.y-3)*unit
        const x=spiralX+(targetX-spiralX)*blend,y=spiralY+(targetY-spiralY)*blend
        const z=(-i*15+Math.sin(angle)*100)*(1-blend)
        const scale=(.7+.16*Math.sin(angle))*(1-blend)+(unit/size*.87)*blend
        tile.style.width=size+"px";tile.style.height=size+"px"
        tile.style.transform=`translate3d(${x}px,${y}px,${z}px) translate(-50%,-50%) rotateX(${Math.sin(angle)*18*(1-blend)}deg) rotateY(${Math.cos(angle)*28*(1-blend)}deg) rotateZ(${Math.sin(angle)*12*(1-blend)}deg) scale(${scale})`
        tile.style.opacity=String(.82+.18*blend)
        tile.style.borderRadius=(12*(1-blend))+"px"
      })
      if(intro){intro.style.opacity=String(Math.max(0,1-p*4));intro.style.visibility=p>.28?"hidden":"visible"}
      if(end){end.style.opacity=String(gsap.utils.clamp(0,1,(p-.84)/.12));end.style.transform=`translateY(${(1-blend)*24}px)`}
    }
    const context=gsap.context(()=>{
      gsap.to(state,{progress:1,ease:"none",onUpdate:draw,scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:.7,invalidateOnRefresh:true,onRefresh:draw}})
      draw()
    },root)
    const frame=requestAnimationFrame(()=>ScrollTrigger.refresh())
    return()=>{cancelAnimationFrame(frame);context.revert()}
  },[reduce])
  useLayoutEffect(()=>{
    if(reduce||!page.current)return
    const context=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>(".innovation-chapter").forEach(section=>{
        const image=section.querySelector(".innovation-chapter__media")
        if(image)gsap.fromTo(image,{transform:"perspective(1200px) rotateX(6deg) translateY(36px) scale(.96)"},{transform:"perspective(1200px) rotateX(0deg) translateY(-20px) scale(1)",ease:"none",scrollTrigger:{trigger:section,start:"top 90%",end:"bottom 20%",scrub:.6}})
      })
    },page)
    return()=>context.revert()
  },[reduce])
  return <div ref={page} className="innovation-page" data-reduced={reduce}>
    <section ref={journey} className="innovation-journey" aria-labelledby="innovation-title">
      <div className="innovation-stage">
        <div className="innovation-spiral" aria-hidden="true">{pixels.map((pixel,i)=><div className="innovation-tile" key={i}><img src={`/images/${photographs[i%photographs.length]}-480.webp`} alt="" decoding="async" loading={i<12?"eager":"lazy"}/></div>)}</div>
        <div className="innovation-intro">
          <p className="innovation-label">Innovation at LYCA</p>
          <h1 id="innovation-title">Rethink food.<br/>Redefine possibility.</h1>
          <p>Better ingredients. New perspectives.<br/>A world of possibilities, coming together.</p>
          <a href="#innovation-approach" className="innovation-text-link">Explore our approach <ArrowUpRight size={20} aria-hidden="true"/></a>
        </div>
        <div className="innovation-resolution"><p>Many possibilities. One LYCA.</p><span>Building better possibilities, one ingredient at a time.</span></div>
        <span className="innovation-scroll-cue" aria-hidden="true">Scroll inward ↓</span>
      </div>
    </section>
    <section id="innovation-approach" className="innovation-opening wrap">
      <p className="innovation-label">Our perspective</p>
      <h2>Innovation starts<br/>with a better question.</h2>
      <div className="innovation-opening__body"><p>At LYCA Foods & Ingredients, innovation is more than introducing new products. It is about discovering better ways to source, deliver, develop and experience food ingredients.</p><p>We believe the future of the food industry lies in combining quality ingredients, evolving consumer needs, responsible sourcing and smarter business practices.</p></div>
    </section>
    {pillars.map((pillar,index)=><section key={pillar.title} className={`innovation-chapter wrap innovation-chapter--${index+1}`}>
      <div className="innovation-chapter__media"><IngredientPhoto src={`/images/${pillar.image}.webp`} alt={pillar.alt} loading="lazy"/><span>{pillar.detail}</span></div>
      <div className="innovation-chapter__copy"><p className="innovation-label">{["Ingredient intelligence","Quality through innovation","Exploring new possibilities","Efficient supply chain","Customer-driven development"][index]}</p><h2>{pillar.title}</h2><p>{pillar.copy}</p>{index===4&&<Link to="/enquiry" className="innovation-text-link">Share your brief <ArrowUpRight size={18} aria-hidden="true"/></Link>}</div>
    </section>)}
    <section className="innovation-action wrap"><div className="innovation-action__heading"><p className="innovation-label">Innovation in action</p><h2>A closer look<br/>at possibility.</h2><p>Ingredient character, application and sourcing are connected. These are the starting points for better conversations and new product ideas.</p></div>
      <div className="innovation-action__images">{[["mango","Explore ingredient character"],["powder","Consider colour and texture"],["dessert","Imagine a new application"]].map(([image,caption])=><figure key={image}><IngredientPhoto src={`/images/${image}.webp`} alt={caption} loading="lazy"/><figcaption>{caption}</figcaption></figure>)}</div>
    </section>
    <section className="innovation-next wrap"><p className="innovation-label">What’s next?</p><h2>Stay curious.<br/>Look further.</h2><div>{[["Evolving preferences","Changing tastes and expectations invite a fresh look at the ingredients behind everyday food experiences."],["New applications","Familiar ingredients can inspire different formats, textures and uses. We explore possibilities with our customers’ requirements in mind."],["Smarter partnerships","Meaningful collaboration helps connect ingredient knowledge, dependable supply and the next business opportunity."]].map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="innovation-vision"><div className="wrap"><p className="innovation-label">Our vision for the future</p><h2>Innovation that<br/>nourishes tomorrow.</h2><p>We aspire to contribute to a smarter, more sustainable and opportunity-driven food industry by bringing together innovative ideas, dependable ingredients and meaningful partnerships.</p><Link to="/enquiry" className="innovation-cta">Let’s innovate together <ArrowUpRight size={20} aria-hidden="true"/></Link><span className="innovation-signature">LYCA Foods & Ingredients — Building better possibilities, one ingredient at a time.</span></div></section>
  </div>
}
