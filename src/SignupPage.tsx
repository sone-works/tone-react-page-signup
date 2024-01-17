import ToneServiceApi from '@sone-dao/tone-react-api'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import Head from 'next/head'
import { useState } from 'react'
import CodeForm from './components/CodeForm'
import EmailForm from './components/EmailForm'
import SuccessBox from './components/SuccessBox'
import UserForm from './components/UserForm'

type SignupPageProps = {
  useUserStore: UseUserStore
}

export default function SignupPage({ useUserStore }: SignupPageProps) {
  const [experience, setExperience] = useState<string>('email')
  const [userEmail, setUserEmail] = useState<string>('')

  const api = new ToneServiceApi()

  return (
    <>
      <Head>
        <title>Tone - Signup</title>
      </Head>
      <ExperienceRouter />
    </>
  )

  function ExperienceRouter() {
    switch (experience) {
      case 'email':
        return (
          <EmailForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setExperience={setExperience}
            api={api}
          />
        )
      case 'code':
        return (
          <CodeForm
            userEmail={userEmail}
            setExperience={setExperience}
            useUserStore={useUserStore}
            api={api}
          />
        )
      case 'user':
        return (
          <UserForm
            useUserStore={useUserStore}
            setExperience={setExperience}
            api={api}
          />
        )
      case 'success':
        return <SuccessBox />
      default:
        return (
          <EmailForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setExperience={setExperience}
            api={api}
          />
        )
    }
  }
}
