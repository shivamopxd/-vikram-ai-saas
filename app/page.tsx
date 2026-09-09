'use client'
import {useState, useEffect} from 'react'

export default function Page(){
const [tab,setTab]=useState('tenders')
const [isLogin,setIsLogin]=useState(false)
const [email,setEmail]=useState('')
const [q,setQ]=useState('construction')
const [tenders,setT]=useState([
{title:'CC Road & Drain Work - Nagar Nigam Lucknow', dept:'UP PWD', value:'₹42.5L', loc:'Lucknow'},
{title:'Electrical Supply - Jal Nigam Kanpur', dept:'UP Jal Nigam', value:'₹18L', loc:'Kanpur'},
])

useEffect(()=>{ if(localStorage.getItem('vikram_final')) setIsLogin(true) },[])

if(!isLogin){
return(
<div style={{minHeight:'100vh', background:'#f6f6f7', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'system-ui'}}>
<div style={{background:'white', width:'100%', maxWidth:380, borderRadius:28, padding:28, border:'1px solid #eee', boxShadow:'0 20px 60px rgba(0,0,0,0.08)'}}>
<div style={{width:48, height:48, background:'black', color:'white', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:20}}>V</div>
<h1 style={{fontSize:26, fontWeight:900, margin:'14px 0 0 0', letterSpacing:-0.5}}>Vikram AI SaaS</h1>
<p style={{fontSize:13, color:'#6b7280', marginTop:6}}>Professional Tender Management for UP Contractors</p>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Work email - your@company.com" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'14px 18px', marginTop:22, outline:'none', fontSize:14, boxSizing:'border-box'}}/>
<input type="password" placeholder="Password" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'14px 18px', marginTop:12, outline:'none', fontSize:14, boxSizing:'border-box'}}/>
<button onClick={()=>{ if(email.includes('@')){ localStorage.setItem('vikram_final','1'); setIsLogin(true)}else alert('Valid email dalo')}} style={{width:'100%', background:'black', color:'white', borderRadius:100, padding:'14px', fontWeight:800, marginTop:18, border:'none', fontSize:14}}>Continue to Dashboard</button>
<div style={{fontSize:11, color:'#9ca3af', marginTop:14, textAlign:'center'}}>Secure login • Demo: any email will work</div>
</div>
</div>
)
}

const pill=(a:boolean)=>({padding:'10px 20px', borderRadius:100, fontWeight:800, fontSize:13, border:'none', background: a?'black':'white', color: a?'white':'#6b7280', borderBottom: a?'none':'1px solid #eee', boxShadow: a?'none':'0 1px 0 #eee'})

return(
<div style={{minHeight:'100vh', background:'#f7f7f8', maxWidth:440, margin:'0 auto', padding:'20px 16px 100px 16px', fontFamily:'system-ui'}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18}}>
<h1 style={{fontSize:22, fontWeight:900, margin:0}}>{tab==='tenders'?'Live Tenders':tab==='docs'?'Document Vault':tab==='purchase'?'Billing':'Vikram AI'}</h1>
<div style={{display:'flex', gap:8}}><span style={{background:'#dcfce7', color:'#166534', fontSize:11, padding:'6px 10px', borderRadius:20, fontWeight:800}}>● LIVE</span><button onClick={()=>{localStorage.removeItem('vikram_final'); setIsLogin(false)}} style={{background:'#fee2e2', border:'none', fontSize:11, padding:'6px 10px', borderRadius:20, fontWeight:800}}>Logout</button></div>
</div>

