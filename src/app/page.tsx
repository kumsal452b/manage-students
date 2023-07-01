'use client'
import {useRouter} from 'next/navigation'
export default function Home2() {
  const router=useRouter();
  router.push('http://localhost:3000/login')
  return (
    <div>
    </div>
  )
}
