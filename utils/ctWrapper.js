const ctrlWrapper = (ctrl) => {
  const decor = async (req, res, next) => {
    try {
      await ctrl(req, res);
    } catch (error) {
      next(error);
    }
  };
  return decor;
};

module.exports = ctrlWrapper;
