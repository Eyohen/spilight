const stats = [
  { num: '99.99%', label: 'Uptime SLA on Pro and Custom plans' },
  { num: '<50ms', label: 'Average global cold start' },
  { num: '150+', label: 'Countries served on our edge network' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

