import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/Pages/Home';
import Train from '@/Pages/Trainer/Train';
import Study from '@/Pages/Study/Study';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trainer" element={<Train />} />
                <Route path="/study" element={<Study />} />
                {/* Add more pages here later! Example: */}
            </Routes>
        </Router>
    );
}

export default App;