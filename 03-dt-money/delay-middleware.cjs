module.exports = (req, res, next) => {
  const delay = 500; 
  setTimeout(() => {
    next(); 
  }, delay);
};