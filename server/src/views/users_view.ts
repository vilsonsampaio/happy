import User from '../models/User';

export default {
  render(user: User, token: string) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    };
  },
};
