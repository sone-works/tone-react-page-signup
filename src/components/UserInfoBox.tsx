'use client'

import ToneApi from '@sone-dao/tone-react-api'
import {
  Avatar,
  Box,
  Button,
  CarouselItem,
  Form,
  Input,
  Textarea,
} from '@sone-dao/tone-react-core-ui'
import { useRef, useState } from 'react'

export default function UserInfoCarouselItem() {
  const [display, setDisplay] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [socials, setSocials] = useState<{
    twitter: string
    instagram: string
    discord: string
  }>({ twitter: '', instagram: '', discord: '' })
  const [avatar, setAvatar] = useState<{
    blob: Blob | null
    dataURL: string
  }>({ blob: null, dataURL: '' })

  const api = new ToneApi()

  const avatarInput = useRef<HTMLInputElement>(null)

  return (
    <CarouselItem className="flex flex-col items-center justify-center">
      <h3 className="font-header text-2xl">Your Profile</h3>
      <p className="font-content mt-2 mb-[4rem] text-zinc-500 font-normal text-base">
        Profile sign-up text here yup just filling up space.
      </p>
      <Box additionalClasses="bg-white w-full align-center">
        <input
          type="file"
          ref={avatarInput}
          onChange={() => handleAvatarFile()}
          hidden
        />
        <Avatar
          className="w-[7rem] h-[7rem] mx-auto mt-[-75px] shadow border border-gray-200 bg-white"
          fallback={
            <i className="fa-sharp fa-solid fa-camera text-zinc-500 text-2xl" />
          }
          src={avatar.dataURL}
          onClick={() => avatarInput.current?.click()}
        />
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
          <h4 className="font-header text-2xl my-4">Socials</h4>
          <Input
            className="py-2"
            value={socials.twitter}
            setValue={(value: string) =>
              setSocials({ ...socials, twitter: value })
            }
            startContent={
              <i className="fa-fw fa-brands fa-x-twitter text-xl text-zinc-500" />
            }
          />
          <Input
            className="py-2"
            value={socials.instagram}
            setValue={(value: string) =>
              setSocials({ ...socials, instagram: value })
            }
            startContent={
              <i className="fa-fw fa-brands fa-instagram text-xl text-zinc-500" />
            }
          />
          <Input
            className="py-2"
            value={socials.discord}
            setValue={(value: string) =>
              setSocials({ ...socials, discord: value })
            }
            startContent={
              <i className="fa-fw fa-brands fa-discord text-xl text-zinc-500" />
            }
          />
          <Button additionalClasses="w-full my-2 bg-[#EEFF00]" isSubmit>
            Register
          </Button>
        </Form>
      </Box>
    </CarouselItem>
  )

  async function registerUser() {
    return api.user
      .updateSelf({ display, description, socials })
      .then((response) => console.log({ response }))
      .catch((error) => console.log({ error }))
  }

  async function handleAvatarFile() {
    const files = avatarInput.current?.files || new FileList()

    const file = files[0]

    const isImage = file.type.split('/')[0] == 'image'

    if (isImage) {
      const reader = new FileReader()

      reader.onload = (e) =>
        setAvatar({ blob: file, dataURL: e.target?.result as string })

      reader.readAsDataURL(file)
    }
  }
}
