import React from 'react';
import ReactDOM from 'react-dom';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './style.css';

import FTotalRoutes from "./components/FTotalRoutes";
import {SessionProvider} from "@inrupt/solid-ui-react";

ReactDOM.render(<SessionProvider restorePreviousSession={true}><FTotalRoutes/></SessionProvider>, document.getElementById('root'));

