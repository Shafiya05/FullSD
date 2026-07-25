import { useState } from 'react'
import Navbar from './components/Navbar'
import ChargingForm from './components/ChargingForm'
import ResultCard from './components/ResultCard'
import WeatherCard from './components/WeatherCard'
import BatteryProgress from './components/BatteryProgress'
import Footer from './components/Footer'

function App() {
  const [vehicleType, setVehicleType] = useState('Car')
  const [batteryCapacity, setBatteryCapacity] = useState('60')
  const [currentCharge, setCurrentCharge] = useState('30')
  const [targetCharge, setTargetCharge] = useState('80')
  const [chargerType, setChargerType] = useState('Level 2')
  const [electricityCost, setElectricityCost] = useState('8')
  const [chargingCity, setChargingCity] = useState('Bangalore')
  const [chargingDate, setChargingDate] = useState('')
  const [chargingStartTime, setChargingStartTime] = useState('')
  const [result, setResult] = useState(null)

  const generatePlan = () => {
    const capacity = Number(batteryCapacity) || 0
    const current = Number(currentCharge)
    const target = Number(targetCharge)
    const costPerKwh = Number(electricityCost) || 0

    if (target <= current) {
      setResult({ error: 'Target charge must be greater than current charge.' })
      return
    }

    const energyRequired = capacity * ((target - current) / 100)
    const chargingRates = {
      'Level 1': 2,
      'Level 2': 7,
      'DC Fast Charger': 50,
    }
    const chargingTime = energyRequired / chargingRates[chargerType]
    const completionDateTime =
      chargingDate && chargingStartTime
        ? new Date(`${chargingDate}T${chargingStartTime}`)
        : null

    if (completionDateTime) {
      completionDateTime.setMinutes(
        completionDateTime.getMinutes() + Math.round(chargingTime * 60),
      )
    }

    setResult({
      vehicleType,
      chargingCity,
      energyRequired,
      chargingTime,
      estimatedCost: energyRequired * costPerKwh,
      completionTime: completionDateTime
        ? completionDateTime.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          })
        : 'Select a charging date and start time',
      batteryHealth:
        current >= 80 ? 'Excellent' : current >= 50 ? 'Good' : 'Needs Charging',
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
        <ChargingForm
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          batteryCapacity={batteryCapacity}
          setBatteryCapacity={setBatteryCapacity}
          currentCharge={currentCharge}
          setCurrentCharge={setCurrentCharge}
          targetCharge={targetCharge}
          setTargetCharge={setTargetCharge}
          chargerType={chargerType}
          setChargerType={setChargerType}
          electricityCost={electricityCost}
          setElectricityCost={setElectricityCost}
          chargingCity={chargingCity}
          setChargingCity={setChargingCity}
          chargingDate={chargingDate}
          setChargingDate={setChargingDate}
          chargingStartTime={chargingStartTime}
          setChargingStartTime={setChargingStartTime}
          onGeneratePlan={generatePlan}
        />
        <ResultCard result={result} />
        <WeatherCard city={chargingCity} />
        <BatteryProgress targetCharge={targetCharge} />
      </section>
      <Footer />
    </main>
  )
}

export default App
