import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link } from 'react-router-dom';

function Example() {
    return (
        <div className="container">
            <div className="flex min-h-screen justify-center items-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>

                        <div className="card-body">I'm an example component!</div>
                    </div>
                    <ul className='bg-red-600 rounded-md'>
                        <li>
                            <Link to={'/dashboard'}>dashboard</Link>
                        </li>
                        <li>
                            <Link to={'/dashboard/about'}>about</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Example;
