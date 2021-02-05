import { registerRootComponent } from 'expo';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale(`ru`);

import App from "./app/app";

const Index = () => (
  <App />
);

registerRootComponent(Index);
