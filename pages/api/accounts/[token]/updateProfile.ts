import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFunctions } from "../../../../interfaces";
import { dbCon } from "../../../../models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { firstname, lastname, email, mobile } = req.body;
      const { Accounts } = await dbCon();
      const account = await Accounts.findOneAndUpdate(
        { _id: token },
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          mobile: mobile,
        }
      ).catch(catcher);

      if (account) {
        res.status(200).json({ status: true, profile: account });
      } else {
        res
          .status(400)
          .json({ status: false, err: "Failed to access profile" });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
