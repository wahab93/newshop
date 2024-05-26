import React from 'react'
import { useSelector } from 'react-redux';

export const Banner = () => {
    const stateUser = useSelector((state) => state.userHandler.user);
    return (
        <>
            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="banner">
                                <img src="/images/slider/banner-1.jpg" className="d-block w-100" alt="Banner" />
                                <div className='figcaption'>
                                    <h2>Welcome</h2>
                                    {
                                        stateUser && (
                                            <>
                                                <p>{stateUser.name}</p>
                                                <p>Happy to see you Back</p>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
