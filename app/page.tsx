'use client'
import { useState } from 'react'

export default function Page(){
 const [q,setQ]=useState('construction')
 const [tenders,setTenders]=useState([{title:'Live construction Tender - UP PWD', dept:'UP PWD • • 50 Lakhs'}])
 const [chat,setChat]=useState([{r:'ai',t:'Hi! Mai Vikram AI hu. Tender pucho - jaise "UP PWD 50 lakh"'}])
 const [inp,setInp]=useState('')
 const [loading,setLoading]=useState(false)

 const search=async()=>{
  setLoading(true)
  try{
   const res=await fetch(`/api/live-tenders?q=${q}`)
   const d=await res.json()
   if(d.tenders?.length) setTenders(d.tenders.map((x:any)=>({title:x.title||x.name, dept:`${x.dept||'UP PWD'} • • ${x.value||'50 Lakhs'}`})))
  }catch{}
  setLoading(false)
 }
 const send=()=>{
  if(!inp.trim()) return
  setChat([...chat,{r:'user',t:inp},{r:'ai',t:`Tumne "${inp}" pucha. Mai ${q} ke best tenders UP eProcure se nikal raha hu.`}])
  setQ(inp); setInp('')
 }

 return(
 <div className="min-h-screen bg-[#fafafb] p-4 max-w-3xl mx-auto">
  <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-black">Tenders</h1><span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">LIVE Mode - {q}</span></div>
  
  <div className="bg-white rounded-[28px] p-5 shadow-sm border mb-4">
   <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Keyword" className="w-full border rounded-full px-5 py-4 mb-3 outline-none" />
   <div className="grid gap-3">
    <div className="bg-gray-100 rounded-full px-5 py-4 flex justify-between">Department <span>⇅</span></div>
    <div className="bg-gray-100 rounded-full px-5 py-4 flex justify-between">State <span>⇅</span></div>
    <div className="bg-gray-100 rounded-full px-5 py-4 flex justify-between">City <span>⇅</span></div>
    <div className="bg-gray-100 rounded-full px-5 py-4 flex justify-between">Tender Value <span>⇅</span></div>
   </div>
   <button onClick={search} className="w-full bg-[#5b4bff] text-white rounded-full py-4 mt-4 font-bold">{loading?'Searching...':'Search'}</button>
  </div>

  <div className="flex gap-2 overflow-x-auto mb-4">
   <button className="px-5 py-2 border rounded-full bg-white font-bold">ALL</button>
   <button className="px-5 py-2 border rounded-full bg-white font-bold">NEW</button>
   <button className="px-5 py-2 border rounded-full bg-white font-bold">CLOSING SOON</button>
   <button className="px-5 py-2 border rounded-full bg-[#5b4bff] text-white font-bold">RECOMMENDED</button>
  </div>

  <div className="space-y-3 mb-6">
   {tenders.map((t,i)=>(
    <div key={i} className="bg-green-50 border border-green-100 rounded-2xl p-4"><div className="text-green-700 text-xs font-bold mb-1">LIVE • LIVE</div><div className="font-bold">{t.title}</div><div className="text-sm text-gray-600">{t.dept}</div></div>
   ))}
  </div>

  <div className="bg-white border rounded-[24px] p-4">
   <h3 className="font-bold mb-2">🤖 Vikram AI Chat</h3>
   <div className="bg-gray-50 rounded-xl p-3 h-48 overflow-y-auto mb-3 space-y-2">
    {chat.map((c,i)=><div key={i} className={`text-sm p-2 rounded-xl max-w-[85%] ${c.r==='user'?'bg-black text-white ml-auto':'bg-white border'}`}>{c.t}</div>)}
   </div>
   <div className="flex gap-2"><input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Tender ke baare me pucho..." className="flex-1 border rounded-full px-4 py-3" /><button onClick={send} className="bg-black text-white px-6 rounded-full">Send</button></div>
  </div>
 </div>
 )
}
