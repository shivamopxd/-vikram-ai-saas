'use client'
import {useState, useEffect} from 'react'

export default function Page(){
const [tab,setTab]=useState('tenders')
const [isLogin,setIsLogin]=useState(false)
const [email,setEmail]=useState('')
const [pass,setPass]=useState('')
const [q,setQ]=useState('construction')
const [tenders,setT]=useState([{title:'Live construction Tender - UP PWD',dept:'UP PWD',value:'50 Lakhs'}])
const [chat,setChat]=useState([{r:'ai',t:'Hi! Mai Vikram AI hu. Login ke baad sab features unlock honge.'}])
const [inp,setInp]=useState('')

useEffect(()=>{ const saved = localStorage.getItem('vikram_login'); if(saved) setIsLogin(true) },[])

const login=()=>{
  if(!email.includes('@')) return alert('Email daalo')
  localStorage.setItem('vikram_login', email)
  setIsLogin(true)
}
const logout=()=>{ localStorage.removeItem('vikram_login'); setIsLogin(false) }

const card={background:'white', borderRadius:24, padding:16, border:'1px solid #eee', boxShadow:'0 2px 20px rgba(0,0,0,0.05)', marginBottom:16}
const pill=(active:boolean)=>({padding:'10px 18px', borderRadius:100, fontWeight:800, fontSize:13, border:'1px solid #e5e7eb', background: active?'#5b4bff':'white', color: active?'white':'black'})

// LOGIN SCREEN
if(!isLogin){
return(
<div style={{minHeight:'100vh', background:'#fafafb', display:'flex', alignItems:'center', justifyContent:'center', padding:16, fontFamily:'-apple-system, sans-serif'}}>
<div style={{...card, width:'100%', maxWidth:360, textAlign:'center' as any}}>
<div style={{fontSize:40, marginBottom:12}}>🤖</div>
<h1 style={{fontSize:26, fontWeight:900, margin:0}}>Vikram AI SaaS</h1>
<p style={{fontSize:13, color:'#6b7280', marginTop:6}}>Login to access Tenders + Docs + Purchase</p>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email - test@gmail.com" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'14px 18px', marginTop:20, boxSizing:'border-box'}}/>
<input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password - 123456" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'14px 18px', marginTop:12, boxSizing:'border-box'}}/>
<button onClick={login} style={{width:'100%', background:'#5b4bff', color:'white', borderRadius:100, padding:14, fontWeight:900, marginTop:16, border:'none', fontSize:16}}>Login / Signup</button>
<div style={{fontSize:11, color:'#9ca3af', marginTop:12}}>Demo ke liye koi bhi email daal do</div>
</div>
</div>
)
}

return(
<div style={{minHeight:'100vh', background:'#fafafb', padding:'16px 16px 90px 16px', maxWidth:420, margin:'0 auto', fontFamily:'-apple-system, sans-serif'}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
<h1 style={{fontSize:22, fontWeight:900, margin:0}}>{tab==='tenders'?'Tenders':tab==='docs'?'Documents':tab==='purchase'?'Purchase':'Vikram AI'}</h1>
<div style={{display:'flex', gap:8, alignItems:'center'}}>
<span style={{background:'#fef3c7', fontSize:11, padding:'6px 12px', borderRadius:20, fontWeight:700}}>LIVE</span>
<button onClick={logout} style={{fontSize:11, background:'#fee2e2', border:'none', padding:'6px 10px', borderRadius:20, fontWeight:700}}>Logout</button>
</div>
</div>

{tab==='tenders' && <><div style={card}><input value={q} onChange={e=>setQ(e.target.value)} placeholder="construction" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'16px 20px', boxSizing:'border-box'}}/><button style={{width:'100%', background:'#5b4bff', color:'white', borderRadius:100, padding:14, marginTop:12, fontWeight:800, border:'none'}}>Search</button></div>
<div style={{display:'grid', gap:12}}>{tenders.map((t:any,i)=><div key={i} style={{background:'#effff3', borderRadius:20, padding:16, border:'1px solid #bbf7d0'}}><div style={{fontWeight:800}}>{t.title}</div><div style={{fontSize:13, color:'#6b7280'}}>{t.dept} • {t.value}</div></div>)}</div></>}

{tab==='docs' && <div style={{display:'grid', gap:12}}>{['PAN Card','GST Certificate','EMD Receipt','BOQ Document','Technical Bid','Company Registration'].map((d,i)=><div key={i} style={card}><b>{d}</b><div style={{fontSize:12, color:'#6b7280'}}>Required for tender</div></div>)}</div>}

{tab==='purchase' && <div style={{display:'grid', gap:12}}><div style={{...card, background:'#5b4bff', color:'white'}}><b>Pro Plan - ₹999/mo</b><div style={{fontSize:13, marginTop:4}}>Unlimited + AI Writer</div><button style={{width:'100%', background:'white', color:'#5b4bff', borderRadius:100, padding:12, fontWeight:900, marginTop:12, border:'none'}}>Purchase Now</button></div><div style={card}><b>Free Plan - ₹0</b><div style={{fontSize:12, color:'#6b7280'}}>5 Tenders/day</div></div></div>}

{tab==='ai' && <div style={card}><div style={{height:300, overflowY:'auto', display:'grid', gap:8, marginBottom:12}}>{chat.map((c:any,i)=><div key={i} style={{padding:10, borderRadius:12, background: c.r==='user'?'black':'#f3f3f5', color: c.r==='user'?'white':'black', marginLeft: c.r==='user'?'auto':'0', maxWidth:'80%', fontSize:13}}>{c.t}</div>)}</div><div style={{display:'flex', gap:8}}><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={(e:any)=>e.key==='Enter'&&(()=>{if(!inp.trim())return; setChat([...chat,{r:'user',t:inp},{r:'ai',t:'Result...'}]); setInp('')})()} placeholder="Pucho..." style={{flex:1, border:'1px solid #eee', borderRadius:100, padding:'12px 16px'}}/><button onClick={()=>{if(!inp.trim())return; setChat([...chat,{r:'user',t:inp},{r:'ai',t:'Result...'}]); setInp('')}} style={{background:'black', color:'white', borderRadius:100, padding:'0 18px', border:'none'}}>Send</button></div></div>}

<div style={{position:'fixed', bottom:12, left:'50%', transform:'translateX(-50%)', width:'92%', maxWidth:400, background:'white', borderRadius:100, border:'1px solid #eee', display:'flex', justifyContent:'space-around', padding:'8px', boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
<button onClick={()=>setTab('tenders')} style={{...pill(tab==='tenders'), border:'none'}}>Tenders</button>
<button onClick={()=>setTab('docs')} style={{...pill(tab==='docs'), border:'none'}}>Docs</button>
<button onClick={()=>setTab('purchase')} style={{...pill(tab==='purchase'), border:'none'}}>Purchase</button>
<button onClick={()=>setTab('ai')} style={{...pill(tab==='ai'), border:'none'}}>AI</button>
</div>
</div>
)
}
