import './App.css'

function App() {

  return (
    <div className='relative flex min-h-screen w-full flex-col overflow-x-hidden'>
      <header className='sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-background-light/80 backdrop-blur-md px-6 md:px-12 py-4 dark:bg-background-dark/80'>
        <div className='flex items-center gap-2 text-slate-900 dark:text-slate-100'>
          <div className='bg-primary p-1.5 rounded-lg flex items-center justify-center'>
            <span className='material-symbols-outlined text-slate-900 text-2xl'>electric_scooter</span>
          </div>
          <h2 className='text-xl font-bold tracking-tight'>EcoRuedas</h2>
        </div>

        <nav className='hidden md:flex items-center gap-8'>
          <a className="text-sm font-semibold hover:text-primary transition-colors">Inicio</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors">Servicios</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors">Contacto</a>
          <a className='text-sm font-semibold hover:text-primary transition-colors'>Sustentabilidad</a>
          <a className="text-sm font-semibold hover:text-primary transition-colors">Iniciar Sesión</a>
        </nav>

        <div className='flex items-center gap-4'>
          <button className='hidden sm:flex min-w-[100px] cursor-pointer items-center justify-center rounded-full bg-primary h-10 px-5 text-slate-900 text-sm font-bold transition-transform active:scale-95'>
            Profile/Login
          </button>
          <div className='size-10 rounded-full border-2 border-primary/20 bg-cover bg-center' data-alt="User profile avatar placeholder" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARGDE7wMFrQLHmcdk4jcHSUUcj3PnSrjL2EqaWF7NQGKEbM9ADnl-cBpXwf5ImIzASPgm3WG-BkPN3oStlZHOcBfNd9XDlwFTljyJyDLiI8HkWO2PZnJJb0FUXCiXWXDvRtZSkTV6pRAgln4NQlrhIyikXNAH9mXy4fB0FXqP9u63bEfYRk7jv841qmK3r-36QEDMIb9lCFBtMxQRET9dcBHlYtrrepBm-NGon1Z8LWWgROn40VtlbgYCoYKqqQsnFJ8eN229U_4g")' }}></div>
        </div>
      </header>


      <h1 className='flex justify-center text-md font-bold text-primary drop-shadow-lg'>
        ¡Bienvenido a EcoRuedas, tu plataforma de alquiler de scooters y bicicletas eléctricas!
      </h1>

      <main className='flex flex-1 flex-col md:flex-row relative'>
        <div className='w-full md:w-[400px] lg:w-[450px] p-6 z-20 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-72px)] bg-background-light/95 dark:bg-background-dark/95 border-r border-primary/10'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold'>Encuentra tu rodado ideal</h1>
            <p className='text-sm text-slate-700 dark:text-slate-300'>Eligue tu vehículo más cercano. </p>
          </div>
          <div className='relative'>
            <span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary'>search</span>
            <input type="text" placeholder="Buscar por ubicación o tipo de vehículo" className="pl-10 w-full p-2 border border-primary/20 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-bold uppercase tracking-wider text-slate-400'>Categorías</span>
              <button className='text-xs font-semibold text-primary hover:underline'>Ver todas</button>
            </div>
            <div className='flex flex-wrap gap-2'>
              <button className='flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-slate-900 text-sm font-semibold'>
                <span className='material-symbols-outlined text-sm'>electric_scooter</span>
                <span>Scooters</span>
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-primary rounded-full text-slate-900 text-sm font-semibold'>
                <span className='material-symbols-outlined text-sm'>directions_bike</span>
                <span>Bicicletas</span>
              </button>
              <button className='flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-primary/20 rounded-full text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-rpimary/10'>
                <span className='material-symbols-outlined text-sm'>battery_charging_full</span>
                <span>70%+ Battery</span>
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <span className='text-sm font-bold uppercase tracking-wider text-slate-400'>Vehículos disponibles</span>
            <div className='flex flex-col gap-3'>
              <div className='bg-white dark:bg-slate-800 p-4 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-shadow group cursor-pointer'>
                <div className='flex justify-between items-start mb-3'>
                  <div>
                    <h3 className='font-bold'>Scooter Eléctrico X1</h3>
                    <p className='text-xs text-slate-500'>Ubicación: Centro de la ciudad</p>
                  </div>
                  <div className='bg-primary/20 px-2 py-1 rounded text-[10px] font-bold text-slate-900 dark:text-primary uppercase tracking-tighter'>Scooter</div>
                </div>
                <div className='flex items-center gap-4 mb-3'>
                  <div className='flex items-center gap-1.5'>
                    <span className='material-symbols-outlined text-primary text-lg'>battery_5_bar</span>
                    <span className='text-sm font-semibold'>82%</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='material-symbols-outlined text-primary text-lg'>speed</span>
                    <span className='text-sm font-semibold'>25 km/h</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <span className='material-symbols-outlined text-primary text-lg'>payments</span>
                    <span className='text-sm font-semibold'>$2.50/h</span>
                  </div>
                </div>
                <button className='w-full bg-primary text-slate-900 font-bold py-2.5 rounded-lg group-hover:brightness-105 transition-all'>Alquilar</button>
              </div>
      
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
