import Navbar from './components/Navbar'
import ChargingForm from './components/ChargingForm'
import ResultCard from './components/ResultCard'
import BatteryProgress from './components/BatteryProgress'
import Footer from './components/Footer'

// The page currently arranges static, reusable UI sections only.
function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
        <ChargingForm />
        <ResultCard />
        <BatteryProgress />
      </section>
      <Footer />
    </main>
  )
}

export default App
