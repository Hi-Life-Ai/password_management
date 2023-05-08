import { BrowserRouter, Routes, Route } from "react-router-dom";

// Forward Application stack
import Applicationstack from './Applicationstack';

function Applicationcondition () {
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    {/* Forward Application stack */}
                    <Route path="/appstack" element={<Applicationstack />} />                    
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default Applicationcondition;
