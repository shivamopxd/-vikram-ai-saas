"use client";
import { useState } from 'react';
export default function Page() {
  const [keyword, setKeyword] = useState('construction');
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  async function search() {
    setLoading(true);
    try {
      const res = await fetch(`/api/live-tenders?keyword=${keyword}`);
      const data = await res.json();
      setTenders(data.tenders || []);
      setIsLive(true);
    } catch(e){}
    setLoading(false);
  }
  return (
    <main style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ fontWeight: 800, fontSize: 28 }}>⚡ Vikram Industries — AI Tender Finder</h1>
      <p>{isLive ? '🟢 LIVE Tenders - eProcure (Real)' : 'Search to see live tenders'}</p>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <input value={keyword} onChange={e=>setKeyword(e.target.value)} style={{ flex: 1, padding: 14, borderRadius: 10, border: '1px solid #ccc' }} />
        <button onClick={search} style={{ padding: '14px 22px', borderRadius: 10, background: 'black', color: 'white' }}>{loading ? 'Loading...' : 'Search Live'}</button>
      </div>
      <div style={{ marginTop: 30, display: 'grid', gap: 12 }}>
        {tenders.map((t:any) => (
          <div key={t.id} style={{ border: '1px solid #eee', padding: 16, borderRadius: 12, background: '#f0fdf4' }}>
            <b style={{color:'green',fontSize:12}}>{t.source} • LIVE</b>
            <div style={{fontWeight:700, marginTop:4}}>{t.title}</div>
            <div style={{fontSize:13, opacity:0.7}}>{t.department} • {t.location} • {t.value}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
