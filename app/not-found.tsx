import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='mx-auto justify-center items-center flex flex-col gap-4 py-20'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button><Link href="/">Return Home</Link></Button>
      
    </div>
  )
}