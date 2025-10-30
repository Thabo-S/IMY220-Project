"use strict";

var _excluded = ["password"],
  _excluded2 = ["password"];
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require("express");
var path = require("path");
var multer = require("multer");
var _require = require("mongodb"),
  MongoClient = _require.MongoClient;
var app = express();
var port = 3000;
app.use(express["static"]('frontend/public'));
app.use(express.json());
app.use('/uploads', express["static"]('backend/uploadedFiles'));
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    return cb(null, 'backend/uploadedFiles');
  },
  filename: function filename(req, file, cb) {
    var uniqueName = "".concat(Date.now(), "-").concat(file.originalname);
    cb(null, uniqueName);
  }
});
var upload = multer({
  storage: storage
});
var url = "mongodb+srv://test-user:test-password@imy220.7zg86th.mongodb.net/?retryWrites=true&w=majority&appName=IMY220";
var client = new MongoClient(url);
function getDb() {
  return _getDb.apply(this, arguments);
} //Login
function _getDb() {
  _getDb = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33() {
    var _t49;
    return _regenerator().w(function (_context33) {
      while (1) switch (_context33.p = _context33.n) {
        case 0:
          _context33.p = 0;
          _context33.n = 1;
          return client.connect();
        case 1:
          return _context33.a(2, client.db("repo-river"));
        case 2:
          _context33.p = 2;
          _t49 = _context33.v;
          console.error("Database connection error:", _t49);
          throw _t49;
        case 3:
          return _context33.a(2);
      }
    }, _callee33, null, [[0, 2]]);
  }));
  return _getDb.apply(this, arguments);
}
app.post('/api/auth/login', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, email, password, db, user, token, _, userWithoutPassword, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          if (!(!email || !password)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            success: false,
            message: "Email and password required"
          }));
        case 1:
          _context.n = 2;
          return getDb();
        case 2:
          db = _context.v;
          _context.n = 3;
          return db.collection("users").findOne({
            email: email,
            password: password
          });
        case 3:
          user = _context.v;
          if (user) {
            _context.n = 4;
            break;
          }
          return _context.a(2, res.status(401).json({
            success: false,
            message: "Invalid credentials"
          }));
        case 4:
          token = "dummy-token-".concat(user.id, "-").concat(Date.now());
          _ = user.password, userWithoutPassword = _objectWithoutProperties(user, _excluded);
          res.json({
            success: true,
            message: "Login successful",
            token: token,
            user: userWithoutPassword
          });
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
          console.error(_t);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[0, 5]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

//Signup
app.post('/api/auth/signup', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _maxId$, _req$body2, name, email, password, db, existing, maxId, newId, newUser, token, _, userWithoutPassword, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
          if (!(!name || !email || !password)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, res.status(400).json({
            success: false,
            message: "Name, email, password required"
          }));
        case 1:
          _context2.n = 2;
          return getDb();
        case 2:
          db = _context2.v;
          _context2.n = 3;
          return db.collection("users").findOne({
            email: email
          });
        case 3:
          existing = _context2.v;
          if (!existing) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, res.status(409).json({
            success: false,
            message: "User exists"
          }));
        case 4:
          _context2.n = 5;
          return db.collection("users").find().sort({
            id: -1
          }).limit(1).toArray();
        case 5:
          maxId = _context2.v;
          newId = (((_maxId$ = maxId[0]) === null || _maxId$ === void 0 ? void 0 : _maxId$.id) || 0) + 1;
          newUser = {
            id: newId,
            name: name,
            email: email,
            password: password,
            avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=".concat(name),
            bio: "New user",
            birthday: null,
            gender: null,
            work: "",
            phone: "",
            projectsCount: 0,
            followers: 0,
            following: 0
          };
          _context2.n = 6;
          return db.collection("users").insertOne(newUser);
        case 6:
          token = "dummy-token-".concat(newUser.id, "-").concat(Date.now());
          _ = newUser.password, userWithoutPassword = _objectWithoutProperties(newUser, _excluded2);
          res.status(201).json({
            success: true,
            message: "User created",
            token: token,
            user: userWithoutPassword
          });
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t2 = _context2.v;
          console.error(_t2);
          res.status(500).json({
            success: false,
            message: "Server error"
          });
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

//User routes
app.get('/api/users', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var db, ids, users, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return getDb();
        case 1:
          db = _context3.v;
          ids = req.query.ids ? req.query.ids.split(',').map(function (id) {
            return parseInt(id);
          }) : [];
          _context3.n = 2;
          return db.collection("users").find({
            id: {
              $in: ids
            }
          }, {
            projection: {
              password: 0
            }
          }).toArray();
        case 2:
          users = _context3.v;
          res.json(users);
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t3 = _context3.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get('/api/users/:id', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var db, user, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return getDb();
        case 1:
          db = _context4.v;
          _context4.n = 2;
          return db.collection("users").findOne({
            id: parseInt(req.params.id)
          }, {
            projection: {
              password: 0
            }
          });
        case 2:
          user = _context4.v;
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({
              message: "User not found"
            });
          }
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t4 = _context4.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 3]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
app.put('/api/users/:id', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var db, updateData, result, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return getDb();
        case 1:
          db = _context5.v;
          updateData = req.body;
          _context5.n = 2;
          return db.collection("users").updateOne({
            id: parseInt(req.params.id)
          }, {
            $set: updateData
          });
        case 2:
          result = _context5.v;
          if (!(result.matchedCount === 0)) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: "User not found"
          }));
        case 3:
          res.json({
            success: true,
            message: "Profile updated"
          });
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t5 = _context5.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return function (_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}());

// AVATAR UPLOAD 
app.put('/api/users/:id/avatar', upload.single('avatar'), /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var db, userId, avatarPath, result, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return getDb();
        case 1:
          db = _context6.v;
          userId = parseInt(req.params.id);
          if (req.file) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(400).json({
            message: "No file uploaded"
          }));
        case 2:
          avatarPath = "/uploads/".concat(req.file.filename);
          _context6.n = 3;
          return db.collection("users").updateOne({
            id: userId
          }, {
            $set: {
              avatar: avatarPath
            }
          });
        case 3:
          result = _context6.v;
          if (!(result.matchedCount === 0)) {
            _context6.n = 4;
            break;
          }
          return _context6.a(2, res.status(404).json({
            message: "User not found"
          }));
        case 4:
          res.json({
            success: true,
            avatar: avatarPath
          });
          _context6.n = 6;
          break;
        case 5:
          _context6.p = 5;
          _t6 = _context6.v;
          console.error('Avatar upload error:', _t6);
          res.status(500).json({
            message: "Server error"
          });
        case 6:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 5]]);
  }));
  return function (_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}());

