export default defineEventHandler(async () => {
  const stores = await useStores()
  return stores
})
