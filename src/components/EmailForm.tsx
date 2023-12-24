import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { useEffect, useState } from 'react'

type EmailFormProps = {
  userEmail: string
  setUserEmail: Function
  setSignupProgress: Function
  api: ToneServiceApi
}

export default function EmailForm({
  setUserEmail,
  setSignupProgress,
  api,
}: EmailFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [verifyEmail, setVerifyEmail] = useState<string>('')
  const [isValidEmail, setValidEmail] = useState<boolean>(false)

  useEffect(() => {
    email && email == verifyEmail ? setValidEmail(true) : setValidEmail(false)
  }, [email, verifyEmail])

  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full">
      <h2 className="font-header text-3xl">Sign Up</h2>
      <p className="font-content my-2 font-normal text-base">
        Enter your email below to be a sent a code to verify the address.
      </p>
      <Form className="py-2" onSubmit={() => sendAuthEmail()}>
        <Input label="email" value={email} setValue={setEmail} />
        <Input
          label="verify email"
          className="my-2"
          value={verifyEmail}
          setValue={setVerifyEmail}
        />
        {errorMessage && (
          <div className="flex items-center bg-global text-global my-2 p-1 text-small font-header">
            <i className="fa-fw fa-solid fa-exclamation mr-2 text-xl" />
            {errorMessage}
          </div>
        )}
        <Button className="pt-2" isDisabled={!isValidEmail}>
          {isLoading && (
            <i className="fa-fw fa-regular fa-compact-disc mr-1 fa-spin-pulse" />
          )}
          Send Code
        </Button>
      </Form>
    </div>
  )

  async function sendAuthEmail() {
    setLoading(true)

    return api.user
      .createUser({ email })
      .then((response) => {
        setUserEmail(email)
        return setSignupProgress(1)
      })
      .catch((error) => {
        setErrorMessage('E-mail address is already in use.')

        return setLoading(false)
      })
  }
}