// Project routes
app.post('/api/projects', upload.fields([{
  name: 'files',
  maxCount: 10
}, {
  name: 'image',
  maxCount: 1
}]), /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _yield$db$collection$, db, _req$body3, name, description, hashtag, isPublic, creatorId, files, image, newProject, _t7, _t8, _t9, _t0, _t1, _t10, _t11, _t12, _t13, _t14, _t15, _t16, _t17, _t18, _t19, _t20, _t21;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return getDb();
        case 1:
          db = _context7.v;
          _req$body3 = req.body, name = _req$body3.name, description = _req$body3.description, hashtag = _req$body3.hashtag, isPublic = _req$body3.isPublic, creatorId = _req$body3.creatorId;
          files = req.files['files'] ? req.files['files'].map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          image = req.files['image'] ? "/uploads/".concat(req.files['image'][0].filename) : null;
          _context7.n = 2;
          return db.collection("projects").find().sort({
            id: -1
          }).limit(1).toArray();
        case 2:
          _t9 = _yield$db$collection$ = _context7.v[0];
          _t8 = _t9 === null;
          if (_t8) {
            _context7.n = 3;
            break;
          }
          _t8 = _yield$db$collection$ === void 0;
        case 3:
          if (!_t8) {
            _context7.n = 4;
            break;
          }
          _t0 = void 0;
          _context7.n = 5;
          break;
        case 4:
          _t0 = _yield$db$collection$.id;
        case 5:
          _t1 = _t0;
          _t7 = _t1 + 1;
          if (_t7) {
            _context7.n = 6;
            break;
          }
          _t7 = 1;
        case 6:
          _t10 = _t7;
          _t11 = name;
          _t12 = description;
          _t13 = hashtag;
          _t14 = isPublic === 'true';
          _t15 = parseInt(creatorId);
          _t16 = new Date().toISOString();
          _t17 = new Date().toISOString();
          _t18 = files;
          _t19 = image;
          _t20 = [];
          newProject = {
            id: _t10,
            name: _t11,
            description: _t12,
            hashtag: _t13,
            isPublic: _t14,
            creatorId: _t15,
            createdAt: _t16,
            downloads: 0,
            lastActivity: _t17,
            files: _t18,
            image: _t19,
            messages: _t20,
            lockedBy: null
          };
          _context7.n = 7;
          return db.collection("projects").insertOne(newProject);
        case 7:
          res.status(201).json(newProject);
          _context7.n = 9;
          break;
        case 8:
          _context7.p = 8;
          _t21 = _context7.v;
          console.error('Error creating project:', _t21);
          res.status(500).json({
            message: "Server error"
          });
        case 9:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}());
app.get('/api/projects', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var db, creatorId, query, projects, _t22;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          _context8.n = 1;
          return getDb();
        case 1:
          db = _context8.v;
          creatorId = req.query.creatorId ? parseInt(req.query.creatorId) : null;
          query = creatorId ? {
            creatorId: creatorId
          } : {};
          _context8.n = 2;
          return db.collection("projects").find(query).toArray();
        case 2:
          projects = _context8.v;
          res.json(projects);
          _context8.n = 4;
          break;
        case 3:
          _context8.p = 3;
          _t22 = _context8.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 3]]);
  }));
  return function (_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}());
app.get('/api/projects/:id', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(req, res) {
    var db, projectId, project, _t23;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          _context9.p = 0;
          _context9.n = 1;
          return getDb();
        case 1:
          db = _context9.v;
          projectId = parseInt(req.params.id);
          console.log("Fetching project with id: ".concat(projectId));
          _context9.n = 2;
          return db.collection("projects").aggregate([{
            $match: {
              id: {
                $eq: parseInt(projectId)
              }
            }
          }, {
            $lookup: {
              from: "users",
              localField: "creatorId",
              foreignField: "id",
              as: "creatorDetails"
            }
          }, {
            $addFields: {
              creator: {
                $arrayElemAt: ["$creatorDetails", 0]
              }
            }
          }, {
            $lookup: {
              from: "users",
              localField: "messages.userId",
              foreignField: "id",
              as: "messageUsers"
            }
          }, {
            $addFields: {
              messages: {
                $map: {
                  input: "$messages",
                  as: "msg",
                  "in": {
                    $mergeObjects: ["$$msg", {
                      user: {
                        $arrayElemAt: [{
                          $filter: {
                            input: "$messageUsers",
                            as: "u",
                            cond: {
                              $eq: ["$$u.id", {
                                $toInt: "$$msg.userId"
                              }]
                            }
                          }
                        }, 0]
                      }
                    }]
                  }
                }
              }
            }
          }, {
            $unset: ["creatorDetails", "messageUsers"]
          }]).toArray();
        case 2:
          project = _context9.v;
          if (!(project.length === 0)) {
            _context9.n = 3;
            break;
          }
          console.log("Project ".concat(projectId, " not found"));
          return _context9.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 3:
          console.log('Resolved project:', project[0]);
          res.json(project[0]);
          _context9.n = 5;
          break;
        case 4:
          _context9.p = 4;
          _t23 = _context9.v;
          console.error('Aggregation error:', _t23);
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context9.a(2);
      }
    }, _callee9, null, [[0, 4]]);
  }));
  return function (_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}());
app.put('/api/projects/:id', upload.fields([{
  name: 'files',
  maxCount: 10
}, {
  name: 'image',
  maxCount: 1
}]), /*#__PURE__*/function () {
  var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(req, res) {
    var db, projectId, _req$body4, name, description, hashtag, isPublic, files, image, update, result, updatedProject, _t24;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.p = _context0.n) {
        case 0:
          _context0.p = 0;
          _context0.n = 1;
          return getDb();
        case 1:
          db = _context0.v;
          projectId = parseInt(req.params.id);
          _req$body4 = req.body, name = _req$body4.name, description = _req$body4.description, hashtag = _req$body4.hashtag, isPublic = _req$body4.isPublic;
          files = req.files['files'] ? req.files['files'].map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          image = req.files['image'] ? "/uploads/".concat(req.files['image'][0].filename) : null;
          update = {
            name: name,
            description: description,
            hashtag: hashtag,
            isPublic: isPublic === 'true',
            lastActivity: new Date().toISOString()
          };
          if (files.length) update.$push = {
            files: {
              $each: files
            }
          };
          if (image) update.image = image;
          _context0.n = 2;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: update
          });
        case 2:
          result = _context0.v;
          if (!(result.matchedCount === 0)) {
            _context0.n = 3;
            break;
          }
          return _context0.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 3:
          _context0.n = 4;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 4:
          updatedProject = _context0.v;
          res.json(updatedProject);
          _context0.n = 6;
          break;
        case 5:
          _context0.p = 5;
          _t24 = _context0.v;
          console.error('Error updating project:', _t24);
          res.status(500).json({
            message: "Server error"
          });
        case 6:
          return _context0.a(2);
      }
    }, _callee0, null, [[0, 5]]);
  }));
  return function (_x17, _x18) {
    return _ref0.apply(this, arguments);
  };
}());
app["delete"]('/api/projects/:id', /*#__PURE__*/function () {
  var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(req, res) {
    var db, projectId, userId, result, _t25;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.p = _context1.n) {
        case 0:
          _context1.p = 0;
          _context1.n = 1;
          return getDb();
        case 1:
          db = _context1.v;
          projectId = parseInt(req.params.id);
          userId = req.body.userId;
          _context1.n = 2;
          return db.collection("projects").deleteOne({
            id: projectId,
            creatorId: parseInt(userId)
          });
        case 2:
          result = _context1.v;
          if (!(result.deletedCount === 0)) {
            _context1.n = 3;
            break;
          }
          return _context1.a(2, res.status(403).json({
            message: "Not authorized or project not found"
          }));
        case 3:
          res.json({
            success: true
          });
          _context1.n = 5;
          break;
        case 4:
          _context1.p = 4;
          _t25 = _context1.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context1.a(2);
      }
    }, _callee1, null, [[0, 4]]);
  }));
  return function (_x19, _x20) {
    return _ref1.apply(this, arguments);
  };
}());

