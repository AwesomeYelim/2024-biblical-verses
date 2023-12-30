import { LectionPage } from '@/app/components/lection-page'
import { getLection } from '@/service/words'
import './page.scss'

export default async function Home() {
  const words = await getLection()

  return (
    <body>
      <LectionPage words={words} />
    </body>
  )
}
