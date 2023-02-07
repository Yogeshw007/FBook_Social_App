const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.createSession = function (req, res) {
    console.log('req.user', req.user)

    return res.redirect(`/users/profile/${req.user._id}`);
}

module.exports.signIn = function (req, res) {
    return res.render('signin', {
        title: 'FBook | Sign In',
    });
}

module.exports.signUp = function (req, res) {
    return res.render('signup', {
        title: 'FBook | Sign Up'
    });
}

module.exports.createUser = async function (req, res) {
    // if (req.body.password != req.body.confirm_password) {
    //     return res.redirect('/user/signin');
    // }

    await User.uploadAvatar(req, res, async function (err) {
        if (err) {
            console.log('Error in uploading file ', err);
        }
        console.log('User.userImagePath', User.usersImgPath);

        let fileName = req.file.path.split('\\').slice(-1);

        try {
            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: User.usersImgPath + "/" + fileName,
                });
            }
        } catch (err) {
            console.log('Error in creating the user', err);
        }
        return res.redirect('/users/signin');
    });
}

module.exports.profile = async function (req, res) {
    let profileuser = await User.findById(req.params.id);
    let friend = await Friendship.findOne({ user1: req.params.id });

    if (!friend) {
        friend = await Friendship.findOne({ user2: req.params.id });
    }

    return res.render('profile', {
        title: 'FBook | Profile',
        user: req.user,
        profileuser,
        friend
    });
}

module.exports.destroySession = function (req, res) {
    req.logOut(function (err) {
        if (err) { return next(err); }
        console.log('You have logged out Successfully!!');
        return res.redirect('/');
    });
}

module.exports.addFriendRequest = async function (req, res) {
    await Friendship.create({
        user1: req.body.from_user,
        user2: req.body.to_user,
        addedby: req.body.from_user
    });

    return res.redirect('back');
}

module.exports.acceptFriendRequest = async function (req, res) {
    let friendRequest = await Friendship.findOne({ user1: req.body.to_user });

    if (!friendRequest) {
        friendRequest = await Friendship.findOne({ user2: req.body.to_user });
    }

    friendRequest.status = true;
    await friendRequest.save();

    let user1 = await User.findById(req.user._id);
    let user2 = await User.findById(req.body.to_user);

    await user1.friendship.push(friendRequest);
    await user2.friendship.push(friendRequest);
    await user1.save();
    await user2.save();

    return res.redirect('back');
}

module.exports.removeFriend = async function (req, res) {
    let friend = await Friendship.findOne({ user1: req.body.from_user });

    if (!friend) {
        friend = await Friendship.findOne({ user1: req.body.to_user });
        await Friendship.findOneAndDelete({ user1: req.body.to_user });
    } else {
        await Friendship.findOneAndDelete({ user1: req.body.from_user });
    }

    await User.updateOne({ _id: req.user._id }, { $pull: { friendship: req.body.to_user } });
    await User.updateOne({ _id: req.body.to_user }, { $pull: { friendship: req.user._id } });

    return res.redirect('back');
}