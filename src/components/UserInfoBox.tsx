'use client'

import ToneApi from '@sone-dao/tone-react-api'
import {
  Box,
  Button,
  Form,
  Input,
  Textarea,
} from '@sone-dao/tone-react-core-ui'
import { useState } from 'react'

export default function UserInfoBox() {
  const [display, setDisplay] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [socials, setSocials] = useState<{
    twitter?: string
    instagram?: string
  }>({})

  const api = new ToneApi()

  return (
    <Box additionalClasses="bg-white w-full">
      <Form className="py-2" onSubmit={() => registerUser()}>
        <Input
          label="display name"
          className="py-2"
          value={display}
          setValue={setDisplay}
        />
        <Textarea
          label="about me"
          className="py-2"
          value={description}
          setValue={setDescription}
        />
        <h4 className="font-header text-2xl">Socials</h4>
        <Input
          className="py-2"
          value={socials.twitter}
          setValue={(value: string) =>
            setSocials({ ...socials, twitter: value })
          }
          startContent={
            <i className="fa-fw fa-brands fa-x-twitter text-base" />
          }
        />
        <Input
          className="py-2"
          value={socials.instagram}
          setValue={(value: string) =>
            setSocials({ ...socials, instagram: value })
          }
          startContent={
            <i className="fa-fw fa-brands fa-instagram text-base" />
          }
        />
        <Button additionalClasses="w-full my-2 bg-[#EEFF00]" isSubmit>
          Register
        </Button>
      </Form>
    </Box>
  )

  async function registerUser() {
    return api.user
      .updateSelf({ display, description, socials })
      .then((response) => console.log({ response }))
      .catch((error) => console.log({ error }))
  }
}
