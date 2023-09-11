import React from 'react'
import { auth } from '../routes/firebase'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}: {children:React.ReactNode}) {
  //유저가 로그인 했는지 여부 알려줌
  const user = auth.currentUser;
  
  if(user === null) {
    return <Navigate to='/login' />;
  }

  //children -> Home, Profile
  return children;
  
}
