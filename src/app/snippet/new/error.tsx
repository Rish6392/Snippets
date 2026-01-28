"use client"

import React from 'react'

type ErrorPageProps = {
    error:Error
}

const ErrorPage = ({error}:ErrorPageProps) => {
  return (
    <div>
      Error Page
    </div>
  )
}

export default ErrorPage
