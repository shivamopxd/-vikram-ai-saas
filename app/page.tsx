'use client'
import {useState, useEffect} from 'react'

const supabaseMock = {
  auth: {
    signIn: async (email:string) => ({data:{user:{id:'mock-id', email}}, error:null}),
    signOut: async () => ({})
  },
  from: (table:string) => ({
    insert: async (data:any) => { console.log('Insert to', table, data); return {error:null} },
    select: async () => ({data: [], error:null}),
    update: async () => ({data: [], error:null})
  })
}

export default function VikramPro(){
const [isLogin,setIsLogin]=useState(false)
const [email,setEmail]=useState('')
const [tab,setTab]=useState('tenders')
const [plan,setPlan]=useState('Free')
const [showPay,setShowPay]=useState(false)
const [redeemCode,setRedeemCode]=useState('')
const [company,setCompany]=useState({name:'Vikram Industries Pvt Ltd', gstin:'27ABCDE1234F1Z5', pan:'ABCDE1234F'})

useEffect(()=>{
  const s=localStorage.getItem('vikram_user')
  if(s){ setIsLogin(true); const d=JSON.parse(s); setEmail(d.email); setPlan(d.plan||'Free') }
},[])

const login=async()=>{
  if(!email.includes('@')) return alert('Email daalo')
  localStorage.setItem('vikram_user', JSON.stringify({email, plan:'Free'}))
  setIsLogin(true)
  // Real Supabase call: await supabase.from('profiles').insert({id, email})
}

const logout=()=>{
  localStorage.removeItem('vikram_user')
  setIsLogin(false)
}

const handlePurchase=async(type:string)=>{
  if(type==='Starter'){
    setShowPay(true)
  } else {
    setPlan('Free')
    localStorage.setItem('vikram_user', JSON.stringify({email, plan:'Free'}))
  }
}

const confirmPay=async()=>{
  // Insert payment to Supabase
  // await supabase.from('payments').insert({user_id, amount:99900, status:'SUCCESS'})
  // await supabase.from('subscriptions').insert({user_id, plan:'PRO ACTIVE', status:'ACTIVE'})
  setPlan('PRO ACTIVE')
  localStorage.setItem('vikram_user', JSON.stringify({email, plan:'PRO ACTIVE'}))
  setShowPay(false)
  alert('Payment Successful! PRO ACTIVE unlocked via PhonePe Test Mode')
  setTab('tenders')
}

const handleRedeem=()=>{
  const codes:any = {'DEMO-TRIAL-14':'Trial','DEMO-STARTER-30':'Starter','VIKRAM-VIP-2026':'PRO ACTIVE'}
  if(codes[redeemCode]){
    setPlan(codes[redeemCode])
    localStorage.setItem('vikram_user', JSON.stringify({email, plan:codes[redeemCode]}))
    alert(`Code Valid! ${codes[redeemCode]} Activated`)
  } else alert('Invalid Code')
}

if(!isLogin){
return(
<div style={{minHeight:'100vh', background:'#0a0a0b', display:'flex', alignItems:'center', justifyContent:'center', padding:20, fontFamily:'system-ui'}}>
<div style={{background:'white', borderRadius:24, padding:28, width:'100%', maxWidth:380}}>
<div style={{fontSize:28, fontWeight:900}}>VIKRAM INDUSTRIES</div>
<div style={{fontSize:12, color:'#666', letterSpacing:2, marginBottom:20}}>VIKRAM AI PRO</div>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email ID - test@gmail.com" style={{width:'100%', background:'#f5f5f5', border:'1px solid #eee', borderRadius:12, padding:14, outline:'none'}}/>
<button onClick={login} style={{width:'100%', background:'black', color:'white', borderRadius:12, padding:14, fontWeight:800, marginTop:12, border:'none'}}>Continue with Email</button>
<div style={{fontSize:11, color:'#999', marginTop:12, textAlign:'center'}}>Supabase Auth se login hoga</div>
</div>
</div>
)
}

return(
<div style={{minHeight:'100vh', background:'#fafafa', display:'flex', fontFamily:'system-ui'}}>
{/* Sidebar */}
<div style={{width:260, background:'white', borderRight:'1px solid #e5e7eb', padding:16, display:'flex', flexDirection:'column', position:'fixed', height:'100vh', overflowY:'auto'}}>
<div style={{fontWeight:900, fontSize:14}}>VIKRAM INDUSTRIES</div>
<div style={{fontSize:10, color:'#666', letterSpacing:1}}>VIKRAM AI</div>
<div style={{marginTop:20, display:'grid', gap:4}}>
{[
{ id:'tenders', label:'Tenders' },
{ id:'docs', label:'My Documents' },
{ id:'workspace', label:'Tender Workspace' },
{ id:'compare', label:'Tender Comparison' },
{ id:'ask', label:'Ask VIKRAM' },
{ id:'notif', label:'Notifications (1)' },
{ id:'reports', label:'Reports' },
{ id:'profile', label:'Company Profile' },
{ id:'sub', label:'Subscription' },
{ id:'settings', label:'Settings' },
].map(m=><div key={m.id} onClick={()=>setTab(m.id)} style={{padding:'10px 12px', borderRadius:10, background: tab===m.id?'black':'transparent', color: tab===m.id?'white':'#333', fontSize:13, fontWeight: tab===m.id?700:500, cursor:'pointer'}}>{m.label}</div>)}
</div>
<div style={{marginTop:'auto', background:'#e0f2fe', borderRadius:16, padding:14}}>
<div style={{fontSize:12, fontWeight:800, color:'#0369a1'}}>{plan} - PRO ACTIVE</div>
<div style={{fontSize:11, color:'#0369a1'}}>Renews: 15 Oct 2026</div>
<button style={{width:'100%', background:'white', borderRadius:8, padding:8, fontSize:12, fontWeight:700, marginTop:8, border:'none'}}>Manage</button>
<button onClick={logout} style={{width:'100%', background:'#fee2e2', borderRadius:8, padding:8, fontSize:12, fontWeight:700, marginTop:8, border:'none'}}>Logout</button>
</div>
</div>

{/* Main */}
<div style={{marginLeft:260, flex:1, padding:20}}>
<div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
<input placeholder="Global search tenders, docs..." style={{background:'white', border:'1px solid #e5e7eb', borderRadius:12, padding:'10px 14px', width:300, outline:'none'}}/>
<div style={{display:'flex', gap:8, alignItems:'center'}}><span>🔔3</span><div style={{width:28, height:28, background:'black', color:'white', borderRadius:100, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12}}>VP</div></div>
</div>

{tab==='tenders' && <>
<div style={{display:'flex', gap:10, marginBottom:16}}><button style={{background:'#5b4bff', color:'white', borderRadius:10, padding:'10px 16px', border:'none', fontWeight:700}}>Upload Tender PDF</button><button style={{background:'white', border:'1px solid #ddd', borderRadius:10, padding:'10px 16px'}}>Compare (0)</button></div>
<div style={{background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:16, marginBottom:12}}>
<div style={{fontWeight:800}}>Supply of Office Furniture to CPWD Delhi</div>
<div style={{fontSize:12, color:'#666', marginTop:6, display:'flex', gap:8}}><span style={{background:'#f3f4f6', padding:'2px 8px', borderRadius:20}}>CPWD</span><span style={{background:'#ede9fe', color:'#5b4bff', padding:'2px 8px', borderRadius:20}}>Furniture</span><span>Delhi</span></div>
<div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginTop:12}}><div style={{background:'#f9fafb', padding:10, borderRadius:10}}><div style={{fontSize:11, color:'#666'}}>Value</div><div style={{fontWeight:700}}>Rs.45L</div></div><div style={{background:'#f9fafb', padding:10, borderRadius:10}}><div style={{fontSize:11, color:'#666'}}>EMD / Fee</div><div style={{fontWeight:700}}>Rs.90k / 5k</div></div><div style={{background:'#f9fafb', padding:10, borderRadius:10}}><div style={{fontSize:11, color:'#666'}}>Closes</div><div style={{fontWeight:700}}>2 days</div></div></div>
<div style={{display:'flex', gap:8, marginTop:12, alignItems:'center'}}><span style={{fontSize:12, fontWeight:700}}>Readiness 87/100</span><span style={{background:'#dcfce7', color:'#15803d', padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700}}>RECOMMENDED TO BID</span><button style={{marginLeft:'auto', background:'white', border:'1px solid #ddd', borderRadius:20, padding:'6px 12px', fontSize:11}}>Compare</button><button style={{background:'#5b4bff', color:'white', borderRadius:20, padding:'6px 12px', fontSize:11, border:'none'}}>Analyze</button></div>
</div>
</>}

