import Comment from '../models/Comment';
import usersView from './users_view';

export default {
  render(comment: Comment) {
    return {
      id: comment.id,
      message: comment.message,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      user: usersView.render(comment.user),
    };
  },
  renderMany(comments: Comment[]) {
    return comments.map(comment => this.render(comment));
  },
};
