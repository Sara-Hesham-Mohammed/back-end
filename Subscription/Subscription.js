const _ = require('lodash');
const async = require('async');
const actionMap = {
    create: "post",
    index: "get",
    show: "get",
    update: "put",
    "delete": "delete",
    patch: "patch"
};

const msInDay = 24 * 60 * 60 * 1000;

function pathRegexp(path, keys, sensitive, strict) {
    if (path && path.toString() === '[object RegExp]') {
        return path;
    }
    if (Array.isArray(path)) {
        path = '(' + path.join('|') + ')';
    }
    path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function (_, slash, format, key, capture, optional, star) {
            keys.push({ name: key, optional: !!optional });
            return String(
                (optional ? '' : slash) +
                '(?:' +
                (optional ? slash : '') +
                (format || '') +
                (capture || ((format && '([^/.]+?)') || '([^/]+?)')) + ')' +
                (optional || '') +
                (star ? '(/*)?' : ''));
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/\*/g, '(.*)');
    return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}

const plansConfig = {
    plan: {
        free: {
            limits: {
                articles: 10 
            }
        },
        premium: {
            limits: {
                articles: "unlimited" 
            }
        }
    }
};

module.exports = {
    init: function (config) {
        config = config || {};
        const db = config.db;

        return function (req, res, next) {
            const now = new Date().getTime();
            const user = req.user && typeof req.user === "object" ? req.user.id : req.user;

            async.series([
                function (cb) {
                    let resource;
                    _.each(plansConfig.plan, function (limits, planName) {
                        if (req.url.match(pathRegexp('/articles', []))) {
                            resource = "articles";
                        }
                    });
                    req.resource = resource;
                    cb();
                },
                function (cb) {
                    if (req.resource && user) {
                        db.user(user, function (err, u) {
                            if (err) return res.status(400).send(err);
                            if (!u || !u.plan) return res.status(401).send({ error: "Unauthorized" });

                            const planName = u.plan.name || u.plan;
                            const limits = plansConfig.plan[planName]?.limits || {};
                            const usage = u.usage?.[req.resource] || 0;

                            if (limits[req.resource] !== "unlimited" && usage >= limits[req.resource]) {
                                return res.status(403).send({
                                    reason: "subscription",
                                    plan: planName,
                                    limit: req.resource,
                                    maximum: limits[req.resource]
                                });
                            }
                            cb();
                        });
                    } else {
                        cb();
                    }
                }
            ], next);
        };
    }
};

const db = {
    user: function (userId, callback) {
        const userDatabase = {
            1: { id: 1, plan: "free", usage: { articles: 5 } },
            2: { id: 2, plan: "premium", usage: { articles: 15 } }
        };
        callback(null, userDatabase[userId]);
    }
};

const express = require('express');
const app = express();

app.use('/articles', module.exports.init({ db }));

app.get('/articles', (req, res) => {
    res.send('Access granted to articles');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
