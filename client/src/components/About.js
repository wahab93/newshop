import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aboutService } from '../services/aboutService'
import { useProductContext } from './common/api/provider'


export const About = () => {
  const { aboutURL } = useProductContext()
  const [userData, setUserData] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const callAboutPage = async () => {
      try {
        const data = await aboutService.about(aboutURL)
        setUserData(data);
        if (!data) {
          throw new Error('Not Found Data');
        }
      } catch (error) {
        console.log(error);
        navigate('/login')
      }
    }
    callAboutPage();
  }, [])

  return (
    <>
      <section className='my-5'>
        <div className="container p-3 shadow">
          <div className="row">
            <h1 className='text-center'>About</h1>
            <div className="col-10 mx-auto">
              <form method="GET">
                <div className="row mt-4">
                  <div className="col-md-6 col-12 mb-3">
                    <h5>User ID : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData._id}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>User Name : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.name}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Email : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.email}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Work : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.work}</h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>Phone : </h5>
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <h5>{userData.phone}</h5>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
