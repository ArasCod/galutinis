import './App.css';
import Header from './Components/pages/Header';
import  { Routes, Route } from 'react-router-dom';
import Main from './Components/pages/Main';
import Klausimai from './Components/pages/Klausimai';
import Pridetiklausima from './Components/pages/Pridetiklausima';
import Prisijungti from './Components/pages/Prisijungti';
import SpecKlausimas from './Components/pages/SpecKlausimas';
import RedaguotiKlausima from './Components/pages/Redaguotiklausima';
import Registruotis from './Components/pages/registruotis';

function App() {
  return (
   <>
   <Header/>
   <Routes>
   <Route index element={<Main />}/>
   <Route path="klausimai">
   <Route path="visiKlausimai" element={<Klausimai />} />
   <Route path="prideti" element={<Pridetiklausima/>}/>
   <Route path=":id" element={<SpecKlausimas />} />
   <Route path="redaguoti/:id" element={<RedaguotiKlausima/>}/>
   </Route>
   <Route path="/vartotojai">
        <Route path="prisijungti" element={<Prisijungti/>} />
        <Route path="registruotis" element={<Registruotis/>} />
      </Route>
   </Routes>
   </>
  );
}

export default App;