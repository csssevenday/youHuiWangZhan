import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Log click event for analytics
  // In production, store this in a database
  console.log('Click tracked:', {
    sid: body.sid,
    storeId: body.storeId,
    dealId: body.dealId,
    couponId: body.couponId,
    timestamp: body.timestamp,
    referrer: body.referrer,
    ip: event.node.req.socket.remoteAddress,
    userAgent: event.node.req.headers['user-agent']
  })

  return { success: true }
})
