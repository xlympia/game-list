// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.query.id}&page_size=24&ordering=-rating`
  )
  const dataJSON = await data.json()

  return await res.status(200).json(dataJSON.results)
}
