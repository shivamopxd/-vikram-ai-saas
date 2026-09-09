use client'
import { useState, useEffect } from 'react'

export default function Page() {
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [tab, setTab] = useState('tenders')
  const [plan, setPlan] = useState('Free')
  const [showPay, setShowPay] = useState(false)
  const [redeemCode, setRedeemCode] = useState('')

  useEffect(() => {
    const s = localStorage.getItem('vikram_user')
    if (s) {
      const d = JSON.parse(s)
      setIsLogin(true)
      setEmail(d.email)
      setPlan(d.plan || 'Free')
    }
  }, [])

  const login = () => {
    if (!email.includes('@')) return alert('Sahi email daalo')
    localStorage.setItem('vikram_user', JSON.stringify({ email, plan: 'Free' }))
    setIsLogin(true)
  }

  const logout = () => {
    localStorage.removeItem('vikram_user')
    setIsLogin(false)
    setEmail('')
  }

  const handleRedeem = () => {
    const codes: any = { 'DEMO-TRIAL-14': 'Trial', 'DEMO-STARTER-30': 'Starter', 'VIKRAM-VIP-2026': 'PRO ACTIVE' }
    if (codes[redeemCode]) {
      setPlan(codes[redeemCode])
      localStorage.setItem('vikram_user', JSON.stringify({ email, plan: codes[redeemCode] }))
      alert(`Activated: ${codes[redeemCode]}`)
    } else {
      alert('Invalid Code')
    }
  }

  const confirmPay = () => {
    setPlan('PRO ACTIVE')
    localStorage.setItem('vikram_user', JSON.stringify({ email, plan: 'PRO ACTIVE' }))
    setShowPay(false)
    alert('Payment Success via PhonePe Test - PRO ACTIVE Activated!')
    setTab('tenders')
  }

  if (!isLogin) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-5">
        <div className="bg-white rounded-[24px] p-7 w-full max-w-[380px]">
          <div className="font-black text-[22px]">VIKRAM INDUSTRIES</div>
          <div className="text-[10px] tracking-[2px] text-gray-500 mb-6">VIKRAM AI PRO</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none" />
          <button onClick={login} className="w-full bg-black text-white rounded-xl py-3.5 font-bold mt-3">Continue with Email</button>
          <div className="text-[11px] text-gray-400 mt-3 text-center">Login to publish ready</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex font-sans">
      <div className="w-[260px] bg-white border-r border-gray-200 p-4 fixed h-screen flex flex-col overflow-auto">
        <div className="font-black text-[13px]">VIKRAM INDUSTRIES</div>
        <div className="text-[10px] text-gray-500 tracking-widest">VIKRAM AI</div>
        <div className="mt-6 grid gap-1">
          {[
            { id: 'tenders', label: 'Tenders' },
            { id: 'docs', label: 'My Documents' },
            { id: 'workspace', label: 'Tender Workspace' },
            { id: 'compare', label: 'Tender Comparison' },
            { id: 'ask', label: 'Ask VIKRAM' },
            { id: 'notif', label: 'Notifications (1)' },
            { id: 'reports', label: 'Reports' },
            { id: 'profile', label: 'Company Profile' },
            { id: 'sub', label: 'Subscription' },
            { id: 'settings', label: 'Settings' },
          ].map((m) => (
            <div key={m.id} onClick={() => setTab(m.id)} className={`px-3 py-2.5 rounded-[10px] text-[13px] cursor-pointer ${tab === m.id ? 'bg-black text-white font-bold' : 'text-gray-700'}`}>{m.label}</div>
          ))}
        </div>
        <div className="mt-auto bg-sky-50 rounded-2xl p-3.5">
          <div className="text-[12px] font-bold text-sky-700">{plan} - ACTIVE</div>
          <div className="text-[11px] text-sky-600">Renews: 15 Oct 2026</div>
          <button className="w-full bg-white rounded-lg py-2 text-[12px] font-bold mt-2">Manage</button>
          <button onClick={logout} className="w-full bg-red-50 text-red-600 rounded-lg py-2 text-[12px] font-bold mt-2">Logout</button>
        </div>
      </div>

      <div className="ml-[260px] flex-1 p-5 max-w-[900px]">
        <div className="flex justify-between items-center mb-5">
          <input placeholder="Global search tenders..." className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-[320px] text-sm outline-none" />
          <div className="flex gap-2 items-center"><span>🔔3</span><div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-[11px]">VP</div></div>
        </div>

        {tab === 'tenders' && (
          <div className="space-y-3">
            <div className="flex gap-2"><button className="bg-[#5b4bff] text-white rounded-[10px] px-4 py-2.5 text-sm font-bold">Upload Tender PDF</button><button className="bg-white border rounded-[10px] px-4 py-2.5 text-sm">Compare (0)</button></div>
            <div className="bg-white rounded-2xl border p-5">
              <div className="font-bold">Supply of Office Furniture to CPWD Delhi</div>
              <div className="flex gap-2 mt-2 text-[11px]"><span className="bg-gray-100 px-2.5 py-1 rounded-full">CPWD</span><span className="bg-violet-100 text-violet-700 px-2.5 py-1 rounded-full">Furniture</span><span className="text-gray-500">Delhi</span></div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-gray-50 p-3 rounded-xl"><div className="text-[11px] text-gray-500">Value</div><div className="font-bold text-sm">Rs.45L</div></div>
                <div className="bg-gray-50 p-3 rounded-xl"><div className="text-[11px] text-gray-500">EMD / Fee</div><div className="font-bold text-sm">Rs.90k</div></div>
                <div className="bg-gray-50 p-3 rounded-xl"><div className="text-[11px] text-gray-500">Closes</div><div className="font-bold text-sm">2 days</div></div>
              </div>
              <div className="flex items-center gap-2 mt-4"><span className="text-xs font-bold">Readiness 87/100</span><span className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full">RECOMMENDED TO BID</span><button className="ml-auto border text-[11px] px-3 py-1.5 rounded-full">Compare</button><button className="bg-[#5b4bff] text-white text-[11px] px-3 py-1.5 rounded-full">Analyze</button></div>
            </div>
          </div>
        )}

        {(tab === 'settings' || tab === 'profile') && (
          <div className="grid gap-4">
            <div className="bg-white rounded-2xl border p-5">
              <div className="font-bold">Redeem Access Code</div>
              <div className="text-xs text-gray-500 mt-1">Codes: DEMO-TRIAL-14, DEMO-STARTER-30, VIKRAM-VIP-2026</div>
              <div className="flex gap-2 mt-3"><input value={redeemCode} onChange={(e) => setRedeemCode(e.target.value)} placeholder="Enter code e.g. VIKRAM-VIP" className="flex-1 border rounded-xl px-4 py-2.5 text-sm outline-none" /><button onClick={handleRedeem} className="bg-black text-white rounded-xl px-5 font-bold text-sm">Validate</button></div>
            </div>
            <div className="bg-white rounded-2xl border p-5">
              <div className="font-bold">Company Profile</div>
              <input defaultValue="Vikram Industries Pvt Ltd" className="w-full bg-gray-50 border rounded-xl px-4 py-2.5 mt-3 text-sm" />
              <div className="grid grid-cols-2 gap-3 mt-3"><input defaultValue="27ABCDE1234F1Z5" className="bg-gray-50 border rounded-xl px-4 py-2.5 text-sm" /><input defaultValue="ABCDE1234F" className="bg-gray-50 border rounded-xl px-4 py-2.5 text-sm" /></div>
            </div>
          </div>
        )}

        {tab === 'sub' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[20px] border p-5"><div className="font-bold">Free - Rs.0/mo</div><div className="text-xs text-gray-500 mt-3 space-y-1"><div>✓ 5 Tender Analyses</div><div>✓ 20 AI Questions</div></div><button onClick={() => setPlan('Free')} className="w-full bg-black text-white rounded-xl py-3 mt-5 font-bold text-sm">Choose Free</button></div>
            <div className="bg-white rounded-[20px] border-2 border-[#5b4bff] p-5"><div className="bg-[#5b4bff] text-white text-[10px] px-2.5 py-1 rounded-full w-fit">MOST POPULAR</div><div className="font-bold mt-2">Starter - Rs.999/mo</div><div className="text-xs text-gray-500 mt-3 space-y-1"><div>✓ Unlimited Tenders</div><div>✓ AI Writer</div><div>✓ PhonePe Payment</div></div><button onClick={() => setShowPay(true)} className="w-full bg-[#5b4bff] text-white rounded-xl py-3 mt-5 font-bold text-sm">Choose Starter - PhonePe</button></div>
          </div>
        )}
      </div>

      {showPay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-[20px] p-5 w-full max-w-[360px]">
            <div className="font-black text-[18px]">PhonePe Payment</div>
            <div className="bg-gray-50 rounded-xl p-3 mt-3 text-sm space-y-2"><div className="flex justify-between"><span>Starter Plan</span><span>Rs.999</span></div><div className="flex justify-between"><span>GST 18%</span><span>Rs.180</span></div><div className="flex justify-between font-black border-t pt-2 mt-2"><span>Total</span><span>Rs.1179</span></div></div>
            <button onClick={confirmPay} className="w-full bg-[#5f259f] text-white rounded-xl py-3.5 font-bold mt-4">Pay with PhonePe - Rs.1179</button>
            <button onClick={() => setShowPay(false)} className="w-full bg-white border rounded-xl py-3 mt-2 text-sm">Cancel</button>
            <div className="text-[10px] text-gray-400 text-center mt-2">Test Mode - Real keys baad me</div>
          </div>
        </div>
      )}
    </div>
  )
}