// Project Collaboration 
app.post('/api/projects/:id/checkin', upload.array('files', 10), /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(req, res) {
    var db, projectId, _req$body5, userId, text, files, message, update, result, updatedProject, _t26;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.p = _context10.n) {
        case 0:
          _context10.p = 0;
          _context10.n = 1;
          return getDb();
        case 1:
          db = _context10.v;
          projectId = parseInt(req.params.id);
          _req$body5 = req.body, userId = _req$body5.userId, text = _req$body5.text;
          files = req.files ? req.files.map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          message = {
            id: Date.now(),
            userId: parseInt(userId),
            text: text,
            time: new Date().toISOString()
          };
          update = {
            $push: {
              messages: message
            },
            lastActivity: message.time
          };
          if (files.length) update.$push.files = {
            $each: files
          };
          _context10.n = 2;
          return db.collection("projects").updateOne({
            id: projectId,
            lockedBy: userId
          }, {
            $set: update
          });
        case 2:
          result = _context10.v;
          if (!(result.matchedCount === 0)) {
            _context10.n = 3;
            break;
          }
          return _context10.a(2, res.status(403).json({
            message: "Project not checked out by you"
          }));
        case 3:
          _context10.n = 4;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 4:
          updatedProject = _context10.v;
          res.json(updatedProject);
          _context10.n = 6;
          break;
        case 5:
          _context10.p = 5;
          _t26 = _context10.v;
          console.error('Check-in error:', _t26);
          res.status(500).json({
            message: "Server error"
          });
        case 6:
          return _context10.a(2);
      }
    }, _callee10, null, [[0, 5]]);
  }));
  return function (_x21, _x22) {
    return _ref10.apply(this, arguments);
  };
}());
app.patch('/api/projects/:id/checkout', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(req, res) {
    var db, projectId, userId, result, _t27;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          _context11.n = 1;
          return getDb();
        case 1:
          db = _context11.v;
          projectId = parseInt(req.params.id);
          userId = req.body.userId;
          _context11.n = 2;
          return db.collection("projects").updateOne({
            id: projectId,
            lockedBy: null
          }, {
            $set: {
              lockedBy: parseInt(userId),
              lastActivity: new Date().toISOString()
            }
          });
        case 2:
          result = _context11.v;
          if (!(result.matchedCount === 0)) {
            _context11.n = 3;
            break;
          }
          return _context11.a(2, res.status(403).json({
            message: "Project already checked out or not found"
          }));
        case 3:
          res.json({
            success: true
          });
          _context11.n = 5;
          break;
        case 4:
          _context11.p = 4;
          _t27 = _context11.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context11.a(2);
      }
    }, _callee11, null, [[0, 4]]);
  }));
  return function (_x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}());

//Team members
app.get('/api/projects/:id/team', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(req, res) {
    var db, projectId, project, _t28;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.p = _context12.n) {
        case 0:
          _context12.p = 0;
          _context12.n = 1;
          return getDb();
        case 1:
          db = _context12.v;
          projectId = parseInt(req.params.id);
          _context12.n = 2;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 2:
          project = _context12.v;
          if (project) {
            _context12.n = 3;
            break;
          }
          return _context12.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 3:
          res.json({
            teamMembers: project.teamMembers || []
          });
          _context12.n = 5;
          break;
        case 4:
          _context12.p = 4;
          _t28 = _context12.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context12.a(2);
      }
    }, _callee12, null, [[0, 4]]);
  }));
  return function (_x25, _x26) {
    return _ref12.apply(this, arguments);
  };
}());
app.post('/api/projects/:id/team', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(req, res) {
    var _project$teamMembers, _project$teamMembers2, db, projectId, _req$body6, userId, memberId, action, project, update, updatedProject, _t29;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return getDb();
        case 1:
          db = _context13.v;
          projectId = parseInt(req.params.id);
          _req$body6 = req.body, userId = _req$body6.userId, memberId = _req$body6.memberId, action = _req$body6.action;
          _context13.n = 2;
          return db.collection("projects").findOne({
            id: projectId,
            creatorId: parseInt(userId)
          });
        case 2:
          project = _context13.v;
          if (project) {
            _context13.n = 3;
            break;
          }
          return _context13.a(2, res.status(403).json({
            message: "Not authorized or project not found"
          }));
        case 3:
          update = {};
          if (!(action === 'add' && !((_project$teamMembers = project.teamMembers) !== null && _project$teamMembers !== void 0 && _project$teamMembers.includes(parseInt(memberId))))) {
            _context13.n = 4;
            break;
          }
          update = {
            $push: {
              teamMembers: parseInt(memberId)
            }
          };
          _context13.n = 6;
          break;
        case 4:
          if (!(action === 'remove' && (_project$teamMembers2 = project.teamMembers) !== null && _project$teamMembers2 !== void 0 && _project$teamMembers2.includes(parseInt(memberId)))) {
            _context13.n = 5;
            break;
          }
          update = {
            $pull: {
              teamMembers: parseInt(memberId)
            }
          };
          _context13.n = 6;
          break;
        case 5:
          return _context13.a(2, res.status(400).json({
            message: "Invalid action or member already exists/does not exist"
          }));
        case 6:
          _context13.n = 7;
          return db.collection("projects").updateOne({
            id: projectId
          }, update);
        case 7:
          _context13.n = 8;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 8:
          updatedProject = _context13.v;
          res.json(updatedProject);
          _context13.n = 10;
          break;
        case 9:
          _context13.p = 9;
          _t29 = _context13.v;
          res.status(500).json({
            message: "Server error"
          });
        case 10:
          return _context13.a(2);
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return function (_x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}());

// Download File
app.get('/api/projects/:id/files/:fileId', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(req, res) {
    var db, projectId, fileId, project, file, _t30;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.p = _context14.n) {
        case 0:
          _context14.p = 0;
          _context14.n = 1;
          return getDb();
        case 1:
          db = _context14.v;
          projectId = parseInt(req.params.id);
          fileId = req.params.fileId;
          _context14.n = 2;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 2:
          project = _context14.v;
          if (project) {
            _context14.n = 3;
            break;
          }
          return _context14.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 3:
          file = project.files.find(function (f) {
            return f.id == fileId;
          });
          if (file) {
            _context14.n = 4;
            break;
          }
          return _context14.a(2, res.status(404).json({
            message: "File not found"
          }));
        case 4:
          res.download(file.path, file.name);
          _context14.n = 6;
          break;
        case 5:
          _context14.p = 5;
          _t30 = _context14.v;
          res.status(500).json({
            message: "Server error"
          });
        case 6:
          return _context14.a(2);
      }
    }, _callee14, null, [[0, 5]]);
  }));
  return function (_x29, _x30) {
    return _ref14.apply(this, arguments);
  };
}());

