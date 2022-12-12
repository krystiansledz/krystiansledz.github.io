const pushAndPop = (callback) => {
  push();
  callback();
  pop();
};
