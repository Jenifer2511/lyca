import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import "lenis/dist/lenis.css"
import { useReducedMotion } from "./cinematic"
import { IngredientPhoto } from "./ingredientPhoto"
import "./innovation.css"

gsap.registerPlugin(ScrollTrigger)

// All photography is locally bundled. Sources/licences: IMAGE-SOURCES.json.
// Images illustrate ingredient character and applications, not LYCA facilities.
const photos = ["citrus","cocoa","fruit","mango","coconut","berries","coffee","dairy","powder","colors","patisserie","dessert"]
const letters = [
  ["10000","10000","10000","10000","10000","10000","11111"],
  ["10001","10001","01010","00100","00100","00100","00100"],
  ["01111","10000","10000","10000","10000","10000","01111"],
  ["01110","10001","10001","11111","10001","10001","10001"],
]
const pixels = letters.flatMap((letter,k)=>letter.flatMap((row,y)=>[...row].flatMap((value,x)=>value==="1"?[{x:k*6+x,y}]:[])))
const pillars = [
  {id:"sourcing",topic:"Smarter ingredient solutions",title:"Seek\nfurther.",copy:"We continuously explore food ingredients and sourcing opportunities to meet the changing requirements of manufacturers, businesses and consumers.",images:["fruit","citrus","mango"],alts:["A dark still life of fresh fruit","Citrus fruit and cut lemons","Mango ingredients and juice"]},
  {id:"quality",topic:"Quality through innovation",title:"Quality.\nAt every step.",copy:"From ingredient selection to supply, we focus on improving quality standards, consistency and reliability. Better possibilities begin with dependable foundations.",images:["cocoa"],alts:["Cocoa and chocolate textures in close detail"]},
  {id:"possibility",topic:"Exploring new possibilities",title:"What if?",copy:"Emerging food trends, innovative ingredients and evolving applications open up opportunities across the food industry. We look beyond the familiar to explore what an ingredient could become.",images:["patisserie","dessert"],alts:["A patisserie application illustrating ingredient creativity","A dessert with blueberries and syrup"]},
  {id:"connections",topic:"Efficient supply chain",title:"Closer.\nAcross borders.",copy:"Innovation also means making ingredient sourcing and distribution more accessible, reliable and efficient for our business partners. We look for smarter practices that bring people and possibilities closer.",images:["coconut","coffee","fruit"],alts:["Coconut ingredients","Roasted coffee beans","A varied fruit portfolio"]},
  {id:"collaboration",topic:"Customer-driven development",title:"It begins\nwith you.",copy:"Every business has different requirements. We explore flexible ingredient solutions that support our customers’ product development and business goals, beginning with a conversation about what matters to them.",images:["citrus","patisserie","tomato"],alts:["Ingredient inspiration for a beverage","Ingredient inspiration for bakery","Ingredient inspiration for culinary applications"]},
]
const applications = ["Beverage","Bakery","Culinary"]
const future = [
  ["Evolving preferences","Changing tastes and expectations invite a fresh look at the ingredients behind everyday food experiences."],
  ["New applications","Familiar ingredients can inspire different formats, textures and uses. We explore possibilities with our customers’ requirements in mind."],
  ["Smarter partnerships","Meaningful collaboration helps connect ingredient knowledge, dependable supply and the next business opportunity."],
]

function Words({text, className=""}:{text:string;className?:string}) {
  return <h2 className={className} aria-label={text.split("\n").join(" ")}>{text.split("\n").map((line,i)=><span className="iv-line" aria-hidden="true" key={i}>{line.split(" ").map((word,j)=><span className="iv-word-clip" key={j}><span className="iv-word">{word}</span>{j<line.split(" ").length-1?" ":null}</span>)}</span>)}</h2>
}

