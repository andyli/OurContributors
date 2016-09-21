module.exports = function(context, req, res) {
	var GitHubApi = require('github');

	var github = new GitHubApi({
		version: "3.0.0",
		debug: true,
		timeout: 5000
	});

	github.authenticate({
		type: "oauth",
		token: context.secrets.GH_TOKEN
	});

	var slug = context.data.slug;
	if (!slug) {
		res.writeHead(400, { 'Content-Type': 'text/html'});
		res.end('missing query string `slug`');
		return;
	}

	var slugParts = slug.split("/");
	if (slugParts.length != 2) {
		res.writeHead(400, { 'Content-Type': 'text/html'});
		res.end('`slug` should be in the form of ${user}/${repo}');
		return;
	}

	github.repos.getContributors({
		user: slugParts[0],
		repo: slugParts[1],
		per_page: 50
	}, function(err, result) {
		res.writeHead(400, { 'Content-Type': 'application/json'});
		res.end(JSON.stringify(result));
	});
}