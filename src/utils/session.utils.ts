import type { AuthSession } from './als.utils.js';

import { ALS } from './als.utils.js';

export const session = {
  getSession: () => ALS.getSession(),
  setSession: (sessionData: AuthSession) => {
    ALS.setSession(sessionData);
  },
};
