import React from 'react'
import { getCurrent } from '@/features/auth/actions'
import { redirect } from 'next/navigation'

const WorkspaceIdPageComponent = async () => {
  const user = await getCurrent()
  if(!user) redirect("/sign-in")

  return (
    <div>WorkspaceIdPageComponent</div>
  )
}

export default WorkspaceIdPageComponent