// Friends routes
app.post('/api/friends', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(req, res) {
    var db, _req$body7, userId, friendId, action, friendsDoc, friends, incomingRequests, outgoingRequests, receiverDoc, receiverIncoming, senderDoc, senderOutgoing, senderFriends, _senderDoc, _senderOutgoing, otherDoc, otherFriends, _t31;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return getDb();
        case 1:
          db = _context15.v;
          _req$body7 = req.body, userId = _req$body7.userId, friendId = _req$body7.friendId, action = _req$body7.action;
          _context15.n = 2;
          return db.collection("friends").findOne({
            userId: userId
          });
        case 2:
          friendsDoc = _context15.v;
          friends = (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.friends) || [];
          incomingRequests = (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.incomingRequests) || [];
          outgoingRequests = (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.outgoingRequests) || [];
          if (!(action === 'request')) {
            _context15.n = 5;
            break;
          }
          if (!(!friends.includes(friendId) && !outgoingRequests.includes(friendId))) {
            _context15.n = 4;
            break;
          }
          outgoingRequests.push(friendId);
          _context15.n = 3;
          return db.collection("friends").findOne({
            userId: friendId
          });
        case 3:
          receiverDoc = _context15.v;
          receiverIncoming = (receiverDoc === null || receiverDoc === void 0 ? void 0 : receiverDoc.incomingRequests) || [];
          if (!receiverIncoming.includes(userId)) {
            receiverIncoming.push(userId);
          }
          _context15.n = 4;
          return db.collection("friends").updateOne({
            userId: friendId
          }, {
            $set: {
              incomingRequests: receiverIncoming
            }
          }, {
            upsert: true
          });
        case 4:
          _context15.n = 13;
          break;
        case 5:
          if (!(action === 'accept')) {
            _context15.n = 8;
            break;
          }
          if (!incomingRequests.includes(friendId)) {
            _context15.n = 7;
            break;
          }
          incomingRequests = incomingRequests.filter(function (id) {
            return id !== friendId;
          });
          friends.push(friendId);
          _context15.n = 6;
          return db.collection("friends").findOne({
            userId: friendId
          });
        case 6:
          senderDoc = _context15.v;
          senderOutgoing = (senderDoc === null || senderDoc === void 0 ? void 0 : senderDoc.outgoingRequests) || [];
          senderFriends = (senderDoc === null || senderDoc === void 0 ? void 0 : senderDoc.friends) || [];
          senderOutgoing = senderOutgoing.filter(function (id) {
            return id !== userId;
          });
          senderFriends.push(userId);
          _context15.n = 7;
          return db.collection("friends").updateOne({
            userId: friendId
          }, {
            $set: {
              outgoingRequests: senderOutgoing,
              friends: senderFriends
            }
          }, {
            upsert: true
          });
        case 7:
          _context15.n = 13;
          break;
        case 8:
          if (!(action === 'decline')) {
            _context15.n = 11;
            break;
          }
          if (!incomingRequests.includes(friendId)) {
            _context15.n = 10;
            break;
          }
          incomingRequests = incomingRequests.filter(function (id) {
            return id !== friendId;
          });
          _context15.n = 9;
          return db.collection("friends").findOne({
            userId: friendId
          });
        case 9:
          _senderDoc = _context15.v;
          _senderOutgoing = (_senderDoc === null || _senderDoc === void 0 ? void 0 : _senderDoc.outgoingRequests) || [];
          _senderOutgoing = _senderOutgoing.filter(function (id) {
            return id !== userId;
          });
          _context15.n = 10;
          return db.collection("friends").updateOne({
            userId: friendId
          }, {
            $set: {
              outgoingRequests: _senderOutgoing
            }
          }, {
            upsert: true
          });
        case 10:
          _context15.n = 13;
          break;
        case 11:
          if (!(action === 'remove')) {
            _context15.n = 13;
            break;
          }
          if (!friends.includes(friendId)) {
            _context15.n = 13;
            break;
          }
          friends = friends.filter(function (id) {
            return id !== friendId;
          });
          _context15.n = 12;
          return db.collection("friends").findOne({
            userId: friendId
          });
        case 12:
          otherDoc = _context15.v;
          otherFriends = (otherDoc === null || otherDoc === void 0 ? void 0 : otherDoc.friends) || [];
          otherFriends = otherFriends.filter(function (id) {
            return id !== userId;
          });
          _context15.n = 13;
          return db.collection("friends").updateOne({
            userId: friendId
          }, {
            $set: {
              friends: otherFriends
            }
          }, {
            upsert: true
          });
        case 13:
          _context15.n = 14;
          return db.collection("friends").updateOne({
            userId: userId
          }, {
            $set: {
              friends: friends,
              incomingRequests: incomingRequests,
              outgoingRequests: outgoingRequests
            }
          }, {
            upsert: true
          });
        case 14:
          res.json({
            message: 'Success'
          });
          _context15.n = 16;
          break;
        case 15:
          _context15.p = 15;
          _t31 = _context15.v;
          console.error('Error handling friend action:', _t31);
          res.status(500).json({
            message: "Server error"
          });
        case 16:
          return _context15.a(2);
      }
    }, _callee15, null, [[0, 15]]);
  }));
  return function (_x31, _x32) {
    return _ref15.apply(this, arguments);
  };
}());
app.get('/api/friends/:userId', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(req, res) {
    var db, friendsDoc, _t32;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          _context16.n = 1;
          return getDb();
        case 1:
          db = _context16.v;
          _context16.n = 2;
          return db.collection("friends").findOne({
            userId: parseInt(req.params.userId)
          });
        case 2:
          friendsDoc = _context16.v;
          res.json({
            friends: (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.friends) || [],
            incomingRequests: (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.incomingRequests) || [],
            outgoingRequests: (friendsDoc === null || friendsDoc === void 0 ? void 0 : friendsDoc.outgoingRequests) || []
          });
          _context16.n = 4;
          break;
        case 3:
          _context16.p = 3;
          _t32 = _context16.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context16.a(2);
      }
    }, _callee16, null, [[0, 3]]);
  }));
  return function (_x33, _x34) {
    return _ref16.apply(this, arguments);
  };
}());
app["delete"]('/api/friends', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(req, res) {
    var _req$body8, userId, friendId, db, _t33;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _context17.p = 0;
          _req$body8 = req.body, userId = _req$body8.userId, friendId = _req$body8.friendId;
          _context17.n = 1;
          return getDb();
        case 1:
          db = _context17.v;
          _context17.n = 2;
          return db.collection("friends").updateOne({
            userId: userId
          }, {
            $pull: {
              friends: friendId
            }
          });
        case 2:
          _context17.n = 3;
          return db.collection("friends").updateOne({
            userId: friendId
          }, {
            $pull: {
              friends: userId
            }
          });
        case 3:
          res.json({
            success: true,
            message: "Friend removed"
          });
          _context17.n = 5;
          break;
        case 4:
          _context17.p = 4;
          _t33 = _context17.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context17.a(2);
      }
    }, _callee17, null, [[0, 4]]);
  }));
  return function (_x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}());

