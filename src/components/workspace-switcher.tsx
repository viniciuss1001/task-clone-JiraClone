"use client"
import React from 'react'
import {RiAddCircleFill} from 'react-icons/ri'
import {
    Select, 
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { useGetWorkspaces } from '@/features/workspaces/api/use-get-workspaces'
import WorkspaceAvatarComponent from '@/features/workspaces/components/workspace-avatar'


const WorkSpaceSwuitcherComponent = () => {
    const {data: workspaces} = useGetWorkspaces()
  return (
    <div className='flex flex-col gap-y-2 outline-none'>
        <p className='text-sm text-card-foreground m-1 text-gray-800'>Total: {workspaces?.total}</p>
        <div className='flex items-center justify-between'>
            <p className='text-sm  text-neutral-500'>Áreas de Trabalho</p>
            <RiAddCircleFill className='size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition'/>
        </div>
        <Select>
            <SelectTrigger className='w-full bg-neutral-200 font-medium p-1'>
                <SelectValue placeholder='Nenhuma área de trabalho selecionada.'/>
            </SelectTrigger>
            <SelectContent className='outiline-none'>
                {workspaces?.documents.map((workspace) => (
                    <SelectItem key={workspace.$id} value={workspace.$id}>
                        <div className='flex justify-start items-center gap-3 font-medium'>
                            <WorkspaceAvatarComponent name={workspace.name} image={workspace.image}/>
                            <span className='truncate'>{workspace.name}</span>
                        </div>  
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default WorkSpaceSwuitcherComponent