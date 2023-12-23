import { Input } from '@sone-dao/tone-react-core-ui'

type SocialsFormProps = {}

export default function SocialsForm({}: SocialsFormProps) {
  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full my-4">
      <h4 className="font-header text-global-flipped text-2xl mb-4">
        Socials & Connections
      </h4>
      <div>
        <Input
          className="my-2"
          name="socialsTwitter"
          startContent={
            <div className="flex items-center">
              <i className="fa-fw fa-brands fa-x-twitter text-2xl text-global-flipped" />
              <i className="fa-fw fa-duotone fa-at text-xl text-global-flipped" />
            </div>
          }
        />
        <Input
          className="my-2"
          name="socialsInstagram"
          startContent={
            <div className="flex items-center">
              <i className="fa-fw fa-brands fa-instagram text-2xl text-global-flipped" />
              <i className="fa-fw fa-duotone fa-at text-xl text-global-flipped" />
            </div>
          }
        />
        <Input
          className="my-2"
          name="socialsDiscord"
          startContent={
            <i className="fa-fw fa-brands fa-discord text-2xl text-global-flipped mr-1" />
          }
        />
      </div>
    </div>
  )
}
