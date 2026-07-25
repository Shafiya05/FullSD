function ResultCard({ result }) {
  if (!result) {
    return (
      <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-900">⚡ Charging Summary</h2>
        <p className="mt-2 text-emerald-800">
          Fill the form and generate your charging plan.
        </p>
      </section>
    )
  }

  if (result.error) {
    return (
      <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-900">⚡ Charging Summary</h2>
        <p className="mt-2 text-emerald-800">{result.error}</p>
      </section>
    )
  }

  const summaryItems = [
    ['Vehicle Type', result.vehicleType],
    ['Charging City', result.chargingCity],
    ['Energy Required', `${result.energyRequired.toFixed(2)} kWh`],
    ['Charging Time', `${result.chargingTime.toFixed(2)} hours`],
    ['Estimated Cost', `₹${result.estimatedCost.toFixed(2)}`],
    ['Completion Time', result.completionTime],
    ['Battery Health', result.batteryHealth],
  ]

  return (
    <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-6">
      <h2 className="text-xl font-semibold text-emerald-900">⚡ Charging Summary</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {summaryItems.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white/70 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {label}
            </dt>
            <dd className="mt-1 font-medium text-emerald-950">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default ResultCard
