import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {UsersProvider} from './context/vartotojaicontext';
import {QuestionsProvider} from './context/klausimaicontext';
import {BrowserRouter} from 'react-router-dom';
import {AwnsersProvider} from "./context/Atsakymucontext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<QuestionsProvider>
    <AwnsersProvider>
        <UsersProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UsersProvider>
    </AwnsersProvider>
</QuestionsProvider>       
)      