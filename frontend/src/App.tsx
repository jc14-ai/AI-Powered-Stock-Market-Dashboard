import Navbar from "./features/NavBar.tsx"
import MainPanel from "./features/MainPanel.tsx"
import {Routes, Route} from 'react-router-dom'
import Amazon from './pages/Amazon.tsx'
import Apple from './pages/Apple.tsx'
import Nvidia from "./pages/Nvidia.tsx"
import Microsoft from "./pages/Microsoft.tsx"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPanel/>}/>
        <Route path="/Amazon" element={<Amazon/>}/>
        <Route path="/Apple" element={<Apple/>}/>
        <Route path="/Nvidia" element={<Nvidia/>}/>
        <Route path="/Microsoft" element={<Microsoft/>}/>
        </Routes>
    </>
  )
}
