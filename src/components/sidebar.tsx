import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DottedSeparator } from './dotted-separator'
import { NavigationComponent } from './navigation'
import WorkSpaceSwuitcherComponent from './workspace-switcher'
import { ModeToggleThemeComponent } from './mode-theme-toggle'
import ProjectsComponent from './projects'

const SidebarComponent = () => {
    return (
        <aside className='h-full p-4 w-full border-r-2'>
            <Link href='/'>
                <Image src='/automation.png' alt='Logo' width={64} height={48} />
            </Link>
            <DottedSeparator className='my-4' />
            <WorkSpaceSwuitcherComponent />
            <DottedSeparator className='my-4' />
            <NavigationComponent />
            <DottedSeparator className='my-4'/>
            <ProjectsComponent />
            <ModeToggleThemeComponent />
        </aside>
    )
}

export default SidebarComponent