// Friend Requests
app.post('/api/friend-request', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(req, res) {
    var _req$body9, from, to, db, friendsDoc, existingRequest, _t34;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          _req$body9 = req.body, from = _req$body9.from, to = _req$body9.to;
          _context18.n = 1;
          return getDb();
        case 1:
          db = _context18.v;
          _context18.n = 2;
          return db.collection("friends").findOne({
            userId: from
          });
        case 2:
          friendsDoc = _context18.v;
          if (!(friendsDoc && friendsDoc.friends.includes(to))) {
            _context18.n = 3;
            break;
          }
          return _context18.a(2, res.status(400).json({
            message: "Already friends"
          }));
        case 3:
          _context18.n = 4;
          return db.collection("friendRequests").findOne({
            from: from,
            to: to,
            status: 'pending'
          });
        case 4:
          existingRequest = _context18.v;
          if (!existingRequest) {
            _context18.n = 5;
            break;
          }
          return _context18.a(2, res.status(400).json({
            message: "Request already sent"
          }));
        case 5:
          _context18.n = 6;
          return db.collection("friendRequests").insertOne({
            from: from,
            to: to,
            status: 'pending'
          });
        case 6:
          res.json({
            success: true,
            message: "Friend request sent"
          });
          _context18.n = 8;
          break;
        case 7:
          _context18.p = 7;
          _t34 = _context18.v;
          res.status(500).json({
            message: "Server error"
          });
        case 8:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 7]]);
  }));
  return function (_x37, _x38) {
    return _ref18.apply(this, arguments);
  };
}());
app.get('/api/friend-requests/pending/:userId', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(req, res) {
    var userId, db, incoming, outgoing, _t35;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          _context19.p = 0;
          userId = parseInt(req.params.userId);
          _context19.n = 1;
          return getDb();
        case 1:
          db = _context19.v;
          _context19.n = 2;
          return db.collection("friendRequests").find({
            to: userId,
            status: 'pending'
          }).toArray();
        case 2:
          incoming = _context19.v;
          _context19.n = 3;
          return db.collection("friendRequests").find({
            from: userId,
            status: 'pending'
          }).toArray();
        case 3:
          outgoing = _context19.v;
          res.json({
            incoming: incoming,
            outgoing: outgoing
          });
          _context19.n = 5;
          break;
        case 4:
          _context19.p = 4;
          _t35 = _context19.v;
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context19.a(2);
      }
    }, _callee19, null, [[0, 4]]);
  }));
  return function (_x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}());
app.post('/api/friend-request/accept', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(req, res) {
    var _req$body0, from, to, db, _t36;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _req$body0 = req.body, from = _req$body0.from, to = _req$body0.to;
          _context20.n = 1;
          return getDb();
        case 1:
          db = _context20.v;
          _context20.n = 2;
          return db.collection("friendRequests").updateOne({
            from: from,
            to: to,
            status: 'pending'
          }, {
            $set: {
              status: 'accepted'
            }
          });
        case 2:
          _context20.n = 3;
          return db.collection("friends").updateOne({
            userId: from
          }, {
            $addToSet: {
              friends: to
            }
          }, {
            upsert: true
          });
        case 3:
          _context20.n = 4;
          return db.collection("friends").updateOne({
            userId: to
          }, {
            $addToSet: {
              friends: from
            }
          }, {
            upsert: true
          });
        case 4:
          res.json({
            success: true,
            message: "Friend request accepted"
          });
          _context20.n = 6;
          break;
        case 5:
          _context20.p = 5;
          _t36 = _context20.v;
          res.status(500).json({
            message: "Server error"
          });
        case 6:
          return _context20.a(2);
      }
    }, _callee20, null, [[0, 5]]);
  }));
  return function (_x41, _x42) {
    return _ref20.apply(this, arguments);
  };
}());
app.post('/api/friend-request/reject', /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(req, res) {
    var _req$body1, from, to, db, _t37;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _req$body1 = req.body, from = _req$body1.from, to = _req$body1.to;
          _context21.n = 1;
          return getDb();
        case 1:
          db = _context21.v;
          _context21.n = 2;
          return db.collection("friendRequests").updateOne({
            from: from,
            to: to,
            status: 'pending'
          }, {
            $set: {
              status: 'rejected'
            }
          });
        case 2:
          res.json({
            success: true,
            message: "Friend request rejected"
          });
          _context21.n = 4;
          break;
        case 3:
          _context21.p = 3;
          _t37 = _context21.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 3]]);
  }));
  return function (_x43, _x44) {
    return _ref21.apply(this, arguments);
  };
}());
app.post('/api/friend-request/cancel', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(req, res) {
    var _req$body10, from, to, db, _t38;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          _context22.p = 0;
          _req$body10 = req.body, from = _req$body10.from, to = _req$body10.to;
          _context22.n = 1;
          return getDb();
        case 1:
          db = _context22.v;
          _context22.n = 2;
          return db.collection("friendRequests").deleteOne({
            from: from,
            to: to,
            status: 'pending'
          });
        case 2:
          res.json({
            success: true,
            message: "Friend request cancelled"
          });
          _context22.n = 4;
          break;
        case 3:
          _context22.p = 3;
          _t38 = _context22.v;
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context22.a(2);
      }
    }, _callee22, null, [[0, 3]]);
  }));
  return function (_x45, _x46) {
    return _ref22.apply(this, arguments);
  };
}());

// Activity feeds
app.get('/api/activity/local/:userId', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(req, res) {
    var db, userId, friendData, friendIds, allowedUserIds, projects, users, userMap, activities, _t39;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          _context23.p = 0;
          _context23.n = 1;
          return getDb();
        case 1:
          db = _context23.v;
          userId = parseInt(req.params.userId);
          _context23.n = 2;
          return db.collection("friends").findOne({
            userId: userId
          });
        case 2:
          friendData = _context23.v;
          friendIds = friendData && friendData.friends ? friendData.friends.map(function (f) {
            return parseInt(f);
          }) : [];
          allowedUserIds = [userId].concat(_toConsumableArray(friendIds));
          _context23.n = 3;
          return db.collection("projects").find({
            creatorId: {
              $in: allowedUserIds
            }
          }).sort({
            createdAt: -1
          }).toArray();
        case 3:
          projects = _context23.v;
          _context23.n = 4;
          return db.collection("users").find({
            id: {
              $in: allowedUserIds
            }
          }, {
            projection: {
              password: 0
            }
          }).toArray();
        case 4:
          users = _context23.v;
          userMap = {};
          users.forEach(function (u) {
            userMap[u.id] = {
              name: u.name,
              avatar: u.avatar
            };
          });
          activities = projects.map(function (p) {
            var _userMap$p$creatorId, _userMap$p$creatorId2;
            return {
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
                name: ((_userMap$p$creatorId = userMap[p.creatorId]) === null || _userMap$p$creatorId === void 0 ? void 0 : _userMap$p$creatorId.name) || "Unknown User",
                avatar: ((_userMap$p$creatorId2 = userMap[p.creatorId]) === null || _userMap$p$creatorId2 === void 0 ? void 0 : _userMap$p$creatorId2.avatar) || "/assets/images/default-avatar.png"
              }
            };
          });
          res.json(activities);
          _context23.n = 6;
          break;
        case 5:
          _context23.p = 5;
          _t39 = _context23.v;
          console.error("Error in /api/activity/local/:userId:", _t39);
          res.status(500).json({
            error: "Failed to fetch local activity"
          });
        case 6:
          return _context23.a(2);
      }
    }, _callee23, null, [[0, 5]]);
  }));
  return function (_x47, _x48) {
    return _ref23.apply(this, arguments);
  };
}());
app.get('/api/activity/global', /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(req, res) {
    var db, projects, creatorIds, users, userMap, activities, _t40;
    return _regenerator().w(function (_context24) {
      while (1) switch (_context24.p = _context24.n) {
        case 0:
          _context24.p = 0;
          _context24.n = 1;
          return getDb();
        case 1:
          db = _context24.v;
          _context24.n = 2;
          return db.collection("projects").find({
            isPublic: true,
            messages: {
              $exists: true,
              $ne: []
            }
          }).toArray();
        case 2:
          projects = _context24.v;
          creatorIds = projects.map(function (p) {
            return p.creatorId;
          });
          _context24.n = 3;
          return db.collection("users").find({
            id: {
              $in: creatorIds
            }
          }).toArray();
        case 3:
          users = _context24.v;
          userMap = {};
          users.forEach(function (user) {
            userMap[user.id] = user;
          });
          activities = [];
          projects.forEach(function (project) {
            if (project.messages && project.messages.length > 0) {
              project.messages.forEach(function (message) {
                var activityUser = userMap[project.creatorId] || {
                  name: 'Unknown User',
                  avatar: "/assets/images/default-avatar.png"
                };
                var activityId = "project-".concat(project.id, "-message-").concat(message.id);
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
          activities.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time);
          });
          res.json(activities);
          _context24.n = 5;
          break;
        case 4:
          _context24.p = 4;
          _t40 = _context24.v;
          console.error('Error fetching global activity:', _t40);
          res.status(500).json({
            message: "Server error"
          });
        case 5:
          return _context24.a(2);
      }
    }, _callee24, null, [[0, 4]]);
  }));
  return function (_x49, _x50) {
    return _ref24.apply(this, arguments);
  };
}());

