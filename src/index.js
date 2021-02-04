import { registerRootComponent } from 'expo';
import React from 'react';

import App from "./app/app";

const Index = () => {
  return (
    <App />
  );
};

registerRootComponent(Index);
