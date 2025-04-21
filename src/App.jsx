import { createSignal } from 'solid-js';
import { Router, Routes, Route, A } from "@solidjs/router";
import banner from './assets/FC_Barcelona_banner.jpg';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Product from './pages/Product';
import { useCartContext } from './context/CartContext';

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);
  
  const toggleTheme = () => setDarkTheme(!darkTheme());
  const { items } = useCartContext();
  
  // Access items as a function to make it reactive
  const quantity = () => {
    const { getTotalItems } = useCartContext();
    return getTotalItems();
  };

  return (
    <div classList={{ 
      "bg-gray-100 text-gray-900": !darkTheme(),
      "bg-neutral-900 text-gray-100": darkTheme() 
    }}>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <header class="py-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <div class="flex items-center space-x-6">
            <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">
              Barcelona Merch
            </h1>
          </div>
          
          <nav class="flex items-center space-x-8">
            <A 
              href="/" 
              class="px-1 py-2 font-medium transition-colors"
              activeClass="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              inactiveClass="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home 
            </A>
            <A 
              href="/cart" 
              class="px-1 py-2 font-medium transition-colors"
              activeClass="text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
              inactiveClass="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Cart ({quantity()})
            </A>
            <button 
              onClick={toggleTheme}
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkTheme() ? (
                <span class="material-symbols-outlined text-yellow-400">wb_sunny</span>
              ) : (
                <span class="material-symbols-outlined">dark_mode</span>
              )}
            </button>
          </nav>
        </header>

        {/* Rest of your component remains the same */}
        {/* Hero Banner */}
        <div class="relative my-6 rounded-xl overflow-hidden shadow-lg">
          <img 
            src={banner} 
            alt="FC Barcelona Team Banner" 
            class="w-full h-auto max-h-[400px] object-cover object-center"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
            <div class="text-white">
              <h2 class="text-4xl font-bold mb-2">Official FC Barcelona Store</h2>
              <p class="text-xl opacity-90">Authentic merchandise and collectibles</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main class="min-h-[70vh] py-8 transition-opacity duration-300">
          <Routes>
            <Route path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/product/:id" component={Product} />
          </Routes>
        </main>

        {/* Footer */}
        <footer class="py-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Barcelona Merch. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;