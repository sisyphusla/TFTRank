import './App.css'
import Header from './components/header'
import Footer from './components/footer'
import TabsComponent from './components/tabs'



function App() {


  return (
    <div className="app bg-hero-pattern bg-cover bg-no-repeat bg-fixed bg-image-opacity">
      <Header />
      <TabsComponent />
      {/* <Footer /> */}
    </div>
  )
}

export default App
