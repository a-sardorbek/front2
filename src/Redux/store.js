import { configureStore } from "@reduxjs/toolkit";
import users from "./both/user"
import super_admin_user from "./super_admin/user"
import cities_jobs from "./super_admin/cities_jobs"
import dashboard from "./both/dashboard"
import infos from "./both/infos";


export const store = configureStore({
    reducer: {
      users,
      super_admin_user,
      cities_jobs,
      dashboard,
      infos
    },
  });
  