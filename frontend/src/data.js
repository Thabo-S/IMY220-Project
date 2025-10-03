// const profileImages = [
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexander",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Sawyer",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Luis",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Kingston",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Sophia",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Ryker",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Caleb",
//     "https://api.dicebear.com/9.x/adventurer/svg?seed=Mason",
// ];

// // Helper function to get a consistent avatar based on user ID
// const getAvatarById = (id) => {
//     const index = id % profileImages.length;
//     return profileImages[index];
// };

// const users = [
//     {
//         id: 1,
//         name: "John Developer",
//         email: "john@example.com",
//         avatar: getAvatarById(1),
//         bio: "Full-stack developer with 5 years of experience",
//         birthday: "1990-05-15",
//         gender: "Male",
//         work: "Software Engineer at TechCorp",
//         phone: "+27 11 555 0123",
//         projectsCount: 12,
//         followers: 245,
//         following: 87,
//         password: "password123"
//     },
//     {
//         id: 2,
//         name: "Sarah Coder",
//         email: "sarah@example.com",
//         avatar: getAvatarById(2),
//         bio: "Frontend specialist and UI enthusiast",
//         birthday: "1992-11-22",
//         gender: "Female",
//         work: "UI/UX Designer at DesignHub",
//         phone: "+27 21 555 0124",
//         projectsCount: 8,
//         followers: 178,
//         following: 94,
//         password: "password123"
//     },
//     {
//         id: 3,
//         name: "Mike Programmer",
//         email: "mike@example.com",
//         avatar: getAvatarById(3),
//         bio: "Backend developer and database expert",
//         birthday: "1988-03-08",
//         gender: "Male",
//         work: "Lead Developer at DataSystems",
//         phone: "+27 12 555 0125",
//         projectsCount: 15,
//         followers: 312,
//         following: 102,
//         password: "password123"
//     },
//     {
//         id: 4,
//         name: "Thabo",
//         email: "u24928209@tuks.co.za",
//         avatar: getAvatarById(4),
//         bio: "Software engineering student and aspiring developer",
//         birthday: "2000-08-20",
//         gender: "Male",
//         work: "Student at University of Pretoria",
//         phone: "+27 12 345 6789",
//         projectsCount: 3,
//         followers: 45,
//         following: 32,
//         password: "qwerty123"
//     }
// ];

