import { registerRootComponent } from 'expo';
import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import App from './app/app';
import { rawRegistrations } from './data/registrations';
import { adaptRegsToClient } from './core/adapter/registrations';

moment.locale(`ru`);

const parsedRegistrations = JSON.parse(rawRegistrations);
console.log(adaptRegsToClient(parsedRegistrations));

const Index = () => (
  <App/>
);

registerRootComponent(Index);
