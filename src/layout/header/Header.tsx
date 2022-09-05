import React from 'react'
import { NextPage } from 'next'

interface Props {
  title?: string;
}

const Header: NextPage<Props> = ({ title = 'Watch the Latest Lessons' }) => {
  return (
    <div className='header'>
      <h2 className='header__title'>{title}</h2>
    </div>
  )
}

export default Header