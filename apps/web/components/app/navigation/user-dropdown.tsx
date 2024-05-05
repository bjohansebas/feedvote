import { Avatar, AvatarFallback, AvatarImage, Popover, PopoverContent, PopoverTrigger } from '@feedvote/ui/components'
import { stringAvatar } from '@feedvote/utils/functions'

import { auth } from '@/lib/auth'
import { ButtonLogout } from './button-logout'

export default async function UserDropdown() {
  const session = await auth()

  return (
    <Popover>
      <PopoverTrigger className="h-9 w-9 py-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`${session?.user.image}`} className="h-9 w-9" />
          <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 drop-shadow-lg" align="end">
        <div className="flex w-full flex-col space-y-px rounded-md p-3 sm:w-56">
          <div className="mb-2 p-2">
            {session?.user?.name && <p className="truncate font-bold">{session?.user?.name}</p>}
            <p className="truncate text-sm">{session?.user?.email}</p>
          </div>
          <ButtonLogout />
        </div>
      </PopoverContent>
    </Popover>
  )
}
