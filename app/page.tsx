"use client"
import { useState, useEffect } from "react"

export default function Page() {
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState("")
  const [tab, setTab] = useState("tenders")
  const [plan, setPlan] = useState("Free")
  const [showPay, setShowPay] = useState(false)
  const [redeemCode, setRedeemCode] = useState("")

  useEffect(() => {
    const s = localStorage.getItem("vikram_user")
    if (s) {
      try {
        const d = JSON.parse(s)
        setIsLogin(true)
        setEmail(d.email)
        setPlan(d.plan || "Free")
      } catch {}
    }
  }, [])

  const login = () => {
    if (email.indexOf("@") === -1) { alert("Sahi email daalo"); return }
    localStorage.setItem("vikram_user", JSON.stringify({ email: email, plan: "Free" }))
    setIsLogin(true)
  }

  const logout = () => {
    localStorage.removeItem("vikram_user")
    setIsLogin(false)
    setEmail("")
  }

  const handleRedeem = () => {
    const codes: any = { "DEMO-TRIAL-14": "Trial", "DEMO-STARTER-30": "Starter", "VIKRAM-VIP-2026": "PRO ACTIVE" }
    if (codes[redeemCode]) {
      setPlan(codes[redeemCode])
      localStorage.setItem("vikram_user", JSON.stringify({ email: email, plan: codes[redeemCode] }))
      alert("Activated: " + codes[redeemCode])
    } else {
      alert("Invalid Code")
    }
  }

  const confirmPay = () => {
    setPlan("PRO ACTIVE")
    localStorage.setItem("vikram_user", JSON.stringify({ email: email, plan: "PRO ACTIVE" }))
    setShowPay(false)
    alert("Payment Success - PRO ACTIVE Activated via PhonePe Test!")
    setTab("tenders")
  }

  if (!isLogin) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0b", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "system-ui" }}>
        <div style={{ background: "white", borderRadius: 24, padding: 28, width: "100%", maxWidth: 380 }}>
          <div style={{ fontSize: 22, fontWeight: 900 }}>VIKRAM INDUSTRIES</div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#666", marginBottom: 20 }}>VIKRAM AI PRO</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID - test@gmail.com" style={{ width: "100%", background: "#f5f5f5", border: "1px solid #e5e7eb", borderRadius: 12, padding: 14, outline: "none", fontSize: 14 }} />
          <button onClick={login} style={{ width: "100%", background: "black", color: "white", borderRadius: 12, padding: 14, fontWeight: 800, marginTop: 12, border: "none", cursor: "pointer" }}>Continue with Email</button>
        </div>
      </div>
    )
  }

  const sidebarStyle = { width: 260, background: "white", borderRight: "1px solid #e5e7eb", padding: 16, display: "flex", flexDirection: "column" as const, position: "fixed" as const, height: "100vh", overflowY: "auto" as const }
  const mainStyle = { marginLeft: 260, flex: 1, padding: 20, background: "#fafafa", minHeight: "100vh", fontFamily: "system-ui" }
  const cardStyle = { background: "white", borderRadius: 16, border: "1px solid #e5e7eb", padding: 16, marginBottom: 12 }
  const menuItem = (id: string) => ({ padding: "10px 12px", borderRadius: 10, background: tab === id ? "black" : "transparent", color: tab === id ? "white" : "#333", fontSize: 13, fontWeight: tab === id ? 700 : 500, cursor: "pointer" })

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "system-ui" }}>
      <div style={sidebarStyle}>
        <div style={{ fontWeight: 900, fontSize: 14 }}>VIKRAM INDUSTRIES</div>
        <div style={{ fontSize: 10, color: "#666", letterSpacing: 1 }}>VIKRAM AI</div>
        <div style={{ marginTop: 20, display: "grid", gap: 4 }}>
          <div onClick={() => setTab("tenders")} style={menuItem("tenders")}>Tenders</div>
          <div onClick={() => setTab("docs")} style={menuItem("docs")}>My Documents</div>
          <div onClick={() => setTab("workspace")} style={menuItem("workspace")}>Tender Workspace</div>
          <div onClick={() => setTab("compare")} style={menuItem("compare")}>Tender Comparison</div>
          <div onClick={() => setTab("ask")} style={menuItem("ask")}>Ask VIKRAM</div>
          <div onClick={() => setTab("notif")} style={menuItem("notif")}>Notifications (1)</div>
          <div onClick={() => setTab("reports")} style={menuItem("reports")}>Reports</div>
          <div onClick={() => setTab("profile")} style={menuItem("profile")}>Company Profile</div>
          <div onClick={() => setTab("sub")} style={menuItem("sub")}>Subscription</div>
          <div onClick={() => setTab("settings")} style={menuItem("settings")}>Settings</div>
        </div>
        <div style={{ marginTop: "auto", background: "#e0f2fe", borderRadius: 16, padding: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#0369a1" }}>{plan} - ACTIVE</div>
          <div style={{ fontSize: 11, color: "#0369a1" }}>Renews: 15 Oct 2026</div>
          <button onClick={logout} style={{ width: "100%", background: "#fee2e2", borderRadius: 8, padding: 8, fontSize: 12, fontWeight: 700, marginTop: 8, border: "none", cursor: "pointer" }}>Logout - {email.split("@")[0]}</button>
        </div>
      </div>

      <div style={mainStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <input placeholder="Global search tenders..." style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "10px 14px", width: 300, outline: "none" }} />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}><span>🔔3</span><div style={{ width: 28, height: 28, background: "black", color: "white", borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>VP</div></div>
        </div>

        {tab === "tenders" && (
          <div>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <button style={{ background: "#5b4bff", color: "white", borderRadius: 10, padding: "10px 16px", border: "none", fontWeight: 700, cursor: "pointer" }}>Upload Tender PDF</button>
              <button style={{ background: "white", border: "1px solid #ddd", borderRadius: 10, padding: "10px 16px", cursor: "pointer" }}>Compare (0)</button>
            </div>
            <div style={cardStyle}>
              <div style={{ fontWeight: 800 }}>Supply of Office Furniture to CPWD Delhi</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 6, display: "flex", gap: 8 }}><span style={{ background: "#f3f4f6", padding: "2px 8px", borderRadius: 20 }}>CPWD</span><span style={{ background: "#ede9fe", color: "#5b4bff", padding: "2px 8px", borderRadius: 20 }}>Furniture</span><span>Delhi</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
                <div style={{ background: "#f9fafb", padding: 10, borderRadius: 10 }}><div style={{ fontSize: 11, color: "#666" }}>Value</div><div style={{ fontWeight: 700 }}>Rs.45L</div></div>
                <div style={{ background: "#f9fafb", padding: 10, borderRadius: 10 }}><div style={{ fontSize: 11, color: "#666" }}>EMD / Fee</div><div style={{ fontWeight: 700 }}>Rs.90k / 5k</div></div>
                <div style={{ background: "#f9fafb", padding: 10, borderRadius: 10 }}><div style={{ fontSize: 11, color: "#666" }}>Closes</div><div style={{ fontWeight: 700 }}>2 days</div></div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 700 }}>Readiness 87/100</span><span style={{ background: "#dcfce7", color: "#15803d", padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>RECOMMENDED TO BID</span><button style={{ marginLeft: "auto", background: "white", border: "1px solid #ddd", borderRadius: 20, padding: "6px 12px", fontSize: 11, cursor: "pointer" }}>Compare</button><button style={{ background: "#5b4bff", color: "white", borderRadius: 20, padding: "6px 12px", fontSize: 11, border: "none", cursor: "pointer" }}>Analyze</button></div>
            </div>
          </div>
        )}

        {(tab === "settings" || tab === "profile") && (
          <div style={{ display: "grid", gap: 16 }}>
            <div style={cardStyle}>
              <div style={{ fontWeight: 800 }}>Redeem Access Code</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Codes: DEMO-TRIAL-14, DEMO-STARTER-30, VIKRAM-VIP-2026</div>
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}><input value={redeemCode} onChange={(e) => setRedeemCode(e.target.value)} placeholder="Enter code e.g. VIKRAM-VIP" style={{ flex: 1, border: "1px solid #ddd", borderRadius: 10, padding: 10 }} /><button onClick={handleRedeem} style={{ background: "black", color: "white", borderRadius: 10, padding: "10px 16px", border: "none", fontWeight: 700, cursor: "pointer" }}>Validate</button></div>
            </div>
            <div style={cardStyle}><div style={{ fontWeight: 800 }}>Company Profile</div><div style={{ marginTop: 10, background: "#f9fafb", border: "1px solid #eee", borderRadius: 10, padding: 10 }}>Vikram Industries Pvt Ltd - 27ABCDE1234F1Z5</div></div>
          </div>
        )}

        {tab === "sub" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #e5e7eb", padding: 20 }}><div style={{ fontWeight: 800 }}>Free - Rs.0/mo</div><div style={{ fontSize: 12, color: "#666", marginTop: 8 }}><div>✓ 5 Tender Analyses</div><div>✓ 20 AI Questions</div></div><button onClick={() => { setPlan("Free"); }} style={{ width: "100%", background: "black", color: "white", borderRadius: 10, padding: 12, marginTop: 16, border: "none", fontWeight: 700, cursor: "pointer" }}>Choose Free</button></div>
            <div style={{ background: "white", borderRadius: 20, border: "1px solid #5b4bff", padding: 20 }}><div style={{ background: "#5b4bff", color: "white", fontSize: 10, padding: "4px 8px", borderRadius: 20, width: "fit-content" }}>MOST POPULAR</div><div style={{ fontWeight: 800, marginTop: 8 }}>Starter - Rs.999/mo</div><div style={{ fontSize: 12, color: "#666", marginTop: 8 }}><div>✓ Unlimited Tenders</div><div>✓ AI Writer</div><div>✓ PhonePe Payment</div></div><button onClick={() => setShowPay(true)} style={{ width: "100%", background: "#5b4bff", color: "white", borderRadius: 10, padding: 12, marginTop: 16, border: "none", fontWeight: 700, cursor: "pointer" }}>Choose Starter - Pay with PhonePe</button></div>
          </div>
        )}
      </div>

      {showPay ? (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 20, width: "100%", maxWidth: 360 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>PhonePe Payment</div>
            <div style={{ background: "#f9fafb", borderRadius: 12, padding: 12, marginTop: 12 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}><span>Starter Plan</span><span>Rs.999</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginTop: 6 }}><span>GST 18%</span><span>Rs.180</span></div><div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, marginTop: 10, paddingTop: 10, borderTop: "1px solid #eee" }}><span>Total</span><span>Rs.1179</span></div></div>
            <button onClick={confirmPay} style={{ width: "100%", background: "#5f259f", color: "white", borderRadius: 12, padding: 14, fontWeight: 800, marginTop: 16, border: "none", cursor: "pointer" }}>Pay with PhonePe - Rs.1179</button>
            <button onClick={() => setShowPay(false)} style={{ width: "100%", background: "white", border: "1px solid #ddd", borderRadius: 12, padding: 12, marginTop: 8, cursor: "pointer" }}>Cancel</button>
            <div style={{ fontSize: 10, color: "#999", marginTop: 8, textAlign: "center" }}>Test Mode - Real keys baad me lagenge</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
