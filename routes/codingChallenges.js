var express = require('express');
var fetch = require('node-fetch');

var ccRouter = express.Router(); // coding challenges routes
const REPO_URL = 'https://api.github.com/repos/ktmDeveloper/coding-challenges/contents';

ccRouter
    .get('/', function (req, res, next) {
        let url = req.query.queryUrl || REPO_URL;
        fetch(url, {
            headers: {
                'Authorization': 'token ' + process.env.GITHUB_API_ACCESS_CODE,
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('An error happened while making a request to GitHub API');
            }
            console.log(res.headers)
            return res.json()
        })
        .then(json => {
            res.json(json)
        })
        .catch((err) => res.status(500).send({
            error: err
        }))
    });

module.exports = ccRouter;