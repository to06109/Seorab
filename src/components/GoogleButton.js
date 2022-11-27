import React, { useRef } from 'react'
import useScript from '../hooks/useScript'
// import { postGoogleLogin } from 'api/auth'

// https://github.com/anthonyjgrove/react-google-login/issues/502
// https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
export default function GoogleButton({ onGoogleSignIn = () => {} }) {
  const googleSignInButton = useRef(null)

  useScript('https://accounts.google.com/gsi/client', () => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    })
    window.google.accounts.id.renderButton(googleSignInButton.current, {
      width: '370',
      size: 'medium',
    })
  })

  return (
    <div className="google">
      <div ref={googleSignInButton}></div>
    </div>
  )
}
