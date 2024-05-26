import React from 'react'
import { Aboutmain } from './AboutMain'
import { Banner } from './Banner'
import { Footer } from './Footer'
import { Services } from './Services'
import { useSelector } from 'react-redux'

export const Home = () => {
  const stateUser = useSelector((state) => state.userHandler.user);
  console.log(stateUser)
  return (
    <>
      <Banner />
      <Aboutmain />
      <Services />
      <Footer />
    </>
  )
}
