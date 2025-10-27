
import { createRoot } from 'react-dom/client';
import Home  from "./views/Home/Home";
import NewTodo  from "./views/NewTodo/NewTodo";

import { BrowserRouter,Route,Routes } from 'react-router';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
    <Route path = "/" element={<Home />} />
    <Route path = "/new" element={<NewTodo />} />

 </Routes>
 </BrowserRouter>
);
