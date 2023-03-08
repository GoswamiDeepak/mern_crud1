import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './assets/components/Viewuser';
import Adduser from './assets/components/Adduser';
import Edituser from './assets/components/Edituser';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/adduser" element={<Adduser />} />
                    <Route path="/edituser/:id" element={<Edituser />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