// Search route 
app.get('/api/search', /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(req, res) {
    var _req$query, type, query, db, results, _t41;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          _context25.p = 0;
          _req$query = req.query, type = _req$query.type, query = _req$query.query;
          _context25.n = 1;
          return getDb();
        case 1:
          db = _context25.v;
          if (!(type === 'user')) {
            _context25.n = 3;
            break;
          }
          _context25.n = 2;
          return db.collection("users").find({
            $or: [{
              name: {
                $regex: query,
                $options: 'i'
              }
            }, {
              email: {
                $regex: query,
                $options: 'i'
              }
            }]
          }, {
            projection: {
              password: 0
            }
          }).toArray();
        case 2:
          results = _context25.v;
          _context25.n = 6;
          break;
        case 3:
          if (!(type === 'project')) {
            _context25.n = 5;
            break;
          }
          _context25.n = 4;
          return db.collection("projects").find({
            $or: [{
              name: {
                $regex: query,
                $options: 'i'
              }
            }, {
              description: {
                $regex: query,
                $options: 'i'
              }
            }, {
              hashtag: {
                $regex: query,
                $options: 'i'
              }
            }, {
              "messages.text": {
                $regex: query,
                $options: 'i'
              }
            }]
          }).toArray();
        case 4:
          results = _context25.v;
          _context25.n = 6;
          break;
        case 5:
          return _context25.a(2, res.status(400).json({
            message: "Invalid type"
          }));
        case 6:
          res.json(results);
          _context25.n = 8;
          break;
        case 7:
          _context25.p = 7;
          _t41 = _context25.v;
          res.status(500).json({
            message: "Server error"
          });
        case 8:
          return _context25.a(2);
      }
    }, _callee25, null, [[0, 7]]);
  }));
  return function (_x51, _x52) {
    return _ref25.apply(this, arguments);
  };
}());

// Get ALL users 
app.get('/api/users/all', /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(req, res) {
    var db, users, _t42;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          _context26.p = 0;
          _context26.n = 1;
          return getDb();
        case 1:
          db = _context26.v;
          _context26.n = 2;
          return db.collection("users").find({}, {
            projection: {
              password: 0
            }
          }).toArray();
        case 2:
          users = _context26.v;
          res.json(users);
          _context26.n = 4;
          break;
        case 3:
          _context26.p = 3;
          _t42 = _context26.v;
          console.error('Error fetching all users:', _t42);
          res.status(500).json({
            message: "Server error"
          });
        case 4:
          return _context26.a(2);
      }
    }, _callee26, null, [[0, 3]]);
  }));
  return function (_x53, _x54) {
    return _ref26.apply(this, arguments);
  };
}());

// Transfer ownership 
app.post('/api/projects/:id/transfer-ownership', /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(req, res) {
    var db, projectId, _req$body11, currentOwnerId, newOwnerId, parsedCurrentOwnerId, parsedNewOwnerId, project, newOwner, updateOps, result, _t43;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _context27.p = 0;
          _context27.n = 1;
          return getDb();
        case 1:
          db = _context27.v;
          projectId = parseInt(req.params.id);
          _req$body11 = req.body, currentOwnerId = _req$body11.currentOwnerId, newOwnerId = _req$body11.newOwnerId;
          parsedCurrentOwnerId = parseInt(currentOwnerId);
          parsedNewOwnerId = parseInt(newOwnerId);
          if (!(isNaN(parsedCurrentOwnerId) || isNaN(parsedNewOwnerId))) {
            _context27.n = 2;
            break;
          }
          return _context27.a(2, res.status(400).json({
            message: "Invalid user IDs"
          }));
        case 2:
          _context27.n = 3;
          return db.collection("projects").findOne({
            id: projectId,
            creatorId: parsedCurrentOwnerId
          });
        case 3:
          project = _context27.v;
          if (project) {
            _context27.n = 4;
            break;
          }
          return _context27.a(2, res.status(403).json({
            message: "Not authorized or project not found"
          }));
        case 4:
          _context27.n = 5;
          return db.collection("users").findOne({
            id: parsedNewOwnerId
          });
        case 5:
          newOwner = _context27.v;
          if (newOwner) {
            _context27.n = 6;
            break;
          }
          return _context27.a(2, res.status(404).json({
            message: "New owner not found"
          }));
        case 6:
          if (Array.isArray(project.teamMembers)) {
            _context27.n = 9;
            break;
          }
          _context27.n = 7;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: {
              teamMembers: []
            }
          });
        case 7:
          _context27.n = 8;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 8:
          project = _context27.v;
          if (project) {
            _context27.n = 9;
            break;
          }
          return _context27.a(2, res.status(500).json({
            message: "Failed to refresh project"
          }));
        case 9:
          if (project.teamMembers.includes(parsedNewOwnerId)) {
            _context27.n = 10;
            break;
          }
          return _context27.a(2, res.status(400).json({
            message: "New owner must be a current team member"
          }));
        case 10:
          // update
          updateOps = {
            $set: {
              creatorId: parsedNewOwnerId,
              lastActivity: new Date().toISOString()
            },
            $pull: {
              teamMembers: parsedNewOwnerId
            },
            $addToSet: {
              teamMembers: parsedCurrentOwnerId
            }
          };
          _context27.n = 11;
          return db.collection("projects").updateOne({
            id: projectId
          }, updateOps);
        case 11:
          result = _context27.v;
          if (!(result.matchedCount === 0)) {
            _context27.n = 12;
            break;
          }
          return _context27.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 12:
          res.json({
            success: true,
            message: "Ownership transferred successfully"
          });
          _context27.n = 14;
          break;
        case 13:
          _context27.p = 13;
          _t43 = _context27.v;
          console.error('Error transferring ownership:', _t43);
          res.status(500).json({
            message: "Server error",
            details: _t43.message
          });
        case 14:
          return _context27.a(2);
      }
    }, _callee27, null, [[0, 13]]);
  }));
  return function (_x55, _x56) {
    return _ref27.apply(this, arguments);
  };
}());

