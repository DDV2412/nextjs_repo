import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
  message?: string;
  data?: [];
};

const journals = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  try {
    const response = await fetch('http://127.0.0.1:6543/journals');

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

export default journals;
