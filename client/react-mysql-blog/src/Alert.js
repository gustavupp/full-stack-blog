import React from 'react'

const Alert = ({ message }) => {
  return (
    <div className="alert alert-info text-center" role="alert">
      {message}
    </div>
  )
}

export default Alert