// Checkin route to unlock project
app.post('/api/projects/:id/checkin', upload.array('files', 10), /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(req, res) {
    var db, projectId, _req$body12, userId, text, files, message, updateFields, pushOperations, project, result, updatedProject, _t44;
    return _regenerator().w(function (_context28) {
      while (1) switch (_context28.p = _context28.n) {
        case 0:
          _context28.p = 0;
          _context28.n = 1;
          return getDb();
        case 1:
          db = _context28.v;
          projectId = parseInt(req.params.id);
          _req$body12 = req.body, userId = _req$body12.userId, text = _req$body12.text;
          files = req.files ? req.files.map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          message = {
            id: Date.now(),
            userId: parseInt(userId),
            text: text || 'Checked in project',
            time: new Date().toISOString()
          };
          updateFields = {
            lastActivity: message.time,
            lockedBy: null // UNLOCK the project
          };
          pushOperations = {
            messages: message
          };
          if (files.length > 0) {
            pushOperations.files = {
              $each: files
            };
          }

          // Check if project is locked by this user
          _context28.n = 2;
          return db.collection("projects").findOne({
            id: projectId,
            lockedBy: parseInt(userId)
          });
        case 2:
          project = _context28.v;
          if (project) {
            _context28.n = 3;
            break;
          }
          return _context28.a(2, res.status(403).json({
            message: "Project not checked out by you or doesn't exist"
          }));
        case 3:
          _context28.n = 4;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: updateFields,
            $push: pushOperations
          });
        case 4:
          result = _context28.v;
          if (!(result.matchedCount === 0)) {
            _context28.n = 5;
            break;
          }
          return _context28.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 5:
          _context28.n = 6;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 6:
          updatedProject = _context28.v;
          res.json(updatedProject);
          _context28.n = 8;
          break;
        case 7:
          _context28.p = 7;
          _t44 = _context28.v;
          console.error('Check-in error:', _t44);
          res.status(500).json({
            message: "Server error"
          });
        case 8:
          return _context28.a(2);
      }
    }, _callee28, null, [[0, 7]]);
  }));
  return function (_x57, _x58) {
    return _ref28.apply(this, arguments);
  };
}());

// Delete File from Project
app["delete"]('/api/projects/:id/files/:fileId', /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(req, res) {
    var _project$files, db, projectId, fileId, project, file, result, _t45;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          _context29.p = 0;
          _context29.n = 1;
          return getDb();
        case 1:
          db = _context29.v;
          projectId = parseInt(req.params.id);
          fileId = parseFloat(req.params.fileId);
          console.log("Attempting to delete file ".concat(fileId, " from project ").concat(projectId));

          // Find the project
          _context29.n = 2;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 2:
          project = _context29.v;
          if (project) {
            _context29.n = 3;
            break;
          }
          return _context29.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 3:
          // Find the file
          file = (_project$files = project.files) === null || _project$files === void 0 ? void 0 : _project$files.find(function (f) {
            return f.id == fileId;
          });
          if (file) {
            _context29.n = 4;
            break;
          }
          return _context29.a(2, res.status(404).json({
            message: "File not found"
          }));
        case 4:
          _context29.n = 5;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $pull: {
              files: {
                id: fileId
              }
            },
            $set: {
              lastActivity: new Date().toISOString()
            }
          });
        case 5:
          result = _context29.v;
          if (!(result.matchedCount === 0)) {
            _context29.n = 6;
            break;
          }
          return _context29.a(2, res.status(404).json({
            message: "Failed to delete file"
          }));
        case 6:
          res.json({
            success: true,
            message: "File deleted successfully"
          });
          _context29.n = 8;
          break;
        case 7:
          _context29.p = 7;
          _t45 = _context29.v;
          console.error('Error deleting file:', _t45);
          res.status(500).json({
            message: "Server error"
          });
        case 8:
          return _context29.a(2);
      }
    }, _callee29, null, [[0, 7]]);
  }));
  return function (_x59, _x60) {
    return _ref29.apply(this, arguments);
  };
}());

// CHECK-IN – any team member
app.post('/api/projects/:id/checkin', upload.array('files'), /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(req, res) {
    var db, projectId, _req$body13, userId, text, parsedUserId, project, isOwner, isTeamMember, isCheckedOutByUser, checkoutResult, files, message, updateOps, result, updatedProject, _t46;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          _context30.p = 0;
          _context30.n = 1;
          return getDb();
        case 1:
          db = _context30.v;
          projectId = parseInt(req.params.id);
          _req$body13 = req.body, userId = _req$body13.userId, text = _req$body13.text;
          parsedUserId = parseInt(userId);
          if (!isNaN(parsedUserId)) {
            _context30.n = 2;
            break;
          }
          return _context30.a(2, res.status(400).json({
            message: "Invalid userId"
          }));
        case 2:
          _context30.n = 3;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 3:
          project = _context30.v;
          if (project) {
            _context30.n = 4;
            break;
          }
          return _context30.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 4:
          // Must be checked out by this user OR be a team member
          isOwner = project.creatorId === parsedUserId;
          isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);
          isCheckedOutByUser = project.lockedBy === parsedUserId;
          if (!(!isCheckedOutByUser && !(isOwner || isTeamMember))) {
            _context30.n = 5;
            break;
          }
          return _context30.a(2, res.status(403).json({
            message: "You must be the owner, a team member, or have checked out the project"
          }));
        case 5:
          if (isCheckedOutByUser) {
            _context30.n = 7;
            break;
          }
          _context30.n = 6;
          return db.collection("projects").updateOne({
            id: projectId,
            lockedBy: null
          }, {
            $set: {
              lockedBy: parsedUserId
            }
          });
        case 6:
          checkoutResult = _context30.v;
          if (!(checkoutResult.matchedCount === 0)) {
            _context30.n = 7;
            break;
          }
          return _context30.a(2, res.status(409).json({
            message: "Project is already checked out by someone else"
          }));
        case 7:
          // Process uploaded files
          files = req.files ? req.files.map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          message = {
            id: Date.now(),
            userId: parsedUserId,
            text: text || 'Updated project files',
            time: new Date().toISOString()
          };
          updateOps = {
            $set: {
              lastActivity: message.time,
              lockedBy: null
            },
            $push: {
              messages: message
            }
          };
          if (files.length > 0) {
            updateOps.$push.files = {
              $each: files
            };
          }
          _context30.n = 8;
          return db.collection("projects").updateOne({
            id: projectId
          }, updateOps);
        case 8:
          result = _context30.v;
          if (!(result.matchedCount === 0)) {
            _context30.n = 9;
            break;
          }
          return _context30.a(2, res.status(404).json({
            message: "Project not found during update"
          }));
        case 9:
          _context30.n = 10;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 10:
          updatedProject = _context30.v;
          res.json(updatedProject);
          _context30.n = 12;
          break;
        case 11:
          _context30.p = 11;
          _t46 = _context30.v;
          console.error('Check-in error:', _t46);
          res.status(500).json({
            message: "Server error",
            details: _t46.message
          });
        case 12:
          return _context30.a(2);
      }
    }, _callee30, null, [[0, 11]]);
  }));
  return function (_x61, _x62) {
    return _ref30.apply(this, arguments);
  };
}());

// Add friend to project

