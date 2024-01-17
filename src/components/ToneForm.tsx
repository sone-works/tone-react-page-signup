import { ColorPicker } from '@sone-dao/tone-react-core-ui'
import ToneCSSUtils from '@sone-dao/tone-react-css-utils'
import { getRandomAAColor, isAAContrast, randomColor } from 'accessible-colors'
import { useEffect, useState } from 'react'

type ToneFormProps = {
  validContrast: boolean
  setValidContrast: Function
}

export default function ToneForm({
  validContrast,
  setValidContrast,
}: ToneFormProps) {
  const colors = ToneCSSUtils.getColors('global')

  const [colorPrimary, setColorPrimary] = useState<string>(colors.darker || '')
  const [colorSecondary, setColorSecondary] = useState<string>(
    colors.lighter || ''
  )

  useEffect(() => {
    if (isAAContrast(colorPrimary, colorSecondary)) {
      setValidContrast(true)

      ToneCSSUtils.setColors('global', colorPrimary, colorSecondary)
    } else {
      setValidContrast(false)
    }
  }, [colorPrimary, colorSecondary])

  return (
    <div className="flex flex-col p-4 rounded-xl border-4 border-global my-4 w-full">
      <p className="text-global text-sm font-content">
        These colors will represent you on the platform, and will effect the
        sites visual appearance when interacting with pages relating to you (ie.
        your profile, settings, etc). You can change these colors at anytime in
        your settings.
      </p>
      <p className="text-global text-sm font-content my-2">
        <i className="fa-fw fa-solid fa-circle-info mr-1" />
        Clicking the colored circle next to the hex code will bring up a color
        picker.
      </p>
      <ColorPicker
        name="primaryColor"
        className="my-2"
        value={colorPrimary}
        setValue={(color) => setColorPrimary(color)}
      />
      <ColorPicker
        name="secondaryColor"
        className="my-2"
        value={colorSecondary}
        setValue={(color) => setColorSecondary(color)}
      />
      {!validContrast && (
        <div className="flex items-center my-2 p-1 bg-global text-global text-sm font-header">
          <i className="fa-fw fa-solid fa-exclamation mr-2 text-2xl" />
          The colors you've picked fall outside of what's considered an
          accessible contrast. Please choose another combination.
        </div>
      )}
      <div className="flex items-center justify-end text-sm">
        Need help picking colors?
        <button
          type="button"
          className="outline-none bg-global text-global text-sm rounded-xl ml-2 p-1"
          onClick={() => {
            const random = randomColor()

            setColorPrimary(random)
            setColorSecondary(getRandomAAColor(random))
          }}
        >
          <div className="p-2 border-2 border-global rounded-xl">
            <i className="fa-fw fa-duotone fa-brush mr-21" />
            Random Tone
          </div>
        </button>
      </div>
    </div>
  )
}
