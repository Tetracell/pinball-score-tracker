import React from 'react'


const dearLeader = require("../dear_leader.jpeg")

export const Home = () => {
  return (
    <div>
        <img src={dearLeader} alt="Dear Leader" height={600}></img>
        To begin, please choose one of the options on the top of
        the Navigation bar, or if on mobile, press the hamburger
        menu in the top left.
    </div>
  )
}