function sequence(section:HTMLElement, update:(p:number,w:number,h:number)=>void) {
  let width=section.clientWidth,height=window.innerHeight
  const state={progress:0}
  const render=()=>{section.dataset.progress=state.progress.toFixed(4);update(state.progress,width,height)}
  gsap.to(state,{progress:1,ease:"none",onUpdate:render,scrollTrigger:{
    trigger:section,start:"top top",end:"bottom bottom",scrub:.65,invalidateOnRefresh:true,
    onRefresh:()=>{width=section.clientWidth;height=window.innerHeight;render()},
  }})
  render()
}
const clamp=gsap.utils.clamp(0,1)
function reveal(section:HTMLElement,p:number) {
  const words=Array.from(section.querySelectorAll<HTMLElement>(".iv-word"))
  words.forEach((word,i)=>{
    const t=clamp((p-i*.025)/.24)
    word.style.transform=`translate3d(0,${(1-t)*80}%,0) rotateX(${(1-t)*36}deg)`
    word.style.opacity=String(.2+.8*t)
  })
  section.querySelectorAll<HTMLElement>("[data-iv-copy]").forEach((copy,i)=>{
    const t=clamp((p-.12-i*.035)/.2)
    copy.style.transform=`translate3d(0,${(1-t)*28}px,0)`
    copy.style.opacity=String(.25+.75*t)
  })
}

