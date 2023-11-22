'use client'

import ToneApi from '@sone-dao/tone-react-api'
import { Box, Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'

type EmailBoxProps = {
  setCurrent: Function
  email: string
  setEmail: Function
}

export default function EmailBox({
  setCurrent,
  email,
  setEmail,
}: EmailBoxProps) {
  const [isLoading, setLoading] = useState<boolean>(false)

  const api = new ToneApi()

  return (
    <Box additionalClasses="w-full">
      <h3 className="font-header text-3xl">Sign Up</h3>
      <p className="font-content my-2">
        Enter your email below to receive a verfication code.
      </p>
      <Form className="py-2" onSubmit={() => sendAuthEmail()}>
        <Input
          label="e-mail"
          className="py-2"
          value={email}
          setValue={setEmail}
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
  )

  async function sendAuthEmail() {
    setLoading(true)

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
        console.log({ error })
        setLoading(false)
      })
  }
}