{tab==='tenders' && <div style={{display:'grid', gap:12}}>
<div style={{background:'white', borderRadius:24, padding:16, border:'1px solid #eee'}}>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="construction" style={{width:'100%', border:'1px solid #e5e7eb', borderRadius:100, padding:'14px 18px', boxSizing:'border-box'}}/>
<button style={{width:'100%', background:'#5b4bff', color:'white', borderRadius:100, padding:13, fontWeight:800, marginTop:12, border:'none'}}>Search Tenders</button>
</div>
{tenders.map((t,i)=><div key={i} style={{background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:20, padding:16}}><div style={{fontSize:11, fontWeight:800, color:'#15803d'}}>{t.loc} • Closing soon</div><div style={{fontWeight:800, fontSize:15, marginTop:4}}>{t.title}</div><div style={{fontSize:12, color:'#6b7280', marginTop:4}}>{t.dept} • {t.value}</div><div style={{display:'flex', gap:8, marginTop:10}}><button style={{background:'black', color:'white', borderRadius:100, padding:'7px 14px', fontSize:11, fontWeight:700, border:'none'}}>View BOQ</button><button style={{background:'white', border:'1px solid #ddd', borderRadius:100, padding:'7px 14px', fontSize:11, fontWeight:700}}>Ask AI</button></div></div>)}
</div>}

{tab==='docs' && <div style={{display:'grid', gap:10}}>
{[{n:'PAN Card', s:'Verified'},{n:'GST Certificate', s:'Verified'},{n:'EMD Receipt', s:'Upload'},{n:'BOQ Document', s:'AI Generated'},{n:'Company Registration', s:'Verified'}].map((d,i)=><div key={i} style={{background:'white', borderRadius:20, padding:16, border:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{fontWeight:800, fontSize:14}}>{d.n}</div><div style={{fontSize:11, color:'#6b7280'}}>Required for tender</div></div><span style={{fontSize:11, padding:'6px 10px', borderRadius:20, fontWeight:800, background: d.s==='Verified'?'#dcfce7':'#fef3c7', color: d.s==='Verified'?'#166534':'#92400e'}}>{d.s}</span></div>)}
</div>}

{tab==='purchase' && <div style={{display:'grid', gap:12}}>
<div style={{background:'#5b4bff', borderRadius:26, padding:20, color:'white'}}><div style={{fontSize:11, background:'rgba(255,255,255,0.2)', display:'inline-block', padding:'4px 10px', borderRadius:20, fontWeight:800}}>MOST POPULAR</div><div style={{fontSize:20, fontWeight:900, marginTop:10}}>Pro Plan - ₹999/mo</div><div style={{fontSize:12, opacity:0.9, marginTop:4}}>Unlimited + AI Writer + Vault</div><button style={{width:'100%', background:'white', color:'#5b4bff', borderRadius:100, padding:12, fontWeight:900, marginTop:14, border:'none'}}>Upgrade to Pro</button></div>
<div style={{background:'white', borderRadius:20, padding:16, border:'1px solid #eee'}}><div style={{fontWeight:800}}>Free Plan - ₹0</div><div style={{fontSize:12, color:'#6b7280'}}>5 Tenders/day</div></div>
</div>}

{tab==='ai' && <div style={{background:'white', borderRadius:24, padding:16, border:'1px solid #eee'}}><div style={{fontWeight:900, marginBottom:10}}>🤖 Vikram AI</div><div style={{background:'#f6f6f7', borderRadius:16, padding:12, height:300, overflowY:'auto'}}><div style={{fontSize:13, background:'white', border:'1px solid #eee', padding:10, borderRadius:12}}>Hi! Tender ke baare me pucho, mai eligibility aur EMD bata dunga.</div></div></div>}

<div style={{position:'fixed', bottom:14, left:'50%', transform:'translateX(-50%)', width:'92%', maxWidth:380, background:'white', borderRadius:100, border:'1px solid #eee', display:'flex', justifyContent:'space-between', padding:6, boxShadow:'0 12px 30px rgba(0,0,0,0.15)'}}>
<button onClick={()=>setTab('tenders')} style={pill(tab==='tenders')}>Tenders</button>
<button onClick={()=>setTab('docs')} style={pill(tab==='docs')}>Vault</button>
<button onClick={()=>setTab('purchase')} style={pill(tab==='purchase')}>Billing</button>
<button onClick={()=>setTab('ai')} style={pill(tab==='ai')}>AI</button>
</div>
</div>
)
}
