const express = require("express");
const path = require("path");
const multer = require("multer");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.static('frontend/public'));
app.use(express.json());

app.use('/uploads', express.static('backend/uploadedFiles'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'backend/uploadedFiles'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

const url = "mongodb+srv://test-user:test-password@imy220.7zg86th.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";
const client = new MongoClient(url);

async function getDb() {
    try {
        await client.connect();
        return client.db("repo-river");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

//Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
        }
        const db = await getDb();
        const user = await db.collection("users").findOne({ email, password });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = `dummy-token-${user.id}-${Date.now()}`;
        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, message: "Login successful", token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

//Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Name, email, password required" });
        }
        const db = await getDb();
        const existing = await db.collection("users").findOne({ email });
        if (existing) {
            return res.status(409).json({ success: false, message: "User exists" });
        }
        const maxId = await db.collection("users").find().sort({ id: -1 }).limit(1).toArray();
        const newId = (maxId[0]?.id || 0) + 1;
        const newUser = {
            id: newId,
            name,
            email,
            password,
            avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`,
            bio: "New user",
            birthday: null,
            gender: null,
            work: "",
            phone: "",
            projectsCount: 0,
            followers: 0,
            following: 0
        };
        await db.collection("users").insertOne(newUser);
        const token = `dummy-token-${newUser.id}-${Date.now()}`;
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json({ success: true, message: "User created", token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


//User routes
app.get('/api/users', async (req, res) => {
    try {
        const db = await getDb();
        const ids = req.query.ids ? req.query.ids.split(',').map(id => parseInt(id)) : [];
        const users = await db.collection("users").find({ id: { $in: ids } }, { projection: { password: 0 } }).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const db = await getDb();
        const user = await db.collection("users").findOne(
            { id: parseInt(req.params.id) },
            { projection: { password: 0 } }
        );
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const db = await getDb();
        const updateData = req.body;
        const result = await db.collection("users").updateOne({ id: parseInt(req.params.id) }, { $set: updateData });
        if (result.matchedCount === 0) return res.status(404).json({ message: "User not found" });
        res.json({ success: true, message: "Profile updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// AVATAR UPLOAD 
app.put('/api/users/:id/avatar', upload.single('avatar'), async (req, res) => {
    try {
        const db = await getDb();
        const userId = parseInt(req.params.id);
        
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        
        const avatarPath = `/uploads/${req.file.filename}`;
        
        const result = await db.collection("users").updateOne(
            { id: userId },
            { $set: { avatar: avatarPath } }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.json({ success: true, avatar: avatarPath });
    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({ message: "Server error" });
    }
});


// Project routes
app.post('/api/projects', upload.fields([{ name: 'files', maxCount: 10 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const db = await getDb();
        const { name, description, hashtag, isPublic, creatorId } = req.body;
        
        const files = req.files['files'] ? req.files['files'].map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,  
            path: file.path,          
            url: `/uploads/${file.filename}`, 
            created: new Date().toISOString()
        })) : [];
        
        const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
        
        const newProject = {
            id: (await db.collection("projects").find().sort({ id: -1 }).limit(1).toArray())[0]?.id + 1 || 1,
            name, 
            description, 
            hashtag, 
            isPublic: isPublic === 'true',
            creatorId: parseInt(creatorId), 
            createdAt: new Date().toISOString(),
            downloads: 0, 
            lastActivity: new Date().toISOString(),
            files, 
            image, 
            messages: [], 
            lockedBy: null
        };
        
        await db.collection("projects").insertOne(newProject);
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/api/projects', async (req, res) => {
  try {
    const db = await getDb();
    const creatorId = req.query.creatorId ? parseInt(req.query.creatorId) : null;
    const query = creatorId ? { creatorId } : {};
    const projects = await db.collection("projects").find(query).toArray();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/api/projects/:id', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        console.log(`Fetching project with id: ${projectId}`);
        const project = await db.collection("projects").aggregate([
            { $match: { id: { $eq: parseInt(projectId) } } },
            {
                $lookup: {
                    from: "users",
                    localField: "creatorId",
                    foreignField: "id",
                    as: "creatorDetails"
                }
            },
            {
                $addFields: {
                    creator: { $arrayElemAt: ["$creatorDetails", 0] }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "messages.userId",
                    foreignField: "id",
                    as: "messageUsers"
                }
            },
            {
                $addFields: {
                    messages: {
                        $map: {
                            input: "$messages",
                            as: "msg",
                            in: {
                                $mergeObjects: [
                                    "$$msg",
                                    {
                                        user: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: "$messageUsers",
                                                        as: "u",
                                                        cond: { $eq: ["$$u.id", { $toInt: "$$msg.userId" }] }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            { $unset: ["creatorDetails", "messageUsers"] }
        ]).toArray();

        if (project.length === 0) {
            console.log(`Project ${projectId} not found`);
            return res.status(404).json({ message: "Project not found" });
        }
        console.log('Resolved project:', project[0]);
        res.json(project[0]);
    } catch (error) {
        console.error('Aggregation error:', error);
        res.status(500).json({ message: "Server error" });
    }
});


app.put('/api/projects/:id', upload.fields([{ name: 'files', maxCount: 10 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { name, description, hashtag, isPublic } = req.body;
        
        
        const files = req.files['files'] ? req.files['files'].map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,
            path: file.path,
            url: `/uploads/${file.filename}`,
            created: new Date().toISOString()
        })) : [];
        
    
        const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;
        
        const update = { 
            name, 
            description, 
            hashtag, 
            isPublic: isPublic === 'true', 
            lastActivity: new Date().toISOString()
        };
        
        if (files.length) update.$push = { files: { $each: files } };
        if (image) update.image = image;
        
        const result = await db.collection("projects").updateOne({ id: projectId }, { $set: update });
        if (result.matchedCount === 0) return res.status(404).json({ message: "Project not found" });
        
        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: "Server error" });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId } = req.body;
        const result = await db.collection("projects").deleteOne({ id: projectId, creatorId: parseInt(userId) });
        if (result.deletedCount === 0) return res.status(403).json({ message: "Not authorized or project not found" });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Project Collaboration 
app.post('/api/projects/:id/checkin', upload.array('files', 10), async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, text } = req.body;
        
    
        const files = req.files ? req.files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,
            path: file.path,
            url: `/uploads/${file.filename}`,
            created: new Date().toISOString()
        })) : [];
        
        const message = { 
            id: Date.now(), 
            userId: parseInt(userId), 
            text, 
            time: new Date().toISOString() 
        };
        
        const update = { 
            $push: { messages: message }, 
            lastActivity: message.time 
        };
        
        if (files.length) update.$push.files = { $each: files };
        
        const result = await db.collection("projects").updateOne(
            { id: projectId, lockedBy: userId }, 
            { $set: update }
        );
        
        if (result.matchedCount === 0) {
            return res.status(403).json({ message: "Project not checked out by you" });
        }
        
        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ message: "Server error" });
    }
});

app.patch('/api/projects/:id/checkout', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId } = req.body;
        const result = await db.collection("projects").updateOne(
            { id: projectId, lockedBy: null },
            { $set: { lockedBy: parseInt(userId), lastActivity: new Date().toISOString() } }
        );
        if (result.matchedCount === 0) return res.status(403).json({ message: "Project already checked out or not found" });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//Team members
app.get('/api/projects/:id/team', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const project = await db.collection("projects").findOne({ id: projectId });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ teamMembers: project.teamMembers || [] });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/projects/:id/team', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, memberId, action } = req.body;
        const project = await db.collection("projects").findOne({ id: projectId, creatorId: parseInt(userId) });
        if (!project) return res.status(403).json({ message: "Not authorized or project not found" });

        let update = {};
        if (action === 'add' && !project.teamMembers?.includes(parseInt(memberId))) {
            update = { $push: { teamMembers: parseInt(memberId) } };
        } else if (action === 'remove' && project.teamMembers?.includes(parseInt(memberId))) {
            update = { $pull: { teamMembers: parseInt(memberId) } };
        } else {
            return res.status(400).json({ message: "Invalid action or member already exists/does not exist" });
        }

        await db.collection("projects").updateOne({ id: projectId }, update);
        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Download File
app.get('/api/projects/:id/files/:fileId', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const fileId = req.params.fileId;
        const project = await db.collection("projects").findOne({ id: projectId });
        if (!project) return res.status(404).json({ message: "Project not found" });
        const file = project.files.find(f => f.id == fileId);
        if (!file) return res.status(404).json({ message: "File not found" });
        res.download(file.path, file.name);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Friends routes
app.post('/api/friends', async (req, res) => {
    try {
        const db = await getDb();
        const { userId, friendId, action } = req.body;

        const friendsDoc = await db.collection("friends").findOne({ userId });
        let friends = friendsDoc?.friends || [];
        let incomingRequests = friendsDoc?.incomingRequests || [];
        let outgoingRequests = friendsDoc?.outgoingRequests || [];

        if (action === 'request') {
            if (!friends.includes(friendId) && !outgoingRequests.includes(friendId)) {
                outgoingRequests.push(friendId);

                const receiverDoc = await db.collection("friends").findOne({ userId: friendId });
                let receiverIncoming = receiverDoc?.incomingRequests || [];
                if (!receiverIncoming.includes(userId)) {
                    receiverIncoming.push(userId);
                }
                await db.collection("friends").updateOne(
                    { userId: friendId },
                    { $set: { incomingRequests: receiverIncoming } },
                    { upsert: true }
                );
            }
        } else if (action === 'accept') {
            if (incomingRequests.includes(friendId)) {
                incomingRequests = incomingRequests.filter(id => id !== friendId);
                friends.push(friendId);

                const senderDoc = await db.collection("friends").findOne({ userId: friendId });
                let senderOutgoing = senderDoc?.outgoingRequests || [];
                let senderFriends = senderDoc?.friends || [];
                senderOutgoing = senderOutgoing.filter(id => id !== userId);
                senderFriends.push(userId);

                await db.collection("friends").updateOne(
                    { userId: friendId },
                    { $set: { outgoingRequests: senderOutgoing, friends: senderFriends } },
                    { upsert: true }
                );
            }
        } else if (action === 'decline') {
            if (incomingRequests.includes(friendId)) {
                incomingRequests = incomingRequests.filter(id => id !== friendId);

                const senderDoc = await db.collection("friends").findOne({ userId: friendId });
                let senderOutgoing = senderDoc?.outgoingRequests || [];
                senderOutgoing = senderOutgoing.filter(id => id !== userId);

                await db.collection("friends").updateOne(
                    { userId: friendId },
                    { $set: { outgoingRequests: senderOutgoing } },
                    { upsert: true }
                );
            }
        } else if (action === 'remove') {
            if (friends.includes(friendId)) {
                friends = friends.filter(id => id !== friendId);

                const otherDoc = await db.collection("friends").findOne({ userId: friendId });
                let otherFriends = otherDoc?.friends || [];
                otherFriends = otherFriends.filter(id => id !== userId);

                await db.collection("friends").updateOne(
                    { userId: friendId },
                    { $set: { friends: otherFriends } },
                    { upsert: true }
                );
            }
        }

        await db.collection("friends").updateOne(
            { userId },
            { $set: { friends, incomingRequests, outgoingRequests } },
            { upsert: true }
        );

        res.json({ message: 'Success' });
    } catch (error) {
        console.error('Error handling friend action:', error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/api/friends/:userId', async (req, res) => {
    try {
        const db = await getDb();
        const friendsDoc = await db.collection("friends").findOne({ userId: parseInt(req.params.userId) });
        res.json({
            friends: friendsDoc?.friends || [],
            incomingRequests: friendsDoc?.incomingRequests || [],
            outgoingRequests: friendsDoc?.outgoingRequests || []
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.delete('/api/friends', async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const db = await getDb();
        await db.collection("friends").updateOne({ userId }, { $pull: { friends: friendId } });
        await db.collection("friends").updateOne({ userId: friendId }, { $pull: { friends: userId } });
        res.json({ success: true, message: "Friend removed" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Friend Requests
app.post('/api/friend-request', async (req, res) => {
    try {
        const { from, to } = req.body;
        const db = await getDb();

        const friendsDoc = await db.collection("friends").findOne({ userId: from });
        if (friendsDoc && friendsDoc.friends.includes(to)) {
            return res.status(400).json({ message: "Already friends" });
        }

        const existingRequest = await db.collection("friendRequests").findOne({ from, to, status: 'pending' });
        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        await db.collection("friendRequests").insertOne({ from, to, status: 'pending' });
        res.json({ success: true, message: "Friend request sent" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/api/friend-requests/pending/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const db = await getDb();
        const incoming = await db.collection("friendRequests").find({ to: userId, status: 'pending' }).toArray();
        const outgoing = await db.collection("friendRequests").find({ from: userId, status: 'pending' }).toArray();
        res.json({ incoming, outgoing });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/friend-request/accept', async (req, res) => {
    try {
        const { from, to } = req.body;
        const db = await getDb();

        await db.collection("friendRequests").updateOne({ from, to, status: 'pending' }, { $set: { status: 'accepted' } });

        await db.collection("friends").updateOne({ userId: from }, { $addToSet: { friends: to } }, { upsert: true });
        await db.collection("friends").updateOne({ userId: to }, { $addToSet: { friends: from } }, { upsert: true });

        res.json({ success: true, message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/friend-request/reject', async (req, res) => {
    try {
        const { from, to } = req.body;
        const db = await getDb();
        await db.collection("friendRequests").updateOne({ from, to, status: 'pending' }, { $set: { status: 'rejected' } });
        res.json({ success: true, message: "Friend request rejected" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

app.post('/api/friend-request/cancel', async (req, res) => {
    try {
        const { from, to } = req.body;
        const db = await getDb();
        await db.collection("friendRequests").deleteOne({ from, to, status: 'pending' });
        res.json({ success: true, message: "Friend request cancelled" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Activity feeds
app.get('/api/activity/local/:userId', async (req, res) => {
  try {
    const db = await getDb();
    const userId = parseInt(req.params.userId);

    const friendData = await db.collection("friends").findOne({ userId });
    const friendIds = friendData && friendData.friends
      ? friendData.friends.map(f => parseInt(f))
      : [];

    const allowedUserIds = [userId, ...friendIds];

    const projects = await db.collection("projects")
      .find({ creatorId: { $in: allowedUserIds } })
      .sort({ createdAt: -1 })
      .toArray();

    const users = await db.collection("users")
      .find({ id: { $in: allowedUserIds } }, { projection: { password: 0 } })
      .toArray();

    const userMap = {};
    users.forEach(u => {
      userMap[u.id] = { name: u.name, avatar: u.avatar };
    });

    const activities = projects.map(p => ({
      id: p.id,
      type: p.type || "update",   
      message: p.message || null,
      time: p.lastActivity || p.createdAt,
      project: {
        id: p.id,
        name: p.name,
        hashtag: p.hashtag || null
      },
      user: {
        id: p.creatorId,
        name: userMap[p.creatorId]?.name || "Unknown User",
        avatar: userMap[p.creatorId]?.avatar || "/assets/images/default-avatar.png"
      }
    }));

    res.json(activities);
  } catch (error) {
    console.error("Error in /api/activity/local/:userId:", error);
    res.status(500).json({ error: "Failed to fetch local activity" });
  }
});

app.get('/api/activity/global', async (req, res) => {
    try {
        const db = await getDb();
        
        const projects = await db.collection("projects").find({
            isPublic: true,
            messages: { $exists: true, $ne: [] }
        }).toArray();

        const creatorIds = projects.map(p => p.creatorId);
        const users = await db.collection("users").find({
            id: { $in: creatorIds }
        }).toArray();
        
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user;
        });

        const activities = [];
        
        projects.forEach(project => {
            if (project.messages && project.messages.length > 0) {
                project.messages.forEach(message => {
                    const activityUser = userMap[project.creatorId] || { 
                        name: 'Unknown User', 
                        avatar: "/assets/images/default-avatar.png" 
                    };
                    
                    const activityId = `project-${project.id}-message-${message.id}`;
                    
                    activities.push({
                        id: activityId,
                        type: "checkin",
                        user: { 
                            name: activityUser.name, 
                            id: project.creatorId,
                            avatar: activityUser.avatar 
                        },
                        project: { 
                            id: project.id, 
                            name: project.name,
                            description: project.description,
                            hashtag: project.hashtag
                        },
                        message: message.text,
                        time: message.time || project.lastActivity || new Date().toISOString()
                    });
                });
            }
        });

        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        res.json(activities);
    } catch (error) {
        console.error('Error fetching global activity:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// Search route 
app.get('/api/search', async (req, res) => {
    try {
        const { type, query } = req.query;
        const db = await getDb();
        let results;
        if (type === 'user') {
            results = await db.collection("users").find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { email: { $regex: query, $options: 'i' } }
                ]
            }, { projection: { password: 0 } }).toArray();
        } else if (type === 'project') {
            results = await db.collection("projects").find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { hashtag: { $regex: query, $options: 'i' } },
                    { "messages.text": { $regex: query, $options: 'i' } }
                ]
            }).toArray();
        } else {
            return res.status(400).json({ message: "Invalid type" });
        }
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Get ALL users 
app.get('/api/users/all', async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.collection("users")
            .find({}, { projection: { password: 0 } })
            .toArray();
        res.json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// Transfer ownership 
app.post('/api/projects/:id/transfer-ownership', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { currentOwnerId, newOwnerId } = req.body;

        const parsedCurrentOwnerId = parseInt(currentOwnerId);
        const parsedNewOwnerId = parseInt(newOwnerId);

        if (isNaN(parsedCurrentOwnerId) || isNaN(parsedNewOwnerId)) {
            return res.status(400).json({ message: "Invalid user IDs" });
        }

        // current owner
        let project = await db.collection("projects").findOne({
            id: projectId,
            creatorId: parsedCurrentOwnerId
        });

        if (!project) {
            return res.status(403).json({ message: "Not authorized or project not found" });
        }

        // new owner exists
        const newOwner = await db.collection("users").findOne({ id: parsedNewOwnerId });
        if (!newOwner) {
            return res.status(404).json({ message: "New owner not found" });
        }

        // Fix teamMembers if not an array
        if (!Array.isArray(project.teamMembers)) {
            await db.collection("projects").updateOne(
                { id: projectId },
                { $set: { teamMembers: [] } }
            );
            // Re-fetch project
            project = await db.collection("projects").findOne({ id: projectId });
            if (!project) {
                return res.status(500).json({ message: "Failed to refresh project" });
            }
        }

        // new owner is a current team member
        if (!project.teamMembers.includes(parsedNewOwnerId)) {
            return res.status(400).json({ message: "New owner must be a current team member" });
        }

        // update
        const updateOps = {
            $set: {
                creatorId: parsedNewOwnerId,
                lastActivity: new Date().toISOString()
            },
            $pull: { teamMembers: parsedNewOwnerId },
            $addToSet: { teamMembers: parsedCurrentOwnerId }
        };

        const result = await db.collection("projects").updateOne(
            { id: projectId },
            updateOps
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ 
            success: true, 
            message: "Ownership transferred successfully" 
        });
    } catch (error) {
        console.error('Error transferring ownership:', error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
});

// Checkin route to unlock project
app.post('/api/projects/:id/checkin', upload.array('files', 10), async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, text } = req.body;
        
        const files = req.files ? req.files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,
            path: file.path,
            url: `/uploads/${file.filename}`,
            created: new Date().toISOString()
        })) : [];
        
        const message = { 
            id: Date.now(), 
            userId: parseInt(userId), 
            text: text || 'Checked in project', 
            time: new Date().toISOString() 
        };
        
        const updateFields = { 
            lastActivity: message.time,
            lockedBy: null // UNLOCK the project
        };
        
        const pushOperations = {
            messages: message
        };
        
        if (files.length > 0) {
            pushOperations.files = { $each: files };
        }
        
        // Check if project is locked by this user
        const project = await db.collection("projects").findOne({ 
            id: projectId, 
            lockedBy: parseInt(userId) 
        });
        
        if (!project) {
            return res.status(403).json({ 
                message: "Project not checked out by you or doesn't exist" 
            });
        }
        
        const result = await db.collection("projects").updateOne(
            { id: projectId }, 
            { 
                $set: updateFields,
                $push: pushOperations
            }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ message: "Server error" });
    }
});


// Delete File from Project
app.delete('/api/projects/:id/files/:fileId', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const fileId = parseFloat(req.params.fileId); 
        
        console.log(`Attempting to delete file ${fileId} from project ${projectId}`);
        
        // Find the project
        const project = await db.collection("projects").findOne({ id: projectId });
        
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        
        // Find the file
        const file = project.files?.find(f => f.id == fileId);
        
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }
        
        // Remove file from database
        const result = await db.collection("projects").updateOne(
            { id: projectId },
            { 
                $pull: { files: { id: fileId } },
                $set: { lastActivity: new Date().toISOString() }
            }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Failed to delete file" });
        }
        
        
        res.json({ 
            success: true, 
            message: "File deleted successfully" 
        });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ message: "Server error" });
    }
});


// CHECK-IN – any team member
app.post('/api/projects/:id/checkin', upload.array('files'), async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, text } = req.body;

        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        // Find project
        const project = await db.collection("projects").findOne({ id: projectId });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Must be checked out by this user OR be a team member
        const isOwner = project.creatorId === parsedUserId;
        const isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);
        const isCheckedOutByUser = project.lockedBy === parsedUserId;

        if (!isCheckedOutByUser && !(isOwner || isTeamMember)) {
            return res.status(403).json({ message: "You must be the owner, a team member, or have checked out the project" });
        }

        // If not checked out, auto-checkout first
        if (!isCheckedOutByUser) {
            const checkoutResult = await db.collection("projects").updateOne(
                { id: projectId, lockedBy: null },
                { $set: { lockedBy: parsedUserId } }
            );
            if (checkoutResult.matchedCount === 0) {
                return res.status(409).json({ message: "Project is already checked out by someone else" });
            }
        }

        // Process uploaded files
        const files = req.files ? req.files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,
            path: file.path,
            url: `/uploads/${file.filename}`,
            created: new Date().toISOString()
        })) : [];

        const message = {
            id: Date.now(),
            userId: parsedUserId,
            text: text || 'Updated project files',
            time: new Date().toISOString()
        };

        const updateOps = {
            $set: { lastActivity: message.time, lockedBy: null },
            $push: { messages: message }
        };

        if (files.length > 0) {
            updateOps.$push.files = { $each: files };
        }

        const result = await db.collection("projects").updateOne(
            { id: projectId },
            updateOps
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found during update" });
        }

        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
});


// Add friend to project

app.post('/api/projects/:id/team', async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, memberId, action } = req.body;

        const parsedUserId = parseInt(userId);
        const parsedMemberId = parseInt(memberId);
        if (isNaN(parsedUserId) || isNaN(parsedMemberId)) {
            return res.status(400).json({ message: "Invalid IDs" });
        }

        const project = await db.collection("projects").findOne({ id: projectId });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isOwner = project.creatorId === parsedUserId;
        const isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);

        if (!isOwner && !isTeamMember) {
            return res.status(403).json({ message: "Only owners and team members can modify the team" });
        }

        if (!Array.isArray(project.teamMembers)) {
            await db.collection("projects").updateOne(
                { id: projectId },
                { $set: { teamMembers: [] } }
            );
        }

        let result;
        if (action === 'add') {
            const userExists = await db.collection("users").findOne({ id: parsedMemberId });
            if (!userExists) {
                return res.status(404).json({ message: "User to add not found" });
            }

            result = await db.collection("projects").updateOne(
                { id: projectId },
                { 
                    $addToSet: { teamMembers: parsedMemberId },
                    $set: { lastActivity: new Date().toISOString() }
                }
            );
        } else if (action === 'remove') {
            result = await db.collection("projects").updateOne(
                { id: projectId },
                { 
                    $pull: { teamMembers: parsedMemberId },
                    $set: { lastActivity: new Date().toISOString() }
                }
            );
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ success: true, message: `Team member ${action}ed` });
    } catch (error) {
        console.error('Team update error:', error);
        res.status(500).json({ message: "Server error" });
    }
});


app.post('/api/projects/:id/checkin', upload.array('files'), async (req, res) => {
    try {
        const db = await getDb();
        const projectId = parseInt(req.params.id);
        const { userId, text } = req.body;

        const parsedUserId = parseInt(userId);
        if (isNaN(parsedUserId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        
        const project = await db.collection("projects").findOne({ id: projectId });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const isOwner = project.creatorId === parsedUserId;
        const isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);
        const isCheckedOutByUser = project.lockedBy === parsedUserId;

        if (!isOwner && !isTeamMember && !isCheckedOutByUser) {
            return res.status(403).json({ message: "Not authorized to check in this project" });
        }

        if (!isCheckedOutByUser) {
            const checkoutResult = await db.collection("projects").updateOne(
                { id: projectId, lockedBy: null },
                { $set: { lockedBy: parsedUserId } }
            );
            if (checkoutResult.matchedCount === 0) {
                return res.status(409).json({ message: "Project is checked out by someone else" });
            }
        }

        if (!Array.isArray(project.files)) {
            await db.collection("projects").updateOne(
                { id: projectId },
                { $set: { files: [] } }
            );
        }
        if (!Array.isArray(project.messages)) {
            await db.collection("projects").updateOne(
                { id: projectId },
                { $set: { messages: [] } }
            );
        }

        const files = req.files ? req.files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.originalname,
            path: file.path,
            url: `/uploads/${file.filename}`,
            created: new Date().toISOString()
        })) : [];

        const message = { 
            id: Date.now(), 
            userId: parsedUserId, 
            text: text || 'Checked in project', 
            time: new Date().toISOString() 
        };

        const updateOps = { 
            $set: {
                lastActivity: message.time,
                lockedBy: null // UNLOCK
            },
            $push: { messages: message }
        };

        if (files.length > 0) {
            updateOps.$push.files = { $each: files };
        }

        const result = await db.collection("projects").updateOne(
            { id: projectId }, 
            updateOps
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Project not found during update" });
        }

        const updatedProject = await db.collection("projects").findOne({ id: projectId });
        res.json(updatedProject);
    } catch (error) {
        console.error('Check-in error:', error);
        res.status(500).json({ message: "Server error", details: error.message });
    }
});

//DON'T TOUCH
app.get('/{*any}', (req, res) => res.sendFile(path.resolve('frontend/public', 'index.html')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});