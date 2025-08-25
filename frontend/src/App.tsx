import Navbar from "./features/NavBar.tsx"
import MainPanel from "./features/MainPanel.tsx"
import {Routes, Route} from 'react-router-dom'
import Amazon from './pages/Amazon.tsx'
import Apple from './pages/Apple.tsx'
import Nvidia from "./pages/Nvidia.tsx"
import Microsoft from "./pages/Microsoft.tsx"

import { useState } from "react"

export default function App() {
  const [value, setValue] = useState<string>("All Time");
  return (
    <>
      <Navbar selectValue={setValue} time={value}/>
      <Routes>
        <Route path="/" element={<MainPanel time={value}/>}/>
        <Route path="/Amazon" element={<Amazon/>}/>
        <Route path="/Apple" element={<Apple/>}/>
        <Route path="/Nvidia" element={<Nvidia/>}/>
        <Route path="/Microsoft" element={<Microsoft/>}/>
      </Routes>
    </>
  )
}
