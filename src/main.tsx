import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './theme.css'
import App from './App';
import { ResumeProvider } from './context/ResumeContext';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ResumeProvider>
            <App />
        </ResumeProvider>
    </StrictMode>
);
