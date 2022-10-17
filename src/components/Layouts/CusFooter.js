import React from 'react'
import { CFooter } from '@coreui/react'

const CusFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        Copyrights
        <span className="ml-1">
          &copy; 2021{' '}
          <a href="https://www.boscosofttech.com/" target="_blank" rel="noopener noreferrer">
            TalentsTech
          </a>
          
        </span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://www.boscosofttech.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Boscosoft Technologies Pvt Ltd
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(CusFooter)
