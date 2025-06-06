import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuStartPage from './pages/customer/MenuStartPage';
import MenuListPage from './pages/customer/MenuListPage';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Route voor QR-code met tafel GUID */}
                <Route path='/menu/table/:tableGuid' element={<MenuStartPage />} />

                {/* Eventuele standaard startpagina */}
                <Route path='/' element={<MenuStartPage />} />

                {/* Menu op basis van categorie */}
                <Route path='/menu/:category' element={<MenuListPage />} />
            </Routes>
        </Router>
    );
}

export default App;
