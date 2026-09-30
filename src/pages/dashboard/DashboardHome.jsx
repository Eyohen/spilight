import { Link, useOutletContext } from 'react-router-dom';

const stats = [['Projects','4','1 running'],['Servers','2','2 online'],['Databases','2','2 running'],['Amount due','$500','Next invoice 01 Nov 2026']];
const attention = [
  ['error','API deployment failed','Build step failed on main · 20 min ago','View deployment'],
  ['warning','Storage approaching capacity','Production Server · 88% used','View server'],
  ['success','Invoice INV-002 awaiting payment','$500 · Due today','Pay invoice'],
  ['info','SSL certificate expires soon','api.spilight.com · 8 days left','Review domain'],
];
const usage = [['CPU',72,'green'],['Memory',56,'green'],['Storage',88,'red'],['Bandwidth',46,'green']];
const deployments = [['my-website','main','Successful','6 min ago'],['api-gateway','main','Failed','20 min ago'],['admin-dashboard','develop','Building','now']];

export default function DashboardHome(){
  const {firstName='Simi',workspace='Acme Technologies',openCreate}=useOutletContext()||{};
  return <div className="mx-auto max-w-[1440px] space-y-5">
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h1 className="text-2xl font-semibold tracking-[-.03em] md:text-3xl">Welcome back, {firstName}</h1><p className="mt-1 text-sm text-[#777780]">{workspace} · Scale plan</p></div><div className="flex gap-2"><button onClick={openCreate} className="rounded-xl bg-[#4c8dff] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#6aa1ff]">＋ Create new</button><Link to="/dashboard/deployments" className="rounded-xl border border-[#303137] px-4 py-2.5 text-xs font-semibold text-[#a4a4ad] hover:bg-white/[.04]">View deployments</Link></div></div>

    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label,value,detail])=><article key={label} className="rounded-2xl border border-[#292a30] bg-[#151519] p-5"><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#777780]">{label}</p><p className="mt-3 text-3xl font-semibold tracking-[-.04em]">{value}</p><p className="mt-1 text-xs text-[#777780]">{detail}</p></article>)}</section>

    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,.7fr)]">
      <section className="rounded-2xl border border-[#292a30] bg-[#151519] p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Needs your attention</h2><span className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#777780]">4 items</span></div><div className="mt-4 space-y-2">{attention.map(([tone,title,detail,action])=><div key={title} className="flex items-center gap-3 rounded-xl border border-[#303137] bg-[#17171b] p-3"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm ${tone==='error'?'bg-[#281b20] text-[#dc565f]':tone==='warning'?'bg-[#282319] text-[#d2a62d]':tone==='success'?'bg-[#173226] text-[#3dcc87]':'bg-[#1a252c] text-[#5ba6ce]'}`}>{tone==='error'?'×':tone==='warning'?'▲':tone==='success'?'✓':'i'}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{title}</p><p className="mt-0.5 truncate text-xs text-[#7f7f88]">{detail}</p></div><button className="hidden text-xs font-semibold text-[#65a0ff] hover:text-[#83b3ff] sm:block">{action} →</button></div>)}</div></section>

      <section className="rounded-2xl border border-[#292a30] bg-[#151519] p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-semibold">Resource usage</h2><span className="text-[10px] text-[#777780]">LIVE</span></div><div className="mt-5 space-y-5">{usage.map(([label,value,tone])=><div key={label}><div className="mb-2 flex justify-between text-[10px] font-semibold uppercase tracking-[.1em] text-[#7c7c85]"><span>{label}</span><span>{value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#29292e]"><div className={`h-full rounded-full ${tone==='red'?'bg-[#f15a5a]':'bg-[#3dcc87]'}`} style={{width:`${value}%`}}/></div></div>)}</div></section>
    </div>

    <div className="grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
      <section className="overflow-hidden rounded-2xl border border-[#292a30] bg-[#151519]"><div className="flex items-center justify-between border-b border-[#292a30] p-5"><h2 className="text-sm font-semibold">Recent deployments</h2><Link to="/dashboard/deployments" className="text-xs font-semibold text-[#65a0ff]">View all →</Link></div><div>{deployments.map(([name,branch,status,time])=><div key={name} className="flex items-center gap-3 border-b border-[#25262b] px-5 py-4 last:border-0"><span className={`h-2 w-2 rounded-full ${status==='Failed'?'bg-[#e4555e]':status==='Building'?'bg-[#d2a62d]':'bg-[#3dcc87]'}`}/><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{name}</p><p className="mt-0.5 text-xs text-[#73737c]">{branch} · Production</p></div><span className="text-xs text-[#8b8b94]">{status}</span><span className="hidden w-20 text-right text-xs text-[#606069] sm:block">{time}</span></div>)}</div></section>
      <section className="rounded-2xl border border-[#292a30] bg-[#151519] p-5"><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#777780]">Current plan</p><div className="mt-3 flex items-end justify-between"><div><p className="text-2xl font-semibold">Scale</p><p className="mt-1 text-xs text-[#777780]">Renews 01 Nov 2026</p></div><span className="rounded-full bg-[#17392c] px-2.5 py-1 text-[10px] font-semibold text-[#3dcc87]">ACTIVE</span></div><div className="my-5 border-t border-[#292a30]"/><div className="flex items-center justify-between"><div><p className="text-xs text-[#777780]">Amount due</p><p className="mt-1 text-xl font-semibold">$500</p></div><Link to="/dashboard/billing" className="rounded-lg bg-[#4c8dff] px-3 py-2 text-xs font-semibold text-white hover:bg-[#6aa1ff]">Pay now</Link></div></section>
    </div>
  </div>;
}
