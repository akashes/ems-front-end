import { Routes,Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Admin from './components/Admin';
import Add from './components/Add';
import View from './components/View';
import Edit from './components/Edit';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Admin/>} />
        <Route path='/add' element={<Add/>} />
        <Route path='/view/:id' element={<View/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>

      <Footer/>
   
    </div>
  );
}

export default App;
