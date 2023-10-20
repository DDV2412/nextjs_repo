import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
  message?: string;
  data?: [];
};

const articles = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  try {
    const baseUrl = 'http://103.102.152.252/articles';
    const queryParams = req.query;
    const apiUrl = new URL(baseUrl);

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        apiUrl.searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(apiUrl.toString());

    const data = await response.json();

    res.status(200).json({
      status: 'success',
      data: data.data,
    });
  } catch (error) {
    res.status(502).json({
      status: 'error',
    });
  }
};

export default articles;
