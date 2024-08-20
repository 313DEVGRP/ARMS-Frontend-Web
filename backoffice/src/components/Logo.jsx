import HyperMig from '@/assets/logo.png';
import Backoffice from '@/assets/backoffice.png';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="logo">
      <h1>
        <Link to="/">
          <img src={HyperMig} width="120" className="d-inline-block align-top mt-4" alt="HyperMig" />
        </Link>
      </h1>
      <h1>
        <Link to="/">
          <img src={Backoffice} width="70" className="d-inline-block align-top ms-5" alt="HyperMig" />
        </Link>
      </h1>
    </div>
  );
}

export default Logo;
