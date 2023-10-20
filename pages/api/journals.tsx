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
    const response = await fetch('http://103.102.152.252/journals');

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
