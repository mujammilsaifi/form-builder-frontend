import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';



const RouteCom = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/form/create" element={<CreateForm/>}/>
         <Route path="/edit/:id" element={<EditForm/>} />
        <Route path="/view/:id" element={<ViewForm/>} />
      </Routes>
    </Router>
  );
};

export default RouteCom;
