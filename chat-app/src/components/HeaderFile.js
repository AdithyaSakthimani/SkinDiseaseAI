import React from 'react'
import './TextStyle.css'
function HeaderFile(props) {
  return (
      <h1 className={`header-txt-${props.mode}`}> AI SKIN DOCTOR  </h1>
  )
}

export default HeaderFile
