
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Homepage from "./pages/Homepage"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./store/useThemeStore"

import {Toaster} from "react-hot-toast"
function App() {

  const {theme,setTheme}=useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300 " data-theme={theme}>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/products/:id" element={<ProductPage/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
};

export default App;
