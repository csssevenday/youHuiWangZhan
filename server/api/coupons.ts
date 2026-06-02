export default defineEventHandler(async () => {
  const coupons = await useCoupons()
  return coupons
})
