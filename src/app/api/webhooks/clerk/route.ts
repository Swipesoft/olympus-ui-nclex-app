"use server"; 
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) throw new Error('Missing CLERK_WEBHOOK_SECRET')

  const payload = JSON.stringify(await req.json())
  const wh = new Webhook(secret)
  const rawHeaders = await headers(); 
  const evt = wh.verify(payload, {
    'svix-id': rawHeaders.get('svix-id')!,
    'svix-timestamp': rawHeaders.get('svix-timestamp')!,
    'svix-signature': rawHeaders.get('svix-signature')!,
  }) as WebhookEvent

  console.log(evt.data); 

  switch (evt.type) {
    case 'user.created':
    case 'user.updated':
      await prisma.user.upsert({
        where: { clerkId: evt.data.id },
        update: {
          email: evt.data.email_addresses?.[0]?.email_address,
          firstName: `${evt.data.first_name || ''}`.trim(), 
          lastName: `${evt.data.last_name || ''}`.trim(),
          profileImageUrl: evt.data.image_url,
        },
        create: {
          clerkId: evt.data.id,
          email: evt.data.email_addresses?.[0]?.email_address,
          firstName: `${evt.data.first_name || ''}`.trim(), 
          lastName: `${evt.data.last_name || ''}`.trim(),
          profileImageUrl: evt.data.image_url,
        },
      })
      break
    case 'user.deleted':
      await prisma.user.delete({ where: { clerkId: evt.data.id } })
      break
  }

  // optional dev logging for debugging 

  if (process.env.NODE_ENV !== 'production') {
  console.log(`[Webhook] Received: ${evt.type}`, evt.data)
}


  return new Response(null, { status: 200 })
}
