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
  const [avatar, setAvatar] = useState<UserAvatar>()
  const [isAvatarUploading, setAvatarUploading] = useState<boolean>(false)

  const avatarInput = useRef<HTMLInputElement>(null)

  const user = useUserStore()

  const userIdDisplay =
    user.userId.substring(0, 4) +
    '...' +
    user.userId.substring(user.userId.length - 4)

  const profileDisplay = display || uniqueName || userIdDisplay

  return (
    <div className="flex flex-col p-4 rounded-xl border-4 border-global w-full">
      <input
        type="file"
        ref={avatarInput}
        onChange={() => handleAvatarFile()}
        hidden
      />
      <Avatar
        className="flex items-center justify-center w-32 h-32 mx-auto shadow border bg-global border-4 border-global cursor-pointer rounded-full"
        style={{ marginTop: '-75px' }}
        fallback={
          isAvatarUploading ? (
            <i className="fa-fw fa-spin fa-duotone fa-compact-disc" />
          ) : (
            <i className="fa-fw fa-duotone fa-camera-retro text-4xl" />
          )
        }
        src={avatar?.dataURL}
        onClick={() => avatarInput.current?.click()}
      />
      {avatar?.dataURL && (
        <p className="p-1 bg-global-flipped text-global-flipped rounded-xl font-content text-sm my-2 text-center">
          Click the camera icon above to upload a user pic.
        </p>
      )}
      <div className="flex flex-col items-center">
        <h2 className="font-release text-4xl text-global">{profileDisplay}</h2>
        {location && (
          <h4 className="text-global font-header text-base">
            <i className="fa-light fa-map-pin mr-2" />
            {location}
          </h4>
        )}
        <p className="text-xs rounded-xl">
          <i className="fa-solid fa-globe mr-1" />
          tone.audio/users/
          <span className="font-header">{uniqueName || user.userId}</span>
        </p>
      </div>
      <div className="py-2 w-full">
        <Input
          name="display"
          label="display name"
          className="my-2"
          value={display}
          setValue={setDisplay}
          placeholder={user.userId}
        />
        <Input
          name="uniqueName"
          label="unique name"
          value={uniqueName}
          setValue={setUniqueName}
          placeholder={user.userId}
        />
        <div className="my-1 px-2 font-content text-xs text-global">
          <p>
            <i className="fa-fw fa-solid fa-circle-info mr-1" />
            We use your unique name mostly for your profile URL. If none is
            chosen, we'll go with this long, ugly, random unique ID we generated
            for you, gross...
          </p>
        </div>
        <Input
          name="location"
          label="location"
          className="my-2"
          value={location}
          setValue={setLocation}
          placeholder="Planet Earth, Milky Way"
        />
        <Textarea
          name="description"
          label="about me"
          className="my-2"
          value={description}
          setValue={setDescription}
          placeholder="Cooler than a polar bear's toe nail."
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
