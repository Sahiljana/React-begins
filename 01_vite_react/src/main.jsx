import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
/*
const reactElement = {
  type : 'a',
  props : {
      href: 'http://google.com',
      target: '_blank'
  },
  children: 'Click me to visit Google'
}
               Niche dekho
*/

const anotherUser = "Sahil Jana"

const reactElement = React.createElement(
  'a',                                                  //parameter
  {href: 'https://google.com', target: '_blank'},       //properties add karta h, basically setAttribute
  'click me to visit google',                           // direct text
  anotherUser                            
)

createRoot(document.getElementById('root')).render(
  
    //<App />
    reactElement
  
)
