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

  switch (experience) {
    case 'email':
      return (
        <>
          <Head>
            <title>Tone - Signup</title>
          </Head>
          <EmailForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setExperience={setExperience}
            api={api}
          />
        </>
      )
    case 'code':
      return (
        <>
          <Head>
            <title>Tone - Signup - {userEmail}</title>
          </Head>
          <CodeForm
            userEmail={userEmail}
            setExperience={setExperience}
            useUserStore={useUserStore}
            api={api}
          />
        </>
      )
    case 'user':
      return (
        <>
          <Head>
            <title>Tone - Signup - {userEmail}</title>
          </Head>
          <UserForm
            useUserStore={useUserStore}
            setExperience={setExperience}
            api={api}
          />
        </>
      )
    case 'success':
      return (
        <>
          <Head>
            <title>Tone - Signup - Success</title>
          </Head>
          <SuccessBox />
        </>
      )
    default:
      return (
        <>
          <Head>
            <title>Tone - Signup</title>
          </Head>
          <EmailForm
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setExperience={setExperience}
            api={api}
          />
        </>
      )
  }
}
