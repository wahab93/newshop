import React from 'react'
import { Link } from 'react-router-dom'
export const ErrorPage = () => {
    return (
        <>
            <section className='my-5'>
                <div className="container shadow p-5">
                    <div className="row">
                        <div className="col-12">
                            <h1>Error Page 404</h1>
                            <Link className='btn btn-primary mt-3' to='/'>Back to Home</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
