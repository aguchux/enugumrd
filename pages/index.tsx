import Link from "next/link";
import BaseLayout from "../layouts/BaseLayout";
import { authlogout } from "../utils/withAuthSync";

const home = () => {
  return (
    <BaseLayout>
      <div className="container mt-0 h-screen">
        <div className="row">
          <Link href="#" onClick={authlogout}>
            Login
          </Link>
        </div>
      </div>
    </BaseLayout>
  );
};
export default home;
