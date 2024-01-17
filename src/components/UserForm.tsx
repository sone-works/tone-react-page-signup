import ToneServiceApi from '@sone-dao/tone-react-api'
import { Button, Form } from '@sone-dao/tone-react-core-ui'
import { UseUserStore, UserSocials } from '@sone-dao/tone-react-user-store'
import { useState } from 'react'
import ProfileForm from './ProfileForm'
import SocialsForm from './SocialsForm'
import ToneForm from './ToneForm'

type UserFormProps = {
  useUserStore: UseUserStore
  setExperience: Function
  api: ToneServiceApi
}

export default function UserForm({
  useUserStore,
  setExperience,
  api,
}: UserFormProps) {
  const [validContrast, setValidContrast] = useState<boolean>(false)

  return (
    <div className="p-4 bg-global">
      <div className="flex justify-center font-release text-5xl mb-16 w-full">
        tone
      </div>
      <Form onSubmit={(e) => registerUser(e)}>
        <ProfileForm useUserStore={useUserStore} api={api} />
        <ToneForm
          validContrast={validContrast}
          setValidContrast={setValidContrast}
        />
        <SocialsForm />
        <Button>Finish</Button>
      </Form>
    </div>
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

        setExperience('success')
      })
      .catch((error) => console.log({ error }))
  }
}