export function InnovationPage(){
  const page=useRef<HTMLDivElement>(null)
  const reduce=useReducedMotion()
  const [application,setApplication]=useState(0)

  useLayoutEffect(()=>{
    if(reduce)return
    const lenis=new Lenis({duration:1.1,smoothWheel:true,syncTouch:false,anchors:true})
    const tick=(seconds:number)=>lenis.raf(seconds*1000)
    lenis.on("scroll",ScrollTrigger.update)
    gsap.ticker.add(tick)
    return()=>{gsap.ticker.remove(tick);lenis.destroy()}
  },[reduce])

  useLayoutEffect(()=>{
    const root=page.current
    if(!root||reduce)return
    const context=gsap.context(()=>{
      const hero=root.querySelector<HTMLElement>(".iv-origin")!
      const tiles=Array.from(hero.querySelectorAll<HTMLElement>(".iv-tile"))
      const intro=hero.querySelector<HTMLElement>(".iv-intro")!
      const wordmark=hero.querySelector<HTMLElement>(".iv-wordmark")!
      const resolution=hero.querySelector<HTMLElement>(".iv-resolution")!
      const spiral=hero.querySelector<HTMLElement>(".iv-spiral")!
      let previousSize=0
      sequence(hero,(p,w,h)=>{
        const size=w<700?190:300
        if(previousSize!==size){tiles.forEach(tile=>{tile.style.width=size+"px";tile.style.height=size+"px"});previousSize=size}
        const t=clamp((p-.43)/.43),m=t*t*(3-2*t)
        const unit=Math.min(w*.86,1080)/23
        spiral.style.maskImage=p<.16?(w<700?"linear-gradient(180deg,transparent 0%,transparent 46%,#000 68%)":"linear-gradient(90deg,transparent 0%,transparent 43%,#000 66%)"):"none"
        tiles.forEach((tile,i)=>{
          const a=i*.64-p*8.5,r=(40+i*22)*(1-p*.57)
          const sx=w*(.76-.26*clamp(p*2.8))+Math.cos(a)*r
          const sy=h*(w<700?.73:.57)+Math.sin(a)*r*.64
          const tx=w/2+(pixels[i].x-11)*unit,ty=h*.46+(pixels[i].y-3)*unit
          const scale=(i===0?1.5:.78+.15*Math.cos(a))*(1-m)+unit/size*.92*m
          const z=(-i*18+Math.sin(a)*65+(i===0?160:0))*(1-m)
          tile.style.transform=`translate3d(${sx+(tx-sx)*m}px,${sy+(ty-sy)*m}px,${z}px) translate(-50%,-50%) rotateX(${Math.sin(a)*15*(1-m)}deg) rotateY(${Math.cos(a)*25*(1-m)}deg) rotateZ(${Math.sin(a)*9*(1-m)}deg) scale(${scale})`
          tile.style.opacity=String((i<5?1:clamp((p-.06)/.18))*(1-clamp((p-.86)/.1)))
        })
        intro.style.opacity=String(1-clamp(p/.19))
        intro.style.transform=`translate3d(${-p*100}px,${-p*50}px,0)`
        intro.style.visibility=p>.2?"hidden":"visible"
        wordmark.style.opacity=String(clamp((p-.85)/.1))
        wordmark.style.transform=`translate(-50%,-50%) scale(${.96+.04*clamp((p-.85)/.1)})`
        resolution.style.opacity=String(clamp((p-.87)/.09))
        resolution.style.transform=`translateY(${(1-clamp((p-.87)/.09))*24}px)`
      })

      gsap.fromTo(intro.children,{opacity:0,transform:"translate3d(0,28px,0)"},{opacity:1,transform:"translate3d(0,0,0)",duration:.85,stagger:.08,ease:"power3.out"})

      const manifesto=root.querySelector<HTMLElement>(".iv-manifesto")!
      const manifestoPictures=Array.from(manifesto.querySelectorAll<HTMLElement>(".iv-manifesto-photo"))
      sequence(manifesto,(p,w)=>{
        reveal(manifesto,p)
        manifestoPictures.forEach((image,i)=>{image.style.transform=`translate3d(${(i===0?-1:1)*p*w*.08}px,${(1-p)*70}px,0) rotate(${(i===0?-1:1)*(5+p*8)}deg)`;image.style.opacity=String(.65+.35*p)})
      })

      root.querySelectorAll<HTMLElement>(".iv-pillar").forEach((section,index)=>{
        const plates=Array.from(section.querySelectorAll<HTMLElement>(".iv-plate"))
        sequence(section,(p,w)=>{
          reveal(section,p)
          const mobile=w<700
          plates.forEach((plate,i)=>{
            if(index===0){
              const fan=(i-1)*(mobile?22:54)*clamp(p/.6)
              plate.style.transform=`perspective(1100px) translate3d(${fan}px,${(1-clamp(p/.6))*70}px,${-i*35}px) rotateY(${(1-p)*(i-1)*24}deg) rotateZ(${(i-1)*(3+p*8)}deg) scale(${.88+.12*clamp(p/.6)})`
            }else if(index===1){
              plate.style.transform=`scale(${1.2-p*.2}) translate3d(${p*2}%,0,0)`
            }else if(index===2){
              plate.style.transform=`perspective(1000px) translate3d(0,${(i===0?1:-1)*(1-p)*90}px,${-(1-p)*140}px) rotateY(${(i===0?1:-1)*(1-p)*24}deg) rotateZ(${(i===0?-1:1)*(3+p*3)}deg)`
            }else if(index===3){
              const tileWidth=mobile?w*.72:w*.44
              plate.style.width=tileWidth+"px"
              plate.style.transform=`translate3d(${i*(tileWidth+24)-p*(mobile?w*1.45:w*.58)}px,${Math.sin(i+p)*16}px,0) rotateY(${(1-p)*7}deg)`
            }else{
              plate.style.transform=`perspective(1200px) translate3d(0,${(1-p)*60}px,0) rotateY(${(1-p)*-18}deg) rotateZ(${-5+p*5}deg) scale(${.92+p*.08})`
            }
          })
        })
      })

      const action=root.querySelector<HTMLElement>(".iv-action")!
      const frames=Array.from(action.querySelectorAll<HTMLElement>("figure"))
      const actionImages=frames.map(frame=>frame.querySelector<HTMLElement>(".iv-action-image")!)
      sequence(action,(p,w)=>{
        reveal(action,p)
        const mobile=w<700
        frames.forEach((frame,i)=>{
          if(mobile){
            const step=p*2,d=Math.abs(i-step)
            frame.style.transform="none"
            frame.style.opacity="1"
            actionImages[i].style.transform=`perspective(1000px) translate3d(${(i-step)*w*.55}px,${d*18}px,${-d*130}px) rotateY(${(i-step)*15}deg)`
            actionImages[i].style.opacity=String(clamp(1-d*1.5))
            const caption=frame.querySelector<HTMLElement>("figcaption")
            if(caption)caption.style.visibility=i===Math.round(step)?"visible":"hidden"
          }else{
            actionImages[i].style.transform="none"
            actionImages[i].style.opacity="1"
            const caption=frame.querySelector<HTMLElement>("figcaption")
            if(caption)caption.style.visibility="visible"
            frame.style.transform=`perspective(1200px) translate3d(${(i-1)*(1-clamp(p/.7))*-w*.24}px,${(1-p)*(i+1)*35}px,${-(1-p)*i*90}px) rotateY(${(i-1)*(1-p)*28}deg) rotateZ(${(i-1)*(1-p)*7}deg)`
            frame.style.opacity=String(.55+.45*p)
          }
        })
      })

      const next=root.querySelector<HTMLElement>(".iv-next")!
      const rows=Array.from(next.querySelectorAll<HTMLElement>(".iv-next-row"))
      sequence(next,(p,w)=>{
        reveal(next,p)
        rows.forEach((row,i)=>{
          const t=clamp((p-i*.13)/.3)
          row.style.opacity=String(.25+.75*t)
          row.style.transform=`perspective(900px) translate3d(${(1-t)*(w<700?24:70)}px,0,0) rotateY(${(1-t)*-10}deg)`
        })
      })

      const vision=root.querySelector<HTMLElement>(".iv-vision")!
      const finalPhoto=vision.querySelector<HTMLElement>(".iv-final-photo")!
      sequence(vision,(p)=>{
        reveal(vision,p)
        finalPhoto.style.transform=`perspective(1200px) rotateY(${(1-p)*-28}deg) rotateZ(${(1-p)*8}deg) scale(${.8+p*.2})`
      })
    },root)
    let live=true
    document.fonts.ready.then(()=>{if(live)ScrollTrigger.refresh()})
    const refresh=requestAnimationFrame(()=>ScrollTrigger.refresh())
    return()=>{live=false;cancelAnimationFrame(refresh);context.revert()}
  },[reduce])

  return <div ref={page} className="iv-page" data-reduced={reduce}>
    <section className="iv-origin iv-sequence" data-sequence="origin" aria-labelledby="innovation-title">
      <div className="iv-stage">
        <div className="iv-spiral" aria-hidden="true">{pixels.map((point,i)=><div className="iv-tile" key={i}><img src={`/images/${photos[i%photos.length]}-${i<5?"800":"480"}.webp`} alt="" decoding="async" loading={i<12?"eager":"lazy"}/></div>)}</div>
        <div className="iv-intro">
          <p className="iv-topic">Innovation at LYCA</p>
          <h1 id="innovation-title">Beyond the<br/>ingredient.</h1>
          <p>We source ingredients.<br/>We look for what they could become.</p>
          <a href="#innovation-approach" className="iv-link">Enter the story <ArrowDown size={18}/></a>
        </div>
        <div className="iv-wordmark" aria-hidden="true">{photos.map(photo=><img key={photo} src={`/images/${photo}-480.webp`} alt="" loading="lazy"/>)}</div>
        <div className="iv-resolution"><p>A world of possibility.<br/>Brought together.</p><span>LYCA Foods & Ingredients</span></div>
        <div className="iv-hero-foot"><span>Rethinking food. Redefining possibilities.</span><span>Scroll inward <ArrowDown size={13}/></span></div>
      </div>
    </section>

    <section id="innovation-approach" className="iv-manifesto iv-sequence" data-sequence="perspective" aria-label="Our innovation perspective">
      <div className="iv-stage">
        <div className="iv-manifesto-photo iv-manifesto-photo--left"><IngredientPhoto src="/images/berries.webp" alt="The colour and texture of raspberries" loading="lazy"/></div>
        <div className="iv-manifesto-photo iv-manifesto-photo--right"><IngredientPhoto src="/images/citrus.webp" alt="Fresh citrus ingredient detail" loading="lazy"/></div>
        <div className="iv-manifesto-copy">
          <Words text={"One ingredient.\nMany futures."}/>
          <div data-iv-copy><p>At LYCA, innovation is more than introducing new products. It is discovering better ways to source, deliver, develop and experience food ingredients.</p><p>Quality ingredients. Evolving consumer needs. Responsible sourcing. Smarter business practices. This is where our next chapter begins.</p></div>
        </div>
      </div>
    </section>

    {pillars.map((pillar,index)=><section key={pillar.id} id={`innovation-${pillar.id}`} className={`iv-pillar iv-pillar--${pillar.id} iv-sequence`} data-sequence={pillar.id} aria-label={pillar.topic}>
      <div className="iv-stage">
        <div className="iv-art" aria-hidden={index===4?undefined:true}>
          {pillar.images.map((image,i)=><div key={image} className="iv-plate" data-choice={index===4?application===i:undefined} aria-hidden={index===4?application!==i:undefined}><IngredientPhoto src={`/images/${image}.webp`} alt={pillar.alts[i]} loading="lazy" sizes={index===1?"100vw":"(max-width:700px) 90vw, 60vw"}/></div>)}
        </div>
        {index===1&&<div className="iv-photo-scrim" aria-hidden="true"/>}
        <div className="iv-scene-copy">
          <p className="iv-topic" data-iv-copy>{pillar.topic}</p>
          <Words text={pillar.title}/>
          <p className="iv-body" data-iv-copy>{pillar.copy}</p>
          {index===4&&<div className="iv-brief" data-iv-copy>
            <fieldset><legend>I’m creating something for…</legend><div>{applications.map((label,i)=><button type="button" key={label} aria-pressed={application===i} onClick={()=>setApplication(i)}>{label}</button>)}</div></fieldset>
            <Link className="iv-link" to={`/enquiry?product=${encodeURIComponent(applications[application]+" application")}`}>Start your brief <ArrowUpRight size={18}/></Link>
          </div>}
        </div>
        <a className="iv-scene-next" href={index<4?`#innovation-${pillars[index+1].id}`:"#innovation-in-action"} aria-label={`Continue from ${pillar.topic}`}><ArrowDown size={16}/></a>
      </div>
    </section>)}

    <section id="innovation-in-action" className="iv-action iv-sequence" data-sequence="action" aria-label="Innovation in action">
      <div className="iv-stage">
        <div className="iv-action-heading"><p className="iv-topic" data-iv-copy>Innovation in action</p><Words text={"See it.\nImagine it."}/><p className="iv-body" data-iv-copy>Ingredient character, sourcing and application are connected. A closer look can be the beginning of a new idea.</p></div>
        <div className="iv-action-gallery">{[["mango","Character","Explore what makes an ingredient distinct."],["powder","Texture","Consider colour, consistency and form."],["dessert","Application","Imagine a different food experience."]].map(([image,title,copy])=><figure key={image}><div className="iv-action-image"><IngredientPhoto src={`/images/${image}.webp`} alt={`${title}: ${copy}`} loading="lazy"/></div><figcaption><h3>{title}</h3><p>{copy}</p></figcaption></figure>)}</div>
      </div>
    </section>

    <section className="iv-next iv-sequence" data-sequence="future" aria-label="What comes next">
      <div className="iv-stage">
        <div className="iv-next-heading"><p className="iv-topic" data-iv-copy>What’s next?</p><Words text={"Stay curious.\nLook further."}/><p className="iv-body" data-iv-copy>The next opportunity starts with the questions we are willing to ask.</p></div>
        <div className="iv-next-rows">{future.map(([title,copy])=><article className="iv-next-row" key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="iv-vision iv-sequence" data-sequence="vision" aria-label="Our vision for the future">
      <div className="iv-stage">
        <div className="iv-final-photo"><IngredientPhoto src="/images/fruit.webp" alt="A world of fruit ingredients and future possibilities" loading="lazy"/></div>
        <div className="iv-vision-copy"><p className="iv-topic" data-iv-copy>Our vision for the future</p><Words text={"Nourish\ntomorrow."}/><p className="iv-body" data-iv-copy>We aspire to contribute to a smarter, more sustainable and opportunity-driven food industry, bringing together innovative ideas, dependable ingredients and meaningful partnerships.</p><Link className="iv-cta" data-iv-copy to="/enquiry">Let’s innovate together <ArrowUpRight size={20}/></Link></div>
        <p className="iv-signature" data-iv-copy>Building better possibilities, one ingredient at a time.</p>
      </div>
    </section>
    <nav className="iv-chapter-nav" aria-label="Innovation chapters"><a href="#innovation-approach">Perspective</a><a href="#innovation-sourcing">Ingredients</a><a href="#innovation-collaboration">Your idea</a><a href="#innovation-in-action">In action</a></nav>
  </div>
}
