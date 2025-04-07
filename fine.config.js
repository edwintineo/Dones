module.exports = {
  build: {
    command: "cp index.html dist/index.html || vite build",
    output: "dist"
  }
};