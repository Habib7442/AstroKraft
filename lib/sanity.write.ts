import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../sanity/env'

const token = process.env.SANITY_API_WRITE_TOKEN

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for content mutations
  token, // Sensitive write token (only loaded server-side)
})
