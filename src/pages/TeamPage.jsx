import React from 'react'
import TeamGrid from '../components/TeamGrid'

const TeamPage = () => {
  return (
    <div
      className="
        w-full min-h-screen 
        bg-black text-white 
        flex justify-center 
        px-3 sm:px-6 lg:px-10
        overflow-x-hidden
      "
    >
      <div className="w-full max-w-[1600px]">
        <TeamGrid />
      </div>
    </div>
  )
}

export default TeamPage
