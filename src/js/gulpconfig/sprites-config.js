import path from './path';

const spritesConfig = {
  stylesheetPath: path.build.css,
  spritePath: path.build.img,
  filterBy: function(image) {
  // Allow only png files
    if (!/\.png$/.test(image.url))
    {
      return Promise.reject();
    }
    return Promise.resolve();
    }
};
export default spritesConfig;
