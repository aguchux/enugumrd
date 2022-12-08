import { NextApiRequest, NextApiResponse } from "next";
import { ResponseFunctions } from "../../../../interfaces";
import { dbCon } from "../../../../models";

const bcrypt = require("bcryptjs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method: keyof ResponseFunctions = req.method as keyof ResponseFunctions;
  const catcher = (error: Error) => res.status(400).json({ error });
  const handleCase: ResponseFunctions = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { token } = req.query;
      const { currentPassword, password, confirmPassword } = req.body;
      const { Accounts } = await dbCon();
      const account = await Accounts.findOne({ _id: token }).catch(catcher);

      if (account) {
        const isPasswordValid = bcrypt.compareSync(
          currentPassword,
          account.password
        );
        if (!isPasswordValid) {
          res
            .status(400)
            .json({ status: false, err: "Current password is incorrect" });
        }
        // Now update account //
        // Encrypt Password//
        const salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(password, salt);
        // Encrypt Password//

        const updated = await Accounts.updateOne(
          { _id: token },
          {
            password: hashedPassword,
          }
        ).catch(catcher);
        // Now update account //

        if (updated) {
          res.status(200).json({ status: true, data: updated });
        } else {
          res
            .status(400)
            .json({ status: false, err: "Failed to update profile" });
        }

        res.status(200).json({ status: true, profile: account });
      } else {
        res
          .status(400)
          .json({ status: false, err: "Failed to update profile" });
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
}
