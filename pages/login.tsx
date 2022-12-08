import BaseLayout from "../layouts/BaseLayout";

import Busy from "../components/Busy";
import LoginForm from "../components/LoginForm";
const login = () => {
  return (
    <BaseLayout>
      <div className="container mt-0 h-screen">
        <div className="row">
          <LoginForm />
        </div>
      </div>
    </BaseLayout>
  );
};
export default login;
