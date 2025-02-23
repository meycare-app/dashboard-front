interface SidebarMenuData {
  data: {
    title: string
    link: string
    isActive: boolean
  }[]
}

export interface SidebarProps extends SidebarMenuData {
  open: boolean
  setOpen: (open: boolean) => void
}
