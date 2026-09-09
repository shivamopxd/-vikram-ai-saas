"use client"
import { useState, useEffect } from "react"

const SUPABASE_URL = "https://oixykwrzqaprrenighvd.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peHlrd3J6cWFwcnJlbmlnaHZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjI0MjAsImV4cCI6MjEwNDUzODQyMH0.xDxEeKtsdVIAES6wVyNIubqM2pcl7JzZeDD20ssseRY"

// No npm install needed - direct fetch to Supabase Auth REST API
async function supabaseSignUp(email: string, password: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.msg || data.error_description || "Signup failed")
  return data
}
async function supabaseSignIn(email: string, password: string) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error_description || "Login failed")
  return data
}

type Tender = { id: string; title: string; org: string; cat: string; city: string; value: string; emd: string; closes: string; readiness: number; status: string; icon: string; }
const TENDERS: Tender[] = [
  { id: "1", title: "Supply of Office Furniture to CPWD Delhi", org: "CPWD", cat: "Furniture", city: "Delhi", value: "₹45L", emd: "₹90k / ₹5k", closes: "2 days", readiness: 87, status: "RECOMMENDED TO BID", icon: "🔨" },
  { id: "2", title: "IT Hardware Supply Indian Railways", org: "Indian Railways", cat: "IT Hardware", city: "New Delhi", value: "₹1.2Cr", emd: "₹2.4L / ₹10k", closes: "5 days", readiness: 64, status: "BID WITH CAUTION", icon: "🖥️" },
]

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [tab, setTab] = useState("tenders")
  const [plan, setPlan] = useState("Free")
  const [search, setSearch] = useState("")
  const [saved, setSaved] = useState<string[]>([])
  const [redeemCode, setRedeemCode] = useState("")
  const [showPay, setShowPay] = useState(false)
  const [bizCats, setBizCats] = useState<string[]>(["Furniture", "IT Hardware", "Security Systems"])
  const [products, setProducts] = useState<string[]>(["Modular Office Furniture", "Servers & Storage"])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const s = localStorage.getItem("vikram_session")
    if (s) { try { const d = JSON.parse(s); setSession(d); setPlan(d.plan || "Free") } catch {} }
    setLoading(false)
  }, [])

  const handleSignUp = async () => {
    try {
      if (!email || !password) return alert("Email aur password daalo")
      const data = await supabaseSignUp(email, password)
      alert("Account ban gaya! Ab Sign In karo. (Supabase Dashboard > Authentication > Users me dikhega)")
    } catch (e: any) { alert(e.message) }
  }
  const handleSignIn = async () => {
    try {
      const data = await supabaseSignIn(email, password)
      const sess = { user: data.user, access_token: data.access_token, email: email, plan: "Free" }
      localStorage.setItem("vikram_session", JSON.stringify(sess))
      setSession(sess)
    } catch (e: any) { alert(e.message) }
  }
  const handleLogout = () => { localStorage.removeItem("vikram_session"); setSession(null) }
  const handleRedeem = () => {
    const codes: any = { "DEMO-TRIAL-14": "Trial", "DEMO-STARTER-30": "Starter", "VIKRAM-VIP-2026": "PRO ACTIVE" }
    const np = codes[redeemCode.trim().toUpperCase()]
    if (!np) return alert("Invalid Code")
    setPlan(np)
    if (session) { const ns = { ...session, plan: np }; localStorage.setItem("vikram_session", JSON.stringify(ns)); setSession(ns) }
    alert(`⭐ VIKRAM ${np} Access Activated!`)
    setTab("tenders")
  }
  const handlePay = () => { setPlan("PRO ACTIVE"); if (session) { const ns = { ...session, plan: "PRO ACTIVE" }; localStorage.setItem("vikram_session", JSON.stringify(ns)); setSession(ns) } setShowPay(false); alert("Payment Success - PRO ACTIVE Activated! (PhonePe Test)"); setTab("tenders") }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-[420px] rounded-[24px] shadow-xl border p-8">
          <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-[#4f46e5] rounded-xl flex items-center justify-center text-white font-black">VI</div><div><div className="font-black text-sm">VIKRAM INDUSTRIES</div><div className="text-[10px] tracking-[2px] text-gray-500">VIKRAM AI PRO</div></div></div>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1><p className="text-sm text-gray-500 mb-6">Sign in to your VIKRAM PRO account</p>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-3 mb-5 text-[11px]"><span className="text-green-700 font-bold">✓ Supabase Connected (No Terminal Needed)</span><div className="text-gray-500 mt-1">URL: oixykwrzqaprrenighvd.supabase.co</div></div>
          <div className="space-y-4">
            <div><label className="text-[13px] font-semibold">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="mt-1 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4f46e5]" /></div>
            <div><label className="text-[13px] font-semibold">Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full border rounded-xl px-4 py-3 text-sm outline-none focus:border-[#4f46e5]" /></div>
            <div className="grid grid-cols-2 gap-3 pt-2"><button onClick={handleSignIn} className="bg-[#4f46e5] text-white rounded-xl py-3 font-bold">Sign In</button><button onClick={handleSignUp} className="bg-white border rounded-xl py-3 font-bold">Sign Up</button></div>
            <div className="text-[11px] text-gray-400 text-center pt-2">Phone se hi kaam karega, koi npm install nahi!<br/>Demo codes: VIKRAM-VIP-2026</div>
          </div>
        </div>
      </div>
    )
  }

  const filtered = TENDERS.filter(t=>t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <div className={`fixed inset-y-0 left-0 z-30 w-[280px] bg-white border-r flex flex-col transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:fixed`}>
        <div className="p-5 flex items-center justify-between border-b"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#1e40af] rounded-xl flex items-center justify-center text-white font-black">VI</div><div><div className="font-black text-[13px]">VIKRAM INDUSTRIES</div><div className="text-[11px] tracking-[2px] text-gray-500">VIKRAM AI</div></div></div><button onClick={()=>setMenuOpen(false)} className="lg:hidden">✕</button></div>
        <div className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            {id:"tenders", label:"Tenders", icon:"💼"},
            {id:"docs", label:"My Documents", icon:"📁"},
            {id:"workspace", label:"Tender Workspace", icon:"📝"},
            {id:"comparison", label:"Tender Comparison", icon:"📚"},
            {id:"ask", label:"Ask VIKRAM", icon:"💬"},
            {id:"notifications", label:"Notifications", icon:"🔔", badge:"1"},
            {id:"reports", label:"Reports", icon:"📊"},
            {id:"company", label:"Company Profile", icon:"🏢"},
            {id:"subscription", label:"Subscription", icon:"💳"},
            {id:"settings", label:"Settings", icon:"⚙️"},
            {id:"admin", label:"Admin", icon:"🛡️"},
          ].map(item=>(
            <button key={item.id} onClick={()=>{setTab(item.id); setMenuOpen(false)}} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium ${tab===item.id ? "bg-[#0f172a] text-white" : "text-[#334155] hover:bg-gray-50"}`}>
              <span>{item.icon}</span>{item.label}{item.badge && <span className="ml-auto bg-red-500 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>}
            </button>
          ))}
        </div>
        <div className="p-4"><div className="bg-gradient-to-br from-[#6366f1] to-[#2563eb] rounded-[20px] p-4 text-white"><div className="text-[12px] opacity-80">Current Plan</div><div className="font-black text-[20px] mt-1">{plan}</div><div className="text-[12px] opacity-80 mt-1">Renews: 15 Oct 2026</div><div className="text-[11px] mt-1 truncate opacity-70">{session.email}</div><button onClick={()=>setTab("subscription")} className="mt-3 w-full bg-white text-[#1e293b] rounded-xl py-2.5 font-bold text-sm">Manage</button><button onClick={handleLogout} className="mt-2 w-full bg-white/20 text-white rounded-xl py-2 text-xs">Logout</button></div></div>
      </div>

      <div className="flex-1 lg:ml-[280px]">
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b px-4 py-3 flex items-center gap-3">
          <button onClick={()=>setMenuOpen(true)} className="lg:hidden border rounded-xl px-3 py-2">☰</button>
          <div className="flex-1 max-w-[420px] relative"><span className="absolute left-3 top-2.5 text-gray-400">🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Global search tenders, c" className="w-full border rounded-full pl-10 pr-4 py-2.5 text-sm bg-[#f8fafc] outline-none" /></div>
          <div className="ml-auto flex items-center gap-2"><button className="relative w-10 h-10 border rounded-full flex items-center justify-center">🔔<span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">1</span></button><div className="w-10 h-10 bg-[#0f172a] text-white rounded-full flex items-center justify-center font-bold text-sm">VP</div></div>
        </div>

        <div className="p-4 max-w-[900px] mx-auto">
          {tab==="tenders" && (
            <div>
              <div className="flex gap-3 mb-4"><button className="bg-[#4f46e5] text-white rounded-full px-5 py-2.5 font-bold text-sm">⬆ Upload Tender PDF</button><button className="bg-white border rounded-full px-5 py-2.5 font-bold text-sm">Compare ({saved.length})</button></div>
              <div className="flex gap-2 mb-4 bg-white border rounded-full p-1 w-fit">{["All","Saved","Recommended","Closing Soon"].map(f=><button key={f} className={`px-4 py-1.5 rounded-full text-sm font-bold ${f==="All" ? "bg-[#0f172a] text-white" : "text-gray-500"}`}>{f}</button>)}</div>
              <div className="space-y-4">
                {filtered.map(t=>(
                  <div key={t.id} className="bg-white border rounded-[20px] p-5 shadow-sm">
                    <div className="flex gap-3"><div className="w-12 h-12 bg-[#0f172a] rounded-2xl flex items-center justify-center text-white text-xl">{t.icon}</div><div className="flex-1"><div className="font-bold text-[16px]">{t.title}</div><div className="flex gap-2 mt-2"><span className="bg-[#f8fafc] border px-3 py-1 rounded-full text-xs">{t.org}</span><span className="bg-[#eef2ff] text-[#4f46e5] px-3 py-1 rounded-full text-xs">{t.cat}</span><span className="bg-[#f8fafc] border px-3 py-1 rounded-full text-xs">{t.city}</span></div></div><button onClick={()=>setSaved(prev=>prev.includes(t.id) ? prev.filter(x=>x!==t.id) : [...prev,t.id])} className="w-9 h-9 rounded-full border flex items-center justify-center">{saved.includes(t.id) ? "🔖" : "📑"}</button></div>
                    <div className="grid grid-cols-3 gap-3 mt-4"><div className="bg-[#f8fafc] rounded-2xl p-3"><div className="text-[12px] text-gray-400">Value</div><div className="font-black mt-1">{t.value}</div></div><div className="bg-[#f8fafc] rounded-2xl p-3"><div className="text-[12px] text-gray-400">EMD / Fee</div><div className="font-black mt-1">{t.emd}</div></div><div className="bg-[#f8fafc] rounded-2xl p-3"><div className="text-[12px] text-gray-400">Closes</div><div className="font-black mt-1">🕒 {t.closes}</div></div></div>
                    <div className="flex items-center gap-3 mt-4"><div className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span><span className="text-sm font-bold">Readiness {t.readiness}/100</span></div><span className="px-3 py-1 rounded-full text-[12px] font-black bg-[#dcfce7] text-[#166534]">{t.status}</span><div className="ml-auto flex gap-2"><button className="border rounded-full px-4 py-1.5 text-sm font-bold">Compare</button><button className="bg-[#4f46e5] text-white rounded-full px-5 py-1.5 text-sm font-bold">Analyze</button></div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(tab==="company" || tab==="settings") && (
            <div className="space-y-6">
              <div className="bg-white border rounded-[20px] p-6"><h2 className="font-black text-[20px]">Business Categories & Products</h2>
                <div className="flex flex-wrap gap-2 mt-4">{["Furniture","IT Hardware","Electrical","Security Systems","Medical Equipment","Construction","Office Supplies","Networking"].map(c=>(
                  <button key={c} onClick={()=>setBizCats(prev=>prev.includes(c) ? prev.filter(x=>x!==c) : [...prev,c])} className={`px-5 py-2 rounded-full text-sm font-bold border ${bizCats.includes(c) ? "bg-[#4f46e5] text-white border-[#4f46e5]" : "bg-white"}`}>{c}</button>
                ))}</div>
                <h3 className="font-bold mt-6 mb-3">Products / Services</h3>
                <div className="space-y-2">{["Modular Office Furniture","Servers & Storage","CCTV & Access Control","Electrical Panels","Workstations","UPS & Power"].map(p=>(
                  <label key={p} className="flex items-center gap-3 border rounded-xl p-3 bg-[#f8fafc] cursor-pointer"><input type="checkbox" checked={products.includes(p)} onChange={()=>setProducts(prev=>prev.includes(p) ? prev.filter(x=>x!==p) : [...prev,p])} className="w-5 h-5" /><span className="font-medium">{p}</span></label>
                ))}</div>
              </div>
              <div className="bg-white border rounded-[20px] p-6"><h2 className="font-black text-[18px]">Redeem Access Code</h2><p className="text-sm text-gray-500 mt-1">Pre-seed: DEMO-TRIAL-14, DEMO-STARTER-30, VIKRAM-VIP-2026</p>
                <div className="flex gap-3 mt-4"><input value={redeemCode} onChange={e=>setRedeemCode(e.target.value)} placeholder="Enter code e.g. VIKRAM-VIP" className="flex-1 border rounded-full px-5 py-3 text-sm outline-none" /><button onClick={handleRedeem} className="bg-[#0f172a] text-white rounded-full px-8 font-bold">Validate</button></div>
              </div>
              <div className="bg-white border rounded-[20px] p-6"><h2 className="font-black text-[18px]">Company Profile</h2><div className="mt-4 space-y-3"><div className="bg-[#f8fafc] border rounded-xl p-3"><div className="text-xs text-gray-400">Company</div><div className="font-bold">Vikram Industries Pvt Ltd</div></div><div className="bg-[#f8fafc] border rounded-xl p-3"><div className="text-xs text-gray-400">GSTIN</div><div className="font-bold">27ABCDE1234F1Z5</div></div><div className="bg-[#f8fafc] border rounded-xl p-3"><div className="text-xs text-gray-400">PAN</div><div className="font-bold">ABCDE1234F</div></div><div className="bg-[#f8fafc] border rounded-xl p-3"><div className="text-xs text-gray-400">Udyam</div><div className="font-bold">UDYAM-DL-01-0012345</div></div></div></div>
            </div>
          )}

          {tab==="subscription" && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border rounded-[20px] p-6"><div className="font-bold">Free</div><div className="text-[32px] font-black mt-2">₹0<span className="text-sm font-medium text-gray-500">/mo</span></div><ul className="mt-4 space-y-2 text-sm"><li>✓ 5 Tender Analyses / mo</li><li>✓ 20 AI Questions</li><li>✓ 2GB Document Storage</li></ul><button className="w-full mt-6 bg-[#0f172a] text-white rounded-full py-3 font-bold">Choose Free</button></div>
              <div className="bg-white border rounded-[20px] p-6"><div className="font-bold">Starter</div><div className="text-[32px] font-black mt-2">₹999<span className="text-sm font-medium text-gray-500">/mo</span></div><ul className="mt-4 space-y-2 text-sm"><li>✓ 25 Analyses / mo</li><li>✓ 200 AI Questions</li><li>✓ 10GB Storage</li></ul><button onClick={()=>setShowPay(true)} className="w-full mt-6 bg-[#0f172a] text-white rounded-full py-3 font-bold">Choose Starter</button></div>
            </div>
          )}
        </div>
      </div>

      {showPay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"><div className="bg-white rounded-[20px] p-6 w-full max-w-[380px]"><div className="font-black text-lg">PhonePe Payment</div><div className="bg-[#f8fafc] rounded-xl p-3 mt-3 text-sm space-y-2"><div className="flex justify-between"><span>Starter Plan</span><span>₹999</span></div><div className="flex justify-between"><span>GST 18%</span><span>₹180</span></div><div className="flex justify-between font-black border-t pt-2 mt-2"><span>Total</span><span>₹1179</span></div></div><button onClick={handlePay} className="w-full mt-4 bg-[#5f259f] text-white rounded-xl py-3 font-black">Pay with PhonePe - ₹1179</button><button onClick={()=>setShowPay(false)} className="w-full mt-2 border rounded-xl py-3">Cancel</button></div></div>
      )}
    </div>
  )
}
