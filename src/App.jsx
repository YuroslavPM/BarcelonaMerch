import banner from './assets/FC_Barcelona_banner.jpg'
import Card from './components/Card';

function App() {
  return (
    <>
      <div class="container m-auto">
        <header>
          <h1>Barcelona Merch</h1>
        </header>

        <img class='rounded-md' src={banner} alt="site banner" />
      </div>
      <div class='grid grid-cols-4 gap-10 my-4'>
      <Card/>
      <Card/>
      <Card/>
      </div>
      

    </>
  );
}

export default App;
