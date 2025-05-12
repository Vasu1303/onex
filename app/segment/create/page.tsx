import RuleBuilder from '@/components/RuleBuilder'
import React from 'react'

const CreatePage = () => {
  return (
    <div className='min-h-screen p-8 flex items-center justify-center'>
      <div className='w-full max-w-4xl bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/10'>
        <RuleBuilder/>
      </div>
    </div>
  )
}

export default CreatePage