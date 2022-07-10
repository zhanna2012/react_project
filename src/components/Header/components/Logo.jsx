import LogoPic from './assets/online-learning.png'

import './Logo.css';

import {altForLogo} from "../../../constants"

function Logo(props) {
    return (
        <img 
        src={LogoPic}
        alt={altForLogo}
        data-testid="logo"/>
      );
  }
export default Logo;
  