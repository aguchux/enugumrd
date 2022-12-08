import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFunctions } from "../../interfaces";
import { dbCon } from "../../models";

const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { username, password } = req.body;
      const { Accounts } = await dbCon();
      // Get the School info with domain //
      const account = await Accounts.findOne({ email: username }).catch(
        catcher
      );
      if (account) {
        const isPasswordValid = bcrypt.compareSync(password, account.password);

        if (isPasswordValid) {
          res.status(200).json({ status: true, token: account._id });
        } else {
          res.status(400).json({ status: false });
        }
      } else {
        res.status(400).json({ status: false });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
