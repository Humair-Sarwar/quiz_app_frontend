export const generateSlug = (text: any) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9& ]/g, '') // Remove everything except letters, numbers, space, and &
    .replace(/\s+/g, '-')        // Replace spaces with hyphens
}


