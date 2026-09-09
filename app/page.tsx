'use client'
import {useState} from 'react'

export default function Page(){
const [q,setQ]=useState('construction')
const [tenders,setT]=useState([{title:'Live construction Tender - UP PWD',dept:'UP PWD',value:'50 Lakhs'}])
const [chat,setChat]=useState([{r:'ai',t:'Hi! Mai Vikram AI hu. Tender pucho - jaise "UP PWD 50 lakh"'}])
const [inp,setInp]=useState('')

const search=async()=>{
  try{ const d=await(await fetch(`/api/live-tenders?q=${q}`)).json(); if(d.tenders?.length)setT(d.tenders.map((x:any)=>({title:x.title||x.name, dept:x.dept||'UP PWD', value:x.value||'50 Lakhs'}))) }catch{}
}
const send=()=>{ if(!inp.trim())return; setChat([...chat,{r:'user',t:inp},{r:'ai',t:`"${inp}" ke liye best ${q} tenders UP eProcure me dhoondh raha hu...`} ]); setInp('') }

return(
<div style={{minHeight:'100vh', background:'#fafafb', padding:16, maxWidth:420, margin:'0 auto', fontFamily:'-apple-system, sans-serif'}}>

<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
<h1 style={{fontSize:28, fontWeight:900, margin:0}}>Tenders</h1>
<span style={{background:'#fef3c7', color:'#92400e', fontSize:11, padding:'6px 12px', borderRadius:20, fontWeight:700}}>LIVE Mode - {q}</span>
</div>

<div style={{background:'white', borderRadius:28, padding:16, border:'1px solid #eee', boxShadow:'0 2px 20px rgba(0,0,0,0.05)', marginBottom:16}}>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Keyword" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'16px 20px', outline:'none', fontSize:15, boxSizing:'border-box'}}/>
<div style={{display:'grid', gap:10, marginTop:12}}>
<div style={{background:'#f3f3f5', borderRadius:100, padding:'16px 20px', display:'flex', justifyContent:'space-between', fontWeight:600}}>Department <span>↕</span></div>
<div style={{background:'#f3f3f5', borderRadius:100, padding:'16px 20px', display:'flex', justifyContent:'space-between', fontWeight:600}}>State <span>↕</span></div>
<div style={{background:'#f3f3f5', borderRadius:100, padding:'16px 20px', display:'flex', justifyContent:'space-between', fontWeight:600}}>City <span>↕</span></div>
<div style={{background:'#f3f3f5', borderRadius:100, padding:'16px 20px', display:'flex', justifyContent:'space-between', fontWeight:600}}>Tender Value <span>↕</span></div>
</div>
<button onClick={search} style={{width:'100%', background:'#5b4bff', color:'white', borderRadius:100, padding:16, marginTop:16, fontWeight:800, fontSize:16, border:'none'}}>Search</button>
</div>

<div style={{display:'flex', gap:8, marginBottom:16, overflowX:'auto'}}>
<span style={{padding:'8px 18px', border:'1px solid #e5e7eb', borderRadius:100, background:'white', fontWeight:700, fontSize:13}}>ALL</span>
<span style={{padding:'8px 18px', border:'1px solid #e5e7eb', borderRadius:100, background:'white', fontWeight:700, fontSize:13}}>NEW</span>
<span style={{padding:'8px 18px', border:'1px solid #e5e7eb', borderRadius:100, background:'white', fontWeight:700, fontSize:13}}>CLOSING SOON</span>
<span style={{padding:'8px 18px', borderRadius:100, background:'#5b4bff', color:'white', fontWeight:700, fontSize:13}}>RECOMMENDED</span>
</div>

<div style={{display:'grid', gap:12, marginBottom:24}}>
{tenders.map((t:any,i)=><div key={i} style={{background:'#effff3', border:'1px solid #bbf7d0', borderRadius:20, padding:16}}>
<div style={{color:'#15803d', fontSize:11, fontWeight:900, marginBottom:4}}>LIVE • LIVE</div>
<div style={{fontWeight:800, fontSize:16, lineHeight:'1.2'}}>{t.title}</div>
<div style={{fontSize:13, color:'#6b7280', marginTop:6}}>{t.dept} • • {t.value}</div>
</div>)}
</div>

<div style={{background:'white', border:'1px solid #eee', borderRadius:24, padding:16}}>
<h3 style={{fontWeight:900, margin:'0 0 12px 0'}}>🤖 Vikram AI Chat</h3>
<div style={{background:'#f6f6f7', borderRadius:16, padding:12, height:180, overflowY:'auto', display:'grid', gap:8, marginBottom:12}}>
{chat.map((c:any,i)=><div key={i} style={{fontSize:13, padding:'10px 12px', borderRadius:14, maxWidth:'85%', background: c.r==='user'?'black':'white', color: c.r==='user'?'white':'black', marginLeft: c.r==='user'?'auto':'0', border: c.r==='user'?'none':'1px solid #eee'}}>{c.t}</div>)}
</div>
<div style={{display:'flex', gap:8}}>
<input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={(e:any)=>e.key==='Enter'&&send()} placeholder="Tender ke baare me pucho.." style={{flex:1, border:'1px solid #e5e7eb', borderRadius:100, padding:'12px 16px', outline:'none'}}/>
<button onClick={send} style={{background:'black', color:'white', padding:'0 24px', borderRadius:100, fontWeight:700, border:'none'}}>Send</button>
</div>
</div>

</div>
)
}
