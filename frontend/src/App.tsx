import Navbar from "./features/NavBar.tsx"
import MainPanel from "./features/MainPanel.tsx"
import {Routes, Route} from 'react-router-dom'
import Amazon from './pages/Amazon.tsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPanel/>}/>
        <Route path="/Amazon" element={<Amazon/>}/>
        {/* <Route path="/Apple"/>
        <Route path="/Nvidia"/>
        <Route path="/Microsoft"/> */}
        </Routes>
    </>
  )
}
