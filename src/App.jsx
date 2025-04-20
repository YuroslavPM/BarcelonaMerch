import { createSignal } from 'solid-js';
import { Router, Routes, Route, A } from "@solidjs/router";
import banner from './assets/FC_Barcelona_banner.jpg';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  const [darkTheme, setDarkTheme] = createSignal(false);
  
  const toggleTheme = () => setDarkTheme(!darkTheme());

  return (
    <div class="container m-auto">
      <header 
        class="my-4 p-2 text-xl flex items-center gap-4"
        classList={{ 
          "bg-neutral-900": darkTheme(), 
          "text-white": darkTheme() 
        }}
      >
        <span 
          class="material-symbols-outlined cursor-pointer" 
          onClick={toggleTheme}
        >
          light_mode
        </span>
        <h1 class="mr-auto">Barcelona Merch</h1>
        <A 
          href="/" 
          activeClass="text-blue-500"
          inactiveClass="hover:text-blue-300"
        >
          Home
        </A>
        <A 
          href="/cart" 
          activeClass="text-blue-500"
          inactiveClass="hover:text-blue-300"
        >
          Cart
        </A>
      </header>

      <img class="rounded-md" src={banner} alt="site banner" />

      <main class="min-h-[300px] transition-opacity duration-300">
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/cart" component={Cart} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
