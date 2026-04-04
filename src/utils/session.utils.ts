import { ALS } from "./als.utils.js";

export const session = {
  getSession: () => ALS.getSession(),
  setSession: (sessionData: any) => {
    ALS.setSession(sessionData);
  },
};
