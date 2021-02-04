import { registerRootComponent } from 'expo';
import React from 'react';

import App from "./app/app";

const Index = () => (
  <App />
);

registerRootComponent(Index);
