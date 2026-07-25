function BatteryProgress({ targetCharge }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Battery progress</h2>
        <span className="text-sm font-medium text-slate-500">{targetCharge}%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${targetCharge}%` }}
        ></div>
      </div>
    </section>
  )
}

export default BatteryProgress
