import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'
import { UseUserStore } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'

type CodeFormProps = {
  userEmail: string
  setSignupProgress: Function
  useUserStore: UseUserStore
  api: ToneServiceApi
}

export default function CodeForm({
  userEmail,
  setSignupProgress,
  useUserStore,
  api,
}: CodeFormProps) {
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full">
      <h3 className="font-header text-2xl font-normal">Verification code</h3>
      <p className="font-content my-2 text-global-flipped font-content text-base">
        Enter the code sent to you just now to verify your e-mail address. We'll
        wait...
      </p>
      <Form className="py-2" onSubmit={(e) => verifyCode(e)}>
        <Input label="code" name="code" />
        <Button className="mt-4">Sign Up</Button>
      </Form>
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

        setSignupProgress(2)
      })
      .catch((error) => {
        setLoading(false)

        console.log({ error })
      })
  }
}
