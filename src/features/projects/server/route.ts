import { DATABASE_ID, IMAGE_BUCKET_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { z } from "zod";
import { createProjectSchema } from "../schema";

const app = new Hono()
	.post(
		'/',
		sessionMiddleware,
		zValidator('form', createProjectSchema),
		async (c) => {
			const databases = c.get("databases")
			const storage = c.get("storage")
			const user = c.get("user")

			const { name, image, workspaceId } = c.req.valid("form")

			const member = await getMember({
				databases,
				workspaceId,
				userId: user.$id
			})

			if (!member) {
				return c.json({ error: "Acesso não autorizado." }, 401)
			}

			let uploadedImageUrl: string | undefined

			if (image instanceof File) {
				const file = await storage.createFile(
					IMAGE_BUCKET_ID,
					ID.unique(),
					image
				)

				const arrayBuffer = await storage.getFilePreview(
					IMAGE_BUCKET_ID,
					file.$id
				)

				uploadedImageUrl = `data:image/png/base64,${Buffer.from(arrayBuffer).toString('base64')}`
			}

			const project = await databases.createDocument(
				DATABASE_ID,
				PROJECTS_ID,
				ID.unique(),
				{
					name,
					imageUrl: uploadedImageUrl,
					workspaceId
				}
			)

			return c.json({ data: project })
		}
	)
	.get(
		'/',
		sessionMiddleware,
		zValidator('query', z.object({ workspaceId: z.string() })),
		async (c) => {
			const user = c.get('user')
			const databases = c.get("databases")

			const { workspaceId } = c.req.valid("query")

			if (!workspaceId) {
				return c.json({ error: "Faltando o Id da Área de Trabalho" }, 400)
			}

			const member = await getMember({
				databases,
				workspaceId,
				userId: user.$id
			})

			if (!member) {
				return c.json({ error: "Não autorizado" }, 401)
			}

			const projects = await databases.listDocuments(
				DATABASE_ID,
				PROJECTS_ID,
				[
					Query.equal("workspaceId", workspaceId),
					Query.orderDesc("$createdAt")
				]
			)

			return c.json({ data: projects })
		}
	)

export default app