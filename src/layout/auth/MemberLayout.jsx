import React, { useEffect, useState } from 'react'
import MemberFooter from '../../components/auth/member/MemberFooter'
import MemberPage from '../../pages/auth/MemberPage'
import { Outlet } from 'react-router-dom'

import Header from '../../components/common/Header'

const MemberLayout = () => {
  

  useEffect(() => {
    const header = document.querySelector('.header .header-con .gnb')
    const headerGnb = document.querySelector('.header .header-con .gnb h1.logo')

    header.style.justifyContent = 'space-between'
    headerGnb.style.display = 'flex'

  },[])

  

  return (
    <>   
     <Header/>
      <MemberPage/>
     <MemberFooter/>
    </>
  )
}

export default MemberLayout