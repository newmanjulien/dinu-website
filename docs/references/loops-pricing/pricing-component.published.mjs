// Reference only: published Loops pricing component, captured 2026-11-25.
// Source: https://framerusercontent.com/sites/6mKmSN0Irj9Tv9spjec3zG/WGlKKEJ8NNt9A32Hx0ms6dLh09AkxAn9u84qIfGr8gg.ObWq8hpF.mjs
// Extracted from the public bundle; surrounding React/Framer aliases are omitted.
// This file is evidence for the implementation plan, not application code.

function mn(e,t,n){let r=l,i={label:e,href:t,page_path:l.location.pathname,location:n};try{r.gtag?.(`event`,`cta_click`,i)}catch{}try{r.amplitude?.setTransport?.(`beacon`),r.amplitude?.track?.(`CTA Clicked`,i),r.amplitude?.flush?.()}catch{}}function hn({signupUrl:e=`https://app.loops.so/register`,contactEmail:t=`chris@loops.so`,style:n}={}){let[r,i]=x(X),[a,o]=x(0),[s,u]=x(null),d=r>Z?`${gn(Bn(r))}${r===zn?`+`:``}`:`${En}+`,p=a>0?qn(a):d,m=e=>{i(e),e!==zn&&o(0)},h=Rn[r],g=Jn(h),_=On(g),ee=g-X,S=h<X?0:h>Z?2:1,te=s??S,ne=c(null),[C,w]=x(!1);return b(()=>{let e=ne.current;if(!e)return;let t=l.matchMedia(`(max-width: 809.98px)`),n=0,r=()=>{n=0;let r=e=>e.height>0&&e.bottom>0&&e.top<l.innerHeight,i=Array.from(e.querySelectorAll(`.lm-col .lm-btn`),e=>e.getBoundingClientRect()).filter(e=>e.height>0),a=document.querySelector(`footer`)?.getBoundingClientRect();w(t.matches&&i.some(e=>e.bottom<=0)&&!i.some(r)&&!(a&&r(a)))},i=()=>{n||=requestAnimationFrame(r)};return r(),l.addEventListener(`scroll`,i,{passive:!0}),l.addEventListener(`resize`,i),()=>{cancelAnimationFrame(n),l.removeEventListener(`scroll`,i),l.removeEventListener(`resize`,i)}},[]),/*#__PURE__*/ y(`div`,{ref:ne,style:{position:`relative`,width:`100%`,minWidth:0,fontFamily:wn,color:q,...n},children:[/*#__PURE__*/ v(`style`,{dangerouslySetInnerHTML:{__html:Qn}}),/*#__PURE__*/ y(`div`,{className:`lm-wide`,children:[/*#__PURE__*/ v(nr,{growthPrice:_.price,onSelect:(e,t)=>{let n=l.matchMedia(`(prefers-reduced-motion: reduce)`).matches;t.closest(`.lm-wide`)?.querySelector(`[data-plan="${Xn[e]}"].lm-col`)?.scrollIntoView({behavior:n?`auto`:`smooth`,block:`start`})}}),/*#__PURE__*/ y(`div`,{className:`lm-ledger`,children:[[`free`,`growth`,`enterprise`].map((e,t)=>/*#__PURE__*/ v(`div`,{className:`lm-focus`,"data-active":S===t,style:{gridColumn:t+1},"aria-hidden":`true`,children:/*#__PURE__*/ v(pr,{active:S===t,pattern:e})},e)),/*#__PURE__*/ y(tr,{name:`Free`,column:1,active:S===0,price:/*#__PURE__*/ v(er,{price:`$0`,note:`Up to 10 emails per second`}),cta:/*#__PURE__*/ v(ar,{href:e,primary:te===0,plan:`free`,children:bn[0]}),children:[/*#__PURE__*/ y($,{label:Q.contacts,className:`lm-contacts`,children:[`Up to `,/*#__PURE__*/ v(`b`,{children:An.contacts}),` contacts*`]}),/*#__PURE__*/ v(rr,{}),/*#__PURE__*/ y($,{label:Q.marketing,children:[/*#__PURE__*/ v(`b`,{children:An.sends}),` sends per 30 days*`]}),/*#__PURE__*/ v($,{label:Q.transactional,children:`Transactional sends included*`}),/*#__PURE__*/ v($,{label:Q.branding,children:`Powered by Loops footer`})]}),/*#__PURE__*/ y(tr,{name:`Growth`,column:2,paid:!0,active:S===1,price:/*#__PURE__*/ v(er,{price:_.price,note:`Up to 1,000 emails per second`,monthly:!0}),cta:/*#__PURE__*/ v(ar,{href:e,primary:te===1,plan:`growth`,children:bn[1]}),children:[/*#__PURE__*/ y($,{label:Q.contacts,className:`lm-contacts`,children:[`Up to `,/*#__PURE__*/ v(`b`,{children:_.contacts}),` contacts†`]}),/*#__PURE__*/ v(`div`,{className:`lm-cell lm-scale-cell`,children:/*#__PURE__*/ y(`div`,{className:`lm-scale lm-mobile-scale`,children:[/*#__PURE__*/ y(`div`,{className:`lm-power`,style:{"--lm-power":_.progress/100},children:[/*#__PURE__*/ v(fr,{}),/*#__PURE__*/ v($n,{tierIndex:g,onChange:e=>m(Rn.indexOf(e)),details:_}),/*#__PURE__*/ v(`span`,{className:`lm-knob`,"aria-hidden":`true`})]}),/*#__PURE__*/ v(`div`,{className:`lm-ticks`,"aria-hidden":`true`,children:Array.from({length:Pn},(e,t)=>/*#__PURE__*/ v(`span`,{className:`lm-tick`,"data-on":t<=ee,"data-current":t===ee,style:{left:In(t/(Pn-1)*100)}},t))}),/*#__PURE__*/ y(`div`,{className:`lm-scale-ends`,children:[/*#__PURE__*/ v(`span`,{children:kn.contacts}),/*#__PURE__*/ v(`span`,{className:`lm-sr`,children:` to `}),/*#__PURE__*/ v(`span`,{className:`lm-keep`,children:En}),/*#__PURE__*/ v(`span`,{className:`lm-sr`,children:` subscribed contacts`})]})]})}),/*#__PURE__*/ y($,{label:Q.marketing,children:[/*#__PURE__*/ v(`b`,{children:`Unlimited`}),` marketing sends`]}),/*#__PURE__*/ y($,{label:Q.transactional,children:[/*#__PURE__*/ v(`b`,{children:`Unlimited`}),` transactional sends`]}),/*#__PURE__*/ v($,{label:Q.branding,children:`No Loops branding`})]}),/*#__PURE__*/ y(tr,{name:`Enterprise`,column:3,active:S===2,price:/*#__PURE__*/ v(er,{price:`Custom`,note:`Priority support and migration help`}),cta:/*#__PURE__*/ v(ar,{href:Zn(t),primary:te===2,plan:`enterprise`,children:bn[2]}),children:[/*#__PURE__*/ y($,{label:Q.contacts,className:`lm-contacts`,children:[/*#__PURE__*/ v(`b`,{className:`lm-keep`,children:p}),` contacts`,p===`∞`&&/*#__PURE__*/ v(`span`,{className:`lm-really`,children:` really?`})]}),/*#__PURE__*/ v(rr,{}),/*#__PURE__*/ v($,{label:Q.marketing,children:`Custom marketing volume`}),/*#__PURE__*/ v($,{label:Q.transactional,children:`Custom transactional volume`}),/*#__PURE__*/ v($,{label:Q.branding,children:`No Loops branding`})]}),/*#__PURE__*/ v(ir,{stop:r,onChange:m,onOverflow:e=>o(t=>Math.max(0,t+e)),onDrag:e=>u(e?S:null)}),Nn.map(e=>/*#__PURE__*/ v(`div`,{className:`lm-rule`,style:{gridRow:e},"aria-hidden":`true`},e))]}),/*#__PURE__*/ y(`p`,{className:`lm-footnote`,children:[`* Free stores unlimited contacts and includes `,An.sends,` total marketing and transactional sends per rolling 30 days to your first `,An.contacts,`.`,/*#__PURE__*/ v(`br`,{}),`† `,Dn]})]}),C&&/*#__PURE__*/ f(/*#__PURE__*/ v(`div`,{className:`lm-bar`,children:/*#__PURE__*/ v(ar,{href:e,primary:!0,plan:`sticky`,children:bn[0]})}),document.body)]})}var K,gn,q,J,_n,Y,vn,yn,bn,xn,Sn,Cn,wn,X,Tn,Z,En,Dn,On,kn,An,Q,jn,Mn,Nn,Pn,Fn,In,Ln,Rn,zn,Bn,Vn,Hn,Un,Wn,Gn,Kn,qn,Jn,Yn,Xn,Zn,Qn,$n,er,$,tr,nr,rr,ir,ar,or,sr,cr,lr,ur,dr,fr,pr;function mr(){return(mr=e((()=>{u(),p(),a(),M(),_(),K=[{price:0,maxContacts:100},{price:0,maxContacts:200},{price:0,maxContacts:300},{price:0,maxContacts:400},{price:0,maxContacts:500},{price:0,maxContacts:600},{price:0,maxContacts:700},{price:0,maxContacts:800},{price:0,maxContacts:900},{price:0,maxContacts:1e3},{price:49,maxContacts:5e3},{price:99,maxContacts:1e4},{price:149,maxContacts:15e3},{price:199,maxContacts:25e3},{price:249,maxContacts:5e4},{price:399,maxContacts:1e5},{price:599,maxContacts:15e4},{price:799,maxContacts:2e5},{price:1199,maxContacts:3e5},{price:1599,maxContacts:4e5},{price:1999,maxContacts:5e5},{price:2399,maxContacts:6e5},{price:2799,maxContacts:7e5},{price:3199,maxContacts:8e5},{price:3599,maxContacts:9e5},{price:3999,maxContacts:1e6},{price:4399,maxContacts:125e4},{price:4799,maxContacts:15e5},{price:`Contact us`,maxContacts:16e5}],gn=e=>e>=1e6?`${Number((e/1e6).toFixed(2))} million`:e.toLocaleString(`en-US`),q=`var(--token-e5dd00a8-a1c8-408b-b050-1cf1ab615219, #21201c)`,J=`var(--token-2a5f3230-4a8b-49e0-8e32-9494e91450f2, #63635e)`,_n=`var(--token-83f5fefd-8241-47f8-8f7c-5e6247fea9aa, #fdfdfc)`,Y=`var(--token-6b4c9de0-1933-4ebb-b983-b632663eba1c, #dad9d6)`,vn=`var(--token-ba9e30f7-c04b-4022-9049-93bb7c16efdd, #cfceca)`,yn=`#fc5200`,bn=[`Start for free`,`Start for free`,`Contact us`],xn=`var(--token-65538b51-ace3-4873-b4db-4d71bdbd1f8b, #f9f9f8)`,Sn=`var(--token-e5fe42bb-0171-444b-bb6c-b12015a4b434, #f1f0ef)`,Cn=`Newsreader, ui-serif, Georgia, Cambria, serif`,wn=`Inter, ui-sans-serif, system-ui, -apple-system, sans-serif`,X=K.findIndex(e=>typeof e.price==`number`&&e.price>0),Tn=15e5,Z=K.findIndex(e=>e.maxContacts===Tn),En=gn(Tn),Dn=`Unsubscribed contacts never count toward your price.`,On=e=>{let t=K[e]??K[X];return{price:`$`+t.price.toLocaleString(`en-US`),contacts:t.maxContacts.toLocaleString(`en-US`),progress:(e-X)/(Z-X)*100}},kn=On(X),An={contacts:`1,000`,sends:`4,000`},Q={contacts:`Subscribed contacts`,marketing:`Marketing sends`,transactional:`Transactional sends`,branding:`Branding`},jn=Object.keys(Q).length+4,Mn=4,Nn=Array.from({length:jn-2},(e,t)=>t+3).filter(e=>e!==Mn),Pn=Z-X+1,Fn=K.length-1,In=(e,t=12)=>`calc(${t}px + ${e/100} * (100% - ${t*2}px))`,Ln=[2e6,25e5,3e6,4e6,5e6,75e5,1e7],Rn=[...K.map((e,t)=>t).slice(0,Z+1),...Ln.map(()=>Fn)],zn=Rn.length-1,Bn=e=>Ln[e-Z-1],Vn=e=>e<X?e/(X-1)*30:e<=Z?35+(e-X)/(Z-X)*30:70+(e-Z-1)/(Ln.length-1)*30,Hn=Rn.map((e,t)=>Vn(t)),Un=e=>Hn.reduce((t,n,r)=>Math.abs(n-e)<Math.abs(Hn[t]-e)?r:t,0),Wn={ArrowRight:e=>e+1,ArrowUp:e=>e+1,ArrowLeft:e=>e-1,ArrowDown:e=>e-1,PageUp:e=>e+5,PageDown:e=>e-5,Home:()=>0,End:()=>zn},Gn=/* @__PURE__ */ new Set([`ArrowRight`,`ArrowUp`,`PageUp`,`End`]),Kn=[[0x38d7ea4c68000,`quadrillion`],[0xe8d4a51000,`trillion`],[1e9,`billion`],[1e6,`million`]],qn=e=>{let t=Ln[Ln.length-1]*10**(e/50);if(t>=0xde0b6b3a7640000)return`∞`;let[n,r]=Kn.find(([e])=>t>=e)??Kn[3];return`${Number((t/n).toFixed(1))} ${r}+`},Jn=e=>Math.min(Math.max(e,X),Z),Yn=e=>{if(e>Z)return`${Bn(e).toLocaleString(`en-US`)} contacts, custom pricing`;let t=K[Rn[e]],n=t.maxContacts.toLocaleString(`en-US`);return t.price===`Contact us`?`More than ${En} contacts, custom pricing`:t.price===0?`${n} contacts, Free plan`:`${n} contacts, $${t.price.toLocaleString(`en-US`)} per month`},Xn=[`free`,`growth`,`enterprise`],Zn=e=>`mailto:${e}?subject=Enterprise%20pricing`,Qn=`
    .lm-wide {
        container: lm / inline-size;
        padding: clamp(14px, 3.5%, 36px);
        border: 1px solid ${Y};
        border-radius: 24px;
        background: ${xn};
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 12px 32px -16px rgba(0, 0, 0, 0.12);
    }
    .lm-ledger {
        --lm-gap: 12px;
        --lm-pad: 24px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        grid-template-rows: repeat(${jn}, auto);
        column-gap: var(--lm-gap);
    }
    .lm-col { display: grid; grid-row: 1 / -1; grid-template-rows: subgrid; min-width: 0; }
    .lm-rule {
        grid-column: 1 / -1;
        align-self: start;
        z-index: 1;
        height: 0;
        border-top: 1px solid ${Y};
        pointer-events: none;
    }
    .lm-cell {
        min-width: 0;
        padding: 14px var(--lm-pad);
        color: ${J};
        font-size: 0.875rem;
        line-height: 1.5;
        overflow-wrap: break-word;
        text-wrap: pretty;
    }
    .lm-cell b { color: ${q}; font-weight: 600; }
    .lm-keep { white-space: nowrap; }
    .lm-head { padding: 24px var(--lm-pad) 4px; }
    .lm-price-cell { display: flex; flex-direction: column; gap: 10px; padding-block: 8px 20px; }
    .lm-cta { padding: 20px var(--lm-pad) 22px; }
    /* Not shown, but read by screen readers and text extractors so adjacent labels don't run together. */
    .lm-sr {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
    }
    /* The plan under the slider is lit; the others dim back. */
    .lm-col { position: relative; z-index: 1; transition: opacity 240ms ease; }
    /* Each plan has its dither pattern, which fades in when the slider selects it. It has no fill or edge,
       so the power bar can run straight through it. */
    .lm-focus {
        grid-row: 1 / -1;
        position: relative;
        overflow: hidden;
        margin: -28px -44px;
        -webkit-mask: linear-gradient(to right, transparent, #000 80px, #000 calc(100% - 80px), transparent), linear-gradient(transparent, #000 56px, #000 calc(100% - 56px), transparent);
        -webkit-mask-composite: source-in;
        mask: linear-gradient(to right, transparent, #000 80px, #000 calc(100% - 80px), transparent), linear-gradient(transparent, #000 56px, #000 calc(100% - 56px), transparent);
        mask-composite: intersect;
        opacity: 0;
        transition: opacity 320ms ease;
        pointer-events: none;
    }
    .lm-focus[data-active="true"] { opacity: 1; }
    /* The pattern stays inside its own column (the glow reaches past it) and fades out before the right and bottom edges. */
    .lm-dither {
        position: absolute;
        inset: 28px 44px;
        width: calc(100% - 88px);
        height: calc(100% - 56px);
        color: ${q};
        opacity: 0.1;
        image-rendering: pixelated;
        pointer-events: none;
        -webkit-mask: linear-gradient(155deg, transparent 30%, #000 78%), linear-gradient(to left, transparent, #000 64px), linear-gradient(to top, transparent, #000 72px);
        -webkit-mask-composite: source-in;
        mask: linear-gradient(155deg, transparent 30%, #000 78%), linear-gradient(to left, transparent, #000 64px), linear-gradient(to top, transparent, #000 72px);
        mask-composite: intersect;
    }

    .lm-col[data-active="false"] { opacity: 0.75; }

    .lm-label { color: ${q}; font-size: 0.875rem; font-weight: 600; letter-spacing: -0.01em; }
    .lm-price-row { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; }
    .lm-price {
        font-family: ${Cn};
        font-weight: 400;
        line-height: 1;
        letter-spacing: -0.04em;
        font-variant-numeric: tabular-nums;
        color: ${q};
        font-size: 36px;
    }
    .lm-per { color: ${J}; font-size: 0.9375rem; }
    .lm-note { margin: 2px 0 0; color: ${J}; font-size: 0.8125rem; line-height: 1.45; text-wrap: pretty; }

    .lm-contacts { padding-bottom: 0; }
    .lm-scale-cell { padding: 0; }
    .lm-mobile-scale { display: none; }
    .lm-plan-scale { grid-column: 1 / -1; position: relative; z-index: 2; padding: 12px var(--lm-pad) 22px; }
    .lm-col[data-active="true"] .lm-cell { color: ${q}; }
    .lm-really { color: ${J}; opacity: 0; animation: lm-really 400ms ease 1s forwards; }
    @keyframes lm-really { to { opacity: 1; } }
    /* The contacts slider is a power bar: a pill that fills to the thumb, warming toward Loops orange, with a faint
       sheen and drifting sparks. The native range sits on top, transparent, for input and accessibility. */
    .lm-power {
        position: relative;
        /* The knob carries a small orange core and a soft bloom, both growing with the value. */
        --lm-knob: radial-gradient(circle, ${yn} 0 calc(1.5px + 1.5px * var(--lm-power, 0)), #fff calc(2px + 1.5px * var(--lm-power, 0)));
        --lm-knob-shadow: 0 1px 2px rgba(0, 0, 0, 0.18), 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 0 calc(6px + 10px * var(--lm-power, 0)) rgba(252, 82, 0, calc(0.12 + 0.3 * var(--lm-power, 0)));
    }
    .lm-range {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        position: relative;
        z-index: 1;
        width: calc(100% - 4px);
        height: 24px;
        margin: 0 2px;
        background: transparent;
        cursor: pointer;
    }
    .lm-range::-webkit-slider-runnable-track { height: 24px; background: transparent; }
    .lm-range::-moz-range-track { height: 24px; background: transparent; }
    .lm-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        margin-top: 2px;
        border: 0;
        border-radius: 999px;
        background: var(--lm-knob);
        box-shadow: var(--lm-knob-shadow);
        transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .lm-range::-moz-range-thumb { width: 20px; height: 20px; border: 0; border-radius: 999px; background: var(--lm-knob); box-shadow: var(--lm-knob-shadow); }
    .lm-range:active::-webkit-slider-thumb { transform: scale(1.1); }
    .lm-range:focus { outline: none; }
    .lm-range:focus-visible { outline: 2px solid ${q}; outline-offset: 2px; border-radius: 999px; }
    .lm-ticks { position: relative; height: 10px; margin-top: 2px; }
    .lm-tick {
        position: absolute;
        top: 0;
        width: 1px;
        height: 6px;
        background: ${Y};
        transition: background 150ms ease, height 150ms ease;
    }
    .lm-tick[data-on="true"] { background: ${q}; }
    .lm-tick[data-current="true"] { height: 10px; }
    .lm-meter {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: color-mix(in srgb, ${Y} 45%, ${xn});
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.09), 0 1px 0 color-mix(in srgb, ${_n} 70%, transparent);
    }
    /* One heat gradient spans the whole track and the fill uncovers it, so the bar runs hotter the further it goes.
       A bright head sits under the knob, a glossy top catches the light, and sparks flow toward the head. */
    .lm-meter-fill {
        position: absolute;
        inset: 0;
        overflow: hidden;
        background:
            radial-gradient(56px 28px at calc(12px + (100% - 24px) * var(--lm-power, 0)) 50%, rgba(255, 236, 214, 0.75), transparent 70%),
            linear-gradient(90deg, #f6ae86 0%, #f8945c 30%, #fa7333 65%, ${yn} 100%);
        clip-path: inset(0 calc((100% - 24px) * (1 - var(--lm-power, 0))) 0 0 round 12px);
    }
    .lm-meter-fill::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.06) 48%, transparent 52%, rgba(120, 30, 0, 0.08));
    }
    .lm-sparks { position: absolute; inset: 0; width: 100%; height: 100%; }
    .lm-scale-ends { display: flex; justify-content: space-between; gap: 12px; margin-top: 4px; color: ${J}; font-size: 0.8125rem; }

    .lm-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 44px;
        padding: 0 20px;
        position: relative;
        isolation: isolate;
        border-radius: 999px;
        color: ${_n};
        font-size: 0.9375rem;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
        transition: opacity 150ms ease, transform 100ms ease, color 420ms ease, box-shadow 420ms ease;
    }
    /* The black fill is its own layer: it swells in from the centre when a plan is chosen and fades out a little faster
       when it moves on, so the hand-off between buttons reads as one gentle motion. */
    .lm-btn::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background: ${q};
        transition: opacity 480ms cubic-bezier(0.23, 1, 0.32, 1), transform 620ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .lm-btn:active { transform: scale(0.98); }
    .lm-btn:focus-visible { outline: 2px solid ${q}; outline-offset: 3px; }
    .lm-btn-quiet { color: ${q}; box-shadow: inset 0 0 0 1px ${Y}; transition-duration: 150ms, 100ms, 260ms, 260ms; }
    .lm-btn-quiet::before { opacity: 0; transform: scale(0.9, 0.7); transition-duration: 260ms, 260ms; }
    @media (hover: hover) {
        .lm-btn:hover { opacity: 0.88; }
        .lm-btn-quiet:hover { opacity: 1; box-shadow: inset 0 0 0 1px ${q}; }
        .lm-range:hover::-webkit-slider-thumb { transform: scale(1.1); }
    }
    @media (prefers-reduced-motion: reduce) {
        .lm-tick, .lm-btn, .lm-btn::before, .lm-col, .lm-focus, .lm-range::-webkit-slider-thumb { transition: none; }
        .lm-really { animation-duration: 1ms; }
    }
    .lm-footnote { margin: 16px 0 0; color: ${J}; font-size: 0.875rem; line-height: 1.5; text-align: center; text-wrap: pretty; }

    .lm-glance, .lm-knob { display: none; }
    /* Phone breakpoint only. */
    @media (max-width: 809.98px) {
        .lm-wide { padding: 0; border: 0; border-radius: 0; background: none; box-shadow: none; }
        .lm-glance {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            margin-bottom: 16px;
            border: 1px solid ${Y};
            border-radius: 16px;
            overflow: hidden;
        }
        .lm-glance-cell {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
            min-height: 76px;
            margin: 0;
            padding: 12px 12px 14px;
            border: 0;
            border-left: 1px solid ${Y};
            background: none;
            color: ${q};
            font: inherit;
            text-align: left;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        .lm-glance-cell:first-child { border-left: 0; }
        .lm-glance-cell:focus-visible { outline: 2px solid ${q}; outline-offset: -2px; border-radius: 15px; }
        .lm-glance-name { color: ${J}; font-size: 0.8125rem; font-weight: 600; letter-spacing: -0.01em; }
        .lm-glance .lm-price { font-size: 24px; letter-spacing: -0.03em; }
        .lm-glance .lm-per { font-size: 0.75rem; }
        .lm-glance .lm-price-row { gap: 2px 4px; }
        .lm-col { scroll-margin-top: 88px; }
        /* A 44px touch target around the 24px knob: the native thumb is transparent and the knob is drawn on top. */
        .lm-mobile-scale .lm-power { display: flow-root; }
        .lm-mobile-scale .lm-range { width: calc(100% + 20px); height: 44px; margin: -10px; }
        .lm-mobile-scale .lm-range::-webkit-slider-runnable-track { height: 44px; }
        .lm-mobile-scale .lm-range::-moz-range-track { height: 44px; }
        .lm-mobile-scale .lm-range::-webkit-slider-thumb { width: 44px; height: 44px; margin-top: 0; background: transparent; box-shadow: none; }
        .lm-mobile-scale .lm-range::-moz-range-thumb { width: 44px; height: 44px; background: transparent; box-shadow: none; }
        .lm-mobile-scale .lm-range:active::-webkit-slider-thumb { transform: none; }
        .lm-mobile-scale .lm-knob {
            display: block;
            position: absolute;
            z-index: 2;
            top: 50%;
            left: calc(12px + (100% - 24px) * var(--lm-power, 0));
            width: 24px;
            height: 24px;
            margin: -12px 0 0 -12px;
            border-radius: 999px;
            background: var(--lm-knob);
            box-shadow: var(--lm-knob-shadow);
            pointer-events: none;
            transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .lm-mobile-scale .lm-range:active ~ .lm-knob { transform: scale(1.1); }
        .lm-footnote { font-size: 0.8125rem; }
    }
    @media (max-width: 809.98px) {
        .lm-glance-cell[data-plan="growth"] { background: ${Sn}; }
    }
    /* Phone signup bar, shown once the plan buttons have scrolled out of view. */
    .lm-bar { display: none; }
    @keyframes lm-bar-in { from { opacity: 0; } }
    @media (max-width: 809.98px) {
        .lm-bar {
            display: block;
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 10;
            padding: 12px 16px max(12px, env(safe-area-inset-bottom));
            border-top: 1px solid ${Y};
            background: ${_n};
            font-family: ${wn};
            animation: lm-bar-in 220ms cubic-bezier(0.23, 1, 0.32, 1);
        }
    }
    @media (prefers-reduced-motion: reduce) {
        .lm-bar { animation: none; }
    }

    @container lm (max-width: 1000px) {
        .lm-ledger { --lm-pad: 18px; }
    }
    @container lm (max-width: 719px) {
        .lm-ledger { display: flex; flex-direction: column; gap: 16px; }
        .lm-rule { display: none; }
        .lm-col { display: block; border: 1px solid ${Y}; border-radius: 20px; }
        .lm-col[data-active="false"] { opacity: 1; }
        .lm-paid { order: -1; border-color: ${vn}; background: ${Sn}; }
        .lm-focus { display: none; }
        .lm-cell { padding: 12px 20px; }
        .lm-col > .lm-cell + .lm-cell { border-top: 1px solid ${Y}; }
        .lm-head { padding: 24px 20px 4px; }
        .lm-price-cell { padding: 8px 20px 16px; }
        .lm-col > .lm-head + .lm-price-cell { border-top: 0; }
        .lm-cta { padding: 16px 20px 20px; }
        .lm-plan-scale, .lm-scale-spacer { display: none; }
        .lm-mobile-scale { display: block; }
        .lm-col > .lm-cell.lm-scale-cell { border-top: 0; padding: 4px 20px 16px; }
    }
`,$n=({tierIndex:e,onChange:t,details:n})=>/*#__PURE__*/ v(`input`,{type:`range`,className:`lm-range`,min:X,max:Z,step:1,value:e,onChange:e=>t(Number(e.target.value)),"aria-label":`Subscribed contacts`,"aria-valuetext":`${n.contacts} contacts, ${n.price} per month`}),er=({price:e,note:t,monthly:n=!1})=>/*#__PURE__*/ y(h,{children:[/*#__PURE__*/ y(`div`,{className:`lm-price-row`,children:[/*#__PURE__*/ v(`span`,{className:`lm-price`,children:e}),n&&/*#__PURE__*/ y(h,{children:[` `,/*#__PURE__*/ v(`span`,{className:`lm-per`,children:`/ month`})]})]}),t&&/*#__PURE__*/ v(`p`,{className:`lm-note`,children:t})]}),$=({label:e,className:t=``,children:n})=>/*#__PURE__*/ y(`div`,{className:`lm-cell ${t}`,children:[/*#__PURE__*/ y(`span`,{className:`lm-sr`,children:[e,`: `]}),n]}),tr=({name:e,column:t,paid:n=!1,active:r,shown:i=!0,price:a,cta:o,children:s})=>/*#__PURE__*/ y(`section`,{className:n?`lm-col lm-paid`:`lm-col`,style:{gridColumn:t},"data-active":r,"data-plan":Xn[t-1],"data-shown":i,"aria-label":`${e} plan`,children:[/*#__PURE__*/ v(`div`,{className:`lm-cell lm-head`,children:/*#__PURE__*/ v(`div`,{className:`lm-label`,children:e})}),/*#__PURE__*/ v(`div`,{className:`lm-cell lm-price-cell`,children:a}),s,/*#__PURE__*/ v(`div`,{className:`lm-cell lm-cta`,children:o})]}),nr=({growthPrice:e,selected:t,onSelect:n})=>/*#__PURE__*/ v(`div`,{className:`lm-glance`,children:[{name:`Free`,price:`$0`},{name:`Growth`,price:e,monthly:!0},{name:`Enterprise`,price:`Custom`}].map((e,r)=>/*#__PURE__*/ y(s,{children:[r>0&&/*#__PURE__*/ v(`span`,{className:`lm-sr`,children:` · `}),/*#__PURE__*/ y(`button`,{type:`button`,className:`lm-glance-cell`,"data-plan":Xn[r],"aria-pressed":t===void 0?void 0:t===r,onClick:e=>n(r,e.currentTarget),children:[/*#__PURE__*/ v(`span`,{className:`lm-glance-name`,children:e.name}),` `,/*#__PURE__*/ y(`span`,{className:`lm-price-row`,children:[/*#__PURE__*/ v(`span`,{className:`lm-price`,children:e.price}),e.monthly&&/*#__PURE__*/ y(h,{children:[` `,/*#__PURE__*/ v(`span`,{className:`lm-per`,children:`/ month`})]})]})]})]},e.name))}),rr=()=>/*#__PURE__*/ v(`div`,{className:`lm-cell lm-scale-cell lm-scale-spacer`,"aria-hidden":`true`}),ir=({stop:e,onChange:t,onOverflow:n,onDrag:r})=>{let[i,a]=x(null),o=c(!1),s=i??Hn[e];return/*#__PURE__*/ y(`div`,{className:`lm-plan-scale`,style:{gridRow:Mn,"--lm-power":s/100},children:[/*#__PURE__*/ y(`div`,{className:`lm-power`,children:[/*#__PURE__*/ v(fr,{}),/*#__PURE__*/ v(`input`,{type:`range`,className:`lm-range`,min:0,max:100,step:.1,value:s,onChange:e=>{let n=Number(e.target.value);o.current&&a(n),t(Un(n))},onPointerDown:e=>{let t=e.currentTarget;o.current=!0,r(!0);let i=e=>{e.clientX>t.getBoundingClientRect().right-10&&n(e.movementX)},s=()=>{o.current=!1,a(null),r(!1),l.removeEventListener(`pointermove`,i),l.removeEventListener(`pointerup`,s),l.removeEventListener(`pointercancel`,s)};l.addEventListener(`pointermove`,i),l.addEventListener(`pointerup`,s),l.addEventListener(`pointercancel`,s)},onKeyDown:r=>{let i=Wn[r.key];if(i){if(r.preventDefault(),e===zn&&Gn.has(r.key))return n(50);t(Math.min(Math.max(i(e),0),zn))}},"aria-label":`Subscribed contacts`,"aria-valuetext":Yn(e)})]}),/*#__PURE__*/ v(`div`,{className:`lm-ticks`,"aria-hidden":`true`,children:Hn.map((t,n)=>/*#__PURE__*/ v(`span`,{className:`lm-tick`,"data-on":n<=e,"data-current":n===e,style:{left:In(t)}},n))})]})},ar=({href:e,primary:t,plan:n,children:r})=>/*#__PURE__*/ v(`a`,{className:t?`lm-btn`:`lm-btn lm-btn-quiet`,href:e,"data-framer-preserve-params":e.startsWith(`https://app.loops.so/`)?`true`:void 0,onClickCapture:()=>mn(r,e,`pricing-${n}`),children:r}),or=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],sr=3,cr=(e,t)=>Math.min(t,Math.max(0,e)),lr=[.95,.62,.36,.14],ur={free:(e,t,n,r,i)=>.4*Math.exp(-Math.hypot(e-r*.95,t-i*.98)/(r*.42*(1+.06*Math.sin(n*.8)))),growth:(e,t,n,r,i)=>{let a=Math.hypot(e-r*.95,t-i*.98);return cr(1.05-a/(r*1.3),1)*.85*(Math.sin(a*.17-n*1.4)>.35?1:.12)},enterprise:(e,t,n,r,i)=>{let a=r*.75,o=(e-r*.78)/a,s=(t-i*.93)/a,c=1-o*o-s*s;if(c<0)return 0;let l=-.7+.2*Math.cos(n*.25),u=-.55+.15*Math.sin(n*.25),d=Math.max(0,(o*l+s*u+Math.sqrt(c)*.3)/Math.hypot(l,u,.3));return lr[Math.min(3,Math.floor(d*4))]}},dr=()=>{let e=c(null);return b(()=>{let t=e.current,n=t?.getContext(`2d`);if(!t||!n)return;let r=l.matchMedia(`(prefers-reduced-motion: reduce)`).matches,i=l.devicePixelRatio||1,a=0,o=0,s=()=>{let e=t.getBoundingClientRect();a=e.width,o=e.height,t.width=Math.round(a*i),t.height=Math.round(o*i),n.setTransform(i,0,0,i,0,0)};s();let c=new ResizeObserver(s);c.observe(t);let u=Array.from({length:36},()=>({x:Math.random(),y:.2+Math.random()*.6,speed:.05+Math.random()*.1,size:.6+Math.random()*.8,phase:Math.random()*Math.PI*2})),d=0,f=performance.now(),p=e=>{let i=Math.min(.05,(e-f)/1e3);f=e;let s=Number(getComputedStyle(t).getPropertyValue(`--lm-power`))||0,c=12+(a-24)*s;n.clearRect(0,0,a,o),n.fillStyle=`#fff`,u.forEach(t=>{r||(t.x+=t.speed*(.4+s)*i),t.x>1&&(--t.x,t.y=.2+Math.random()*.6);let l=t.x*a,u=Math.min(1,l/30,Math.max(0,(c-l)/40));n.globalAlpha=u*(.6+.4*Math.sin(e/330+t.phase))*.85,n.beginPath(),n.arc(l,t.y*o,t.size,0,Math.PI*2),n.fill()}),r||(d=requestAnimationFrame(p))};return d=requestAnimationFrame(p),()=>{cancelAnimationFrame(d),c.disconnect()}},[]),/*#__PURE__*/ v(`canvas`,{ref:e,className:`lm-sparks`})},fr=()=>/*#__PURE__*/ v(`div`,{className:`lm-meter`,"aria-hidden":`true`,children:/*#__PURE__*/ v(`div`,{className:`lm-meter-fill`,children:/*#__PURE__*/ v(dr,{})})}),pr=({active:e,pattern:t})=>{let n=c(null);return b(()=>{let r=n.current,i=r?.getContext(`2d`);if(!r||!i||!e)return;let[a,o,s]=(getComputedStyle(r).color.match(/\d+/g)??[`33`,`32`,`28`]).map(Number),c=l.matchMedia(`(prefers-reduced-motion: reduce)`).matches,u=i.createImageData(1,1),d=()=>{let{width:e,height:t}=r.getBoundingClientRect();r.width=Math.max(1,Math.round(e/sr)),r.height=Math.max(1,Math.round(t/sr)),u=i.createImageData(r.width,r.height)};d();let f=new ResizeObserver(d);f.observe(r);let p=0,m=-1/0,h=-1,g=e=>{if(!c&&e-m<33){p=requestAnimationFrame(g);return}m=e,h<0&&(h=e);let n=c?1:Math.min(1,(e-h)/700),r=c?1.2:e/1e3,{width:l,height:d,data:f}=u,_=ur[t];for(let e=0;e<d;e++)for(let t=0;t<l;t++){let i=n*_(t,e,r,l,d)>(or[e%4*4+t%4]+.5)/16,c=(e*l+t)*4;f[c]=a,f[c+1]=o,f[c+2]=s,f[c+3]=i?255:0}i.putImageData(u,0,0),c||(p=requestAnimationFrame(g))};return p=requestAnimationFrame(g),()=>{cancelAnimationFrame(p),f.disconnect()}},[e,t]),/*#__PURE__*/ v(`canvas`,{ref:n,className:`lm-dither`,"aria-hidden":`true`})},hn.defaultProps={signupUrl:`https://app.loops.so/register`,contactEmail:`chris@loops.so`,accentColor:`var(--token-1e04d518-8f8c-4db1-b052-31d69507827c, #d9d9e0)`,backgroundColor:`var(--token-83f5fefd-8241-47f8-8f7c-5e6247fea9aa, #ffffff)`,borderColor:`var(--token-a2f0540e-72ca-4cc9-865b-e7433ca93cb5, #e8e8ec)`,showPlanText:!0},A(hn,{signupUrl:{type:B.String,title:`Signup URL`,defaultValue:`https://app.loops.so/register`},contactEmail:{type:B.String,title:`Contact Email`,defaultValue:`chris@loops.so`},accentColor:{type:B.Color,title:`Accent`,defaultValue:`#d6d6d6`},backgroundColor:{type:B.Color,title:`Background`,defaultValue:`#ffffff`},borderColor:{type:B.Color,title:`Border`,defaultValue:`#e6e6e6`},showPlanText:{type:B.Boolean,title:`Plan Text`,defaultValue:!0}})})))()}
