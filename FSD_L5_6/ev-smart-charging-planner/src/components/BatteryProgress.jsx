// Reusable visual placeholder for battery level information.
function BatteryProgress() {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Battery progress</h2>
        <span className="text-sm font-medium text-slate-500">--%</span>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-1/2 rounded-full bg-emerald-500"></div>
      </div>
    </section>
  )
}

export default BatteryProgress
