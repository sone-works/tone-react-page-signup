import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'

type CodeFormProps = {
  userEmail: string
  setExperience: Function
  useUserStore: UseUserStore
  api: ToneServiceApi
}

export default function CodeForm({
  userEmail,
  setExperience,
  useUserStore,
  api,
}: CodeFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isResending, setResending] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [code, setCode] = useState<string>('')

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global w-full">
        <h3 className="font-header text-2xl font-normal">Verification code</h3>
        <p className="font-content my-2 text-global font-content text-base">
          Enter the code sent to you just now to verify your e-mail address.
          We'll wait...
        </p>
        <Form className="py-2" onSubmit={(e) => verifyCode(e)}>
          <Input label="code" name="code" value={code} setValue={setCode} />
          {errorMessage && (
            <div className="flex items-center bg-global text-global my-2 p-1 text-small font-header">
              <i className="fa-fw fa-solid fa-exclamation mr-2 text-xl" />
              {errorMessage}
            </div>
          )}
          <Button className="mt-2" isDisabled={code.length !== 6}>
            {isLoading && (
              <i className="fa-fw fa-regular fa-compact-disc fa-spin-pulse mr-1" />
            )}
            Sign Up
          </Button>
        </Form>
        <div className="flex items-center justify-end text-sm">
          Never received an e-mail?
          <button
            type="button"
            className="outline-none bg-global text-global border-1 border-global text-sm rounded-xl ml-2 p-2 hover:bg-global-flipped hover:text-global-flipped"
            onClick={() => resendEmail()}
          >
            {isResending && (
              <i className="fa-fw fa-solid fa-envelope mr-1 fa-spin-pulse" />
            )}
            Resend
          </button>
        </div>
      </div>
    </div>
  )

  async function verifyCode(e: any) {
    setLoading(true)

    const code = e.target.code.value || ''

    return api.user
      .verifyEmail(userEmail, code)
      .then((response) => {
        const { user } = response

        useUserStore.setState({ isLoggedIn: true, userId: user.userId })

        return setExperience('user')
      })
      .catch((error) => setLoading(false))
  }

  async function resendEmail() {
    setResending(true)

    return api.user
      .reverifyEmail(userEmail)
      .then(() => setResending(false))
      .catch(() => {
        setErrorMessage('Invalid verification code.')

        return setResending(false)
      })
  }
}
