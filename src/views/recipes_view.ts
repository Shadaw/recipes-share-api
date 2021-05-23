import Recipe from '../models/Recipe';
import usersView from './users_view';

export default {
  render(recipe: Recipe) {
    return {
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      difficulty: recipe.difficulty,
      time: recipe.time,
      image:
        process.env.NODE_ENV === 'production'
          ? `https://recipes-share.s3-sa-east-1.amazonaws.com/${recipe.image}`
          : `http://localhost:3333/files/${recipe.image}`,
      user: usersView.render(recipe.user),
      updated_at: recipe.updated_at,
      created_at: recipe.created_at,
    };
  },
  renderMany(recipes: Recipe[]) {
    return recipes.map(recipe => this.render(recipe));
  },
};
