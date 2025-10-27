
import { createRoot } from 'react-dom/client';
import Home  from "./views/Home/Home";
import NewTodo  from "./views/NewTodo/NewTodo";
import EditTodo  from "./views/EditTodo/EditTodo";

import { BrowserRouter,Route,Routes } from 'react-router';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <Routes>
    <Route path = "/" element={<Home />} />
    <Route path = "/new" element={<NewTodo />} />
     <Route path = "/edit/:id" element={<EditTodo />} />

 </Routes>
 </BrowserRouter>
);
