import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/Pages/Home';
import Train from '@/Pages/Trainer/Train';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/train" element={<Train />} />
                {/* Add more pages here later! Example: */}
                {/* <Route path="/about" element={<About />} /> */}
            </Routes>
        </Router>
    );
}

export default App;