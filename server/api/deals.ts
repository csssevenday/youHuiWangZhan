export default defineEventHandler(async () => {
  const deals = await useDeals()
  return deals
})
