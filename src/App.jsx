import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuStartPage from './pages/customer/MenuStartPage';
import MenuListPage from './pages/customer/MenuListPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuStartPage />} />
        <Route path='/menu/:category' element={<MenuListPage />} />
      </Routes>
    </Router>
    // <div className="App">
    //   <MenuStartPage />
    // </div>
  );
}

export default App;
