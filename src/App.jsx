import { Outlet } from 'react-router';
import Manager from './components/Manager/Manager';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <div className='container mx-auto max-w-7xl p-4'>
        {/* <Manager // */}
        <Outlet />
      </div>
    </>
  )
}

export default App