{(tab==='settings' || tab==='profile') && <div style={{display:'grid', gap:16}}>
<div style={{background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:20}}>
<h3 style={{fontWeight:800, margin:0}}>Redeem Access Code</h3>
<p style={{fontSize:12, color:'#666'}}>Enter hashed codes - DEMO-TRIAL-14, DEMO-STARTER-30, VIKRAM-VIP-2026</p>
<div style={{display:'flex', gap:10, marginTop:12}}><input value={redeemCode} onChange={e=>setRedeemCode(e.target.value)} placeholder="Enter code e.g. VIKRAM-VIP" style={{flex:1, border:'1px solid #ddd', borderRadius:10, padding:10}}/><button onClick={handleRedeem} style={{background:'black', color:'white', borderRadius:10, padding:'10px 16px', border:'none', fontWeight:700}}>Validate</button></div>
</div>
<div style={{background:'white', borderRadius:16, border:'1px solid #e5e7eb', padding:20}}>
<h3 style={{fontWeight:800, margin:0}}>Company Profile</h3>
<input value={company.name} onChange={e=>setCompany({...company, name:e.target.value})} style={{width:'100%', background:'#f9fafb', border:'1px solid #eee', borderRadius:10, padding:10, marginTop:10}}/>
<div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:10}}><input value={company.gstin} onChange={e=>setCompany({...company, gstin:e.target.value})} style={{background:'#f9fafb', border:'1px solid #eee', borderRadius:10, padding:10}}/><input value={company.pan} onChange={e=>setCompany({...company, pan:e.target.value})} style={{background:'#f9fafb', border:'1px solid #eee', borderRadius:10, padding:10}}/></div>
</div>
</div>}

