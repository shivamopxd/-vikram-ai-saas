'use client'
import {useState, useEffect} from 'react'

export default function Page(){
const [tab,setTab]=useState('tenders')
const [isLogin,setIsLogin]=useState(false)
const [email,setEmail]=useState('')
const [q,setQ]=useState('construction')
const [tenders,setT]=useState([
{title:'Construction of CC Road & Drain - Nagar Nigam Lucknow', dept:'UP PWD', value:'₹ 42.5 Lakhs', deadline:'18 Aug • 3 days left', location:'Lucknow'},
{title:'Supply of Electrical Items for PHED', dept:'UP Jal Nigam', value:'₹ 18 Lakhs', deadline:'21 Aug • 6 days left', location:'Kanpur'},
])
const [chat,setChat]=useState([{r:'ai',t:'Hi, I am Vikram AI. Ask me about any tender, EMD, BOQ or eligibility.'}])
const [inp,setInp]=useState('')

useEffect(()=>{ if(localStorage.getItem('vikram_pro')) setIsLogin(true) },[])

if(!isLogin){
return(
<div className="min-h-screen bg-[#f7f7f8] flex items-center justify-center p-6">
<div className="bg-white w-full max-w-[380px] rounded-[32px] p-8 border shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
<div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-xl mb-6">V</div>
<h1 className="text-[26px] font-black tracking-tight">Vikram AI SaaS</h1>
<p className="text-[13px] text-gray-500 mt-1">Professional Tender Management for UP Contractors</p>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Work email" className="w-full mt-6 border border-gray-200 rounded-full px-5 py-3.5 outline-none text-sm focus:border-black"/>
<input type="password" placeholder="Password" className="w-full mt-3 border border-gray-200 rounded-full px-5 py-3.5 outline-none text-sm"/>
<button onClick={()=>{if(email.includes('@')){localStorage.setItem('vikram_pro','1'); setIsLogin(true)}else alert('Valid email dalo')}} className="w-full bg-black text-white rounded-full py-3.5 mt-5 font-bold text-sm">Continue to Dashboard</button>
<p className="text-[11px] text-gray-400 mt-4 text-center">By continuing, you agree to Terms & Privacy</p>
</div>
</div>
)
}

const Card = ({children, className=''}:any)=><div className={`bg-white rounded-[24px] border border-gray-100 p-4 shadow-sm ${className}`}>{children}</div>

return(
<div className="min-h-screen bg-[#f7f7f8] max-w-[440px] mx-auto pb-[100px] px-4 pt-6">
<div className="flex justify-between items-center mb-6">
<h1 className="text-[24px] font-black">{tab==='tenders'?'Live Tenders':tab==='docs'?'Vault':tab==='purchase'?'Billing':'Vikram AI'}</h1>
<div className="flex gap-2"><span className="bg-green-100 text-green-800 text-[11px] px-3 py-1 rounded-full font-bold">● LIVE</span><button onClick={()=>{localStorage.removeItem('vikram_pro'); setIsLogin(false)}} className="text-[11px] bg-gray-100 px-3 py-1 rounded-full font-bold">Logout</button></div>
</div>

{tab==='tenders' && <>
<Card>
<div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 bg-gray-50 border rounded-full px-5 py-3.5 outline-none text-sm" placeholder="Search - PWD, road, Lucknow"/><button className="bg-[#5b4bff] text-white px-6 rounded-full font-bold text-sm">Search</button></div>
<div className="grid grid-cols-2 gap-2 mt-3 text-[13px]"><div className="bg-gray-50 rounded-full px-4 py-3 font-medium flex justify-between">Department <span>↕</span></div><div className="bg-gray-50 rounded-full px-4 py-3 font-medium flex justify-between">Lucknow <span>↕</span></div></div>
</Card>
<div className="flex gap-2 my-4 overflow-auto"><span className="bg-black text-white px-5 py-2 rounded-full text-[12px] font-bold">Recommended</span><span className="bg-white border px-5 py-2 rounded-full text-[12px] font-bold">New</span><span className="bg-white border px-5 py-2 rounded-full text-[12px] font-bold">Closing Soon</span></div>
<div className="grid gap-3">{tenders.map((t,i)=><Card key={i} className="!bg-[#f0fdf4]!border-green-100"><div className="text-[11px] font-black text-green-700">{t.deadline} • {t.location}</div><div className="font-bold text-[15px] leading-tight mt-1">{t.title}</div><div className="text-[12px] text-gray-500 mt-1">{t.dept} • {t.value}</div><div className="flex gap-2 mt-3"><button className="bg-black text-white text-[12px] px-4 py-2 rounded-full font-bold">View BOQ</button><button className="bg-white border text-[12px] px-4 py-2 rounded-full font-bold">Ask AI</button></div></Card>)}</div>
</>}

{tab==='docs' && <div className="grid gap-3">
{[
{ name:'PAN Card', status:'Verified', color:'green'},
{ name:'GST Certificate', status:'Verified', color:'green'},
{ name:'EMD Receipt - PWD/2024', status:'Upload', color:'amber'},
{ name:'BOQ - Lucknow Road', status:'AI Generated', color:'blue'},
{ name:'Company Registration', status:'Verified', color:'green'},
].map((d,i)=><Card key={i}><div className="flex justify-between items-center"><div><div className="font-bold text-[14px]">{d.name}</div><div className="text-[11px] text-gray-500">Last updated 2 days ago</div></div><span className={`text-[11px] px-3 py-1 rounded-full font-bold ${d.color==='green'?'bg-green-100 text-green-800': d.color==='amber'?'bg-amber-100 text-amber-800':'bg-blue-100 text-blue-800'}`}>{d.status}</span></div></Card>)}
<Card className="border-dashed!bg-gray-50 text-center py-8"><div className="text-[13px] font-bold">+ Upload New Document</div><div className="text-[11px] text-gray-400 mt-1">PDF, JPG up to 10MB</div></Card>
</div>}

{tab==='purchase' && <div className="grid gap-3">
<div className="bg-[#5b4bff] rounded-[28px] p-6 text-white"><div className="text-[11px] bg-white/20 w-fit px-3 py-1 rounded-full font-bold">MOST POPULAR</div><div className="text-[22px] font-black mt-3">Pro - ₹999/mo</div><div className="text-[13px] opacity-80 mt-1">Unlimited live tenders, AI bid writer, auto-filled forms, 24x7 support.</div><ul className="text-[12px] mt-4 space-y-1 opacity-90"><li>✓ Unlimited Tender Search</li><li>✓ AI BOQ & Cover Letter</li><li>✓ Document Vault</li></ul><button onClick={()=>alert('Razorpay integration - Payment link will be added')} className="w-full bg-white text-[#5b4bff] rounded-full py-3.5 mt-5 font-black text-sm">Upgrade to Pro</button></div>
<Card><div className="flex justify-between"><div><div className="font-bold">Starter</div><div className="text-[12px] text-gray-500">₹0 / month - 5 tenders/day</div></div><div className="font-black">Free</div></div></Card>
</div>}

{tab==='ai' && <Card><div className="h-[420px] overflow-auto space-y-3 pr-1">{chat.map((c:any,i)=><div key={i} className={`text-[13px] p-3 rounded-2xl max-w-[85%] ${c.r==='user'?'bg-black text-white ml-auto':'bg-gray-50 border'}`}>{c.t}</div>)}</div><div className="flex gap-2 mt-4"><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){setChat([...chat,{r:'user',t:inp},{r:'ai',t:`Analyzing "${inp}"...`} ]); setInp('')}}} placeholder="Ask about eligibility, EMD..." className="flex-1 border rounded-full px-4 py-3 text-sm outline-none"/><button onClick={()=>{if(!inp.trim())return; setChat([...chat,{r:'user',t:inp},{r:'ai',t:`Analyzing "${inp}"...`} ]); setInp('')}} className="bg-black text-white px-5 rounded-full font-bold text-sm">Send</button></div></Card>}

<div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-white rounded-full border shadow-[0_10px_40px_rgba(0,0,0,0.12)] flex justify-between p-2">
{[
{ id:'tenders', label:'Tenders'},
{ id:'docs', label:'Vault'},
{ id:'purchase', label:'Billing'},
{ id:'ai', label:'AI'},
].map(t=><button key={t.id} onClick={()=>setTab(t.id)} className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition ${tab===t.id?'bg-black text-white':'text-gray-500'}`}>{t.label}</button>)}
</div>

</div>
)
}
