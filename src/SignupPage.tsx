'use client'

import { Carousel, Page } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'
import CodeCarouselItem from './components/CodeCarouselItem'
import EmailCarouselItem from './components/EmailCarouselItem'
import UserInfoCarouselItem from './components/UserInfoBox'

export default function SignupPage() {
  const [email, setEmail] = useState<string>('')
  const [current, setCurrent] = useState<number>(0)

  return (
    <Page additionalClasses="bg-[#F8F8F8] flex flex-col items-center justify-center w-full p-6">
      <Carousel className="max-w-4xl w-full" current={current}>
        <EmailCarouselItem
          setCurrent={setCurrent}
          email={email}
          setEmail={setEmail}
        />
        <CodeCarouselItem setCurrent={setCurrent} email={email} />
        <UserInfoCarouselItem />
      </Carousel>
    </Page>
  )
}
