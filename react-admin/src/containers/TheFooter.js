import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://tioye.dev" target="_blank" rel="noopener noreferrer">CodenificenT by Christian Tioyé</a>
        <span className="ml-1">    
     &copy; 2019 -  {currentYear} *  All Rights Reserved
</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">CoreUI for React</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
