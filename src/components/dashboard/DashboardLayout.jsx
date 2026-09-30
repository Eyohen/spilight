/* eslint-disable react/prop-types, react/jsx-key */
import { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AddServerModal from './AddServerModal';
import AddDatabaseModal from './AddDatabaseModal';

const Icon = ({ children, className = 'h-4 w-4' }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>;
const navItems = [
  ['Overview','/dashboard',<Icon><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="8.5" opacity=".35" /></Icon>,true],
  ['Projects','/dashboard/projects',<Icon><rect x="5" y="5" width="14" height="14" rx="1" /><path d="M9 9h6v6H9z" /></Icon>],
  ['Servers','/dashboard/servers',<Icon><path d="M5 6h14v4H5zM5 14h14v4H5zM8 8h.01M8 16h.01" /></Icon>],
  ['Databases','/dashboard/database',<Icon><path d="M6 6.5c0-1.4 12-1.4 12 0v11c0 1.4-12 1.4-12 0zM6 10c0 1.4 12 1.4 12 0M6 14c0 1.4 12 1.4 12 0" /></Icon>],
  ['Deployments','/dashboard/deployments',<Icon><path d="M12 19V5M7.5 9.5 12 5l4.5 4.5" /></Icon>],
  ['Billing','/dashboard/billing',<Icon><path d="M8 7h8M8 12h8M10 17h4M12 4v16" /></Icon>],
  ['Settings','/dashboard/settings',<Icon><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.5-2.5 1A7 7 0 0 0 14.2 5L14 2h-4l-.2 3a7 7 0 0 0-2.2 1.7l-2.5-1-2 3.5 2 1.5A7 7 0 0 0 5 12c0 .4 0 .9.1 1.3l-2 1.5 2 3.5 2.5-1A7 7 0 0 0 9.8 19l.2 3h4l.2-3a7 7 0 0 0 2.2-1.7l2.5 1 2-3.5-2-1.5c.1-.4.1-.9.1-1.3Z" /></Icon>],
];
const notices = [['Failed deployment','api-gateway · commit a3f9c2'],['Storage at 88%','Production Server'],['Invoice awaiting payment','INV-002 · $52,000']];
const starterProjects=[
  {id:'p1',name:'cosmic-pancake',created:'8 minutes ago',server:{name:'Production Server',detail:'4 vCPU · 8 GB · Lagos',status:'Healthy'},database:{name:'production-db',detail:'PostgreSQL 16 · 8.4 GB',status:'Running'}},
  {id:'p2',name:'dancing-penguin',created:'27 minutes ago',server:{name:'Staging Server',detail:'2 vCPU · 4 GB · Lagos',status:'Healthy'},database:{name:'cache-redis',detail:'Redis 7 · 412 MB',status:'Running'}},
];

export default function DashboardLayout() {
  const [sidebarOpen,setSidebarOpen]=useState(false), [workspaceOpen,setWorkspaceOpen]=useState(false), [notificationsOpen,setNotificationsOpen]=useState(false), [createOpen,setCreateOpen]=useState(false), [resourceOpen,setResourceOpen]=useState(false), [provisionType,setProvisionType]=useState(null), [workspaceName,setWorkspaceName]=useState(''), [workspace,setWorkspace]=useState('Acme Technologies'), [isDark,setIsDark]=useState(()=>localStorage.getItem('spilight-theme')!=='light'), [projects,setProjects]=useState(()=>{try{return JSON.parse(localStorage.getItem('spilight-projects'))||starterProjects}catch{return starterProjects}});
  const menuRef=useRef(null), noticeRef=useRef(null), navigate=useNavigate();
  const { logout, profile }=useAuth();
  const displayName=profile?.displayName || [profile?.firstName,profile?.lastName].filter(Boolean).join(' ') || profile?.businessName || 'Simi Ade';
  const firstName=profile?.firstName || displayName.split(' ')[0] || 'Simi';
  const initials=displayName.split(' ').filter(Boolean).slice(0,2).map(p=>p[0]).join('').toUpperCase() || 'SA';
  const workspaceInitials=workspace.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
  const today=new Date();
  const day=today.getDate();
  const ordinal=day%10===1&&day!==11?'st':day%10===2&&day!==12?'nd':day%10===3&&day!==13?'rd':'th';
  const currentDate=`${today.toLocaleDateString('en-GB',{weekday:'long'})} ${day}${ordinal} ${today.toLocaleDateString('en-GB',{month:'long',year:'numeric'})}`;

  useEffect(()=>{ const close=e=>{ if(menuRef.current&&!menuRef.current.contains(e.target))setWorkspaceOpen(false); if(noticeRef.current&&!noticeRef.current.contains(e.target))setNotificationsOpen(false); }; document.addEventListener('mousedown',close); return()=>document.removeEventListener('mousedown',close); },[]);
  useEffect(()=>{localStorage.setItem('spilight-theme',isDark?'dark':'light');},[isDark]);
  useEffect(()=>{localStorage.setItem('spilight-projects',JSON.stringify(projects));},[projects]);
  const signOut=async()=>{await logout();navigate('/login',{replace:true});};
  const createWorkspace=e=>{e.preventDefault();if(!workspaceName.trim())return;setWorkspace(workspaceName.trim());setWorkspaceName('');setCreateOpen(false);};
  const addResource=(type,resource)=>{const adjectives=['wobbly','cosmic','sleepy','bouncy','fuzzy','jazzy','tiny','cheeky'];const nouns=['otter','pancake','penguin','waffle','badger','noodle','llama','rocket'];const funnyName=`${adjectives[Math.floor(Math.random()*adjectives.length)]}-${nouns[Math.floor(Math.random()*nouns.length)]}`;const item=type==='server'?{name:resource.name,detail:`${resource.configuration} · ${resource.region}`,status:'Provisioning'}:{name:resource.name,detail:`${resource.engine} · ${resource.storage}`,status:'Provisioning'};setProjects(current=>[{id:`p-${Date.now()}`,name:funnyName,created:'just now',server:type==='server'?item:null,database:type==='database'?item:null},...current]);setProvisionType(null);navigate('/dashboard/projects');};
  const renameProject=(id,name)=>setProjects(current=>current.map(project=>project.id===id?{...project,name}:project));

  return <div className={`dashboard-shell min-h-screen bg-[#0b0b0d] font-['Inter'] text-[#f4f4f5] ${isDark?'':'dashboard-light'}`}>
    {sidebarOpen&&<button className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={()=>setSidebarOpen(false)} aria-label="Close sidebar"/>}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[326px] flex-col border-r border-[#292a2f] bg-[#111113] p-4 transition-transform lg:translate-x-0 ${sidebarOpen?'translate-x-0':'-translate-x-full'}`}>
      <div className="relative" ref={menuRef}>
        <button onClick={()=>setWorkspaceOpen(v=>!v)} className="flex w-full items-center rounded-xl border border-[#2e2f35] bg-[#202024] p-3 text-left hover:border-[#3b3c42]">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#4c8dff] text-sm font-bold text-white">{workspaceInitials}</span>
          <span className="ml-3 min-w-0 flex-1"><span className="block truncate text-sm font-semibold">{workspace}</span><span className="mt-1 block text-[10px] font-semibold uppercase tracking-[.13em] text-[#85858e]">Owner&nbsp;&nbsp;·&nbsp;&nbsp;Scale</span></span><Icon className="h-3.5 w-3.5 text-[#777780]"><path d="m8 10 4 4 4-4"/></Icon>
        </button>
        {workspaceOpen&&<div className="absolute left-1 right-1 top-[62px] z-30 rounded-xl border border-[#303137] bg-[#17171b] p-2 shadow-2xl">
          <div className="flex items-center justify-between px-2 py-2 text-[10px] font-semibold uppercase tracking-[.13em] text-[#8c8c95]"><span>Workspaces</span><button onClick={()=>{setWorkspaceOpen(false);setCreateOpen(true)}} className="text-[#65a0ff]">＋ New</button></div>
          {[["Acme Technologies","Business · Active now"],["CreatorHub Africa","Business · 12 min ago"]].map(([name,meta])=><button key={name} onClick={()=>{setWorkspace(name);setWorkspaceOpen(false)}} className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left ${workspace===name?'bg-[#172a4a] text-[#65a0ff]':'text-[#a3a3ac] hover:bg-white/[.04]'}`}><span className="grid h-8 w-8 place-items-center rounded-lg border border-current/20 text-[11px]">{name.split(' ').map(w=>w[0]).slice(0,2).join('')}</span><span><span className="block text-sm font-semibold">{name}</span><span className="block text-[10px] uppercase tracking-[.1em]">{meta}</span></span></button>)}
        </div>}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2"><div className="rounded-xl border border-[#2b2c31] bg-[#1e1e21] p-3"><p className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#76767e]">Running</p><p className="mt-2 text-xl text-[#41ca87]">1</p></div><div className="rounded-xl border border-[#2b2c31] bg-[#1e1e21] p-3"><p className="text-[9px] font-semibold uppercase tracking-[.12em] text-[#76767e]">Attention</p><p className="mt-2 text-xl text-[#d8ad37]">2</p></div></div>
      <p className="mb-2 mt-5 px-3 text-[9px] font-semibold uppercase tracking-[.13em] text-[#66666e]">Project</p>
      <nav className="space-y-1">{navItems.map(([name,path,icon,end])=><NavLink key={path} to={path} end={end} onClick={()=>setSidebarOpen(false)} className={({isActive})=>`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition ${isActive?'bg-[#172a4a] font-semibold text-[#65a0ff]':'text-[#8c8c95] hover:bg-white/[.035] hover:text-[#d1d1d5]'}`}><span className="w-5">{icon}</span>{name}</NavLink>)}<button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-[#8c8c95] hover:bg-white/[.035]"><span className="w-5"><Icon><path d="M9.1 9a3 3 0 1 1 4.8 2.4C12.8 12.2 12 12.7 12 14M12 18h.01"/></Icon></span>Help</button></nav>
      <div className="mt-auto rounded-xl border border-[#303137] bg-[#202023] p-4"><p className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#85858e]">Plan</p><p className="mt-2 text-sm font-semibold">Scale</p><p className="mt-1 truncate text-xs text-[#85858e]">{workspace}</p><button onClick={()=>navigate('/dashboard/billing')} className="mt-3 w-full rounded-lg border border-[#37383e] py-2 text-xs text-[#a0a0a8] hover:bg-white/[.04]">Manage billing</button></div>
    </aside>

    <div className="min-h-screen lg:pl-[326px]"><header className="sticky top-0 z-30 flex h-[74px] items-center border-b border-[#292a2f] bg-[#101012]/95 px-4 backdrop-blur lg:px-6">
      <button className="mr-3 grid h-9 w-9 place-items-center rounded-lg border border-[#2e2f34] lg:hidden" onClick={()=>setSidebarOpen(true)} aria-label="Open menu"><Icon><path d="M4 7h16M4 12h16M4 17h16"/></Icon></button>
      <div className="flex min-w-0 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#4c8dff] text-xs font-bold text-white">SP</span><div className="min-w-0"><p className="text-sm font-semibold tracking-[-.01em]">Spilight</p><p className="truncate text-[10px] text-[#777780] sm:text-xs">{currentDate}</p></div></div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3"><button onClick={()=>setIsDark(value=>!value)} className="grid h-9 w-9 place-items-center rounded-full border border-[#2e2f35] text-[#92929b] transition hover:bg-white/[.05] hover:text-white" aria-label={isDark?'Switch to light mode':'Switch to dark mode'} title={isDark?'Light mode':'Dark mode'}>{isDark?<Icon><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Icon>:<Icon><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/></Icon>}</button><div className="relative" ref={noticeRef}><button onClick={()=>setNotificationsOpen(v=>!v)} className="relative grid h-9 w-9 place-items-center rounded-full text-[#8b8b93] hover:bg-white/[.04]" aria-label="Notifications"><Icon><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></Icon><span className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#101012] bg-[#e15353] px-1 text-[9px] font-bold text-white">3</span></button>
        {notificationsOpen&&<div className="absolute right-0 top-12 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[#303137] bg-[#18181b] p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">Notifications</h3><span className="text-[10px] text-[#df6464]">3 unread</span></div><div className="space-y-2">{notices.map(([title,detail])=><button key={title} className="w-full rounded-xl bg-[#222225] p-3 text-left hover:bg-[#28282c]"><span className="block text-xs font-semibold">{title}</span><span className="mt-1 block text-[11px] text-[#888891]">{detail}</span></button>)}</div></div>}
      </div><button className="grid h-9 w-9 place-items-center rounded-full bg-[#123226] text-xs font-semibold text-[#42cf8a]">{initials}</button><button onClick={signOut} className="hidden text-[10px] text-[#73737c] hover:text-white md:block">Sign out</button></div>
    </header><main className="min-h-[calc(100vh-74px)] bg-[#0d0d0f] p-4 md:p-6 lg:p-8"><Outlet context={{firstName,workspace,openCreate:()=>setResourceOpen(true),projects,renameProject,createResource:addResource}}/></main></div>

    {createOpen&&<div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={()=>setCreateOpen(false)}><form onSubmit={createWorkspace} onMouseDown={e=>e.stopPropagation()} className="w-full max-w-[540px] rounded-2xl border border-[#34353b] bg-[#18181d] p-6 shadow-2xl"><h2 className="text-base font-semibold">Create workspace</h2><p className="mt-2 text-sm leading-5 text-[#91919a]">A new workspace starts with its own empty dashboard, billing and team area.</p><input autoFocus value={workspaceName} onChange={e=>setWorkspaceName(e.target.value)} placeholder="Workspace name" className="mt-5 w-full rounded-xl border border-[#37383d] bg-[#222226] px-4 py-3 text-sm outline-none placeholder:text-[#74747d] focus:border-[#4c8dff]"/><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={()=>setCreateOpen(false)} className="rounded-xl border border-[#38393f] px-4 py-2.5 text-sm text-[#a0a0a8]">Cancel</button><button type="submit" className="rounded-xl bg-[#4c8dff] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6aa1ff]">Create workspace</button></div></form></div>}

    {resourceOpen&&<div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={()=>setResourceOpen(false)}><section onMouseDown={e=>e.stopPropagation()} className="w-full max-w-[650px] rounded-2xl border border-[#34353b] bg-[#18181d] p-5 shadow-[0_30px_100px_rgba(0,0,0,.6)] sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.15em] text-[#65a0ff]">New resource</p><h2 className="mt-2 text-xl font-semibold tracking-[-.02em]">What would you like to create?</h2><p className="mt-1.5 text-sm text-[#85858f]">Choose a resource to add to your workspace.</p></div><button onClick={()=>setResourceOpen(false)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-[#35363c] text-[#85858f] transition hover:bg-white/[.05] hover:text-white" aria-label="Close">×</button></div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button onClick={()=>{setResourceOpen(false);setProvisionType('server')}} className="group overflow-hidden rounded-2xl border border-[#303137] bg-[#1c1c21] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#4c8dff] hover:shadow-[0_14px_40px_rgba(76,141,255,.12)]">
          <span className="relative grid h-36 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#172a4a] to-[#111a2b]">
            <span className="absolute left-5 top-5 h-16 w-16 rounded-full bg-[#4c8dff]/10 blur-xl"/><svg viewBox="0 0 180 120" className="relative h-28 w-40" fill="none"><path d="M43 31h94a8 8 0 0 1 8 8v21H35V39a8 8 0 0 1 8-8Z" fill="#202d45" stroke="#4c8dff" strokeWidth="2"/><path d="M35 60h110v22a8 8 0 0 1-8 8H43a8 8 0 0 1-8-8V60Z" fill="#18243a" stroke="#4c8dff" strokeWidth="2"/><circle cx="52" cy="46" r="4" fill="#65a0ff"/><circle cx="52" cy="75" r="4" fill="#65a0ff"/><path d="M65 46h58M65 75h58" stroke="#7184a8" strokeWidth="3" strokeLinecap="round"/><path d="M79 100h22M90 90v10" stroke="#4c8dff" strokeWidth="2" strokeLinecap="round"/></svg>
          </span><span className="mt-4 flex items-center justify-between"><span><span className="block text-sm font-semibold">Server</span><span className="mt-1 block text-xs leading-5 text-[#81818a]">Deploy compute for your applications.</span></span><span className="ml-3 text-lg text-[#65a0ff] transition group-hover:translate-x-1">→</span></span>
        </button>
        <button onClick={()=>{setResourceOpen(false);setProvisionType('database')}} className="group overflow-hidden rounded-2xl border border-[#303137] bg-[#1c1c21] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#9b7cff] hover:shadow-[0_14px_40px_rgba(155,124,255,.12)]">
          <span className="relative grid h-36 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#2b2146] to-[#171326]">
            <span className="absolute right-6 top-5 h-16 w-16 rounded-full bg-[#9b7cff]/10 blur-xl"/><svg viewBox="0 0 180 120" className="relative h-28 w-40" fill="none"><ellipse cx="90" cy="32" rx="47" ry="17" fill="#332754" stroke="#9b7cff" strokeWidth="2"/><path d="M43 32v25c0 9 21 17 47 17s47-8 47-17V32" fill="#2a2146" stroke="#9b7cff" strokeWidth="2"/><path d="M43 57v25c0 9 21 17 47 17s47-8 47-17V57" fill="#221b39" stroke="#9b7cff" strokeWidth="2"/><path d="M54 53c8 5 21 8 36 8s28-3 36-8M54 78c8 5 21 8 36 8s28-3 36-8" stroke="#7765a2" strokeWidth="2" strokeLinecap="round"/><circle cx="122" cy="81" r="4" fill="#b09aff"/></svg>
          </span><span className="mt-4 flex items-center justify-between"><span><span className="block text-sm font-semibold">Database</span><span className="mt-1 block text-xs leading-5 text-[#81818a]">Create secure, managed data storage.</span></span><span className="ml-3 text-lg text-[#a990ff] transition group-hover:translate-x-1">→</span></span>
        </button>
      </div>
    </section></div>}
    <AddServerModal open={provisionType==='server'} onClose={()=>setProvisionType(null)} onCreated={resource=>addResource('server',resource)}/>
    <AddDatabaseModal open={provisionType==='database'} onClose={()=>setProvisionType(null)} onCreated={resource=>addResource('database',resource)}/>
  </div>;
}