app.post('/api/projects/:id/team', /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(req, res) {
    var db, projectId, _req$body14, userId, memberId, action, parsedUserId, parsedMemberId, project, isOwner, isTeamMember, result, userExists, _t47;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.p = _context31.n) {
        case 0:
          _context31.p = 0;
          _context31.n = 1;
          return getDb();
        case 1:
          db = _context31.v;
          projectId = parseInt(req.params.id);
          _req$body14 = req.body, userId = _req$body14.userId, memberId = _req$body14.memberId, action = _req$body14.action;
          parsedUserId = parseInt(userId);
          parsedMemberId = parseInt(memberId);
          if (!(isNaN(parsedUserId) || isNaN(parsedMemberId))) {
            _context31.n = 2;
            break;
          }
          return _context31.a(2, res.status(400).json({
            message: "Invalid IDs"
          }));
        case 2:
          _context31.n = 3;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 3:
          project = _context31.v;
          if (project) {
            _context31.n = 4;
            break;
          }
          return _context31.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 4:
          isOwner = project.creatorId === parsedUserId;
          isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);
          if (!(!isOwner && !isTeamMember)) {
            _context31.n = 5;
            break;
          }
          return _context31.a(2, res.status(403).json({
            message: "Only owners and team members can modify the team"
          }));
        case 5:
          if (Array.isArray(project.teamMembers)) {
            _context31.n = 6;
            break;
          }
          _context31.n = 6;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: {
              teamMembers: []
            }
          });
        case 6:
          if (!(action === 'add')) {
            _context31.n = 10;
            break;
          }
          _context31.n = 7;
          return db.collection("users").findOne({
            id: parsedMemberId
          });
        case 7:
          userExists = _context31.v;
          if (userExists) {
            _context31.n = 8;
            break;
          }
          return _context31.a(2, res.status(404).json({
            message: "User to add not found"
          }));
        case 8:
          _context31.n = 9;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $addToSet: {
              teamMembers: parsedMemberId
            },
            $set: {
              lastActivity: new Date().toISOString()
            }
          });
        case 9:
          result = _context31.v;
          _context31.n = 13;
          break;
        case 10:
          if (!(action === 'remove')) {
            _context31.n = 12;
            break;
          }
          _context31.n = 11;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $pull: {
              teamMembers: parsedMemberId
            },
            $set: {
              lastActivity: new Date().toISOString()
            }
          });
        case 11:
          result = _context31.v;
          _context31.n = 13;
          break;
        case 12:
          return _context31.a(2, res.status(400).json({
            message: "Invalid action"
          }));
        case 13:
          if (!(result.matchedCount === 0)) {
            _context31.n = 14;
            break;
          }
          return _context31.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 14:
          res.json({
            success: true,
            message: "Team member ".concat(action, "ed")
          });
          _context31.n = 16;
          break;
        case 15:
          _context31.p = 15;
          _t47 = _context31.v;
          console.error('Team update error:', _t47);
          res.status(500).json({
            message: "Server error"
          });
        case 16:
          return _context31.a(2);
      }
    }, _callee31, null, [[0, 15]]);
  }));
  return function (_x63, _x64) {
    return _ref31.apply(this, arguments);
  };
}());
app.post('/api/projects/:id/checkin', upload.array('files'), /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(req, res) {
    var db, projectId, _req$body15, userId, text, parsedUserId, project, isOwner, isTeamMember, isCheckedOutByUser, checkoutResult, files, message, updateOps, result, updatedProject, _t48;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.p = _context32.n) {
        case 0:
          _context32.p = 0;
          _context32.n = 1;
          return getDb();
        case 1:
          db = _context32.v;
          projectId = parseInt(req.params.id);
          _req$body15 = req.body, userId = _req$body15.userId, text = _req$body15.text;
          parsedUserId = parseInt(userId);
          if (!isNaN(parsedUserId)) {
            _context32.n = 2;
            break;
          }
          return _context32.a(2, res.status(400).json({
            message: "Invalid userId"
          }));
        case 2:
          _context32.n = 3;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 3:
          project = _context32.v;
          if (project) {
            _context32.n = 4;
            break;
          }
          return _context32.a(2, res.status(404).json({
            message: "Project not found"
          }));
        case 4:
          isOwner = project.creatorId === parsedUserId;
          isTeamMember = Array.isArray(project.teamMembers) && project.teamMembers.includes(parsedUserId);
          isCheckedOutByUser = project.lockedBy === parsedUserId;
          if (!(!isOwner && !isTeamMember && !isCheckedOutByUser)) {
            _context32.n = 5;
            break;
          }
          return _context32.a(2, res.status(403).json({
            message: "Not authorized to check in this project"
          }));
        case 5:
          if (isCheckedOutByUser) {
            _context32.n = 7;
            break;
          }
          _context32.n = 6;
          return db.collection("projects").updateOne({
            id: projectId,
            lockedBy: null
          }, {
            $set: {
              lockedBy: parsedUserId
            }
          });
        case 6:
          checkoutResult = _context32.v;
          if (!(checkoutResult.matchedCount === 0)) {
            _context32.n = 7;
            break;
          }
          return _context32.a(2, res.status(409).json({
            message: "Project is checked out by someone else"
          }));
        case 7:
          if (Array.isArray(project.files)) {
            _context32.n = 8;
            break;
          }
          _context32.n = 8;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: {
              files: []
            }
          });
        case 8:
          if (Array.isArray(project.messages)) {
            _context32.n = 9;
            break;
          }
          _context32.n = 9;
          return db.collection("projects").updateOne({
            id: projectId
          }, {
            $set: {
              messages: []
            }
          });
        case 9:
          files = req.files ? req.files.map(function (file) {
            return {
              id: Date.now() + Math.random(),
              name: file.originalname,
              path: file.path,
              url: "/uploads/".concat(file.filename),
              created: new Date().toISOString()
            };
          }) : [];
          message = {
            id: Date.now(),
            userId: parsedUserId,
            text: text || 'Checked in project',
            time: new Date().toISOString()
          };
          updateOps = {
            $set: {
              lastActivity: message.time,
              lockedBy: null // UNLOCK
            },
            $push: {
              messages: message
            }
          };
          if (files.length > 0) {
            updateOps.$push.files = {
              $each: files
            };
          }
          _context32.n = 10;
          return db.collection("projects").updateOne({
            id: projectId
          }, updateOps);
        case 10:
          result = _context32.v;
          if (!(result.matchedCount === 0)) {
            _context32.n = 11;
            break;
          }
          return _context32.a(2, res.status(404).json({
            message: "Project not found during update"
          }));
        case 11:
          _context32.n = 12;
          return db.collection("projects").findOne({
            id: projectId
          });
        case 12:
          updatedProject = _context32.v;
          res.json(updatedProject);
          _context32.n = 14;
          break;
        case 13:
          _context32.p = 13;
          _t48 = _context32.v;
          console.error('Check-in error:', _t48);
          res.status(500).json({
            message: "Server error",
            details: _t48.message
          });
        case 14:
          return _context32.a(2);
      }
    }, _callee32, null, [[0, 13]]);
  }));
  return function (_x65, _x66) {
    return _ref32.apply(this, arguments);
  };
}());

//DON'T TOUCH
app.get('/{*any}', function (req, res) {
  return res.sendFile(path.resolve('frontend/public', 'index.html'));
});
app.listen(port, function () {
  console.log("Server running at http://localhost:".concat(port));
});