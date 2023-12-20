import ToneApiService from '@sone-dao/tone-react-api'
import { Avatar, Input, Textarea } from '@sone-dao/tone-react-core-ui'
import { UseUserStore, UserAvatar } from '@sone-dao/tone-react-user-store'
import { useRef, useState } from 'react'

type ProfileFormProps = {
  useUserStore: UseUserStore
  api: ToneApiService
}

export default function ProfileForm({ useUserStore, api }: ProfileFormProps) {
  const [uniqueName, setUniqueName] = useState<string>('')
  const [display, setDisplay] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [avatar, setAvatar] = useState<UserAvatar>({ dataURL: '' })
  const [isAvatarUploading, setAvatarUploading] = useState<boolean>(false)

  const avatarInput = useRef<HTMLInputElement>(null)

  const user = useUserStore()

  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full mt-12">
      <input
        type="file"
        ref={avatarInput}
        onChange={() => handleAvatarFile()}
        hidden
      />

      <Avatar
        className="w-[8rem] h-[8rem] mx-auto mt-[-75px] shadow border bg-global border-4 border-global cursor-pointer"
        fallback={
          isAvatarUploading ? (
            <i className="fa-fw fa-spin fa-duotone fa-compact-disc" />
          ) : (
            <i className="fa-fw fa-duotone fa-camera-retro text-global text-4xl" />
          )
        }
        src={avatar.dataURL}
        onClick={() => avatarInput.current?.click()}
      />
      {!avatar.dataURL && (
        <p className="p-1 bg-global text-global rounded-xl font-content text-sm my-2 text-center">
          Click the camera icon above to upload a user pic.
        </p>
      )}
      <div className="flex flex-col items-center">
        {display && (
          <h2 className="font-release text-4xl text-global-flipped">
            {display}
          </h2>
        )}
        {location && (
          <h4 className="text-global-flipped font-header text-base">
            <i className="fa-solid fa-globe mr-2" />
            {location}
          </h4>
        )}
      </div>
      <div className="py-2 w-full">
        <Input
          name="uniqueName"
          label="unique name"
          value={uniqueName}
          setValue={setUniqueName}
          placeholder={user.userId}
        />
        <p className="my-1 px-2 font-content text-xs text-global-flipped">
          https://tone.audio/users/
          <span className="font-header">{uniqueName || user.userId}</span>
        </p>
        <Input
          name="display"
          label="display name"
          className="my-2"
          value={display}
          setValue={setDisplay}
        />
        <Input
          name="location"
          label="location"
          className="my-2"
          value={location}
          setValue={setLocation}
        />
        <Textarea
          name="description"
          label="about me"
          className="my-2"
          value={description}
          setValue={setDescription}
        />
      </div>
    </div>
  )

  async function handleAvatarFile() {
    const files = avatarInput.current?.files || new FileList()

    const file = files[0]

    const isImage = file.type.split('/')[0] == 'image'

    if (isImage) {
      const dataURL = await blobToDataURL(file)

      setAvatarUploading(true)

      setAvatar({ blob: file, dataURL })

      api.user
        .uploadAvatar({ file })
        .then((response) => {
          useUserStore.setState({
            avatar: { dataURL },
          })

          setAvatarUploading(false)
        })
        .catch((error) => {
          setAvatarUploading(false)

          console.log({ error })
        })
    }
  }

  async function blobToDataURL(blob: Blob) {
    return new Promise<string>(async (resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (e) => resolve(e.target?.result as string)

      reader.readAsDataURL(blob)
    })
  }
}
