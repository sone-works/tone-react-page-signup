import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

export default function SuccessBox() {
  const [count, { startCountdown }] = useCountdown({
    countStart: 5,
    intervalMs: 1000,
  })

  const router = useRouter()

  useEffect(() => {
    startCountdown()
  }, [])

  count == 0 && router.push('/')

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
      <span className="font-release text-5xl m-4">tone</span>
      <div className="flex flex-col p-4 rounded-xl border-4 border-global w-full">
        <h4 className="font-header text-global text-2xl mb-2">
          You're all set...
        </h4>
        <div className="font-content text-base">
          <p>
            You've successfully signed up for Tone! Thanks for taking the time
            to join our platform.
            <i className="fa-fw fa-light fa-heart ml-1"></i>
          </p>
          <p className="mt-2">
            Redirecting back to the home page{' '}
            {count ? (
              <>
                in {count} second
                {count > 1 && 's'}...
              </>
            ) : (
              <>now...</>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
