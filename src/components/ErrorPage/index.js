import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function ErrorPage() {

  return (
    <div className="errorPage">
       <div id="clouds">
            <div className="cloud x1"></div>
            <div className="cloud x1_5"></div>
            <div className="cloud x2"></div>
            <div className="cloud x3"></div>
            <div className="cloud x4"></div>
            <div className="cloud x5"></div>
        </div>
        <div className="container">
          <div className='c'>
              <div className='_404'>404</div>
              <hr />
              <div className='_1'>THE PAGE</div>
              <div className='_2'>WAS NOT FOUND</div>
              <Link className='btn' to='/'>BACK TO HOMEPAGE</Link>
          </div>
        </div>
    </div>
  );
}

export default ErrorPage;
