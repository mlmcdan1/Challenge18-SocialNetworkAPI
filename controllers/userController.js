const User = require('../models/User');

module.exports = {
  getUsers(req, res) {
    User.find()
    //.populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // remove a user
  deleteUser(req,res){
    User.findOneAndDelete(
      { _id: req.params.userId })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
  
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No student with this Id is found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate({_id:req.params.userId},{$addToSet:{friends:req.params.friendId}},{new:true})
      .then((friends) => res.json(friends))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },{$pull:{friends:req.params.friendId}},{new:true})
      .then(() => res.json({ message: 'Friend deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};