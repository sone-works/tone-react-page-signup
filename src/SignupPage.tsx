'use client'

import { Carousel, Page } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'
import CodeBox from './components/CodeBox'
import EmailBox from './components/EmailBox'
import UserInfoBox from './components/UserInfoBox'

export default function SignupPage() {
  const [email, setEmail] = useState<string>('')
  const [current, setCurrent] = useState<number>(0)

  return (
    <Page additionalClasses="bg-[#F8F8F8]">
      <Carousel
        className="flex h-full items-center justify-center w-full"
        current={current}
      >
        <EmailBox setCurrent={setCurrent} email={email} setEmail={setEmail} />
        <CodeBox setCurrent={setCurrent} email={email} />
        <UserInfoBox />
      </Carousel>
    </Page>
  )
}