// const projects = [
//     {
//         id: 1,
//         name: "CloudSync App",
//         description: "A lightweight application designed for synchronous files across multiple devices with real-time analytics, built using React and Node.js. Features include various encryption and a user-friendly interface.",
//         hashtag: "#AttractorsMinorECloud",
//         lastActivity: "User checked in CloudSync App at 2025/06/07 10:00 AMST",
//         image: "/assets/images/projects/cloudsync.png",
//         creator: users[0],
//         createdAt: "2025/06/01",
//         downloads: 100,
//         isPublic: true,
//         files: [
//             { id: 1, name: "main.js", created: "01/08/2025 10:00" },
//             { id: 2, name: "styles.css", created: "01/08/2025 10:00" },
//             { id: 3, name: "index.html", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 1, user: users[0], text: "Initial commit", time: "2025/06/01 09:30" },
//             { id: 2, user: users[1], text: "Fixed styling issues", time: "2025/06/02 14:22" },
//             { id: 3, user: users[0], text: "Added authentication", time: "2025/06/03 11:45" }
//         ]
//     },
//     {
//         id: 2,
//         name: "DataVisualizer",
//         description: "Interactive data visualization tool for complex datasets with multiple chart types and real-time updates.",
//         hashtag: "#DataScience",
//         lastActivity: "User updated DataVisualizer at 2025/06/06 02:30 PMST",
//         image: "/assets/images/projects/datavis.png",
//         creator: users[1],
//         createdAt: "2025/05/15",
//         downloads: 75,
//         isPublic: true,
//         files: [
//             { id: 4, name: "charts.js", created: "01/08/2025 10:00" },
//             { id: 5, name: "dataProcessor.js", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 4, user: users[1], text: "Started project", time: "2025/05/15 10:15" },
//             { id: 5, user: users[2], text: "Added bar chart component", time: "2025/05/16 16:40" }
//         ]
//     },
//     {
//         id: 3,
//         name: "AI Assistant",
//         description: "AI-powered coding assistant with natural language processing and code suggestion capabilities.",
//         hashtag: "#MachineLearning",
//         lastActivity: "User trained AI model at 2025/07/06 09:15 AMST",
//         image: "/assets/images/projects/ai-assistant.png",
//         creator: users[2],
//         createdAt: "2025/07/06",
//         downloads: 210,
//         isPublic: false,
//         files: [
//             { id: 6, name: "model.py", created: "01/08/2025 10:00" },
//             { id: 7, name: "training_data.json", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 6, user: users[2], text: "Initialized AI project", time: "2025/07/06 09:00" },
//             { id: 7, user: users[0], text: "Integrated with code editor", time: "2025/07/07 13:20" }
//         ]
//     },
//     {
//         id: 4,
//         name: "CodeCollaborator",
//         description: "Real-time collaborative code editor for team programming with syntax highlighting.",
//         hashtag: "#Collaboration",
//         lastActivity: "User fixed sync issue at 2025/07/16 04:45 PMST",
//         image: "/assets/images/projects/collaborator.png",
//         creator: users[0],
//         createdAt: "2025/07/16",
//         downloads: 153,
//         isPublic: true,
//         files: [
//             { id: 8, name: "editor.js", created: "01/08/2025 10:00" },
//             { id: 9, name: "websocket.js", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 8, user: users[0], text: "Set up base editor", time: "2025/07/16 10:30" },
//             { id: 9, user: users[1], text: "Added collaboration features", time: "2025/07/17 11:15" }
//         ]
//     },
//     {
//         id: 5,
//         name: "Student Portal App",
//         description: "A mobile application for university students to access course materials, grades, and campus events.",
//         hashtag: "#EducationTech",
//         lastActivity: "User added authentication module at 2025/08/10 02:30 PMST",
//         image: "/assets/images/projects/student-portal.png",
//         creator: users[3], 
//         createdAt: "2025/08/01",
//         downloads: 87,
//         isPublic: true,
//         files: [
//             { id: 10, name: "app.js", created: "01/08/2025 10:00" },
//             { id: 11, name: "database.js", created: "01/08/2025 10:00" },
//             { id: 12, name: "styles.css", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 10, user: users[3], text: "Initial project setup", time: "2025/08/01 09:00" },
//             { id: 11, user: users[3], text: "Added user authentication", time: "2025/08/05 14:20" }
//         ]
//     },
//     {
//         id: 6,
//         name: "Campus Navigation System",
//         description: "GPS-based navigation system for university campuses with interactive maps and building information.",
//         hashtag: "#CampusTech",
//         lastActivity: "User optimized map rendering at 2025/09/15 11:45 AMST",
//         image: "/assets/images/projects/campus-nav.png",
//         creator: users[3], 
//         createdAt: "2025/09/01",
//         downloads: 124,
//         isPublic: true,
//         files: [
//             { id: 13, name: "map.js", created: "01/08/2025 10:00" },
//             { id: 14, name: "navigation.js", created: "01/08/2025 10:00" },
//             { id: 15, name: "ui.js", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 12, user: users[3], text: "Started campus mapping project", time: "2025/09/01 10:30" },
//             { id: 13, user: users[1], text: "Great UI design!", time: "2025/09/03 16:45" }
//         ]
//     },
//     {
//         id: 7,
//         name: "Study Group Finder",
//         description: "Platform for students to find and create study groups based on courses and availability.",
//         hashtag: "#StudySmart",
//         lastActivity: "User implemented real-time chat at 2025/10/05 04:20 PMST",
//         image: "/assets/images/projects/study-group.png",
//         creator: users[3], 
//         createdAt: "2025/10/01",
//         downloads: 156,
//         isPublic: true,
//         files: [
//             { id: 16, name: "chat.js", created: "01/08/2025 10:00" },
//             { id: 17, name: "matching.js", created: "01/08/2025 10:00" },
//             { id: 18, name: "profile.js", created: "01/08/2025 10:00" }
//         ],
//         messages: [
//             { id: 14, user: users[3], text: "Study group matching algorithm implemented", time: "2025/10/02 11:15" },
//             { id: 15, user: users[2], text: "Nice work on the real-time features", time: "2025/10/04 13:30" }
//         ]
//     }
// ];

// const localActivity = [
//     {
//         id: 1,
//         project: projects[0],
//         time: "2025/06/07 10:00 AMST",
//         type: "checkin",
//         user: users[0]
//     },
//     {
//         id: 2,
//         project: projects[1],
//         time: "2025/06/06 02:30 PMST",
//         type: "update",
//         user: users[1]
//     },
//     {
//         id: 3,
//         project: projects[2],
//         time: "2025/07/06 09:15 AMST",
//         type: "training",
//         user: users[2]
//     }
// ];

// const globalActivity = [
//     {
//         id: 1,
//         project: projects[3],
//         creator: users[0],
//         createdAt: "2025/07/16",
//         downloads: 153
//     },
//     {
//         id: 2,
//         project: projects[2],
//         creator: users[2],
//         createdAt: "2025/07/06",
//         downloads: 210
//     },
//     {
//         id: 3,
//         project: projects[1],
//         creator: users[1],
//         createdAt: "2025/05/15",
//         downloads: 75
//     }
// ];

// const currentUser = users[0];

// const friends = [
//     users[1],
//     users[2],
//     {
//         id: 5,
//         name: "Alex Tech",
//         avatar: getAvatarById(5),
//         bio: "Mobile developer and open source contributor",
//         projectsCount: 9,
//         followers: 127,
//         phone: "+27 31 555 0126"
//     },
//     {
//         id: 6,
//         name: "Taylor Code",
//         avatar: getAvatarById(6),
//         bio: "DevOps engineer and cloud architect",
//         projectsCount: 6,
//         followers: 89,
//         phone: "+27 16 555 0127"
//     }
// ];

// const userProjects = [
//     {
//         id: 5,
//         name: "SecurityScanner",
//         description: "Automated security vulnerability scanner for code repositories.",
//         lastActivity: "User added new tests at 2025/06/10 11:30 AMST",
//         image: "/assets/images/projects/security.png",
//         projects: [
//             projects[0],
//             projects[3]
//         ]
//     }
// ];

// module.exports = {
//     users,
//     projects,
//     localActivity,
//     globalActivity,
//     currentUser,
//     friends,
//     userProjects
// };