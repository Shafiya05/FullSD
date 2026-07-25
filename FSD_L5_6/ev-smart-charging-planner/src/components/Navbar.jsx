// Reusable top navigation placeholder for the planner.
function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <p className="text-lg font-bold text-emerald-700">EV Smart Charging Planner</p>
        <span className="text-sm text-slate-500">Plan smarter</span>
      </nav>
    </header>
  )
}

export default Navbar
