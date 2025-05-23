"use client"
import { usePathname } from 'next/navigation'


import { useGetProjects } from "@/features/projects/api/use-get-projects"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"
import { RiAddCircleFill } from "react-icons/ri"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useCreateProjectsModal } from '@/features/projects/hooks/use-create-project-modal'
import ProjectAvatarComponent from '@/features/projects/components/projects-avatar'

const ProjectsComponent = () => {
	const projectId = null

	const pathname = usePathname()

	const { open } = useCreateProjectsModal()

	const workspaceId = useWorkspaceId()

	const { data } = useGetProjects({
		workspaceId
	})

	return (
		<div className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between">
				<p className="text-xs uppercase text-neutral-500">
					Projetos
				</p>
				<RiAddCircleFill onClick={open} className="size-5 text-neutral-500 cursor-pointer hover:opacity-100" />
			</div>

			{data?.documents.map((project) => {
				const href = `/workspaces/${workspaceId}/projects/${projectId}`
				const isActive = pathname === href

				return (
					<Link href={href} key={project.$id}>
						<div className={cn(
							"flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
							isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
						)}>
							<ProjectAvatarComponent image={project.imageUrl} name={project.name}/>
							<span className='truncate'>
								{project.name}
							</span>
						</div>
					</Link>
				)
			})}

		</div>
	)
}

export default ProjectsComponent