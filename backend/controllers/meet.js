const createMeet = (req, res) => {
  res.send("Create Meet");
};

const getMeet = (req, res) => {
  res.send("Getting meet");
};

const getMeets = (req, res) => {
  res.send("Getting meets");
};

const updateMeet = (req, res) => {
  res.send("Updating meet");
};

const deleteMeet = (req, res) => {
  res.send("Deleting meet");
};

module.exports = { createMeet, getMeet, getMeets, updateMeet, deleteMeet };
