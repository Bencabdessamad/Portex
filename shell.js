/* ══ MPIS SIDEBAR BUILDER ══ */

function buildSidebar(role, activePage) {
  const defs = {
    admin: [
      { section: 'Main', items: [
        { id:'dashboard', label:'Dashboard', icon:'dashboard', href:'dashboard-admin.html' },
      ]},
      { section: 'Administration', items: [
        { id:'users',    label:'User Management',  icon:'users',    href:'admin-users.html' },
        { id:'vessels',  label:'Vessel Database',  icon:'vessel',   href:'vessels.html' },
        { id:'providers',label:'Service Providers',icon:'provider', href:'admin-providers.html' },
      ]},
      { section: 'Operations', items: [
        { id:'visits',   label:'Visit Management', icon:'visit',    href:'visits-admin.html' },
        { id:'catalog',  label:'Services Catalog', icon:'catalog',  href:'services.html' },
      ]},
    ],
    hm: [
      { section: 'Main', items: [
        { id:'dashboard', label:'Dashboard', icon:'dashboard', href:'dashboard-hm.html' },
      ]},
      { section: 'Operations', items: [
        { id:'visits',   label:'Visit Management', icon:'visit',    href:'visits-hm.html', badge:3 },
        { id:'vessels',  label:'Vessel Database',  icon:'vessel',   href:'vessels.html' },
      ]},
      { section: 'Administration', items: [
        { id:'users',    label:'Users (read-only)',icon:'users',    href:'admin-users.html' },
        { id:'providers',label:'Service Providers',icon:'provider', href:'admin-providers.html' },
      ]},
    ],
    agent: [
      { section: 'Main', items: [
        { id:'dashboard', label:'Dashboard', icon:'dashboard', href:'dashboard-agent.html' },
      ]},
      { section: 'My Work', items: [
        { id:'visits',   label:'My Visits',        icon:'visit',    href:'visits-agent.html' },
        { id:'newvisit', label:'+ New Visit',       icon:'booking',  href:'visit-new.html' },
      ]},
      { section: 'Reference', items: [
        { id:'vessels',  label:'Vessel Database',  icon:'vessel',   href:'vessels.html' },
      ]},
    ],
    sp: [
      { section: 'Main', items: [
        { id:'dashboard', label:'Dashboard',        icon:'dashboard',href:'dashboard-sp.html' },
      ]},
      { section: 'My Work', items: [
        { id:'bookings', label:'My Bookings',       icon:'booking',  href:'sp-bookings.html' },
        { id:'resources',label:'My Resources',      icon:'resource', href:'sp-resources.html' },
      ]},
    ],
  };

  const groups = defs[role] || defs.admin;
  let html = '';
  groups.forEach(g => {
    html += `<div class="sb-section"><div class="sb-label">${g.section}</div>`;
    g.items.forEach(item => {
      const isActive = (item.id === activePage) ? ' active' : '';
      const badge = item.badge ? `<span class="nav-badge">${item.badge}</span>` : '';
      html += `<a class="nav-item${isActive}" href="${item.href}">
        ${ICONS[item.icon] || ''}
        ${item.label}${badge}
      </a>`;
    });
    html += `</div>`;
  });
  return html;
}

function buildTopbar(role, userName, userInitials) {
  const roleMeta = {
    admin: { label:'ADMIN',          color:'var(--red)',    bg:'rgba(239,68,68,.12)' },
    hm:    { label:'HARBOUR MASTER', color:'var(--teal)',   bg:'rgba(0,184,150,.12)' },
    agent: { label:'AGENT',          color:'var(--blue)',   bg:'rgba(59,130,246,.12)' },
    sp:    { label:'SERVICE PROVIDER',color:'var(--orange)',bg:'rgba(245,158,11,.12)' },
  };
  const meta = roleMeta[role] || roleMeta.admin;
  return `
    <div class="topbar-brand">MPIS</div>
    <div class="topbar-right">
      <span class="topbar-clock"></span>
      <span class="role-badge" style="background:${meta.bg};color:${meta.color}">${meta.label}</span>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="topbar-avatar">${userInitials}</div>
        <div>
          <div class="topbar-name">${userName}</div>
          <div class="topbar-role">ROLE: ${meta.label}</div>
        </div>
      </div>
      <button class="theme-btn" onclick="toggleTheme()"><span class="theme-icon">☀</span></button>
      <button class="logout-btn" onclick="location.href='index.html'">Logout</button>
    </div>`;
}

function initPage(role, activePage, userName, userInitials) {
  const tb = document.getElementById('topbar');
  const sb = document.getElementById('sidebar');
  if (tb) tb.innerHTML = buildTopbar(role, userName, userInitials);
  if (sb) sb.innerHTML = buildSidebar(role, activePage);
  updateClock();
}