{(tab==='sub') && <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
<div style={{background:'white', borderRadius:20, border:'1px solid #e5e7eb', padding:20}}>
<div style={{fontWeight:800}}>Free - Rs.0/mo</div>
<div style={{fontSize:12, color:'#666', marginTop:8, display:'grid', gap:4}}><div>✓ 5 Tender Analyses</div><div>✓ 20 AI Questions</div><div>✓ Basic Support</div></div>
<button onClick={()=>handlePurchase('Free')} style={{width:'100%', background:'black', color:'white', borderRadius:10, padding:12, marginTop:16, border:'none', fontWeight:700}}>Choose Free</button>
</div>
<div style={{background:'white', borderRadius:20, border:'1px solid #5b4bff', padding:20}}>
<div style={{background:'#5b4bff', color:'white', fontSize:10, padding:'4px 8px', borderRadius:20, width:'fit-content'}}>MOST POPULAR</div>
<div style={{fontWeight:800, marginTop:8}}>Starter - Rs.999/mo</div>
<div style={{fontSize:12, color:'#666', marginTop:8, display:'grid', gap:4}}><div>✓ Unlimited Tenders</div><div>✓ AI Writer</div><div>✓ PhonePe Payment</div><div>✓ Priority Support</div></div>
<button onClick={()=>handlePurchase('Starter')} style={{width:'100%', background:'#5b4bff', color:'white', borderRadius:10, padding:12, marginTop:16, border:'none', fontWeight:700}}>Choose Starter - Pay with PhonePe</button>
</div>
</div>}

</div>
</div>

{showPay && <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
<div style={{background:'white', borderRadius:20, padding:20, width:'100%', maxWidth:360}}>
<div style={{fontWeight:900, fontSize:18}}>PhonePe Payment</div>
<div style={{background:'#f9fafb', borderRadius:12, padding:12, marginTop:12}}><div style={{display:'flex', justifyContent:'space-between', fontSize:13}}><span>Starter Plan</span><span>Rs.999</span></div><div style={{display:'flex', justifyContent:'space-between', fontSize:13, marginTop:6}}><span>GST 18%</span><span>Rs.180</span></div><div style={{display:'flex', justifyContent:'space-between', fontWeight:800, marginTop:10, paddingTop:10, borderTop:'1px solid #eee'}}><span>Total</span><span>Rs.1179</span></div></div>
<button onClick={confirmPay} style={{width:'100%', background:'#5f259f', color:'white', borderRadius:12, padding:14, fontWeight:800, marginTop:16, border:'none'}}>Pay with PhonePe - Rs.1179</button>
<button onClick={()=>setShowPay(false)} style={{width:'100%', background:'white', border:'1px solid #ddd', borderRadius:12, padding:12, marginTop:8}}>Cancel</button>
<div style={{fontSize:10, color:'#999', marginTop:8, textAlign:'center'}}>Test Mode - Real PhonePe keys baad me lagenge</div>
</div>
</div>}

</div>
)
}
