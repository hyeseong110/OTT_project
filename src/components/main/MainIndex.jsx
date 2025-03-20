import React from 'react'
import SubMain from './sub/SubMain'
import SubMovie from './sub/SubMovie'
import SubDrama from './sub/SubDrama'
import SubWebtoon from './sub/SubWebtoon'
import SubAnime from './sub/SubAnime'


const MainIndex = () => {
  return (
   <>
    <div className="main3">
        <div className="main3-con">
            <SubMain/>
            <SubMovie/>
            <SubDrama/>
            <SubAnime/> 
            <SubWebtoon/>
        </div>
    </div>
   
   </>
  )
}

export default MainIndex