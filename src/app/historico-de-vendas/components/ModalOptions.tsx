import React from 'react'

export const ModalOptions = ({ active }: { active: boolean }) => {
  if (!active) return null
  return (
    <div className="absolute right-[69px] rounded-[12px] bg-[white] p-[24px] [box-shadow:0px_3px_4px_0px_#00000024]">
      <div>Deletar</div>
      <div>Ver Item</div>
    </div>
  )
}
