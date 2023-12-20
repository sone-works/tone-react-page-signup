import { Button, Form, Input } from '@sone-dao/tone-react-core-ui'

type InviteFormProps = {
  setUserInvite: Function
  setSignupProgress: Function
}

export default function InviteForm({
  setUserInvite,
  setSignupProgress,
}: InviteFormProps) {
  return (
    <div className="p-4 rounded-xl bg-global-flipped text-global-flipped w-full">
      <h2 className="font-header text-3xl">Invite</h2>
      <p className="font-content my-2 font-normal text-base">
        Right now we're a little hush, so you'll need one of these.
      </p>
      <Form className="py-2" onSubmit={(e: any) => onInviteFormSubmit(e)}>
        <Input name="invite" label="invite code" />
        <Button className="mt-4">Submit</Button>
      </Form>
    </div>
  )

  function onInviteFormSubmit(e: any) {
    const invite = e.target.invite.value

    setUserInvite(invite)
    setSignupProgress(1)
  }
}
