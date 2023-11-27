'use client'

import ToneApi from '@sone-dao/tone-react-api'
import {
  Box,
  Button,
  CarouselItem,
  Form,
  Input,
} from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'

type EmailBoxProps = {
  setCurrent: Function
  email: string
  setEmail: Function
}

export default function EmailCarouselItem({
  setCurrent,
  email,
  setEmail,
}: EmailBoxProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const api = new ToneApi()

  return (
    <CarouselItem className="flex flex-col items-center justify-center">
      <Box additionalClasses="bg-white w-full">
        <h3 className="font-header text-2xl">Sign Up</h3>
        <p className="font-content my-2 text-zinc-500 font-normal text-base">
          Enter your email below to receive a verfication code.
        </p>
        <Form className="py-2" onSubmit={() => sendAuthEmail()}>
          <Input
            label="e-mail"
            className="py-2"
            value={email}
            setValue={setEmail}
            isInvalid={errorMessage ? true : false}
            errorMessage={errorMessage}
          />
          <Button
            additionalClasses="w-full my-2 bg-[#EEFF00]"
            isLoading={isLoading}
            isSubmit
          >
            Sign up
          </Button>
        </Form>
      </Box>
    </CarouselItem>
  )

  async function sendAuthEmail() {
    setLoading(true)

    if (!email) {
      setErrorMessage('E-mail address is required to sign up.')
      return setLoading(false)
    }

    api.user
      .createUser({ email })
      .then(() =>
        api.auth
          .sendAuthEmail(email)
          .then(() => setCurrent(1))
          .catch((error) => {
            console.log({ error })
            setLoading(false)
          })
      )
      .catch((error) => {
        error.message == 'DATABASE_ERROR' &&
          setErrorMessage('E-mail address is already in use.')

        setLoading(false)
      })
  }
}
