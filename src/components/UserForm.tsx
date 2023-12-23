import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form } from '@sone-dao/tone-react-core-ui'
import { UseStyleStore } from '@sone-dao/tone-react-style-store'
import { UseUserStore, UserSocials } from '@sone-dao/tone-react-user-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProfileForm from './ProfileForm'
import SocialsForm from './SocialsForm'
import ToneForm from './ToneForm'

type UserFormProps = {
  useStyleStore: UseStyleStore
  useUserStore: UseUserStore
  setSignupProgress: Function
  api: ToneServiceApi
}

export default function UserForm({
  useStyleStore,
  useUserStore,
  setSignupProgress,
  api,
}: UserFormProps) {
  const [validContrast, setValidContrast] = useState<boolean>(false)

  const router = useRouter()

  return (
    <Form className="w-full h-full" onSubmit={(e) => registerUser(e)}>
      <ProfileForm useUserStore={useUserStore} api={api} />
      <ToneForm
        useStyleStore={useStyleStore}
        validContrast={validContrast}
        setValidContrast={setValidContrast}
      />
      <SocialsForm />
      <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full my-4">
        <Button>Finish</Button>
      </div>
    </Form>
  )

  async function registerUser(e: any) {
    const display = e.target.display.value || ''
    const location = e.target.location.value || ''
    const description = e.target.description.value || ''
    const uniqueName = e.target.uniqueName.value || ''

    const colors: [string, string] = [
      e.target.primaryColor.value || '',
      e.target.secondaryColor.value || '',
    ]

    const socials: UserSocials = {
      twitter: e.target.socialsTwitter.value || '',
      instagram: e.target.socialsInstagram.value || '',
      discord: e.target.socialsDiscord.value || '',
    }

    return api.user
      .updateUser({
        display,
        location,
        description,
        colors,
        socials,
        uniqueName,
      })
      .then((response) => {
        useUserStore.setState({
          display,
          location,
          description,
          colors,
          socials,
        })

        setSignupProgress(3)
      })
      .catch((error) => console.log({ error }))
  }
}
