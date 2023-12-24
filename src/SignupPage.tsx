import ToneServiceApi from '@sone-dao/tone-react-api'
import { Carousel } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import Head from 'next/head'
import { useState } from 'react'
import CodeForm from './components/CodeForm'
import EmailForm from './components/EmailForm'
import SuccessBox from './components/SuccessBox'
import UserForm from './components/UserForm'

type SignupPageProps = {
  useStyleStore: UseStyleStore
  useUserStore: UseUserStore
}

export default function SignupPage({
  useStyleStore,
  useUserStore,
}: SignupPageProps) {
  const [signupProgress, setSignupProgress] = useState<number>(0)
  const [userEmail, setUserEmail] = useState<string>('')

  const api = new ToneServiceApi()

  return (
    <>
      <Head>
        <title>Tone - Signup</title>
      </Head>
      <main className="flex items-center justify-center bg-global grow h-full p-4">
        <div className="flex flex-col items-center w-full max-w-xl">
          <span className="font-release text-global text-5xl m-4">tone</span>
          <Carousel current={signupProgress}>
            <EmailForm
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              setSignupProgress={setSignupProgress}
              api={api}
            />
            <CodeForm
              userEmail={userEmail}
              setSignupProgress={setSignupProgress}
              useUserStore={useUserStore}
              api={api}
            />
            <UserForm
              useStyleStore={useStyleStore}
              useUserStore={useUserStore}
              setSignupProgress={setSignupProgress}
              api={api}
            />
            <SuccessBox />
          </Carousel>
        </div>
      </main>
    </>
  )
}
