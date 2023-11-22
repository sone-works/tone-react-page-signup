'use client'

import ToneApi from '@sone-dao/tone-react-api'
import { Box, Button, Form, SixDigitInput } from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'

type CodeBoxProps = {
  setCurrent: Function
  email: string
}

export default function CodeBox({ setCurrent, email }: CodeBoxProps) {
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const api = new ToneApi()

  return (
    <Box additionalClasses="w-full">
      <h3 className="font-header text-3xl">Verification code</h3>
      <p className="font-content my-2">
        Fill in the code received in your email to verify your e-mail address.
      </p>
      <Form className="py-2" onSubmit={() => verifyCode()}>
        <SixDigitInput value={code} setValue={setCode} />
        <Button
          isLoading={loading}
          additionalClasses="w-full my-2 bg-[#EEFF00]"
          isSubmit
        >
          Continue
        </Button>
      </Form>
    </Box>
  )

  async function verifyCode() {
    setLoading(true)

    return api.auth
      .verifyCode(email, code)
      .then(() => setCurrent(2))
      .catch((error) => console.log({ error }))
  }
}
