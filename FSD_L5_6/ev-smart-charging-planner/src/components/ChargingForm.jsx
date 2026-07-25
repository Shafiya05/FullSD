import { useState } from 'react'

function ChargingForm() {
  const [vehicleType, setVehicleType] = useState('Car')
  const [batteryCapacity, setBatteryCapacity] = useState('60')
  const [currentCharge, setCurrentCharge] = useState('30')
  const [targetCharge, setTargetCharge] = useState('80')
  const [chargerType, setChargerType] = useState('Level 2')
  const [electricityCost, setElectricityCost] = useState('8')
  const [chargingCity, setChargingCity] = useState('Bangalore')
  const [chargingDate, setChargingDate] = useState('')
  const [chargingStartTime, setChargingStartTime] = useState('')

  const inputClassName =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100'

  return (
    <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          ⚡ EV Smart Charging Planner
        </h1>
        <p className="mt-2 text-slate-600">Plan your EV charging session efficiently.</p>
      </div>

      <form className="space-y-7" onSubmit={(event) => event.preventDefault()}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            Vehicle Type
            <select
              className={inputClassName}
              value={vehicleType}
              onChange={(event) => setVehicleType(event.target.value)}
            >
              <option>Car</option>
              <option>Bike</option>
              <option>Bus</option>
              <option>Truck</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Battery Capacity (kWh)
            <input
              className={inputClassName}
              type="number"
              min="0"
              placeholder="e.g. 60"
              value={batteryCapacity}
              onChange={(event) => setBatteryCapacity(event.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            <span className="flex items-center justify-between gap-3">
              Current Charge (%)
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                {currentCharge}%
              </span>
            </span>
            <input
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
              type="range"
              min="0"
              max="100"
              value={currentCharge}
              onChange={(event) => setCurrentCharge(event.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            <span className="flex items-center justify-between gap-3">
              Target Charge (%)
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                {targetCharge}%
              </span>
            </span>
            <input
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-emerald-600"
              type="range"
              min="0"
              max="100"
              value={targetCharge}
              onChange={(event) => setTargetCharge(event.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Charger Type
            <select
              className={inputClassName}
              value={chargerType}
              onChange={(event) => setChargerType(event.target.value)}
            >
              <option>Level 1</option>
              <option>Level 2</option>
              <option>DC Fast Charger</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Electricity Cost (₹ per kWh)
            <input
              className={inputClassName}
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 8"
              value={electricityCost}
              onChange={(event) => setElectricityCost(event.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Charging City
            <select
              className={inputClassName}
              value={chargingCity}
              onChange={(event) => setChargingCity(event.target.value)}
            >
              <option>Bangalore</option>
              <option>Mysore</option>
              <option>Chennai</option>
              <option>Hyderabad</option>
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Charging Date
            <input
              className={inputClassName}
              type="date"
              value={chargingDate}
              onChange={(event) => setChargingDate(event.target.value)}
            />
          </label>

          <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
            Charging Start Time
            <input
              className={inputClassName}
              type="time"
              value={chargingStartTime}
              onChange={(event) => setChargingStartTime(event.target.value)}
            />
          </label>
        </div>

        <button
          className="w-full rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 hover:shadow-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          type="submit"
        >
          Generate Smart Charging Plan
        </button>
      </form>
    </section>
  )
}

export default ChargingForm
