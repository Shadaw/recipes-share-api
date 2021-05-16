import User from '../models/User';

interface Return {
  name: string;
  email: string;
}

export default {
  render(user: User): Return {
    return {
      name: user.name,
      email: user.email,
    };
  },
};
