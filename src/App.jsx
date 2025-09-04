import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import routes from './data/routes';

const BASE_NAME = '';

const App = () => {
    return (
        <BrowserRouter basename={BASE_NAME}>
            <Header basename={BASE_NAME} />
            <main>
                <Routes>
                    {Object.values(routes).map(({ path, element: Element }, index) => (
                        <Route key={index} path={path} element={<Element />} />
                    ))}
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default App;