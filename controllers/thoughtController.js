const Thought = require('../models/Thought');

module.exports = {
  getThoughts:(req, res) =>{
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought:(req, res) =>{
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought:(req, res)=> {
    Thought.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // remove a thought
  deleteThought:(req,res)=>{
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: 'No thoughts found with that ID :(' })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
    
  },
  updateThoughts:(req, res)=> {
    User.findOneAndUpdate(
      { _id: req.params.user },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thought with this Id is found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought:(req, res) =>{
    Thought.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  deleteThought:(req, res)=> {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  addReaction:(req, res) =>{
    Thought.findOneAndUpdate({_id:req.params.thoughtId},{$addToSet:{reactions:req.body}},{new:true})
      .then((reaction) => res.json(reaction))
      //.catch((err) => {
      //  console.log(err);
      //  return res.status(500).json(err);
      //});
  },
  deleteReaction:(req, res)=> {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId },{$pull:{reactions:req.params.reactionId}},{new:true})
    .then(() => res.json({ message: 'Reaction deleted!' }))
    .catch((err) => res.status(500).json(err));
  },
};
